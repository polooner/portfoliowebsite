interface LabelBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function LabelBadge({ children, className = '' }: LabelBadgeProps) {
  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-mono text-white bg-black rounded-full ${className}`}
    >
      {children}
    </span>
  );
}
