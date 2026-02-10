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
  DAILY_USER_FEES = "dailyUserFees",
  DAILY_HOLDERS_REVENUE = "dailyHoldersRevenue",
  DAILY_CREATOR_REVENUE = "dailyCreatorRevenue",
  DAILY_SUPPLY_SIDE_REVENUE = "dailySupplySideRevenue",
  DAILY_PROTOCOL_REVENUE = "dailyProtocolRevenue",
  DAILY_BRIBES_REVENUE = "dailyBribesRevenue",
  DAILY_TOKEN_TAXES = "dailyTokenTaxes",
  DAILY_APP_FEES = "dailyAppFees",
  DAILY_APP_REVENUE = "dailyAppRevenue",
}

export enum VolumeDataType {
  DAILY_VOLUME = "dailyVolume",
  DAILY_NOTIONAL_VOLUME = "dailyNotionalVolume",
  DAILY_PREMIUM_VOLUME = "dailyPremiumVolume",
  DAILY_BRIDGE_VOLUME = "dailyBridgeVolume",
  OPEN_INTEREST_AT_END = "openInterestAtEnd",
  SHORT_OPEN_INTEREST_AT_END = "shortOpenInterestAtEnd",
  LONG_OPEN_INTEREST_AT_END = "longOpenInterestAtEnd",
}

export const DataTypeShortKeys = {
  dailyFees: "df",
  dailyRevenue: "dr",
  dailyUserFees: "duf",
  dailyHoldersRevenue: "dhr",
  dailyCreatorRevenue: "dcr",
  dailySupplySideRevenue: "dssr",
  dailyProtocolRevenue: "dpr",
  dailyBribesRevenue: "dbr",
  dailyTokenTaxes: "dtt",
  dailyAppRevenue: "dar",
  dailyAppFees: "daf",
  dailyNotionalVolume: "dnv",
  dailyPremiumVolume: "dpv",
  openInterestAtEnd: "doi",
  shortOpenInterestAtEnd: "dsoi",
  longOpenInterestAtEnd: "dloi",
  dailyVolume: "dv",
  dailyBridgeVolume: "dbv",
} as const;

export type DataTypeShortKey = keyof typeof DataTypeShortKeys;
