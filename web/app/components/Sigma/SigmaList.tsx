"use client";
import { MarketCapBucket, tendenzApiSigmaYesterday } from "../../page";
import Timer from "../Timer";
import { npl } from "@/app/misc/naturalLanguageProcessing";
import { SigmaAccordion } from "./SigmaAccordion";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useState } from "react";

export default function SigmaList({ data }: { data: MarketCapBucket[] }) {
  const [value, setValue] = useState("left");

  return (
    <div className="relative">
      <div className="grid grid-cols-default my-[2.5vw] gap-y-[2vw]">
        <h1 className="relative inline col-start-2 text-4xl font-normal text-indigo-11">
          {npl(data[0].entries[0].last.date)}&apos;s anomalies
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
              if (value) setValue(value);
            }}
            className="block bg-slate-a3 py-2 px-3 rounded-md"
          >
            <ToggleGroup.Item value="left">"100M"</ToggleGroup.Item>
            <ToggleGroup.Item value="center">"1B"</ToggleGroup.Item>
            <ToggleGroup.Item value="right">"15B"</ToggleGroup.Item>
          </ToggleGroup.Root>
          <Timer />
        </div>
      </div>

      <SigmaAccordion data={data[1].entries} />
    </div>
  );
}
