import React from "react";
import { Logo } from "./Logo";
import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-start w-full pt-5 lg:justify-center">
      <Link
        href="/"
        className="w-[8.1rem] text-slate-1 bg-slate-a12 py-4 pl-6 pr-7 shadow-2xl rounded-r-xl lg:rounded-l-xl"
      >
        <Logo />
      </Link>
    </nav>
  );
}
