import { ReactNode } from 'react';

interface LabItemFooterProps {
  title: string;
  description: string;
  actions?: ReactNode;
}

export function LabItemFooter({ title, description, actions }: LabItemFooterProps) {
  return (
    <div className="w-full max-w-[500px] text-left flex items-center justify-between gap-4">
      <div className="flex flex-col">
        <span className="font-mono font-medium">{title}</span>
        <span className="text-xs">{description}</span>
      </div>
      {actions}
    </div>
  );
}
