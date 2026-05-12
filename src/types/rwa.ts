export type RwaNumberMap = Record<string, number>;
export type RwaContractsByChain = Record<string, string[]>;
export type RwaTvlByChain = Record<string, Record<string, number>>;
export type RwaHoldersByChain = Record<string, string[]>;

export type RwaId = string | number;

/**
 * Raw RWA asset record returned by the RWA API.
 */
export interface RwaAsset {
  id: RwaId;
  canonicalMarketId?: string | null;
  ticker: string;
  assetName?: string | null;
  assetGroup?: string | null;
  website?: string[] | null;
  twitter?: string[] | null;
  primaryChain?: string | null;
  chain?: string[] | null;
  contracts?: RwaContractsByChain | null;
  category?: string[] | null;
  assetClass?: string[] | null;
  type?: string | null;
  rwaClassification?: string | null;
  accessModel?:
    | "Permissioned"
    | "Permissionless"
    | "Non-transferable"
    | "Custodial Only"
    | "Unknown";
  issuer?: string | null;
  issuerSourceLink?: string[] | null;
  issuerRegistryInfo?: string[] | null;
  isin?: string | null;
  attestationLinks?: string[] | null;
  attestations?: boolean | null;
  redeemable?: boolean | null;
  cexListed?: boolean | null;
  kycForMintRedeem?: boolean | null;
  kycAllowlistedWhitelistedToTransferHold?: boolean | null;
  transferable?: boolean | null;
  selfCustody?: boolean | null;
  descriptionNotes?: string[] | null;
  parentPlatform?: string | string[] | null;
  stablecoin?: boolean | null;
  governance?: boolean | null;
  defiActiveTvl?: RwaTvlByChain | null;
  onChainMcap?: RwaNumberMap | null;
  activeMcap?: RwaNumberMap | null;
  price?: number | null;
  activeMcapData?: boolean;
  projectId?: string | string[] | null;
  coingeckoId?: string | null;
  oracleProvider?: string | null;
  oracleProofLink?: string | null;
  logo?: string | string[] | null;
  rwaGithub?: string | null;
  dateOfLastAttestation?: string | null;
  attestationFrequency?: string | string[] | null;
  holdersToRemove?: RwaHoldersByChain | null;
  discord?: boolean | string | null;
  telegram?: boolean | string | null;
}

/**
 * One classification slice in segmented RWA stats. Each top-level group
 * (`byChain`, `byCategory`, `byPlatform`, `byAssetGroup`) is split into four
 * non-overlapping slices.
 */
export interface RwaStatsBucket {
  onChainMcap: number;
  activeMcap: number;
  defiActiveTvl: number;
  assetCount: number;
  assetIssuers: string[];
}

/**
 * Four non-overlapping slices by asset classification used by `byChain`,
 * `byCategory`, `byPlatform`, and `byAssetGroup`.
 */
export interface RwaStatsBucketGroup {
  base: RwaStatsBucket;
  stablecoinsOnly: RwaStatsBucket;
  governanceOnly: RwaStatsBucket;
  stablecoinsAndGovernance: RwaStatsBucket;
}

/**
 * Aggregate stats response returned by `/stats`.
 *
 * Field names match the upstream payload exactly (`assetCount` and
 * `assetIssuers`; the latter is a count of unique issuers, not an array).
 */
export interface RwaStatsResponse {
  totalOnChainMcap: number;
  totalActiveMcap: number;
  totalDefiActiveTvl: number;
  assetCount: number;
  assetIssuers: number;
  byChain: Record<string, RwaStatsBucketGroup>;
  byCategory: Record<string, RwaStatsBucketGroup>;
  byPlatform: Record<string, RwaStatsBucketGroup>;
  byAssetGroup: Record<string, RwaStatsBucketGroup>;
}

/**
 * Lightweight enumeration response returned by `/list`.
 *
 * `idMap` maps a canonical market id (the human-readable slug) to the
 * underlying asset id used by the per-asset chart and lookup routes.
 */
export interface RwaListResponse {
  canonicalMarketIds: string[];
  platforms: string[];
  chains: string[];
  categories: string[];
  assetGroups: string[];
  idMap: Record<string, RwaId>;
}

/** Map of canonical market id -> internal RWA id, returned by `/id-map`. */
export type RwaIdMapResponse = Record<string, RwaId>;

export type RwaChartMetricKey = "onChainMcap" | "activeMcap" | "defiActiveTvl";

/**
 * Row of an overview breakdown chart: `{ timestamp, [<sliceKey>]: number, ... }`.
 *
 * The dynamic columns depend on the breakdown target (chains, categories,
 * platforms, or asset groups) and the metric key.
 */
export type RwaBreakdownChartRow = { timestamp: number } & Record<string, number>;
export type RwaBreakdownChartResponse = RwaBreakdownChartRow[];

export interface RwaBreakdownOptions {
  /** Which metric to return columns for. Defaults to `onChainMcap` server-side. */
  key?: RwaChartMetricKey;
  /** Include stablecoin-classified assets. Defaults to `false`. */
  includeStablecoin?: boolean;
  /** Include governance-classified assets. Defaults to `false`. */
  includeGovernance?: boolean;
}

/** Response shape for `/category/:category`, `/assetGroup/:assetGroup`, `/chain/:chain`. */
export interface RwaAssetsBySliceResponse {
  data: RwaAsset[];
  /** Currently always `undefined` upstream (the `current.json` payload is an array). */
  timestamp?: number;
}

/**
 * Time-series point returned by aggregate slice charts (`/chart/{kind}/{slug}`)
 * and by per-asset historical charts (`/chart/:id`, `/chart/name/:name`).
 *
 * `activeMcap` is omitted for assets that opt out of active market-cap tracking.
 */
export interface RwaHistoricalPoint {
  timestamp: number;
  onChainMcap: number;
  defiActiveTvl: number;
  activeMcap?: number;
}

export type RwaHistoricalSeries = RwaHistoricalPoint[];

/** One row of an asset-breakdown slice chart, keyed by asset id. */
export type RwaAssetBreakdownPoint = { timestamp: number } & Record<string, number>;

/**
 * Asset-breakdown slice chart payload returned by
 * `/chart/{kind}/{slug}/asset-breakdown`. Each metric is a separate time series
 * with one column per contributing asset id.
 */
export interface RwaAssetBreakdownSeries {
  onChainMcap: RwaAssetBreakdownPoint[];
  activeMcap: RwaAssetBreakdownPoint[];
  defiActiveTvl: RwaAssetBreakdownPoint[];
}

/**
 * Per-chain breakdown nested inside each asset chart point returned by
 * `/chart/asset/:id` (PG-cache backed).
 */
export interface RwaAssetChartChainBreakdown {
  onChainMcap: number;
  activeMcap: number;
  defiActiveTvl: number;
}

/**
 * One time-series point of the per-asset PG-cache chart returned by
 * `/chart/asset/:id`. Includes a `chains` map with the same metrics broken
 * down per chain.
 */
export interface RwaAssetChartPoint {
  timestamp: number;
  onChainMcap: number;
  activeMcap: number;
  defiActiveTvl: number;
  chains: Record<string, RwaAssetChartChainBreakdown>;
}
