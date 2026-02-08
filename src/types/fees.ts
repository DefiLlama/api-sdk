import type { FeeDataType } from "../constants/dimensions.js";

export interface FeesOverviewOptions {
  excludeTotalDataChart?: boolean;
  excludeTotalDataChartBreakdown?: boolean;
  dataType?: `${FeeDataType}`;
}

export interface FeesSummaryOptions {
  dataType?: `${FeeDataType}`;
}

export interface FeesChartOptions {
  dataType?: `${FeeDataType}`;
}

export interface FeesProtocol {
  id: string;
  defillamaId: string;
  name: string;
  displayName: string;
  module: string;
  category: string;
  logo: string;
  chains: string[];
  protocolType: string;
  methodologyURL: string;
  methodology: Record<string, string>;
  total24h?: number | null;
  total48hto24h?: number | null;
  total7d?: number | null;
  total14dto7d?: number | null;
  total30d?: number | null;
  total60dto30d?: number | null;
  total1y?: number | null;
  totalAllTime?: number | null;
  total7DaysAgo?: number | null;
  total30DaysAgo?: number | null;
  average1y?: number | null;
  monthlyAverage1y?: number | null;
  change_1d?: number | null;
  change_7d?: number | null;
  change_1m?: number | null;
  change_7dover7d?: number | null;
  change_30dover30d?: number | null;
  breakdown24h?: Record<string, Record<string, number>> | null;
  breakdown30d?: Record<string, Record<string, number>> | null;
  breakdownMethodology?: string | Record<string, Record<string, string>> | null;
  hasLabelBreakdown?: boolean;
  linkedProtocols?: string[] | null;
  parentProtocol?: string | null;
  slug: string;
}

export interface FeesOverviewResponse {
  totalDataChart: [number, number][];
  totalDataChartBreakdown: ChartBreakdownDataPoint[];
  breakdown24h: Record<string, Record<string, number>> | null;
  breakdown30d: Record<string, Record<string, number>> | null;
  chain: string | null;
  allChains: string[];
  total24h: number;
  total48hto24h: number;
  total7d: number;
  total14dto7d: number;
  total30d: number;
  total60dto30d: number;
  total1y: number;
  change_1d: number;
  change_7d: number;
  change_1m: number;
  change_7dover7d: number;
  change_30dover30d: number;
  total7DaysAgo: number;
  total30DaysAgo: number;
  totalAllTime: number;
  protocols: FeesProtocol[];
}

export interface FeesSummaryChildProtocol {
  name: string;
  defillamaId: string;
  displayName: string;
  methodologyURL: string | null;
  methodology: Record<string, string> | null;
  defaultChartView: string | null;
  breakdownMethodology: string | Record<string, Record<string, string>> | null;
}

export interface FeesSummaryResponse {
  id: string;
  name: string;
  url: string;
  description: string;
  logo: string;
  gecko_id: string | null;
  cmcId: string | null;
  chains: string[];
  twitter: string | null;
  treasury: string | null;
  governanceID: string[] | null;
  github: string[] | null;
  symbol: string | null;
  address: string | null;
  linkedProtocols?: string[] | null;
  childProtocols?: FeesSummaryChildProtocol[] | null;
  defillamaId: string;
  displayName: string;
  module: string | null;
  category: string | null;
  methodologyURL: string | null;
  methodology: Record<string, string> | null;
  forkedFrom: string[] | null;
  audits: string | null;
  audit_links: string[] | null;
  parentProtocol: string | null;
  previousNames: string[] | null;
  hallmarks: [number, string][] | null;
  defaultChartView: string | null;
  doublecounted: boolean | null;
  breakdownMethodology: string | null;
  slug: string;
  protocolType: string;
  total24h: number | null;
  total48hto24h: number | null;
  total7d: number | null;
  total30d: number | null;
  totalAllTime: number | null;
  totalDataChart: [number, number][];
  totalDataChartBreakdown: NestedChartBreakdownDataPoint[];
  hasLabelBreakdown: boolean;
  change_1d?: number | null;
}

export type ChartDataPoint = [number, number];

export type ChartBreakdownDataPoint = [number, Record<string, number>];

export type NestedChartBreakdownDataPoint = [
  number,
  Record<string, Record<string, number>>
];

export interface FeesChartResponse {
  data: ChartDataPoint[];
}

export interface FeesChartBreakdownResponse {
  data: ChartBreakdownDataPoint[];
}

export interface FeesMetricsResponse {
  breakdown24h: Record<string, Record<string, number>> | null;
  breakdown30d: Record<string, Record<string, number>> | null;
  chain: string | null;
  allChains: string[];
  total24h: number;
  total48hto24h: number;
  total7d: number;
  total14dto7d: number;
  total30d: number;
  total60dto30d: number;
  total1y: number;
  change_1d: number;
  change_7d: number;
  change_1m: number;
  change_7dover7d: number;
  change_30dover30d: number;
  total7DaysAgo: number;
  total30DaysAgo: number;
  totalAllTime: number;
  protocols: FeesProtocol[];
}

export interface FeesMetricsByProtocolResponse {
  id: string;
  name: string;
  address: string | null;
  symbol: string | null;
  url: string;
  description: string;
  chain?: string | null;
  logo: string;
  audits: string | null;
  audit_note?: string | null;
  gecko_id: string | null;
  cmcId: string | null;
  category: string | null;
  chains: string[];
  module: string | null;
  twitter: string | null;
  audit_links?: string[] | null;
  openSource?: boolean;
  github?: string[] | null;
  wrongLiquidity?: boolean;
  stablecoins?: string[] | null;
  tokenRights?: Record<string, unknown> | null;
  dimensions?: Record<string, unknown>;
  methodology?: Record<string, string> | null;
  misrepresentedTokens?: boolean;
  doublecounted?: boolean | null;
  linkedProtocols?: string[] | null;
  childProtocols?: FeesSummaryChildProtocol[] | null;
  defillamaId: string;
  displayName: string;
  methodologyURL: string | null;
  forkedFrom?: string[] | null;
  governanceID?: string[] | null;
  treasury?: string | null;
  parentProtocol?: string | null;
  previousNames?: string[] | null;
  hallmarks?: [number, string][] | null;
  defaultChartView?: string | null;
  breakdownMethodology?: string | Record<string, Record<string, string>> | null;
  slug: string;
  protocolType: string;
  total24h: number | null;
  total48hto24h: number | null;
  total7d: number | null;
  total30d: number | null;
  totalAllTime: number | null;
  hasLabelBreakdown: boolean;
  change_1d?: number | null;
  referralUrl?: string;
}
