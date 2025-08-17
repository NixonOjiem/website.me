"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, DrawSVGPlugin, MotionPathPlugin } from "gsap/all";

// Define a type for technology
type Technology = {
  name: string;
  icon: JSX.Element;
};

// Added 'technologies' to the data structure
type WorkExperience = {
  year: string;
  title: string;
  company: string;
  description: string;
  color: string;
  technologies: Technology[];
};

// A simple library of SVG icons for the tech stack
const TechIcons: { [key: string]: JSX.Element } = {
  React: (/* existing */),
  TypeScript: (/* existing */),
  NodeJS: (/* existing */),
  NextJS: (/* existing */),
  GSAP: (/* existing */),

  VueJS: (
    <svg viewBox="0 0 128 128" fill="currentColor">
      <path d="M64 10L10 10l54 108 54-108H64z" fill="#41B883" />
      <path d="M64 10H44l20 40 20-40H64z" fill="#34495E" />
    </svg>
  ),
  Laravel: (
    <svg viewBox="0 0 128 128" fill="currentColor">
      <path d="M10 10l40 10 30 40 30-10 8 60-50 8-58-108z" />
    </svg>
  ),
  GraphQL: (
    <svg viewBox="0 0 128 128" fill="currentColor">
      <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="none" />
      <path d="M64 10v108M10 64h108M30 30l68 68M98 30L30 98" stroke="currentColor" strokeWidth="4" />
    </svg>
  ),
  Express: (
    <svg viewBox="0 0 128 128" fill="currentColor">
      <text x="10" y="70" fontSize="48" fontFamily="Arial">Ex</text>
    </svg>
  ),
  Tailwind: (
    <svg viewBox="0 0 128 128" fill="currentColor">
      <path d="M40 40c20-20 40 0 60 0s20 20 0 40c-20 20-40 0-60 0s-20-20 0-40z" />
    </svg>
  ),
  Redux: (
    <svg viewBox="0 0 128 128" fill="currentColor">
      <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="none" />
      <path d="M64 64c-20-20-40 0-20 20s40 0 20-20z" />
    </svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 128 128" fill="currentColor">
      <path d="M64 10c-10 30-10 60 0 108 10-48 10-78 0-108z" />
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 128 128" fill="currentColor">
      <path d="M64 10c-30 0-54 24-54 54s24 54 54 54 54-24 54-54S94 10 64 10z" />
      <path d="M64 40c-10 0-18 8-18 18s8 18 18 18 18-8 18-18-8-18-18-18z" />
    </svg>
  ),
  MySQL: (
    <svg viewBox="0 0 128 128" fill="currentColor">
      <path d="M20 100c20-40 60-80 88-60s-20 60-68 60z" />
    </svg>
  ),
  Jira: (
    <svg viewBox="0 0 128 128" fill="currentColor">
      <path d="M64 10l54 54-54 54-54-54 54-54z" />
    </svg>
  ),
  Docker: (
    <svg viewBox="0 0 128 128" fill="currentColor">
      <rect x="20" y="80" width="88" height="20" />
      <rect x="30" y="60" width="20" height="20" />
      <rect x="60" y="60" width="20" height="20" />
      <rect x="90" y="60" width="20" height="20" />
    </svg>
  ),
  Git: (
    <svg viewBox="0 0 128 128" fill="currentColor">
      <path d="M64 10l54 54-54 54-54-54 54-54z" />
      <circle cx="64" cy="64" r="10" fill="#fff" />
    </svg>
  ),
};


