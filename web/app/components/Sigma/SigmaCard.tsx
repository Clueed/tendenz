"use client";

import { tendenzApiSigmaYesterday } from "../../page";
import * as Accordion from "@radix-ui/react-accordion";
import { AnimatePresence, motion } from "framer-motion";
import { SigmaCardHeader } from "./SigmaCardHeader";
import { SigmaCardBody } from "./SigmaCardBody";

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
      className="transition-all duration-500 ease-in-out rounded-xl hover:bg-gradient-to-br from-sky-a4 to-indigo-a5 data-[state=open]:bg-gradient-to-br py-3 px-3"
    >
      <Accordion.Trigger>
        <SigmaCardHeader
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
              <SigmaCardBody last={entry.last} secondLast={entry.secondLast} />
            </motion.div>
          </Accordion.Content>
        )}
      </AnimatePresence>
    </Accordion.Item>
  );
}
