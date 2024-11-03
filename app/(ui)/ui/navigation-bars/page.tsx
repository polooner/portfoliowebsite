"use client";

import SkiffNavigationBar, {
  SkiffNavigationBarCode,
} from "@/components/ui/navigation-bars/skiff";
import { ToggleableComponentCard } from "../toggleable-component-code-card";
import {
  CrossEndedBoxNavigationBar,
  CrossEndedBoxNavigationBarCode,
} from "@/components/ui/navigation-bars/cross-ended-box-nav";

const componentsArray = [
  {
    title: "Skiff Navigation Bar",
    components: [
      {
        component: SkiffNavigationBar,
        code: SkiffNavigationBarCode,
      },
    ],
  },
  {
    title: "Cross Ended Box Navigation Bar",
    components: [
      {
        component: CrossEndedBoxNavigationBar,
        code: CrossEndedBoxNavigationBarCode,
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
