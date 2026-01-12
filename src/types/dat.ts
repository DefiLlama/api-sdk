export interface InstitutionHolding {
  amount: number;
  avgPrice: number | null;
  usdValue: number;
  cost: number | null;
  transactionCount?: number;
  firstAnnouncementDate?: string;
  lastAnnouncementDate?: string;
  supplyPercentage?: number;
}

export interface InstitutionMetadata {
  institutionId: number;
  ticker: string;
  name: string;
  type?: string;
  price?: number;
  priceChange24h?: number;
  volume24h?: number;
  fd_realized?: number | string;
  fd_realistic?: number | string;
  fd_maximum?: number | string;
  mcapRealized?: number;
  mcapRealistic?: number;
  mcapMax?: number;
  realized_mNAV?: number;
  realistic_mNAV?: number;
  max_mNAV?: number;
  totalCost?: number | null;
  totalUsdValue?: number;
  holdings?: Record<string, InstitutionHolding>;
  description?: string;
  logo?: string;
  url?: string;
  country?: string;
  exchange?: string;
  marketCap?: number;
  totalBitcoin?: number;
  totalEthereum?: number;
}

export interface DatAssetMetadata {
  name: string;
  ticker: string;
  geckoId?: string;
  companies?: number;
  totalAmount?: number;
  totalUsdValue?: number;
  circSupplyPerc?: number;
}

export interface DatInstitutionSummary {
  institutionId: number;
  totalUsdValue: number;
  totalCost: number | null;
}

export interface DatAssetInstitutionSummary {
  institutionId: number;
  usdValue: number;
  amount: number;
}

export type DatFlowPoint = [number, number, number, number, number, number];

export type DatMnavPoint = [number, number, number, number];

export type DatStatsPoint = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

export type DatOhlcvPoint = [number, number, number, number, number, number];

export interface DatInstitutionsResponse {
  institutionMetadata: Record<string, InstitutionMetadata>;
  assetMetadata: Record<string, DatAssetMetadata>;
  institutions: DatInstitutionSummary[];
  assets: Record<string, DatAssetInstitutionSummary[]>;
  flows?: Record<string, DatFlowPoint[]>;
  mNAV?: Record<string, Record<string, DatMnavPoint[]>>;
  totalCompanies: number;
  lastUpdated: string;
}

export interface DatInstitutionAssetMeta {
  name: string;
  ticker: string;
}

export interface DatInstitutionResponse {
  institutionId: number;
  ticker: string;
  name: string;
  type?: string;
  rank?: number;
  price?: number;
  priceChange24h?: number;
  volume24h?: number;
  fd_realized?: number | string;
  fd_realistic?: number | string;
  fd_max?: number | string;
  mcap_realized?: number;
  mcap_realistic?: number;
  mcap_max?: number;
  realized_mNAV?: number;
  realistic_mNAV?: number;
  max_mNAV?: number;
  totalCost?: number;
  totalUsdValue?: number;
  assets?: Record<string, InstitutionHolding>;
  assetsMeta?: Record<string, DatInstitutionAssetMeta>;
  assetValue?: [number, number][];
  stats?: DatStatsPoint[];
  ohlcv?: DatOhlcvPoint[];
  transactions?: unknown[];
  lastUpdated?: string;
}
