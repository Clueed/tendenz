import * as Accordion from "@radix-ui/react-accordion";
import { AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { Page } from "./Page";

export function SigmaAccordion({ minMarketCap }: { minMarketCap: number }) {
  const [expandedKey, setExpandedKey] = useState<string>("");

  useEffect(() => {
    setExpandedKey("");
    setPageIndex(1);
  }, [minMarketCap]);

  const [pageIndex, setPageIndex] = useState<number>(1);

  function handleNextPage() {
    const nextPage = pageIndex + 1;
    setPageIndex(nextPage);
  }

  const pages = [];
  for (let i = 0; i < pageIndex; i++) {
    pages.push(
      <Page
        page={i}
        minMarketCap={minMarketCap}
        expandedKey={expandedKey}
        last={i === pageIndex - 1}
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
