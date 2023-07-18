"use client";

import { SigmaUsStocksYesterday } from "../page";

function MainBoxRowExpandedCol({
  label,
  number,
}: {
  label: string;
  number: string;
}) {
  return (
    <div className="flex flex-col p-2 text-right">
      <div className="text-xl">{number}</div>
      <div className="text-xs leading-none">{label}</div>
    </div>
  );
}

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
  const sigma = r(entry.sigma) + "σ";
  const dailyReturn =
    r((1 - entry.lastClose / entry.secondLastClose) * 100, 1) + "%";

  return (
    <div
      className={
        "grid w-100 grid-cols-[1.2fr_3fr] backdrop-blur-3xl sm:grid-cols-[1fr_3fr_1fr_1fr] gap-5 items-center rounded-md py-3 px-5 transition-all ease-out hover:scale-[1.01] hover:bg-gradient-to-br from-slate-a1 to-slate-a3  cursor-pointer " +
        (expanded && " bg-gradient-to-br scale-[1.01]")
      }
      onClick={onClick}
    >
      <div className="text-2xl font-bold text-right text-sky-12">{sigma}</div>
      <div className="flex-col">
        <div className="text-sm text-slate-11">{entry.ticker}</div>
        <div className="text-lg text-slate-12 line-clamp-2">{entry.name}</div>
      </div>
      <div className="hidden text-right sm:block">{lastClose}</div>
      <div className="hidden text-right sm:block">{secondLastClose}</div>
      {expanded && (
        <div className="flex justify-around gap-2 sm:hidden col-span-full text-slate-12">
          <MainBoxRowExpandedCol
            number={secondLastClose}
            label={"close day before yesterday"}
          />
          <MainBoxRowExpandedCol number={dailyReturn} label={"return"} />
          <MainBoxRowExpandedCol number={lastClose} label={"close yesterday"} />
        </div>
      )}
    </div>
  );
}
