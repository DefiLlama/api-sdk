import {
  ApiError,
  ApiKeyRequiredError,
  NotFoundError,
  RateLimitError,
} from "./errors.js";

/**
 * Configuration options for the DefiLlama client.
 */
export interface DefiLlamaConfig {
  /**
   * Pro API key for accessing premium endpoints.
   * Get your key at https://defillama.com/pro-api
   */
  apiKey?: string;

  /**
   * Request timeout in milliseconds.
   * @default 30000
   */
  timeout?: number;
}

export type BaseUrl = "main" | "v2" | "bridges" | "coins" | "stablecoins";

const BASE_URLS = {
  main: "https://api.llama.fi",
  v2: "https://api.llama.fi/v2",
  pro: "https://pro-api.llama.fi",
  bridges: "https://bridges.llama.fi",
  coins: "https://coins.llama.fi",
  stablecoins: "https://stablecoins.llama.fi",
} as const;

export class BaseClient {
  private apiKey?: string;
  private timeout: number;

  constructor(config: DefiLlamaConfig = {}) {
    this.apiKey = config.apiKey;
    this.timeout = config.timeout ?? 30000;
  }

  get hasApiKey(): boolean {
    return !!this.apiKey;
  }

  getApiKey(): string | undefined {
    return this.apiKey;
  }

  private buildUrl(
    endpoint: string,
    requiresAuth: boolean,
    base: BaseUrl = "main",
    apiNamespace: string = "api"
  ): string {
    if (base === "v2") {
      if (!this.apiKey) {
        throw new ApiKeyRequiredError(endpoint);
      }
      return `${BASE_URLS.pro}/${this.apiKey}/api/v2${endpoint}`;
    }

    if (base === "bridges") {
      if (!this.apiKey) {
        throw new ApiKeyRequiredError(endpoint);
      }
      return `${BASE_URLS.pro}/${this.apiKey}/bridges${endpoint}`;
    }

    if (base === "coins") {
      return `${BASE_URLS.coins}${endpoint}`;
    }

    if (base === "stablecoins") {
      return `${BASE_URLS.stablecoins}${endpoint}`;
    }

    if (requiresAuth) {
      if (!this.apiKey) {
        throw new ApiKeyRequiredError(endpoint);
      }
      const namespace = apiNamespace ? `/${apiNamespace}` : "";
      return `${BASE_URLS.pro}/${this.apiKey}${namespace}${endpoint}`;
    }

    return `${BASE_URLS.main}${endpoint}`;
  }

  private async handleResponse<T>(response: Response, endpoint: string): Promise<T> {
    if (response.ok) {
      return response.json() as Promise<T>;
    }

    const text = await response.text();

    if (response.status === 404) {
      throw new NotFoundError(endpoint);
    }

    if (response.status === 429) {
      const retryAfter = response.headers.get("Retry-After");
      throw new RateLimitError(retryAfter ? parseInt(retryAfter, 10) : undefined);
    }

    let errorBody: unknown = text;
    try {
      errorBody = JSON.parse(text);
    } catch {
      // keep as text
    }

    throw new ApiError(response.status, `API request failed: ${response.statusText}`, errorBody);
  }

  async get<T>(
    endpoint: string,
    options: {
      params?: Record<string, string | number | boolean | undefined>;
      requiresAuth?: boolean;
      base?: BaseUrl;
      apiNamespace?: string;
    } = {}
  ): Promise<T> {
    const { params, requiresAuth = false, base = "main", apiNamespace = "api" } = options;

    let url = this.buildUrl(endpoint, requiresAuth, base, apiNamespace);

    if (params) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      }
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        signal: controller.signal,
      });

      return this.handleResponse<T>(response, endpoint);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async post<T>(
    endpoint: string,
    body: unknown,
    options: {
      requiresAuth?: boolean;
      base?: BaseUrl;
      apiNamespace?: string;
    } = {}
  ): Promise<T> {
    const { requiresAuth = false, base = "main", apiNamespace = "api" } = options;

    const url = this.buildUrl(endpoint, requiresAuth, base, apiNamespace);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      return this.handleResponse<T>(response, endpoint);
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
