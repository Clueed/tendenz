"use client";
import React from "react";
import Pop from "./Pop";
import classNames from "classnames";
import IconClock from "./IconClock";

export default function Timer() {
  const timeTill = hoursUntilNextWeekdayHour(new Date(), 2);

  return (
    <Pop
      popoverContent={
        <div className="w-40 text-slate-12">
          {timeTill} hours until the next update. Data is available after
          trading days with a 24 hour delay.
        </div>
      }
      popoverColor="slate"
    >
      {(open) => (
        <div
          className={classNames(
            "flex items-center gap-1.5 px-3 py-1 stroke-2 rounded-xl bg-slate-6 text-slate-11 backdrop-blur-xl",
            { "text-slate-12 shadow-2xl drop-shadow-xl": open }
          )}
        >
          <IconClock animationTrigger={open} />
          <div className="leading-none"></div>
          {timeTill}h
        </div>
      )}
    </Pop>
  );
}

function hoursUntilNextWeekdayHour(currentDate: Date, hour: number): number {
  const currentDay = currentDate.getUTCDay();

  let hoursRemaining = 0;

  if (currentDay === 5) {
    hoursRemaining = hour - currentDate.getUTCHours() + 24 * 3;
  } else if (currentDay === 6) {
    hoursRemaining = hour - currentDate.getUTCHours() + 24 * 2;
  } else {
    hoursRemaining = hour - currentDate.getUTCHours() + 24;
  }

  return hoursRemaining;
}
