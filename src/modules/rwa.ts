import type { BaseClient } from "../client.js";
import type {
  RwaAsset,
  RwaAssetBreakdownSeries,
  RwaAssetChartPoint,
  RwaAssetsBySliceResponse,
  RwaBreakdownChartResponse,
  RwaBreakdownOptions,
  RwaHistoricalSeries,
  RwaIdMapResponse,
  RwaListResponse,
  RwaStatsResponse,
} from "../types/rwa.js";

/**
 * Module for accessing Real World Asset (RWA) spot dashboard data from DefiLlama.
 * Provides methods for fetching the latest snapshot of all tracked RWAs,
 * aggregate stats, slice filters (by chain / category / asset group),
 * per-asset and slice-level historical charts, and overview breakdown charts.
 * All endpoints require a Pro API key.
 *
 * @example
 * ```typescript
 * const client = new DefiLlama({ apiKey: 'your-api-key' });
 * const stats = await client.rwa.getStats();
 * console.log(`Tracking ${stats.assetCount} assets across ${stats.assetIssuers} issuers`);
 *
 * const ondoAssets = await client.rwa.getAssetsByCategory('Treasuries');
 * console.log(`Treasury assets: ${ondoAssets.data.length}`);
 * ```
 */
export class RwaModule {
  constructor(private client: BaseClient) {}

  /**
   * Get the latest snapshot of every tracked RWA asset.
   * Requires a Pro API key.
   *
   * @returns Array of asset records with current on-chain market caps,
   *          active market caps, DeFi active TVL by chain, and metadata.
   *
   * @example
   * ```typescript
   * const assets = await client.rwa.getCurrent();
   * const topByMcap = assets
   *   .filter(a => a.onChainMcap)
   *   .map(a => ({
   *     ticker: a.ticker,
   *     mcap: Object.values(a.onChainMcap ?? {}).reduce((s, v) => s + v, 0),
   *   }))
   *   .sort((a, b) => b.mcap - a.mcap);
   * console.log('Top RWA by on-chain mcap:', topByMcap.slice(0, 5));
   * ```
   */
  async getCurrent(): Promise<RwaAsset[]> {
    return this.client.get<RwaAsset[]>("/current", {
      requiresAuth: true,
      apiNamespace: "rwa",
    });
  }

  /**
   * Get a lightweight enumeration of every canonical market id, platform, chain,
   * category, and asset group plus an `idMap` from canonical market id to the
   * underlying asset id used by the per-asset chart and lookup routes.
   * Requires a Pro API key.
   *
   * @returns Enumeration response.
   *
   * @example
   * ```typescript
   * const list = await client.rwa.getList();
   * console.log(`${list.canonicalMarketIds.length} markets across ${list.chains.length} chains`);
   * const ondoId = list.idMap['ondo-finance-usdy'];
   * ```
   */
  async getList(): Promise<RwaListResponse> {
    return this.client.get<RwaListResponse>("/list", {
      requiresAuth: true,
      apiNamespace: "rwa",
    });
  }

  /**
   * Get aggregate stats for all tracked RWAs, segmented by chain, category,
   * platform, and asset group. Each segment is split into four non-overlapping
   * slices (`base`, `stablecoinsOnly`, `governanceOnly`, `stablecoinsAndGovernance`).
   * Requires a Pro API key.
   *
   * @returns Aggregate stats response.
   *
   * @example
   * ```typescript
   * const stats = await client.rwa.getStats();
   * console.log(`Total on-chain mcap: $${stats.totalOnChainMcap.toLocaleString()}`);
   * const ethereum = stats.byChain['Ethereum']?.base;
   * if (ethereum) {
   *   console.log(`Ethereum: ${ethereum.assetCount} assets, ${ethereum.assetIssuers.length} issuers`);
   * }
   * ```
   */
  async getStats(): Promise<RwaStatsResponse> {
    return this.client.get<RwaStatsResponse>("/stats", {
      requiresAuth: true,
      apiNamespace: "rwa",
    });
  }

  /**
   * Get a map of canonical market id -> underlying asset id, suitable for
   * resolving slugs to ids before calling the chart routes.
   * Requires a Pro API key.
   *
   * @returns Map of canonical market id to asset id.
   *
   * @example
   * ```typescript
   * const idMap = await client.rwa.getIdMap();
   * const id = idMap['ondo-finance-usdy'];
   * if (id) {
   *   const chart = await client.rwa.getAssetChart(String(id));
   * }
   * ```
   */
  async getIdMap(): Promise<RwaIdMapResponse> {
    return this.client.get<RwaIdMapResponse>("/id-map", {
      requiresAuth: true,
      apiNamespace: "rwa",
    });
  }

