export enum AdapterType {
  DEXS = "dexs",
  FEES = "fees",
  AGGREGATORS = "aggregators",
  DERIVATIVES = "derivatives",
  AGGREGATOR_DERIVATIVES = "aggregator-derivatives",
  OPTIONS = "options",
  BRIDGE_AGGREGATORS = "bridge-aggregators",
  OPEN_INTEREST = "open-interest",
}

export enum FeeDataType {
  DAILY_FEES = "dailyFees",
  DAILY_REVENUE = "dailyRevenue",
  DAILY_HOLDERS_REVENUE = "dailyHoldersRevenue",
  DAILY_SUPPLY_SIDE_REVENUE = "dailySupplySideRevenue",
  DAILY_BRIBES_REVENUE = "dailyBribesRevenue",
  DAILY_TOKEN_TAXES = "dailyTokenTaxes",
  DAILY_APP_FEES = "dailyAppFees",
  DAILY_APP_REVENUE = "dailyAppRevenue",
}

export enum VolumeDataType {
  DAILY_VOLUME = "dailyVolume",
  TOTAL_VOLUME = "totalVolume",
  DAILY_NOTIONAL_VOLUME = "dailyNotionalVolume",
  DAILY_PREMIUM_VOLUME = "dailyPremiumVolume",
  DAILY_BRIDGE_VOLUME = "dailyBridgeVolume",
  OPEN_INTEREST_AT_END = "openInterestAtEnd",
}

export const DataTypeShortKeys = {
  dailyFees: "df",
  dailyRevenue: "dr",
  dailyHoldersRevenue: "dhr",
  dailySupplySideRevenue: "dssr",
  dailyBribesRevenue: "dbr",
  dailyTokenTaxes: "dtt",
  dailyAppRevenue: "dar",
  dailyAppFees: "daf",
  dailyNotionalVolume: "dnv",
  dailyPremiumVolume: "dpv",
  openInterestAtEnd: "doi",
  dailyVolume: "dv",
  dailyBridgeVolume: "dbv",
} as const;

export type DataTypeShortKey = keyof typeof DataTypeShortKeys;
