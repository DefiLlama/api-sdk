import type { BaseClient } from "../client.js";
import type {
  StablecoinsResponse,
  StablecoinChartDataPoint,
  StablecoinChainDataPoint,
  StablecoinDetails,
  StablecoinChainMcap,
  StablecoinPricePoint,
  StablecoinDominanceDataPoint,
} from "../types/stablecoins.js";

/**
 * Module for accessing stablecoin data from DefiLlama.
 * Provides methods for fetching stablecoin market caps, charts, and dominance metrics.
 *
 * @example
 * ```typescript
 * const client = new DefiLlama();
 * const stablecoins = await client.stablecoins.getStablecoins();
 * const usdtDetails = await client.stablecoins.getStablecoin('1');
 * ```
 */
export class StablecoinsModule {
  constructor(private client: BaseClient) {}

  /**
   * Get a list of all stablecoins with their current market cap.
   *
   * @param includePrices - Whether to include price data in the response
   * @returns List of all stablecoins with circulating supply and chain breakdown
   *
   * @example
   * ```typescript
   * const { peggedAssets } = await client.stablecoins.getStablecoins();
   * console.log(`${peggedAssets.length} stablecoins tracked`);
   * console.log(peggedAssets[0].name, peggedAssets[0].circulating.peggedUSD);
   * ```
   */
  async getStablecoins(includePrices?: boolean): Promise<StablecoinsResponse> {
    return this.client.get<StablecoinsResponse>("/stablecoins", {
      base: "stablecoins",
      params: includePrices !== undefined ? { includePrices } : undefined,
    });
  }

  /**
   * Get historical market cap data for all stablecoins combined.
   *
   * @returns Array of historical data points with total circulating supply
   *
   * @example
   * ```typescript
   * const charts = await client.stablecoins.getAllCharts();
   * const latest = charts[charts.length - 1];
   * console.log(`Total stablecoin mcap: $${latest.totalCirculatingUSD.peggedUSD}`);
   * ```
   */
  async getAllCharts(): Promise<StablecoinChartDataPoint[]> {
    return this.client.get<StablecoinChartDataPoint[]>("/stablecoincharts/all", {
      base: "stablecoins",
    });
  }

  /**
   * Get historical market cap data for stablecoins on a specific chain.
   *
   * @param chain - Chain name (e.g., "Ethereum", "BSC", "Polygon")
   * @returns Array of historical data points for the specified chain
   *
   * @example
   * ```typescript
   * const ethCharts = await client.stablecoins.getChartsByChain('Ethereum');
   * console.log(`${ethCharts.length} data points for Ethereum`);
   * ```
   */
  async getChartsByChain(chain: string): Promise<StablecoinChainDataPoint[]> {
    return this.client.get<StablecoinChainDataPoint[]>(
      `/stablecoincharts/${encodeURIComponent(chain)}`,
      { base: "stablecoins" }
    );
  }

  /**
   * Get detailed information about a specific stablecoin including chain distribution.
   *
   * @param asset - Stablecoin ID (e.g., "1" for USDT, "2" for USDC)
   * @returns Detailed stablecoin data with chain balances and metadata
   *
   * @example
   * ```typescript
   * const usdt = await client.stablecoins.getStablecoin('1');
   * console.log(`${usdt.name} (${usdt.symbol})`);
   * console.log(`Peg mechanism: ${usdt.pegMechanism}`);
   * ```
   */
  async getStablecoin(asset: string): Promise<StablecoinDetails> {
    return this.client.get<StablecoinDetails>(
      `/stablecoin/${encodeURIComponent(asset)}`,
      { base: "stablecoins" }
    );
  }

  /**
   * Get current stablecoin market cap for all chains.
   *
   * @returns Array of chains with their total stablecoin market cap
   *
   * @example
   * ```typescript
   * const chains = await client.stablecoins.getChains();
   * chains.forEach(chain => {
   *   console.log(`${chain.name}: $${chain.totalCirculatingUSD.peggedUSD}`);
   * });
   * ```
   */
  async getChains(): Promise<StablecoinChainMcap[]> {
    return this.client.get<StablecoinChainMcap[]>("/stablecoinchains", {
      base: "stablecoins",
    });
  }

  /**
   * Get historical prices for all stablecoins.
   *
   * @returns Array of historical price data points
   *
   * @example
   * ```typescript
   * const prices = await client.stablecoins.getPrices();
   * const latest = prices[prices.length - 1];
   * console.log(`Price data for ${Object.keys(latest.prices).length} stablecoins`);
   * ```
   */
  async getPrices(): Promise<StablecoinPricePoint[]> {
    return this.client.get<StablecoinPricePoint[]>("/stablecoinprices", {
      base: "stablecoins",
    });
  }

  /**
   * Get stablecoin dominance data for a specific chain.
   * Requires a Pro API key.
   *
   * @param chain - Chain slug (e.g., "ethereum", "bsc")
   * @param stablecoinId - Optional stablecoin ID to filter by
   * @returns Array of dominance data points with the largest stablecoin info
   *
   * @example
   * ```typescript
   * const dominance = await client.stablecoins.getDominance('ethereum');
   * const latest = dominance[dominance.length - 1];
   * console.log(`Dominant stablecoin: ${latest.greatestMcap.symbol}`);
   * console.log(`Market cap: $${latest.greatestMcap.mcap}`);
   * ```
   */
  async getDominance(
    chain: string,
    stablecoinId?: number
  ): Promise<StablecoinDominanceDataPoint[]> {
    return this.client.get<StablecoinDominanceDataPoint[]>(
      `/stablecoindominance/${encodeURIComponent(chain)}`,
      {
        requiresAuth: true,
        apiNamespace: "stablecoins",
        params: stablecoinId !== undefined ? { stablecoin: stablecoinId } : undefined,
      }
    );
  }
}
