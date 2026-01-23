interface LabItemFooterProps {
  title: string;
  description: string;
}

export function LabItemFooter({ title, description }: LabItemFooterProps) {
  return (
    <div className="w-full max-w-[500px] text-left flex flex-col">
      <span className="font-mono font-medium">{title}</span>
      <span className="text-xs">{description}</span>
    </div>
  );
}
