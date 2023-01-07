import React from 'react';
import { motion } from 'framer-motion';

type Props = {};

export default function AboutSection({}: Props) {
  return (
    <article
      id='ab'
      className='h-screen text-center items-center middle justify-center flex flex-col relative'
    >
      <h1 className='tracking-tight font-extrabold py-16 md:text-[72px] text-4xl bg-gradient-to-r from-black to-blue-400 bg-clip-text text-transparent'>
        About
      </h1>
      <motion.p
        className=' text-gray-500 md:mx-52 my-20 mx-10 font-light text-md md:text-xl text-start'
        initial={{
          x: -200,
          opacity: 0,
        }}
        whileInView={{
          x: 0,
          opacity: 1,
        }}
      >
        I&apos;m Filip Wojda, a Computer Science Student and soon-to-be Software
        Engineer with Full Stack Development experience. While I&apos;m based in
        New York City, I help build innovative websites for individuals all over
        the world. I believe beautiful, efficient and modern application should
        be more accessible.
        <br></br>
        <br></br>A few months ago, I became interested in developing websites
        and interfaces. Since then, I enrolled in a City University of New York,
        have been steadily improving my skills, and landed an internship. Now I
        am working on cutting edge Python and web applications for open source
        contributions and myself.
        <br></br>
        <br></br>
        While designing optimized and modern, multiplatfrom user experiences, I
        have interest in System Design - prototyping data intensive ecosystems
        that require great scaling capabilities is a great goal of mine.
      </motion.p>
    </article>
  );
}
