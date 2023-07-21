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
      <div className="inline-flex flex-col flex-wrap leading-none">
        <span
          className={classNames("text-xs text-slate-11", {
            "text-slate-12": expanded,
          })}
        >
          {sign}
          {label}
        </span>
        {expanded && (
          <span
            className={classNames("text-[0.6rem] text-right text-slate-a11")}
          >
            market cap
          </span>
        )}
      </div>
    </>
  );
}
