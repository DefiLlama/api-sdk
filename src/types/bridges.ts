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
