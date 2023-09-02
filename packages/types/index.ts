export type tendenzApiSigmaYesterdayDay = {
  close: number;
  date: string | Date;
};

export type tendenzApiSigmaYesterdayV0 = {
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
};

export type tendenzApiSigmaYesterday = {
  ticker: string;
  name: string;
  type: string;
  sigma: number;
  marketCap: number;
  last: tendenzApiSigmaYesterdayDay;
  secondLast: tendenzApiSigmaYesterdayDay;
};
