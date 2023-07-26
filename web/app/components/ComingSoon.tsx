export function ComingSoon() {
  return (
    <>
      <h2 className="text-3xl font-normal text-slate-12">coming soon...</h2>
      <div className="flex flex-wrap justify-start gap-10 mx-10 my-10 text-2xl bg-clip-text text-black-a1 bg-gradient-to-br from-indigo-10 to-sky-10 via-violet-10">
        {[
          "options",
          "global equities",
          "commodities",
          "credit default swaps",
          "foreign exchange",
          "equity indexes",
          "cryptocurrencies",
          "bonds",
          "derivatives",
          "notes",
          "interest rates",
          "mortgage-backed securities",
          "economic indicators",
        ].map((v) => (
          <div key={v}>{v}</div>
        ))}
      </div>
    </>
  );
}
