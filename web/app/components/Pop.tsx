import * as Popover from "@radix-ui/react-popover";
import { Slot } from "@radix-ui/react-slot";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";

type BgColors = "indigo" | "slate";

export default function Pop({
  children,
  popoverContent,
  popoverColor,
  offset,
}: {
  children: (open: boolean) => JSX.Element;
  popoverContent: JSX.Element;
  popoverColor: BgColors;
  popoverContainerClassNames?: string;
  offset: number;
}) {
  const [open, setOpen] = useState<boolean>(false);

  type colors<K extends string | number | symbol> = {
    [k in K]: string;
  };

  const colors: {
    [key in BgColors]: {
      popClassNames: string;
      arrowClassNames: string;
    };
  } = {
    indigo: {
      popClassNames: "bg-gradient-to-br from-indigo-a2 to-indigo-a3",
      arrowClassNames: "fill-indigo-5",
    },
    slate: {
      popClassNames: "bg-gradient-to-br from-slate-a2 to-slate-a3",
      arrowClassNames: "fill-slate-6",
    },
  };

  return (
    <Popover.Root onOpenChange={(o) => setOpen(o)} open={open}>
      <Popover.Trigger className="group/popover">
        {children(open)}
      </Popover.Trigger>

      <AnimatePresence>
        {open && (
          <Popover.Portal forceMount>
            <Popover.Content
              forceMount
              sideOffset={offset}
              avoidCollisions
              collisionPadding={10}
            >
              <motion.div
                initial={{ y: "-5%", opacity: 0 }}
                animate={{
                  y: "0",
                  opacity: 1,
                  transition: { type: "spring", duration: 0.5 },
                }}
                exit={{ y: "-10%", opacity: 0 }}
                className={classNames(
                  "z-50 px-5 py-4 rounded-md shadow-md border-none backdrop-blur-2xl",
                  colors[popoverColor].popClassNames
                )}
              >
                {popoverContent}
                <Popover.Arrow
                  className={classNames(
                    colors[popoverColor].arrowClassNames,
                    "drop-shadow-2xl"
                  )}
                />
              </motion.div>
            </Popover.Content>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
}
