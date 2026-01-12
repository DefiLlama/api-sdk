/**
 * Circulating supply breakdown by peg type.
 * Contains amounts for different pegged currencies (USD, EUR, etc.).
 */
export interface PeggedAsset {
  /** Circulating supply pegged to USD */
  peggedUSD?: number;
  /** Circulating supply pegged to variable assets */
  peggedVAR?: number;
  /** Circulating supply pegged to EUR */
  peggedEUR?: number;
  /** Circulating supply pegged to JPY */
  peggedJPY?: number;
  /** Circulating supply pegged to CNY */
  peggedCNY?: number;
  /** Circulating supply pegged to UAH */
  peggedUAH?: number;
  /** Circulating supply pegged to ARS */
  peggedARS?: number;
  /** Circulating supply pegged to GBP */
  peggedGBP?: number;
  /** Circulating supply pegged to CAD */
  peggedCAD?: number;
  /** Circulating supply pegged to AUD */
  peggedAUD?: number;
  /** Circulating supply pegged to SGD */
  peggedSGD?: number;
  /** Circulating supply pegged to CHF */
  peggedCHF?: number;
  /** Circulating supply pegged to BRL */
  peggedREAL?: number;
  /** Circulating supply pegged to RUB */
  peggedRUB?: number;
  /** Circulating supply pegged to MXN */
  peggedMXN?: number;
  /** Circulating supply pegged to PHP */
  peggedPHP?: number;
  /** Circulating supply pegged to TRY */
  peggedTRY?: number;
}

/**
 * Stablecoin summary with current market cap data.
 * Returned as part of `getStablecoins()` response.
 */
export interface Stablecoin {
  /** Unique stablecoin identifier */
  id: string;
  /** Stablecoin display name */
  name: string;
  /** Stablecoin ticker symbol */
  symbol: string;
  /** CoinGecko identifier */
  gecko_id: string | null;
  /** Type of peg (e.g., "peggedUSD", "peggedEUR") */
  pegType: string;
  /** Mechanism used to maintain peg (e.g., "fiat-backed", "algorithmic") */
  pegMechanism: string;
  /** Current circulating supply by peg type */
  circulating: PeggedAsset;
  /** Circulating supply from previous day */
  circulatingPrevDay: PeggedAsset;
  /** Circulating supply from previous week */
  circulatingPrevWeek: PeggedAsset;
  /** Circulating supply from previous month */
  circulatingPrevMonth: PeggedAsset;
  /** Circulating supply breakdown by chain */
  chainCirculating: Record<
    string,
    {
      current: PeggedAsset;
      circulatingPrevDay: PeggedAsset;
      circulatingPrevWeek: PeggedAsset;
      circulatingPrevMonth: PeggedAsset;
    }
  >;
  /** List of chains where the stablecoin is deployed */
  chains: string[];
  /** Current price in USD */
  price: number | null;
  /** Source of price data */
  priceSource: string | null;
}

/**
 * Response from the stablecoins list endpoint.
 * Returned by `getStablecoins()`.
 */
export interface StablecoinsResponse {
  /** Array of all stablecoins with market cap data */
  peggedAssets: Stablecoin[];
}

/**
 * Historical market cap data point for all stablecoins.
 * Returned by `getAllCharts()`.
 */
export interface StablecoinChartDataPoint {
  /** Unix timestamp as string */
  date: string;
  /** Total circulating supply across all stablecoins */
  totalCirculating: PeggedAsset;
  /** Total unreleased supply */
  totalUnreleased?: PeggedAsset;
  /** Total circulating supply in USD */
  totalCirculatingUSD: PeggedAsset;
  /** Total minted to L2 chains */
  totalMintedToL2?: PeggedAsset;
}

/**
 * Historical market cap data point for a specific chain.
 * Returned by `getChartsByChain()`.
 */
export interface StablecoinChainDataPoint {
  /** Unix timestamp as string */
  date: string;
  /** Total circulating supply on the chain */
  totalCirculating: PeggedAsset;
  /** Total circulating supply in USD on the chain */
  totalCirculatingUSD: PeggedAsset;
}

/**
 * Token contract information for a stablecoin on a specific chain.
 */
