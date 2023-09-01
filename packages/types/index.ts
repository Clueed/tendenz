export interface tendenzApiSigmaYesterdayDay {
  close: number;
  logReturn: number;
  date: string | Date;
}

export interface tendenzApiSigmaYesterday {
  ticker: string;
  name: string | null;
  sigma: number;
  absSigma: number;
  weight: number;
  marketCap: number | null;
  stdLogReturn: number;
  meanLogReturn: number;
  sampleSize: number;
  last: tendenzApiSigmaYesterdayDay;
  secondLast: tendenzApiSigmaYesterdayDay;
}
