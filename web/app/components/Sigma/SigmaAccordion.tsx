import { tendenzApiSigmaYesterday } from "@/app/page";
import * as Accordion from "@radix-ui/react-accordion";
import { Variants, motion } from "framer-motion";
import SigmaCard from "./SigmaCard";
import { useEffect, useState } from "react";

const variants: Variants = {
  initial: {
    x: "10vw",
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: "-10vw",
    opacity: 0,
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
      className="relative flex flex-col w-full gap-3"
      onValueChange={(o) => setExpandedKey(o)}
    >
      {data.map((entry) => (
        <motion.div
          key={entry.ticker}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            type: "spring",
            duration: 0.75,
            bounce: 0.35,
          }}
        >
          <SigmaCard entry={entry} expanded={expandedKey === entry.ticker} />
        </motion.div>
      ))}
    </Accordion.Root>
  );
}
