import { ComingSoon } from "./components/ComingSoon";
import { ExplainingTitle } from "./components/ExplainingTitle";
import Hero from "./components/Hero";
import SigmaList from "./components/Sigma/SigmaList";

export interface tendenzApiSigmaYesterdayDay {
  close: number;
  logReturn: number;
  date: string;
}

export interface tendenzApiSigmaYesterday {
  ticker: string;
  name: string | null;
  sigma: number;
  weight: number;
  marketCap: number;
  stdLogReturn: number;
  meanLogReturn: number;
  sampleSize: number;
  last: tendenzApiSigmaYesterdayDay;
  secondLast: tendenzApiSigmaYesterdayDay;
}

export interface MarketCapBucket {
  minMarketCap: number;
  entries: tendenzApiSigmaYesterday[];
}

async function getData(minMarketCap?: number) {
  try {
    const res = await fetch(
      `https://tendenz-server.fly.dev/?minMarketCap=${minMarketCap}`,
      {
        next: { revalidate: 60 },
      }
    );
    return res.json() as Promise<tendenzApiSigmaYesterday[]>;
  } catch (e) {
    console.error(e);
    return [];
  }
}

const marketCapBuckets = {
  "10M": { minMarketCap: 10e6, entries: [] },
  "100M": { minMarketCap: 100e6, entries: [] },
  "1B": { minMarketCap: 1e9, entries: [] },
  "50B": { minMarketCap: 50e9, entries: [] },
};

export type MarketCapBuckets = keyof typeof marketCapBuckets;

export type MarketCapDataObject = {
  [key in keyof typeof marketCapBuckets]: MarketCapBucket;
};

export default async function Home() {
  async function fetchDataForBucket(bucket: { minMarketCap: number }) {
    const entries = await getData(bucket.minMarketCap);
    return { ...bucket, entries };
  }

  const data = Object.fromEntries(
    await Promise.all(
      Object.entries(marketCapBuckets).map(async ([key, value]) => [
        key,
        await fetchDataForBucket(value),
      ])
    )
  );

  return (
    <>
      <header className="my-[5vh] flex flex-col gap-[2vh]">
        <Hero />
        <ExplainingTitle />
      </header>

      <section className="my-[5vh]">
        <SigmaList data={data} />
      </section>
      <section>
        <ComingSoon />
      </section>
    </>
  );
}
