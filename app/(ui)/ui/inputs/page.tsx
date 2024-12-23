"use client";

import {
  ButtonInside,
  ButtonInsideCode,
  ButtonInsideInputInstructions,
} from "@/components/inputs/button-inside";
import { ToggleableComponentCard } from "../toggleable-component-code-card";
import { ComponentData } from "@/types";

const componentsArray: ComponentData[] = [
  {
    title: "Button inside",
    components: [
      {
        component: ButtonInside,
        instructions: ButtonInsideInputInstructions,
      },
    ],
  },
];

export default function InputsPage() {
  return (
    <div className="flex flex-col gap-12 items-center">
      <div>Inputs</div>
      {componentsArray.map(({ components, title }, index) => (
        <ToggleableComponentCard
          contentClassName="flex items-center justify-center min-h-[15dvh] w-full p-6"
          key={index}
          components={components}
          title={title}
        />
      ))}
    </div>
  );
}

interface TemplateComponentProps {
  key: number;
}
