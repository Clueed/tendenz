import { AxiosError, AxiosResponse } from "axios";
import { PolygonApi } from "./polygonApi.js";

export interface IAggsResults {
  T: string;
  t: number;
  c: number;
  o: number;
  h: number;
  l: number;
  v: number;
  n?: number;
  vw?: number;
}

export async function aggregatesGroupedDaily(
  polygon: PolygonApi,
  date: string
): Promise<false | IAggsResults[]> {
  console.debug(`Requesting daily market for ${date}`);

  let response: AxiosResponse;

  try {
    response = await polygon.get(
      `v2/aggs/grouped/locale/us/market/stocks/${date}?adjusted=true&include_otc=false`
    );
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.status === 403) {
        console.warn("Requesting todays data is forbidden.");
        return [];
      }
    }
    console.error(e);
    return false;
  }

  return response.data.results as IAggsResults[];
}
