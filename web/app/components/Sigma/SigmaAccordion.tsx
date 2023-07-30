import { tendenzApiSigmaYesterday } from "@/app/page";
import * as Accordion from "@radix-ui/react-accordion";
import { AnimatePresence, Variants, motion } from "framer-motion";
import SigmaCard from "./SigmaCard";
import { useEffect, useState } from "react";
import useSWR from "swr";

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

function Page({
  page,
  minMarketCap,
  expandedKey,
}: {
  page: number;
  minMarketCap: number;
  expandedKey: string;
}) {
  const url = `https://tendenz-server.fly.dev/${page}?minMarketCap=${minMarketCap}`;
  const { data, error, isLoading, isValidating } = useSWR(url);

  console.log("data :>> ", data);

  if (isLoading) {
    return <span>loading</span>;
  }
  if (isValidating) {
    return <span>validating</span>;
  }
  if (error) {
    return <span>error</span>;
  }
  if (data) {
    return data.map((entry) => (
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
    ));
  }
}

export function SigmaAccordion({ minMarketCap }: { minMarketCap: number }) {
  const [expandedKey, setExpandedKey] = useState<string>("");

  useEffect(() => {
    setExpandedKey("");
    setPage(1);
  }, [minMarketCap]);

  const [page, setPage] = useState<number>(1);

  function handleNextPage() {
    const nextPage = page + 1;
    setPage(nextPage);
  }

  const pages = [];
  for (let i = 0; i < page; i++) {
    pages.push(
      <Page page={i} minMarketCap={minMarketCap} expandedKey={expandedKey} />
    );
  }

  return (
    <Accordion.Root
      collapsible
      type="single"
      onValueChange={(o) => setExpandedKey(o)}
      asChild
    >
      <AnimatePresence presenceAffectsLayout mode="popLayout" initial={false}>
        {pages}
        <button onClick={handleNextPage}>Next</button>
      </AnimatePresence>
    </Accordion.Root>
  );
}
