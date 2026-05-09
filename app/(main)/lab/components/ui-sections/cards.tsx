'use client';

import SimpleCard, { SimpleCardInstructions } from '@/components/ui/cards/simple-card';
import { ComponentShowcase } from '@/types';
import { ToggleableComponentCard } from '../toggleable-component-code-card';

const componentsArray: ComponentShowcase[] = [
  {
    title: 'Simple Card',
    components: [
      {
        component: SimpleCard,
        instructions: SimpleCardInstructions,
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
];

export function CardsSection() {
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
