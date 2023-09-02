const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://tendenz-server.fly.dev"

export const getStocksURL = (page: number, minMarketCap: number) => 
	BASE_URL + `/us-stocks/daily/${page}?minMarketCap=${minMarketCap}`
