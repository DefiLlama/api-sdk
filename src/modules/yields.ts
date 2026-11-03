import type { BaseClient } from "../client.js";
import type {
  YieldPoolsResponse,
  YieldPoolsOldResponse,
  YieldChartResponse,
  BorrowPoolsResponse,
  LendBorrowChartResponse,
  PerpsResponse,
  LsdRate,
  EarnResponse,
  EarnQueryParams,
  EarnQueryResponse,
  EarnPoolResponse,
  EarnHistoryResponse,
  BorrowMarketsResponse,
  BorrowMarketResponse,
  BorrowMarketHistoryResponse,
  YieldHistoryRange,
} from "../types/yields.js";

/**
 * Module for accessing yield farming, lending rates, and staking data.
 * All endpoints require a Pro API key.
 *
 * The v1 methods (`getPools`, `getPoolChart`, `getBorrowPools`, ...) are deprecated and
 * served from `/yields/v1/*` compatibility routes. Use the v2 methods below.
 *
 * @example
 * ```typescript
 * const client = new DefiLlama({ apiKey: 'your-api-key' });
 *
 * // All earn pools
 * const { data: pools } = await client.yields.getEarn();
 *
 * // Filtered + paginated earn pools (chain/protocol are slugs)
 * const { data, pagination } = await client.yields.queryEarn({
 *   chain: ['ethereum', 'arbitrum'],
 *   stablecoin: true,
 *   min_tvl: 1_000_000,
 * });
 *
 * // Daily history for one pool
 * const { data: history } = await client.yields.getEarnHistory('747c1d2a-c668-4682-b9f9-296708a3dd90', '30d');
 *
 * // Borrow markets
 * const { data: markets } = await client.yields.getBorrowMarkets();
 *
 * // Perpetual funding rates
 * const perps = await client.yields.getPerpFundingRates();
 * ```
 */
export class YieldsModule {
  constructor(private client: BaseClient) {}

  /**
   * Get all yield pools with current APY data.
   *
   * @deprecated Use {@link YieldsModule.getEarn} (or {@link YieldsModule.queryEarn} to filter server-side).
   * Served from the `/yields/v1/pools` compatibility route, which returns the
   * `getPoolsOld` superset (extra keys such as `pool_old`, `poolTokenAddress`, `url`).
   * Fields v2 does not compute (il7d, apyBase7d, apyBaseInception, mu, sigma, count,
   * outlier, predictions.*) are always null.
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
    return this.client.get<YieldPoolsResponse>("/v1/pools", {
      requiresAuth: true,
      apiNamespace: "yields",
    });
  }

  /**
   * Get all yield pools in legacy format with old pool identifiers.
   *
   * @deprecated Use {@link YieldsModule.getEarn}; v1 `pool_old` is v2 `pool_key`.
   * Served from the `/yields/v1/pools` compatibility route (same response as `getPools`).
   *
   * @returns Legacy yield pools data with pool_old field
   */
  async getPoolsOld(): Promise<YieldPoolsOldResponse> {
    return this.client.get<YieldPoolsOldResponse>("/v1/pools", {
      requiresAuth: true,
      apiNamespace: "yields",
    });
  }

  /**
   * Get historical APY and TVL data for a specific pool.
   *
   * @deprecated Use {@link YieldsModule.getEarnHistory}. Served from `/yields/v1/chart/{pool}`.
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
      `/v1/chart/${encodeURIComponent(pool)}`,
      { requiresAuth: true, apiNamespace: "yields" }
    );
  }

  /**
   * Get all lending/borrowing pools with supply and borrow rates.
   *
   * @deprecated Use {@link YieldsModule.getBorrowMarkets}. Served from `/yields/v1/poolsBorrow`.
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
    return this.client.get<BorrowPoolsResponse>("/v1/poolsBorrow", {
      requiresAuth: true,
      apiNamespace: "yields",
    });
  }

  /**
   * Get historical lending and borrowing rates for a specific pool.
   *
   * @deprecated Use {@link YieldsModule.getBorrowMarketHistory} (borrow side) plus
   * {@link YieldsModule.getEarnHistory} (supply side). Served from `/yields/v1/chartLendBorrow/{pool}`.
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
      `/v1/chartLendBorrow/${encodeURIComponent(pool)}`,
      { requiresAuth: true, apiNamespace: "yields" }
    );
  }

  /**
   * Get perpetual futures funding rates across exchanges.
   *
   * @deprecated Use {@link YieldsModule.getPerpFundingRates}; this is an alias for it.
   * Same response shape and markets as the old `/yields/perps`, but `perp_id`
   * values differ: match markets on `marketplace` + `market`.
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
    return this.getPerpFundingRates();
  }

  /**
   * Get liquid staking derivative (LSD) exchange rates and peg data.
   *
   * @deprecated Use {@link YieldsModule.getLstRates}; this is an alias for it.
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
    return this.getLstRates();
  }

  /**
   * Get all earn pools. Replaces {@link YieldsModule.getPools}.
   *
   * Changes from v1: `protocol` is a display name (no project slug); lending
   * `tvl_usd` is total supplied; APY is nested (`apy.current|avg_7d|avg_30d.{base,reward,total}`);
   * tokens are objects; only pools with at least $10K supplied are listed.
   *
   * @example
   * ```typescript
   * const { data } = await client.yields.getEarn();
   * const top = data
   *   .filter(p => p.apy.current.total !== null)
   *   .sort((a, b) => (b.apy.current.total ?? 0) - (a.apy.current.total ?? 0))
   *   .slice(0, 10);
   * ```
   */
  async getEarn(): Promise<EarnResponse> {
    return this.client.get<EarnResponse>("/v2/earn", {
      requiresAuth: true,
      apiNamespace: "yields",
    });
  }

