"use client";

import SimpleCard, { SimpleCardCode } from "@/components/ui/cards/simple";
import { ToggleableComponentCard } from "../toggleable-component-code-card";

const componentsArray = [
  {
    title: "Simple Card",
    component: SimpleCard,
    code: SimpleCardCode,
    componentProps: {
      title: "Simple Card",
      description:
        "A simple card with a title and description. Oh and some shadow on hover.",
      upperHalfContent: (
        <div className="w-full h-full flex items-center justify-center">
          Upper Half Content
        </div>
      ),
    },
    animateAble: false,
  },
];

export default function CardsPage() {
  return (
    <div className="flex flex-col gap-4 items-center">
      {/* TODO: add a description here */}
      <div>Cards</div>
      {componentsArray.map(
        (
          { component: Component, code, title, animateAble, componentProps },
          index
        ) => (
          <ToggleableComponentCard
            key={index}
            component={Component}
            contentClassName="flex items-center justify-center min-h-[35dvh]"
            code={code}
            title={title}
            animateAble={animateAble}
            componentProps={componentProps}
          />
        )
      )}
    </div>
  );
}
