"use client";

import classNames from "classnames";
import { tendenzApiSigmaYesterday } from "../page";
import * as Accordion from "@radix-ui/react-accordion";
import { MarketCap } from "./MarketCap";
import { MainBoxRowSecond } from "./MainBoxRowSecond";

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
            "grid w-100 grid-cols-[1.5fr_3fr]  gap-x-5 gap-y-1 items-start rounded-md py-3 px-3 cursor-pointer group"
          }
        >
          <div className="flex items-start justify-end text-right">
            <div className="flex flex-col">
              <span className="text-3xl leading-none text-indigo-12">
                {sigma}
              </span>
              <MarketCap marketCap={entry.marketCap} expanded={true} />
            </div>
            <span className="ml-1 text-xl text-slate-10">σ</span>
          </div>
          <div
            className={classNames(
              "text-lg leading-tight data-[state=closed]:line-clamp-2"
            )}
          >
            <span className="mr-1 text-slate-11">{entry.ticker}</span>
            {"  "}
            <span className="text-slate-12">{entry.name}</span>
          </div>
        </div>
      </Accordion.Trigger>
      <Accordion.Content asChild>
        <div
          className={classNames(
            "data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden"
          )}
        >
          <MainBoxRowSecond
            lastClose={lastClose}
            secondLastClose={secondLastClose}
            dailyReturn={dailyReturn}
          />
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
}

function r(n: number, digits = 2): string {
  return n.toFixed(digits);
}

function formatDollar(n: number): string {
  return "$" + r(n);
}
