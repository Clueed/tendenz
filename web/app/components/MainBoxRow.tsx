"use client";

import { SigmaUsStocksYesterday } from "../page";

function r(n: number, digits = 2): string {
  return n.toFixed(digits);
}

function formatDollar(n: number): string {
  return "$" + r(n);
}

export default function MainBoxRow({
  entry,
  onClick,
  expanded,
}: {
  entry: SigmaUsStocksYesterday;
  onClick: () => void;
  expanded: boolean;
}) {
  const lastClose = formatDollar(entry.lastClose);
  const secondLastClose = formatDollar(entry.secondLastClose);
  const sigma = r(entry.sigma);
  const dailyReturn =
    r((1 - entry.secondLastClose / entry.lastClose) * 100, 1) + "%";

  return (
    <div
      className={
        "grid w-100 grid-cols-[1.5fr_3fr] backdrop-blur-3xl sm:grid-cols-[1fr_3fr_1fr_1fr] gap-x-5 gap-y-1 items-center rounded-md py-3 px-5 transition-all ease-out hover:scale-[1.01] hover:bg-gradient-to-br from-slate-a1 to-slate-a3  cursor-pointer " +
        (expanded && " bg-gradient-to-br scale-[1.01]")
      }
      onClick={onClick}
    >
      <div className="text-3xl text-right text-indigo-12">
        {sigma}
        <span className="ml-1 text-xl text-slate-10">σ</span>
      </div>
      <div
        className={"text-lg align-baseline " + (!expanded && "line-clamp-2")}
      >
        <span className="mr-1 text-slate-11 ">{entry.ticker}</span>
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
