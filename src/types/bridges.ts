export interface TransactionCounts {
  deposits: number;
  withdrawals: number;
}

export interface BridgeSummary {
  id: number;
  defillamaId?: string;
  name: string;
  displayName: string;
  icon?: string;
  volumePrevDay: number;
  volumePrev2Day: number | null;
  lastHourlyVolume: number;
  last24hVolume: number;
  lastDailyVolume: number;
  dayBeforeLastVolume: number | null;
  weeklyVolume: number | null;
  monthlyVolume: number | null;
  chains?: string[];
  destinationChain?: string;
  url?: string;
  slug?: string;
}

export interface BridgeChainInfo {
  gecko_id: string | null;
  volumePrevDay: number;
  tokenSymbol: string | null;
  name: string;
}

export interface BridgesResponse {
  bridges: BridgeSummary[];
  chains?: BridgeChainInfo[];
}

export interface ChainVolumeBreakdown {
  lastHourlyVolume: number;
  currentDayVolume: number;
  lastDailyVolume: number;
  dayBeforeLastVolume: number;
  weeklyVolume: number;
  monthlyVolume: number;
  last24hVolume: number;
  lastHourlyTxs: TransactionCounts;
  currentDayTxs: TransactionCounts;
  prevDayTxs: TransactionCounts;
  dayBeforeLastTxs: TransactionCounts;
  weeklyTxs: TransactionCounts;
  monthlyTxs: TransactionCounts;
}

export interface BridgeDetail {
  id: number;
  name: string;
  displayName: string;
  lastHourlyVolume: number;
  currentDayVolume: number;
  lastDailyVolume: number;
  dayBeforeLastVolume: number;
  weeklyVolume: number;
  monthlyVolume: number;
  lastHourlyTxs: TransactionCounts;
  currentDayTxs: TransactionCounts;
  prevDayTxs: TransactionCounts;
  dayBeforeLastTxs: TransactionCounts;
  weeklyTxs: TransactionCounts;
  monthlyTxs: TransactionCounts;
  chainBreakdown?: Record<string, ChainVolumeBreakdown>;
  destinationChain?: string;
}

export interface BridgeVolumeDataPoint {
  date: string;
  depositUSD: number;
  withdrawUSD: number;
  depositTxs: number;
  withdrawTxs: number;
}

export interface TokenDayStats {
  usdValue: number;
  amount: string;
  symbol: string;
  decimals: number;
}

export interface AddressDayStats {
  usdValue: number;
  txs: number;
}

export interface BridgeDayStatsResponse {
  date: number;
  totalTokensDeposited: Record<string, TokenDayStats>;
  totalTokensWithdrawn: Record<string, TokenDayStats>;
  totalAddressDeposited: Record<string, AddressDayStats>;
  totalAddressWithdrawn: Record<string, AddressDayStats>;
}

export interface BridgesOptions {
  includeChains?: boolean;
}

export interface BridgeTransactionsOptions {
  limit?: number;
  startTimestamp?: number;
  endTimestamp?: number;
  sourceChain?: string;
  address?: string;
}

export interface BridgeTransaction {
  tx_hash: string;
  ts: string;
  tx_block: number;
  tx_from: string;
  tx_to: string;
  token: string;
  amount: string;
  is_deposit: boolean;
  chain: string;
  bridge_name: string;
  usd_value: number | null;
}

// ---------------------------------------------------------------------------
// Dimensions API (/api/v2, metric = "bridges")
// ---------------------------------------------------------------------------

/**
 * Bridge dataType values. Volumes are in USD, tx counts are transfers.
 * At protocol level, aggregated values count the source side of transfers
 * (outgoing only); per chain they count incoming + outgoing.
 */
export type BridgeDimensionDataType =
  | "dailyAggregatedVolume"
  | "dailyOutgoingVolume"
  | "dailyIncomingVolume"
  | "dailyTxCount"
  | "dailyOutgoingTxCount"
  | "dailyIncomingTxCount";

export interface BridgeDimensionOptions {
  /** Defaults to `dailyAggregatedVolume`. */
  dataType?: BridgeDimensionDataType;
}

/** [unix seconds at start of UTC day, value] */
export type BridgeChartDataPoint = [number, number];

/** [unix seconds at start of UTC day, { [chain | protocol | version]: value }] */
export type BridgeChartBreakdownDataPoint = [number, Record<string, number>];

export interface BridgeDimensionTotals {
  total24h: number | null;
  total48hto24h: number | null;
  totalLastFullDay?: number | null;
  total7d: number | null;
  total14dto7d?: number | null;
  total30d: number | null;
  total60dto30d?: number | null;
  total1y: number | null;
  total7DaysAgo?: number | null;
  total30DaysAgo?: number | null;
  totalAllTime?: number | null;
  change_1d: number | null;
  change_7d?: number | null;
  change_1m?: number | null;
  change_7dover7d?: number | null;
  change_30dover30d?: number | null;
}

export interface BridgeDimensionProtocol extends Partial<BridgeDimensionTotals> {
  id: string;
  defillamaId: string;
  name: string;
  displayName: string;
  slug: string;
  module: string;
  category: string;
  logo: string;
  chains: string[];
  protocolType: string;
  methodologyURL: string;
  methodology: Record<string, string>;
  annualized1y?: number | null;
  average1y?: number | null;
  monthlyAverage1y?: number | null;
  breakdown24h?: Record<string, Record<string, number>> | null;
  breakdown30d?: Record<string, Record<string, number>> | null;
  parentProtocol?: string | null;
  linkedProtocols?: string[] | null;
  doublecounted?: boolean;
}

export interface BridgeMetricsResponse extends BridgeDimensionTotals {
  chain: string | null;
  allChains: string[];
  breakdown24h: Record<string, Record<string, number>> | null;
  breakdown30d: Record<string, Record<string, number>> | null;
  protocols: BridgeDimensionProtocol[];
}

export interface BridgeCategoryMetricsResponse extends BridgeDimensionTotals {
  category: string;
  chain?: string;
  allCategories: string[];
  allChains: string[];
  protocols: BridgeDimensionProtocol[];
}

export interface BridgeCategorySummary {
  /** Display name, e.g. "Canonical Bridge". Slugify for category routes. */
  category: string;
  total24h?: number | null;
  total7d?: number | null;
  total30d?: number | null;
  chains: string[];
}

export interface BridgeChainTotals extends Partial<BridgeDimensionTotals> {
  annualized1y?: number | null;
  average1y?: number | null;
  monthlyAverage1y?: number | null;
}

export interface BridgeMetricsByProtocolResponse {
  id: string;
  defillamaId: string;
  name: string;
  displayName: string;
  slug: string;
  address: string | null;
  symbol: string | null;
  url: string;
  description: string;
  chain?: string | null;
  logo: string;
  audits: string | null;
  gecko_id: string | null;
  cmcId: string | null;
  category: string | null;
  chains: string[];
  module: string | null;
  twitter: string | null;
  parentProtocol?: string | null;
  linkedProtocols?: string[] | null;
  dimensions?: Record<string, unknown>;
  methodology?: Record<string, string> | null;
  methodologyURL: string | null;
  breakdownMethodology?: string | Record<string, Record<string, string>> | null;
  protocolType: string;
  hasLabelBreakdown: boolean;
  total24h: number | null;
  total48hto24h: number | null;
  total7d: number | null;
  total30d: number | null;
  total1y: number | null;
  annualized1y?: number | null;
  change_1d?: number | null;
  chainBreakdown?: Record<string, BridgeChainTotals>;
}
