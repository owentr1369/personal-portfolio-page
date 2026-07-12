"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const SkillText = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div
        variants={slideInFromTop}
        className="Welcome-box py-2 px-5 border border-[#7042f88b] opacity-[0.9]"
      >
        <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
        <h1 className="Welcome-text text-[13px]">{t.skills.badge}</h1>
      </motion.div>
      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-xl md:text-[30px] text-white font-medium mt-[10px] text-center mb-[15px]"
      >
        {t.skills.heading}
      </motion.div>
      <motion.div
        variants={slideInFromRight(0.5)}
        className="cursive text-base md:text-[20px] text-gray-200 mb-10 mt-[10px] text-center"
      >
        {t.skills.subtext}
      </motion.div>
    </div>
  );
};

export default SkillText;
