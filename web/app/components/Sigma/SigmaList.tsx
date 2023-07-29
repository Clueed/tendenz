"use client";
import { MarketCapDataObject } from "../../page";
import Timer from "../Timer";
import { npl } from "@/app/misc/naturalLanguageProcessing";
import { SigmaAccordion } from "./SigmaAccordion";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { AnimatePresence, motion, useAnimate } from "framer-motion";

export default function SigmaList({ data }: { data: MarketCapDataObject }) {
  const defaultKey = "1B";
  const [inputKey, setValue] = useState<keyof MarketCapDataObject>(defaultKey);

  return (
    <div className="relative">
      <div className="grid grid-cols-default my-[2.5vw] gap-y-[2vw]">
        <div className="flex justify-between col-start-2">
          <h1 className="text-4xl font-normal text-indigo-11">
            {
              //npl(data.entries[0].last.date)
            }
            &apos;s anomalies
          </h1>
          <Timer />
        </div>
        <div className="flex justify-between col-start-2 align-bottom">
          <div>
            <h2 className="text-3xl font-normal text-slate-12">stocks</h2>
            <span className="text-base text-slate-11">United States</span>
          </div>
          <div className="flex flex-col items-end justify-end ">
            <ToggleGroup.Root
              type="single"
              value={inputKey}
              onValueChange={(value) => {
                if (value) setValue(value as keyof MarketCapDataObject);
                {
                  // value is guarenteed to be a key because the values are directly created from the keys below
                }
              }}
              asChild
            >
              <div className="inline-flex text-xs rounded-xl overflow-clip bg-slate-a3 text-slate-11">
                {Object.keys(data).map((marketCapBucket) => (
                  <ToggleGroup.Item
                    key={marketCapBucket}
                    value={marketCapBucket}
                    className={classNames(
                      "gap-2 px-2 py-1 first:pl-3 last:pr-3 transition-all",
                      {
                        "hover:bg-slate-a5 hover:text-slate-12":
                          inputKey !== marketCapBucket,
                      },
                      {
                        "bg-slate-2 text-slate-12":
                          inputKey === marketCapBucket,
                      }
                    )}
                  >
                    {marketCapBucket}
                  </ToggleGroup.Item>
                ))}
              </div>
            </ToggleGroup.Root>
            <div className="pt-1 pr-3 text-xs text-slate-11">
              minimum market cap
            </div>
          </div>
          {
            // <Timer />
          }
        </div>
      </div>
      <div className="h-[40rem] overflow-clip">
        <AnimatePresence>
          <motion.div
            layout
            key={inputKey}
            initial={{ x: 250, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { delay: 0.5, type: "spring" },
            }}
            exit={{ x: -250, opacity: 0 }}
          >
            <SigmaAccordion data={data[inputKey].entries} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
