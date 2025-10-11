import { motion } from 'framer-motion';
import type { CompletedLine } from './streaming-text-carousel-types';

export const CompletedLineComponent = ({
  line,
  index,
  scaleFactor,
}: {
  line: CompletedLine;
  index: number;
  scaleFactor: number;
}) => {
  const scale = Math.pow(scaleFactor, index + 1);
  const yOffset = -35 - index * 15;
  const opacity = Math.max(0, 0.3 - index * 1.5);

  const blurAmount = (index + 1) * 3.5;

  const isNewLine = index === 0;

  const scaleEasing = isNewLine ? [0.65, 0, 0.35, 1] : [0.2, 0.25, 0.4, 0.8];

  return (
    <motion.div
      key={line.id}
      layout
      initial={
        isNewLine
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
            }
          : false
      }
      animate={{
        opacity,
        y: yOffset,
        scale,
        filter: `blur(${blurAmount}px)`,
        transition: {
          duration: 0.4,
          y: { ease: [0.22, 1, 0.36, 1] },
          scale: { ease: scaleEasing as any },
          opacity: { ease: 'easeOut' },
          filter: { ease: 'easeOut', duration: 0.4 },
        },
      }}
      exit={{
        opacity: 0,
        filter: 'blur(12px)',
        transition: {
          duration: 0.2,
          filter: { ease: 'easeIn' },
        },
      }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <p className="text-lg font-medium text-center px-8">{line.text}</p>
    </motion.div>
  );
};
