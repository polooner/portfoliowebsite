import { TemplateComponentProps } from "@/components/headings/stop-playing-underscore";
import { cn } from "@/lib/utils";

import { HTMLAttributes } from "react";

type SimpleCardProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  description: string;
  upperHalfContent: React.ReactNode;
};

export default function SimpleCard({
  title,
  description,
  upperHalfContent,
  className,
}: TemplateComponentProps & SimpleCardProps) {
  return (
    <div
      className={cn(
        "content-center items-center cursor-pointer flex flex-col flex-nowrap gap-0 h-min justify-start overflow-hidden p-0 relative no-underline w-min will-change-transform border border-solid border-[rgb(235,235,235)] bg-white rounded-2xl shadow-none opacity-100 text-xs font-sans box-border antialiased flex-none hover:shadow-2xl hover:shadow-neutral-200 transition-all duration-300",
        className
      )}
    >
      {/* upper half */}
      <div className="text-xs font-sans cursor-pointer box-border antialiased flex-none h-[216px] overflow-hidden relative w-[270px] will-change-transform opacity-100 rounded-t-2xl items-center justify-center text-center">
        {upperHalfContent}
      </div>

      {/* lower half */}
      <div className="text-xs font-sans cursor-pointer box-border antialiased content-start items-start self-stretch flex flex-col flex-nowrap gap-1 h-min justify-start overflow-hidden p-4 relative w-auto will-change-transform border-t border-solid border-[rgb(235,235,235)] bg-white opacity-100 rounded-b-2xl">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
