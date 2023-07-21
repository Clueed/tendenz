"use client";

import { tendenzApiSigmaYesterday } from "../page";
import * as Accordion from "@radix-ui/react-accordion";

function r(n: number, digits = 2): string {
  return n.toFixed(digits);
}

function formatDollar(n: number): string {
  return "$" + r(n);
}

export default function MainBoxRow({
  entry,
}: {
  entry: tendenzApiSigmaYesterday;
}) {
  const lastClose = formatDollar(entry.last.close);
  const secondLastClose = formatDollar(entry.secondLast.close);
  const sigma = r(entry.sigma);
  const dailyReturn =
    r((1 - entry.secondLast.close / entry.last.close) * 100, 1) + "%";

  return (
    <Accordion.Item
      value={entry.ticker}
      className="transition-all ease-out hover:scale-[1.01] hover:bg-gradient-to-br from-slate-a1 to-slate-a3 data-[state=open]:bg-gradient-to-br"
    >
      <Accordion.Trigger asChild>
        <div
          className={
            "grid w-100 grid-cols-[1.5fr_3fr] sm:grid-cols-[1fr_3fr_1fr_1fr] gap-x-5 gap-y-1 items-center rounded-md py-3 px-3 cursor-pointer "
          }
        >
          <div className="text-3xl text-right text-indigo-12">
            {sigma}
            <span className="ml-1 text-xl text-slate-10">σ</span>
          </div>
          <div className={"text-lg align-baseline"}>
            <span className="mr-1 text-slate-11 ">{entry.ticker}</span>
            {"  "}
            <span className="text-slate-12">{entry.name}</span>
          </div>
          <div className="hidden text-right sm:block">{lastClose}</div>
          <div className="hidden text-right sm:block">{secondLastClose}</div>
        </div>
      </Accordion.Trigger>
      <Accordion.Content asChild>
        <div className="flex justify-around gap-2 sm:hidden col-span-full text-slate-12 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
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
      </Accordion.Content>
    </Accordion.Item>
  );
}
