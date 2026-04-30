import type { BaseClient } from "../client.js";
import type {
  RwaPerpsAggregateHistoricalPoint,
  RwaPerpsBreakdownChartResponse,
  RwaPerpsBreakdownKey,
  RwaPerpsFundingHistoryOptions,
  RwaPerpsFundingHistoryPoint,
  RwaPerpsIdMapResponse,
  RwaPerpsListResponse,
  RwaPerpsMarket,
  RwaPerpsMarketChartPoint,
  RwaPerpsOverviewBreakdown,
  RwaPerpsStatsResponse,
} from "../types/rwaPerps.js";

/**
 * Module for accessing RWA perpetuals (perps) market data from DefiLlama.
 * Provides methods for fetching the latest snapshot of all tracked perps
 * markets, aggregate stats, filters by contract / venue / category /
 * asset group, per-market and aggregate historical charts, overview /
 * contract breakdown charts, and per-market funding history.
 * All endpoints require a Pro API key.
 *
 * @example
 * ```typescript
 * const client = new DefiLlama({ apiKey: 'your-api-key' });
 * const stats = await client.rwaPerps.getStats();
 * console.log(`Tracking ${stats.totalMarkets} perps markets`);
 *
 * const hyperliquidMarkets = await client.rwaPerps.getMarketsByVenue('hyperliquid');
 * console.log(`Hyperliquid markets: ${hyperliquidMarkets.length}`);
 * ```
 */
export class RwaPerpsModule {
  constructor(private client: BaseClient) {}

  /**
   * Get the latest snapshot of every tracked RWA perps market, sorted by
   * descending open interest.
   * Requires a Pro API key.
   *
   * @returns Array of market records with open interest, volume, price,
   *          funding, and metadata.
   *
   * @example
   * ```typescript
   * const markets = await client.rwaPerps.getCurrent();
   * const top = markets.slice(0, 5);
   * top.forEach(m => console.log(`${m.contract}@${m.venue}: $${m.openInterest.toLocaleString()} OI`));
   * ```
   */
  async getCurrent(): Promise<RwaPerpsMarket[]> {
    return this.client.get<RwaPerpsMarket[]>("/current", {
      requiresAuth: true,
      apiNamespace: "rwa-perps",
    });
  }

  /**
   * Get a lightweight enumeration of every tracked contract, venue, category,
   * and asset group plus the total market count.
   * Requires a Pro API key.
   *
   * @returns Enumeration response.
   *
   * @example
   * ```typescript
   * const list = await client.rwaPerps.getList();
   * console.log(`${list.total} markets across ${list.venues.length} venues`);
   * ```
   */
  async getList(): Promise<RwaPerpsListResponse> {
    return this.client.get<RwaPerpsListResponse>("/list", {
      requiresAuth: true,
      apiNamespace: "rwa-perps",
    });
  }

  /**
   * Get aggregate stats for all tracked perps markets, segmented by venue,
   * category, and asset group.
   * Requires a Pro API key.
   *
   * @returns Aggregate stats response.
   *
   * @example
   * ```typescript
   * const stats = await client.rwaPerps.getStats();
   * console.log(`Total OI: $${stats.totalOpenInterest.toLocaleString()}`);
   * const hl = stats.byVenue['hyperliquid'];
   * if (hl) console.log(`Hyperliquid: ${hl.markets} markets, $${hl.openInterest} OI`);
   * ```
   */
  async getStats(): Promise<RwaPerpsStatsResponse> {
    return this.client.get<RwaPerpsStatsResponse>("/stats", {
      requiresAuth: true,
      apiNamespace: "rwa-perps",
    });
  }

  /**
   * Get a map of canonical market id (and aliases) to resolved id, suitable
   * for resolving slugs before calling the chart and funding routes.
   * Requires a Pro API key.
   *
   * @returns Map of name to resolved id.
   *
   * @example
   * ```typescript
   * const idMap = await client.rwaPerps.getIdMap();
   * const id = idMap['hyperliquid:btc-usd'];
   * ```
   */
  async getIdMap(): Promise<RwaPerpsIdMapResponse> {
    return this.client.get<RwaPerpsIdMapResponse>("/id-map", {
      requiresAuth: true,
      apiNamespace: "rwa-perps",
    });
  }

