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
} from "../types/volumes.js";

export class VolumesModule {
  constructor(private client: BaseClient) {}

  async getDexOverview(
    options?: DexOverviewOptions
  ): Promise<DexOverviewResponse> {
    const params: Record<string, string | boolean> = {};
    if (options?.excludeTotalDataChart !== undefined) {
      params.excludeTotalDataChart = options.excludeTotalDataChart;
    }
    if (options?.excludeTotalDataChartBreakdown !== undefined) {
      params.excludeTotalDataChartBreakdown =
        options.excludeTotalDataChartBreakdown;
    }
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
    if (options?.excludeTotalDataChartBreakdown !== undefined) {
      params.excludeTotalDataChartBreakdown =
        options.excludeTotalDataChartBreakdown;
    }
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
    if (options?.excludeTotalDataChartBreakdown !== undefined) {
      params.excludeTotalDataChartBreakdown =
        options.excludeTotalDataChartBreakdown;
    }
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
}
