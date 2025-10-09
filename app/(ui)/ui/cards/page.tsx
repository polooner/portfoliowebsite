'use client';

import SimpleCard, { SimpleCardInstructions } from '@/components/ui/cards/simple-card';
import {
  TransformerCard,
  TransformerCardWithInstructions,
} from '@/components/ui/cards/transformer/plain';
import {
  TransformerCardWithFramerAndMenu,
  TransformerCardWithFramerAndMenuInstructions,
} from '@/components/ui/cards/transformer/with-framer';
import { ComponentShowcase } from '@/types';
import { ToggleableComponentCard } from '../toggleable-component-code-card';

const componentsArray: ComponentShowcase[] = [
  {
    title: 'Simple Card',
    components: [
      {
        component: SimpleCard,
        instructions: SimpleCardInstructions,
        // TODO: make this generic
        componentProps: {
          title: 'Simple Card',
          description: 'A simple card with a title and description. Oh and some shadow on hover.',
          upperHalfContent: (
            <div className="w-full h-full flex items-center justify-center">Upper Half Content</div>
          ),
        },
      },
    ],
  },
  {
    title: 'Transformer Card',
    components: [
      {
        component: TransformerCardWithFramerAndMenu,
        instructions: TransformerCardWithFramerAndMenuInstructions,
        variant: 'with animations',
        componentProps: {
          title: 'Transformer Card family',
          footerContent: <p className="text-xs">Last updated idk</p>,
          description: 'Nice border difference, menu trigger that transforms the card into a menu.',
          mainContent: (
            <div className="w-full h-full flex items-center justify-center text-start">
              i really appreciate a good padding. isn&apos;t it crazy that these little things can
              have so much character? you are staring at a bunch of pixels that end up expressing so
              much.
              <br />
              <br />
              but most importantly, visual communication is key. you are staring at a bunch of
              pixels that end up expressing so much. so look at this shadow below. doesn&apos;t it
              make you feel like this text is about to end?
              <br />
              <br />
              annnd there we go. it&apos;s ending. it&apos;s over. and the end of the box is right
              here too.
            </div>
          ),
        },
      },
      {
        component: TransformerCard,
        instructions: TransformerCardWithInstructions,
        variant: 'just a card',
        componentProps: {
          title: 'Transformer Card family',
          footerContent: <p className="text-xs">Last updated idk</p>,
          description: 'Nice border difference, menu trigger that transforms the card into a menu.',
          mainContent: (
            <div className="w-full h-full flex items-center justify-center text-start">
              i really appreciate a good padding. isn&apos;t it crazy that these little things can
              have so much character? you are staring at a bunch of pixels that end up expressing so
              much.
              <br />
              <br />
              but most importantly, visual communication is key. you are staring at a bunch of
              pixels that end up expressing so much. so look at this shadow below. doesn&apos;t it
              make you feel like this text is about to end?
              <br />
              <br />
              annnd there we go. it&apos;s ending. it&apos;s over. and the end of the box is right
              here too.
            </div>
          ),
        },
      },
    ],
  },
];

export default function CardsPage() {
  return (
    <div className="flex flex-col gap-12 items-center">
      <div>Cards</div>
      {componentsArray.map(({ components, title }, index) => (
        <ToggleableComponentCard
          components={components}
          key={index}
          contentClassName="flex items-center justify-center min-h-[35dvh] w-full p-6"
          title={title}
        />
      ))}
    </div>
  );
}
