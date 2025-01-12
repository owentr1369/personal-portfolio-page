import React from "react";
import ProjectCard from "../sub/ProjectCard";
import { ProjectsData } from "@/assets/projects";

const Projects = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      id="projects"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        My Projects
      </h1>
      <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10 flex-wrap">
        {ProjectsData.map((project, index) => (
          <div style={{ width: "calc(100% / 3 - 1.68rem)" }} key={index}>
            <ProjectCard
              src={project.src}
              title={project.title}
              description={project.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
