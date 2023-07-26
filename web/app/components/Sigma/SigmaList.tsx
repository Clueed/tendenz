"use client";
import * as Accordion from "@radix-ui/react-accordion";
import { useState } from "react";
import { tendenzApiSigmaYesterday } from "../../page";
import SigmaCard from "./SigmaCard";
import Timer from "../Timer";
import { motion } from "framer-motion";

export default function SigmaList({
  data,
}: {
  data: tendenzApiSigmaYesterday[];
}) {
  const [expandedKey, setOpen] = useState<string>("");

  return (
    <>
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-normal text-slate-12">stocks</h2>
          <span className="text-base text-slate-11">United States</span>
        </div>
        <Timer />
      </div>

      <Accordion.Root
        collapsible
        type="single"
        className="relative flex flex-col w-full gap-3"
        onValueChange={(o) => setOpen(o)}
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
    </>
  );
}
