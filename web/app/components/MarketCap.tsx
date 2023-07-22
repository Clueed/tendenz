"use client";
import classNames from "classnames";

export function MarketCap({ marketCap }: { marketCap: number }) {
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
      <div className="inline-flex flex-row-reverse flex-wrap items-baseline leading-none text-right gap-x-2">
        <span
          className={classNames(
            "text-xs text-slate-11 group-radix-state-open:text-slate-12 transition-colors duration-1000 delay-1000"
          )}
        >
          {sign}
          {label}
        </span>
        <span
          className={classNames(
            "text-[0.6rem] text-right text-slate-a11 opacity-0 group-radix-state-open:opacity-100 transition-opacity duration-1000 delay-1000"
          )}
        >
          market cap
        </span>
      </div>
    </>
  );
}
