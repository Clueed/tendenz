"use client";
import classNames from "classnames";

export function MarketCap({
  marketCap,
  expanded,
}: {
  marketCap: number;
  expanded: boolean;
}) {
  let label: string;

  if (marketCap > 1000000000000) {
    label = "1T";
  } else if (marketCap > 500000000000) {
    label = "500B";
  } else if (marketCap > 100000000000) {
    label = "100B";
  } else if (marketCap > 50000000000) {
    label = "50B";
  } else if (marketCap > 10000000000) {
    label = "10B";
  } else if (marketCap > 1000000000) {
    label = "1B";
  } else if (marketCap > 100000000) {
    label = "100M";
  } else if (marketCap > 50000000) {
    label = "50M";
  } else if (marketCap > 10000000) {
    label = "10M";
  } else {
    label = "1M";
  }

  let sign: string;
  if (marketCap > 1000000) {
    sign = ">";
  } else {
    sign = "<";
  }

  return (
    <>
      <div className="inline-flex flex-row-reverse gap-x-2 items-baseline flex-wrap leading-none text-right">
        <span
          className={classNames(
            "text-xs text-slate-11 group-radix-state-open:text-slate-12"
          )}
        >
          {sign}
          {label}
        </span>
        <span
          className={classNames(
            "text-[0.6rem] text-right text-slate-a11 hidden group-radix-state-open:inline"
          )}
        >
          market cap
        </span>
      </div>
    </>
  );
}
