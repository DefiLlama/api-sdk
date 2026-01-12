import type { BaseClient } from "../client.js";
import type {
  FeesOverviewResponse,
  FeesOverviewOptions,
  FeesSummaryResponse,
  FeesSummaryOptions,
  FeesChartOptions,
  ChartDataPoint,
  ChartBreakdownDataPoint,
  FeesMetricsResponse,
  FeesMetricsByProtocolResponse,
} from "../types/fees.js";

export class FeesModule {
  constructor(private client: BaseClient) {}

  async getOverview(options?: FeesOverviewOptions): Promise<FeesOverviewResponse> {
    const params: Record<string, string | boolean> = {};
    if (options?.excludeTotalDataChart !== undefined) {
      params.excludeTotalDataChart = options.excludeTotalDataChart;
    }
    if (options?.excludeTotalDataChartBreakdown !== undefined) {
      params.excludeTotalDataChartBreakdown = options.excludeTotalDataChartBreakdown;
    }
    if (options?.dataType) {
      params.dataType = options.dataType;
    }
    return this.client.get<FeesOverviewResponse>("/overview/fees", {
      params: Object.keys(params).length > 0 ? params : undefined,
    });
  }

  async getOverviewByChain(
    chain: string,
    options?: FeesOverviewOptions
  ): Promise<FeesOverviewResponse> {
    const params: Record<string, string | boolean> = {};
    if (options?.excludeTotalDataChart !== undefined) {
      params.excludeTotalDataChart = options.excludeTotalDataChart;
    }
    if (options?.excludeTotalDataChartBreakdown !== undefined) {
      params.excludeTotalDataChartBreakdown = options.excludeTotalDataChartBreakdown;
    }
    if (options?.dataType) {
      params.dataType = options.dataType;
    }
    return this.client.get<FeesOverviewResponse>(
      `/overview/fees/${encodeURIComponent(chain)}`,
      { params: Object.keys(params).length > 0 ? params : undefined }
    );
  }

  async getSummary(
    protocol: string,
    options?: FeesSummaryOptions
  ): Promise<FeesSummaryResponse> {
    const params: Record<string, string> = {};
    if (options?.dataType) {
      params.dataType = options.dataType;
    }
    return this.client.get<FeesSummaryResponse>(
      `/summary/fees/${encodeURIComponent(protocol)}`,
      { params: Object.keys(params).length > 0 ? params : undefined }
    );
  }

  async getChart(options?: FeesChartOptions): Promise<ChartDataPoint[]> {
    const params: Record<string, string> = {};
    if (options?.dataType) {
      params.dataType = options.dataType;
    }
    return this.client.get<ChartDataPoint[]>("/chart/fees", {
      base: "v2",
      requiresAuth: true,
      params: Object.keys(params).length > 0 ? params : undefined,
    });
  }

  async getChartByChain(
    chain: string,
    options?: FeesChartOptions
  ): Promise<ChartDataPoint[]> {
    const params: Record<string, string> = {};
    if (options?.dataType) {
      params.dataType = options.dataType;
    }
    return this.client.get<ChartDataPoint[]>(
      `/chart/fees/chain/${encodeURIComponent(chain)}`,
      {
        base: "v2",
        requiresAuth: true,
        params: Object.keys(params).length > 0 ? params : undefined,
      }
    );
  }

  async getChartByProtocol(
    protocol: string,
    options?: FeesChartOptions
  ): Promise<ChartDataPoint[]> {
    const params: Record<string, string> = {};
    if (options?.dataType) {
      params.dataType = options.dataType;
    }
    return this.client.get<ChartDataPoint[]>(
      `/chart/fees/protocol/${encodeURIComponent(protocol)}`,
      {
        base: "v2",
        requiresAuth: true,
        params: Object.keys(params).length > 0 ? params : undefined,
      }
    );
  }

  async getChartByProtocolChainBreakdown(
    protocol: string,
    options?: FeesChartOptions
  ): Promise<ChartBreakdownDataPoint[]> {
    const params: Record<string, string> = {};
    if (options?.dataType) {
      params.dataType = options.dataType;
    }
    return this.client.get<ChartBreakdownDataPoint[]>(
      `/chart/fees/protocol/${encodeURIComponent(protocol)}/chain-breakdown`,
      {
        base: "v2",
        requiresAuth: true,
        params: Object.keys(params).length > 0 ? params : undefined,
      }
    );
  }

  async getChartByProtocolVersionBreakdown(
    protocol: string,
    options?: FeesChartOptions
  ): Promise<ChartBreakdownDataPoint[]> {
    const params: Record<string, string> = {};
    if (options?.dataType) {
      params.dataType = options.dataType;
    }
    return this.client.get<ChartBreakdownDataPoint[]>(
      `/chart/fees/protocol/${encodeURIComponent(protocol)}/version-breakdown`,
      {
        base: "v2",
        requiresAuth: true,
        params: Object.keys(params).length > 0 ? params : undefined,
      }
    );
  }

  async getChartByChainProtocolBreakdown(
    chain: string,
    options?: FeesChartOptions
  ): Promise<ChartBreakdownDataPoint[]> {
    const params: Record<string, string> = {};
    if (options?.dataType) {
      params.dataType = options.dataType;
    }
    return this.client.get<ChartBreakdownDataPoint[]>(
      `/chart/fees/chain/${encodeURIComponent(chain)}/protocol-breakdown`,
      {
        base: "v2",
        requiresAuth: true,
        params: Object.keys(params).length > 0 ? params : undefined,
      }
    );
  }

  async getChartChainBreakdown(
    options?: FeesChartOptions
  ): Promise<ChartBreakdownDataPoint[]> {
    const params: Record<string, string> = {};
    if (options?.dataType) {
      params.dataType = options.dataType;
    }
    return this.client.get<ChartBreakdownDataPoint[]>(
      "/chart/fees/chain-breakdown",
      {
        base: "v2",
        requiresAuth: true,
        params: Object.keys(params).length > 0 ? params : undefined,
      }
    );
  }

  async getMetrics(options?: FeesChartOptions): Promise<FeesMetricsResponse> {
    const params: Record<string, string> = {};
    if (options?.dataType) {
      params.dataType = options.dataType;
    }
    return this.client.get<FeesMetricsResponse>("/metrics/fees", {
      base: "v2",
      requiresAuth: true,
      params: Object.keys(params).length > 0 ? params : undefined,
    });
  }

  async getMetricsByChain(
    chain: string,
    options?: FeesChartOptions
  ): Promise<FeesMetricsResponse> {
    const params: Record<string, string> = {};
    if (options?.dataType) {
      params.dataType = options.dataType;
    }
    return this.client.get<FeesMetricsResponse>(
      `/metrics/fees/chain/${encodeURIComponent(chain)}`,
      {
        base: "v2",
        requiresAuth: true,
        params: Object.keys(params).length > 0 ? params : undefined,
      }
    );
  }

  async getMetricsByProtocol(
    protocol: string,
    options?: FeesChartOptions
  ): Promise<FeesMetricsByProtocolResponse> {
    const params: Record<string, string> = {};
    if (options?.dataType) {
      params.dataType = options.dataType;
    }
    return this.client.get<FeesMetricsByProtocolResponse>(
      `/metrics/fees/protocol/${encodeURIComponent(protocol)}`,
      {
        base: "v2",
        requiresAuth: true,
        params: Object.keys(params).length > 0 ? params : undefined,
      }
    );
  }
}
