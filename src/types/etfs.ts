export interface EtfOverviewItem {
  ticker: string;
  timestamp: number;
  asset: string;
  issuer: string;
  etf_name: string;
  custodian: string;
  pct_fee: number;
  url: string;
  flows: number;
  aum: number;
  volume: number;
}

export interface EtfHistoryItem {
  gecko_id: string;
  day: string;
  total_flow_usd: number;
}

export type FdvPeriod = "7" | "30" | "ytd" | "365";

export interface FdvPerformanceItem {
  date: number;
  [category: string]: number;
}
