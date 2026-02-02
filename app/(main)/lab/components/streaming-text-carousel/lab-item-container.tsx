import { cn } from "@/lib/utils"

export const LabItemContainer = ({ children, className }: { children: React.ReactNode, className: string }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center min-h-[250px] gap-4 w-full self-center ", className)}>
      <div className="relative h-48 flex items-center justify-center min-w-[150px] w-full max-w-[500px] bg-neutral-50 rounded-2xl">
        {children}
      </div>
    </div>
  );
};
