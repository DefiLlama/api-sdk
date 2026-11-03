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
  /** Legacy pool identifier (v2 `pool_key`) */
  pool_old: string;
  /** Pool receipt/LP token address */
  poolTokenAddress: string | null;
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
  /** Factorized project identifier (always null on the /yields/v1 compatibility route) */
  project_factorized: number | null;
  /** Factorized chain identifier (always null on the /yields/v1 compatibility route) */
  chain_factorized: number | null;
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
  /** Price per share of the pool token */
  pricePerShare?: number | null;
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
 * Response from the /api/perpFundingRates endpoint (formerly /yields/perps).
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

// ---------------------------------------------------------------------------
// Yields v2 (/yields/v2/*)
//
// Changes from v1:
// - No project slug: `protocol` is a display name (e.g. "Aave V3"); `chain` is a display name as in v1.
// - Lending `tvl_usd` is total supplied (v1 `tvlUsd` was supplied minus borrowed).
// - APY is nested: `apy.current|avg_7d|avg_30d.{base,reward,total}`;
//   `reward` is positive or null, never 0.
// - Tokens are objects (`{ address, symbol, decimals }`), not address strings.
// - `/earn` only lists pools with at least $10K supplied.
// ---------------------------------------------------------------------------

/** History window for v2 history routes. The server defaults to `"max"`. */
export type YieldHistoryRange = "30d" | "90d" | "max";

/** Token reference used across v2 responses. */
export interface YieldToken {
  address: string;
  symbol: string | null;
  decimals: number | null;
}

/** Receipt/LP token of a pool. */
export interface YieldPoolToken {
  address: string;
  symbol: string | null;
  name: string | null;
}

/** Human-readable pool label and detail (e.g. fee tier, market name). */
export interface YieldDisplay {
  label: string | null;
  detail: string | null;
}

/** APY components in percent. `reward` is positive or null, never 0. */
export interface YieldApy {
  base: number | null;
  reward: number | null;
  total: number | null;
}

/** APY over the current sample and trailing 7d/30d averages. */
export interface YieldApyWindows {
  current: YieldApy;
  avg_7d: YieldApy;
  avg_30d: YieldApy;
}

/** APY over trailing 1d/7d/30d averages, as used by history points. */
export interface YieldApyHistoryWindows {
  avg_1d: YieldApy;
  avg_7d: YieldApy;
  avg_30d: YieldApy;
}

/** Intrinsic (underlying token) APY, e.g. stETH staking yield inside a lending pool. */
export interface YieldIntrinsicApy {
  base: number | null;
}

/** Intrinsic APY on a history point. */
export interface YieldIntrinsicHistory {
  apy: {
    avg_1d: YieldIntrinsicApy;
    avg_7d: YieldIntrinsicApy;
    avg_30d: YieldIntrinsicApy;
  };
}

/** Intrinsic APY plus the pool it is sourced from. */
export interface YieldIntrinsic {
  apy: {
    current: YieldIntrinsicApy;
    avg_7d: YieldIntrinsicApy;
    avg_30d: YieldIntrinsicApy;
  };
  source_pool: {
    id: string;
    pool_token: string | null;
    symbol: string | null;
  };
}

/** 30-day APY stability score in 0..1 (1 / (1 + coefficient of variation)), per APY composition. */
export interface YieldStability {
  base: number | null;
  base_reward: number | null;
  base_intrinsic: number | null;
  base_reward_intrinsic: number | null;
}

/** Which history series exist for a pool. */
export interface YieldAvailableHistory {
  supply: boolean;
  borrow: boolean;
}

/**
 * An earn pool from `/yields/v2/earn`. Replaces {@link YieldPool}.
 *
 * Changes from v1: `protocol` is a display name (no project slug); lending
 * `tvl_usd` is total supplied; APY is nested under `apy.current|avg_7d|avg_30d`;
 * tokens are objects; only pools with at least $10K supplied are listed.
 */
export interface EarnPool {
  /** Pool UUID (same id as v1 `pool`) */
  id: string;
  /** Stable adapter key (v1 `pool_old`) */
  pool_key: string;
  pool_token: YieldPoolToken | null;
  display: YieldDisplay;
  reference_asset_symbol: string | null;
  url: string | null;
  /** Protocol display name, e.g. "Aave V3" (v1 `project` was the slug "aave-v3") */
  protocol: string;
  /** Chain display name, e.g. "Ethereum" */
  chain: string;
  underlying_tokens: YieldToken[];
  reward_tokens: YieldToken[];
  /** TVL in USD. For lending pools this is total supplied (v1 subtracted borrows). */
  tvl_usd: number | null;
  apy: YieldApyWindows;
  intrinsic: YieldIntrinsic | null;
  stability_30d: YieldStability;
  price_per_share: number | null;
  volume_1d_usd: number | null;
  attributes: {
    stablecoin_only: boolean;
    single_asset_exposure: boolean;
    impermanent_loss_risk: boolean;
  };
  holders: EarnPoolHolders;
  /** Room left under the supply cap in USD; null = uncapped, 0 = at/over cap */
  available_supply_usd: number | null;
}

export interface EarnPoolHolders {
  count: number | null;
  avg_position_usd: number | null;
  top_10_share_pct: number | null;
}

export type YieldHolderMovementStatus = "up" | "down" | "steady" | "entered_top_10" | "unknown";

