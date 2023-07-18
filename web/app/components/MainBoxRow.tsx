"use client";

import { SigmaUsStocksYesterday } from "../page";

function MainBoxRowExpandedCol({
  label,
  number,
}: {
  label: string;
  number: number;
}) {
  return (
    <div className="flex flex-col p-2 text-right">
      <div className="text-xl">${number}</div>
      <div className="text-xs leading-none">{label}</div>
    </div>
  );
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
  return (
    <div
      className={
        "grid grid-cols-[1fr_3fr] sm:grid-cols-[1fr_3fr_1fr_1fr] gap-5 items-center rounded-md py-2 px-5 transition-all duration-1000" +
        (expanded && " bg-gradient-to-br from-slate-a1 to-slate-a3")
      }
      onClick={onClick}
    >
      <div className="text-2xl font-bold text-sky-12">
        {Math.round(entry.sigma * 10) / 10}σ
      </div>
      <div className="flex-col">
        <div className="text-sm text-slate-11">{entry.ticker}</div>
        <div className="text-lg text-slate-12">{entry.name}</div>
      </div>
      <div className="hidden sm:block">${entry.lastClose}</div>
      <div className="hidden sm:block">${entry.secondLastClose}</div>
      {expanded && (
        <div className="flex gap-2 col-span-full text-slate-12">
          <MainBoxRowExpandedCol
            number={entry.lastClose}
            label={"close yesterday"}
          />
          <MainBoxRowExpandedCol
            number={entry.secondLastClose}
            label={"close day before yesterday"}
          />
        </div>
      )}
    </div>
  );
}
