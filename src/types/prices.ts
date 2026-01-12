/**
 * Price data for a single coin.
 */
export interface CoinPrice {
  /** Token decimals */
  decimals?: number;
  /** Token symbol */
  symbol: string;
  /** Current price in USD */
  price: number;
  /** Unix timestamp of the price */
  timestamp: number;
  /** Confidence score (0-1) indicating price reliability */
  confidence?: number;
}

/**
 * Response from current and historical price endpoints.
 */
export interface CoinPricesResponse {
  /** Map of coin identifiers to their price data */
  coins: Record<string, CoinPrice>;
}

/**
 * Single price point in batch historical response.
 */
export interface BatchHistoricalPricePoint {
  /** Unix timestamp */
  timestamp: number;
  /** Price in USD */
  price: number;
  /** Confidence score */
  confidence?: number;
}

/**
 * Coin data in batch historical response.
 */
export interface BatchHistoricalCoinData {
  /** Array of historical price points */
  prices: BatchHistoricalPricePoint[];
  /** Token symbol */
  symbol?: string;
  /** Token decimals */
  decimals?: number;
  /** Confidence score */
  confidence?: number;
}

/**
 * Response from batch historical prices endpoint.
 */
export interface BatchHistoricalResponse {
  /** Map of coin identifiers to their historical price data */
  coins: Record<string, BatchHistoricalCoinData>;
}

/**
 * Single price point in chart response.
 */
export interface ChartPricePoint {
  /** Unix timestamp */
  timestamp: number;
  /** Price in USD */
  price: number;
}

/**
 * Coin chart data with price history.
 */
export interface CoinChartData {
  /** Array of price points over time */
  prices: ChartPricePoint[];
  /** Token symbol */
  symbol: string;
  /** Confidence score */
  confidence?: number;
  /** Token decimals */
  decimals?: number;
}

/**
 * Response from chart endpoint.
 */
export interface ChartResponse {
  /** Map of coin identifiers to their chart data */
  coins: Record<string, CoinChartData>;
}

/**
 * Response from percentage change endpoint.
 */
export interface PercentageResponse {
  /** Map of coin identifiers to their percentage change */
  coins: Record<string, number>;
}

/**
 * First recorded price data for a coin.
 */
export interface FirstPriceData {
  /** First recorded price in USD */
  price: number;
  /** Unix timestamp of first price record */
  timestamp: number;
  /** Token symbol */
  symbol: string;
}

/**
 * Response from first prices endpoint.
 */
export interface FirstPriceResponse {
  /** Map of coin identifiers to their first price data */
  coins: Record<string, FirstPriceData>;
}

/**
 * Block information at a specific timestamp.
 */
export interface BlockInfo {
  /** Block height/number */
  height: number;
  /** Actual timestamp of the block */
  timestamp: number;
}

/**
 * Options for the chart endpoint.
 */
export interface ChartOptions {
  /** Unix timestamp of earliest data point requested */
  start?: number;
  /** Unix timestamp of latest data point requested */
  end?: number;
  /** Number of data points to return */
  span?: number;
  /** Duration between data points (e.g., "4h", "1d", "1W") */
  period?: string;
  /** Time range on either side to find price data */
  searchWidth?: string;
}

/**
 * Options for the percentage change endpoint.
 */
export interface PercentageOptions {
  /** Unix timestamp for the data point, defaults to now */
  timestamp?: number;
  /** Look forward from timestamp instead of backward */
  lookForward?: boolean;
  /** Duration for percentage calculation (e.g., "24h", "7d") */
  period?: string;
}
