import { tendenzApiSigmaYesterday } from "@/app/page";
import * as Accordion from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import SigmaCard from "./SigmaCard";
import { useEffect, useState } from "react";

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
      asChild
    >
      <motion.div layout="size" layoutRoot>
        {data.length > 0
          ? data.map((entry, i) => (
              <SigmaCard
                key={entry.ticker}
                entry={entry}
                expanded={expandedKey === entry.ticker}
              />
            ))
          : [...Array(4).keys()].map((i) => (
              <>
                <div
                  key={i}
                  className="h-16 px-5 py-2 my-2 rounded-lg blur-sm w-100 bg-slate-5"
                >
                  {" "}
                </div>
                <div className="absolute flex items-center justify-center w-full h-full ">
                  <div className="text-2xl font-light text-slate-10">
                    Loading...
                  </div>
                </div>
              </>
            ))}
      </motion.div>
    </Accordion.Root>
  );
}
