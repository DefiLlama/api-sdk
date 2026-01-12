/**
 * Base error class for all DefiLlama SDK errors.
 */
export class DefiLlamaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DefiLlamaError";
  }
}

/**
 * Thrown when attempting to access a Pro endpoint without an API key.
 *
 * @example
 * ```typescript
 * try {
 *   await client.tvl.getChainAssets();
 * } catch (e) {
 *   if (e instanceof ApiKeyRequiredError) {
 *     console.log('Please provide an API key');
 *   }
 * }
 * ```
 */
export class ApiKeyRequiredError extends DefiLlamaError {
  constructor(endpoint: string) {
    super(`API key required for endpoint: ${endpoint}`);
    this.name = "ApiKeyRequiredError";
  }
}

/**
 * Thrown when the API rate limit is exceeded.
 */
export class RateLimitError extends DefiLlamaError {
  /** Seconds to wait before retrying, if provided by the API */
  public retryAfter?: number;

  constructor(retryAfter?: number) {
    super("Rate limit exceeded");
    this.name = "RateLimitError";
    this.retryAfter = retryAfter;
  }
}

/**
 * Thrown when a requested resource (protocol, chain, etc.) is not found.
 */
export class NotFoundError extends DefiLlamaError {
  constructor(resource: string) {
    super(`Resource not found: ${resource}`);
    this.name = "NotFoundError";
  }
}

/**
 * Thrown for general API errors (non-2xx responses).
 */
export class ApiError extends DefiLlamaError {
  /** HTTP status code */
  public statusCode: number;

  /** Raw response body from the API */
  public response?: unknown;

  constructor(statusCode: number, message: string, response?: unknown) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.response = response;
  }
}
