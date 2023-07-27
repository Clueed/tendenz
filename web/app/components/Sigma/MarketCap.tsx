"use client";

import { AnimatePresence, motion } from "framer-motion";
import { getMarketCapCategory } from "../../misc/getMarketCapCategory";
import classNames from "classnames";
import { Tag } from "./Tag";

export function MarketCap({
  marketCap,
  expanded,
  className,
  expandDirection,
}: {
  marketCap: number;
  expanded: boolean;
  expandDirection: "right" | "left";
  className?: string;
}) {
  const label = getMarketCapCategory(marketCap);
  const formattedMarketCap = marketCap > 1e6 ? label + "+" : ">" + label;

  return (
    <>
      <motion.div
        layout
        className={classNames(
          "inline-flex items-center flex-wrap leading-none gap-x-2",
          className
        )}
      >
        <div
          className={classNames("text-xs", {
            "text-slate-12": expanded,
            "text-slate-11": !expanded,
            "order-2": expandDirection === "left",
          })}
        >
          {formattedMarketCap}
        </div>
        <AnimatePresence mode="wait" presenceAffectsLayout>
          {expanded && (
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              exit={{ width: 0 }}
              className={classNames(
                "text-[0.6rem] text-slate-a11 line-clamp-1",
                { "order-1": expandDirection === "left" }
              )}
            >
              market cap
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
