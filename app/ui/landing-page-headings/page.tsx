"use client";

import ZenBrowserHeading from "../zen-browser-heading";
import { ToggleableComponentCard } from "../toggleable-component-code-card";
import {
  StopPlayingUnderscore,
  StopPlayingUnderscoreCode,
} from "../headings/stop-playing-underscore";

const componentsArray = [
  {
    title: "Underscore Heading",
    component: StopPlayingUnderscore,
    code: StopPlayingUnderscoreCode,
  },
  {
    title: "Day By Day",
    component: ZenBrowserHeading,
    code: "",
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
