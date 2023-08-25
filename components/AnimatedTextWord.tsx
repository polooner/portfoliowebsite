import { motion } from 'framer-motion';

interface AnimatedTextDivProps
  extends React.ComponentPropsWithoutRef<'div'> {
  text: string;
}

const AnimatedTextWord = (props: AnimatedTextDivProps) => {
  const words = props.text.split(' ');

  // Variants for Container of words.
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  // Variants for each word.

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial='hidden'
      className=' whitespace-pre sm:max-h-[400px] sm:max-w-[300px]'
      animate='visible'
      style={{
        height: '400px',
        width: '400px',
      }}
    >
      {words.map((word, index) => (
        <motion.h1
          className='heading'
          variants={child}
          style={{ marginRight: '5px' }}
          key={index}
        >
          {word}
        </motion.h1>
      ))}
    </motion.div>
  );
};

export default AnimatedTextWord;
