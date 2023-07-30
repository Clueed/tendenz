import { tendenzApiSigmaYesterday } from "@/app/page";
import { Variants, motion } from "framer-motion";
import SigmaCard from "./SigmaCard";
import useSWR from "swr";
import { NextPageButton } from "./NextPageButton";

const transition = {
  type: "spring",
  duration: 1,
  bounce: 0.35,
};

export const variants: Variants = {
  initial: {
    x: "2.5vw",
    opacity: 0,
    transition,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition,
  },
  exit: {
    x: "-2.5vw",
    opacity: 0,
    transition,
  },
};

export function Page({
  page,
  minMarketCap,
  expandedKey,
  last,
  handleNextPage,
}: {
  page: number;
  minMarketCap: number;
  expandedKey: string;
  last: boolean;
  handleNextPage: () => void;
}) {
  const url = `https://tendenz-server.fly.dev/${page}?minMarketCap=${minMarketCap}`;
  const { data, error, isLoading, isValidating } =
    useSWR<tendenzApiSigmaYesterday[]>(url);

  if (error) {
    return <span>error</span>;
  }

  return (
    <>
      {data &&
        data.map((entry) => (
          <motion.div
            layout
            key={entry.ticker}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <SigmaCard
              entry={entry}
              key={entry.ticker}
              expanded={expandedKey === entry.ticker}
            />
          </motion.div>
        ))}
      {last && (
        <NextPageButton handleNextPage={handleNextPage} isLoading={isLoading} />
      )}
    </>
  );
}
