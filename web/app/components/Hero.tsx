import Balancer from "react-wrap-balancer";
import Container from "./Container";

export default function Hero() {
  return (
    <Container type="default">
      {/* <div className="relative flex items-end w-full">
              <div className="absolute top-0 left-0 w-full h-[200%] mb-1 -z-20 bg-gradient-to-br from-indigo-a12 via-indigo-a6 to-sky-a1  from-0% via-25% " />
      <div className="absolute top-0 left-0 w-full h-[200%] opacity-50 -z-10 grain1"></div></div> */}

      <h1 className="text-5xl text-left text-blue-a12">
        <Balancer>objective insight across all markets</Balancer>
      </h1>
    </Container>
  );
}
