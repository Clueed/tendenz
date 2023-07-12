import axios, { AxiosInstance, AxiosResponse } from "axios";
import { timeout } from "../misc.js";

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

  async get(inputUrl: string): Promise<AxiosResponse<any, any>> {
    const url = inputUrl + `&apiKey=${process.env.POLYGON_API_KEY}`;

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
