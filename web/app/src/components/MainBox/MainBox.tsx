import React from "react";
import "./MainBox.css";
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
  if (a > 3) return "standardDeviation4 ";
  if (a > 2) return "standardDeviation3";
  if (a > 1) return "standardDeviation2";
  return "standardDeviation1";
};

const MainBox = ({ children }: Props) => {
  return (
    <div className="container">
      <div className="heading">{children}</div>
      <div className="grid-container">
        {sortedData.map((item) => (
          <>
            <div
              className={
                "standardDeviation " +
                colorStandartDeviation(item.standardDeviation)
              }
            >
              {item.standardDeviation}σ
            </div>
            <div className="ticker">{item.ticker}</div>
            <div className="name">{item.name}</div>
            <div
              className={
                item.change > 0
                  ? "change changePositive"
                  : "change changeNegative"
              }
            >
              {item.change}%
            </div>
            <a
              href={"https://de.finance.yahoo.com/quote/" + item.ticker}
              target="_blank"
            >
              <AiOutlineLink className="link"></AiOutlineLink>
            </a>
          </>
        ))}
      </div>
    </div>
  );
};

export default MainBox;
