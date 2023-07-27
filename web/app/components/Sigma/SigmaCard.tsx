"use client";

import { tendenzApiSigmaYesterday } from "../../page";
import * as Accordion from "@radix-ui/react-accordion";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { SigmaCardHeader } from "./SigmaCardHeader";
import { SigmaCardBody } from "./SigmaCardBody";
import classNames from "classnames";

export default function SigmaCard({
  entry,
  expanded,
}: {
  entry: tendenzApiSigmaYesterday;
  expanded: boolean;
}) {
  const bgClassNames =
    "absolute top-0 right-0 w-full h-full shadow-sm -z-10 sm:rounded-xl col-span-full sm:col-start-2 sm:col-end-2";

  return (
    <Accordion.Item
      value={entry.ticker}
      className="relative grid py-2 grid-cols-default group"
    >
      <motion.div
        className={classNames(
          bgClassNames,
          "from-sky-a4 to-indigo-a5 bg-gradient-to-br"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <div
        className={classNames(
          bgClassNames,
          "bg-slate-a4 transition-opacity opacity-0",
          { "group-hover:opacity-100": !expanded }
        )}
      />
      <div className="col-start-2 col-end-2 @container">
        <Accordion.Trigger>
          <SigmaCardHeader
            expanded={expanded}
            name={entry.name!}
            sigma={entry.sigma}
            marketCap={entry.marketCap}
            ticker={entry.ticker}
          />
        </Accordion.Trigger>
      </div>
      <div className="col-span-2 col-start-2 sm:col-span-1 sm:col-start-2 @container">
        <AnimatePresence presenceAffectsLayout>
          {expanded && (
            <Accordion.Content asChild forceMount>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.5,
                }}
                className={"overflow-hidden"}
              >
                <SigmaCardBody
                  last={entry.last}
                  secondLast={entry.secondLast}
                  ticker={entry.ticker}
                />
              </motion.div>
            </Accordion.Content>
          )}
        </AnimatePresence>
      </div>
    </Accordion.Item>
  );
}
