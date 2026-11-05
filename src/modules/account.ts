import type { BaseClient } from "../client.js";
import { ApiError, ApiKeyRequiredError, NotFoundError, RateLimitError } from "../errors.js";
import type { UsageResponse } from "../types/account.js";

/**
 * Module for managing API account and usage data.
 * Provides methods for checking API credits.
 * Requires a Pro API key.
 *
 * @example
 * ```typescript
 * const client = new DefiLlama({ apiKey: 'your-api-key' });
 * const usage = await client.account.getUsage();
 * console.log(`Credits left: ${usage.creditsLeft}`);
 * ```
 */
export class AccountModule {
  constructor(private client: BaseClient) {}

  /**
   * Get API usage statistics for your account.
   * Returns credits left.
   * Requires a Pro API key.
   *
   * @returns Account usage data with credits left
   *
   * @example
   * ```typescript
   * const usage = await client.account.getUsage();
   * console.log(`Credits left: ${usage.creditsLeft}`);
   * ```
   */
  async getUsage(): Promise<UsageResponse> {
    const apiKey = this.client.getApiKey();
    if (!apiKey) {
      throw new ApiKeyRequiredError("/usage");
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.client.timeoutMs);

    try {
      const response = await fetch(`https://pro-api.llama.fi/usage/${apiKey}`, {
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      if (!response.ok) {
        if (response.status === 404) {
          throw new NotFoundError("/usage");
        }
        if (response.status === 429) {
          const retryAfter = response.headers.get("Retry-After");
          throw new RateLimitError(retryAfter ? parseInt(retryAfter, 10) : undefined);
        }
        throw new ApiError(response.status, `Failed to fetch usage: ${response.statusText}`);
      }
      return (await response.json()) as UsageResponse;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