  /**
   * Get a single RWA asset by its underlying id.
   * Requires a Pro API key.
   *
   * @param id - Underlying asset id (e.g. the value from `getList().idMap`).
   * @returns The matching asset record.
   *
   * @example
   * ```typescript
   * const asset = await client.rwa.getAsset('1234');
   * console.log(`${asset.ticker} on ${asset.primaryChain ?? 'multi-chain'}`);
   * ```
   */
  async getAsset(id: string): Promise<RwaAsset> {
    return this.client.get<RwaAsset>(`/rwa/${encodeURIComponent(id)}`, {
      requiresAuth: true,
      apiNamespace: "rwa",
    });
  }

  /**
   * Get a single RWA asset by its canonical market id (the human-readable slug).
   * Requires a Pro API key.
   *
   * @param canonicalMarketId - Canonical market id, e.g. `'ondo-finance-usdy'`.
   * @returns The matching asset record.
   *
   * @example
   * ```typescript
   * const asset = await client.rwa.getAssetByCanonicalMarketId('ondo-finance-usdy');
   * console.log(`Issuer: ${asset.issuer ?? 'unknown'}`);
   * ```
   */
  async getAssetByCanonicalMarketId(canonicalMarketId: string): Promise<RwaAsset> {
    return this.client.get<RwaAsset>(`/asset/${encodeURIComponent(canonicalMarketId)}`, {
      requiresAuth: true,
      apiNamespace: "rwa",
    });
  }

  /**
   * Get all RWA assets present on a given chain (label match against the chain
   * keys of `onChainMcap`, `activeMcap`, and `defiActiveTvl`).
   * Requires a Pro API key.
   *
   * Note: returns `{ data: [] }` when no assets match — the route does not 404
   * on empty results.
   *
   * @param chain - Chain label, e.g. `'Ethereum'` or `'Solana'`.
   * @returns Filtered asset list with optional snapshot timestamp.
   *
   * @example
   * ```typescript
   * const { data } = await client.rwa.getAssetsByChain('Ethereum');
   * console.log(`${data.length} RWA assets on Ethereum`);
   * ```
   */
  async getAssetsByChain(chain: string): Promise<RwaAssetsBySliceResponse> {
    return this.client.get<RwaAssetsBySliceResponse>(
      `/chain/${encodeURIComponent(chain)}`,
      { requiresAuth: true, apiNamespace: "rwa" }
    );
  }

  /**
   * Get all RWA assets in a given category.
   * Requires a Pro API key.
   *
   * Note: returns `{ data: [] }` when no assets match — the route does not 404
   * on empty results.
   *
   * @param category - Category label, e.g. `'Treasuries'` or `'Real Estate'`.
   * @returns Filtered asset list with optional snapshot timestamp.
   *
   * @example
   * ```typescript
   * const { data } = await client.rwa.getAssetsByCategory('Treasuries');
   * console.log(`${data.length} treasury-backed RWAs tracked`);
   * ```
   */
  async getAssetsByCategory(category: string): Promise<RwaAssetsBySliceResponse> {
    return this.client.get<RwaAssetsBySliceResponse>(
      `/category/${encodeURIComponent(category)}`,
      { requiresAuth: true, apiNamespace: "rwa" }
    );
  }

  /**
   * Get all RWA assets in a given asset group.
   * Requires a Pro API key.
   *
   * Note: returns `{ data: [] }` when no assets match — the route does not 404
   * on empty results.
   *
   * @param assetGroup - Asset group label, e.g. `'USD'`.
   * @returns Filtered asset list with optional snapshot timestamp.
   *
   * @example
   * ```typescript
   * const { data } = await client.rwa.getAssetsByAssetGroup('USD');
   * ```
   */
  async getAssetsByAssetGroup(assetGroup: string): Promise<RwaAssetsBySliceResponse> {
    return this.client.get<RwaAssetsBySliceResponse>(
      `/assetGroup/${encodeURIComponent(assetGroup)}`,
      { requiresAuth: true, apiNamespace: "rwa" }
    );
  }

