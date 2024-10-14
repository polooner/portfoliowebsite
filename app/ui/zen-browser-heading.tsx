"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ZenBrowserHeading() {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-full flex-col justify-center text-center">
      <div className="relative">
        {/* animate opacitty */}
        <AnimatedText />
        {/* animate opacitty */}
        <div className="pointer-events-none absolute right-20 top-[-5px] mt-12 hidden h-fit w-fit !rotate-[15deg] transform animate-fade-in rounded-full bg-stone-100 border-2 px-3 py-1 opacity-100 shadow [--animation-delay:400ms] md:block">
          Yessir!
        </div>
        {/* animate opacitty */}
        <p className="mb-12 -translate-y-4 animate-fade-in text-balance text-lg tracking-tight text-gray-400 opacity-100 [--animation-delay:400ms] md:text-xl">
          Beautifully gradient, minimally spaced, and packed with character.
          <br className="hidden md:block" /> I care about your taste. Please
          make your startup look good.
        </p>
        <div className="flex w-full flex-col justify-center md:flex-row">
          <Button
            asChild
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 dark:bg-white bg-black text-white shadow hover:bg-black/90 h-12 px-8 py-4 -translate-y-4 animate-fade-in gap-1  opacity-100 ease-in-out [--animation-delay:600ms] dark:text-black"
          >
            <Link href="/download">
              <span>Copy This Now</span>
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>

          {/* animate opacitty */}
          <Button
            asChild
            variant="ghost"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-12 px-8 py-4 mt-4 md:ml-4 md:mt-0 hover:"
          >
            <Link
              className="-translate-y-4 opacity-100 [--animation-delay:800ms]"
              href="#features"
            >
              Link To Nothing <ChevronDown className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

const AnimatedText = () => {
  const text = "Nice fade in, great ripple";
  const words = text.split(" ");

  return (
    <div className="relative mb-3 mt-5 -translate-y-4 text-balance bg-gradient-to-br from-30% to-black/40 bg-clip-text py-6 text-5xl font-semibold leading-none tracking-tighter text-transparent opacity-100 [--animation-delay:200ms] dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-8xl text-black">
      <h1 className="pb-4 select-none">
        {words.map((word, index) => (
          <motion.span
            key={index}
            style={{
              backgroundImage: "linear-gradient(90deg, #0077e7, #01d8d1)",
              backgroundClip: "text",
              color: "transparent",
              filter: "hue-rotate(0deg)",
              animation: "animate-hue-shift 10s linear 1s infinite",
              display: "inline-block",
              marginRight: "0.25em",
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-black"
            transition={{
              duration: 0.2,
              delay: index * 0.05,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
          >
            {word}
          </motion.span>
        ))}
      </h1>
    </div>
  );
};
