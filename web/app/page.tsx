import { ComingSoon } from "./components/ComingSoon";
import { ExplainingTitle } from "./components/ExplainingTitle";
import Hero from "./components/Hero";
import SigmaList from "./components/Sigma/SigmaList";
import SWRConfigProvider from "./components/SWRConfigProvider";
import { getFallback } from "./misc/tendenzApi";

export const MARKET_CAP_BUCKETS = [
  { label: "10m", minMarketCap: 10e6 },
  { label: "100m", minMarketCap: 100e6 },
  { label: "1b", minMarketCap: 1e9 },
  { label: "50b", minMarketCap: 50e9 },
] as const;

export default async function Home() {
  const fallback = await getFallback(
    MARKET_CAP_BUCKETS.map((b) => b.minMarketCap)
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
