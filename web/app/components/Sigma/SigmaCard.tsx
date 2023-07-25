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
      className="relative p-3 rounded-xl overflow-clip"
    >
      <motion.div
        className="absolute top-0 right-0 w-full h-full shadow-sm from-sky-a4 to-indigo-a5 bg-gradient-to-br -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.75, type: "spring" }}
      />
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
              }}
              exit={{ height: 0 }}
              className={"overflow-hidden"}
              transition={{
                type: "spring",
                duration: 0.75,
              }}
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
    </Accordion.Item>
  );
}
