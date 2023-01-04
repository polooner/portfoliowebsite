import React from "react";
import { motion } from "framer-motion";

type Props = {};

function BgShapes({}: Props) {
  return (
    <motion.section
      initial={{
        opacity: 0,
      }}
      animate={{
        scale: [0.8, 1],
        opacity: [0.5, 1, 0.5],
        borderRadius: "50%",
        rotate: 90,
      }}
      transition={{
        duration: 6,
        ease: "easeInOut",
        times: 1,
        repeat: Infinity,
        repeatDelay: 10,
      }}
      className="relative flex justify-center items-center"
    >
      <div className="absolute border border-gray-500 h-[200px] rounded-full w-[200px] mt-52 animate-ping"></div>
      <div className="absolute border border-gray-500 h-[150px] rounded-full w-[150px] mt-52 animate-ping"></div>
      <div className="absolute border border-gray-600 h-[200px] rounded-full w-[200px] mt-52 animate-ping"></div>
      <div className="absolute border border-gray-900 h-[300px] rounded-full w-[300px] mt-52 animate-ping"></div>
      <div></div>
    </motion.section>
  );
}

export default BgShapes;
