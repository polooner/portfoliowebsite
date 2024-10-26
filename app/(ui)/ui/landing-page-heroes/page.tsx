"use client";

import { ToggleableComponentCard } from "../toggleable-component-code-card";
import {
  StopPlayingUnderscore,
  StopPlayingUnderscoreCode,
} from "../../../../components/landing-page-heroes.tsx/stop-playing-underscore";
import DayByDay from "../../../../components/landing-page-heroes.tsx/day-by-day";
import { DayByDayCode } from "../../../../lib/code-strings";
import SmoothCurveUp, {
  SmoothCurveUpCode,
} from "@/components/landing-page-heroes.tsx/smooth-curve";
import MarketingAgency, {
  MarketingAgencyCode,
} from "@/components/landing-page-heroes.tsx/marketing-agency";

const componentsArray = [
  {
    title: "Stop Playing Underscore",
    components: [
      {
        component: StopPlayingUnderscore,
        code: StopPlayingUnderscoreCode,
      },
    ],
  },
  {
    title: "Day By Day",
    components: [
      {
        component: DayByDay,
        code: DayByDayCode,
      },
    ],
  },
  {
    title: "Smooth curve up",
    components: [
      {
        component: SmoothCurveUp,
        code: SmoothCurveUpCode,
      },
    ],
  },
  {
    title: "Marketing Agency",
    components: [
      {
        component: MarketingAgency,
        animateAble: true,
        code: MarketingAgencyCode,
      },
    ],
  },
];

export default function LandingPagesPage() {
  return (
    <div className="flex flex-col gap-12 items-center">
      {/* TODO: add a description here */}
      <div>Landing Page Heroes</div>
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
