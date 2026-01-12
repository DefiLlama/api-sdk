export interface Protocol {
  id: string;
  name: string;
  address?: string | null;
  symbol: string;
  url: string;
  description?: string;
  chain: string;
  logo?: string;
  audits?: string;
  audit_note?: string | null;
  gecko_id?: string | null;
  cmcId?: string | null;
  category: string;
  chains: string[];
  module?: string;
  twitter?: string | null;
  forkedFrom?: string[];
  oracles?: string[];
  listedAt?: number;
  methodology?: string | Record<string, string>;
  slug: string;
  tvl: number;
  chainTvls: Record<string, number>;
  change_1h?: number | null;
  change_1d?: number | null;
  change_7d?: number | null;
  tokenBreakdowns?: Record<string, unknown>;
  mcap?: number | null;
  referralUrl?: string;
  parentProtocol?: string;
  misrepresentedTokens?: boolean;
}

export interface TvlDataPoint {
  date: number;
  totalLiquidityUSD: number;
}

export interface TokenBalance {
  date: number;
  tokens: Record<string, number>;
}

export interface ChainTvlData {
  tvl: TvlDataPoint[];
  tokensInUsd?: TokenBalance[] | null;
  tokens?: TokenBalance[] | null;
}

export interface CurrentChainTvl {
  date: number;
  totalLiquidityUSD: number;
}

export interface ProtocolDetails {
  id: string;
  name: string;
  address?: string | null;
  symbol: string;
  url: string;
  description?: string;
  chain?: string;
  logo?: string;
  audits?: string;
  audit_note?: string | null;
  gecko_id?: string | null;
  cmcId?: string | null;
  category?: string;
  chains: string[];
  module?: string;
  twitter?: string | null;
  forkedFrom?: string[];
  oracles?: string[];
  listedAt?: number;
  methodology?: string | Record<string, string>;
  slug?: string;
  tvl: TvlDataPoint[];
  tokensInUsd?: TokenBalance[];
  tokens?: TokenBalance[];
  chainTvls: Record<string, ChainTvlData>;
  currentChainTvls: Record<string, number>;
  raises?: ProtocolRaise[];
  metrics?: ProtocolMetrics;
  mcap?: number | null;
  isParentProtocol?: boolean;
  otherProtocols?: string[];
  treasury?: string;
  governanceID?: string[];
  wrongLiquidity?: boolean;
  github?: string[];
  stablecoins?: string[];
  hallmarks?: [number, string][];
}

export interface ProtocolRaise {
  date: number;
  amount: number;
  round: string;
  name?: string;
  chains?: string[];
  sector?: string;
  category?: string | null;
  categoryGroup?: string | null;
  leadInvestors?: string[];
  otherInvestors?: string[];
  source?: string;
  valuation?: number | null;
  defillamaId?: string | number | null;
}

export interface ProtocolMetrics {
  activeUsers?: number;
  transactions?: number;
  gasUsed?: number;
}

export interface Chain {
  gecko_id: string | null;
  tvl: number;
  tokenSymbol: string | null;
  cmcId: string | null;
  name: string;
  chainId?: number | null;
}

export interface HistoricalChainTvl {
  date: number;
  tvl: number;
}

export interface HistoricalChainsTvl {
  date: number;
  [chain: string]: number;
}

export interface TokenProtocolHolding {
  name: string;
  category: string;
  amountUsd: Record<string, number>;
  misrepresentedTokens?: boolean;
}

export interface TokenTvlSnapshot {
  tvl: Record<string, number>;
}

export interface ProtocolInflowsResponse {
  outflows: number;
  oldTokens: TokenTvlSnapshot;
  currentTokens: TokenTvlSnapshot;
}

export interface ChainAssetBreakdown {
  total: string;
  breakdown: Record<string, string>;
}

export interface ChainAsset {
  canonical?: ChainAssetBreakdown;
  ownTokens?: ChainAssetBreakdown;
  native?: ChainAssetBreakdown;
  thirdParty?: ChainAssetBreakdown;
  total?: ChainAssetBreakdown;
}

export interface ChainAssetsResponse {
  timestamp?: number;
  [key: string]: ChainAsset | number | undefined;
}
