import Container from "./Container";

export function ComingSoon() {
  return (
    <div className="relative py-[10vw]">
      {
        // <div className="absolute h-full translate-x-1/2 translate-y-1/2 rounded-full w-96 bg-violet-a5 blur-3xl right-1/2 bottom-1/2 -z-10" />
      }
      <div className="absolute top-0 left-0 w-full h-full shadow-inner -z-10 bg-gradient-to-b from-indigo-a3 via-indigo-a4 to-violet-a4 mask-linear-gradient-tt" />
      <div className="grid grid-cols-default">
        <div className="col-start-2">
          <h2 className="mt-10 text-4xl font-normal text-center text-indigo-12">
            coming soon...
          </h2>
          <div className="flex flex-wrap justify-around my-10 text-2xl gap-y-6 gap-x-4 bg-clip-text text-black-a1 bg-gradient-to-br from-indigo-11 to-sky-11 via-violet-11">
            {[
              "options",
              "global equities",
              "commodities",
              "foreign exchange",
              "equity indexes",
              "bonds",
              "cryptocurrencies",
              "notes",
              "derivatives",
              "interest rates",
              "economic indicators",
            ].map((v) => (
              <div key={v}>{v}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
