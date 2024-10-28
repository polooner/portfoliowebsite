"use client";

import {
  CrossEndedBox,
  CrossEndedBoxCode,
} from "@/components/patterns/cross-ended-box";
import { ToggleableComponentCard } from "../toggleable-component-code-card";

const componentsArray = [
  {
    title: "Cross Ended Box",
    components: [
      {
        component: CrossEndedBox,
        code: CrossEndedBoxCode,
      },
    ],
  },
];

export default function Patterns() {
  return (
    <div className="flex flex-col gap-12 items-center">
      <div>Patterns</div>
      {componentsArray.map(({ components, title }, index) => (
        <ToggleableComponentCard
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
