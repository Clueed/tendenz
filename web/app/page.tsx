import Hero from "./components/Hero";
import MainBox from "./components/MainBox";
import NavigationBar from "./components/NavigationBar";

export interface SigmaUsStocksYesterday {
  ticker: string;
  date: string;
  name: string;
  sigma: number;
  lastClose: number;
  secondLastClose: number;
  weight: number;
}

async function getData() {
  try {
    const res = await fetch("https://tendenz-server.fly.dev/");
    return res.json() as Promise<SigmaUsStocksYesterday[]>;
  } catch (e) {
    console.error(e);
    return [];
  }
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
}

export default async function Home() {
  const data = await getData();
  return (
    <main className="flex flex-col items-center">
      <Hero />
      <section className="max-w-[90vw]">
        <h1 className="mt-12 text-4xl font-normal text-indigo-11">
          Yesterday&apos;s anomalies
        </h1>
        <section className="mt-6">
          <h2 className="text-3xl font-normal text-slate-12">US stocks</h2>
          <div className="mt-[4vh] flex justify-center">
            <MainBox data={data} />
          </div>
        </section>
        <section className="mt-[10rem]">
          <h2 className="text-3xl font-normal text-slate-12">Coming soon...</h2>
          <div className="flex flex-wrap justify-start gap-10 mx-10 my-10 text-2xl bg-clip-text text-black-a1 bg-gradient-to-br from-indigo-10 to-sky-10 via-violet-10">
            <div>options</div>
            <div>global equities</div>
            <div>commodities</div>
            <div>credit default swaps</div>
            <div>foreign exchange</div>
            <div>equity indexes</div>
            <div>cryptocurrencies</div>
            <div>bonds</div>
            <div>derivatives</div>
            <div>notes</div>
            <div>interest rates</div>
            <div>mortgage-backed securities</div>
            <div>economic indicators</div>
          </div>
        </section>
      </section>
    </main>
  );
}
