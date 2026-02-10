# DefiLlama SDK

Official TypeScript/JavaScript SDK for the [DefiLlama API](https://api-docs.defillama.com/). Access DeFi protocol data including TVL, prices, yields, volumes, fees, bridges, and more.

## Installation

```bash
npm install @defillama/api
```

```bash
yarn add @defillama/api
```

```bash
pnpm add @defillama/api
```

## Quick Start

```typescript
import { DefiLlama } from "@defillama/api";

// Free tier
const client = new DefiLlama();

// Pro tier (required for premium endpoints)
const proClient = new DefiLlama({
  apiKey: "your-api-key",
});

// Get all protocols
const protocols = await client.tvl.getProtocols();

// Get current token prices
const prices = await client.prices.getCurrentPrices([
  "ethereum:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  "coingecko:bitcoin",
]);
```

## Configuration

```typescript
interface DefiLlamaConfig {
  apiKey?: string; // API key from https://defillama.com/subscription (requires API plan)
  timeout?: number; // Request timeout in ms (default: 30000)
}
```

## Modules

- [TVL](#tvl) - Total Value Locked data
- [Prices](#prices) - Token price data
- [Stablecoins](#stablecoins) - Stablecoin market data
- [Yields](#yields) - Yield farming & lending rates 🔐
- [Volumes](#volumes) - DEX & derivatives volume
- [Fees](#fees) - Protocol fees & revenue
- [Emissions](#emissions) - Token unlock schedules 🔐
- [Bridges](#bridges) - Cross-chain bridge data 🔐
- [Ecosystem](#ecosystem) - Categories, oracles, treasuries 🔐
- [ETFs](#etfs) - Bitcoin & Ethereum ETF data 🔐
- [DAT](#dat) - Digital Asset Treasury data 🔐
- [Account](#account) - API usage management 🔐

🔐 = Requires Pro API key

---

## TVL

Total Value Locked data for protocols and chains.

### getProtocols

Get all protocols with current TVL.

```typescript
const protocols = await client.tvl.getProtocols();
// Returns: Protocol[]
```

### getProtocol

Get detailed protocol information including historical TVL.

```typescript
const aave = await client.tvl.getProtocol("aave");
// Returns: ProtocolDetails
```

### getTvl

Get only current TVL for a protocol.

```typescript
const tvl = await client.tvl.getTvl("uniswap");
// Returns: number
```

### getChains

Get current TVL for all chains.

```typescript
const chains = await client.tvl.getChains();
// Returns: Chain[]
```

### getHistoricalChainTvl

Get historical TVL data.

```typescript
// All chains combined
const allHistory = await client.tvl.getHistoricalChainTvl();

// Specific chain
const ethHistory = await client.tvl.getHistoricalChainTvl("Ethereum");
```

### getTokenProtocols 🔐

Get protocols holding a specific token.

```typescript
const holders = await proClient.tvl.getTokenProtocols("ETH");
// Returns: TokenProtocolHolding[]
```

### getInflows 🔐

Get token inflows/outflows between timestamps.

```typescript
const inflows = await proClient.tvl.getInflows(
  "lido",
  1704067200, // start timestamp
  1704153600, // end timestamp
  "ETH,USDC" // optional tokens to exclude
);
```

### getChainAssets 🔐

Get asset breakdown for all chains.

```typescript
const assets = await proClient.tvl.getChainAssets();
// Returns: ChainAssetsResponse
```

---

## Prices

Token price data and historical charts.

### getCurrentPrices

Get current prices for multiple tokens.

```typescript
const prices = await client.prices.getCurrentPrices([
  "ethereum:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
  "coingecko:bitcoin",
  "solana:So11111111111111111111111111111111111111112", // SOL
]);
// Returns: CoinPricesResponse
```

### getHistoricalPrices

Get prices at a specific timestamp.

```typescript
const prices = await client.prices.getHistoricalPrices(1704067200, [
  "ethereum:0xdac17f958d2ee523a2206206994597c13d831ec7",
]);
```

### getBatchHistoricalPrices

Get multiple historical price points in one request.

```typescript
const prices = await client.prices.getBatchHistoricalPrices({
  "ethereum:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": [
    1704067200, 1704153600, 1704240000,
  ],
});
```

### getChart

Get price chart data at regular intervals.

```typescript
const chart = await client.prices.getChart(["coingecko:ethereum"], {
  start: 1704067200,
  period: "1d",
  span: 30,
});
```

**Options:**
| Parameter | Type | Description |
|-----------|------|-------------|
| start | number | Unix timestamp of earliest data point |
| end | number | Unix timestamp of latest data point |
| span | number | Number of data points to return |
| period | string | Duration between points (e.g., "4h", "1d", "1W") |
| searchWidth | string | Time range to search |

### getPercentageChange

Get percentage price change over a period.

```typescript
const change = await client.prices.getPercentageChange(["coingecko:bitcoin"], {
  period: "24h",
});
```

### getFirstPrices

Get the earliest recorded price for tokens.

```typescript
const first = await client.prices.getFirstPrices([
  "ethereum:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
]);
```

### getBlockAtTimestamp

Get the closest block to a given timestamp.

```typescript
const block = await client.prices.getBlockAtTimestamp("ethereum", 1704067200);
// Returns: { height: number; timestamp: number }
```

---

## Stablecoins

Stablecoin market cap and dominance data.

### getStablecoins

Get all stablecoins with market cap.

```typescript
const stables = await client.stablecoins.getStablecoins(true); // include prices
// Returns: StablecoinsResponse
```

### getAllCharts

Get historical market cap for all stablecoins combined.

```typescript
const charts = await client.stablecoins.getAllCharts();
// Returns: StablecoinChartDataPoint[]
```

### getChartsByChain

Get historical market cap for stablecoins on a specific chain.

```typescript
const ethCharts = await client.stablecoins.getChartsByChain("Ethereum");
```

### getStablecoin

Get detailed stablecoin information.

```typescript
const usdt = await client.stablecoins.getStablecoin("1"); // USDT
const usdc = await client.stablecoins.getStablecoin("2"); // USDC
```

### getChains

Get current stablecoin market cap for all chains.

```typescript
const chains = await client.stablecoins.getChains();
// Returns: StablecoinChainMcap[]
```

### getPrices

Get historical prices for all stablecoins.

```typescript
const prices = await client.stablecoins.getPrices();
```

### getDominance 🔐

Get stablecoin dominance data for a chain.

```typescript
const dominance = await proClient.stablecoins.getDominance("ethereum", 1);
```

---

## Yields 🔐

Yield farming, lending, staking, and perpetual funding rates. **All endpoints require Pro API key.**

### getPools

Get all yield pools with current APY.

```typescript
const pools = await proClient.yields.getPools();
// Returns: { status: string; data: YieldPool[] }
```

### getPoolsOld

Get legacy yield pools format with additional fields.

```typescript
const pools = await proClient.yields.getPoolsOld();
```

### getPoolChart

Get historical APY and TVL for a specific pool.

```typescript
const chart = await proClient.yields.getPoolChart("pool-uuid-here");
```

### getBorrowPools

Get lending/borrowing pools with supply and borrow rates.

```typescript
const borrowPools = await proClient.yields.getBorrowPools();
```

### getLendBorrowChart

Get historical lending and borrowing rates.

```typescript
const chart = await proClient.yields.getLendBorrowChart("pool-uuid-here");
```

### getPerps

Get perpetual futures funding rates.

```typescript
const perps = await proClient.yields.getPerps();
// Returns: { status: string; data: PerpPool[] }
```

### getLsdRates

Get liquid staking derivative exchange rates.

```typescript
const lsdRates = await proClient.yields.getLsdRates();
// Returns: LsdRate[]
```

---

## Volumes

DEX, options, and derivatives trading volume data.

### getDexOverview

Get overview of all DEX volume data.

```typescript
const overview = await client.volumes.getDexOverview();

// With options
const overview = await client.volumes.getDexOverview({
  excludeTotalDataChart: true,
  dataType: "dailyVolume",
});
```

### getDexOverviewByChain

Get DEX volume for a specific chain.

```typescript
const ethVolume = await client.volumes.getDexOverviewByChain("Ethereum");
```

### getDexSummary

Get summary for a specific DEX protocol.

```typescript
const uniswap = await client.volumes.getDexSummary("uniswap");
```

### getOptionsOverview

Get overview of options volume data.

```typescript
const options = await client.volumes.getOptionsOverview();
```

### getOptionsOverviewByChain

Get options volume for a specific chain.

```typescript
const ethOptions = await client.volumes.getOptionsOverviewByChain("Ethereum");
```

### getOptionsSummary

Get summary for a specific options protocol.

```typescript
const derive = await client.volumes.getOptionsSummary("derive");
```

### getDerivativesOverview 🔐

Get overview of derivatives volume data.

```typescript
const derivatives = await proClient.volumes.getDerivativesOverview();
```

### getDerivativesSummary 🔐

Get summary for a specific derivatives protocol.

```typescript
const gmx = await proClient.volumes.getDerivativesSummary("gmx");
```

### getDexMetrics 🔐

Get summary of DEX metrics with protocol list (no charts).

```typescript
const metrics = await proClient.volumes.getDexMetrics();

// With data type
const metrics = await proClient.volumes.getDexMetrics({
  dataType: "dailyVolume",
});
```

### getDexMetricsByProtocol 🔐

Get DEX metrics for a specific protocol.

```typescript
const uniswap = await proClient.volumes.getDexMetricsByProtocol("uniswap");
```

### getDerivativesMetrics 🔐

Get summary of derivatives metrics with protocol list (no charts).

```typescript
const metrics = await proClient.volumes.getDerivativesMetrics();
```

### getDerivativesMetricsByProtocol 🔐

Get derivatives metrics for a specific protocol.

```typescript
const hyperliquid = await proClient.volumes.getDerivativesMetricsByProtocol(
  "hyperliquid"
);
```

### getOptionsMetrics 🔐

Get summary of options metrics with protocol list (no charts).

```typescript
const metrics = await proClient.volumes.getOptionsMetrics();
```

### getOptionsMetricsByProtocol 🔐

Get options metrics for a specific protocol.

```typescript
const hegic = await proClient.volumes.getOptionsMetricsByProtocol("hegic");
```

---

## Fees

Protocol fees and revenue data.

### Fee Data Types

```typescript
import { FeeDataType } from "@defillama/api";

FeeDataType.DAILY_FEES; // "dailyFees"
FeeDataType.DAILY_REVENUE; // "dailyRevenue"
FeeDataType.DAILY_HOLDERS_REVENUE; // "dailyHoldersRevenue"
FeeDataType.DAILY_SUPPLY_SIDE_REVENUE;
FeeDataType.DAILY_BRIBES_REVENUE;
FeeDataType.DAILY_TOKEN_TAXES;
FeeDataType.DAILY_APP_FEES;
FeeDataType.DAILY_APP_REVENUE;
```

### getOverview

Get fees overview across all protocols.

```typescript
const fees = await client.fees.getOverview();

// With data type
const revenue = await client.fees.getOverview({
  dataType: FeeDataType.DAILY_REVENUE,
});
```

### getOverviewByChain

Get fees overview for a specific chain.

```typescript
const ethFees = await client.fees.getOverviewByChain("Ethereum");
```

### getSummary

Get fees summary for a specific protocol.

```typescript
const uniswapFees = await client.fees.getSummary("uniswap");
```

### getChart 🔐

Get historical fees chart.

```typescript
const chart = await proClient.fees.getChart();

// For specific chain
const ethChart = await proClient.fees.getChartByChain("Ethereum");

// For specific protocol
const protocolChart = await proClient.fees.getChartByProtocol("aave");
```

### getChartByProtocolChainBreakdown 🔐

Get fees breakdown by chain within a protocol.

```typescript
const breakdown = await proClient.fees.getChartByProtocolChainBreakdown("aave");
```

### getChartByProtocolVersionBreakdown 🔐

Get fees breakdown by version within a protocol.

```typescript
const breakdown = await proClient.fees.getChartByProtocolVersionBreakdown(
  "uniswap"
);
```

### getChartByChainProtocolBreakdown 🔐

Get fees breakdown by protocol within a chain.

```typescript
const breakdown = await proClient.fees.getChartByChainProtocolBreakdown(
  "Ethereum"
);
```

### getChartChainBreakdown 🔐

Get fees breakdown by chain across all protocols.

```typescript
const breakdown = await proClient.fees.getChartChainBreakdown();
```

### getMetrics 🔐

Get fees metrics.

```typescript
const metrics = await proClient.fees.getMetrics();
const chainMetrics = await proClient.fees.getMetricsByChain("Ethereum");
const protocolMetrics = await proClient.fees.getMetricsByProtocol("aave");
```

---

## Emissions 🔐

Token unlock schedules and vesting data. **All endpoints require Pro API key.**

### getAll

Get all tokens with unlock schedules.

```typescript
const emissions = await proClient.emissions.getAll();
// Returns: EmissionToken[]
```

Each token includes:

- Emission events and schedules
- Circulating supply metrics
- Next unlock event
- Daily unlock rate
- Market cap data

### getByProtocol

Get detailed vesting schedule for a specific protocol.

```typescript
const arbitrum = await proClient.emissions.getByProtocol("arbitrum");
// Returns: EmissionDetailResponse
```

Response includes:

- `documentedData` - Emission timeline with category breakdown
- `metadata` - Sources, events, notes
- `supplyMetrics` - Max supply, adjusted supply
- `categories` - Allocation categories and sections
- `unlockUsdChart` - Historical unlock values in USD

---

## Bridges 🔐

Cross-chain bridge volume and transaction data. **All endpoints require Pro API key.**

### getAll

Get all bridges with volume data.

```typescript
const bridges = await proClient.bridges.getAll();

// Include chain breakdown
const bridges = await proClient.bridges.getAll({ includeChains: true });
```

### getById

Get detailed bridge information.

```typescript
const bridge = await proClient.bridges.getById(1);
// Returns: BridgeDetail with volume breakdown, tx counts, chain breakdown
```

### getVolumeByChain

Get bridge volume for a specific chain.

```typescript
const volume = await proClient.bridges.getVolumeByChain("Ethereum");
// Returns: BridgeVolumeDataPoint[]
```

### getDayStats

Get day statistics for bridges on a specific chain.

```typescript
const stats = await proClient.bridges.getDayStats(1704067200, "Ethereum");
// Returns token and address statistics
```

### getTransactions

Get bridge transactions.

```typescript
const txs = await proClient.bridges.getTransactions(1, {
  limit: 100,
  startTimestamp: 1704067200,
  endTimestamp: 1704153600,
  sourceChain: "Ethereum",
  address: "0x...",
});
```

---

## Ecosystem 🔐

Ecosystem-level data. **All endpoints require Pro API key.**

### getCategories

Get TVL grouped by protocol category.

```typescript
const categories = await proClient.ecosystem.getCategories();
// Returns historical chart, category mappings, market share percentages
```

### getForks

Get protocol fork relationships and TVL.

```typescript
const forks = await proClient.ecosystem.getForks();
// Returns forks list with parent protocol mappings
```

### getOracles

Get oracle usage data across protocols.

```typescript
const oracles = await proClient.ecosystem.getOracles();
// Returns oracle TVL, protocol counts, dominance metrics
```

### getEntities

Get company/VC/fund treasury and holdings data.

```typescript
const entities = await proClient.ecosystem.getEntities();
// Returns: Entity[]
```

### getTreasuries

Get protocol treasury balances.

```typescript
const treasuries = await proClient.ecosystem.getTreasuries();
// Returns: Treasury[]
```

### getHacks

Get security incidents and exploits database.

```typescript
const hacks = await proClient.ecosystem.getHacks();
// Returns: Hack[] with date, amount, technique, classification
```

### getRaises

Get funding rounds database.

```typescript
const raises = await proClient.ecosystem.getRaises();
// Returns: { raises: Raise[] }
```

---

## ETFs 🔐

Bitcoin and Ethereum ETF data. **All endpoints require Pro API key.**

### getOverview

Get Bitcoin ETF overview.

```typescript
const btcEtfs = await proClient.etfs.getOverview();
// Returns: EtfOverviewItem[]
```

### getOverviewEth

Get Ethereum ETF overview.

```typescript
const ethEtfs = await proClient.etfs.getOverviewEth();
```

### getHistory

Get Bitcoin ETF flow history.

```typescript
const history = await proClient.etfs.getHistory();
// Returns: EtfHistoryItem[]
```

### getHistoryEth

Get Ethereum ETF flow history.

```typescript
const history = await proClient.etfs.getHistoryEth();
```

### getFdvPerformance

Get FDV performance data.

```typescript
const perf = await proClient.etfs.getFdvPerformance("30");
// period: "7" | "30" | "ytd" | "365"
```

---

## DAT 🔐

Digital Asset Treasury data and institutional holdings. **All endpoints require Pro API key.**

### getInstitutions

Get comprehensive DAT data for all institutions.

```typescript
const data = await proClient.dat.getInstitutions();
// Returns metadata, holdings by asset, mNAV data
```

### getInstitution

Get detailed DAT data for a specific institution.

```typescript
const mstr = await proClient.dat.getInstitution("MSTR");
// Returns holdings, flows, mNAV, stats, OHLCV, transactions
```

---

## Account 🔐

API account management. **Requires Pro API key.**

### getUsage

Get API usage statistics.

```typescript
const usage = await proClient.account.getUsage();
// Returns: { creditsLeft: number }
```

---

## Error Handling

The SDK provides custom error classes for different scenarios:

```typescript
import {
  DefiLlamaError,
  ApiKeyRequiredError,
  RateLimitError,
  NotFoundError,
  ApiError,
} from "@defillama/api";

try {
  const data = await client.yields.getPools();
} catch (error) {
  if (error instanceof ApiKeyRequiredError) {
    console.log("Pro API key required for this endpoint");
  } else if (error instanceof RateLimitError) {
    console.log(`Rate limited. Retry after ${error.retryAfter} seconds`);
  } else if (error instanceof NotFoundError) {
    console.log("Resource not found");
  } else if (error instanceof ApiError) {
    console.log(`API error: ${error.statusCode} - ${error.message}`);
  }
}
```

---

## Type Exports

All types are exported from the main package:

```typescript
import type {
  // TVL
  Protocol,
  ProtocolDetails,
  Chain,
  TokenProtocolHolding,

  // Prices
  CoinPrice,
  CoinPricesResponse,
  ChartOptions,

  // Stablecoins
  Stablecoin,
  StablecoinDetails,

  // Yields
  YieldPool,
  BorrowPool,
  PerpPool,
  LsdRate,

  // Volumes
  DexOverviewResponse,
  DexSummaryResponse,
  DexMetricsResponse,
  DexMetricsByProtocolResponse,
  DerivativesMetricsResponse,
  DerivativesMetricsByProtocolResponse,
  OptionsMetricsResponse,
  OptionsMetricsByProtocolResponse,

  // Fees
  FeesOverviewResponse,
  FeesSummaryResponse,

  // Emissions
  EmissionToken,
  EmissionDetailResponse,

  // Bridges
  BridgeSummary,
  BridgeDetail,
  BridgeTransaction,

  // Ecosystem
  Entity,
  Treasury,
  Hack,
  Raise,

  // ETFs
  EtfOverviewItem,
  EtfHistoryItem,

  // DAT
  DatInstitutionsResponse,
  DatInstitutionResponse,

  // Config
  DefiLlamaConfig,
} from "@defillama/api";
```

---

## Constants

```typescript
import { AdapterType, FeeDataType, VolumeDataType } from "@defillama/api";

// Adapter Types
AdapterType.DEXS; // "dexs"
AdapterType.FEES; // "fees"
AdapterType.AGGREGATORS; // "aggregators"
AdapterType.DERIVATIVES; // "derivatives"
AdapterType.AGGREGATOR_DERIVATIVES; // "aggregator-derivatives"
AdapterType.OPTIONS; // "options"
AdapterType.BRIDGE_AGGREGATORS; // "bridge-aggregators"
AdapterType.OPEN_INTEREST; // "open-interest"

// Volume Data Types
VolumeDataType.DAILY_VOLUME; // "dailyVolume"
VolumeDataType.TOTAL_VOLUME; // "totalVolume"
VolumeDataType.DAILY_NOTIONAL_VOLUME;
VolumeDataType.DAILY_PREMIUM_VOLUME;
VolumeDataType.DAILY_BRIDGE_VOLUME;
VolumeDataType.OPEN_INTEREST_AT_END;
```

---

## Requirements

- Node.js >= 18.0.0
- TypeScript 5.x (for TypeScript users)

## License

MIT
