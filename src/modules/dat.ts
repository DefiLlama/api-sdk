import type { BaseClient } from "../client.js";
import type { DatInstitutionsResponse, DatInstitutionResponse } from "../types/dat.js";

/**
 * Module for accessing Digital Asset Treasury (DAT) data from DefiLlama.
 * Provides methods for fetching institutional digital asset holdings,
 * mNAV calculations, and treasury analytics.
 * All endpoints require a Pro API key.
 *
 * @example
 * ```typescript
 * const client = new DefiLlama({ apiKey: 'your-api-key' });
 * const institutions = await client.dat.getInstitutions();
 * const mstr = await client.dat.getInstitution('MSTR');
 * ```
 */
export class DatModule {
  constructor(private client: BaseClient) {}

  /**
   * Get comprehensive Digital Asset Treasury data for all institutions.
   * Returns detailed data about institutions holding digital assets,
   * including mNAV calculations (realized, realistic, maximum).
   * Requires a Pro API key.
   *
   * @returns Institution metadata, holdings, and mNAV data for all tracked institutions
   *
   * @example
   * ```typescript
   * const data = await client.dat.getInstitutions();
   * Object.values(data.institutionMetadata).forEach(inst => {
   *   console.log(`${inst.ticker}: ${inst.name}`);
   *   console.log(`  Bitcoin: ${inst.totalBitcoin}`);
   * });
   * ```
   */
  async getInstitutions(): Promise<DatInstitutionsResponse> {
    return this.client.get<DatInstitutionsResponse>("/dat/institutions", {
      requiresAuth: true,
      apiNamespace: "",
    });
  }

  /**
   * Get detailed Digital Asset Treasury data for a specific institution.
   * Returns comprehensive data including mNAV calculations, historical data,
   * flows, and transaction history.
   * Requires a Pro API key.
   *
   * @param symbol - Institution ticker symbol (e.g., "MSTR" for MicroStrategy)
   * @returns Detailed institution data with holdings, flows, mNAV, stats, and OHLCV
   *
   * @example
   * ```typescript
   * const mstr = await client.dat.getInstitution('MSTR');
   * console.log(`${mstr.name}`);
   * console.log(`Total USD value: $${mstr.totalUsdValue?.toLocaleString() ?? 'n/a'}`);
   * const btc = mstr.assets?.BTC;
   * if (btc) {
   *   console.log(`BTC holdings: ${btc.amount}`);
   * }
   * ```
   */
  async getInstitution(symbol: string): Promise<DatInstitutionResponse> {
    return this.client.get<DatInstitutionResponse>(
      `/dat/institutions/${encodeURIComponent(symbol)}`,
      {
        requiresAuth: true,
        apiNamespace: "",
      }
    );
  }
}
