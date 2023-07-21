"use client";

import classNames from "classnames";
import { tendenzApiSigmaYesterday } from "../page";
import { MarketCap } from "./MarketCap";
import { MainBoxRowSecond } from "./MainBoxRowSecond";

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
        "grid w-100 grid-cols-[1.5fr_3fr] items-start gap-x-5 gap-y-0.5 rounded-md py-3 px-3 transition-all ease-out hover:scale-[1.01] hover:bg-gradient-to-br from-slate-a1 to-slate-a3 cursor-pointer",
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
      <div
        className={classNames("text-lg leading-tight", {
          "line-clamp-2": !expanded,
        })}
      >
        <span className="mr-1 text-slate-11">{entry.ticker}</span>
        {"  "}
        <span className="text-slate-12">{entry.name}</span>
      </div>
      <div className={classNames("col-span-full", { hidden: !expanded })}>
        <MainBoxRowSecond
          lastClose={lastClose}
          secondLastClose={secondLastClose}
          dailyReturn={dailyReturn}
        />
      </div>
    </div>
  );
}

function r(n: number, digits = 2): string {
  return n.toFixed(digits);
}

function formatDollar(n: number): string {
  return "$" + r(n);
}
