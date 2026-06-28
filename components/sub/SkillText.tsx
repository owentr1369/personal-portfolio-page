"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { slideInFromLeft, slideInFromRight, slideInFromTop } from '@/utils/motion'
import { SparklesIcon } from '@heroicons/react/24/solid'

const SkillText = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
      <motion.div
        variants={slideInFromTop}
        className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
      >
        <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
        <h1 className="Welcome-text text-[13px]">
          React · Vue · Next.js · TypeScript · Shopify · AI
        </h1>
      </motion.div>
      <motion.div
        variants={slideInFromLeft(0.5)}
        className='text-xl md:text-[30px] text-white font-medium mt-[10px] text-center mb-[15px]'
      >
        My Technical Skills & Tools
      </motion.div>
      <motion.div
        variants={slideInFromRight(0.5)}
        className='cursive text-base md:text-[20px] text-gray-200 mb-10 mt-[10px] text-center'
      >
        From frontend architecture to AI-powered workflows
      </motion.div>
    </div>
  )
}

export default SkillText