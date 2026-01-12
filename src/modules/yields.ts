import type { BaseClient } from "../client.js";
import type {
  YieldPoolsResponse,
  YieldPoolsOldResponse,
  YieldChartResponse,
  BorrowPoolsResponse,
  LendBorrowChartResponse,
  PerpsResponse,
  LsdRate,
} from "../types/yields.js";

/**
 * Module for accessing yield farming, lending rates, and staking data.
 * All endpoints require a Pro API key.
 *
 * @example
 * ```typescript
 * const client = new DefiLlama({ apiKey: 'your-api-key' });
 *
 * // Get all yield pools
 * const pools = await client.yields.getPools();
 *
 * // Get historical data for a specific pool
 * const chart = await client.yields.getPoolChart('747c1d2a-c668-4682-b9f9-296708a3dd90');
 *
 * // Get perpetual funding rates
 * const perps = await client.yields.getPerps();
 * ```
 */
export class YieldsModule {
  constructor(private client: BaseClient) {}

  /**
   * Get all yield pools with current APY data.
   *
   * @returns All yield farming pools with TVL, APY, and metadata
   *
   * @example
   * ```typescript
   * const { data } = await client.yields.getPools();
   * const topPools = data
   *   .filter(p => p.apy !== null)
   *   .sort((a, b) => (b.apy ?? 0) - (a.apy ?? 0))
   *   .slice(0, 10);
   * ```
   */
  async getPools(): Promise<YieldPoolsResponse> {
    return this.client.get<YieldPoolsResponse>("/pools", {
      requiresAuth: true,
      apiNamespace: "yields",
    });
  }

  /**
   * Get all yield pools in legacy format with old pool identifiers.
   *
   * @returns Legacy yield pools data with pool_old field
   */
  async getPoolsOld(): Promise<YieldPoolsOldResponse> {
    return this.client.get<YieldPoolsOldResponse>("/poolsOld", {
      requiresAuth: true,
      apiNamespace: "yields",
    });
  }

  /**
   * Get historical APY and TVL data for a specific pool.
   *
   * @param pool - Pool UUID (e.g., "747c1d2a-c668-4682-b9f9-296708a3dd90")
   * @returns Historical time series data for the pool
   *
   * @example
   * ```typescript
   * const { data } = await client.yields.getPoolChart('747c1d2a-c668-4682-b9f9-296708a3dd90');
   * const avgApy = data.reduce((sum, p) => sum + (p.apy ?? 0), 0) / data.length;
   * ```
   */
  async getPoolChart(pool: string): Promise<YieldChartResponse> {
    return this.client.get<YieldChartResponse>(
      `/chart/${encodeURIComponent(pool)}`,
      { requiresAuth: true, apiNamespace: "yields" }
    );
  }

  /**
   * Get all lending/borrowing pools with supply and borrow rates.
   *
   * @returns Pools with lending APY, borrowing APY, and utilization data
   *
   * @example
   * ```typescript
   * const { data } = await client.yields.getBorrowPools();
   * const lowBorrowRates = data
   *   .filter(p => p.apyBaseBorrow !== null && p.apyBaseBorrow < 5)
   *   .sort((a, b) => (a.apyBaseBorrow ?? 0) - (b.apyBaseBorrow ?? 0));
   * ```
   */
  async getBorrowPools(): Promise<BorrowPoolsResponse> {
    return this.client.get<BorrowPoolsResponse>("/poolsBorrow", {
      requiresAuth: true,
      apiNamespace: "yields",
    });
  }

  /**
   * Get historical lending and borrowing rates for a specific pool.
   *
   * @param pool - Pool UUID
   * @returns Historical supply/borrow rates and utilization
   *
   * @example
   * ```typescript
   * const { data } = await client.yields.getLendBorrowChart('e880e828-ca59-4ec6-8d4f-27182a4dc23d');
   * ```
   */
  async getLendBorrowChart(pool: string): Promise<LendBorrowChartResponse> {
    return this.client.get<LendBorrowChartResponse>(
      `/chartLendBorrow/${encodeURIComponent(pool)}`,
      { requiresAuth: true, apiNamespace: "yields" }
    );
  }

  /**
   * Get perpetual futures funding rates across exchanges.
   *
   * @returns Funding rates, open interest, and price data for perp markets
   *
   * @example
   * ```typescript
   * const { data } = await client.yields.getPerps();
   * const binancePerps = data.filter(p => p.marketplace === 'Binance');
   * const positiveFunding = data.filter(p => (p.fundingRate ?? 0) > 0);
   * ```
   */
  async getPerps(): Promise<PerpsResponse> {
    return this.client.get<PerpsResponse>("/perps", {
      requiresAuth: true,
      apiNamespace: "yields",
    });
  }

  /**
   * Get liquid staking derivative (LSD) exchange rates and peg data.
   *
   * @returns LSD tokens with expected/market rates and ETH peg deviation
   *
   * @example
   * ```typescript
   * const lsdRates = await client.yields.getLsdRates();
   * const depegged = lsdRates.filter(l => Math.abs(l.ethPeg ?? 0) > 1);
   * ```
   */
  async getLsdRates(): Promise<LsdRate[]> {
    return this.client.get<LsdRate[]>("/lsdRates", {
      requiresAuth: true,
      apiNamespace: "yields",
    });
  }
}
