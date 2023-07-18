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
    <div className="flex flex-col w-full gap-3 ">
      {data.map((entry, i) => (
        <MainBoxRow
          key={entry.ticker}
          entry={entry}
          onClick={() => handleExpand(i)}
          expanded={expandedList[i]}
        />
      ))}
    </div>
  );
}
