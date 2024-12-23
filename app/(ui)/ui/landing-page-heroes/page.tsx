"use client";

import { ToggleableComponentCard } from "../toggleable-component-code-card";
import {
  StopPlayingUnderscore,
  StopPlayingUnderscoreInstructions,
} from "@/components/landing-page-heroes.tsx/stop-playing-underscore";
import {
  DayByDayInstructions,
  LandingPage as DayByDay,
} from "@/components/landing-page-heroes.tsx/day-by-day";
import {
  LandingPage as SmoothCurveUp,
  SmoothCurveUpInstructions,
} from "@/components/landing-page-heroes.tsx/smooth-curve";
import {
  LandingPage as MarketingAgency,
  MarketingAgencyLandingPageInstructions,
} from "@/components/landing-page-heroes.tsx/marketing-agency";
import {
  LandingPage as AllYouNeed,
  AllYouNeedInstructions,
} from "@/components/landing-page-heroes.tsx/all-you-need";
import {
  LandingPage as LowercaseIsKing,
  LowercaseIsKingInstructions,
} from "@/components/landing-page-heroes.tsx/lowercase-is-king";
import {
  LandingPage as Elegant,
  ElegantCodeInstructions,
} from "@/components/landing-page-heroes.tsx/elegant";
import {
  LandingPage as EveryOtherStartup,
  EveryOtherStartupInstructions,
} from "@/components/landing-page-heroes.tsx/every-other-startup";
import { ComponentData, ComponentShowcase } from "@/types";

const componentsArray: ComponentShowcase[] = [
  {
    title: "Stop Playing Underscore",
    components: [
      {
        component: StopPlayingUnderscore,
        instructions: StopPlayingUnderscoreInstructions,
      },
    ],
  },
  {
    title: "Day By Day",
    components: [
      {
        component: DayByDay,
        instructions: DayByDayInstructions,
      },
    ],
  },
  {
    title: "Smooth curve up",
    components: [
      {
        component: SmoothCurveUp,
        instructions: SmoothCurveUpInstructions,
      },
    ],
  },
  {
    title: "Marketing Agency",
    components: [
      {
        component: MarketingAgency,
        animatable: true,
        instructions: MarketingAgencyLandingPageInstructions,
      },
    ],
  },
  {
    title: "All You Need",
    components: [
      {
        component: AllYouNeed,
        instructions: AllYouNeedInstructions,
      },
    ],
  },
  {
    title: "Lowercase is King",
    components: [
      {
        component: LowercaseIsKing,
        instructions: LowercaseIsKingInstructions,
      },
    ],
  },
  {
    title: "Elegant",
    components: [
      {
        component: Elegant,
        instructions: ElegantCodeInstructions,
      },
    ],
  },
  {
    title: "Every Other Startup",
    components: [
      {
        component: EveryOtherStartup,
        instructions: EveryOtherStartupInstructions,
      },
    ],
  },
];

export default function LandingPagesPage() {
  return (
    <div className="flex flex-col gap-12 items-center">
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
