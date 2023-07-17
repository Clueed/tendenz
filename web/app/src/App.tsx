"use client";

import { useState } from "react";
import "./App.css";
import { BsFillCalendarFill } from "react-icons/bs";
import MainBox from "./components/MainBox/MainBox";
import { useSpring, animated } from "@react-spring/web";
import NavigationBar from "./components/NavigationBar/NavigationBar";

function App() {
  return (
    <>
      <div>
        <div className="UpperBackground">
          <div className="ContentBox">
            <div>
              <NavigationBar></NavigationBar>
            </div>
            <div className="Heading">Objective insight across all markets</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

//   const springs = useSpring({
//     delay: 1000,
//     from: { y: 20, opacity: 0 },
//     to: { y: 0, opacity: 1 },
//   });

//   return (
//     <>
//       <div className="Back">
//         <div className="FrontPage">
//           <NavigationBar></NavigationBar>
//           <div className="BigP">Lorem ipsum dolor sit amet.</div>
//           <div className="SmallP">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
//             assumenda quos maiores. Nulla neque ducimus molestiae quaerat
//             labore, iure cumque!
//           </div>
//           <div className="bg-gradient-to-t Background">
//             <div className="max-w-5xl Flexbox">
//               <animated.div style={{ ...springs }}>
//                 <MainBox>Today</MainBox>
//               </animated.div>
//               <animated.div style={{ ...springs }}>
//                 <MainBox>Yesterday</MainBox>
//               </animated.div>
//               <animated.div style={{ ...springs }}>
//                 <MainBox>Trailing Week</MainBox>
//               </animated.div>
//               <animated.div style={{ ...springs }}>
//                 <MainBox>Trailing Month</MainBox>
//               </animated.div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
