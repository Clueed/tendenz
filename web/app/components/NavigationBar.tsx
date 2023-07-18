import React from "react";
import { AiFillGithub, AiFillQuestionCircle } from "react-icons/ai";
import { Logo } from "./Logo";
import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav className="flex w-full justify-between items-center py-10 px-[7.5vw]">
      <a href="https://www.github.com/Clueed/tendenz" target="_blank">
        <AiFillGithub className="h-5 w-5 text-slate-9" />
      </a>
      <Link href="/" className="h-4 text-slate-12">
        <Logo />
      </Link>
      <Link href="/">
        <AiFillQuestionCircle className="h-5 w-5 text-slate-9" />
      </Link>
    </nav>
  );
}
