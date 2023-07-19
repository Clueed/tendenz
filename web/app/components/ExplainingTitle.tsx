"use client";

import Link from "next/link";
import React, { useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
export function ExplainingTitle({ text }: { text: string }) {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={
        "cursor-pointer mt-8 mb-4 py-5 px-5 " +
        (expanded && "bg-gradient-to-br from-slate-a1 to-slate-a3 rounded-md ")
      }
    >
      <h1 className="relative inline text-5xl font-normal text-indigo-11">
        {text}
      </h1>{" "}
      <AiFillQuestionCircle className="inline align-super top-0 right-[-3.1rem] w-6 h-6 text-indigo-a11 opacity-50" />
      {expanded && (
        <>
          <div className="pt-3 border-indigo-a6 ">
            <p className="leading-relaxed text-indigo-12 ">
              We track all financial instruments with a two year history. Each
              day on market close we calculate statistical probabilities on the
              respective close price based on the historical returns of the
              asset. These probabilities are presented below in units of
              standard deviation (σ) and weight by market captilazition.
            </p>
            <div className="flex justify-start pt-3">
              <Link
                href=""
                className="px-4 py-2 text-sm rounded-md bg-indigo-a5 text-indigo-12"
              >
                Learn more...
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
