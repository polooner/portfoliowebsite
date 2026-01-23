"use client"

import { InkBleed } from "@/components/ui/ink-bleed"
import { TransitionLink } from "./transition-link"


const INK_BLEED_CONFIG = {
  blur: 0.2,
  threshold: [0, 1, 1, 1] as [number, number, number, number],
  turbulence: {
    baseFrequency: 0.071,
    numOctaves: 2,
    scale: 2,
  },
};

export function MiniLogo() {
  return (
    <TransitionLink
      href="/design-experiments"
      className="absolute left-1/2 -translate-x-1/2 hover:opacity-70 transition-opacity"
    >
      <InkBleed intensity={"normal"} customConfig={INK_BLEED_CONFIG}>
        <span className="font-concrette text-xl leading-none text-white/70">
          sheer regards
        </span>
      </InkBleed>

    </TransitionLink>
  )
}
