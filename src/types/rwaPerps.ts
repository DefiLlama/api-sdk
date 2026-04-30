/**
 * Single perps market record returned by `/current` and `/market/:id`,
 * and the elements of the array returned by the filter routes.
 */
export interface RwaPerpsMarket {
  id: string;
  timestamp: number;
  contract: string;
  venue: string;
  openInterest: number;
  openInterestChange24h?: number | null;
  volume24h: number;
  volume24hChange24h?: number | null;
  price: number;
  priceChange24h: number | null;
  fundingRate: number;
  premium: number;
  cumulativeFunding: number;
  referenceAsset: string | null;
  referenceAssetGroup: string | null;
  assetClass: string[] | null;
  parentPlatform: string | null;
  pair: string | null;
  marginAsset: string | null;
  settlementAsset: string | null;
  category: string[] | null;
  issuer: string | null;
  website: string[] | null;
  oracleProvider: string | null;
  description: string | null;
  accessModel: string | null;
  rwaClassification: string | null;
  makerFeeRate: number;
  takerFeeRate: number;
  deployerFeeShare: number;
  oraclePx: number;
  midPx: number;
  prevDayPx: number;
  maxLeverage: number;
  szDecimals: number;
  volume7d: number;
  volume30d: number;
  volumeAllTime: number;
  estimatedProtocolFees24h: number;
  estimatedProtocolFees7d: number;
  estimatedProtocolFees30d: number;
  estimatedProtocolFeesAllTime: number;
}

/**
 * Time-series point returned by `/chart/venue/:venue` and `/chart/category/:category`.
 */
export interface RwaPerpsAggregateHistoricalPoint {
  timestamp: number;
  id: string;
  contract: string;
  venue: string;
  referenceAsset: string | null;
  referenceAssetGroup: string | null;
  assetClass: string[] | null;
  category: string[];
  openInterest: number;
  volume24h: number;
}

/** Time-series point returned by `/chart/:id` (per-market history). */
export interface RwaPerpsMarketChartPoint {
  timestamp: number;
  openInterest: number;
  volume24h: number;
  price: number;
  priceChange24h: number;
  fundingRate: number;
  premium: number;
  cumulativeFunding: number;
}

/** Lightweight enumeration response returned by `/list`. */
export interface RwaPerpsListResponse {
  contracts: string[];
  venues: string[];
  categories: string[];
  assetGroups: string[];
  total: number;
}

/** Aggregate counters keyed under `byVenue`, `byCategory`, `byAssetGroup`. */
export interface RwaPerpsStatsBucket {
  openInterest: number;
  volume24h: number;
  markets: number;
}

/** Aggregate stats response returned by `/stats`. */
export interface RwaPerpsStatsResponse {
  totalMarkets: number;
  totalOpenInterest: number;
  totalVolume24h: number;
  totalCumulativeFunding: number;
  byVenue: Record<string, RwaPerpsStatsBucket>;
  byCategory: Record<string, RwaPerpsStatsBucket>;
  byAssetGroup: Record<string, RwaPerpsStatsBucket>;
  /** ISO-8601 timestamp of the cron that last refreshed the stats file. */
  lastUpdated: string;
}

/**
 * Row of a perps breakdown chart: `{ timestamp, [<bucketKey>]: number, ... }`.
 * Returned by `/chart/overview-breakdown` and `/chart/contract-breakdown`.
 */
export type RwaPerpsBreakdownChartRow = { timestamp: number } & Record<string, number>;
export type RwaPerpsBreakdownChartResponse = RwaPerpsBreakdownChartRow[];

/** Map of canonical market id (and aliases) -> resolved id, returned by `/id-map`. */
export type RwaPerpsIdMapResponse = Record<string, string | number>;

export type RwaPerpsBreakdownKey = "openInterest" | "volume24h" | "markets";

/**
 * Breakdown grouping for `/chart/overview-breakdown`.
 *
 * Note: the upstream server restricts which `breakdown` values are valid for
 * each target, e.g. `venue` is only valid when neither `venue` nor
 * `assetGroup` filters are set.
 */
export type RwaPerpsOverviewBreakdown = "venue" | "assetClass" | "assetGroup" | "baseAsset";

/**
 * One funding payment record returned by `/funding/:id` (PG-backed).
 *
 * Numeric fields are returned as strings to preserve full precision from
 * the upstream Postgres NUMERIC columns.
 */
export interface RwaPerpsFundingHistoryPoint {
  timestamp: number;
  id: string;
  contract: string;
  venue: string;
  funding_rate: string;
  premium: string;
  open_interest: string;
  funding_payment: string;
  created_at: string;
}

export interface RwaPerpsFundingHistoryOptions {
  /** Inclusive lower bound, unix seconds. */
  startTime?: number;
  /** Inclusive upper bound, unix seconds. */
  endTime?: number;
}
