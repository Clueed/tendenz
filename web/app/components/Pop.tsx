import * as Popover from "@radix-ui/react-popover";
import { Slot } from "@radix-ui/react-slot";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";

type BgColors = "indigo" | "slate";

export default function Pop({
  children,
  popoverContent,
  popoverContainerStyle,
  popoverColor,
  blur = "none",
}: {
  children: (open: boolean) => JSX.Element;
  popoverContent: JSX.Element;
  popoverContainerStyle?: string;
  popoverColor: BgColors;
  blur?: "none" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}) {
  const [open, setOpen] = useState<boolean>(false);

  type colors<K extends string | number | symbol> = {
    [k in K]: string;
  };

  const colors: {
    [key in BgColors]: {
      pop: string;
      arrow: string;
    };
  } = {
    indigo: {
      pop: "bg-gradient-to-br from-indigo-a2 to-indigo-a3",
      arrow: "fill-indigo-a3",
    },
    slate: {
      pop: "bg-gradient-to-br from-slate-a2 to-slate-a3",
      arrow: "fill-slate-a4",
    },
  };

  return (
    <Popover.Root onOpenChange={(o) => setOpen(o)} open={open}>
      <Popover.Trigger className="group">{children(open)}</Popover.Trigger>

      <AnimatePresence>
        {open && (
          <Popover.Portal forceMount>
            <Popover.Content
              forceMount
              asChild
              sideOffset={4}
              avoidCollisions
              collisionPadding={10}
            >
              <motion.div
                initial={{ y: "-10%", opacity: 0 }}
                animate={{
                  y: "0",
                  opacity: 1,
                  transition: { type: "spring", duration: 1 },
                }}
                exit={{ y: "-10%", opacity: 0 }}
                className={classNames(
                  "z-50 px-5 py-4 rounded-md shadow-md border-none",
                  "backdrop-blur-" + blur,
                  popoverContainerStyle,
                  colors[popoverColor].pop
                )}
              >
                {popoverContent}
                <Popover.Arrow
                  className={classNames(colors[popoverColor].arrow)}
                />
              </motion.div>
            </Popover.Content>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
}
