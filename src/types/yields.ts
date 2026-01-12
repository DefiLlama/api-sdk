/**
 * Prediction data for yield pool APY trends.
 */
export interface YieldPoolPredictions {
  /** Predicted trend class (e.g., "Stable/Up", "Down") */
  predictedClass: string | null;
  /** Probability percentage of the prediction */
  predictedProbability: number | null;
  /** Confidence level (1-3 scale) */
  binnedConfidence: number | null;
}

/**
 * A yield farming pool with current APY and metadata.
 */
export interface YieldPool {
  /** Unique pool identifier (UUID) */
  pool: string;
  /** Blockchain network (e.g., "Ethereum", "Arbitrum") */
  chain: string;
  /** Protocol name (e.g., "aave-v3", "lido") */
  project: string;
  /** Token symbol(s) in the pool */
  symbol: string;
  /** Total value locked in USD */
  tvlUsd: number;
  /** Total APY (base + reward) */
  apy: number | null;
  /** Base APY from protocol fees/interest */
  apyBase: number | null;
  /** Reward APY from token incentives */
  apyReward: number | null;
  /** Addresses of reward tokens */
  rewardTokens: string[] | null;
  /** Addresses of underlying tokens */
  underlyingTokens: string[] | null;
  /** Additional pool metadata (e.g., "Lending", "Staking") */
  poolMeta: string | null;
  /** Exposure type (e.g., "single", "multi") */
  exposure: string | null;
  /** 7-day impermanent loss percentage */
  il7d: number | null;
  /** 7-day average base APY */
  apyBase7d: number | null;
  /** 1-day APY percentage change */
  apyPct1D: number | null;
  /** 7-day APY percentage change */
  apyPct7D: number | null;
  /** 30-day APY percentage change */
  apyPct30D: number | null;
  /** Whether the pool contains stablecoins */
  stablecoin: boolean;
  /** Impermanent loss risk level */
  ilRisk: string | null;
  /** APY trend predictions */
  predictions: YieldPoolPredictions | null;
  /** Statistical mean for APY distribution */
  mu: number | null;
  /** Statistical standard deviation for APY */
  sigma: number | null;
  /** Number of data points */
  count: number | null;
  /** Whether pool is flagged as outlier */
  outlier: boolean | null;
  /** 1-day trading volume in USD */
  volumeUsd1d: number | null;
  /** 7-day trading volume in USD */
  volumeUsd7d: number | null;
  /** 30-day mean APY */
  apyMean30d: number | null;
  /** Base APY since inception */
  apyBaseInception: number | null;
}

/**
 * Response from the /yields/pools endpoint.
 */
export interface YieldPoolsResponse {
  /** Response status */
  status: string;
  /** Array of yield pools */
  data: YieldPool[];
}

/**
 * Legacy yield pool format with old pool identifier.
 */
export interface YieldPoolOld extends YieldPool {
  /** Legacy pool identifier */
  pool_old: string;
  /** ISO timestamp */
  timestamp: string;
  /** URL to the pool page */
  url: string;
  /** Daily return percentage */
  return: number | null;
  /** Expanding mean APY */
  apyMeanExpanding: number | null;
  /** Expanding standard deviation of APY */
  apyStdExpanding: number | null;
  /** Factorized project identifier */
  project_factorized: number;
  /** Factorized chain identifier */
  chain_factorized: number;
}

/**
 * Response from the /yields/poolsOld endpoint.
 */
export interface YieldPoolsOldResponse {
  /** Response status */
  status: string;
  /** Array of legacy yield pools */
  data: YieldPoolOld[];
}

/**
 * Historical data point for a yield pool.
 */
export interface YieldChartDataPoint {
  /** ISO timestamp */
  timestamp: string;
  /** TVL in USD at this point */
  tvlUsd: number;
  /** Total APY at this point */
  apy: number | null;
  /** Base APY at this point */
  apyBase: number | null;
  /** Reward APY at this point */
  apyReward: number | null;
  /** 7-day impermanent loss */
  il7d: number | null;
  /** 7-day average base APY */
  apyBase7d: number | null;
}

/**
 * Response from the /yields/chart/{pool} endpoint.
 */
