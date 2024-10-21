"use client";

import SimpleCard, { SimpleCardCode } from "@/components/ui/cards/simple-card";
import { ToggleableComponentCard } from "../toggleable-component-code-card";
import TransformerCard from "@/components/ui/cards/transformer-card";

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
  {
    title: "Transformer Card",
    component: TransformerCard,
    // code: TransformerCardCode,
    code: "",
    componentProps: {
      title: "Transformer Card",
      footerContent: <p>Last updated idk</p>,
      description:
        "Nice border difference, menu trigger that transforms the card into a menu.",
      mainContent: (
        <div className="w-full h-full flex items-center justify-center text-start">
          i really appreciate a good padding. isn't it crazy that these little
          things can have so much character? you are staring at a bunch of
          pixels that end up expressing so much.
          <br />
          <br />
          but most importantly, visual communication is key. you are staring at
          a bunch of pixels that end up expressing so much. so look at this
          shadow below. doesn't it make you feel like this text is about to end?
          <br />
          <br />
          annnd there we go. it's ending. it's over. and the end of the box is
          right here too.
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
