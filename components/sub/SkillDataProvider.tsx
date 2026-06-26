"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

interface Props {
  src: string;
  width: number;
  height: number;
  index: number;
}

const SkillDataProvider = ({ src, width, height, index }: Props) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.4, y: 30, rotate: -10 },
    visible: { opacity: 1, scale: 1, y: 0, rotate: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      variants={imageVariants}
      animate={inView ? "visible" : "hidden"}
      transition={{
        delay: index * 0.07,
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}
      whileHover={{ scale: 1.15, rotate: 5, transition: { duration: 0.2 } }}
      className="cursor-pointer"
    >
      <Image src={src} width={width} height={height} alt="skill image" />
    </motion.div>
  );
};

export default SkillDataProvider;
