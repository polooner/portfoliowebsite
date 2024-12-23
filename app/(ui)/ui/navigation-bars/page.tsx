"use client";

import SkiffNavigationBar, {
  SkiffNavigationBarCode,
  SkiffNavigationBarInstructions,
} from "@/components/ui/navigation-bars/skiff";
import { ToggleableComponentCard } from "../toggleable-component-code-card";
import {
  CrossBordersNavBar,
  CrossBordersNavBarInstructions,
} from "@/components/ui/navigation-bars/cross-ended-box-nav";
import { ComponentData, ComponentShowcase } from "@/types";

const componentsArray: ComponentShowcase[] = [
  {
    title: "Skiff Navigation Bar",
    components: [
      {
        component: SkiffNavigationBar,
        instructions: SkiffNavigationBarInstructions,
      },
    ],
  },
  {
    title: "Cross Ended Box Navigation Bar",
    components: [
      {
        component: CrossBordersNavBar,
        instructions: CrossBordersNavBarInstructions,
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
