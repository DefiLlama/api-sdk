export interface VolumeOverviewOptions {
  excludeTotalDataChart?: boolean;
  excludeTotalDataChartBreakdown?: boolean;
  dataType?: "dailyVolume" | "totalVolume";
}

export interface VolumeSummaryOptions {
  dataType?: "dailyVolume" | "totalVolume";
}

export interface VolumeMetricsOptions {
  dataType?: "dailyVolume" | "totalVolume";
}

export interface VolumeMetricsResponse {
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
  protocols: VolumeProtocol[];
}

export interface VolumeMetricsByProtocolResponse {
  id: string;
  name: string;
  url: string;
  description: string;
  logo: string;
  gecko_id: string | null;
  cmcId: string | null;
  chains: string[];
  chain?: string | null;
  twitter: string | null;
  treasury?: string | null;
  governanceID?: string[] | null;
  github?: string[] | null;
  tokenRights?: Record<string, unknown> | null;
  symbol?: string | null;
  address?: string | null;
  linkedProtocols?: string[] | null;
  childProtocols?: VolumeMetricsChildProtocol[] | null;
  defillamaId: string;
  displayName: string;
  module?: string | null;
  category?: string | null;
  methodologyURL?: string | null;
  methodology?: Record<string, string> | null;
  forkedFrom?: string[] | null;
  audits?: string | null;
  audit_links?: string[] | null;
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
  dimensions?: Record<string, unknown>;
  misrepresentedTokens?: boolean;
  doublecounted?: boolean | null;
  referralUrl?: string;
}

export interface VolumeMetricsChildProtocol {
  name: string;
  defillamaId: string;
  displayName: string;
  methodologyURL: string | null;
  methodology: Record<string, string> | null;
  defaultChartView: string | null;
  breakdownMethodology: string | Record<string, Record<string, string>> | null;
}

export type DexMetricsOptions = VolumeMetricsOptions;
export type DexMetricsResponse = VolumeMetricsResponse;
export type DexMetricsByProtocolResponse = VolumeMetricsByProtocolResponse;
export type DerivativesMetricsOptions = VolumeMetricsOptions;
export type DerivativesMetricsResponse = VolumeMetricsResponse;
export type DerivativesMetricsByProtocolResponse = VolumeMetricsByProtocolResponse;
export type OptionsMetricsOptions = VolumeMetricsOptions;
export type OptionsMetricsResponse = VolumeMetricsResponse;
export type OptionsMetricsByProtocolResponse = VolumeMetricsByProtocolResponse;

export interface VolumeProtocol {
  id?: string;
  defillamaId: string;
  name: string;
  displayName: string;
  module: string;
  category: string;
  logo: string;
  chains: string[];
  protocolType: string;
  methodologyURL: string;
  methodology: Record<string, string> | string | null;
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
  linkedProtocols?: string[] | null;
  doublecounted?: boolean | null;
  parentProtocol?: string | null;
  slug: string;
}

export interface VolumeOverviewResponse {
  totalDataChart: [number, number][];
  totalDataChartBreakdown: VolumeChartBreakdownDataPoint[];
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
  protocols: VolumeProtocol[];
}

export interface VolumeSummaryResponse {
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
  childProtocols?: string[] | null;
  defillamaId: string;
  displayName: string;
  module: string;
  category: string;
  methodologyURL: string | null;
  methodology: Record<string, string> | string | null;
  forkedFrom: string[] | null;
  audits: string | null;
  audit_links: string[] | null;
  parentProtocol: string | null;
  previousNames: string[] | null;
  hallmarks: [number, string][] | null;
  slug: string;
  protocolType: string;
  total24h: number | null;
  total48hto24h: number | null;
  total7d: number | null;
  total30d: number | null;
  totalAllTime: number | null;
  totalDataChart: [number, number][];
  totalDataChartBreakdown: VolumeNestedChartBreakdownDataPoint[];
  hasLabelBreakdown: boolean;
  change_1d?: number | null;
}

export type VolumeChartBreakdownDataPoint = [number, Record<string, number>];

export type VolumeNestedChartBreakdownDataPoint = [
  number,
  Record<string, Record<string, number>>
];

export type DexOverviewOptions = VolumeOverviewOptions;
export type DexOverviewResponse = VolumeOverviewResponse;
export type DexSummaryOptions = VolumeSummaryOptions;
export type DexSummaryResponse = VolumeSummaryResponse;

export type OptionsOverviewOptions = Omit<VolumeOverviewOptions, "dataType">;
export type OptionsOverviewResponse = VolumeOverviewResponse;
export type OptionsSummaryResponse = VolumeSummaryResponse;

export type DerivativesOverviewResponse = VolumeOverviewResponse;
export type DerivativesSummaryResponse = VolumeSummaryResponse;
