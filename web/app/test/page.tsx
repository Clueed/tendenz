"use client";

import { motion } from "framer-motion";

export default function Page() {
  const width = 1000;
  return (
    <div className="w-10 h-10 text-slate-12">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox={`0 0 ${448 + width} 512`}
      >
        {" "}
        Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com
        License - https://fontawesome.com/license (Commercial License) Copyright
        2023 Fonticons, Inc. <path d={convertStringByOffset(width)} />
      </svg>
    </div>
  );
}

function convertStringByOffset(offset: number): string {
  // prettier-ignore
  return`
M ${(459.908+offset).toFixed(3)} 256.471 
C ${(472.408+offset).toFixed(3)} 243.971 ${(472.408+offset).toFixed(3)} 223.671 ${(459.908+offset).toFixed(3)} 211.171 
L ${(299.908+offset).toFixed(3)} 51.171 
C ${(287.408+offset).toFixed(3)} 38.671 ${(267.108+offset).toFixed(3)} 38.671 ${(254.608+offset).toFixed(3)} 51.171 
C ${(242.108+offset).toFixed(3)} 63.671 ${(242.108+offset).toFixed(3)} 83.971 ${(254.608+offset).toFixed(3)} 96.471 
L ${(360.108+offset).toFixed(3)} 201.871 
L 53.308 201.871 
C 35.608 201.871 21.308 216.171 21.308 233.871 
C 21.308 251.571 35.608 265.871 53.308 265.871 
L ${(360.008+offset).toFixed(3)} 265.871 
L ${(254.708+offset).toFixed(3)} 371.271 
C ${(242.208+offset).toFixed(3)} 383.771 ${(242.208+offset).toFixed(3)} 404.071 ${(254.708+offset).toFixed(3)} 416.571 
C ${(267.208+offset).toFixed(3)} 429.071 ${(287.508+offset).toFixed(3)} 429.071 ${(300.008+offset).toFixed(3)} 416.571 
L ${(460.008+offset).toFixed(3)} 256.571 
L ${(459.908+offset).toFixed(3)} 256.471 
Z
`;
}
// How to do this correctly
// https://reactfordataviz.com/articles/responsive-svg-drawing-with-react-and-uselayouteffect/
