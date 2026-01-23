import { BleedBulletPoint } from "@/components/ui/bleed-bullet-point";

interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <h3 className="uppercase font-bold text-sm tracking-wider inline-flex items-center gap-3 pl-px">
      <BleedBulletPoint intensity="extreme" animated />
      {title}
    </h3>
  );
}
