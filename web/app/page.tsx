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
    <>
      <Hero />

      <section className="my-10">
        <div className="my-5">
          <ExplainingTitle date={data[0].last.date} />
        </div>

        <SigmaList data={data} />
      </section>
      <section className="mt-20">
        <ComingSoon />
      </section>
    </>
  );
}
