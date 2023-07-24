"use client";
import Pop from "./Pop";
import { npl } from "./naturalLanguageProcessing";

export function ExplainingTitle({ date }: { date: string }) {
  return (
    <div className="p-5 mt-8 mb-4">
      <h1 className="relative inline text-4xl font-normal text-indigo-11">
        {npl(date)}&apos;s anomalies
      </h1>
      <p className="mt-2 text-lg leading-relaxed text-slate-11">
        statistical probabilities of market close prices, <br />
        based on{" "}
        <Pop popover={"daily returns of each assets over the past two years"}>
          historical returns
        </Pop>
        , <br />
        in units of standard deviation (σ), <br />
        weighted by{" "}
        <Pop
          popover={
            "total dollar market value, calculated as all amount of outstanding stock times stock price"
          }
        >
          market capitalization.
        </Pop>
      </p>
    </div>
  );
}
