"use client";

import { ToggleableComponentCard } from "../toggleable-component-code-card";
import {
  StopPlayingUnderscore,
  StopPlayingUnderscoreCode,
} from "../../../components/headings/stop-playing-underscore";
import DayByDay from "../../../components/headings/day-by-day";
import { DayByDayCode } from "../../../lib/code-strings";
import SmoothCurveUp, {
  SmoothCurveUpCode,
} from "@/components/headings/smooth-curve";

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
];

export default function LandingPagesPage() {
  return (
    <div className="flex flex-col gap-4 items-center">
      {/* TODO: add a description here */}
      <div>Landing Page Headings</div>
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
