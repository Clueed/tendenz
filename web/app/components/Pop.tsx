import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";
import * as Popover from "@radix-ui/react-popover";

export default function Pop({
  children,
  popover,
}: {
  children: string;
  popover: ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover.Root onOpenChange={(o) => setOpen(o)} open={open}>
      <Popover.Trigger className="group">
        <span className="transition-colors border-b-2 border-slate-8 group-radix-state-open:border-indigo-12 group-radix-state-open:text-indigo-12">
          {children}
        </span>
      </Popover.Trigger>

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
                className="z-50 px-4 py-3 rounded-md shadow-md text-base bg-indigo-12 leading-snug text-indigo-2 max-w-[var(--radix-popover-content-available-height)] w-[var(--radix-popover-trigger-width)] border-none"
              >
                {popover}
                <Popover.Arrow className="fill-indigo-12" />
              </motion.div>
            </Popover.Content>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
}