  /**
   * Get the smoothed historical series for a single asset by id.
   * Backed by the static chart file (`charts/{id}.json`); for the richer
   * per-chain breakdown see {@link RwaModule.getAssetChart}.
   * Requires a Pro API key.
   *
   * @param id - Underlying asset id.
   * @returns Smoothed historical series (`activeMcap` is omitted for assets
   *          that opt out of active market-cap tracking).
   *
   * @example
   * ```typescript
   * const series = await client.rwa.getChart('1234');
   * const latest = series.at(-1);
   * console.log('Latest on-chain mcap:', latest?.onChainMcap);
   * ```
   */
  async getChart(id: string): Promise<RwaHistoricalSeries> {
    return this.client.get<RwaHistoricalSeries>(`/chart/${encodeURIComponent(id)}`, {
      requiresAuth: true,
      apiNamespace: "rwa",
    });
  }

  /**
   * Get the smoothed historical series for a single asset by its canonical
   * market id. Equivalent to resolving the id via {@link RwaModule.getIdMap}
   * and then calling {@link RwaModule.getChart}.
   * Requires a Pro API key.
   *
   * @param name - Canonical market id, e.g. `'ondo-finance-usdy'`.
   * @returns Smoothed historical series.
   *
   * @example
   * ```typescript
   * const series = await client.rwa.getChartByName('ondo-finance-usdy');
   * ```
   */
  async getChartByName(name: string): Promise<RwaHistoricalSeries> {
    return this.client.get<RwaHistoricalSeries>(`/chart/name/${encodeURIComponent(name)}`, {
      requiresAuth: true,
      apiNamespace: "rwa",
    });
  }

  /**
   * Get the per-asset PG-cache backed historical chart, which includes a
   * per-chain breakdown nested in each point.
   * Requires a Pro API key.
   *
   * @param id - Underlying asset id.
   * @returns Time-series with per-chain breakdown of each metric.
   *
   * @example
   * ```typescript
   * const series = await client.rwa.getAssetChart('1234');
   * const latest = series.at(-1);
   * if (latest) {
   *   for (const [chain, b] of Object.entries(latest.chains)) {
   *     console.log(`${chain}: $${b.onChainMcap.toLocaleString()}`);
   *   }
   * }
   * ```
   */
  async getAssetChart(id: string): Promise<RwaAssetChartPoint[]> {
    return this.client.get<RwaAssetChartPoint[]>(`/chart/asset/${encodeURIComponent(id)}`, {
      requiresAuth: true,
      apiNamespace: "rwa",
    });
  }

  /**
   * Get the historical aggregate chart for a single chain.
   * Requires a Pro API key.
   *
   * @param chain - Chain label, e.g. `'Ethereum'`.
   * @returns Smoothed historical series of on-chain mcap, active mcap, and DeFi active TVL.
   */
  async getChainChart(chain: string): Promise<RwaHistoricalSeries> {
    return this.client.get<RwaHistoricalSeries>(
      `/chart/chain/${encodeURIComponent(chain)}`,
      { requiresAuth: true, apiNamespace: "rwa" }
    );
  }

  /**
   * Get the per-asset breakdown chart for a single chain. Each metric is a
   * separate time series with one column per contributing asset id.
   * Requires a Pro API key.
   *
   * @param chain - Chain label, e.g. `'Ethereum'`.
   * @returns Asset-breakdown series for `onChainMcap`, `activeMcap`, and `defiActiveTvl`.
   */
  async getChainAssetBreakdownChart(chain: string): Promise<RwaAssetBreakdownSeries> {
    return this.client.get<RwaAssetBreakdownSeries>(
      `/chart/chain/${encodeURIComponent(chain)}/asset-breakdown`,
      { requiresAuth: true, apiNamespace: "rwa" }
    );
  }

  /**
   * Get the historical aggregate chart for a single category.
   * Requires a Pro API key.
   */
  async getCategoryChart(category: string): Promise<RwaHistoricalSeries> {
    return this.client.get<RwaHistoricalSeries>(
      `/chart/category/${encodeURIComponent(category)}`,
      { requiresAuth: true, apiNamespace: "rwa" }
    );
  }

