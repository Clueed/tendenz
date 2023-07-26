import React from "react";
import { Logo } from "./Logo";
import Link from "next/link";
import Timer from "../Timer";

export default function NavigationBar() {
  return (
    <nav className="flex w-full justify-between items-center py-8 px-[10vw] sticky top-0 z-50 bg-slate-3 shadow-xl shadow-slate-a2">
      <Link href="/" className="w-32 text-indigo-a12">
        <Logo />
      </Link>
    </nav>
  );
}
