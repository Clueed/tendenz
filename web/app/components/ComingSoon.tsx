import Container from "./Container";

export function ComingSoon() {
  return (
    <div className="relative ">
      <div className="absolute top-0 left-0 w-full h-full shadow-inner opacity-25 -z-10 bg-gradient-to-bl from from-indigo-a11 via-violet-a11 to-violet-a12 col-spa" />
      <Container type="default">
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
      </Container>
    </div>
  );
}
