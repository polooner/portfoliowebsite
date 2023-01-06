import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { SiNextdotjs, SiReact, SiFramer } from 'react-icons/si';
import { GiSandsOfTime } from 'react-icons/gi';

type Props = {};

export default function ProjectsSection({}: Props) {
  return (
    <motion.article
      id='pjts'
      className='max-h-fit text-center items-center justify-center py-8'
      initial={{
        x: -200,
        opacity: 0,
      }}
      whileInView={{
        x: 0,
        opacity: 1,
      }}
    >
      <h1 className='py-16 md:text-[72px] text-4xl tracking-tight font-extrabold bg-gradient-to-r from-black to-blue-400 bg-clip-text text-transparent'>
        Projects
      </h1>
      <motion.div
        className=' flex overflow-hidden flex-col md:flex-row max-w-full
        md:px-10 px-2 justify-evenly items-center'
      >
        <div className='w-full flex space-x-4 overflow-x-scroll px-10 py-2 pb-8 snap-x snap-mandatory'>
          <ProjectCard
            title='Portfolio Website'
            dateStarted='December 2022 - Present'
            points={[
              'Modern, animated components styled in Tailwind CSS',
              'Next.js for optimized Server Side rendering',
              'TypeScript React for increased developer experience',
            ]}
            skillsEng={['Next.js', 'React.js']}
            skillsUsed={[
              <SiNextdotjs key={1} size={40} />,
              <SiReact key={2} size={40} />,
            ]}
          />
          <ProjectCard
            title='Tech Dev Links'
            dateStarted='Present'
            points={[
              'Served by a MongoDB RESTful API',
              'Material UI for modern, clean components',
              'Authentication-flow protected admin dashboard',
              'CMS connected and managed',
            ]}
            skillsEng={[
              'Next.js',
              'React.js',
              'Framer Motion',
              'Tailwind CSS',
              'MongoDB',
              'Material UI',
            ]}
            skillsUsed={[<GiSandsOfTime key={3} size={100} />]}
          />
        </div>
      </motion.div>
    </motion.article>
  );
}
