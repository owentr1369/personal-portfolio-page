import Image from "next/image";
import React from "react";

interface Props {
  src: string;
  title: string;
  description: string;
  technologies?: string[];
  url?: string;
}

const ProjectCard = ({ src, title, description, technologies, url }: Props) => {
  const CardWrapper = url ? "a" : "div";

  return (
    <CardWrapper
      {...(url
        ? { href: url, target: "_blank", rel: "noopener noreferrer" }
        : {})}
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
        <h1 className="text-lg md:text-2xl font-semibold text-white">
          {title}
        </h1>
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
    </CardWrapper>
  );
};

export default ProjectCard;
