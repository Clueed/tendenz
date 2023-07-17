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
        <div className="Tendenz">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 346.04 50.91">
            <path
              d="M2.78,17.28V9.54H43.4v7.74H27.67V60.45H18.52V17.28Z"
              transform="translate(-2.78 -9.54)"
            />
            <path
              d="M54.11,60.45V9.54h34.3v8.88H64.87V30.55H86.65v8.87H64.87V51.58H88.51v8.87Z"
              transform="translate(-2.78 -9.54)"
            />
            <path
              d="M143.25,9.54V60.45H132.81L112.55,31.07h-.33V60.45H99.92V9.54h10.59l20,29.34H131V9.54Z"
              transform="translate(-2.78 -9.54)"
            />
            <path
              d="M173.47,60.45H153.88V9.54h19.39a28.56,28.56,0,0,1,13.58,3.05,21.27,21.27,0,0,1,8.85,8.75A28.08,28.08,0,0,1,198.82,35a28.07,28.07,0,0,1-3.11,13.66,21.21,21.21,0,0,1-8.8,8.75A28.07,28.07,0,0,1,173.47,60.45ZM167.7,48.72H173a15.34,15.34,0,0,0,6.45-1.22,8.28,8.28,0,0,0,4.08-4.2,20,20,0,0,0,1.4-8.3,19.62,19.62,0,0,0-1.43-8.3,8.29,8.29,0,0,0-4.17-4.2,16.49,16.49,0,0,0-6.73-1.22H167.7Z"
              transform="translate(-2.78 -9.54)"
            />
            <path
              d="M209.26,60.45V9.54h35.49v10H221.56V30h21.38V40H221.56V50.46h23.19v10Z"
              transform="translate(-2.78 -9.54)"
            />
            <path
              d="M299.11,9.54V60.45h-9.29l-22.15-32h-.38v32H256.53V9.54H266l22,32h.45v-32Z"
              transform="translate(-2.78 -9.54)"
            />
            <path
              d="M311.14,60.45V54.71l26.1-37.43H311V9.54h37.68v5.75L322.6,52.72h26.22v7.73Z"
              transform="translate(-2.78 -9.54)"
            />
          </svg>
        </div>
        <div>
          <AiFillQuestionCircle className="Question"></AiFillQuestionCircle>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
