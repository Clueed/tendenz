"use client";
import React from "react";
import Pop from "./Pop";
import classNames from "classnames";
import { motion } from "framer-motion";

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
            { "text-slate-12 shadow-2xl drop-shadow-xl bg-slate-7": open }
          )}
        >
          <motion.svg
            animate={{
              transform: open ? "rotate(360deg)" : "rotate(0deg)",
            }}
            transition={{ duration: 1, type: "spring" }}
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com
            License - https://fontawesome.com/license (Commercial License)
            Copyright 2023 Fonticons, Inc.
            <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
          </motion.svg>
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
