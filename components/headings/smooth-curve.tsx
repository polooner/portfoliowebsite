"use client";

import { useCallback, useState } from "react";
import { TemplateComponentProps } from "./stop-playing-underscore";
import { AnimatePresence, motion } from "framer-motion";
import SimpleCard from "../ui/cards/simple";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function SmoothCurveUp({ key }: TemplateComponentProps) {
  const sentences = [
    "So like this is the first sentence.",
    "Here's the second one.",
    "i like lower case so here is lowercase.",
    "i think self-start looks cool here.",
  ];

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const handleAnimationComplete = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => {
      if (currentSentenceIndex < sentences.length - 1) {
        setCurrentSentenceIndex((prevIndex) => prevIndex + 1);
        setIsAnimating(true);
      }
    }, 1000);
  }, [currentSentenceIndex, sentences.length]);

  return (
    <div
      className="flex flex-col justify-center items-center w-full min-w-full h-[75dvh] flex-wrap"
      key={key}
    >
      <div className="flex flex-col pt-[6vh] items-center self-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center self-center mx-auto md:w-8/12">
          <h1 className="text-5xl font-semibold mb-4 tracking-tighter">
            Useful for having a few different copies in the headline.
          </h1>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSentenceIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-row text-4xl flex-wrap justify-center tracking-tighter self-start"
              style={{ maxWidth: "80vw" }}
            >
              {sentences[currentSentenceIndex].split(" ").map((word, i) => (
                <motion.span
                  className="inline-block mr-2"
                  key={i}
                  initial={{ y: "12px", filter: "blur(2px)", opacity: 0 }}
                  animate={{ y: "0", filter: "blur(0px)", opacity: 1 }}
                  transition={{
                    type: "spring",
                    bounce: 0.35,
                    delay: i * 0.1,
                  }}
                  onAnimationComplete={
                    i ===
                      sentences[currentSentenceIndex].split(" ").length - 1 &&
                    isAnimating
                      ? handleAnimationComplete
                      : undefined
                  }
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
          <Button
            variant={"tiltingShadow"}
            size={"minimal"}
            className="self-start mt-4"
          >
            And now we spend <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pt-8">
          <SimpleCard
            title="Featuring"
            description="good filler content"
            upperHalfContent={
              <p className="text-center text-md self-center items-center h-full justify-center p-2 flex">
                this will we a cool ascii image. i promise. in the meantime you
                have to read this text and bear with the not so nice looks of
                it.
              </p>
            }
          />
          <SimpleCard
            title="Featuring"
            className="hidden lg:block"
            description="even better filler content"
            upperHalfContent={
              <p className="text-center text-md self-center items-center h-full justify-center p-2 flex">
                this will we a cool ascii image. i promise. in the meantime you
                have to read this text and bear with the not so nice looks of
                it.
              </p>
            }
          />
          <SimpleCard
            title="Featuring"
            className="hidden xl:block"
            description="better filler content"
            upperHalfContent=""
          />
        </div>
      </div>
    </div>
  );
}

export const SmoothCurveUpCode = `"use client";

import { useCallback, useState } from "react";
import { TemplateComponentProps } from "./stop-playing-underscore";
import { AnimatePresence, motion } from "framer-motion";
import SimpleCard from "../ui/cards/simple";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function SmoothCurveUp({ key }: TemplateComponentProps) {
  const sentences = [
    "So like this is the first sentence.",
    "Here's the second one.",
    "i like lower case so here is lowercase.",
    "i think self-start looks cool here.",
  ];

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const handleAnimationComplete = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => {
      if (currentSentenceIndex < sentences.length - 1) {
        setCurrentSentenceIndex((prevIndex) => prevIndex + 1);
        setIsAnimating(true);
      }
    }, 1000);
  }, [currentSentenceIndex, sentences.length]);

  return (
    <div
      className="flex flex-col justify-center items-center w-full min-w-full h-[75dvh] flex-wrap"
      key={key}
    >
      <div className="flex flex-col pt-[6vh] items-center self-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center self-center mx-auto md:w-8/12">
          <h1 className="text-5xl font-semibold mb-4 tracking-tighter">
            Useful for having a few different copies in the headline.
          </h1>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSentenceIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-row text-4xl flex-wrap justify-center tracking-tighter self-start"
              style={{ maxWidth: "80vw" }}
            >
              {sentences[currentSentenceIndex].split(" ").map((word, i) => (
                <motion.span
                  className="inline-block mr-2"
                  key={i}
                  initial={{ y: "12px", filter: "blur(2px)", opacity: 0 }}
                  animate={{ y: "0", filter: "blur(0px)", opacity: 1 }}
                  transition={{
                    type: "spring",
                    bounce: 0.35,
                    delay: i * 0.1,
                  }}
                  onAnimationComplete={
                    i ===
                      sentences[currentSentenceIndex].split(" ").length - 1 &&
                    isAnimating
                      ? handleAnimationComplete
                      : undefined
                  }
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
          <Button
            variant={"tiltingShadow"}
            size={"minimal"}
            className="self-start mt-4"
          >
            And now we spend <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pt-8">
          <SimpleCard
            title="Featuring"
            description="good filler content"
            upperHalfContent={
              <p className="text-center text-md self-center items-center h-full justify-center p-2 flex">
                this will we a cool ascii image. i promise. in the meantime you
                have to read this text and bear with the not so nice looks of
                it.
              </p>
            }
          />
          <SimpleCard
            title="Featuring"
            className="hidden lg:block"
            description="even better filler content"
            upperHalfContent={
              <p className="text-center text-md self-center items-center h-full justify-center p-2 flex">
                this will we a cool ascii image. i promise. in the meantime you
                have to read this text and bear with the not so nice looks of
                it.
              </p>
            }
          />
          <SimpleCard
            title="Featuring"
            className="hidden xl:block"
            description="better filler content"
            upperHalfContent=""
          />
        </div>
      </div>
    </div>
  );
}
`;
