"use client";

import { cn } from "@/lib/utils";
import { Button } from "../../button";
import { DollarSign, MoreHorizontal, Pencil, Share } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Instruction } from "@/types";

export function TransformerCardWithFramerAndMenu({
  mainContent,
  footerContent,
  title,
  className,
}: {
  mainContent: React.ReactNode;
  footerContent: React.ReactNode;
  title: string;
  className?: string;
}) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div
      className={cn(
        "content-center items-center cursor-pointer flex flex-col flex-nowrap gap-0 h-min justify-start overflow-hidden relative no-underline w-min will-change-transform border border-solid border-[rgb(235,235,235)] bg-white rounded-2xl shadow-none opacity-100 text-xs font-sans box-border antialiased flex-none hover:shadow-2xl hover:shadow-neutral-200 transition-all duration-300 p-4",
        className
      )}
    >
      <div className="relative">
        <AnimatePresence mode="popLayout">
          {showMenu ? (
            <motion.div
              key="menu"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                type: "spring",
                duration: 0.3,
                bounce: 0.1,
                ease: "easeInOut",
              }}
              className="absolute top-0 left-0 w-full h-full z-20 flex items-center justify-center pointer-events-none"
            >
              <div className="bg-transparent pointer-events-auto flex flex-col">
                <Button
                  variant="ghost"
                  size="minimal"
                  className="flex items-center justify-start gap-2 text-xs w-full"
                >
                  <DollarSign className="size-3" /> Sell
                </Button>
                <Button
                  variant="ghost"
                  size="minimal"
                  className="flex items-center justify-start gap-2 text-xs w-full"
                >
                  <Pencil className="size-3" /> Rename
                </Button>
                <Button
                  variant="ghost"
                  size="minimal"
                  className="flex items-center justify-start gap-2 text-xs w-full"
                >
                  <Share className="size-3" /> Share
                </Button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.div
          animate={{
            filter: showMenu ? "blur(4px)" : "blur(0px)",
            opacity: showMenu ? 0.2 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold whitespace-pre-wrap text-start self-start">
            {title}
          </h3>
          <div className="text-xs font-sans cursor-pointer box-border antialiased flex-none h-[216px] overflow-hidden relative sm:w-[270px] w-[150px] will-change-transform opacity-100 items-center justify-center text-center flex max-h-[216px] z-10">
            <div className="[--mask-height:216px] [mask-image:linear-gradient(to_bottom,black_calc(100%_-_var(--mask-height)),transparent)] mt-auto h-[232px] overflow-hidden">
              {mainContent}
            </div>
          </div>
        </motion.div>

        <div className="text-base font-medium cursor-pointer box-border antialiased content-center self-stretch flex flex-row items-center flex-nowrap gap-1 h-min justify-start overflow-hidden relative w-auto will-change-transform bg-white opacity-100 p-1">
          <motion.span
            className="flex-1"
            animate={{
              opacity: showMenu ? 0.2 : 1,
              filter: showMenu ? "blur(2px)" : "blur(0px)",
            }}
            transition={{ duration: 0.3 }}
          >
            {footerContent}
          </motion.span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowMenu(!showMenu)}
            className="text-black dark:text-white ml-auto relative z-30"
          >
            <MoreHorizontal className="size-4 text-black" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export const TransformerCardWithFramerAndMenuCode = `"use client";

import { cn } from "@/lib/utils";
import { Button } from "../button";
import { DollarSign, MoreHorizontal, Pencil, Share } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function TransformerCardWithFramerAndMenu({
  mainContent,
  footerContent,
  title,
  className,
}: {
  mainContent: React.ReactNode;
  footerContent: React.ReactNode;
  title: string;
  className?: string;
}) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div
      className={cn(
        "content-center items-center cursor-pointer flex flex-col flex-nowrap gap-0 h-min justify-start overflow-hidden relative no-underline w-min will-change-transform border border-solid border-[rgb(235,235,235)] bg-white rounded-2xl shadow-none opacity-100 text-xs font-sans box-border antialiased flex-none hover:shadow-2xl hover:shadow-neutral-200 transition-all duration-300 p-4",
        className
      )}
    >
      <div className="relative">
        <AnimatePresence mode="popLayout">
          {showMenu ? (
            <motion.div
              key="menu"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                type: "spring",
                duration: 0.3,
                bounce: 0.1,
                ease: "easeInOut",
              }}
              className="absolute top-0 left-0 w-full h-full z-20 flex items-center justify-center pointer-events-none"
            >
              <div className="bg-transparent pointer-events-auto flex flex-col">
                <Button
                  variant="ghost"
                  size="minimal"
                  className="flex items-center justify-start gap-2 text-xs w-full"
                >
                  <DollarSign className="size-3" /> Sell
                </Button>
                <Button
                  variant="ghost"
                  size="minimal"
                  className="flex items-center justify-start gap-2 text-xs w-full"
                >
                  <Pencil className="size-3" /> Rename
                </Button>
                <Button
                  variant="ghost"
                  size="minimal"
                  className="flex items-center justify-start gap-2 text-xs w-full"
                >
                  <Share className="size-3" /> Share
                </Button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.div
          animate={{
            filter: showMenu ? "blur(4px)" : "blur(0px)",
            opacity: showMenu ? 0.2 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold whitespace-pre-wrap text-start self-start">
            {title}
          </h3>
          <div className="text-xs font-sans cursor-pointer box-border antialiased flex-none h-[216px] overflow-hidden relative sm:w-[270px] w-[150px] will-change-transform opacity-100 items-center justify-center text-center flex max-h-[216px] z-10">
            <div className="[--mask-height:216px] [mask-image:linear-gradient(to_bottom,black_calc(100%_-_var(--mask-height)),transparent)] mt-auto h-[232px] overflow-hidden">
              {mainContent}
            </div>
          </div>
        </motion.div>

        <div className="text-base font-medium cursor-pointer box-border antialiased content-center self-stretch flex flex-row items-center flex-nowrap gap-1 h-min justify-start overflow-hidden relative w-auto will-change-transform bg-white opacity-100 p-1">
          <motion.span
            className="flex-1"
            animate={{
              opacity: showMenu ? 0.2 : 1,
              filter: showMenu ? "blur(2px)" : "blur(0px)",
            }}
            transition={{ duration: 0.3 }}
          >
            {footerContent}
          </motion.span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowMenu(!showMenu)}
            className="text-black dark:text-white ml-auto relative z-30"
          >
            <MoreHorizontal className="size-4 text-black" />
          </Button>
        </div>
      </div>
    </div>
  );
}
`;

export const TransformerCardWithFramerAndMenuInstructions: Instruction[] = [
  {
    code: TransformerCardWithFramerAndMenuCode,
    file: "ui/TransformerCardWithMenu.tsx",
  },
];
