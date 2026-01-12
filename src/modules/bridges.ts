import type { BaseClient } from "../client.js";
import type {
  BridgesResponse,
  BridgeDetail,
  BridgeVolumeDataPoint,
  BridgeDayStatsResponse,
  BridgesOptions,
  BridgeTransactionsOptions,
  BridgeTransaction,
} from "../types/bridges.js";

export class BridgesModule {
  constructor(private client: BaseClient) {}

  async getAll(options?: BridgesOptions): Promise<BridgesResponse> {
    return this.client.get<BridgesResponse>("/bridges", {
      base: "bridges",
      params:
        options?.includeChains !== undefined
          ? { includeChains: options.includeChains }
          : undefined,
    });
  }

  async getById(id: number): Promise<BridgeDetail> {
    return this.client.get<BridgeDetail>(`/bridge/${id}`, {
      base: "bridges",
    });
  }

  async getVolumeByChain(chain: string): Promise<BridgeVolumeDataPoint[]> {
    return this.client.get<BridgeVolumeDataPoint[]>(
      `/bridgevolume/${encodeURIComponent(chain)}`,
      { base: "bridges" }
    );
  }

  async getDayStats(
    timestamp: number,
    chain: string
  ): Promise<BridgeDayStatsResponse> {
    return this.client.get<BridgeDayStatsResponse>(
      `/bridgedaystats/${timestamp}/${encodeURIComponent(chain)}`,
      { base: "bridges" }
    );
  }

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
