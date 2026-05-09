"use client";

import { ToggleableComponentCard } from "../toggleable-component-code-card";
import { TiltedShadowButtonDisplay } from "@/components/buttons/tilted-shadow";

const componentsArray = [
  {
    title: "Tilted Shadow",
    components: [TiltedShadowButtonDisplay],
  },
];

export function ButtonsSection() {
  return (
    <div className="flex flex-col gap-12 items-center">
      <div>Buttons</div>
      {componentsArray.map(({ components, title }, index) => (
        <ToggleableComponentCard
          contentClassName="w-full items-center min-h-[140px] flex flex-col justify-center"
          key={index}
          components={components}
          title={title}
        />
      ))}
    </div>
  );
}
