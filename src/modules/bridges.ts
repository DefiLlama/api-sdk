import type { BaseClient } from "../client.js";
import type {
  BridgesResponse,
  BridgeDetail,
  BridgeVolumeDataPoint,
  BridgeDayStatsResponse,
  BridgesOptions,
  BridgeTransactionsOptions,
  BridgeTransaction,
  BridgeDimensionOptions,
  BridgeChartDataPoint,
  BridgeChartBreakdownDataPoint,
  BridgeMetricsResponse,
  BridgeMetricsByProtocolResponse,
  BridgeCategoryMetricsResponse,
  BridgeCategorySummary,
} from "../types/bridges.js";

const enc = encodeURIComponent;

/**
 * Bridge volumes and transfer counts.
 *
 * The `getMetrics*` / `getChart*` methods use the dimensions API
 * (`/api/v2/{metrics,chart}/bridges`) and identify bridges by protocol slug
 * (e.g. `optimism-bridge`), chains by name (e.g. `Ethereum`) and categories by
 * slug (e.g. `canonical-bridge`). The legacy numeric bridge IDs used by
 * `getById` / `getTransactions` are a different identifier set.
 */
export class BridgesModule {
  constructor(private client: BaseClient) {}

  private dimensions<T>(path: string, options?: BridgeDimensionOptions): Promise<T> {
    return this.client.get<T>(path, {
      base: "v2",
      requiresAuth: true,
      params: options?.dataType ? { dataType: options.dataType } : undefined,
    });
  }

  // -------------------------------------------------------------------------
  // Dimensions API: overview metrics
  // -------------------------------------------------------------------------

  /** Aggregate bridge totals and changes, with per-protocol rows. */
  async getMetrics(options?: BridgeDimensionOptions): Promise<BridgeMetricsResponse> {
    return this.dimensions("/metrics/bridges", options);
  }

  /** Bridge totals for a chain (incoming + outgoing for aggregated dataTypes). */
  async getMetricsByChain(
    chain: string,
    options?: BridgeDimensionOptions
  ): Promise<BridgeMetricsResponse> {
    return this.dimensions(`/metrics/bridges/chain/${enc(chain)}`, options);
  }

  /** Bridge metadata, totals and per-chain totals for a protocol slug. */
  async getMetricsByProtocol(
    protocol: string,
    options?: BridgeDimensionOptions
  ): Promise<BridgeMetricsByProtocolResponse> {
    return this.dimensions(`/metrics/bridges/protocol/${enc(protocol)}`, options);
  }

  /** Bridge categories with totals and active chains. */
  async getCategories(options?: BridgeDimensionOptions): Promise<BridgeCategorySummary[]> {
    return this.dimensions("/metrics/bridges/categories", options);
  }

  async getMetricsByCategory(
    category: string,
    options?: BridgeDimensionOptions
  ): Promise<BridgeCategoryMetricsResponse> {
    return this.dimensions(`/metrics/bridges/category/${enc(category)}`, options);
  }

  async getMetricsByCategoryAndChain(
    category: string,
    chain: string,
    options?: BridgeDimensionOptions
  ): Promise<BridgeCategoryMetricsResponse> {
    return this.dimensions(
      `/metrics/bridges/category/${enc(category)}/chain/${enc(chain)}`,
      options
    );
  }

  // -------------------------------------------------------------------------
  // Dimensions API: charts
  // -------------------------------------------------------------------------

  async getChart(options?: BridgeDimensionOptions): Promise<BridgeChartDataPoint[]> {
    return this.dimensions("/chart/bridges", options);
  }

  async getChartChainBreakdown(
    options?: BridgeDimensionOptions
  ): Promise<BridgeChartBreakdownDataPoint[]> {
    return this.dimensions("/chart/bridges/chain-breakdown", options);
  }

  async getChartProtocolBreakdown(
    options?: BridgeDimensionOptions
  ): Promise<BridgeChartBreakdownDataPoint[]> {
    return this.dimensions("/chart/bridges/protocol-breakdown", options);
  }

  async getChartByChain(
    chain: string,
    options?: BridgeDimensionOptions
  ): Promise<BridgeChartDataPoint[]> {
    return this.dimensions(`/chart/bridges/chain/${enc(chain)}`, options);
  }

  async getChartByChainProtocolBreakdown(
    chain: string,
    options?: BridgeDimensionOptions
  ): Promise<BridgeChartBreakdownDataPoint[]> {
    return this.dimensions(`/chart/bridges/chain/${enc(chain)}/protocol-breakdown`, options);
  }

  async getChartByProtocol(
    protocol: string,
    options?: BridgeDimensionOptions
  ): Promise<BridgeChartDataPoint[]> {
    return this.dimensions(`/chart/bridges/protocol/${enc(protocol)}`, options);
  }

