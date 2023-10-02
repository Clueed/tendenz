import { FromSchema } from "json-schema-to-ts";

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

export type tendenzApiSigmaYesterdayDay = {
  close: number;
  date: string | Date;
};

export type primaryExchange =
  | "XNAS"
  | "IEXG"
  | "ARCX"
  | "XASE"
  | "BATS"
  | "XNYS";

export type tendenzApiSigmaYesterday = {
  ticker: string;
  name: string;
  type: stockTypeCode;
  primaryExchange: primaryExchange;
  sigma: number;
  marketCap: number;
  last: tendenzApiSigmaYesterdayDay;
  secondLast: tendenzApiSigmaYesterdayDay;
};

export const stockTypes = {
  CS: {
    aliases: ["Common Stock", "Ordinary Shares"],
    description:
      "Common stock (CS) represents ownership in a corporation and typically comes with voting rights and the potential for dividends.",
  },
  PFD: {
    aliases: ["Preferred Stock"],
    description:
      "Preferred stock (PFD) is a type of equity that usually offers higher dividends and a higher claim on assets than common stock but lacks voting rights.",
  },
  WARRANT: {
    aliases: ["Warrant"],
    description:
      "A warrant is a financial instrument that gives the holder the right, but not the obligation, to buy the issuer's stock at a predetermined price.",
  },
  RIGHT: {
    aliases: ["Rights"],
    description:
      "Rights are tradable options that allow existing shareholders to purchase additional shares of stock at a discounted price, typically during a new issuance.",
  },
  BOND: {
    aliases: ["Corporate Bond"],
    description:
      "A corporate bond is a debt security issued by a corporation to raise capital, with the promise to repay the principal amount along with interest.",
  },
  ETF: {
    aliases: ["Exchange Traded Fund"],
    description:
      "An Exchange Traded Fund (ETF) is an investment fund that holds a basket of assets and is traded on stock exchanges, offering diversification and liquidity.",
  },
  ETN: {
    aliases: ["Exchange Traded Note"],
    description:
      "An Exchange Traded Note (ETN) is a debt security linked to the performance of an underlying index or asset, typically without holding the actual assets.",
  },
  ETV: {
    aliases: ["Exchange Traded Vehicle"],
    description:
      "An Exchange Traded Vehicle (ETV) is a broad term that includes various exchange-traded investment products like ETFs and ETNs.",
  },
  SP: {
    aliases: ["Structured Product"],
    description:
      "Structured products (SP) are complex investments with customized payouts, often tied to the performance of an underlying asset or index.",
  },
  ADRC: {
    aliases: ["American Depository Receipt Common"],
    description:
      "American Depository Receipts Common (ADRC) represent ownership in foreign companies and are traded in the U.S. financial markets.",
  },
  ADRP: {
    aliases: ["American Depository Receipt Preferred"],
    description:
      "American Depository Receipt Preferred (ADRP) represent preferred shares in foreign companies, offering U.S. investors exposure to international preferences.",
  },
  ADRW: {
    aliases: ["American Depository Receipt Warrants"],
    description:
      "American Depository Receipt Warrants (ADRW) are ADR-linked warrants that provide the holder with the right to purchase additional ADR shares at a specified price.",
  },
  ADRR: {
    aliases: ["American Depository Receipt Rights"],
    description:
      "American Depository Receipt Rights (ADRR) are ADR-linked rights that grant existing ADR shareholders the option to buy more ADR shares at a discounted rate.",
  },
  FUND: {
    aliases: ["Fund"],
    description:
      "Funds pool money from multiple investors to invest in a diversified portfolio of stocks, bonds, or other assets, managed by professionals.",
  },
  BASKET: {
    aliases: ["Basket"],
    description:
      "A basket is a collection of securities or assets grouped together for investment purposes, often used in structured products or ETFs.",
  },
  UNIT: {
    aliases: ["Unit"],
    description:
      "A unit represents ownership in a unit investment trust (UIT) or a similar investment vehicle, offering a predetermined portfolio of assets.",
  },
  LT: {
    aliases: ["Liquidating Trust"],
    description:
      "A liquidating trust is created to oversee the distribution of assets and the settlement of liabilities of a company in the process of liquidation.",
  },
  OS: {
    aliases: ["Ordinary Shares"],
    description:
      "Ordinary shares are the most common form of equity ownership in a company, typically entitling holders to voting rights and dividends.",
  },
  GDR: {
    aliases: ["Global Depository Receipts"],
    description:
      "Global Depository Receipts (GDRs) are certificates representing ownership in foreign stocks, often traded on international exchanges.",
  },
  OTHER: {
    aliases: ["Other Security Type"],
    description:
      "This category includes various securities and financial instruments that do not fit into the standard categories mentioned above.",
  },
  NYRS: {
    aliases: ["New York Registry Shares"],
    description:
      "New York Registry Shares represent ownership in foreign companies and are traded on the New York Stock Exchange (NYSE).",
  },
  AGEN: {
    aliases: ["Agency Bond"],
    description:
      "Agency bonds are debt securities issued by government-sponsored agencies, such as Freddie Mac or Fannie Mae, to fund specific programs.",
  },
  EQLK: {
    aliases: ["Equity Linked Bond"],
    description:
      "An Equity Linked Bond is a debt security with returns linked to the performance of a specific equity index or a basket of stocks.",
  },
  ETS: {
    aliases: ["Single-security ETF"],
    description:
      "A Single-security ETF is an exchange-traded fund that holds only one underlying security, providing exposure to a specific stock or bond.",
  },
};

export type stockTypeCode = keyof typeof stockTypes;

export const PAGE_SIZE = 10;

export const usStocksDailyQuerySchema = {
  type: "object",
  properties: {
    minMarketCap: {
      type: "integer",
      minimum: 0,
    },
    maxMarketCap: {
      type: "integer",
      minimum: 0,
    },
    type: {
      type: "array",
      items: {
        type: "string",
        enum: Object.keys(stockTypes) as stockTypeCode[],
      },
    },
  },
  additionalProperties: false,
} as const;

export type UsStocksDailyQueryType = FromSchema<
  typeof usStocksDailyQuerySchema
>;

export const usStocksDailyParamsSchema = {
  type: "object",
  properties: {
    page: {
      type: "integer",
      minimum: 0,
    },
  },
  required: ["page"],
  additionalProperties: false,
} as const;

export type UsStocksDailyParamsType = FromSchema<
  typeof usStocksDailyParamsSchema
>;
