"use client";

import classNames from "classnames";
import { tendenzApiSigmaYesterday } from "../page";
import * as Accordion from "@radix-ui/react-accordion";
import { MarketCap } from "./MarketCap";
import { MainBoxRowSecond } from "./MainBoxRowSecond";
import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MainCardTrigger } from "./MainCardTrigger";

export default function MainBoxRow({
  entry,
  expanded,
}: {
  entry: tendenzApiSigmaYesterday;
  expanded: boolean;
}) {
  const lastClose = formatDollar(entry.last.close);
  const secondLastClose = formatDollar(entry.secondLast.close);
  const dailyReturn = useMemo(
    () => r((1 - entry.secondLast.close / entry.last.close) * 100, 1) + "%",
    [entry.secondLast.close, entry.last.close]
  );

  return (
    <Accordion.Item
      value={entry.ticker}
      className="transition-all duration-500 ease-in-out rounded-xl hover:bg-gradient-to-br from-sky-a4 to-indigo-a5 data-[state=open]:bg-gradient-to-br py-3 px-3"
    >
      <Accordion.Trigger asChild>
        <MainCardTrigger
          expanded={expanded}
          name={entry.name!}
          sigma={entry.sigma}
          marketCap={entry.marketCap}
          ticker={entry.ticker}
        />
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

function r(n: number, digits = 2): string {
  return n.toFixed(digits);
}

function formatDollar(n: number): string {
  return "$" + r(n);
}
