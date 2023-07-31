import { ComingSoon } from "./components/ComingSoon";
import { ExplainingTitle } from "./components/ExplainingTitle";
import Hero from "./components/Hero";
import SigmaList from "./components/Sigma/SigmaList";
import SWRConfigProvider from "./components/SWRConfigProvider";
import { tendenzApiSigmaYesterday } from "./types/tendenzApiTypes";

export const MARKET_CAP_BUCKETS = [
  { label: "10m", minMarketCap: 10e6 },
  { label: "100m", minMarketCap: 100e6 },
  { label: "1b", minMarketCap: 1e9 },
  { label: "50b", minMarketCap: 50e9 },
] as const;

async function getData(url: string) {
  try {
    const res = await fetch(url, {
      next: { revalidate: 600 },
    });
    return res.json() as Promise<tendenzApiSigmaYesterday[]>;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function Home() {
  let fallback: { [key: string]: tendenzApiSigmaYesterday[] } = {};

  await Promise.all(
    MARKET_CAP_BUCKETS.map(async (bucket) => {
      const url = `https://tendenz-server.fly.dev/0?minMarketCap=${bucket.minMarketCap}`;
      fallback[url] = await getData(url);
    })
  );

  const lastDate = fallback[Object.keys(fallback)[0]][0].last.date;

  return (
    <>
      <header className="my-[5vh] flex flex-col gap-[2vh]">
        <Hero />
        <ExplainingTitle />
      </header>

      <section className="my-[5vh]">
        <SWRConfigProvider fallback={fallback}>
          <SigmaList
            marketCapBuckets={MARKET_CAP_BUCKETS}
            lastDate={lastDate}
          />
        </SWRConfigProvider>
      </section>

      <section>
        <ComingSoon />
      </section>
    </>
  );
}
