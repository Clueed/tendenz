"use client";

import { AnimatePresence, motion } from "framer-motion";

function calculateLabel(marketCap: number): string {
  const thresholds = [
    { cap: 1e12, label: "1T" },
    { cap: 5e11, label: "500B" },
    { cap: 1e11, label: "100B" },
    { cap: 5e10, label: "50B" },
    { cap: 1e10, label: "10B" },
    { cap: 1e9, label: "1B" },
    { cap: 1e8, label: "100M" },
    { cap: 5e7, label: "50M" },
    { cap: 1e7, label: "10M" },
  ];

  for (const threshold of thresholds) {
    if (marketCap > threshold.cap) {
      return threshold.label;
    }
  }

  return "1M";
}

export function MarketCap({
  marketCap,
  expanded,
}: {
  marketCap: number;
  expanded: boolean;
}) {
  const label = calculateLabel(marketCap);
  const formattedMarketCap = marketCap > 1e6 ? label + "+" : ">" + label;

  return (
    <>
      <div className="inline-flex flex-col flex-wrap items-end leading-none text-right gap-x-2">
        <motion.div
          className={"text-xs text-slate-11 pt-[0rem]"}
          animate={{ color: expanded ? `var(--slate-12)` : `var(--slate-11)` }}
        >
          {formattedMarketCap}
        </motion.div>
        <AnimatePresence>
          {expanded && (
            <motion.span
              className={"text-[0.6rem] text-right text-slate-a11"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              market cap
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
