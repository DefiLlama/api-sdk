/**
 * An unlock or emission event for a token.
 * Describes when tokens are released and under what terms.
 */
export interface EmissionEvent {
  /** Human-readable description of the event with placeholders */
  description: string;
  /** Unix timestamp of the event */
  timestamp: number;
  /** Array of token amounts involved in this event */
  noOfTokens: number[];
  /** Category of allocation (e.g., "insiders", "airdrop", "farming") */
  category: string;
  /** Type of unlock (e.g., "cliff", "linear") */
  unlockType: string;
  /** Duration in days for linear unlock rate (optional) */
  rateDurationDays?: number;
}

/**
 * Information about the next scheduled unlock event.
 */
export interface NextEvent {
  /** Unix timestamp of the next unlock */
  date: number;
  /** Number of tokens to be unlocked */
  toUnlock: number;
}

/**
 * Token emission summary data.
 * Returned by `getAll()` for each token with unlock schedules.
 */
export interface EmissionToken {
  /** CoinGecko token identifier (e.g., "coingecko:hyperliquid") */
  token: string;
  /** Array of source documentation URLs */
  sources: string[];
  /** DefiLlama protocol ID */
  protocolId: string;
  /** Token display name */
  name: string;
  /** Current circulating supply */
  circSupply: number;
  /** Circulating supply 30 days ago */
  circSupply30d: number;
  /** Total locked/unvested tokens */
  totalLocked: number;
  /** Maximum total supply */
  maxSupply: number;
  /** CoinGecko identifier */
  gecko_id: string;
  /** Array of emission events */
  events: EmissionEvent[];
  /** Array of structured unlock events */
  unlockEvents?: unknown[];
  /** Next scheduled unlock event */
  nextEvent?: NextEvent;
  /** Daily unlock rate */
  unlocksPerDay: number | null;
  /** Market capitalization in USD */
  mcap: number;
}

/**
 * A single data point in the unlock timeline.
 */
export interface UnlockDataPoint {
  /** Unix timestamp */
  timestamp: number;
  /** Cumulative unlocked tokens at this timestamp */
  unlocked: number;
  /** Raw emission amount before adjustments */
  rawEmission: number;
  /** Tokens burned */
  burned: number;
}

/**
 * Emission data for a specific allocation category.
 */
export interface EmissionCategoryData {
  /** Category label (e.g., "Core Contributors", "Genesis Distribution") */
  label: string;
  /** Historical unlock data points */
  data: UnlockDataPoint[];
}

/**
 * Token allocation percentages by category type.
 * Categories vary by protocol and can include: insiders, noncirculating, publicSale, airdrop, farming, privateSale, etc.
 */
export type TokenAllocationBreakdown = Record<string, number>;

/**
 * Token allocation breakdown by specific section names.
 */
export interface TokenAllocationBySection {
  /** Current allocation percentages by section */
  current: Record<string, number>;
  /** Final allocation percentages by section */
  final: Record<string, number>;
  /** Vesting progress percentages by section (0-100) */
  progress: Record<string, number>;
}

/**
 * Complete token allocation data with current, final, and progress views.
 */
export interface TokenAllocation {
  /** Current allocation percentages by category */
  current: TokenAllocationBreakdown;
  /** Final/maximum allocation percentages by category */
  final: TokenAllocationBreakdown;
  /** Vesting progress percentages by category (0-100) */
  progress: TokenAllocationBreakdown;
  /** Detailed breakdown by specific section names */
  bySection?: TokenAllocationBySection;
}

/**
 * Documented emission data including timeline and allocation info.
 */
export interface EmissionDocumentedData {
  /** Array of emission data by category */
  data: EmissionCategoryData[];
  /** Token allocation breakdown */
  tokenAllocation: TokenAllocation;
}

/**
 * A cliff unlock allocation (one-time release).
 */
export interface CliffAllocation {
  /** Recipient name/label */
  recipient: string;
  /** Category of allocation */
  category: string;
  /** Type of unlock ("cliff") */
  unlockType: string;
  /** Number of tokens unlocked */
  amount: number;
}

/**
 * A linear unlock allocation (gradual release over time).
 */
export interface LinearAllocation {
  /** Recipient name/label */
  recipient: string;
  /** Category of allocation */
  category: string;
  /** Type of unlock ("linear_start", etc.) */
  unlockType: string;
  /** Previous weekly unlock rate */
  previousRatePerWeek: number;
  /** New weekly unlock rate */
  newRatePerWeek: number;
  /** Unix timestamp when linear unlock ends */
  endTimestamp: number;
}

/**
 * A structured unlock event with detailed allocation breakdown.
 */
export interface UnlockEventItem {
  /** Unix timestamp of the event */
  timestamp: number;
  /** Array of cliff (one-time) allocations */
  cliffAllocations: CliffAllocation[];
  /** Array of linear (gradual) allocations */
  linearAllocations: LinearAllocation[];
  /** Summary of this unlock event */
  summary: {
    /** Total tokens unlocked via cliff (optional) */
    totalTokensCliff?: number;
    /** Net change in weekly unlock rate (optional - not present for cliff-only events) */
    netChangeInWeeklyRate?: number;
    /** Total new weekly unlock rate (optional - not present for cliff-only events) */
    totalNewWeeklyRate?: number;
  };
}

/**
 * Metadata about a protocol's token emissions.
 */
export interface EmissionMetadata {
  /** CoinGecko token identifier */
  token: string;
  /** Array of documentation source URLs */
  sources: string[];
  /** Associated DefiLlama protocol IDs */
  protocolIds: string[];
  /** Array of emission events */
  events: EmissionEvent[];
  /** Important notes about the emission data */
  notes: string[];
  /** Total token supply (optional - not present for all protocols) */
  total?: number;
  /** Primary blockchain (optional - not present for all protocols) */
  chain?: string;
  /** Structured unlock events with detailed breakdowns */
  unlockEvents: UnlockEventItem[];
}

/**
 * Supply metrics for a token.
 */
export interface SupplyMetrics {
  /** Maximum token supply */
  maxSupply: number | null;
  /** Adjusted circulating supply */
  adjustedSupply: number | null;
  /** To-be-determined/unclear allocation amount */
  tbdAmount: number | null;
  /** Amount allocated for incentives */
  incentiveAmount: number | null;
  /** Amount not allocated for incentives */
  nonIncentiveAmount: number | null;
}

/**
 * Full emission data body for a protocol.
 * Contains documented data, metadata, and additional context.
 */
export interface EmissionBody {
  /** Documented emission timeline and allocation data */
  documentedData: EmissionDocumentedData;
  /** Emission metadata including sources and events */
  metadata: EmissionMetadata;
  /** Protocol display name */
  name: string;
  /** CoinGecko identifier */
  gecko_id: string;
  /** Associated DefiLlama protocol IDs */
  defillamaIds: string[];
  /** Mapping of category types to allocation section names */
  categories: Record<string, string[]>;
  /** Protocol category (e.g., "Bridge", "DEX") */
  protocolCategory: string;
  /** Full chain name */
  chainName: string;
  /** Primary protocol ID */
  pId: string;
  /** Historical unlock values in USD */
  unlockUsdChart: unknown[];
  /** Supply metrics breakdown */
  supplyMetrics: SupplyMetrics;
}

/**
 * Response from `getByProtocol()`.
 * Contains detailed vesting schedule and emission data for a protocol.
 */
export interface EmissionDetailResponse {
  /** Full emission data body */
  body: EmissionBody;
  /** ISO timestamp of last modification */
  lastModified: string;
}
