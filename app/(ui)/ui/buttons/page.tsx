"use client";

import {
  InsetShadowButton,
  InsetShadowButtonCode,
} from "@/components/buttons/inset-shadow";
import { ToggleableComponentCard } from "../toggleable-component-code-card";
import {
  TiltedShadowButton,
  TiltedShadowButtonCode,
} from "@/components/buttons/tilted-shadow";
import {
  SpotlightButton,
  SpotlightButtonCode,
} from "@/components/buttons/spotlight";
import {
  BigShadowButton,
  BigShadowButtonCode,
} from "@/components/buttons/big-shadow";
import {
  ThreeDAngledShadowButton,
  ThreeDAngledShadowButtonCode,
} from "@/components/buttons/3d-angled-shadow";

const componentsArray = [
  {
    title: "Tilted Shadow",
    components: [
      { component: TiltedShadowButton, code: TiltedShadowButtonCode },
    ],
  },
  {
    title: "Inset Shadow with Border",
    components: [{ component: InsetShadowButton, code: InsetShadowButtonCode }],
  },
  {
    title: "Spotlight",
    components: [{ component: SpotlightButton, code: SpotlightButtonCode }],
  },
  {
    title: "Big Shadow",
    components: [{ component: BigShadowButton, code: BigShadowButtonCode }],
  },
  {
    title: "3D Angled Shadow",
    components: [
      {
        component: ThreeDAngledShadowButton,
        code: ThreeDAngledShadowButtonCode,
      },
    ],
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
