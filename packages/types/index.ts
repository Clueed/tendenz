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
  type: stockTypeCode;
  sigma: number;
  marketCap: number;
  last: tendenzApiSigmaYesterdayDay;
  secondLast: tendenzApiSigmaYesterdayDay;
};

export const stockTypes = {
  CS: {
    description: "Common Stock",
  },
  PFD: {
    description: "Preferred Stock",
  },
  WARRANT: {
    description: "Warrant",
  },
  RIGHT: {
    description: "Rights",
  },
  BOND: {
    description: "Corporate Bond",
  },
  ETF: {
    description: "Exchange Traded Fund",
  },
  ETN: {
    description: "Exchange Traded Note",
  },
  ETV: {
    description: "Exchange Traded Vehicle",
  },
  SP: {
    description: "Structured Product",
  },
  ADRC: {
    description: "American Depository Receipt Common",
  },
  ADRP: {
    description: "American Depository Receipt Preferred",
  },
  ADRW: {
    description: "American Depository Receipt Warrants",
  },
  ADRR: {
    description: "American Depository Receipt Rights",
  },
  FUND: {
    description: "Fund",
  },
  BASKET: {
    description: "Basket",
  },
  UNIT: {
    description: "Unit",
  },
  LT: {
    description: "Liquidating Trust",
  },
  OS: {
    description: "Ordinary Shares",
  },
  GDR: {
    description: "Global Depository Receipts",
  },
  OTHER: {
    description: "Other Security Type",
  },
  NYRS: {
    description: "New York Registry Shares",
  },
  AGEN: {
    description: "Agency Bond",
  },
  EQLK: {
    description: "Equity Linked Bond",
  },
  ETS: {
    description: "Single-security ETF",
  },
};

export type stockTypeCode = keyof typeof stockTypes;
