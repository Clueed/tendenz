"use client";

import { useState } from "react";
import "./App.css";
import { BsFillCalendarFill } from "react-icons/bs";
import MainBox from "./components/MainBox/MainBox";
import { useSpring, animated } from "@react-spring/web";

function App() {
  const springs = useSpring({
    from: { x: 0 },
    to: { x: 100 },
  });

  return (
    <>
      <div className="Back">
        <div className="FrontPage">
          <div className="BigP">Lorem ipsum dolor sit amet.</div>
          <div className="SmallP">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            assumenda quos maiores. Nulla neque ducimus molestiae quaerat
            labore, iure cumque!
          </div>
          <div className="bg-gradient-to-t Background">
            <div className="max-w-5xl Flexbox">
              <div>
                <MainBox>Today</MainBox>
              </div>
              <MainBox>Yesterday</MainBox>
              <MainBox>Trailing Week</MainBox>
              <MainBox>Trailing Month</MainBox>
            </div>
          </div>
        </div>
        <animated.div
          style={{
            width: 80,
            height: 80,
            background: "#ff6d6d",
            borderRadius: 8,
            ...springs,
          }}
        />
      </div>
    </>
  );
}

export default App;
