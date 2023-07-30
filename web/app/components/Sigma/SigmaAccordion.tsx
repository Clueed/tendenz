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

  if (isLoading) {
    <div className="flex items-center justify-center">
      <div className="w-10 h-10 border-b-2 border-blue-500 rounded-full animate-spin"></div>
    </div>;
  }
  if (error) {
    return <span>error</span>;
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
        <motion.div
          whileInView={{
            y: [0, 15, 0],
            transition: {
              delay: 10,
              repeat: Infinity,
              repeatDelay: 10,
            },
          }}
          className="flex items-center justify-center"
        >
          <button
            onClick={handleNextPage}
            className="p-3 transition-all rounded-md hover:bg-slate-a5 bg-slate-a2 hover:shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
              fill="currentColor"
            >
              Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com
              License - https://fontawesome.com/license (Commercial License)
              Copyright 2023 Fonticons, Inc.{" "}
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          </button>
        </motion.div>
      </AnimatePresence>
    </Accordion.Root>
  );
}
