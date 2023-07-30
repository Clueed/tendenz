import * as Accordion from "@radix-ui/react-accordion";
import { AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { NextPageButton } from "./NextPageButton";
import { Page } from "./Page";

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
      <Page
        page={i}
        minMarketCap={minMarketCap}
        expandedKey={expandedKey}
        last={i === page - 1}
        handleNextPage={handleNextPage}
      />
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
      </AnimatePresence>
    </Accordion.Root>
  );
}
