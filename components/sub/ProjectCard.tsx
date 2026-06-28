"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

interface Props {
  src: string;
  title: string;
  description: string;
  technologies?: string[];
  url?: string;
}

const ProjectCard = ({ src, title, description, technologies, url }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] flex flex-col group cursor-pointer"
      >
        <Image
          src={src}
          alt={title}
          width={1000}
          height={1000}
          className="w-full object-cover h-[160px] group-hover:opacity-80 transition-opacity duration-300"
        />
        <div className="relative p-4 flex flex-col flex-1">
          <h1 className="text-lg md:text-2xl font-semibold text-white">{title}</h1>
          <p className="mt-2 text-gray-300 text-sm flex-1">{description}</p>
          {technologies && technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs rounded-full border border-purple-500/50 text-purple-300 bg-purple-500/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="relative bg-[#0F0F1A] border border-[#2A0E61] rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Image
                src={src}
                alt={title}
                width={1000}
                height={1000}
                className="w-full object-cover h-[240px] md:h-[400px]"
              />
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-white bg-black/50 hover:bg-black/80 rounded-full w-8 h-8 flex items-center justify-center text-lg transition-colors"
              >
                ×
              </button>
              <div className="p-6">
                <h2 className="text-xl md:text-2xl font-semibold text-white">{title}</h2>
                <p className="mt-3 text-gray-300 text-sm leading-relaxed">{description}</p>
                {technologies && technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full border border-purple-500/50 text-purple-300 bg-purple-500/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {url && (
                  <Button
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-block"
                  >
                    View Project →
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
