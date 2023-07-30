import React from "react";
import Pop from "./Pop";
import classNames from "classnames";
import IconClock from "./IconClock";
import { hoursUntilNextWeekdayHour } from "../misc/hoursUntilNextWeekdayHour";

export default function Timer() {
  const timeTill = hoursUntilNextWeekdayHour(2);

  return (
    <Pop
      offset={0}
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
            "flex items-center gap-1 px-2 py-1 stroke-2 rounded-md transition-all text-sm",
            {
              "text-slate-a11 bg-slate-a2 group-hover/popover:bg-slate-a5 group-hover/popover:shadow-sm":
                !open,
            },
            { "text-slate-2 bg-slate-a8 shadow-md": open }
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