  /**
   * Get a single perps market by id (or alias). The server resolves common
   * aliases via the id-map before lookup.
   * Requires a Pro API key.
   *
   * @param id - Market id (e.g. `'hyperliquid:btc-usd'`) or alias.
   * @returns The matching market record.
   *
   * @example
   * ```typescript
   * const market = await client.rwaPerps.getMarket('hyperliquid:btc-usd');
   * console.log(`Funding rate: ${market.fundingRate}`);
   * ```
   */
  async getMarket(id: string): Promise<RwaPerpsMarket> {
    return this.client.get<RwaPerpsMarket>(`/market/${encodeURIComponent(id)}`, {
      requiresAuth: true,
      apiNamespace: "rwa-perps",
    });
  }

  /**
   * Get all perps markets that share a contract identifier.
   * Requires a Pro API key.
   *
   * Note: the upstream server returns `404` (surfaced as `NotFoundError`) when
   * no markets match the contract, rather than an empty array.
   *
   * @param contract - Contract identifier (matched after slugification).
   * @returns Markets matching the contract.
   * @throws {NotFoundError} If no markets match the contract.
   *
   * @example
   * ```typescript
   * const markets = await client.rwaPerps.getMarketsByContract('btc-usd');
   * ```
   */
  async getMarketsByContract(contract: string): Promise<RwaPerpsMarket[]> {
    return this.client.get<RwaPerpsMarket[]>(
      `/contract/${encodeURIComponent(contract)}`,
      { requiresAuth: true, apiNamespace: "rwa-perps" }
    );
  }

  /**
   * Get all perps markets at a given venue.
   * Requires a Pro API key.
   *
   * Note: the upstream server returns `404` (surfaced as `NotFoundError`) when
   * no markets match the venue, rather than an empty array.
   *
   * @param venue - Venue identifier, e.g. `'hyperliquid'`.
   * @returns Markets at the venue.
   * @throws {NotFoundError} If no markets match the venue.
   */
  async getMarketsByVenue(venue: string): Promise<RwaPerpsMarket[]> {
    return this.client.get<RwaPerpsMarket[]>(
      `/venue/${encodeURIComponent(venue)}`,
      { requiresAuth: true, apiNamespace: "rwa-perps" }
    );
  }

  /**
   * Get all perps markets in a given category.
   * Requires a Pro API key.
   *
   * Note: the upstream server returns `404` (surfaced as `NotFoundError`) when
   * no markets match the category, rather than an empty array.
   *
   * @throws {NotFoundError} If no markets match the category.
   */
  async getMarketsByCategory(category: string): Promise<RwaPerpsMarket[]> {
    return this.client.get<RwaPerpsMarket[]>(
      `/category/${encodeURIComponent(category)}`,
      { requiresAuth: true, apiNamespace: "rwa-perps" }
    );
  }

  /**
   * Get all perps markets in a given asset group.
   * Requires a Pro API key.
   *
   * Note: unlike the other perps filter routes, this one returns an empty
   * array (not `404`) when no markets match.
   */
  async getMarketsByAssetGroup(assetGroup: string): Promise<RwaPerpsMarket[]> {
    return this.client.get<RwaPerpsMarket[]>(
      `/assetGroup/${encodeURIComponent(assetGroup)}`,
      { requiresAuth: true, apiNamespace: "rwa-perps" }
    );
  }

  /**
   * Get the per-market historical chart by id (or alias). The server resolves
   * aliases via the id-map before serving the chart file.
   * Requires a Pro API key.
   *
   * @param id - Market id or alias.
   * @returns Historical time-series for OI, volume, price, funding, premium.
   *
   * @example
   * ```typescript
   * const series = await client.rwaPerps.getMarketChart('hyperliquid:btc-usd');
   * const latest = series.at(-1);
   * console.log('Latest OI:', latest?.openInterest);
   * ```
   */
  async getMarketChart(id: string): Promise<RwaPerpsMarketChartPoint[]> {
    return this.client.get<RwaPerpsMarketChartPoint[]>(`/chart/${encodeURIComponent(id)}`, {
      requiresAuth: true,
      apiNamespace: "rwa-perps",
    });
  }

  /**
   * Get the aggregated historical chart for a single venue.
   * Requires a Pro API key.
   *
   * @param venue - Venue identifier, e.g. `'hyperliquid'`.
   * @returns Aggregate time-series for the venue.
   */
  async getVenueChart(venue: string): Promise<RwaPerpsAggregateHistoricalPoint[]> {
    return this.client.get<RwaPerpsAggregateHistoricalPoint[]>(
      `/chart/venue/${encodeURIComponent(venue)}`,
      { requiresAuth: true, apiNamespace: "rwa-perps" }
    );
  }

