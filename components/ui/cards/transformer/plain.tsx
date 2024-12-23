import { cn } from "@/lib/utils";
import { Instruction } from "@/types";

export function TransformerCard({
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
  return (
    <div
      className={cn(
        "content-center items-center cursor-pointer flex flex-col flex-nowrap gap-0 h-min justify-start overflow-hidden relative no-underline w-min will-change-transform border border-solid border-[rgb(235,235,235)] bg-white rounded-2xl shadow-none opacity-100 text-xs font-sans box-border antialiased flex-none hover:shadow-2xl hover:shadow-neutral-200 transition-all duration-300 p-4",
        className
      )}
    >
      <div className="relative">
        <div>
          <h3 className="text-lg font-semibold whitespace-pre-wrap text-start self-start">
            {title}
          </h3>
          <div className="text-xs font-sans cursor-pointer box-border antialiased flex-none h-[216px] overflow-hidden relative sm:w-[270px] w-[150px] will-change-transform opacity-100 items-center justify-center text-center flex max-h-[216px] z-10">
            <div className="[--mask-height:216px] [mask-image:linear-gradient(to_bottom,black_calc(100%_-_var(--mask-height)),transparent)] mt-auto h-[232px] overflow-hidden">
              {mainContent}
            </div>
          </div>
        </div>

        <div className="text-base font-medium cursor-pointer box-border antialiased content-center self-stretch flex flex-row items-center flex-nowrap gap-1 h-min justify-start overflow-hidden relative w-auto will-change-transform bg-white opacity-100 p-1">
          <span className="flex-1">{footerContent}</span>
        </div>
      </div>
    </div>
  );
}

export const TransformerCardCode = `import { cn } from "@/lib/utils";

export function TransformerCard({
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
  return (
    <div
      className={cn(
        "content-center items-center cursor-pointer flex flex-col flex-nowrap gap-0 h-min justify-start overflow-hidden relative no-underline w-min will-change-transform border border-solid border-[rgb(235,235,235)] bg-white rounded-2xl shadow-none opacity-100 text-xs font-sans box-border antialiased flex-none hover:shadow-2xl hover:shadow-neutral-200 transition-all duration-300 p-4",
        className
      )}
    >
      <div className="relative">
        <div>
          <h3 className="text-lg font-semibold whitespace-pre-wrap text-start self-start">
            {title}
          </h3>
          <div className="text-xs font-sans cursor-pointer box-border antialiased flex-none h-[216px] overflow-hidden relative sm:w-[270px] w-[150px] will-change-transform opacity-100 items-center justify-center text-center flex max-h-[216px] z-10">
            <div className="[--mask-height:216px] [mask-image:linear-gradient(to_bottom,black_calc(100%_-_var(--mask-height)),transparent)] mt-auto h-[232px] overflow-hidden">
              {mainContent}
            </div>
          </div>
        </div>

        <div className="text-base font-medium cursor-pointer box-border antialiased content-center self-stretch flex flex-row items-center flex-nowrap gap-1 h-min justify-start overflow-hidden relative w-auto will-change-transform bg-white opacity-100 p-1">
          <span className="flex-1">{footerContent}</span>
        </div>
      </div>
    </div>
  );
}`;

export const TransformerCardWithInstructions: Instruction[] = [
  {
    code: TransformerCardCode,
    file: "ui/TransformerCardWithMenu.tsx",
  },
];
