import { useState } from "react";
import "./App.css";
import { BsFillCalendarFill } from "react-icons/bs";
import MainBox from "./components/MainBox/MainBox";
import "./App.css";

function App() {
  return (
    <>
      <div className="BackgroundImage">
        <div className="bg-gradient-to-t Background">
          <p className="max-w-5xl">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic
            molestias, accusantium in aperiam quisquam iste esse non. Hic nulla,
            quis natus in architecto eligendi accusamus quasi nemo corporis
            aspernatur? Magnam hic explicabo necessitatibus? Recusandae
            aspernatur ducimus vitae quis ipsam, ad officia id deserunt tenetur
            quidem esse reiciendis fugit facere, iusto rem debitis in
            laboriosam, natus pariatur. Sit expedita architecto excepturi, quod
            repudiandae, tenetur laborum laboriosam magnam saepe totam unde!
            Quisquam maxime ab nostrum. Ad dolores autem alias error
            perspiciatis ullam libero? Expedita, iusto? Quisquam aliquid dolorem
            ea id aut quis laboriosam distinctio accusamus omnis odit,
            reprehenderit, soluta commodi est voluptatum.
          </p>
          <div className="max-w-5xl Flexbox">
            <MainBox>Yesterday</MainBox>
            <MainBox>Trailing Week</MainBox>
            <MainBox>Trailing Month</MainBox>
            <MainBox>Trailing Year</MainBox>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
