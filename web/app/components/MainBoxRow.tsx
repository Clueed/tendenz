"use client";

import classNames from "classnames";
import { tendenzApiSigmaYesterday } from "../page";
import * as Accordion from "@radix-ui/react-accordion";
import { MarketCap } from "./MarketCap";
import { MainBoxRowSecond } from "./MainBoxRowSecond";
import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function MainBoxRow({
  entry,
  expanded,
}: {
  entry: tendenzApiSigmaYesterday;
  expanded: boolean;
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
      className="transition-all duration-500 ease-in-out rounded-xl hover:bg-gradient-to-br from-sky-a4 to-indigo-a5 data-[state=open]:bg-gradient-to-br py-3 px-3"
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
            <MarketCap marketCap={entry.marketCap} expanded={expanded} />
          </div>

          <motion.div
            animate={{
              height: expanded ? "auto" : "calc(1.425*1.125rem*2)",
              transition: { type: "spring", duration: 3 },
            }}
            className={"text-lg leading-[1.425] overflow-clip"}
          >
            <span className="mr-1 text-slate-11">{entry.ticker}</span>
            {"  "}

            <span className="text-slate-12">{formattedName}</span>
            {shareTypes.map((type) => (
              <>
                {" "}
                <motion.span
                  animate={{
                    opacity: expanded ? 1 : 0,
                    transition: { type: "spring", duration: 0.5, delay: 1 },
                  }}
                  key={type}
                  className="text-[0.6em] text-slate-11 bg-slate-a3 rounded-md px-2 py-1"
                >
                  {type}
                </motion.span>
              </>
            ))}
          </motion.div>
        </div>
      </Accordion.Trigger>
      <AnimatePresence>
        {expanded && (
          <Accordion.Content asChild forceMount>
            <motion.div
              initial={{ height: 0 }}
              animate={{
                height: "auto",
                transition: { type: "spring", duration: 2 },
              }}
              exit={{ height: 0 }}
              className={"overflow-hidden"}
            >
              <MainBoxRowSecond
                lastClose={lastClose}
                secondLastClose={secondLastClose}
                dailyReturn={dailyReturn}
              />
            </motion.div>
          </Accordion.Content>
        )}
      </AnimatePresence>
    </Accordion.Item>
  );
}

function handleTickerTypes(name: string | null) {
  let formattedName = name;
  let shareTypes: string[] = [];

  if (formattedName === null) {
    return { formattedName, shareTypes };
  }

  for (const type of ["Common Stock", "Ordinary Shares", "Class A"]) {
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
