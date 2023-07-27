"use client";

import { useMemo } from "react";
import { tendenzApiSigmaYesterdayDay } from "../../page";
import { npl } from "../../misc/naturalLanguageProcessing";
import { YahooButton } from "./YahooButton";
import classNames from "classnames";

export function SigmaCardBody({
  last,
  secondLast,
  ticker,
}: {
  last: tendenzApiSigmaYesterdayDay;
  secondLast: tendenzApiSigmaYesterdayDay;
  ticker: string;
}) {
  const formattedLastClose = "$" + last.close.toFixed(2);
  const formattedSecondLastClose = "$" + secondLast.close.toFixed(2);
  const dailyReturn = useMemo(
    () => (last.close / secondLast.close - 1) * 100,
    [secondLast.close, last.close]
  );

  const dailyReturnString = dailyReturn.toFixed(2) + "%";

  //const dailyReturnColor = dailyReturn > 0 ? "text-indigo-a9" : "text-red-a9";

  return (
    <div className="grid grid-cols-[1fr_7rem_repeat(content_fit,_2)_1fr] mt-4 text-right justify-between">
      <div className="text-xl col-start-2 row-start-1">
        {formattedSecondLastClose}
      </div>
      <div className="col-start-2">
        <div className="text-xs leading-tight text-slate-a12">
          {npl(secondLast.date)}
        </div>
        <div className="text-[0.6rem] leading-tight text-slate-a11">
          close price
        </div>
      </div>

      <div
        className={classNames(
          "col-start-3 row-start-1 text-xl"
          //dailyReturnColor
        )}
      >
        {dailyReturnString}
      </div>
      <div className="flex col-start-3 justify-self-end">
        <div className="text-xs leading-tight text-slate-a12">return</div>
      </div>

      <div className="text-xl col-start-4 row-start-1">
        {formattedLastClose}
      </div>
      <div className="col-start-4">
        <div className="text-xs leading-tight text-slate-a12">
          {npl(last.date)}
        </div>
        <div className="text-[0.6rem] leading-tight text-slate-a11">
          close price
        </div>
      </div>

      <div className="col-start-5 row-start-2">
        <div className="flex items-center justify-center">
          <YahooButton ticker={ticker} />
        </div>
      </div>
    </div>
  );
}