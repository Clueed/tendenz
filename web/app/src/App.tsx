import { useState } from "react";
import "./App.css";
import { BsFillCalendarFill } from "react-icons/bs";
import MainBox from "./components/MainBox/MainBox";
import "./App.css";

function App() {
  return (
    <>
      <div className="FrontPage"> </div>
      <div className="bg-gradient-to-t Background">
        <div className="max-w-5xl Flexbox">
          <MainBox>Yesterday</MainBox>
          <MainBox>Trailing Week</MainBox>
          <MainBox>Trailing Month</MainBox>
          <MainBox>Trailing Year</MainBox>
        </div>
      </div>
    </>
  );
}

export default App;
