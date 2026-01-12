import { BaseClient, type DefiLlamaConfig } from "./client.js";
import { TvlModule } from "./modules/tvl.js";
import { PricesModule } from "./modules/prices.js";
import { StablecoinsModule } from "./modules/stablecoins.js";
import { YieldsModule } from "./modules/yields.js";
import { VolumesModule } from "./modules/volumes.js";
import { FeesModule } from "./modules/fees.js";
import { EmissionsModule } from "./modules/emissions.js";
import { BridgesModule } from "./modules/bridges.js";
import { EcosystemModule } from "./modules/ecosystem.js";
import { EtfsModule } from "./modules/etfs.js";
import { DatModule } from "./modules/dat.js";
import { AccountModule } from "./modules/account.js";

/**
 * DefiLlama API client for accessing DeFi data.
 * Supports both free and Pro API tiers.
 *
 * @example Free tier usage
 * ```typescript
 * import { DefiLlama } from '@defillama/api';
 *
 * const client = new DefiLlama();
 * const protocols = await client.tvl.getProtocols();
 * const tvl = await client.tvl.getTvl('aave');
 * ```
 *
 * @example Pro tier usage
 * ```typescript
 * import { DefiLlama } from '@defillama/api';
 *
 * const client = new DefiLlama({ apiKey: 'your-api-key' });
 * const holders = await client.tvl.getTokenProtocols('ETH');
 * const assets = await client.tvl.getChainAssets();
 * ```
 */
export class DefiLlama {
  private client: BaseClient;

  /**
   * TVL (Total Value Locked) module for protocol and chain TVL data.
   */
  public readonly tvl: TvlModule;

  /**
   * Prices module for token price data.
   */
  public readonly prices: PricesModule;

  /**
   * Stablecoins module for stablecoin market cap and dominance data.
   */
  public readonly stablecoins: StablecoinsModule;

  /**
   * Yields module for yield farming, lending, and staking rates.
   */
  public readonly yields: YieldsModule;

  /**
   * Volumes module for DEX, options, and derivatives volume data.
   */
  public readonly volumes: VolumesModule;

  /**
   * Fees module for protocol fees and revenue data.
   */
  public readonly fees: FeesModule;

  /**
   * Emissions module for token unlock schedules and vesting data.
   */
  public readonly emissions: EmissionsModule;

  /**
   * Bridges module for cross-chain bridge volume and transaction data.
   */
  public readonly bridges: BridgesModule;

  /**
   * Ecosystem module for categories, forks, oracles, entities, treasuries, hacks, and raises.
   */
  public readonly ecosystem: EcosystemModule;

  /**
   * ETFs module for Bitcoin and Ethereum ETF data, flows, and FDV performance.
   */
  public readonly etfs: EtfsModule;

  /**
   * DAT module for Digital Asset Treasury data and institutional holdings.
   */
  public readonly dat: DatModule;

  /**
   * Account module for API usage and account management.
   */
  public readonly account: AccountModule;

  /**
   * Create a new DefiLlama client.
   *
   * @param config - Optional configuration options
   * @param config.apiKey - Pro API key for accessing premium endpoints
   * @param config.timeout - Request timeout in milliseconds (default: 30000)
   *
   * @example
   * ```typescript
   * // Free tier
   * const client = new DefiLlama();
   *
   * // Pro tier with custom timeout
   * const proClient = new DefiLlama({
   *   apiKey: 'your-api-key',
   *   timeout: 60000
   * });
   * ```
   */
  constructor(config: DefiLlamaConfig = {}) {
    this.client = new BaseClient(config);
    this.tvl = new TvlModule(this.client);
    this.prices = new PricesModule(this.client);
    this.stablecoins = new StablecoinsModule(this.client);
    this.yields = new YieldsModule(this.client);
    this.volumes = new VolumesModule(this.client);
    this.fees = new FeesModule(this.client);
    this.emissions = new EmissionsModule(this.client);
    this.bridges = new BridgesModule(this.client);
    this.ecosystem = new EcosystemModule(this.client);
    this.etfs = new EtfsModule(this.client);
    this.dat = new DatModule(this.client);
    this.account = new AccountModule(this.client);
  }

  /**
   * Check if the client has a Pro API key configured.
   *
   * @returns true if an API key is configured
   *
   * @example
   * ```typescript
   * if (client.isPro) {
   *   const assets = await client.tvl.getChainAssets();
   * }
   * ```
   */
  get isPro(): boolean {
    return this.client.hasApiKey;
  }
}

export { TvlModule } from "./modules/tvl.js";
export { PricesModule } from "./modules/prices.js";
export { StablecoinsModule } from "./modules/stablecoins.js";
export { YieldsModule } from "./modules/yields.js";
export { VolumesModule } from "./modules/volumes.js";
export { FeesModule } from "./modules/fees.js";
export { EmissionsModule } from "./modules/emissions.js";
export { BridgesModule } from "./modules/bridges.js";
export { EcosystemModule } from "./modules/ecosystem.js";
export { EtfsModule } from "./modules/etfs.js";
export { DatModule } from "./modules/dat.js";
export { AccountModule } from "./modules/account.js";
export type { DefiLlamaConfig } from "./client.js";
export * from "./types/index.js";
export * from "./constants/index.js";
export * from "./errors.js";
