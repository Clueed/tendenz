"use client";

import classNames from "classnames";
import { tendenzApiSigmaYesterday } from "../page";
import * as Accordion from "@radix-ui/react-accordion";
import { MarketCap } from "./MarketCap";
import { MainBoxRowSecond } from "./MainBoxRowSecond";
import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  PanInfo,
  motion,
  useAnimate,
  useAnimationControls,
  useMotionValue,
  useTransform,
} from "framer-motion";
import exp from "constants";

export default function MainBoxRow({
  entry,
  expanded,
}: {
  entry: tendenzApiSigmaYesterday;
  expanded: boolean;
}) {
  const lastClose = formatDollar(entry.last.close);
  const secondLastClose = formatDollar(entry.secondLast.close);
  const sigma = r(entry.sigma);
  const dailyReturn = useMemo(
    () => r((1 - entry.secondLast.close / entry.last.close) * 100, 1) + "%",
    [entry.secondLast.close, entry.last.close]
  );

  const name = entry.name;

  const { formattedName, shareTypes } = useMemo(
    () => handleTickerTypes(name),
    [name]
  );

  const animationControls = useAnimationControls();

  const [drag, setDrag] = useState<false | "x">(false);

  useEffect(() => {
    setPosition(0);
  }, [expanded]);

  const [position, setPosition] = useState<number>(0);
  const x = useMotionValue(0);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const width = useTransform(x, [0, -50], [30, 100]);
  const width2 = useTransform(x, [0, -50], [0, 70]);
  const opacity = useTransform(x, [0, -50], [1, 1]);
  const zIndex = useTransform(x, [0, -50], [-10, 10]);
  const bg = useTransform(x, [0, -50], ["#00000000", "var(--violet-8)"]);

  useEffect(() => {
    x.set(position);
  }, [position, x]);
  return (
    <Accordion.Item value={entry.ticker} className="relative">
      <motion.div
        drag={"x"}
        dragListener={expanded}
        style={{ x }}
        dragSnapToOrigin={false}
        dragConstraints={{ right: 0, left: -50 }}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 50 }}
        dragMomentum={false}
        dragElastic={0.1}
        onDragEnd={(event, info) => {
          console.log("info.offset.x :>> ", info.offset.x);
          if (50 < Math.abs(info.offset.x)) {
            setPosition(-50);
          } else {
            setPosition(0);
          }
        }}
        animate={{ x: position }}
        className="relative mr-5"
      >
        <motion.div
          animate={{
            backgroundImage: expanded
              ? "linear-gradient(to bottom right, var(--tw-gradient-stops))"
              : "none",
            transition: { type: "spring", duration: 5, staggerChildren: 1 },
          }}
          className="px-3 py-3 rounded-xl from-sky-4 to-indigo-6"
        >
          <Accordion.Trigger asChild>
            <div
              className={
                "grid w-100 grid-cols-[7rem_auto] gap-x-4 items-start cursor-pointer"
              }
            >
              <div className="grid grid-cols-[auto_min-content] items-baseline">
                <div className="text-3xl leading-none text-right text-indigo-12">
                  {sigma}
                </div>
                <div className="ml-1 text-xl text-slate-10">σ</div>
                <MarketCap marketCap={entry.marketCap} expanded={expanded} />
              </div>

              <motion.div
                animate={{
                  height: expanded ? "auto" : "calc(1.425*1.125rem*2)",
                  transition: { type: "spring", duration: 3 },
                }}
                className={"text-lg leading-[1.425] overflow-clip"}
              >
                <span className="mr-1 text-slate-11">{entry.ticker}</span>
                {"  "}

                <span className="text-slate-12">{formattedName}</span>
                {shareTypes.map((type) => (
                  <>
                    {" "}
                    <motion.span
                      animate={{
                        opacity: expanded ? 1 : 0,
                        transition: { type: "spring", duration: 0.5, delay: 1 },
                      }}
                      key={type}
                      className="text-[0.6em] text-slate-11 bg-slate-a3 rounded-md px-2 py-1"
                    >
                      {type}
                    </motion.span>
                  </>
                ))}
              </motion.div>
            </div>
          </Accordion.Trigger>
          <AnimatePresence>
            {expanded && (
              <Accordion.Content asChild forceMount>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{
                    height: "auto",
                    transition: { type: "spring", duration: 2 },
                  }}
                  exit={{ height: 0 }}
                  className={"overflow-hidden"}
                >
                  <MainBoxRowSecond
                    lastClose={lastClose}
                    secondLastClose={secondLastClose}
                    dailyReturn={dailyReturn}
                  />
                </motion.div>
              </Accordion.Content>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute top-0 flex items-center justify-center h-full px-2 opacity-0 text-violet-11"
        style={{ zIndex, width: width2 }}
        animate={{
          opacity: expanded ? 1 : 0,
          right: expanded ? 0 : 10,
          transition: { delay: 0.1 },
        }}
      >
        <motion.a
          href={`https://finance.yahoo.com/quote/${entry.ticker}`}
          target="_blank"
          onClick={() => {
            setPosition(0);
          }}
          style={{ backgroundColor: bg }}
          className="px-1 rounded-sm"
        >
          {"<"}
        </motion.a>
      </motion.div>
      <motion.div
        className="absolute top-0 flex items-center justify-end h-full px-1 pr-2 opacity-0 -z-20 overflow-clip bg-gradient-to-br from-violet-4 to-violet-5 rounded-r-xl"
        style={{ width }}
        animate={{
          opacity: expanded ? 1 : 0,
          right: expanded ? 0 : 10,
          transition: { delay: 0 },
        }}
      ></motion.div>
    </Accordion.Item>
  );
}

function handleTickerTypes(name: string | null) {
  let formattedName = name;
  let shareTypes: string[] = [];

  if (formattedName === null) {
    return { formattedName, shareTypes };
  }

  for (const type of ["Common Stock", "Ordinary Shares", "Class A"]) {
    if (formattedName!.search(type) !== -1) {
      formattedName = formattedName!.replace(type, "");
      shareTypes.push(type);
    }
  }

  shareTypes = shareTypes.map((type) =>
    type.replace(" ", String.fromCharCode(160))
  );

  return { formattedName, shareTypes };
}

function r(n: number, digits = 2): string {
  return n.toFixed(digits);
}

function formatDollar(n: number): string {
  return "$" + r(n);
}
