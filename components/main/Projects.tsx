import React from "react";
import ProjectCard from "../sub/ProjectCard";
import { ProjectsData } from "@/assets/projects";

const Projects = () => {
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
            src={project.src}
            title={project.title}
            description={project.description}
            technologies={project.technologies}
            url={project.url}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
