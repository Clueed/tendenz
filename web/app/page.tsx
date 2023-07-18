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
  const res = await fetch("https://tendenz-server.fly.dev/");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<SigmaUsStocksYesterday[]>;
}

export default async function Home() {
  const data = await getData();
  return (
    <main className="flex flex-col items-center">
      <Hero />
      <section className="mt-[10rem]">
        <h1 className="text-4xl text-center text-slate-9">US Stocks</h1>
        <div className="mt-[4vh] flex justify-center">
          <MainBox data={data} />
        </div>
      </section>
      <section className="mt-[10rem]">
        <h1 className="text-4xl text-center text-slate-9">Indexes</h1>
        <div className="mt-[4vh] flex justify-center blur-sm">
          <MainBox data={data} />
        </div>
      </section>
    </main>
  );
}