export interface YieldChartResponse {
  /** Response status */
  status: string;
  /** Array of historical data points */
  data: YieldChartDataPoint[];
}

/**
 * A lending/borrowing pool with supply and borrow rates.
 */
export interface BorrowPool extends YieldPool {
  /** Base APY for borrowing */
  apyBaseBorrow: number | null;
  /** Reward APY for borrowing (can be negative) */
  apyRewardBorrow: number | null;
  /** Total supply in USD */
  totalSupplyUsd: number | null;
  /** Total borrowed in USD */
  totalBorrowUsd: number | null;
  /** Debt ceiling in USD */
  debtCeilingUsd: number | null;
  /** Loan-to-value ratio */
  ltv: number | null;
  /** Whether borrowing is enabled */
  borrowable: boolean | null;
  /** Minted coin symbol (e.g., "aUSDC") */
  mintedCoin: string | null;
  /** Borrow factor multiplier */
  borrowFactor: number | null;
}

/**
 * Response from the /yields/poolsBorrow endpoint.
 */
export interface BorrowPoolsResponse {
  /** Response status */
  status: string;
  /** Array of borrow pools */
  data: BorrowPool[];
}

/**
 * Historical data point for lending/borrowing rates.
 */
export interface LendBorrowChartDataPoint {
  /** ISO timestamp */
  timestamp: string;
  /** Total supply in USD */
  totalSupplyUsd: number | null;
  /** Total borrowed in USD */
  totalBorrowUsd: number | null;
  /** Debt ceiling in USD */
  debtCeilingUsd: number | null;
  /** Base lending APY */
  apyBase: number | null;
  /** Base borrowing APY */
  apyBaseBorrow: number | null;
  /** Reward lending APY */
  apyReward: number | null;
  /** Reward borrowing APY */
  apyRewardBorrow: number | null;
}

/**
 * Response from the /yields/chartLendBorrow/{pool} endpoint.
 */
export interface LendBorrowChartResponse {
  /** Response status */
  status: string;
  /** Array of historical lend/borrow data points */
  data: LendBorrowChartDataPoint[];
}

/**
 * Perpetual futures pool with funding rate data.
 */
export interface PerpPool {
  /** Unique perpetual identifier */
  perp_id: string;
  /** ISO timestamp of the data */
  timestamp: string;
  /** Exchange/marketplace name (e.g., "Binance", "dYdX") */
  marketplace: string;
  /** Market pair (e.g., "ETHUSDT") */
  market: string;
  /** Base asset symbol */
  baseAsset: string;
  /** Current funding rate (percentage) */
  fundingRate: number | null;
  /** Previous funding rate */
  fundingRatePrevious: number | null;
  /** Previous funding timestamp (Unix milliseconds) */
  fundingTimePrevious: number | null;
  /** Open interest in USD */
  openInterest: number | null;
  /** Index/spot price */
  indexPrice: number | null;
  /** 7-day average funding rate */
  fundingRate7dAverage: number | null;
  /** 7-day cumulative funding rate */
  fundingRate7dSum: number | null;
  /** 30-day average funding rate */
  fundingRate30dAverage: number | null;
  /** 30-day cumulative funding rate */
  fundingRate30dSum: number | null;
}

/**
 * Response from the /yields/perps endpoint.
 */
export interface PerpsResponse {
  /** Response status */
  status: string;
  /** Array of perpetual pools */
  data: PerpPool[];
}

/**
 * Liquid staking derivative rate data.
 */
export interface LsdRate {
  /** LSD protocol name */
  name: string;
  /** LSD token symbol (e.g., "stETH", "rETH") */
  symbol: string;
  /** Token contract address */
  address: string;
  /** Token type ("rebase" or "accruing") */
  type: string | null;
  /** Expected exchange rate vs ETH */
  expectedRate: number | null;
  /** Current market exchange rate */
  marketRate: number | null;
  /** Deviation from ETH peg (percentage) */
  ethPeg: number | null;
  /** Protocol fee (percentage) */
  fee: number | null;
}

/**
 * Response from the /yields/lsdRates endpoint.
 * Returns an array directly (not wrapped in status/data).
 */
export type LsdRatesResponse = LsdRate[];
