"use client";

import { AiOutlineLink } from "react-icons/ai";
import { SigmaUsStocksYesterday } from "../page";
import MainBoxRow from "./MainBoxRow";
import { useState } from "react";

export default function MainBox({ data }: { data: SigmaUsStocksYesterday[] }) {
  const [expandedList, setExpandedList] = useState<boolean[]>(
    data.map(() => false)
  );

  function handleExpand(index: number) {
    const newExpandedList = expandedList.map((value, i) =>
      i === index ? !value : false
    );

    setExpandedList(newExpandedList);
  }

  return (
    <div className="relative flex flex-col w-full gap-3">
      {data.length > 0
        ? data.map((entry, i) => (
            <MainBoxRow
              key={entry.ticker}
              entry={entry}
              onClick={() => handleExpand(i)}
              expanded={expandedList[i]}
            />
          ))
        : [0, 1, 2, 3, 4].map((i) => (
            <>
              <div
                key={i}
                className="h-16 px-5 py-2 my-2 rounded-lg blur-sm w-100 bg-slate-5"
              >
                {" "}
              </div>
              <div className="absolute flex items-center justify-center w-full h-full ">
                <div className="text-2xl font-light text-slate-10">
                  Loading...
                </div>
              </div>
            </>
          ))}
    </div>
  );
}