/** A top-10 holder's share and balance movement over a window. */
export interface YieldHolderChange {
  share: { status: YieldHolderMovementStatus; pct_point_delta: number | null };
  balance: { status: YieldHolderMovementStatus; pct_delta: number | null };
}

export interface YieldTopHolder {
  rank: number;
  address: string;
  /** Raw token balance as a decimal string (scale by `decimals`) */
  balance: string | null;
  share_pct: number | null;
  change_7d: YieldHolderChange;
  change_30d: YieldHolderChange;
}

/** Holder data on the pool detail route. */
export interface EarnPoolDetailHolders extends EarnPoolHolders {
  count_change_7d: number | null;
  count_change_30d: number | null;
  top_10_holders: { decimals: number | null; holders: YieldTopHolder[] } | null;
}

/** A single earn pool from `/yields/v2/earn/{id}`: an {@link EarnPool} plus holder detail. */
export interface EarnPoolDetail extends Omit<EarnPool, "holders"> {
  holders: EarnPoolDetailHolders;
  available_history: YieldAvailableHistory;
}

/** Daily earn pool history point. Replaces {@link YieldChartDataPoint}. */
export interface EarnHistoryPoint {
  /** YYYY-MM-DD */
  date: string;
  tvl_usd: number | null;
  apy: YieldApyHistoryWindows;
  intrinsic: YieldIntrinsicHistory | null;
  price_per_share: number | null;
}

/**
 * Filters for `/yields/v2/earn/query`. Keys match the server's query params.
 * `chain` and `protocol` are slugs (e.g. "ethereum", "aave-v3"; case-insensitive),
 * up to 20 values each. Responses carry display names, not slugs.
 */
export type EarnQueryParams = {
  chain?: string | string[];
  protocol?: string | string[];
  stablecoin?: boolean;
  single_asset_exposure?: boolean;
  impermanent_loss_risk?: boolean;
  /** Minimum TVL in USD (>= 0) */
  min_tvl?: number;
  /** 1-based page number */
  page?: number;
  /** Page size, 1-300 (default 100) */
  limit?: number;
};

/** Response from `/yields/v2/earn`. Replaces {@link YieldPoolsResponse}. */
export interface EarnResponse {
  /** Newest sample time in the snapshot (ISO), when rows carry one */
  as_of?: string;
  data: EarnPool[];
}

/** Response from `/yields/v2/earn/query`. Rows sorted by TVL descending. */
export interface EarnQueryResponse {
  data: EarnPool[];
  pagination: { total: number; page: number; limit: number };
}

/** Response from `/yields/v2/earn/{id}`. */
export interface EarnPoolResponse {
  data: EarnPoolDetail;
}

/** Response from `/yields/v2/earn/{id}/history`. Replaces {@link YieldChartResponse}. */
export interface EarnHistoryResponse {
  data: EarnHistoryPoint[];
}

/**
 * A borrow market from `/yields/v2/borrow/markets`. Replaces {@link BorrowPool}.
 *
 * Changes from v1: `protocol` is a display name; supply and borrow APY are nested
 * windows (`supply_apy`, `borrow_cost_apy`); tokens are objects.
 */
export interface BorrowMarket {
  /** Pool UUID (same id as v1 `pool`) */
  id: string;
  pool_key: string;
  pool_token: YieldPoolToken | null;
  display: YieldDisplay;
  url: string | null;
  /** Protocol display name */
  protocol: string;
  /** Chain display name */
  chain: string;
  collateral_token: YieldToken | null;
  borrow_token: YieldToken | null;
  reward_tokens: YieldToken[];
  loan_to_value: number | null;
  total_supply_usd: number | null;
  total_borrow_usd: number | null;
  available_borrow_usd: number | null;
  supply_apy: YieldApyWindows;
  /** Borrow cost; `reward` is the incentive that reduces it */
  borrow_cost_apy: YieldApyWindows;
  intrinsic: {
    supply: YieldIntrinsic | null;
    borrow: YieldIntrinsic | null;
  };
}

/** A single borrow market from `/yields/v2/borrow/markets/{id}`. */
export interface BorrowMarketDetail extends BorrowMarket {
  available_history: YieldAvailableHistory;
}

/**
 * Daily borrow market history point. Together with {@link EarnHistoryPoint}
 * (supply side) this replaces {@link LendBorrowChartDataPoint}.
 */
export interface BorrowMarketHistoryPoint {
  /** YYYY-MM-DD */
  date: string;
  total_borrow_usd: number | null;
  available_borrow_usd: number | null;
  borrow_cost_apy: YieldApyHistoryWindows;
  intrinsic: YieldIntrinsicHistory | null;
}

/** Response from `/yields/v2/borrow/markets`. Replaces {@link BorrowPoolsResponse}. */
export interface BorrowMarketsResponse {
  /** Newest sample time in the snapshot (ISO), when rows carry one */
  as_of?: string;
  data: BorrowMarket[];
}

/** Response from `/yields/v2/borrow/markets/{id}`. */
export interface BorrowMarketResponse {
  data: BorrowMarketDetail;
}

/** Response from `/yields/v2/borrow/markets/{id}/history`. */
export interface BorrowMarketHistoryResponse {
  data: BorrowMarketHistoryPoint[];
}
