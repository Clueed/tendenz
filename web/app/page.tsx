export default function Home() {
  const data = [
    {
      standardDeviation: 1,
      ticker: "AAPL",
      name: "Apple",
      change: 12,
      link: "link",
    },
    {
      standardDeviation: 1.5,
      ticker: "AMZN",
      name: "Amazon",
      change: 4,
      link: "link",
    },
    {
      standardDeviation: 1.2,
      ticker: "META",
      name: "Meta",
      change: -10,
      link: "link",
    },
    {
      standardDeviation: 2,
      ticker: "GOOG",
      name: "Alphabet",
      change: -3,
      link: "link",
    },
    {
      standardDeviation: 2.3,
      ticker: "TSLA",
      name: "Tesla",
      change: 6,
      link: "link",
    },
  ];

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24 bg-mauve-3 text-indigo-12">
      incoming...
    </main>
  );
}
