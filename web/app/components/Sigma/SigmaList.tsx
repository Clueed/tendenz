"use client";

import Timer from "../Timer";
import { npl } from "@/app/misc/naturalLanguageProcessing";
import { SigmaAccordion } from "./SigmaAccordion";
import { useState } from "react";
import MarketCapFilter from "./MarketCapFilter";

import { MarketCapBucket } from "@/app/page";

export default function SigmaList({
  marketCapBuckets,
}: {
  marketCapBuckets: MarketCapBucket[];
}) {
  const defaultKey = "1b";
  const [bucketKey, setBucketKey] = useState(defaultKey);
  const minMarketCap = marketCapBuckets.filter(
    (bucket) => bucket.label === bucketKey
  )[0].minMarketCap;

  return (
    <div className="relative">
      <div className="grid grid-cols-default my-[2.5vw]">
        <div className="flex justify-between col-start-2 mb-3">
          <h1 className="text-4xl font-normal text-indigo-11">
            {
              //npl(data[0].last.date)
            }
            &apos;s anomalies
          </h1>
          <Timer />
        </div>
        <div className="flex items-end justify-between col-start-2 mb-2 align-bottom">
          <h2 className="text-3xl font-normal leading-none text-slate-12">
            stocks
          </h2>
          <div>
            <MarketCapFilter
              selectedKey={bucketKey}
              selectKey={setBucketKey}
              allKeys={marketCapBuckets.map((bucket) => bucket.label)}
            />
          </div>
        </div>
        <div className="flex items-start justify-between col-start-2 align-top">
          <h3 className="text-base leading-none text-slate-11">
            United States
          </h3>
          <div className="mr-1 text-xxs text-slate-a10">minimum market cap</div>
        </div>
      </div>

      <SigmaAccordion minMarketCap={minMarketCap} />
    </div>
  );
}
