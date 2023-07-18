import React from "react";
import { AiFillGithub, AiFillQuestionCircle } from "react-icons/ai";
import { Logo } from "./Logo";
import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav className="flex w-full justify-between items-center py-10 px-[7.5vw] sticky top-0 z-50 bg-slate-3 shadow-xl shadow-slate-a2">
      <a href="https://www.github.com/Clueed/tendenz" target="_blank">
        <AiFillGithub className="w-5 h-5 text-slate-9" />
      </a>
      <Link href="/" className="h-4 text-slate-12">
        <Logo />
      </Link>
      <Link href="/">
        <AiFillQuestionCircle className="w-5 h-5 text-slate-9" />
      </Link>
    </nav>
  );
}