  /**
   * Per-chain series for a bridge. Aggregated dataTypes count both directions
   * per chain, so summing chains can double count; use getChartByProtocol for
   * the protocol total.
   */
  async getChartByProtocolChainBreakdown(
    protocol: string,
    options?: BridgeDimensionOptions
  ): Promise<BridgeChartBreakdownDataPoint[]> {
    return this.dimensions(`/chart/bridges/protocol/${enc(protocol)}/chain-breakdown`, options);
  }

  async getChartByProtocolVersionBreakdown(
    protocol: string,
    options?: BridgeDimensionOptions
  ): Promise<BridgeChartBreakdownDataPoint[]> {
    return this.dimensions(`/chart/bridges/protocol/${enc(protocol)}/version-breakdown`, options);
  }

  async getChartByCategory(
    category: string,
    options?: BridgeDimensionOptions
  ): Promise<BridgeChartDataPoint[]> {
    return this.dimensions(`/chart/bridges/category/${enc(category)}`, options);
  }

  async getChartByCategoryChainBreakdown(
    category: string,
    options?: BridgeDimensionOptions
  ): Promise<BridgeChartBreakdownDataPoint[]> {
    return this.dimensions(`/chart/bridges/category/${enc(category)}/chain-breakdown`, options);
  }

  async getChartByCategoryProtocolBreakdown(
    category: string,
    options?: BridgeDimensionOptions
  ): Promise<BridgeChartBreakdownDataPoint[]> {
    return this.dimensions(`/chart/bridges/category/${enc(category)}/protocol-breakdown`, options);
  }

  async getChartByCategoryAndChain(
    category: string,
    chain: string,
    options?: BridgeDimensionOptions
  ): Promise<BridgeChartDataPoint[]> {
    return this.dimensions(
      `/chart/bridges/category/${enc(category)}/chain/${enc(chain)}`,
      options
    );
  }

  async getChartByCategoryAndChainProtocolBreakdown(
    category: string,
    chain: string,
    options?: BridgeDimensionOptions
  ): Promise<BridgeChartBreakdownDataPoint[]> {
    return this.dimensions(
      `/chart/bridges/category/${enc(category)}/chain/${enc(chain)}/protocol-breakdown`,
      options
    );
  }

  // -------------------------------------------------------------------------
  // Legacy bridges API (/bridges/*)
  //
  // These call the legacy bridges server, which will be shut down,
  // -------------------------------------------------------------------------

  /** @deprecated The legacy bridges server will be shut down. Use {@link getMetrics}. */
  async getAll(options?: BridgesOptions): Promise<BridgesResponse> {
    return this.client.get<BridgesResponse>("/bridges", {
      base: "bridges",
      params:
        options?.includeChains !== undefined
          ? { includeChains: options.includeChains }
          : undefined,
    });
  }

  /**
   * @deprecated The legacy bridges server will be shut down. Use
   * {@link getMetricsByProtocol} with a protocol slug (not the numeric ID).
   */
  async getById(id: number): Promise<BridgeDetail> {
    return this.client.get<BridgeDetail>(`/bridge/${id}`, {
      base: "bridges",
    });
  }

  /**
   * @deprecated The legacy bridges server will be shut down. Use
   * {@link getChartByChain} with `dataType`
   * `dailyIncomingVolume` / `dailyOutgoingVolume` (dimensions API).
   */
  async getVolumeByChain(chain: string): Promise<BridgeVolumeDataPoint[]> {
    return this.client.get<BridgeVolumeDataPoint[]>(
      `/bridgevolume/${encodeURIComponent(chain)}`,
      { base: "bridges" }
    );
  }

  /**
   * @deprecated The legacy bridges server will be shut down and this endpoint
   * has no dimensions API equivalent.
   */
  async getDayStats(
    timestamp: number,
    chain: string
  ): Promise<BridgeDayStatsResponse> {
    return this.client.get<BridgeDayStatsResponse>(
      `/bridgedaystats/${timestamp}/${encodeURIComponent(chain)}`,
      { base: "bridges" }
    );
  }

  /**
   * @deprecated The legacy bridges server will be shut down and this endpoint
   * has no dimensions API equivalent.
   */
  async getTransactions(
    id: number,
    options?: BridgeTransactionsOptions
  ): Promise<BridgeTransaction[]> {
    const params: Record<string, string | number> = {};
    if (options?.limit !== undefined) params.limit = options.limit;
    if (options?.startTimestamp !== undefined)
      params.startTimestamp = options.startTimestamp;
    if (options?.endTimestamp !== undefined)
      params.endTimestamp = options.endTimestamp;
    if (options?.sourceChain) params.sourceChain = options.sourceChain;
    if (options?.address) params.address = options.address;

    return this.client.get<BridgeTransaction[]>(`/transactions/${id}`, {
      base: "bridges",
      params: Object.keys(params).length > 0 ? params : undefined,
    });
  }
}
