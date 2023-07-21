"use client";

import classNames from "classnames";
import { tendenzApiSigmaYesterday } from "../page";

export default function MainBoxRow({
  entry,
  onClick,
  expanded,
}: {
  entry: tendenzApiSigmaYesterday;
  onClick: () => void;
  expanded: boolean;
}) {
  const lastClose = formatDollar(entry.last.close);
  const secondLastClose = formatDollar(entry.secondLast.close);
  const sigma = r(entry.sigma);
  const dailyReturn =
    r((1 - entry.secondLast.close / entry.last.close) * 100, 1) + "%";

  return (
    <div
      className={classNames(
        "grid w-100 grid-cols-[1.5fr_3fr] items-start backdrop-blur-3xl sm:grid-cols-[1fr_3fr_1fr_1fr] gap-x-5 gap-y-0.5 rounded-md py-3 px-3 transition-all ease-out hover:scale-[1.01] hover:bg-gradient-to-br from-slate-a1 to-slate-a3 cursor-pointer",
        { "bg-gradient-to-br scale-[1.01]": expanded }
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-end text-right">
        <div className="flex flex-col">
          <span className="text-3xl leading-none text-indigo-12">{sigma}</span>
          <MarketCap marketCap={entry.marketCap} expanded={expanded} />
        </div>
        <span className="ml-1 text-xl text-slate-10">σ</span>
      </div>
      <div className={"text-lg leading-tight " + (!expanded && "line-clamp-2")}>
        <span className="mr-1 text-slate-11">{entry.ticker}</span>
        {"  "}
        <span className="text-slate-12">{entry.name}</span>
      </div>
      <div className="hidden text-right sm:block">{lastClose}</div>
      <div className="hidden text-right sm:block">{secondLastClose}</div>
      {expanded && (
        <div className="flex justify-around gap-2 sm:hidden col-span-full text-slate-12">
          <div className="flex flex-col p-2 text-right">
            <div className="text-xl">{secondLastClose}</div>
            <div className="text-xs leading-tight">day before yesterday</div>
            <div className="text-xs leading-tight text-slate-11">
              close price
            </div>
          </div>
          <div className="flex flex-col p-2 text-right">
            <div className="text-xl">{dailyReturn}</div>
            <div className="text-xs leading-tight">return</div>
          </div>
          <div className="flex flex-col p-2 text-right">
            <div className="text-xl">{lastClose}</div>
            <div className="text-xs leading-tight">yesterday</div>
            <div className="text-xs leading-tight text-slate-11">
              close price
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function r(n: number, digits = 2): string {
  return n.toFixed(digits);
}

function formatDollar(n: number): string {
  return "$" + r(n);
}

function MarketCap({
  marketCap,
  expanded,
}: {
  marketCap: number;
  expanded: boolean;
}) {
  let label: string;

  if (marketCap > 1000e9) {
    label = "1T";
  } else if (marketCap > 500e9) {
    label = "500B";
  } else if (marketCap > 100e9) {
    label = "100B";
  } else if (marketCap > 50e9) {
    label = "50B";
  } else if (marketCap > 10e9) {
    label = "10B";
  } else if (marketCap > 1e9) {
    label = "1B";
  } else if (marketCap > 100e6) {
    label = "100M";
  } else if (marketCap > 50e6) {
    label = "50M";
  } else if (marketCap > 10e6) {
    label = "10M";
  } else {
    label = "1M";
  }

  let sign: string;
  if (marketCap > 1e6) {
    sign = ">";
  } else {
    sign = "<";
  }

  return (
    <>
      <div className="inline-flex flex-col flex-wrap leading-none">
        <span
          className={classNames("text-xs text-slate-11", {
            "text-slate-12": expanded,
          })}
        >
          {sign}
          {label}
        </span>
        {expanded && (
          <span
            className={classNames("text-[0.6rem] text-right text-slate-a11")}
          >
            market cap
          </span>
        )}
      </div>
    </>
  );
}
