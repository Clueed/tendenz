export const getStocksURL = (page: number, minMarketCap: number) =>
	`https://tendenz-server.fly.dev/us-stocks/daily/${page}?minMarketCap=${minMarketCap}`
