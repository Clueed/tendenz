import classNames from "classnames";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AnimationsConfig } from "./MainBoxRow";

export function CardBackground({
  expanded,
  className,
  initial = "transparent",
  animated = "visible",
}: {
  expanded: boolean;
  className: string;
  initial?: string;
  animated?: string;
}) {
  const animationsConfig = useContext(AnimationsConfig);
  return (
    <motion.div
      className={classNames(
        "absolute top-0 right-0 left-0 w-full h-full shadow rounded-xl bg-gradient-to-br",
        className
      )}
      variants={animationsConfig.variants}
      initial={initial}
      animate={expanded ? animated : initial}
    />
  );
}
