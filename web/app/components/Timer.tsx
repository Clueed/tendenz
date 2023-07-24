"use client";
import React from "react";
import Pop from "./Pop";

type Props = {};

export default function Timer({}: Props) {
  const timeTill = hoursUntilNextWeekdayHour(new Date(), 2);

  return (
    <Pop
      maxWidth="max-w-xs"
      popover={`${17} hours until next update. Data is updated early in the morning after trading days.`}
    >
      <div className="flex items-center gap-1.5 px-3 py-1 stroke-2 rounded-xl bg-slate-6 text-slate-11">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com
          License - https://fontawesome.com/license (Commercial License)
          Copyright 2023 Fonticons, Inc.
          <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
        </svg>
        <div className="leading-none"></div>
        {timeTill}h
      </div>
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
