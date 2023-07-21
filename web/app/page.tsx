import { ExplainingTitle } from "./components/ExplainingTitle";
import Hero from "./components/Hero";
import MainBox from "./components/MainBox";

export interface tendenzApiSigmaYesterdayDay {
  close: number;
  logReturn: number;
  date: Date;
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

async function getData() {
  try {
    const res = await fetch("https://tendenz-server.fly.dev/", {
      next: { revalidate: 60 },
    });
    return res.json() as Promise<tendenzApiSigmaYesterday[]>;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <section className="max-w-[90vw]">
        <ExplainingTitle text={"yesterday's anomalies"} />
        <section>
          <div className="px-5">
            <h2 className="text-3xl font-normal text-slate-12">stocks</h2>
            <span className="text-base text-slate-11">United States</span>
          </div>
          <div className="flex justify-center mt-4">
            <MainBox data={data} />
          </div>
        </section>
        <section className="mt-[10rem]">
          <h2 className="text-3xl font-normal text-slate-12">coming soon...</h2>
          <div className="flex flex-wrap justify-start gap-10 mx-10 my-10 text-2xl bg-clip-text text-black-a1 bg-gradient-to-br from-indigo-10 to-sky-10 via-violet-10">
            {[
              "options",
              "global equities",
              "commodities",
              "credit default swaps",
              "foreign exchange",
              "equity indexes",
              "cryptocurrencies",
              "bonds",
              "derivatives",
              "notes",
              "interest rates",
              "mortgage-backed securities",
              "economic indicators",
            ].map((v) => (
              <div key={v}>{v}</div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