  /**
   * Get the per-asset breakdown chart for a single category.
   * Requires a Pro API key.
   */
  async getCategoryAssetBreakdownChart(category: string): Promise<RwaAssetBreakdownSeries> {
    return this.client.get<RwaAssetBreakdownSeries>(
      `/chart/category/${encodeURIComponent(category)}/asset-breakdown`,
      { requiresAuth: true, apiNamespace: "rwa" }
    );
  }

  /**
   * Get the historical aggregate chart for a single platform (parent protocol).
   * Requires a Pro API key.
   */
  async getPlatformChart(platform: string): Promise<RwaHistoricalSeries> {
    return this.client.get<RwaHistoricalSeries>(
      `/chart/platform/${encodeURIComponent(platform)}`,
      { requiresAuth: true, apiNamespace: "rwa" }
    );
  }

  /**
   * Get the per-asset breakdown chart for a single platform.
   * Requires a Pro API key.
   */
  async getPlatformAssetBreakdownChart(platform: string): Promise<RwaAssetBreakdownSeries> {
    return this.client.get<RwaAssetBreakdownSeries>(
      `/chart/platform/${encodeURIComponent(platform)}/asset-breakdown`,
      { requiresAuth: true, apiNamespace: "rwa" }
    );
  }

  /**
   * Get the historical aggregate chart for a single asset group.
   * Requires a Pro API key.
   */
  async getAssetGroupChart(assetGroup: string): Promise<RwaHistoricalSeries> {
    return this.client.get<RwaHistoricalSeries>(
      `/chart/assetGroup/${encodeURIComponent(assetGroup)}`,
      { requiresAuth: true, apiNamespace: "rwa" }
    );
  }

  /**
   * Get the per-asset breakdown chart for a single asset group.
   * Requires a Pro API key.
   */
  async getAssetGroupAssetBreakdownChart(assetGroup: string): Promise<RwaAssetBreakdownSeries> {
    return this.client.get<RwaAssetBreakdownSeries>(
      `/chart/assetGroup/${encodeURIComponent(assetGroup)}/asset-breakdown`,
      { requiresAuth: true, apiNamespace: "rwa" }
    );
  }

  /**
   * Get the chain-level overview breakdown chart. Each row is a timestamp with
   * one column per chain.
   * Requires a Pro API key.
   *
   * @param options - Optional filters (metric key, include stablecoins/governance).
   *
   * @example
   * ```typescript
   * const rows = await client.rwa.getChainBreakdownChart({ key: 'onChainMcap' });
   * const latest = rows.at(-1);
   * if (latest) {
   *   const { timestamp, ...byChain } = latest;
   *   console.log('Latest by chain:', byChain);
   * }
   * ```
   */
  async getChainBreakdownChart(
    options?: RwaBreakdownOptions
  ): Promise<RwaBreakdownChartResponse> {
    return this.getOverviewBreakdownChart("chain", options);
  }

  /**
   * Get the category-level overview breakdown chart.
   * Requires a Pro API key.
   */
  async getCategoryBreakdownChart(
    options?: RwaBreakdownOptions
  ): Promise<RwaBreakdownChartResponse> {
    return this.getOverviewBreakdownChart("category", options);
  }

  /**
   * Get the platform-level overview breakdown chart.
   * Requires a Pro API key.
   */
  async getPlatformBreakdownChart(
    options?: RwaBreakdownOptions
  ): Promise<RwaBreakdownChartResponse> {
    return this.getOverviewBreakdownChart("platform", options);
  }

  /**
   * Get the asset-group-level overview breakdown chart.
   * Requires a Pro API key.
   */
  async getAssetGroupBreakdownChart(
    options?: RwaBreakdownOptions
  ): Promise<RwaBreakdownChartResponse> {
    return this.getOverviewBreakdownChart("assetGroup", options);
  }

  private async getOverviewBreakdownChart(
    target: "chain" | "category" | "platform" | "assetGroup",
    options?: RwaBreakdownOptions
  ): Promise<RwaBreakdownChartResponse> {
    const params: Record<string, string | boolean> = {};
    if (options?.key) params.key = options.key;
    if (options?.includeStablecoin) params.includeStablecoin = true;
    if (options?.includeGovernance) params.includeGovernance = true;

    return this.client.get<RwaBreakdownChartResponse>(
      `/chart/${target}-breakdown`,
      {
        requiresAuth: true,
        apiNamespace: "rwa",
        params: Object.keys(params).length > 0 ? params : undefined,
      }
    );
  }
}