  /**
   * Filter and paginate earn pools server-side. Rows have the same shape as {@link YieldsModule.getEarn}
   * and are sorted by TVL descending.
   *
   * `chain` and `protocol` are slugs (e.g. "ethereum", "aave-v3"), up to 20 values each.
   * Responses only carry display names, not slugs.
   *
   * @example
   * ```typescript
   * const { data, pagination } = await client.yields.queryEarn({
   *   protocol: 'aave-v3',
   *   stablecoin: true,
   *   limit: 50,
   *   page: 2,
   * });
   * ```
   */
  async queryEarn(params?: EarnQueryParams): Promise<EarnQueryResponse> {
    return this.client.get<EarnQueryResponse>("/v2/earn/query", {
      params,
      requiresAuth: true,
      apiNamespace: "yields",
    });
  }

  /**
   * Get one earn pool with holder detail (top 10 holders, holder count changes)
   * and which history series exist.
   *
   * @param id - Pool UUID (same id as v1 `pool`)
   * @throws NotFoundError if the pool is not in v2
   */
  async getEarnPool(id: string): Promise<EarnPoolResponse> {
    return this.client.get<EarnPoolResponse>(`/v2/earn/${encodeURIComponent(id)}`, {
      requiresAuth: true,
      apiNamespace: "yields",
    });
  }

  /**
   * Get daily TVL/APY history for an earn pool. Replaces {@link YieldsModule.getPoolChart}.
   *
   * Changes from v1: one point per day (`date`, YYYY-MM-DD) with nested
   * `apy.avg_1d|avg_7d|avg_30d`; lending `tvl_usd` is total supplied.
   *
   * @param id - Pool UUID
   * @param range - "30d", "90d" or "max" (server default: "max")
   * @throws NotFoundError if the pool is not in v2
   */
  async getEarnHistory(id: string, range?: YieldHistoryRange): Promise<EarnHistoryResponse> {
    return this.client.get<EarnHistoryResponse>(
      `/v2/earn/${encodeURIComponent(id)}/history`,
      { params: { range }, requiresAuth: true, apiNamespace: "yields" }
    );
  }

  /**
   * Get all borrow markets. Replaces {@link YieldsModule.getBorrowPools}.
   *
   * Changes from v1: `protocol` is a display name (no project slug); supply and
   * borrow APY are nested (`supply_apy`, `borrow_cost_apy`); tokens are objects
   * (`collateral_token`, `borrow_token`).
   */
  async getBorrowMarkets(): Promise<BorrowMarketsResponse> {
    return this.client.get<BorrowMarketsResponse>("/v2/borrow/markets", {
      requiresAuth: true,
      apiNamespace: "yields",
    });
  }

  /**
   * Get one borrow market and which history series exist.
   *
   * @param id - Pool UUID
   * @throws NotFoundError if the market is not in v2
   */
  async getBorrowMarket(id: string): Promise<BorrowMarketResponse> {
    return this.client.get<BorrowMarketResponse>(
      `/v2/borrow/markets/${encodeURIComponent(id)}`,
      { requiresAuth: true, apiNamespace: "yields" }
    );
  }

  /**
   * Get daily borrow-side history for a market. Together with {@link YieldsModule.getEarnHistory}
   * (supply side, same id) this replaces {@link YieldsModule.getLendBorrowChart}.
   *
   * @param id - Pool UUID
   * @param range - "30d", "90d" or "max" (server default: "max")
   * @throws NotFoundError if the market is not in v2
   */
  async getBorrowMarketHistory(
    id: string,
    range?: YieldHistoryRange
  ): Promise<BorrowMarketHistoryResponse> {
    return this.client.get<BorrowMarketHistoryResponse>(
      `/v2/borrow/markets/${encodeURIComponent(id)}/history`,
      { params: { range }, requiresAuth: true, apiNamespace: "yields" }
    );
  }

  /**
   * Get liquid staking token (LST) exchange rates and peg data.
   *
   * @returns LST tokens with expected/market rates and ETH peg deviation
   *
   * @example
   * ```typescript
   * const rates = await client.yields.getLstRates();
   * const depegged = rates.filter(l => Math.abs(l.ethPeg ?? 0) > 1);
   * ```
   */
  async getLstRates(): Promise<LsdRate[]> {
    return this.client.get<LsdRate[]>("/lstRates", { requiresAuth: true });
  }

  /**
   * Get perpetual futures funding rates, open interest and index price for
   * Binance and OKX markets, with 7d/30d average and sum of settled funding rates.
   *
   * @example
   * ```typescript
   * const { data } = await client.yields.getPerpFundingRates();
   * const positiveFunding = data.filter(p => (p.fundingRate ?? 0) > 0);
   * ```
   */
  async getPerpFundingRates(): Promise<PerpsResponse> {
    return this.client.get<PerpsResponse>("/perpFundingRates", { requiresAuth: true });
  }
}
