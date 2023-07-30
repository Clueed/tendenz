import { Suspense } from "react";
import { ComingSoon } from "./components/ComingSoon";
import { ExplainingTitle } from "./components/ExplainingTitle";
import Hero from "./components/Hero";
import SigmaList from "./components/Sigma/SigmaList";
import SigmaListDataWrapper from "./components/SigmaListDataWrapper";

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

export interface MarketCapBucket {
  label: string;
  minMarketCap: number;
}

const marketCapBuckets: MarketCapBucket[] = [
  { label: "10m", minMarketCap: 10e6 },
  { label: "100m", minMarketCap: 100e6 },
  { label: "1b", minMarketCap: 1e9 },
  { label: "50b", minMarketCap: 50e9 },
];

export interface MarketCapBucketWithData extends MarketCapBucket {
  entries: tendenzApiSigmaYesterday[];
}

export default async function Home() {
  async function fetchDataForBucket(minMarketCap: number) {
    return await getData(minMarketCap);
  }

  const data = await Promise.all(
    marketCapBuckets.map(async (bucket) => {
      const entries = await fetchDataForBucket(bucket.minMarketCap);
      return { ...bucket, entries };
    })
  );

  let fallback: any = {};

  for (const bucket of data) {
    fallback[
      `https://tendenz-server.fly.dev/0?minMarketCap=${bucket.minMarketCap}`
    ] = bucket.entries;
  }

  //console.log("fallback :>> ", fallback);

  return (
    <>
      <header className="my-[5vh] flex flex-col gap-[2vh]">
        <Hero />
        <ExplainingTitle />
      </header>

      <section className="my-[5vh]">
        <SigmaListDataWrapper fallback={{}}>
          <SigmaList marketCapBuckets={marketCapBuckets} />
        </SigmaListDataWrapper>
      </section>

      <section>
        <ComingSoon />
      </section>
    </>
  );
}
