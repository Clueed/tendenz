"use client";
import classNames from "classnames";
import { ReactNode } from "react";

export function Tag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <>
      {" "}
      <span
        className={classNames(
          "text-[0.6em] text-slate-11 bg-slate-a3 rounded-md px-2 py-1",
          className
        )}
      >
        {children}
      </span>
    </>
  );
}
