import Balancer from "react-wrap-balancer";

export default function Hero() {
  return (
    <div className="relative flex items-end w-full py-6">
      <div className="absolute w-full h-full mb-1 bg-gradient-to-br from-violet-a5 via-blue-a4 to-sky-a3" />
      <h1 className="text-5xl text-blue-a12 pl-[5vw] pb-10">
        <Balancer>objective insight across all markets</Balancer>
      </h1>
    </div>
  );
}
