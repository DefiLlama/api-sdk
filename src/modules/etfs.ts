import type { BaseClient } from "../client.js";
import type {
  EtfSnapshotItem,
  EtfFlowItem,
  FdvPeriod,
  FdvPerformanceItem,
} from "../types/etfs.js";

export class EtfsModule {
  constructor(private client: BaseClient) {}

  async getSnapshot(): Promise<EtfSnapshotItem[]> {
    return this.client.get<EtfSnapshotItem[]>("/snapshot", {
      requiresAuth: true,
      apiNamespace: "etfs",
    });
  }

  async getFlows(): Promise<EtfFlowItem[]> {
    return this.client.get<EtfFlowItem[]>("/flows", {
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
