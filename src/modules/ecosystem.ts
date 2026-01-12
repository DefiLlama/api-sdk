import type { BaseClient } from "../client.js";
import type {
  CategoriesResponse,
  ForksResponse,
  OraclesResponse,
  Entity,
  Treasury,
  Hack,
  RaisesResponse,
} from "../types/ecosystem.js";

/**
 * Module for accessing ecosystem-level data from DefiLlama.
 * Provides methods for fetching categories, forks, oracles, entities,
 * treasuries, hacks, raises, and historical liquidity.
 * All endpoints require a Pro API key.
 *
 * @example
 * ```typescript
 * const client = new DefiLlama({ apiKey: 'your-api-key' });
 * const categories = await client.ecosystem.getCategories();
 * const hacks = await client.ecosystem.getHacks();
 * ```
 */
export class EcosystemModule {
  constructor(private client: BaseClient) {}

  /**
   * Get TVL data grouped by protocol category.
   * Requires a Pro API key.
   *
   * @returns Historical TVL by category with protocol mappings and market share percentages
   *
   * @example
   * ```typescript
   * const data = await client.ecosystem.getCategories();
   * console.log('Categories:', Object.keys(data.categories));
   * console.log('Lending protocols:', data.categories['Lending']);
   * const dexShare = data.categoryPercentages?.Dexes;
   * if (dexShare !== undefined) {
   *   console.log('DEX market share:', dexShare);
   * }
   * ```
   */
  async getCategories(): Promise<CategoriesResponse> {
    return this.client.get<CategoriesResponse>("/categories", {
      requiresAuth: true,
    });
  }

  /**
   * Get protocol fork relationships and TVL data.
   * Requires a Pro API key.
   *
   * @returns Fork relationships with historical TVL and parent protocol mappings
   *
   * @example
   * ```typescript
   * const data = await client.ecosystem.getForks();
   * console.log('Uniswap V3 forks:', data.forks['Uniswap V3']);
   * const parent = data.parentProtocols?.['pancakeswap-v3'];
   * if (parent) {
   *   console.log('Parent of pancakeswap-v3:', parent);
   * }
   * ```
   */
  async getForks(): Promise<ForksResponse> {
    return this.client.get<ForksResponse>("/forks", {
      requiresAuth: true,
    });
  }

  /**
   * Get oracle usage data across protocols.
   * Requires a Pro API key.
   *
   * @returns Oracle data with TVL secured, protocol counts, and market dominance
   *
   * @example
   * ```typescript
   * const data = await client.ecosystem.getOracles();
   * console.log('Total value secured:', data.totalValueSecured ?? 0);
   * const chainlinkDominance = data.dominance?.Chainlink;
   * if (chainlinkDominance !== undefined) {
   *   console.log('Chainlink dominance:', chainlinkDominance);
   * }
   * console.log('Chains using Chainlink:', data.oracles['Chainlink']);
   * ```
   */
  async getOracles(): Promise<OraclesResponse> {
    return this.client.get<OraclesResponse>("/oracles", {
      requiresAuth: true,
    });
  }

  /**
   * Get entity (company, VC, fund) treasury and holdings data.
   * Requires a Pro API key.
   *
   * @returns Array of entities with TVL, chain breakdowns, and token holdings
   *
   * @example
   * ```typescript
   * const entities = await client.ecosystem.getEntities();
   * entities.forEach(entity => {
   *   console.log(`${entity.name}: $${entity.tvl.toLocaleString()}`);
   * });
   * ```
   */
  async getEntities(): Promise<Entity[]> {
    return this.client.get<Entity[]>("/entities", {
      requiresAuth: true,
    });
  }

  /**
   * Get protocol treasury balances.
   * Requires a Pro API key.
   *
   * @returns Array of treasuries with TVL, asset breakdowns, and token holdings
   *
   * @example
   * ```typescript
   * const treasuries = await client.ecosystem.getTreasuries();
   * treasuries.forEach(treasury => {
   *   console.log(`${treasury.name}: $${treasury.tvl.toLocaleString()}`);
   * });
   * ```
   */
  async getTreasuries(): Promise<Treasury[]> {
    return this.client.get<Treasury[]>("/treasuries", {
      requiresAuth: true,
    });
  }

  /**
   * Get historical security incidents and exploits database.
   * Requires a Pro API key.
   *
   * @returns Array of hack records with dates, amounts, techniques, and affected chains
   *
   * @example
   * ```typescript
   * const hacks = await client.ecosystem.getHacks();
   * const totalLost = hacks.reduce((sum, h) => sum + (h.amount ?? 0), 0);
   * console.log(`Total lost to hacks: $${totalLost.toLocaleString()}`);
   *
   * const exploits = hacks.filter(h => h.classification === 'Exploit');
   * console.log(`${exploits.length} exploits recorded`);
   * ```
   */
  async getHacks(): Promise<Hack[]> {
    return this.client.get<Hack[]>("/hacks", {
      requiresAuth: true,
    });
  }

  /**
   * Get funding rounds database for crypto projects.
   * Requires a Pro API key.
   *
   * @returns Object containing array of funding round records
   *
   * @example
   * ```typescript
   * const { raises } = await client.ecosystem.getRaises();
   * const totalRaised = raises.reduce((sum, r) => sum + r.amount, 0);
   * console.log(`Total raised: $${totalRaised.toLocaleString()}M`);
   *
   * const seedRounds = raises.filter(r => r.round === 'Seed');
   * console.log(`${seedRounds.length} seed rounds`);
   * ```
   */
  async getRaises(): Promise<RaisesResponse> {
    return this.client.get<RaisesResponse>("/raises", {
      requiresAuth: true,
    });
  }

}
