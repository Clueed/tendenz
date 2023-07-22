import React from "react";
import { Logo } from "./Logo";
import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav className="flex w-full justify-around items-center py-8 px-[7.5vw] sticky top-0 z-50 bg-slate-3 shadow-xl shadow-slate-a2">
      <Link href="/" className="h-4 text-indigo-a12">
        <Logo />
      </Link>
    </nav>
  );
}
