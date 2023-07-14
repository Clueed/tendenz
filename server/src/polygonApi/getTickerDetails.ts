import { AxiosError, AxiosResponse } from "axios";
import { PolygonApi } from "./polygonApi.js";

export interface ITickerDetailsResults {
  active?: boolean;
  address?: {
    address1?: string;
    city?: string;
    state?: string;
    postal_code?: string;
  };
  branding?: {
    icon_url?: string;
    logo_url?: string;
  };
  cik?: number;
  composite_figi?: string;
  currency_name?: string;
  description?: string;
  homepage_url?: string;
  list_date?: string;
  locale?: string;
  market?: string;
  market_cap?: number;
  name?: string;
  phone_number?: string;
  primary_exchange?: string;
  round_lot?: number;
  share_class_figi?: string;
  share_class_shares_outstanding?: number;
  sic_code?: number;
  sic_description?: string;
  ticker?: string;
  ticker_root?: string;
  total_employees?: number;
  type?: string;
  weighted_shares_outstanding?: number;
  source_feed?: string;
}

export async function tickerDetails(
  polygon: PolygonApi,
  ticker: string,
  dateString: string
): Promise<ITickerDetailsResults | false> {
  console.debug(`Requesting ticker details`);

  let response: AxiosResponse;
  try {
    response = await polygon.get(
      `v3/reference/tickers/${ticker}?date=${dateString}`,
      2
    );
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.status === 403) {
        console.warn("Requesting todays data is forbidden.");
        return false;
      }
    }
    console.error(e);
    return false;
  }

  return response.data.results as ITickerDetailsResults;
}
