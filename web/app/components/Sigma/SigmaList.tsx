"use client";
import { MarketCapDataObject } from "../../page";
import Timer from "../Timer";
import { npl } from "@/app/misc/naturalLanguageProcessing";
import { SigmaAccordion } from "./SigmaAccordion";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useState } from "react";
import classNames from "classnames";

export default function SigmaList({ data }: { data: MarketCapDataObject }) {
  const [value, setValue] = useState<keyof MarketCapDataObject>("1B");

  return (
    <div className="relative">
      <div className="grid grid-cols-default my-[2.5vw] gap-y-[2vw]">
        <h1 className="relative inline col-start-2 text-4xl font-normal text-indigo-11">
          {
            //npl(data.entries[0].last.date)
          }
          &apos;s anomalies
        </h1>
        <div className="flex justify-between col-start-2">
          <div>
            <h2 className="text-3xl font-normal text-slate-12">stocks</h2>
            <span className="text-base text-slate-11">United States</span>
          </div>
          <ToggleGroup.Root
            type="single"
            value={value}
            onValueChange={(value) => {
              if (value) setValue(value as keyof MarketCapDataObject);
              {
                // value is guarenteed to be a key because the values are directly created from the keys below
              }
            }}
            className="flex gap-2 px-3 py-2 rounded-md bg-slate-a3"
          >
            {Object.keys(data).map((marketCapBucket) => (
              <ToggleGroup.Item
                key={marketCapBucket}
                value={marketCapBucket}
                className={classNames({
                  "bg-slate-9": value === marketCapBucket,
                })}
              >
                {marketCapBucket}
              </ToggleGroup.Item>
            ))}
          </ToggleGroup.Root>
          <Timer />
        </div>
      </div>

      <SigmaAccordion data={data[value].entries} />
    </div>
  );
}
