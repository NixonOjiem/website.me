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
  React: (
    <svg viewBox="0 0 1139 1024" fill="currentColor">
      {" "}
      <path d="M634 512c0-11 4-22 12-30 8-8 19-12 30-12s22 4 30 12c8 8 12 19 12 30s-4 22-12 30c-8 8-19 12-30 12s-22-4-30-12c-8-8-12-19-12-30zm-122 0c0-48 18-91 53-125 35-35 78-53 125-53s90 18 125 53c35 34 53 77 53 125s-18 91-53 125c-35 35-78 53-125 53s-90-18-125-53c-35-34-53-77-53-125zm122 396c-134-2-250-52-348-151s-148-214-148-348 50-250 148-348c98-99 214-149 348-151v151c-100 2-186 38-259 109s-109 159-109 259 36 186 109 259c73 71 159 107 259 109v151zm0-320c-55 0-104 20-143 58-39 39-58 87-58 143s19 104 58 143c39 38 88 58 143 58v-32c-47 0-88-16-124-48s-53-71-53-119 18-87 53-119c36-31 77-47 124-47v-32zm396 320c134-2 250-52 348-151s148-214 148-348-50-250-148-348c-98-99-214-149-348-151v151c100 2 186 38 259 109s109 159 109 259-36 186-109 259c-73 71-159 107-259 109v151zm0-320c55 0 104 20 143 58 39 39 58 87 58 143s-19 104-58 143c-39 38-88 58-143 58v-32c47 0 88-16 124-48s53-71 53-119-18-87-53-119c-36-31-77-47-124-47v-32z" />{" "}
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 128 128" fill="none">
      {" "}
      <path fill="#007ACC" d="M0 0h128v128H0z" />{" "}
      <path fill="#fff" d="M26 26h76v76H26z" />{" "}
      <path fill="#007ACC" d="M91 34H37v51h15V55h24v30h15V34z" />{" "}
      <path
        fill="#fff"
        d="M83.5 101h-5l-4-9h-16l-4 9h-5l14.5-31h5L83.5 101zm-14.5-13.5h9l-4.5-10-4.5 10z"
      />{" "}
    </svg>
  ),
  NodeJS: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      {" "}
      <path d="M9 22.54a1.27 1.27 0 01-1.27-1.27v-3.3a1.88 1.88 0 00-.73-1.48 9.38 9.38 0 01-2.48-2.65 8.1 8.1 0 01-1-3.61V8.16a1.27 1.27 0 011.27-1.27h.84a1.27 1.27 0 011.27 1.27v7.07a4.67 4.67 0 00.51 2.22 4.41 4.41 0 001.35 1.73 4.2 4.2 0 002 .89v.33a1.27 1.27 0 01-1.27 1.27zm10.7-16.6a1.27 1.27 0 00-1.27-1.27h-.84a1.27 1.27 0 00-1.27 1.27v11.37a1.27 1.27 0 01-1.27 1.27H13.8a1.27 1.27 0 01-1.27-1.27V5.94a1.27 1.27 0 00-1.27-1.27h-.84a1.27 1.27 0 00-1.27 1.27v11.37a1.27 1.27 0 01-1.27 1.27h-1.3a1.27 1.27 0 01-1.27-1.27V9.73a1.27 1.27 0 00-1.27-1.27H3.27A1.27 1.27 0 002 9.73v4.54a7.53 7.53 0 001.43 4.58 10.38 10.38 0 004.28 3.82 5.58 5.58 0 003.35.6v.33a1.27 1.27 0 001.27 1.27h1.31a1.27 1.27 0 001.27-1.27v-.33a5.57 5.57 0 004.62-4.42 5.37 5.37 0 00.41-2V5.94z" />{" "}
    </svg>
  ),
  NextJS: (
    <svg viewBox="0 0 128 128" fill="none">
      {" "}
      <path
        fill="#000"
        d="M114 128H14A14 14 0 010 114V14A14 14 0 0114 0h100a14 14 0 0114 14v100a14 14 0 01-14 14z"
      />{" "}
      <path
        fill="#fff"
        d="M53.4 104.5V45.2h10l25 35.8V45.2H99v59.3H89L64 68.7v35.8H53.4zm-24.8 0V23.5h10.1v81H28.6z"
      />{" "}
    </svg>
  ),
  GSAP: (
    <svg viewBox="0 0 200 200" fill="currentColor">
      {" "}
      <path d="M129.5,41.2c-31.6,0-57.2,25.6-57.2,57.2c0,31.6,25.6,57.2,57.2,57.2c31.6,0,57.2-25.6,57.2-57.2C186.7,66.8,161.1,41.2,129.5,41.2z M129.5,142.3c-24,0-43.5-19.5-43.5-43.5s19.5-43.5,43.5-43.5s43.5,19.5,43.5,43.5S153.5,142.3,129.5,142.3z" />{" "}
      <path d="M13.3,155.6h55.9c3.7,0,6.7-3,6.7-6.7V51.7c0-3.7-3-6.7-6.7-6.7H13.3c-3.7,0-6.7,3-6.7,6.7v97.2C6.7,152.6,9.6,155.6,13.3,155.6z" />{" "}
    </svg>
  ),

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
      <circle
        cx="64"
        cy="64"
        r="60"
        stroke="currentColor"
        strokeWidth="8"
        fill="none"
      />
      <path
        d="M64 10v108M10 64h108M30 30l68 68M98 30L30 98"
        stroke="currentColor"
        strokeWidth="4"
      />
    </svg>
  ),
  Express: (
    <svg viewBox="0 0 128 128" fill="currentColor">
      <text x="10" y="70" fontSize="48" fontFamily="Arial">
        Ex
      </text>
    </svg>
  ),
  Tailwind: (
    <svg viewBox="0 0 128 128" fill="currentColor">
      <path d="M40 40c20-20 40 0 60 0s20 20 0 40c-20 20-40 0-60 0s-20-20 0-40z" />
    </svg>
  ),
  Redux: (
    <svg viewBox="0 0 128 128" fill="currentColor">
      <circle
        cx="64"
        cy="64"
        r="60"
        stroke="currentColor"
        strokeWidth="8"
        fill="none"
      />
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
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const mobileCardRef = useRef<HTMLDivElement | null>(null); // Ref for mobile card animation
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileCardVisible, setIsMobileCardVisible] = useState(false); // State for mobile card visibility
  const activeIndexRef = useRef(0);

  const workData: WorkExperience[] = [
    {
      year: "2021",
      title: "Intern: Frontend Developer",
      company: "Information Communication Technology Authority",
      description:
        "Contributed to the development of responsive and accessible web applications using React, TypeScript, and VueJS. Implemented efficient state management solutions with Redux and Vuex, improving application scalability and maintainability. Collaborated with senior developers to refactor legacy codebases, enhance performance, and align with modern frontend best practices. Gained hands-on experience in debugging, version control with Git, and agile development workflows.",
      color: "#FFD1DC",
      technologies: [
        { name: "React", icon: TechIcons.React },
        { name: "TypeScript", icon: TechIcons.TypeScript },
        { name: "VueJS", icon: TechIcons.VueJS },
      ],
    },
    {
      year: "2022",
      title: "Frontend Developer",
      company: "Upwork",
      description:
        "Developed dynamic and responsive user interfaces using React, VueJS, and NextJS, leveraging advanced CSS methodologies including Flexbox, Grid, and utility-first frameworks. Integrated reusable components and design systems in collaboration with UX designers to ensure consistency across diverse client projects. Utilized TypeScript for type-safe development and Docker for containerized local environments, streamlining deployment and cross-platform compatibility.",
      color: "#FFDFBA",
      technologies: [
        { name: "React", icon: TechIcons.React },
        { name: "TypeScript", icon: TechIcons.TypeScript },
        { name: "VueJS", icon: TechIcons.VueJS },
        { name: "NextJS", icon: TechIcons.NextJS },
        { name: "Docker", icon: TechIcons.Docker },
        { name: "git", icon: TechIcons.Git },
      ],
    },
    {
      year: "2023",
      title: "FullStack Developer",
      company: "Timely Coders",
      description:
        "Led the frontend team in architecting and delivering scalable web applications using React and Next.js. Spearheaded the implementation of CI/CD pipelines with GitHub Actions, enhancing deployment efficiency and reliability. Collaborated cross-functionally with backend engineers to integrate RESTful APIs and optimize performance. Mentored junior developers through code reviews and pair programming, fostering a culture of growth and technical excellence.",
      color: "#BAFCA2",
      technologies: [
        { name: "React", icon: TechIcons.React },
        { name: "TypeScript", icon: TechIcons.TypeScript },
        { name: "VueJS", icon: TechIcons.VueJS },
        { name: "NodeJS", icon: TechIcons.NodeJS },
        { name: "Express", icon: TechIcons.Express },
        { name: "PostgreSQL", icon: TechIcons.PostgreSQL },
        { name: "Jira", icon: TechIcons.Jira },
        { name: "git", icon: TechIcons.Git },
      ],
    },
    {
      year: "2024",
      title: "Full Stack Developer",
      company: "Paladium Kenya",
      description:
        "Engineered full-stack solutions for healthcare providers, including enhancements to KenyaEMR and the development of a community forum platform. Utilized Next.js and Node.js to build scalable, secure applications tailored to clinical workflows and user engagement. Designed and integrated RESTful APIs with Express, ensuring seamless communication between frontend and backend services. Managed MySQL databases for structured health data storage and implemented Git-based workflows for version control and team collaboration. Focused on usability, interoperability, and performance optimization to support mission-critical health systems.",
      color: "#B5EAD7",
      technologies: [
        { name: "Next.js", icon: TechIcons.NextJS },
        { name: "Node.js", icon: TechIcons.NodeJS },
        { name: "TypeScript", icon: TechIcons.TypeScript },
        { name: "NodeJS", icon: TechIcons.NodeJS },
        { name: "Express", icon: TechIcons.Express },
        { name: "MySQL", icon: TechIcons.MySQL },
        { name: "git", icon: TechIcons.Git },
      ],
    },
    {
      year: "2025",
      title: "FullStack Developer",
      company: "LoveHomeMart",
      description:
        "Led the end-to-end development of a fully functional e-commerce platform from scratch, overseeing architecture decisions across multiple projects. Utilized React and Next.js for a responsive, SEO-optimized frontend, and Laravel with GraphQL for efficient backend operations and data querying. Integrated MySQL and MongoDB to manage structured and unstructured product and user data. Implemented accessibility standards to ensure inclusive user experiences and applied performance optimizations for fast load times and smooth navigation. Collaborated with cross-functional teams to deliver scalable, maintainable solutions aligned with business goals.",
      color: "#C7CEEA",
      technologies: [
        { name: "React", icon: TechIcons.React },
        { name: "Next.js", icon: TechIcons.NextJS },
        { name: "Laravel", icon: TechIcons.Laravel },
        { name: "MySQL", icon: TechIcons.MySQL },
        { name: "GraphQL", icon: TechIcons.GraphQL },
        { name: "MongoDB", icon: TechIcons.MongoDB },
      ],
    },
  ];

  const headingText = "Work Experience";
  const letters = headingText.split("").map((char, i) => (
    <span key={i} className="inline-block">
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  // Main timeline animation effect
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);
    gsap.defaults({ ease: "none" });

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

              // Animate desktop card content fade in/out
              if (contentRef.current) {
                gsap.fromTo(
                  contentRef.current,
                  { autoAlpha: 0, y: 20 },
                  { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }
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

  // Heading animation effect
  useEffect(() => {
    if (!headingRef.current) return;
    const letterSpans = headingRef.current.querySelectorAll("span");
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

  // **NEW**: Mobile card visibility and animation effect
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Trigger to control visibility
    const visibilityTrigger = ScrollTrigger.create({
      trigger: mainContainerRef.current,
      start: "top top",
      end: "bottom bottom",
      onEnter: () => setIsMobileCardVisible(true),
      onLeave: () => setIsMobileCardVisible(false),
      onEnterBack: () => setIsMobileCardVisible(true),
      onLeaveBack: () => setIsMobileCardVisible(false),
    });

    // Animation for the card itself
    const card = mobileCardRef.current;
    if (isMobileCardVisible) {
      gsap.to(card, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(card, {
        autoAlpha: 0,
        scale: 0.9,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
      });
    }

    return () => {
      visibilityTrigger.kill();
    };
  }, [isMobileCardVisible]);

  return (
    <div ref={mainContainerRef}>
      <h1
        ref={headingRef}
        className="text-4xl md:text-5xl font-bold text-left text-[#ADD8E6] pt-10 overflow-hidden ml-[5vw]"
      >
        {letters}
      </h1>

      {/* **MODIFIED**: Mobile Floating Card */}
      <div className="md:hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm px-4 pointer-events-none">
        <div
          ref={mobileCardRef}
          className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg p-4 opacity-0" // Start with opacity-0
        >
          <div className="flex items-center justify-between">
            <div className="bg-gray-800 text-white text-xs font-bold py-1 px-2 rounded-full">
              {workData[activeIndex].year}
            </div>
            <div className="text-sm font-medium text-gray-800 truncate ml-2">
              {workData[activeIndex].company}
            </div>
          </div>
          <h3 className="text-sm font-bold text-gray-800 mt-1 truncate">
            {workData[activeIndex].title}
          </h3>
          <p>{workData[activeIndex].description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative md:grid md:grid-cols-2 md:gap-x-12">
        {/* SVG Timeline */}
        <div className="md:col-span-1 mt-16 md:mt-0">
          <svg
            id="svg-stage"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 600 1200"
            className="w-full max-w-[600px] mx-auto"
          >
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
        </div>

        {/* Desktop Card */}
        <div className="hidden md:block md:col-span-1">
          <div className="sticky top-24">
            <div className="flex flex-row gap-8 items-start">
              <TechStackDisplay
                technologies={workData[activeIndex].technologies}
              />
              <div
                ref={contentRef}
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
      </div>

      <style jsx global>{`
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

        @media (max-width: 767px) {
          #svg-stage {
            margin-top: 60px;
          }
        }
      `}</style>
    </div>
  );
}

export default WorkExperience;
