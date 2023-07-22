"use client";
import * as Popover from "@radix-ui/react-popover";
import { ReactNode } from "react";

function Pop({ children, popover }: { children: string; popover: ReactNode }) {
  return (
    <Popover.Root>
      <Popover.Trigger className="group">
        <span className="transition-colors border-b-2 border-slate-8 group-radix-state-open:border-indigo-12 group-radix-state-open:text-indigo-12">
          {children}
        </span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={5}
          className="z-50 px-4 py-3 rounded-md shadow-md text-base bg-indigo-12 leading-snug text-indigo-2 max-w-[var(--radix-popover-content-available-height)] w-[var(--radix-popover-trigger-width)] border-none"
          avoidCollisions
          collisionPadding={10}
        >
          {popover}
          <Popover.Arrow className="fill-indigo-12" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export function ExplainingTitle({ text }: { text: string }) {
  return (
    <div className="p-5 mt-8 mb-4">
      <h1 className="relative inline text-4xl font-normal text-indigo-11">
        {text}
      </h1>
      <p className="mt-2 text-lg leading-relaxed text-slate-11">
        statistical probabilities market close prices of based on{" "}
        <Pop popover={"daily returns of each assets over the past two years"}>
          historical returns
        </Pop>
        , <br />
        in units of standard deviation (σ), <br />
        weighted by{" "}
        <Pop
          popover={
            "total dollar market value, calculated as all amount of outstanding stock times stock price"
          }
        >
          market capitalization.
        </Pop>
      </p>
    </div>
  );
}
