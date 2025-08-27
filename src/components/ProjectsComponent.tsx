"use client";
import React, { useState, useEffect } from "react";
import { projects } from "@/app/data/projectsData";

export default function ProjectsComponent() {
  const [isMobile, setIsMobile] = useState(false);
  const [expandedProject, setExpandedProject] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const toggleExpand = (index) => {
    if (expandedProject === index) {
      setExpandedProject(null);
    } else {
      setExpandedProject(index);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 pt-[200px]">
        <div className="mb-12 text-center">
          <h1 className="bg-gradient-to-br from-cyan-800 to-gray-800 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
            My Projects
          </h1>
          <p className="mx-auto mt-2 max-w-3xl text-lg text-gray-600">
            A collection of my recent work and personal projects
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`transform overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg ${
                expandedProject === index
                  ? "sm:col-span-3 md:col-span-full"
                  : ""
              }`}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  src={project.imageUrl}
                  alt={project.altText}
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlNWU1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+";
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md bg-white px-4 py-2 font-semibold text-cyan-800 transition-colors duration-200 hover:bg-cyan-800 hover:text-white"
                  >
                    Live Preview
                  </a>
                </div>
              </div>

              <div className="flex flex-col p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {project.title}
                </h3>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="mb-4 text-sm text-gray-700">
                  {expandedProject === index
                    ? project.description
                    : `${project.description.substring(0, 100)}...`}
                </p>

                <div className="flex items-center justify-between">
                  <button
                    className="text-sm font-medium text-cyan-800 hover:underline"
                    onClick={() => toggleExpand(index)}
                  >
                    {expandedProject === index ? "Read Less" : "Read More"}
                  </button>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-cyan-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-cyan-900"
                  >
                    View Project
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 17L17 7M17 7H7M17 7V17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
