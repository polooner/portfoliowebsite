import React, { JSXElementConstructor, ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {};

interface CardProps {
  icon: React.ReactElement;
  title: string;
}

const Skill = ({ icon, title }: CardProps) => (
  <motion.div
    whileHover={{ scale: 1.3, originX: 0.4, originZ: 1, y: 20 }}
    className="hover:font-black font-bold text-xs md:text-lg md:h-[70%] md:w-[80%] h-32 w-20 flex flex-col justify-center items-center shadow-xl hover:shadow-2xl hover:shadow-slate-600 p-2 md:p-4 shadow-slate-100 duration-100 rounded-xl"
  >
    <div className="card-icon">{icon}</div>
    <h1 className="p-3">{title}</h1>
  </motion.div>
);

export default Skill;
