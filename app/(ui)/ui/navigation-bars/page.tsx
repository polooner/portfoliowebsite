"use client";

import SkiffNavigationBar from "@/components/ui/navigation-bars/skiff";
import { ToggleableComponentCard } from "../toggleable-component-code-card";

const componentsArray = [
  {
    title: "Skiff navigation bar",
    components: [
      {
        component: SkiffNavigationBar,
        code: "",
      },
    ],
  },
];

export default function NavigationBars() {
  return (
    <div className="flex flex-col gap-12 items-center">
      <div>Navigation Bars</div>
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
