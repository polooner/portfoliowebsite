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
    component: StopPlayingUnderscore,
    code: StopPlayingUnderscoreCode,
  },
  {
    title: "Day By Day",
    component: DayByDay,
    code: DayByDayCode,
    animateAble: true,
  },
  {
    title: "Smooth curve up",
    component: SmoothCurveUp,
    code: SmoothCurveUpCode,
    animateAble: true,
  },
];

export default function LandingPagesPage() {
  return (
    <div className="flex flex-col gap-4 items-center">
      {/* TODO: add a description here */}
      <div>Landing Page Headings</div>
      {componentsArray.map(
        ({ component: Component, code, title, animateAble }, index) => (
          <ToggleableComponentCard
            key={index}
            component={Component}
            code={code}
            title={title}
            animateAble={animateAble}
          />
        )
      )}
    </div>
  );
}

interface TemplateComponentProps {
  key: number;
}