  /**
   * Get the aggregated historical chart for a single category.
   * Requires a Pro API key.
   */
  async getCategoryChart(category: string): Promise<RwaPerpsAggregateHistoricalPoint[]> {
    return this.client.get<RwaPerpsAggregateHistoricalPoint[]>(
      `/chart/category/${encodeURIComponent(category)}`,
      { requiresAuth: true, apiNamespace: "rwa-perps" }
    );
  }

  /**
   * Get an overview breakdown chart, optionally scoped to a single venue or
   * asset group. Returned as a row-per-timestamp time series with one column
   * per bucket.
   *
   * Note: the upstream server restricts which `breakdown` values are valid
   * for each scope, e.g. `'venue'` is only valid when neither `venue` nor
   * `assetGroup` is set; invalid combinations return `400`.
   * Requires a Pro API key.
   *
   * @param options.key - Metric to chart (`'openInterest' | 'volume24h' | 'markets'`).
   * @param options.breakdown - Bucket dimension to break down by.
   * @param options.venue - Restrict to a single venue (mutually exclusive with `assetGroup`).
   * @param options.assetGroup - Restrict to a single asset group.
   *
   * @example
   * ```typescript
   * const rows = await client.rwaPerps.getOverviewBreakdownChart({
   *   key: 'openInterest',
   *   breakdown: 'venue',
   * });
   * const latest = rows.at(-1);
   * if (latest) {
   *   const { timestamp, ...byVenue } = latest;
   *   console.log('Latest OI by venue:', byVenue);
   * }
   * ```
   */
  async getOverviewBreakdownChart(options: {
    key: RwaPerpsBreakdownKey;
    breakdown: RwaPerpsOverviewBreakdown;
    venue?: string;
    assetGroup?: string;
  }): Promise<RwaPerpsBreakdownChartResponse> {
    const params: Record<string, string> = {
      key: options.key,
      breakdown: options.breakdown,
    };
    if (options.venue) params.venue = options.venue;
    if (options.assetGroup) params.assetGroup = options.assetGroup;

    return this.client.get<RwaPerpsBreakdownChartResponse>("/chart/overview-breakdown", {
      requiresAuth: true,
      apiNamespace: "rwa-perps",
      params,
    });
  }

  /**
   * Get the contract breakdown chart, with one column per contract.
   * Optionally scoped to a single venue or asset group.
   * Requires a Pro API key.
   *
   * @param options.key - Metric to chart (`'openInterest' | 'volume24h' | 'markets'`).
   * @param options.venue - Restrict to a single venue.
   * @param options.assetGroup - Restrict to a single asset group.
   *
   * @example
   * ```typescript
   * const rows = await client.rwaPerps.getContractBreakdownChart({
   *   key: 'volume24h',
   *   venue: 'hyperliquid',
   * });
   * ```
   */
  async getContractBreakdownChart(options: {
    key: RwaPerpsBreakdownKey;
    venue?: string;
    assetGroup?: string;
  }): Promise<RwaPerpsBreakdownChartResponse> {
    const params: Record<string, string> = { key: options.key };
    if (options.venue) params.venue = options.venue;
    if (options.assetGroup) params.assetGroup = options.assetGroup;

    return this.client.get<RwaPerpsBreakdownChartResponse>("/chart/contract-breakdown", {
      requiresAuth: true,
      apiNamespace: "rwa-perps",
      params,
    });
  }

  /**
   * Get the per-market funding payment history from the upstream Postgres
   * store. Optional `startTime`/`endTime` are inclusive unix-second bounds.
   * Numeric fields are returned as strings to preserve full NUMERIC precision.
   * Requires a Pro API key.
   *
   * @param id - Market id or alias.
   * @param options - Optional time range filters.
   * @returns Array of funding payment records ordered by timestamp.
   *
   * @example
   * ```typescript
   * const sevenDaysAgo = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60;
   * const history = await client.rwaPerps.getFundingHistory('hyperliquid:btc-usd', {
   *   startTime: sevenDaysAgo,
   * });
   * console.log(`${history.length} funding payments in the last 7 days`);
   * ```
   */
  async getFundingHistory(
    id: string,
    options?: RwaPerpsFundingHistoryOptions
  ): Promise<RwaPerpsFundingHistoryPoint[]> {
    const params: Record<string, number> = {};
    if (options?.startTime !== undefined) params.startTime = options.startTime;
    if (options?.endTime !== undefined) params.endTime = options.endTime;

    return this.client.get<RwaPerpsFundingHistoryPoint[]>(
      `/funding/${encodeURIComponent(id)}`,
      {
        requiresAuth: true,
        apiNamespace: "rwa-perps",
        params: Object.keys(params).length > 0 ? params : undefined,
      }
    );
  }
}
