"use client";

import { InsetShadowButtonDisplay } from "@/components/buttons/inset-shadow";
import { ToggleableComponentCard } from "../toggleable-component-code-card";
import { TiltedShadowButtonDisplay } from "@/components/buttons/tilted-shadow";
import { SpotlightButtonDisplay } from "@/components/buttons/spotlight";
import { BigShadowButtonDisplay } from "@/components/buttons/big-shadow";
import { ThreeDAngledShadowButtonDisplay } from "@/components/buttons/3d-angled-shadow";

const componentsArray = [
  {
    title: "Tilted Shadow",
    components: [TiltedShadowButtonDisplay],
  },
  {
    title: "Inset Shadow with Border",
    components: [InsetShadowButtonDisplay],
  },
  {
    title: "Spotlight",
    components: [SpotlightButtonDisplay],
  },
  {
    title: "Big Shadow",
    components: [BigShadowButtonDisplay],
  },
  {
    title: "3D Angled Shadow",
    components: [ThreeDAngledShadowButtonDisplay],
  },
];

export default function ButtonsPage() {
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
