"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Button from "@/components/ui/Button";

const MotionButton = motion(Button);

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row items-center justify-center px-6 md:px-20 mt-24 md:mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center md:items-start items-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[14px] border border-[#7042F99B] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Tran Thien Tam · Senior Frontend Engineer
          </h1>
        </motion.div>
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-4xl md:text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
        >
          <span>
            Shipping
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-purple-500">
              {" "}
              high-impact{" "}
            </span>
            products with AI
          </span>
        </motion.div>
        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-base md:text-lg text-gray-400 my-5 max-w-[600px]"
          style={{ textShadow: "0 1px 10px rgba(0,0,0,0.8)" }}
        >
          Senior Frontend Engineer with 4+ years of experience across web apps,
          Shopify apps, and Chrome extensions. Built AI-powered creative
          platforms recognized by Shopify Feature Spotlight — specialized in
          React, Vue, Next.js, and TypeScript with a focus on performance and
          scalable architecture.
        </motion.p>
        <MotionButton href="#projects" variants={slideInFromLeft(1)}>
          See My Work
        </MotionButton>
      </div>
      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center mt-8 md:mt-0"
      >
        <Image
          src="/mainIconsdark.svg"
          alt="works icons"
          height={650}
          width={650}
          className="w-full md:max-w-none"
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
