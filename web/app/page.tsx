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

const data: SigmaUsStocksYesterday[] = [
  {
    ticker: "APPL",
    date: "18-07-2023",
    name: "Apple Inc",
    sigma: -3.827123129384,
    lastClose: 138.23,
    secondLastClose: 152.32,
    weight: 0.033321,
  },
  {
    ticker: "APPL",
    date: "18-07-2023",
    name: "Apple Inc",
    sigma: -3.827123129384,
    lastClose: 138.23,
    secondLastClose: 152.32,
    weight: 0.033321,
  },
  {
    ticker: "APPL",
    date: "18-07-2023",
    name: "Apple Inc",
    sigma: -3.827123129384,
    lastClose: 138.23,
    secondLastClose: 152.32,
    weight: 0.033321,
  },
  {
    ticker: "APPL",
    date: "18-07-2023",
    name: "Apple Inc",
    sigma: -3.827123129384,
    lastClose: 138.23,
    secondLastClose: 152.32,
    weight: 0.033321,
  },
  {
    ticker: "APPL",
    date: "18-07-2023",
    name: "Apple Inc",
    sigma: -3.827123129384,
    lastClose: 138.23,
    secondLastClose: 152.32,
    weight: 0.033321,
  },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Hero />
      <div>
        <div className="mt-[16vh]  text-center text-4xl font-semibold text-slate-7">
          US Stocks
        </div>
      </div>
      <div className="mt-[4vh] flex justify-center">
        <MainBox data={data} />
      </div>
    </main>
  );
}
