"use client";

import { useMemo } from "react";
import { tendenzApiSigmaYesterdayDay } from "../../page";
import { npl } from "../naturalLanguageProcessing";

export function SigmaCardBody({
  last,
  secondLast,
}: {
  last: tendenzApiSigmaYesterdayDay;
  secondLast: tendenzApiSigmaYesterdayDay;
}) {
  const formattedLastClose = "$" + last.close.toFixed(2);
  const formattedSecondLastClose = "$" + secondLast.close.toFixed(2);
  const dailyReturn = useMemo(
    () => ((1 - secondLast.close / last.close) * 100).toFixed(2) + "%",
    [secondLast.close, last.close]
  );
  return (
    <div className="flex justify-around gap-2 mt-3 text-slate-12">
      <div className="flex flex-col p-2 text-right">
        <div className="text-xl">{formattedSecondLastClose}</div>
        <div className="text-xs leading-tight text-slate-a12">
          {npl(last.date)}
        </div>
        <div className="text-[0.6rem] leading-tight text-slate-a11">
          close price
        </div>
      </div>
      <div className="flex flex-col p-2 text-right">
        <div className="text-xl">{dailyReturn}</div>
        <div className="text-xs leading-tight">return</div>
      </div>
      <div className="flex flex-col p-2 text-right">
        <div className="text-xl">{formattedLastClose}</div>
        <div className="text-xs leading-tight text-slate-a12">
          {npl(secondLast.date)}
        </div>
        <div className="text-[0.6rem] leading-tight text-slate-a11">
          close price
        </div>
      </div>
    </div>
  );
}
