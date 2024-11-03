"use client";

import {
  ButtonInside,
  ButtonInsideCode,
} from "@/components/inputs/button-inside";
import { ToggleableComponentCard } from "../toggleable-component-code-card";

const componentsArray = [
  {
    title: "Button inside",
    components: [
      {
        component: ButtonInside,
        code: ButtonInsideCode,
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
