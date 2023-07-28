"use client";
import classNames from "classnames";
import { npl } from "../misc/naturalLanguageProcessing";
import Container from "./Container";
import Pop from "./Pop";

export function ExplainingTitle({ date }: { date: string }) {
  return (
    <div className="grid lg:text-center grid-cols-default">
      <h1 className="relative inline col-start-2 text-4xl font-normal text-indigo-11">
        {npl(date)}&apos;s anomalies
      </h1>
      <p className="col-start-2 mt-2 text-lg leading-relaxed text-slate-11 ">
        statistical probabilities of market close prices, <br />
        based on{" "}
        <ExplainingTitlePopover
          popoverText="daily returns of each assets over the past two years"
          triggerText="historical returns"
        />
        , <br />
        in units of standard deviation (σ), <br />
        weighted by{" "}
        <ExplainingTitlePopover
          popoverText="total dollar market value, calculated as all amount of outstanding
              stock times stock price"
          triggerText="market capitalization."
        />
      </p>
    </div>
  );
}

export function ExplainingTitlePopover({
  popoverText,
  triggerText,
}: {
  popoverText: string;
  triggerText: string;
}) {
  return (
    <Pop
      offset={4}
      popoverColor="indigo"
      popoverContent={
        <div className="text-indigo-12 w-[calc(var(--radix-popover-trigger-width)*1.5)] text-base leading-relaxed">
          {popoverText}
        </div>
      }
    >
      {(open) => (
        <span
          className={classNames("transition-colors border-b-2 border-slate-8", {
            "border-indigo-12 text-indigo-12": open,
          })}
        >
          {triggerText}
        </span>
      )}
    </Pop>
  );
}
