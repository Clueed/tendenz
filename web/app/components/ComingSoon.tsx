"use client";
import { AnimatePresence, motion } from "framer-motion";

export function ComingSoon() {
  const items = [
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
  ];

  const test = Array.from({ length: 3 }, () => {
    return {};
  });

  const container = {
    hidden: { opacity: 0 },
    visible: (i = Math.ceil(Math.random() * 1000) / 15) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="relative py-[10vw]">
      <div className="absolute top-0 left-0 w-full h-full shadow-inner -z-10 bg-gradient-to-b from-indigo-a3 via-indigo-a4 to-violet-a4 mask-linear-gradient-tt" />
      <div className="grid grid-cols-default">
        <div className="col-start-2">
          <h2 className="mt-10 text-4xl font-normal text-center text-indigo-12">
            coming soon...
          </h2>
          <motion.div
            className="flex flex-wrap justify-around my-10 text-2xl sm:text-3xl gap-y-6 gap-x-4 bg-clip-text text-black-a1 bg-gradient-to-br from-indigo-10 to-sky-9 via-violet-9"
            initial={{ backgroundSize: "100%" }}
            animate={{ backgroundSize: "500%" }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 10,
            }}
          >
            <AnimatePresence>
              {items.map((v, ii) => {
                const wordDelay = Math.ceil(Math.random() * 10) / 5;
                return (
                  <motion.div
                    key={v}
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                  >
                    {v.split("").map((c, i) => {
                      const characterDelay = wordDelay + Math.random() / 2;
                      return (
                        <motion.span key={ii + i} variants={child}>
                          {c === " " ? "\u00A0" : c}
                        </motion.span>
                      );
                    })}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
