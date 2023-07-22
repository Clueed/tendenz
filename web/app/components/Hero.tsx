import Balancer from "react-wrap-balancer";

export default function Hero() {
  return (
    <section className="relative flex flex-col w-full py-10 font-sans bg-gradient-to-br from-violet-a5 via-blue-a4 to-sky-a3 px-[5vw]">
      <h1 className="text-4xl text-blue-a12">
        <Balancer>objective insight across all markets</Balancer>
      </h1>
      <p className="pt-1 text-slate-11">
        <Balancer>the most improbable price movements at a glance</Balancer>
      </p>
    </section>
  );
}
