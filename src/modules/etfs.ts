import type { BaseClient } from "../client.js";
import type {
  EtfOverviewItem,
  EtfHistoryItem,
  FdvPeriod,
  FdvPerformanceItem,
} from "../types/etfs.js";

export class EtfsModule {
  constructor(private client: BaseClient) {}

  async getOverview(): Promise<EtfOverviewItem[]> {
    return this.client.get<EtfOverviewItem[]>("/overview", {
      requiresAuth: true,
      apiNamespace: "etfs",
    });
  }

  async getOverviewEth(): Promise<EtfOverviewItem[]> {
    return this.client.get<EtfOverviewItem[]>("/overviewEth", {
      requiresAuth: true,
      apiNamespace: "etfs",
    });
  }

  async getHistory(): Promise<EtfHistoryItem[]> {
    return this.client.get<EtfHistoryItem[]>("/history", {
      requiresAuth: true,
      apiNamespace: "etfs",
    });
  }

  async getHistoryEth(): Promise<EtfHistoryItem[]> {
    return this.client.get<EtfHistoryItem[]>("/historyEth", {
      requiresAuth: true,
      apiNamespace: "etfs",
    });
  }

  async getFdvPerformance(period: FdvPeriod): Promise<FdvPerformanceItem[]> {
    return this.client.get<FdvPerformanceItem[]>(
      `/performance/${encodeURIComponent(period)}`,
      { requiresAuth: true, apiNamespace: "fdv" }
    );
  }
}
