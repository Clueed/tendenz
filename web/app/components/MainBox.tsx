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
    let newExpandedList: boolean[] = [];
    for (const i in expandedList) {
      if (i === index.toString()) {
        newExpandedList.push(true);
      } else {
        newExpandedList.push(false);
      }
    }

    setExpandedList(newExpandedList);
  }

  return (
    <div className="max-w-[85vw]">
      <div className="flex flex-col w-full gap-3">
        {data.map((entry, i) => (
          <MainBoxRow
            key={entry.ticker}
            entry={entry}
            onClick={() => handleExpand(i)}
            expanded={expandedList[i]}
          />
        ))}
      </div>
    </div>
  );
}
