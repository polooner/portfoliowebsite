import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { SiNextdotjs, SiReact, SiFramer } from "react-icons/si";
import { GiSandsOfTime } from "react-icons/gi";

type Props = {};

function Projects({}: Props) {
  return (
    <motion.article
      id="pjts"
      className="text-center my-8 md:my-16 relative h-screen place-items-center center"
      initial={{
        x: -200,
        opacity: 0,
      }}
      whileInView={{
        x: 0,
        opacity: 1,
      }}
    >
      <h1 className="my-16 text-4xl tracking-tight font-extrabold bg-gradient-to-r from-black text-transparent to-red-300 bg-clip-text">
        Projects
      </h1>
      <motion.div
        className=" flex overflow-hidden flex-col md:flex-row max-w-full
        md:px-10 px-2 justify-evenly items-center"
      >
        <div className="w-full flex space-x-4 overflow-x-scroll px-10 pb-8 snap-x snap-mandatory">
          <ProjectCard
            title="Portfolio Website"
            dateStarted="December 2022 - Present"
            points={[
              "Modern, animated components styled in Tailwind CSS",
              "Next.js for optimized Server Side rendering",
              "TypeScript React for increased developer experience",
            ]}
            skillsEng={["Next.js", "React.js"]}
            skillsUsed={[
              <SiNextdotjs key={1} size={40} />,
              <SiReact key={2} size={40} />,
            ]}
          />
          <ProjectCard
            title="WORK IN PROGRESS"
            dateStarted="Present"
            points={[]}
            skillsEng={[]}
            skillsUsed={[<GiSandsOfTime key={3} size={100} />]}
          />
          <ProjectCard
            title="WORK IN PROGRESS"
            dateStarted="Present"
            points={[]}
            skillsEng={[]}
            skillsUsed={[<GiSandsOfTime key={9} size={100} />]}
          />
          <ProjectCard
            title="WORK IN PROGRESS"
            dateStarted="Present"
            points={[]}
            skillsEng={[]}
            skillsUsed={[<GiSandsOfTime key={10} size={100} />]}
          />
        </div>
      </motion.div>
    </motion.article>
  );
}

export default Projects;
