import React from 'react';
import { motion } from 'framer-motion';

type Props = {};

interface ProjectProps {
  title: string;
  skillsEng: string[];
  skillsUsed: React.ReactNode[];
  dateStarted: string;
  points: string[];
}

const ProjectCard = ({
  title,
  skillsEng,
  skillsUsed,
  dateStarted,
  points,
}: ProjectProps) => {
  return (
    <article
      className='flex flex-col rounded-lg items-center flex-shrink-0 justify-evenly
        w-[300px] md:w-[400px] xl:w-[600px] h-[400px] md:h-[550px] xl:h-[600px] snap-center bg-gradient-to-bl from-white to-slate-100 opacity-60 hover:opacity-100 duration-300'
    >
      <div className='px-[5%]'>
        <h1 className='text-2xl md:text-4xl font-bold mb-6 tracking-tight'>
          {title}
        </h1>
        <p className='font-bold text-lg md:text-2xl mt-1'>
          {skillsEng.map((skill) => ` |  ${skill}  | `)}
        </p>
        <div className='flex space-x-2 justify-center my-2'>
          {skillsUsed.map((skill) => skill)}
        </div>
        <p className='uppercase py-5 text-gray-300'>{dateStarted}</p>
        <ul
          id="skill's list"
          className='text-start font-semibold list-disc space-y-4 ml-5 text-xs md:text-md'
        >
          {points.map((point, index) => (
            <li key={`${index}`}>{point}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default ProjectCard;
