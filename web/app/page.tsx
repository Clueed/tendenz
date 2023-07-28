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
  entries: tendenzApiSigmaYesterday[] | [];
}

export default async function Home() {
  const marketCapBuckets = [
    { label: "10M", minMarketCap: 10e6 },
    { label: "100M", minMarketCap: 100e6 },
    { label: "1B", minMarketCap: 1e9 },
    { label: "50B", minMarketCap: 50e9 },
  ];

  async function fetchDataForBucket(bucket: {
    label: string;
    minMarketCap: number;
  }) {
    const entries = await getData(bucket.minMarketCap);
    return { ...bucket, entries };
  }

  const data = await Promise.all(marketCapBuckets.map(fetchDataForBucket));

  console.log(data[0].entries[0]);
  console.log(data[1].entries[0]);
  console.log(data[2].entries[0]);

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
