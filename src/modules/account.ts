import type { BaseClient } from "../client.js";
import { ApiKeyRequiredError } from "../errors.js";
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

    return this.client.request<UsageResponse>(
      `https://pro-api.llama.fi/usage/${apiKey}`,
      "/usage",
      {
        method: "GET",
        headers: { Accept: "application/json" },
      }
    );
  }
}
