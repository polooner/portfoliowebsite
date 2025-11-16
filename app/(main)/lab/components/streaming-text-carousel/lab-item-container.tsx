export const LabItemContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[250px] gap-8 w-full self-center ">
      <div className="relative h-48 flex items-center justify-center min-w-[150px] w-full max-w-[500px] bg-neutral-50 rounded-2xl">
        {children}
      </div>
    </div>
  );
};
