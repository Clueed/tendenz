import { motion } from "framer-motion";
import { useMemo } from "react";
import { tendenzApiSigmaYesterday } from "../page";
import { MarketCap } from "./MarketCap";

interface Props {
  entry: tendenzApiSigmaYesterday;
  expanded: boolean;
}

export function MainCardTrigger({ entry, expanded }: Props) {
  const sigma = entry.sigma.toFixed(2);
  const name = entry.name;
  const { formattedName, shareTypes } = useMemo(
    () => handleTickerTypes(name),
    [name]
  );
  return (
    <div
      className={
        "grid w-100 grid-cols-[7rem_auto] gap-x-4 items-start cursor-pointer"
      }
    >
      <div className="grid grid-cols-[auto_min-content] items-baseline">
        <div className="text-3xl leading-none text-right text-indigo-12">
          {sigma}
        </div>
        <div className="ml-1 text-xl text-slate-10">σ</div>
        <MarketCap marketCap={entry.marketCap} expanded={expanded} />
      </div>

      <motion.div
        animate={{
          height: expanded ? "auto" : "calc(1.425*1.125rem*2)",
          transition: {
            type: "spring",
            duration: 3,
          },
        }}
        className={"text-lg leading-[1.425] overflow-clip"}
      >
        <span className="mr-1 text-slate-11">{entry.ticker}</span>
        {"  "}

        <span className="text-slate-12">{formattedName}</span>
        {shareTypes.map((type) => (
          <>
            {" "}
            <motion.span
              animate={{
                opacity: expanded ? 1 : 0,
                transition: {
                  type: "spring",
                  duration: 0.5,
                  delay: 1,
                },
              }}
              key={type}
              className="text-[0.6em] text-slate-11 bg-slate-a3 rounded-md px-2 py-1"
            >
              {type}
            </motion.span>
          </>
        ))}
      </motion.div>
    </div>
  );
}

function handleTickerTypes(name: string | null) {
  let formattedName = name;
  let shareTypes: string[] = [];

  if (formattedName === null) {
    return { formattedName, shareTypes };
  }

  for (const type of ["Common Stock", "Ordinary Shares", "Class A"]) {
    if (formattedName!.search(type) !== -1) {
      formattedName = formattedName!.replace(type, "");
      shareTypes.push(type);
    }
  }

  shareTypes = shareTypes.map((type) =>
    type.replace(" ", String.fromCharCode(160))
  );

  return { formattedName, shareTypes };
}
