"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ProjectCard from "../sub/ProjectCard";
import Button from "../ui/Button";
import { ProjectsData } from "@/assets/projects";

type Project = (typeof ProjectsData)[number];

const Projects = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      id="projects"
    >
      <h1 className="text-2xl md:text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-10 md:py-20">
        My Projects
      </h1>
      <div className="h-full w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10">
        {ProjectsData.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            onClick={() => setSelected(project)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="relative bg-[#0F0F1A] border border-[#2A0E61] rounded-xl shadow-2xl w-[80vw] max-w-[1200px] overflow-hidden flex flex-col-reverse md:flex-row md:min-h-[560px]"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Left — info */}
              <div className="flex flex-col justify-between md:p-8 p-3 md:w-[40%] overflow-y-auto max-h-[80vh]">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    {selected.title}
                  </h2>
                  {selected.role && (
                    <p className="text-sm text-purple-400 font-medium mt-2">
                      {selected.role}
                    </p>
                  )}
                  <p className="mt-4 text-gray-300 text-sm leading-relaxed">
                    {selected.description}
                  </p>
                  {selected.technologies &&
                    selected.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-6">
                        {selected.technologies.map((tech) => (
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
                {selected.url && (
                  <Button
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-block"
                    size="sm"
                  >
                    View Project
                  </Button>
                )}
              </div>

              {/* Right — image */}
              <div className="md:w-[60%] relative min-h-[260px] md:min-h-full">
                <Image
                  src={selected.src}
                  alt={selected.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-white bg-black/50 hover:bg-black/80 rounded-full w-8 h-8 flex items-center justify-center text-lg transition-colors z-10"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
