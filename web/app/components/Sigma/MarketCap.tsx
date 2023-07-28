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
        layout="preserve-aspect"
        className={classNames(
          "inline-flex items-center flex-wrap leading-none gap-x-2",
          className
        )}
      >
        <motion.div
          layout="preserve-aspect"
          className={classNames("text-xs", {
            "text-slate-12": expanded,
            "text-slate-11": !expanded,
            "order-2": expandDirection === "left",
          })}
        >
          {formattedMarketCap}
        </motion.div>
        <AnimatePresence mode="wait" presenceAffectsLayout>
          {expanded && (
            <motion.span
              layout="size"
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              exit={{ width: 0 }}
              transition={{ duration: 1 }}
              className={classNames(
                "text-[0.6rem] text-slate-a11 line-clamp-1 truncate",
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