function TechStackDisplay({ technologies }: { technologies: Technology[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const items = containerRef.current.children;
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [technologies]); // Rerun animation when technologies change

  return (
    <div
      ref={containerRef}
      className="hidden xl:flex flex-col gap-4 items-start"
    >
      {technologies.map((tech, index) => (
        <div
          key={`${tech.name}-${index}`}
          className="flex items-center gap-4 bg-gray-100/50 p-3 rounded-lg"
        >
          <div className="w-8 h-8 text-gray-800">{tech.icon}</div>
          <span className="font-semibold text-gray-800">{tech.name}</span>
        </div>
      ))}
    </div>
  );
}

function WorkExperience() {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  // NEW: Ref for the entire floating content block
  const floatingContentRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  // NEW: Define the Y positions for the card to align with each year
  // These values might need tweaking to get the perfect alignment.
  const cardPositions = [120, 320, 520, 720, 920];

  const workData: WorkExperience[] = [
    {
      year: "2021",
      title: "Intern: Frontend Developer",
      company: "Information Communication Technology Authority",
      description:
        "Developed responsive web applications using React and TypeScript. Implemented state management solutions and optimized performance.",
      color: "#FFD1DC",
      technologies: [
        { name: "React", icon: TechIcons.React },
        { name: "TypeScript", icon: TechIcons.TypeScript },
        { name: "GSAP", icon: TechIcons.GSAP },
      ],
    },
    {
      year: "2022",
      title: "Frontend Developer",
      company: "Upwork",
      description:
        "Created interactive user interfaces with modern CSS techniques. Collaborated with UX designers to implement design systems for various clients.",
      color: "#FFDFBA",
      technologies: [
        { name: "React", icon: TechIcons.React },
        { name: "GSAP", icon: TechIcons.GSAP },
      ],
    },
    {
      year: "2023",
      title: "Senior React Developer",
      company: "WebCraft Studios",
      description:
        "Led frontend team in building complex applications. Implemented CI/CD pipelines and mentored junior developers.",
      color: "#BAFCA2",
      technologies: [
        { name: "React", icon: TechIcons.React },
        { name: "TypeScript", icon: TechIcons.TypeScript },
      ],
    },
    {
      year: "2024",
      title: "Full Stack Engineer",
      company: "Cloud Nexus",
      description:
        "Developed full-stack applications using Next.js and Node.js. Designed RESTful APIs and managed database integrations.",
      color: "#B5EAD7",
      technologies: [
        { name: "Next.js", icon: TechIcons.NextJS },
        { name: "Node.js", icon: TechIcons.NodeJS },
        { name: "TypeScript", icon: TechIcons.TypeScript },
      ],
    },
    {
      year: "2025",
      title: "Technical Lead",
      company: "FutureTech Labs",
      description:
        "Oversaw architecture decisions for multiple projects. Implemented accessibility standards and performance optimizations.",
      color: "#C7CEEA",
      technologies: [
        { name: "React", icon: TechIcons.React },
        { name: "Next.js", icon: TechIcons.NextJS },
        { name: "Node.js", icon: TechIcons.NodeJS },
      ],
    },
  ];

  const headingText = "Work Experience";
  const letters = headingText.split("").map((char, i) => (
    <span key={i} className="inline-block">
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  useEffect(() => {
    console.clear();
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);
    gsap.defaults({ ease: "none" });

    // Set initial position of the floating content
    if (floatingContentRef.current) {
      gsap.set(floatingContentRef.current, { y: cardPositions[0] });
    }

    const pulses = gsap
      .timeline({
        defaults: {
          duration: 0.05,
          autoAlpha: 1,
          scale: 2,
          transformOrigin: "center",
          ease: "elastic(2.5, 1)",
        },
      })
      .to(".ball02, .text01", {}, 0.2)
      .to(".ball03, .text02", {}, 0.33)
      .to(".ball04, .text03", {}, 0.46)
      .to(".ball05, .text04", {}, 0.56)
      .to(".ball06, .text05", {}, 0.66);

    const main = gsap
      .timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: "#svg-stage",
          scrub: true,
          start: "top center",
          end: "bottom center",
          onUpdate: (self) => {
            const progress = self.progress;
            let newIndex = 0;

            if (progress < 0.265) newIndex = 0;
            else if (progress < 0.395) newIndex = 1;
            else if (progress < 0.51) newIndex = 2;
            else if (progress < 0.61) newIndex = 3;
            else newIndex = 4;

            if (newIndex !== activeIndexRef.current) {
              activeIndexRef.current = newIndex;
              setActiveIndex(newIndex);

              // Animate card content
              if (contentRef.current) {
                gsap.fromTo(
                  contentRef.current,
                  { autoAlpha: 0, y: 20 },
                  { autoAlpha: 1, y: 0, duration: 0.5 }
                );
              }

              // NEW: Animate the floating container's vertical position
              if (floatingContentRef.current) {
                gsap.to(floatingContentRef.current, {
                  y: cardPositions[newIndex],
                  duration: 0.8,
                  ease: "power3.inOut",
                });
              }
            }
          },
        },
      })
      .to(".ball01", { duration: 0.01, autoAlpha: 1 })
      .to(
        ".ball01",
        {
          motionPath: {
            path: ".theLine",
            align: ".theLine",
            alignOrigin: [0.5, 0.5],
          },
          onUpdate: function () {
            const progress = this.progress();
            gsap.set(".theLine", {
              drawSVG: "0% " + progress * 100 + "%",
            });
          },
        },
        0
      )
      .add(pulses, 0);

    return () => {
      main.kill();
    };
  }, []);

  useEffect(() => {
    if (!headingRef.current) return;
    const letterSpans = headingRef.current.querySelectorAll("span");
    gsap.registerPlugin(ScrollTrigger);
    const anim = gsap.fromTo(
      letterSpans,
      {
        rotationX: 180,
        opacity: 0,
        transformOrigin: "top center",
      },
      {
        rotationX: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(2)",
        stagger: {
          each: 0.05,
          from: "random",
        },
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <>
      <h1
        ref={headingRef}
        className="text-4xl md:text-5xl font-bold text-left text-[#ADD8E6] pt-10 overflow-hidden ml-[5vw]"
      >
        {letters}
      </h1>

      <div className="relative min-h-[90vh] md:min-h-[90vh]">
        <div className="grid md:flex md:flex-row md:items-start md:gap-x-12 absolute top-0 left-0 w-full">
          <svg
            id="svg-stage"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 600 1200"
            className="w-full max-w-[600px] col-start-1 row-start-1 justify-self-center"
          >
            {/* SVG content remains the same */}
            <path className="line01 line" d="M 10 200 600 200"></path>
            <path className="line02 line" d="M 10 400 600 400"></path>
            <path className="line03 line" d="M 10 600 600 600"></path>
            <path className="line04 line" d="M 10 800 600 800"></path>
            <path className="line05 line" d="M 10 1000 600 1000"></path>
            <text className="text01" x="30" y="190">
              2021
            </text>
            <text className="text02" x="30" y="390">
              2022
            </text>
            <text className="text03" x="30" y="590">
              2023
            </text>
            <text className="text04" x="30" y="790">
              2024
            </text>
            <text className="text05" x="30" y="990">
              2025
            </text>
            <path
              className="theLine"
              d="M -5,0 Q 450 230 300 450 T 130 750 Q 100 850 300 1000 T 150 1200"
              fill="none"
              strokeWidth="10px"
            />
            <circle className="ball ball01" r="20" cx="50" cy="100"></circle>
            <circle className="ball ball02" r="20" cx="278" cy="201"></circle>
            <circle className="ball ball03" r="20" cx="327" cy="401"></circle>
            <circle className="ball ball04" r="20" cx="203" cy="601"></circle>
            <circle className="ball ball05" r="20" cx="130" cy="801"></circle>
            <circle className="ball ball06" r="20" cx="300" cy="1001"></circle>
          </svg>

          {/* NEW: This is the floating container that moves. Position it absolutely. */}
          <div
            ref={floatingContentRef}
            className="absolute top-0 right-[5vw] flex flex-row gap-8 items-start"
          >
            {/* Tech stack display - now part of the floating container */}
            <div className="hidden xl:block">
              <TechStackDisplay
                technologies={workData[activeIndex].technologies}
              />
            </div>
            {/* Card with increased size - also part of the floating container */}
            <div
              ref={contentRef}
              // CHANGED: Removed 'sticky' and 'top-24'. It's now positioned by its parent.
              className="z-10 p-7 md:p-9 rounded-xl shadow-lg w-full max-w-lg transition-colors duration-500"
              style={{
                backgroundColor: workData[activeIndex].color,
              }}
            >
              <div className="mb-4 flex items-center">
                <div className="bg-[#140202] text-white text-sm font-bold py-1 px-3 rounded-full">
                  {workData[activeIndex].year}
                </div>
                <div className="w-8 h-0.5 bg-[#140202] mx-4"></div>
                <div className="text-sm font-medium text-[#140202]">
                  {workData[activeIndex].company}
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#140202] mb-3">
                {workData[activeIndex].title}
              </h3>
              <p className="text-[#140202]/90 leading-relaxed text-base md:text-lg">
                {workData[activeIndex].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Styles remain the same */
        @font-face {
          font-display: block;
          font-family: Mori;
          font-style: normal;
          font-weight: 400;
          src: url(https://assets.codepen.io/16327/PPMori-Regular.woff)
            format("woff");
        }
        body {
          --light: #6c9cacff;
          width: 100%;
          height: 400vh;
          background: #fff;
          color: var(--light);
          font-family: "Mori", sans-serif;
          padding: 0;
          margin: 0;
          overflow-x: hidden;
        }
        #svg-stage {
          max-width: 600px;
          overflow: visible;
          margin-top: 1vh;
          margin-left: 0;
        }
        .ball {
          fill: var(--light);
          visibility: hidden;
        }
        .line {
          fill: none;
          stroke: var(--light);
          stroke-width: 2px;
        }
        text {
          fill: var(--light);
          font-size: 15px;
          visibility: hidden;
        }
        .theLine {
          stroke: var(--light);
        }
        .pin-spacer {
          height: auto !important;
        }
      `}</style>
    </>
  );
}

export default WorkExperience;
