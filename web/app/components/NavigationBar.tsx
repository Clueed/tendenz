import React from "react";
import { AiFillGithub, AiFillQuestionCircle } from "react-icons/ai";
import { Logo } from "./Logo";

const NavigationBar = () => {
  return (
    <div>
      <div className="flex flex-row h-[10vh] mb-[5vh]">
        <div>
          <AiFillGithub className="flex justify-start flex-1 mt-2 text-2xl" />
        </div>
        <div className="flex-1 h-4 text-slate-7">
          <Logo />
        </div>
        <div>
          <AiFillQuestionCircle className="flex flex-1 mt-2 text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
