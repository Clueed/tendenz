"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { tendenzApiSigmaYesterdayDay } from "../../page";
import { npl } from "../naturalLanguageProcessing";
import { motion } from "framer-motion";

export function SigmaCardBody({
  last,
  secondLast,
}: {
  last: tendenzApiSigmaYesterdayDay;
  secondLast: tendenzApiSigmaYesterdayDay;
}) {
  const formattedLastClose = "$" + last.close.toFixed(2);
  const formattedSecondLastClose = "$" + secondLast.close.toFixed(2);
  const dailyReturn = useMemo(
    () => ((1 - secondLast.close / last.close) * 100).toFixed(2) + "%",
    [secondLast.close, last.close]
  );

  let arrowCol = useRef<HTMLDivElement>(null);

  const [arrowWidth, setArrowWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (arrowCol.current) {
      setArrowWidth(arrowCol.current.offsetWidth * 51.2 - 512);
    }
  }, [arrowCol]);

  console.log("arrowWidth :>> ", arrowWidth);

  return (
    <div className="flex justify-around gap-2 mt-3 text-slate-12">
      <div className="flex flex-col p-2 text-right">
        <div className="text-xl">{formattedSecondLastClose}</div>
        <div className="text-xs leading-tight text-slate-a12">
          {npl(last.date)}
        </div>
        <div className="text-[0.6rem] leading-tight text-slate-a11">
          close price
        </div>
      </div>
      <div ref={arrowCol} className="flex-grow text-indigo-12">
        {arrowWidth && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="10px"
            viewBox={`0 0 ${512 + arrowWidth} 512`}
            fill="currentColor"
          >
            Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com
            License - https://fontawesome.com/license (Commercial License)
            Copyright 2023 Fonticons, Inc.{" "}
            <path d={convertStringByOffset(arrowWidth)} />
          </svg>
        )}
      </div>
      <div className="flex flex-col p-2 text-right">
        <div className="text-xl">{formattedLastClose}</div>
        <div className="text-xs leading-tight text-slate-a12">
          {npl(secondLast.date)}
        </div>
        <div className="text-[0.6rem] leading-tight text-slate-a11">
          close price
        </div>
      </div>
      <div className="flex flex-col p-2 text-right">
        <div className="text-lg">{dailyReturn}</div>
        <div className="leading-tight text-2xs">return</div>
      </div>
      <div className="w-5 place-self-end text-indigo-11">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com
          License - https://fontawesome.com/license (Commercial License)
          Copyright 2023 Fonticons, Inc.
          <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z" />
        </svg>
      </div>
    </div>
  );
}

function convertStringByOffset(offset: number): string {
  // prettier-ignore
  return`
M ${(459.908+offset).toFixed(3)} 256.471 
C ${(472.408+offset).toFixed(3)} 243.971 ${(472.408+offset).toFixed(3)} 223.671 ${(459.908+offset).toFixed(3)} 211.171 
L ${(299.908+offset).toFixed(3)} 51.171 
C ${(287.408+offset).toFixed(3)} 38.671 ${(267.108+offset).toFixed(3)} 38.671 ${(254.608+offset).toFixed(3)} 51.171 
C ${(242.108+offset).toFixed(3)} 63.671 ${(242.108+offset).toFixed(3)} 83.971 ${(254.608+offset).toFixed(3)} 96.471 
L ${(360.108+offset).toFixed(3)} 201.871 
L 53.308 201.871 
C 35.608 201.871 21.308 216.171 21.308 233.871 
C 21.308 251.571 35.608 265.871 53.308 265.871 
L ${(360.008+offset).toFixed(3)} 265.871 
L ${(254.708+offset).toFixed(3)} 371.271 
C ${(242.208+offset).toFixed(3)} 383.771 ${(242.208+offset).toFixed(3)} 404.071 ${(254.708+offset).toFixed(3)} 416.571 
C ${(267.208+offset).toFixed(3)} 429.071 ${(287.508+offset).toFixed(3)} 429.071 ${(300.008+offset).toFixed(3)} 416.571 
L ${(460.008+offset).toFixed(3)} 256.571 
L ${(459.908+offset).toFixed(3)} 256.471 
Z
`;
}
