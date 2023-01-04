import React from "react";
import { motion } from "framer-motion";

type Props = {};

const About = (props: Props) => {
  return (
    <article
      id="ab"
      className="h-screen flex flex-col relative text-center items-center mx-10 my-8 md:my-16 justify-center"
    >
      <h1 className="top-[10%] tracking-tight font-extrabold text-4xl mb-[2%] bg-gradient-to-r from-black to-blue-400 bg-clip-text text-transparent">
        About
      </h1>
      <motion.p
        className="md:max-w-[60%] max-w-[80%] text-gray-500 font-light text-md md:text-xl text-start m-[2%]"
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
};

export default About;
