export const MARKET_CAP_BUCKETS = [
  { label: "10m", minMarketCap: 10000000 },
  { label: "100m", minMarketCap: 100000000 },
  { label: "1b", minMarketCap: 1000000000 },
  { label: "50b", minMarketCap: 50000000000 },
] as const;
