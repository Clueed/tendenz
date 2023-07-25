"use client";

import { AnimatePresence, motion } from "framer-motion";
import { getMarketCapCategory } from "../../misc/getMarketCapCategory";

export function MarketCap({
  marketCap,
  expanded,
}: {
  marketCap: number;
  expanded: boolean;
}) {
  const label = getMarketCapCategory(marketCap);
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
