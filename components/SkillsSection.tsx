import React from 'react';
import {
  FaGit,
  FaPython,
  FaSwift,
  FaJsSquare,
  FaHtml5,
  FaCss3,
  FaReact,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiTypescript,
  SiTwilio,
  SiPostman,
  SiIbm,
} from 'react-icons/si';
import Skill from './Skill';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Props = {};

export default function SkillsSection({}: Props) {
  return (
    <motion.article
      className='max-h-fit text-center items-center justify-center'
      initial={{
        x: -200,
        opacity: 0,
      }}
      whileInView={{
        x: 0,
        opacity: 1,
      }}
    >
      <h1 className='font-extrabold py-16 md:text-[72px] text-4xl md:py-16 tracking-tight bg-gradient-to-r from-black to-blue-400 bg-clip-text text-transparent'>
        Skills
      </h1>
      <div className=' max-h-fit gap-y-2  items-center justify-items-center grid grid-flow-row grid-rows-4 grid-cols-4 lg:grid-rows-3 lg:grid-cols-5'>
        <Skill
          icon={<Image src='/javascript.png' alt='me' width='70' height='70' />}
          title={'JavaScript'}
        />
        <Skill
          icon={<Image src='/python.png' alt='me' width='70' height='70' />}
          title={'Python'}
        />
        <Skill
          icon={<Image src='/typescript.png' alt='me' width='70' height='70' />}
          title={'TypeScript'}
        />
        <Skill
          icon={<Image src='/html5.png' alt='me' width='70' height='70' />}
          title={'HTML5'}
        />
        <Skill
          icon={<Image src='/css.png' alt='me' width='70' height='70' />}
          title={'CSS3'}
        />
        <Skill
          icon={
            <Image src='/react-native.png' alt='me' width='70' height='70' />
          }
          title={'React.js'}
        />
        <Skill
          icon={<Image src='/next.png' alt='me' width='70' height='70' />}
          title={'Next.js'}
        />
        <Skill
          icon={
            <Image src='/tailwindcss.png' alt='me' width='70' height='70' />
          }
          title={'Tailwind CSS'}
        />
        <Skill
          icon={<Image src='/framer.png' alt='me' width='70' height='70' />}
          title={'Framer Motion'}
        />
        <Skill
          icon={<Image src='/git.png' alt='me' width='70' height='70' />}
          title={'Git'}
        />
        <Skill
          icon={<Image src='/swift.png' alt='me' width='70' height='70' />}
          title={'Swift'}
        />
        <Skill
          icon={<Image src='/postman.png' alt='me' width='70' height='70' />}
          title={'Postman'}
        />
        <Skill
          icon={<Image src='/twilio.png' alt='me' width='70' height='70' />}
          title={'Twilio'}
        />
        <Skill
          icon={<Image src='/figma.png' alt='me' width='70' height='70' />}
          title={'Figma'}
        />
        <Skill
          icon={<Image src='/selenium.png' alt='me' width='70' height='70' />}
          title={'Selenium'}
        />
        <Skill
          icon={<Image src='/sanity.png' alt='me' width='70' height='70' />}
          title={'Sanity'}
        />
      </div>
    </motion.article>
  );
}
