import React from "react";
import { AiFillGithub, AiFillQuestionCircle } from "react-icons/ai";
import "./NavigationBar.css";

const NavigationBar = () => {
  return (
    <div className="Check">
      <div className="FlexBox">
        <div>
          <AiFillGithub className="GitHub"></AiFillGithub>
        </div>
        <div className="Tendenz">TENDENZ</div>
        <div>
          <AiFillQuestionCircle className="Question"></AiFillQuestionCircle>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