export interface StablecoinTokenInfo {
  /** Token name on this chain */
  name: string;
  /** Contract address */
  address: string;
}

/**
 * Stablecoin breakdown for a specific chain.
 */
export interface StablecoinChainBreakdown {
  /** Token contracts on this chain */
  tokens?: StablecoinTokenInfo[];
  /** Current circulating supply */
  circulating: PeggedAsset;
  /** Circulating supply from previous day */
  circulatingPrevDay: PeggedAsset;
  /** Circulating supply from previous week */
  circulatingPrevWeek: PeggedAsset;
  /** Circulating supply from previous month */
  circulatingPrevMonth: PeggedAsset;
  /** Chain this stablecoin is bridged to */
  bridgedTo?: string;
  /** Minting information */
  minted?: string;
  /** Bridge information with links */
  bridgeInfo?: Record<string, { bridge: string; link: string }>;
}

/**
 * Detailed stablecoin data with chain distribution.
 * Returned by `getStablecoin()`.
 */
export interface StablecoinDetails {
  /** Unique stablecoin identifier */
  id: string;
  /** Stablecoin display name */
  name: string;
  /** Primary contract address */
  address: string;
  /** Stablecoin ticker symbol */
  symbol: string;
  /** Project website URL */
  url: string;
  /** Stablecoin description */
  description: string;
  /** Description of mint/redeem mechanism */
  mintRedeemDescription: string | null;
  /** Whether listed on CoinGecko */
  onCoinGecko: string;
  /** CoinGecko identifier */
  gecko_id: string | null;
  /** CoinMarketCap identifier */
  cmcId: string | null;
  /** Type of peg (e.g., "peggedUSD") */
  pegType: string;
  /** Mechanism used to maintain peg */
  pegMechanism: string;
  /** Source of price data */
  priceSource: string | null;
  /** Links to audit reports */
  auditLinks: string[] | null;
  /** Twitter handle */
  twitter: string | null;
  /** Wiki page URL */
  wiki: string | null;
  /** Current price in USD */
  price: number | null;
  /**
   * Historical supply timeline.
   */
  tokens: StablecoinSupplyPoint[];
  /**
   * Historical chain balances.
   */
  chainBalances: Record<string, StablecoinChainBalanceHistory>;
  /**
   * Current chain balances.
   */
  currentChainBalances: Record<string, PeggedAsset>;
}

/**
 * Chain market cap data for stablecoins.
 * Returned by `getChains()`.
 */
export interface StablecoinChainMcap {
  /** CoinGecko chain identifier */
  gecko_id: string | null;
  /** Total stablecoin market cap on this chain */
  totalCirculatingUSD: PeggedAsset;
  /** Native token symbol of the chain */
  tokenSymbol: string | null;
  /** Chain name */
  name: string;
}

/**
 * Historical price data point for stablecoins.
 * Returned by `getPrices()`.
 */
export interface StablecoinPricePoint {
  /** Unix timestamp */
  date: number;
  /** Map of stablecoin identifiers to their prices */
  prices: Record<string, number | null>;
}

/**
 * A single circulating supply data point (used in stablecoin detail endpoints).
 */
export interface StablecoinSupplyPoint {
  date: number;
  circulating: PeggedAsset;
}

export interface StablecoinChainBalanceTokenPoint
  extends StablecoinSupplyPoint {
  bridgedTo?: PeggedAsset & {
    bridges?: Record<string, unknown>;
  };
}

export interface StablecoinChainBalanceHistory {
  tokens: StablecoinChainBalanceTokenPoint[];
}

/**
 * Stablecoin dominance data for a chain.
 * Returned by `getDominance()`.
 */
export interface StablecoinDominanceDataPoint {
  /** Unix timestamp as string */
  date: string;
  /** Total stablecoin market cap on the chain */
  totalCirculatingUSD: PeggedAsset;
  /** Information about the largest stablecoin on the chain */
  greatestMcap: {
    /** CoinGecko identifier of the dominant stablecoin */
    gecko_id: string;
    /** Symbol of the dominant stablecoin */
    symbol: string;
    /** Market cap of the dominant stablecoin */
    mcap: number;
  };
}
