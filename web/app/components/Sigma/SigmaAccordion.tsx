import { tendenzApiSigmaYesterday } from "@/app/page";
import * as Accordion from "@radix-ui/react-accordion";
import { AnimatePresence, Variants, motion } from "framer-motion";
import SigmaCard from "./SigmaCard";
import { useEffect, useState } from "react";

const transition = {
  type: "spring",
  duration: 1,
  bounce: 0.35,
};

export const variants: Variants = {
  initial: {
    x: "2.5vw",
    opacity: 0,
    transition,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition,
  },
  exit: {
    x: "-2.5vw",
    opacity: 0,
    transition,
  },
};

export function SigmaAccordion({ data }: { data: tendenzApiSigmaYesterday[] }) {
  const [expandedKey, setExpandedKey] = useState<string>("");

  useEffect(() => {
    setExpandedKey("");
  }, [data]);

  return (
    <Accordion.Root
      collapsible
      type="single"
      onValueChange={(o) => setExpandedKey(o)}
      asChild
    >
      <AnimatePresence presenceAffectsLayout mode="popLayout" initial={false}>
        {data.map((entry) => (
          <motion.div
            layout
            key={entry.ticker}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <SigmaCard entry={entry} expanded={expandedKey === entry.ticker} />
          </motion.div>
        ))}
      </AnimatePresence>
    </Accordion.Root>
  );
}
