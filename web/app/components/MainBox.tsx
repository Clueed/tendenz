import { AiOutlineLink } from "react-icons/ai";

// Standartabweichung, Ticker + Name, prozentuale Veränderung, Link zu Yahoo Finance
const data = [
  {
    standardDeviation: 1,
    ticker: "AAPL",
    name: "Apple",
    change: 12,
    link: "link",
  },
  {
    standardDeviation: 1.5,
    ticker: "AMZN",
    name: "Amazon",
    change: 4,
    link: "link",
  },
  {
    standardDeviation: 1.2,
    ticker: "META",
    name: "Meta",
    change: -10,
    link: "link",
  },
  {
    standardDeviation: 2,
    ticker: "GOOG",
    name: "Alphabet",
    change: -3,
    link: "link",
  },
  {
    standardDeviation: 2.3,
    ticker: "TSLA",
    name: "Tesla",
    change: 6,
    link: "link",
  },
];

// Interface
interface Props {
  children: string;
}

// Sorting data
const sortedData = data.sort(
  (a, b) => b.standardDeviation - a.standardDeviation
);

// Color of standart deviation
const colorStandartDeviation = (a: number) => {
  if (a > 3) return "text-red-9 ";
  if (a > 2) return "text-blue-9";
  if (a > 1) return "text-orange-9";
  return "text-purple-9";
};

const MainBox = () => {
  return (
    <div className="max-w-md w-[90vw] m-3">
      <div className="rounded-md grid grid-cols-[0.3fr_0.5fr_1fr_0.4fr_0.2fr] bg-[#fff] py-3 px-4 gap-x-1.5 gap-y-3 shadow-md">
        {sortedData.map((item) => (
          <>
            <div
              className={
                "text-right " + colorStandartDeviation(item.standardDeviation)
              }
            >
              {item.standardDeviation}σ
            </div>
            <div className="pl-5 italic text-slate-9">${item.ticker}</div>
            <div className="pl-3 text-slate-9">{item.name}</div>
            <div
              className={
                "text-right pr-7 " +
                (item.change > 0 ? "text-green-9" : "text-red-9")
              }
            >
              {item.change}%
            </div>
            <a
              className="my-auto text-slate-9"
              href={"https://de.finance.yahoo.com/quote/" + item.ticker}
              target="_blank"
            >
              <AiOutlineLink />
            </a>
          </>
        ))}
      </div>
    </div>
  );
};

export default MainBox;
