import React from "react";
import { Logo } from "./Logo";
import Link from "next/link";
import Timer from "../Timer";

export default function NavigationBar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-start w-full py-5 ">
      <Link
        href="/"
        className="w-[8.1rem] text-slate-1 bg-slate-12 py-4 pl-6 pr-7 shadow-xl rounded-r-xl"
      >
        <Logo />
      </Link>
    </nav>
  );
}
