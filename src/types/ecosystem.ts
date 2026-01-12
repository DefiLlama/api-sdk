export interface CategoryTvlDataPoint {
  tvl?: number | null;
}

export interface CategoriesResponse {
  chart: Record<string, Record<string, CategoryTvlDataPoint>>;
  categories: Record<string, string[]>;
  categoryPercentages?: Record<string, number>;
}

export interface ForkTvlDataPoint {
  tvl: number;
  forks?: number | null;
}

export interface ForksResponse {
  chart: Record<string, Record<string, ForkTvlDataPoint>>;
  forks: Record<string, string[]>;
  parentProtocols?: Record<string, string>;
}

export interface OracleTvlDataPoint {
  tvl: number;
  protocolsSecured?: number | null;
}

export interface OraclesResponse {
  chart: Record<string, Record<string, OracleTvlDataPoint>>;
  chainChart?: Record<string, Record<string, unknown>>;
  oraclesTVS?: Record<string, unknown>;
  oracles: Record<string, string[]>;
  chainsByOracle?: Record<string, string[]>;
  totalValueSecured?: number;
  dominance?: Record<string, number>;
}

export interface TokenBreakdowns {
  ownTokens: number;
  stablecoins: number;
  majors: number;
  others: number;
}

export interface Entity {
  id: string;
  name: string;
  url?: string;
  description?: string;
  logo?: string;
  category?: string;
  module?: string;
  twitter?: string;
  symbol?: string;
  chain?: string;
  gecko_id?: string | null;
  cmcId?: string | null;
  chains?: string[];
  misrepresentedTokens?: boolean;
  slug?: string;
  tvl: number;
  chainTvls?: Record<string, number>;
  change_1h?: number | null;
  change_1d?: number | null;
  change_7d?: number | null;
  tokenBreakdowns?: TokenBreakdowns;
  mcap?: number | null;
}

export interface Treasury {
  id: string;
  name: string;
  address?: string | null;
  symbol?: string;
  url?: string;
  description?: string;
  chain?: string;
  logo?: string;
  audits?: string;
  audit_note?: string | null;
  audit_links?: string[];
  gecko_id?: string | null;
  cmcId?: string | null;
  category?: string;
  chains?: string[];
  module?: string;
  treasury?: string;
  forkedFrom?: string[];
  forkedFromIds?: string[];
  twitter?: string;
  misrepresentedTokens?: boolean;
  slug?: string;
  tvl: number;
  chainTvls?: Record<string, number>;
  change_1h?: number | null;
  change_1d?: number | null;
  change_7d?: number | null;
  tokenBreakdowns?: TokenBreakdowns;
  mcap?: number | null;
  oracles?: string[];
  oraclesBreakdown?: Record<string, unknown> | unknown[];
  listedAt?: number;
  methodology?: string;
  governanceID?: string[];
  stablecoins?: string[];
  referralUrl?: string;
  openSource?: boolean;
  deadUrl?: boolean;
  deadFrom?: number;
  github?: string[];
  language?: string;
  assetToken?: string;
  dimensions?: Record<string, unknown>;
  hallmarks?: [number, string][];
  previousNames?: string[];
  rugged?: boolean;
  tags?: string[];
  warningBanners?: string[];
  wrongLiquidity?: boolean;
}

export interface Hack {
  date: number;
  name: string;
  classification: string;
  technique: string;
  amount: number | null;
  chain: string[];
  bridgeHack?: boolean;
  targetType?: string;
  source?: string;
  returnedFunds?: number | null;
  defillamaId?: string | number | null;
  language?: string | null;
  parentProtocolId?: string;
}

export interface Raise {
  date: number;
  name: string;
  round: string | null;
  amount: number;
  chains?: string[];
  sector?: string;
  category?: string | null;
  categoryGroup?: string | null;
  source?: string;
  leadInvestors: string[];
  otherInvestors?: string[];
  valuation?: number | null;
  defillamaId?: string | null;
}

export interface RaisesResponse {
  raises: Raise[];
}
