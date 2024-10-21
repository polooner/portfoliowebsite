"use client";

import { cn } from "@/lib/utils";
import { Button } from "../button";
import { MoreHorizontal } from "lucide-react";

export default function TVCard({
  mainContent,
  footerContent,
  title,
  description,
  className,
}: {
  mainContent: React.ReactNode;
  footerContent: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "content-center items-center cursor-pointer flex flex-col flex-nowrap gap-0 h-min justify-start overflow-hidden relative no-underline w-min will-change-transform border border-solid border-[rgb(235,235,235)] bg-white rounded-2xl shadow-none opacity-100 text-xs font-sans box-border antialiased flex-none hover:shadow-2xl hover:shadow-neutral-200 transition-all duration-300 p-4",
        className
      )}
    >
      <h3 className="text-lg font-semibold whitespace-pre-wrap text-start self-start">
        {title}
      </h3>
      <div className="text-xs font-sans cursor-pointer box-border antialiased flex-none h-[216px] overflow-hidden relative w-[270px] will-change-transform opacity-100 rounded-t-2xl items-center justify-center text-center shadow-inner-bottom-shadow">
        {mainContent}
      </div>

      <div className="text-base font-medium cursor-pointer box-border antialiased content-center self-stretch flex flex-row items-center flex-nowrap gap-1 h-min justify-start overflow-hidden relative w-auto will-change-transform bg-white opacity-100 rounded-b-2xl">
        <span className="flex-1">{footerContent}</span>
        <Button
          variant="ghost"
          size="icon"
          className="text-black dark:text-white ml-auto"
        >
          <MoreHorizontal className="size-4 text-black" />
        </Button>
      </div>
    </div>
  );
}
