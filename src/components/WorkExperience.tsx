import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, DrawSVGPlugin, MotionPathPlugin } from "gsap/all";

// Define work experience data structure
type WorkExperience = {
  year: string;
  title: string;
  company: string;
  description: string;
  color: string; // Added color property to each experience
};

function WorkExperience() {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0); // For GSAP updates without state re-renders

  const workData: WorkExperience[] = [
    {
      year: "2021",
      title: "Frontend Developer",
      company: "Tech Innovations Inc.",
      description:
        "Developed responsive web applications using React and TypeScript. Implemented state management solutions and optimized performance.",
      color: "#FFD1DC", // Pastel Pink
    },
    {
      year: "2022",
      title: "UI Engineer",
      company: "Digital Solutions Co.",
      description:
        "Created interactive user interfaces with modern CSS techniques. Collaborated with UX designers to implement design systems.",
      color: "#FFDFBA", // Pastel Orange
    },
    {
      year: "2023",
      title: "Senior React Developer",
      company: "WebCraft Studios",
      description:
        "Led frontend team in building complex applications. Implemented CI/CD pipelines and mentored junior developers.",
      color: "#BAFCA2", // Pastel Green
    },
    {
      year: "2024",
      title: "Full Stack Engineer",
      company: "Cloud Nexus",
      description:
        "Developed full-stack applications using Next.js and Node.js. Designed RESTful APIs and managed database integrations.",
      color: "#B5EAD7", // Pastel Mint
    },
    {
      year: "2025",
      title: "Technical Lead",
      company: "FutureTech Labs",
      description:
        "Oversaw architecture decisions for multiple projects. Implemented accessibility standards and performance optimizations.",
      color: "#C7CEEA", // Pastel Blue
    },
  ];
  const pinContainerRef = useRef<HTMLDivElement>(null);

  const headingText = "Work Experience";
  const letters = headingText.split("").map((char, i) => (
    <span key={i} className="inline-block">
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  useEffect(() => {
    // Clear the console for a clean view
    console.clear();
    // Register all necessary GSAP plugins
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);
    gsap.defaults({ ease: "none" });

    // Timeline for the pulsing effect of the balls and text
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

    // Main timeline for the scroll-triggered animation
    const main = gsap
      .timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: pinContainerRef.current,
          scrub: true,
          pin: true,
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
              if (contentRef.current) {
                gsap.fromTo(
                  contentRef.current,
                  { autoAlpha: 0, y: 20 },
                  { autoAlpha: 1, y: 0, duration: 0.5 }
                );
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

  return (
    <>
      <h1
        ref={headingRef}
        className="text-4xl md:text-5xl font-bold text-left text-[#ADD8E6] pt-10 overflow-hidden ml-[5vw]"
      >
        {letters}
      </h1>

      {/* CHANGED: Container is now a grid on mobile to allow overlapping */}
      <div className="grid md:flex md:flex-row md:items-start md:gap-x-12">
        <svg
          id="svg-stage"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 600 1200"
          // CHANGED: Positioned within the grid
          className="w-full max-w-[600px] col-start-1 row-start-1 justify-self-center"
        >
          {/* SVG path lines for the timeline */}
          <path className="line01 line" d="M 10 200 600 200"></path>
          <path className="line02 line" d="M 10 400 600 400"></path>
          <path className="line03 line" d="M 10 600 600 600"></path>
          <path className="line04 line" d="M 10 800 600 800"></path>
          <path className="line05 line" d="M 10 1000 600 1000"></path>
          {/* Text elements for the years. The y coordinates have been updated to prevent overlap. */}
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
          {/* The main motion path for the ball */}
          <path
            className="theLine"
            d="M -5,0
      Q 450 230 300 450
      T 130 750
      Q 100 850 300 1000
      T 150 1200"
            fill="none"
            strokeWidth="10px"
          />
          {/* Circles representing each year. Added ball05 and ball06 with adjusted positions. */}
          <circle className="ball ball01" r="20" cx="50" cy="100"></circle>
          <circle className="ball ball02" r="20" cx="278" cy="201"></circle>
          <circle className="ball ball03" r="20" cx="327" cy="401"></circle>
          <circle className="ball ball04" r="20" cx="203" cy="601"></circle>
          <circle className="ball ball05" r="20" cx="130" cy="801"></circle>
          <circle className="ball ball06" r="20" cx="300" cy="1001"></circle>
        </svg>
        <div
          ref={contentRef}
          // CHANGED: The card is now sticky on all screen sizes and layered on top with z-index.
          // It's centered horizontally and aligned to the top of the container on mobile.
          className="sticky top-24 z-10 col-start-1 row-start-1 self-start justify-self-center p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md transition-all duration-500"
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

          <h3 className="text-2xl font-bold text-[#140202] mb-3">
            {workData[activeIndex].title}
          </h3>

          <p className="text-[#140202]/90 leading-relaxed">
            {workData[activeIndex].description}
          </p>
        </div>
      </div>

      <style jsx global>{`
        /* Global CSS styles */
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
          /* Ensure body has no padding or margin */
          padding: 0;
          margin: 0;
          overflow-x: hidden;
        }

        .main-container {
          display: flex;
          flex-direction: column;
          padding-left: 0;
          justify-content: flex-start;
        }
        @media (min-width: 768px) {
          .main-container {
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
          }
        }

        #svg-stage {
          max-width: 600px;
          overflow: visible;
          margin-top: 15vh;
          /* Ensure SVG has no left margin */
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
        /* New styles for content panel */
        .content-panel {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.3s ease, transform 0.4s ease;
        }

        @media (max-width: 767px) {
          #svg-stage {
            margin-top: 5vh;
          }
        }
      `}</style>
    </>
  );
}

export default WorkExperience;
