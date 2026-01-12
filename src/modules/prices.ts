import type { BaseClient } from "../client.js";
import type {
  CoinPricesResponse,
  BatchHistoricalResponse,
  ChartResponse,
  ChartOptions,
  PercentageResponse,
  PercentageOptions,
  FirstPriceResponse,
  BlockInfo,
} from "../types/prices.js";

/**
 * Module for accessing token price data from DefiLlama.
 * Provides methods for fetching current prices, historical prices, and price charts.
 *
 * @example
 * ```typescript
 * const client = new DefiLlama();
 * const prices = await client.prices.getCurrentPrices([
 *   'ethereum:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
 * ]);
 * ```
 */
export class PricesModule {
  constructor(private client: BaseClient) {}

  /**
   * Get current prices of tokens by contract address.
   *
   * @param coins - Array of coin identifiers in format "chain:address" (e.g., "ethereum:0x...")
   * @param searchWidth - Time range to search for price data (e.g., "4h", "24h")
   * @returns Current price data for each coin
   *
   * @example
   * ```typescript
   * const usdc = 'ethereum:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
   * const prices = await client.prices.getCurrentPrices([
   *   usdc,
   *   'coingecko:ethereum'
   * ]);
   * const usdcPrice = prices.coins[usdc]?.price;
   * if (usdcPrice !== undefined) {
   *   console.log(`USDC price: $${usdcPrice}`);
   * }
   * ```
   */
  async getCurrentPrices(
    coins: string[],
    searchWidth?: string
  ): Promise<CoinPricesResponse> {
    const coinsParam = coins.join(",");
    return this.client.get<CoinPricesResponse>(
      `/prices/current/${coinsParam}`,
      {
        base: "coins",
        params: searchWidth ? { searchWidth } : undefined,
      }
    );
  }

  /**
   * Get historical prices of tokens at a specific timestamp.
   *
   * @param timestamp - Unix timestamp for the historical price
   * @param coins - Array of coin identifiers in format "chain:address"
   * @param searchWidth - Time range to search for price data (e.g., "4h")
   * @returns Historical price data for each coin
   *
   * @example
   * ```typescript
   * const dayAgo = Math.floor(Date.now() / 1000) - 86400;
   * const prices = await client.prices.getHistoricalPrices(dayAgo, [
   *   'ethereum:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
   * ]);
   * ```
   */
  async getHistoricalPrices(
    timestamp: number,
    coins: string[],
    searchWidth?: string
  ): Promise<CoinPricesResponse> {
    const coinsParam = coins.join(",");
    return this.client.get<CoinPricesResponse>(
      `/prices/historical/${timestamp}/${coinsParam}`,
      {
        base: "coins",
        params: searchWidth ? { searchWidth } : undefined,
      }
    );
  }

  /**
   * Get historical prices for multiple tokens at multiple timestamps in a single request.
   *
   * @param coins - Object mapping coin identifiers to arrays of timestamps
   * @param searchWidth - Time range to search for price data
   * @returns Historical prices for each coin at each requested timestamp
   *
   * @example
   * ```typescript
   * const now = Math.floor(Date.now() / 1000);
   * const prices = await client.prices.getBatchHistoricalPrices({
   *   'ethereum:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': [now - 86400, now - 172800],
   *   'coingecko:ethereum': [now - 86400]
   * });
   * ```
   */
  async getBatchHistoricalPrices(
    coins: Record<string, number[]>,
    searchWidth?: string
  ): Promise<BatchHistoricalResponse> {
    const coinsParam = JSON.stringify(coins);
    return this.client.get<BatchHistoricalResponse>("/batchHistorical", {
      base: "coins",
      params: {
        coins: coinsParam,
        searchWidth,
      },
    });
  }

  /**
   * Get token prices at regular time intervals for charting.
   *
   * @param coins - Array of coin identifiers in format "chain:address"
   * @param options - Chart configuration options
   * @returns Price chart data for each coin
   *
   * @example
   * ```typescript
   * const chart = await client.prices.getChart(
   *   ['coingecko:ethereum'],
   *   { period: '1d', span: 30 }
   * );
   * chart.coins['coingecko:ethereum'].prices.forEach(p => {
   *   console.log(new Date(p.timestamp * 1000), p.price);
   * });
   * ```
   */
  async getChart(
    coins: string[],
    options?: ChartOptions
  ): Promise<ChartResponse> {
    const coinsParam = coins.join(",");
    return this.client.get<ChartResponse>(`/chart/${coinsParam}`, {
      base: "coins",
      params: options
        ? {
            start: options.start,
            end: options.end,
            span: options.span,
            period: options.period,
            searchWidth: options.searchWidth,
          }
        : undefined,
    });
  }

  /**
   * Get percentage price change over a time period.
   *
   * @param coins - Array of coin identifiers in format "chain:address"
   * @param options - Options for percentage calculation
   * @returns Percentage change for each coin
   *
   * @example
   * ```typescript
   * const changes = await client.prices.getPercentageChange(
   *   ['coingecko:ethereum', 'coingecko:bitcoin'],
   *   { period: '7d' }
   * );
   * console.log(`ETH 7d change: ${changes.coins['coingecko:ethereum']}%`);
   * ```
   */
  async getPercentageChange(
    coins: string[],
    options?: PercentageOptions
  ): Promise<PercentageResponse> {
    const coinsParam = coins.join(",");
    return this.client.get<PercentageResponse>(`/percentage/${coinsParam}`, {
      base: "coins",
      params: options
        ? {
            timestamp: options.timestamp,
            lookForward: options.lookForward,
            period: options.period,
          }
        : undefined,
    });
  }

  /**
   * Get the earliest recorded price for tokens.
   *
   * @param coins - Array of coin identifiers in format "chain:address"
   * @returns First recorded price data for each coin
   *
   * @example
   * ```typescript
   * const usdc = 'ethereum:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
   * const first = await client.prices.getFirstPrices([
   *   usdc
   * ]);
   * const usdcData = first.coins[usdc];
   * if (usdcData) {
   *   console.log(`USDC first price: $${usdcData.price} on ${new Date(usdcData.timestamp * 1000)}`);
   * }
   * ```
   */
  async getFirstPrices(coins: string[]): Promise<FirstPriceResponse> {
    const coinsParam = coins.join(",");
    return this.client.get<FirstPriceResponse>(`/prices/first/${coinsParam}`, {
      base: "coins",
    });
  }

  /**
   * Get the closest block to a given timestamp for a chain.
   *
   * @param chain - Chain name (e.g., "ethereum", "bsc", "polygon")
   * @param timestamp - Unix timestamp to find the closest block for
   * @returns Block height and actual timestamp
   *
   * @example
   * ```typescript
   * const hourAgo = Math.floor(Date.now() / 1000) - 3600;
   * const block = await client.prices.getBlockAtTimestamp('ethereum', hourAgo);
   * console.log(`Block ${block.height} at ${new Date(block.timestamp * 1000)}`);
   * ```
   */
  async getBlockAtTimestamp(
    chain: string,
    timestamp: number
  ): Promise<BlockInfo> {
    return this.client.get<BlockInfo>(
      `/block/${encodeURIComponent(chain)}/${timestamp}`,
      { base: "coins" }
    );
  }
}
