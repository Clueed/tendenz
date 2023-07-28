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
  return (
    <Accordion.Item
      value={entry.ticker}
      className="relative grid py-2 grid-cols-default group"
    >
      <div
        className={classNames(
          "absolute top-0 right-0 w-full h-full -z-10 sm:rounded-xl col-span-full sm:col-start-2 sm:col-end-2 transition-color",
          { "group-hover:bg-slate-a4 group-hover:shadow-sm": !expanded },
          { "from-sky-a4 to-indigo-a5 bg-gradient-to-br shadow-sm": expanded }
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
