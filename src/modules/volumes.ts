import type { BaseClient } from "../client.js";
import type {
  DexOverviewResponse,
  DexOverviewOptions,
  DexSummaryResponse,
  DexSummaryOptions,
  OptionsOverviewResponse,
  OptionsOverviewOptions,
  OptionsSummaryResponse,
  DerivativesOverviewResponse,
  DerivativesSummaryResponse,
  DexMetricsOptions,
  DexMetricsResponse,
  DexMetricsByProtocolResponse,
  DerivativesMetricsOptions,
  DerivativesMetricsResponse,
  DerivativesMetricsByProtocolResponse,
  OptionsMetricsOptions,
  OptionsMetricsResponse,
  OptionsMetricsByProtocolResponse,
} from "../types/volumes.js";

export class VolumesModule {
  constructor(private client: BaseClient) { }

  async getDexOverview(
    options?: DexOverviewOptions
  ): Promise<DexOverviewResponse> {
    const params: Record<string, string | boolean> = {};
    if (options?.excludeTotalDataChart !== undefined) {
      params.excludeTotalDataChart = options.excludeTotalDataChart;
    }
    params.excludeTotalDataChartBreakdown = options?.excludeTotalDataChartBreakdown !== false;
    if (options?.dataType) {
      params.dataType = options.dataType;
    }
    return this.client.get<DexOverviewResponse>("/overview/dexs", {
      params: Object.keys(params).length > 0 ? params : undefined,
    });
  }

  async getDexOverviewByChain(
    chain: string,
    options?: Omit<DexOverviewOptions, "dataType">
  ): Promise<DexOverviewResponse> {
    const params: Record<string, boolean> = {};
    if (options?.excludeTotalDataChart !== undefined) {
      params.excludeTotalDataChart = options.excludeTotalDataChart;
    }
    params.excludeTotalDataChartBreakdown = options?.excludeTotalDataChartBreakdown !== false;
    return this.client.get<DexOverviewResponse>(
      `/overview/dexs/${encodeURIComponent(chain)}`,
      { params: Object.keys(params).length > 0 ? params : undefined }
    );
  }

  async getDexSummary(
    protocol: string,
    options?: DexSummaryOptions
  ): Promise<DexSummaryResponse> {
    const params: Record<string, string> = {};
    if (options?.dataType) {
      params.dataType = options.dataType;
    }
    return this.client.get<DexSummaryResponse>(
      `/summary/dexs/${encodeURIComponent(protocol)}`,
      { params: Object.keys(params).length > 0 ? params : undefined }
    );
  }

  async getOptionsOverview(
    options?: OptionsOverviewOptions
  ): Promise<OptionsOverviewResponse> {
    const params: Record<string, boolean> = {};
    if (options?.excludeTotalDataChart !== undefined) {
      params.excludeTotalDataChart = options.excludeTotalDataChart;
    }
    params.excludeTotalDataChartBreakdown = options?.excludeTotalDataChartBreakdown !== false;
    return this.client.get<OptionsOverviewResponse>("/overview/options", {
      params: Object.keys(params).length > 0 ? params : undefined,
    });
  }

  async getOptionsOverviewByChain(
    chain: string
  ): Promise<OptionsOverviewResponse> {
    return this.client.get<OptionsOverviewResponse>(
      `/overview/options/${encodeURIComponent(chain)}`
    );
  }

  async getOptionsSummary(protocol: string): Promise<OptionsSummaryResponse> {
    return this.client.get<OptionsSummaryResponse>(
      `/summary/options/${encodeURIComponent(protocol)}`
    );
  }

  async getDerivativesOverview(): Promise<DerivativesOverviewResponse> {
    return this.client.get<DerivativesOverviewResponse>(
      "/overview/derivatives",
      { requiresAuth: true }
    );
  }

  async getDerivativesSummary(
    protocol: string
  ): Promise<DerivativesSummaryResponse> {
    return this.client.get<DerivativesSummaryResponse>(
      `/summary/derivatives/${encodeURIComponent(protocol)}`,
      { requiresAuth: true }
    );
  }

  async getDexMetrics(options?: DexMetricsOptions): Promise<DexMetricsResponse> {
    const params: Record<string, string> = {};
    if (options?.dataType) {
      params.dataType = options.dataType;
    }
    return this.client.get<DexMetricsResponse>("/metrics/dexs", {
      base: "v2",
      requiresAuth: true,
      params: Object.keys(params).length > 0 ? params : undefined,
    });
  }

  async getDexMetricsByProtocol(
    protocol: string,
    options?: DexMetricsOptions
  ): Promise<DexMetricsByProtocolResponse> {
    const params: Record<string, string> = {};
    if (options?.dataType) {
      params.dataType = options.dataType;
    }
    return this.client.get<DexMetricsByProtocolResponse>(
      `/metrics/dexs/protocol/${encodeURIComponent(protocol)}`,
      {
        base: "v2",
        requiresAuth: true,
        params: Object.keys(params).length > 0 ? params : undefined,
      }
    );
  }

  async getDerivativesMetrics(
    options?: DerivativesMetricsOptions
  ): Promise<DerivativesMetricsResponse> {
    const params: Record<string, string> = {};
    if (options?.dataType) {
      params.dataType = options.dataType;
    }
    return this.client.get<DerivativesMetricsResponse>("/metrics/derivatives", {
      base: "v2",
      requiresAuth: true,
      params: Object.keys(params).length > 0 ? params : undefined,
    });
  }

  async getDerivativesMetricsByProtocol(
    protocol: string,
    options?: DerivativesMetricsOptions
  ): Promise<DerivativesMetricsByProtocolResponse> {
    const params: Record<string, string> = {};
    if (options?.dataType) {
      params.dataType = options.dataType;
    }
    return this.client.get<DerivativesMetricsByProtocolResponse>(
      `/metrics/derivatives/protocol/${encodeURIComponent(protocol)}`,
      {
        base: "v2",
        requiresAuth: true,
        params: Object.keys(params).length > 0 ? params : undefined,
      }
    );
  }

  async getOptionsMetrics(
    options?: OptionsMetricsOptions
  ): Promise<OptionsMetricsResponse> {
    const params: Record<string, string> = {};
    if (options?.dataType) {
      params.dataType = options.dataType;
    }
    return this.client.get<OptionsMetricsResponse>("/metrics/options", {
      base: "v2",
      requiresAuth: true,
      params: Object.keys(params).length > 0 ? params : undefined,
    });
  }

  async getOptionsMetricsByProtocol(
    protocol: string,
    options?: OptionsMetricsOptions
  ): Promise<OptionsMetricsByProtocolResponse> {
    const params: Record<string, string> = {};
    if (options?.dataType) {
      params.dataType = options.dataType;
    }
    return this.client.get<OptionsMetricsByProtocolResponse>(
      `/metrics/options/protocol/${encodeURIComponent(protocol)}`,
      {
        base: "v2",
        requiresAuth: true,
        params: Object.keys(params).length > 0 ? params : undefined,
      }
    );
  }
}
