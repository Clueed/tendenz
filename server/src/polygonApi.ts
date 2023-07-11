import axios, { AxiosInstance } from "axios";
function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export class PolygonApi {
  axiosInstance: AxiosInstance;
  lastRequest: number | false = false;
  requestPerMinute: number;
  requestPerMillisecond: number;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "https://api.polygon.io/",
      timeout: 10000,
    });

    this.requestPerMinute = 5;
    this.requestPerMillisecond = (60 * 1000) / this.requestPerMinute;
  }

  async get(url: string): Promise<any> {
    if (this.lastRequest === false) {
      this.lastRequest = Date.now();
      return this.axiosInstance.get(url);
    }

    const sinceLastRequest = Date.now() - this.lastRequest;
    const tillNextRequest = this.requestPerMillisecond - sinceLastRequest;

    if (tillNextRequest > 0) {
      console.debug("[RL] Waiting for", tillNextRequest, "ms");
      await timeout(tillNextRequest);
      return this.get(url);
    }

    this.lastRequest = Date.now();
    return this.axiosInstance.get(url);
  }
}

export async function getDailyMarket(polygon: PolygonApi, date: string) {
  console.debug(`Requesting daily market for ${date}`);
  return await polygon.get(
    `v2/aggs/grouped/locale/us/market/stocks/${date}?adjusted=true&include_otc=false&apiKey=${process.env.POLYGON_API_KEY}`
  );
}

export async function getTickerDetails(
  polygon: PolygonApi,
  ticker: string,
  date: string
) {
  console.debug(`Requesting daily market for ${date}`);
  return await polygon.get(
    `v3/reference/tickers/${ticker}?date=${date}${process.env.POLYGON_API_KEY}`
  );
}
