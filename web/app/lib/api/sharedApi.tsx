export const getStocksURL = (page: number, minMarketCap: number) =>
	`https://tendenz-server.fly.dev/${page}?minMarketCap=${minMarketCap}`
