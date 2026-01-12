import type { BaseClient } from "../client.js";
import type {
  Protocol,
  ProtocolDetails,
  Chain,
  HistoricalChainTvl,
  HistoricalChainsTvl,
  TokenProtocolHolding,
  ProtocolInflowsResponse,
  ChainAssetsResponse,
} from "../types/tvl.js";

/**
 * Module for accessing TVL (Total Value Locked) data from DefiLlama.
 * Provides methods for fetching protocol TVL, chain TVL, and related metrics.
 *
 * @example
 * ```typescript
 * const client = new DefiLlama();
 * const protocols = await client.tvl.getProtocols();
 * const aaveTvl = await client.tvl.getTvl('aave');
 * ```
 */
export class TvlModule {
  constructor(private client: BaseClient) {}

  /**
   * Get a list of all protocols with their current TVL.
   *
   * @returns Array of all protocols with TVL data, chains, and metadata
   *
   * @example
   * ```typescript
   * const protocols = await client.tvl.getProtocols();
   * console.log(protocols[0].name, protocols[0].tvl);
   * ```
   */
  async getProtocols(): Promise<Protocol[]> {
    return this.client.get<Protocol[]>("/protocols");
  }

  /**
   * Get detailed information about a specific protocol including historical TVL.
   *
   * @param protocol - Protocol slug (e.g., 'aave', 'uniswap', 'lido')
   * @returns Detailed protocol data with historical TVL, token breakdowns, and chain data
   *
   * @example
   * ```typescript
   * const aave = await client.tvl.getProtocol('aave');
   * console.log(aave.name, aave.tvl.length, 'days of history');
   * ```
   */
  async getProtocol(protocol: string): Promise<ProtocolDetails> {
    return this.client.get<ProtocolDetails>(`/protocol/${encodeURIComponent(protocol)}`);
  }

  /**
   * Get only the current TVL of a protocol.
   *
   * @param protocol - Protocol slug (e.g., 'aave', 'uniswap', 'lido')
   * @returns Current TVL as a number in USD
   *
   * @example
   * ```typescript
   * const tvl = await client.tvl.getTvl('aave');
   * console.log(`Aave TVL: $${tvl.toLocaleString()}`);
   * ```
   */
  async getTvl(protocol: string): Promise<number> {
    return this.client.get<number>(`/tvl/${encodeURIComponent(protocol)}`);
  }

  /**
   * Get current TVL for all chains.
   *
   * @returns Array of chains with their current TVL and metadata
   *
   * @example
   * ```typescript
   * const chains = await client.tvl.getChains();
   * const ethereum = chains.find(c => c.name === 'Ethereum');
   * if (ethereum) {
   *   console.log(`Ethereum TVL: $${ethereum.tvl.toLocaleString()}`);
   * }
   * ```
   */
  async getChains(): Promise<Chain[]> {
    return this.client.get<Chain[]>("/v2/chains");
  }

  /**
   * Get historical TVL data for all chains combined or a specific chain.
   *
   * @param chain - Optional chain name. If omitted, returns combined TVL for all chains.
   * @returns Array of historical TVL data points with date and TVL
   *
   * @example
   * ```typescript
   * // Get total historical TVL across all chains
   * const allHistory = await client.tvl.getHistoricalChainTvl();
   *
   * // Get historical TVL for Ethereum only
   * const ethHistory = await client.tvl.getHistoricalChainTvl('ethereum');
   * console.log(ethHistory[0].date, ethHistory[0].tvl);
   * ```
   */
  async getHistoricalChainTvl(): Promise<HistoricalChainsTvl[]>;
  async getHistoricalChainTvl(chain: string): Promise<HistoricalChainTvl[]>;
  async getHistoricalChainTvl(
    chain?: string
  ): Promise<HistoricalChainsTvl[] | HistoricalChainTvl[]> {
    if (chain) {
      return this.client.get<HistoricalChainTvl[]>(
        `/v2/historicalChainTvl/${encodeURIComponent(chain)}`
      );
    }
    return this.client.get<HistoricalChainsTvl[]>("/v2/historicalChainTvl");
  }

  /**
   * Get all protocols that hold a specific token.
   * Requires a Pro API key.
   *
   * @param symbol - Token symbol (e.g., 'ETH', 'USDC', 'WBTC')
   * @returns Array of protocols holding the token with amounts
   *
   * @example
   * ```typescript
   * const holders = await client.tvl.getTokenProtocols('ETH');
   * console.log(`${holders.length} protocols hold ETH`);
   * console.log(holders[0].name, holders[0].amountUsd);
   * ```
   */
  async getTokenProtocols(symbol: string): Promise<TokenProtocolHolding[]> {
    return this.client.get<TokenProtocolHolding[]>(
      `/tokenProtocols/${encodeURIComponent(symbol)}`,
      { requiresAuth: true }
    );
  }

  /**
   * Get token inflows/outflows for a protocol between two timestamps.
   * Requires a Pro API key.
   *
   * @param protocol - Protocol slug (e.g., 'aave-v3', 'lido')
   * @param startTimestamp - Start time in unix seconds
   * @param endTimestamp - End time in unix seconds
   * @param tokensToExclude - Optional comma-separated token symbols to exclude
   * @returns Inflow/outflow data with token snapshots
   *
   * @example
   * ```typescript
   * const start = Math.floor(Date.now() / 1000) - 86400 * 7; // 7 days ago
   * const end = Math.floor(Date.now() / 1000);
   * const flows = await client.tvl.getInflows('aave-v3', start, end);
   * console.log(`Net outflows: $${flows.outflows.toLocaleString()}`);
   * ```
   */
  async getInflows(
    protocol: string,
    startTimestamp: number,
    endTimestamp: number,
    tokensToExclude?: string
  ): Promise<ProtocolInflowsResponse> {
    return this.client.get<ProtocolInflowsResponse>(
      `/inflows/${encodeURIComponent(protocol)}/${startTimestamp}`,
      {
        requiresAuth: true,
        params: {
          end: endTimestamp,
          tokensToExclude: tokensToExclude ?? "",
        },
      }
    );
  }

  /**
   * Get asset breakdown for all chains (canonical, native, own tokens).
   * Requires a Pro API key.
   *
   * @returns Object with chain names as keys and asset breakdowns as values
   *
   * @example
   * ```typescript
   * const assets = await client.tvl.getChainAssets();
   * const ethAssets = assets['Ethereum'];
   * if (ethAssets && typeof ethAssets === 'object') {
   *   console.log('Canonical:', ethAssets.canonical?.total);
   *   console.log('Native:', ethAssets.native?.total);
   * }
   * ```
   */
  async getChainAssets(): Promise<ChainAssetsResponse> {
    return this.client.get<ChainAssetsResponse>("/chainAssets", { requiresAuth: true });
  }
}
