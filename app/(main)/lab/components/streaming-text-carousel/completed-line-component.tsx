import { CompletedLine } from '@/app/(main)/lab/components/streaming-text-carousel/streaming-text-carousel-types';
import { motion } from 'framer-motion';

export const CompletedLineComponent = ({
  line,
  index,
  scaleFactor,
  maxVisibleCompletedLines,
}: {
  line: CompletedLine;
  index: number;
  scaleFactor: number;
  maxVisibleCompletedLines: number;
}) => {
  const scale = Math.pow(scaleFactor, index + 1);
  const yOffset = -31 - index * 13;
  const opacity = Math.max(0, 0.5 - index * (0.5 / maxVisibleCompletedLines));

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
          y: { ease: [0.25, 0.8, 0.4, 0.95] },
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
      <p className="sm:text-base text-xs font-medium text-center sm:px-8 px-px">{line.text}</p>
    </motion.div>
  );
};
