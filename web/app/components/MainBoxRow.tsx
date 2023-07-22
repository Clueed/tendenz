"use client";

import classNames from "classnames";
import { tendenzApiSigmaYesterday } from "../page";
import * as Accordion from "@radix-ui/react-accordion";
import { MarketCap } from "./MarketCap";
import { MainBoxRowSecond } from "./MainBoxRowSecond";
import { useMemo } from "react";

export default function MainBoxRow({
  entry,
}: {
  entry: tendenzApiSigmaYesterday;
}) {
  const lastClose = formatDollar(entry.last.close);
  const secondLastClose = formatDollar(entry.secondLast.close);
  const sigma = r(entry.sigma);
  const dailyReturn = useMemo(
    () => r((1 - entry.secondLast.close / entry.last.close) * 100, 1) + "%",
    [entry.secondLast.close, entry.last.close]
  );

  const name = entry.name;

  const { formattedName, shareTypes } = useMemo(
    () => handleTickerTypes(name),
    [name]
  );

  return (
    <Accordion.Item
      value={entry.ticker}
      className="transition-all rounded-xl ease-out hover:scale-[1.01] hover:bg-gradient-to-br from-slate-a1 to-slate-a3 data-[state=open]:bg-gradient-to-br py-3 px-3 group"
    >
      <Accordion.Trigger asChild>
        <div
          className={
            "grid w-100 grid-cols-[7rem_auto] gap-x-4 items-start cursor-pointer"
          }
        >
          <div className="grid grid-cols-[auto_min-content] items-baseline">
            <div className="text-3xl leading-none text-right text-indigo-12">
              {sigma}
            </div>
            <div className="ml-1 text-xl text-slate-10">σ</div>
            <MarketCap marketCap={entry.marketCap} />
          </div>

          <div
            className={classNames(
              "text-lg leading-[1.425] max-h-[calc(1.425*1.125rem*2)] group-radix-state-open:max-h-full overflow-clip transition-all delay-150 duration-300"
            )}
          >
            <span className="mr-1 text-slate-11">{entry.ticker}</span>
            {"  "}

            <span className="text-slate-12">{formattedName}</span>
            {shareTypes.map((type) => (
              <>
                {" "}
                <span
                  key={type}
                  className="text-[0.6em] text-slate-11 opacity-0 group-radix-state-open:opacity-100 transition-opacity delay-150 duration-700 bg-slate-a3 rounded-md px-2 py-1"
                >
                  {type}
                </span>
              </>
            ))}
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

function handleTickerTypes(name: string | null) {
  let formattedName = name;
  let shareTypes: string[] = [];

  if (formattedName === null) {
    return { formattedName, shareTypes };
  }

  for (const type of ["Common Stock", "Class A"]) {
    if (formattedName!.search(type) !== -1) {
      formattedName = formattedName!.replace(type, "");
      shareTypes.push(type);
    }
  }

  shareTypes = shareTypes.map((type) =>
    type.replace(" ", String.fromCharCode(160))
  );

  return { formattedName, shareTypes };
}

function r(n: number, digits = 2): string {
  return n.toFixed(digits);
}

function formatDollar(n: number): string {
  return "$" + r(n);
}
