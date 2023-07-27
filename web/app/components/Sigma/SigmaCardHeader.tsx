import { motion } from "framer-motion";
import { Fragment, useMemo } from "react";
import { MarketCap } from "./MarketCap";

interface Props {
  expanded: boolean;
  sigma: number;
  ticker: string;
  name: string;
  marketCap: number;
}

export function SigmaCardHeader({
  expanded,
  sigma,
  ticker,
  name,
  marketCap,
}: Props) {
  const formattedSigma = sigma.toFixed(2);
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
        <div className="text-3xl leading-tight text-right text-indigo-12">
          {formattedSigma}
        </div>
        <div className="ml-1 text-xl text-slate-10">σ</div>
        <MarketCap marketCap={marketCap} expanded={expanded} />
      </div>

      <motion.div
        initial={{ height: "calc(1.425*1.125rem*2)" }}
        animate={{
          height: expanded ? "auto" : "calc(1.425*1.125rem*2)",
          transition: {
            type: "spring",
            duration: 0.75,
          },
        }}
        className={"text-lg leading-[1.425] overflow-clip text-left"}
      >
        <span className="mr-1 text-slate-11">{ticker}</span>
        {"  "}

        <span className="text-slate-12">{formattedName}</span>
        <br className="@sm:inline hidden" />
        {shareTypes.map((type) => (
          <Fragment key={type}>
            {" "}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{
                opacity: expanded ? 1 : 0,
                transition: {
                  type: "spring",
                  duration: 0.5,
                },
              }}
              className="text-[0.6em] text-slate-11 bg-slate-a4 rounded-md px-2 py-1"
            >
              {type}
            </motion.span>
          </Fragment>
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
