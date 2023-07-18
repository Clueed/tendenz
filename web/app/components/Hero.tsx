export default function Hero() {
  return (
    <section className="flex flex-col text-center relative w-full py-20 bg-gradient-to-br from-slate-a1 to-slate-a2">
      <h1 className="font-bold text-slate-11 text-5xl">
        Objective insight <br /> across all markets
      </h1>
      <div />
      <h2 className="font-semibold text-2xl text-center text-slate-9">
        skip past the statistical noise
      </h2>
      <div className="w-full h-full overflow-clip absolute top-0 -z-50">
        <div className="absolute w-44 h-44 bg-sky-9 blur-3xl left-[10vw]" />
        <div className="absolute w-[30em] h-[30em] bg-indigo-4 blur-3xl left-[40vw] top-[-20em]" />
        <div className="absolute w-44 h-44 bg-sky-9 blur-3xl right-[10vw] bottom-[-10em]" />
      </div>
    </section>
  );
}
