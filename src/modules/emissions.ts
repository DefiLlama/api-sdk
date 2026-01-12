import type { BaseClient } from "../client.js";
import type { EmissionToken, EmissionDetailResponse, EmissionBody } from "../types/emissions.js";

/**
 * Module for accessing token emission and unlock schedule data from DefiLlama.
 * Provides methods for fetching vesting schedules, unlock events, and token allocation breakdowns.
 * Requires a Pro API key.
 *
 * @example
 * ```typescript
 * const client = new DefiLlama({ apiKey: 'your-api-key' });
 * const emissions = await client.emissions.getAll();
 * const hyperliquid = await client.emissions.getByProtocol('hyperliquid');
 * ```
 */
export class EmissionsModule {
  constructor(private client: BaseClient) {}

  /**
   * Get all tokens with unlock schedules and emission data.
   * Requires a Pro API key.
   *
   * @returns Array of tokens with their emission schedules, supply info, and unlock events
   *
   * @example
   * ```typescript
   * const tokens = await client.emissions.getAll();
   * tokens.forEach(token => {
   *   console.log(`${token.name}: ${token.circSupply} / ${token.maxSupply}`);
   *   console.log(`  Next unlock: ${token.nextEvent?.toUnlock} tokens`);
   * });
   * ```
   */
  async getAll(): Promise<EmissionToken[]> {
    return this.client.get<EmissionToken[]>("/emissions", {
      requiresAuth: true,
    });
  }

  /**
   * Get detailed vesting schedule and token allocation for a specific protocol.
   * Requires a Pro API key.
   *
   * @param protocol - Protocol slug (e.g., "hyperliquid", "aave", "uniswap")
   * @returns Detailed emission data including documented unlock timeline, allocation breakdown, and metadata
   *
   * @example
   * ```typescript
   * const detail = await client.emissions.getByProtocol('hyperliquid');
   * console.log(`${detail.body.name} - Total supply: ${detail.body.metadata.total}`);
   *
   * // Access token allocation
   * const allocation = detail.body.documentedData.tokenAllocation;
   * console.log(`Current insiders: ${allocation.current.insiders}%`);
   * console.log(`Final insiders: ${allocation.final.insiders}%`);
   *
   * // Access emission categories
   * detail.body.documentedData.data.forEach(category => {
   *   console.log(`${category.label}: ${category.data.length} data points`);
   * });
   * ```
   */
  async getByProtocol(protocol: string): Promise<EmissionDetailResponse> {
    const response = await this.client.get<{ body: string; lastModified: string }>(
      `/emission/${encodeURIComponent(protocol)}`,
      { requiresAuth: true }
    );

    return {
      body: JSON.parse(response.body) as EmissionBody,
      lastModified: response.lastModified,
    };
  }
}
