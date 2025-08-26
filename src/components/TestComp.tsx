"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, DrawSVGPlugin, MotionPathPlugin } from "gsap/all";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

// Mock work data (replace with your actual data)
const workData = [
  {
    year: "2021",
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    description:
      "Developed responsive web applications using React and modern CSS techniques.",
    color: "#FFD6E7",
    technologies: [
      { name: "React", icon: <span>⚛️</span> },
      { name: "CSS3", icon: <span>🎨</span> },
      { name: "JavaScript", icon: <span>📜</span> },
    ],
  },
  {
    year: "2022",
    title: "Senior Developer",
    company: "Digital Innovations",
    description:
      "Led a team of developers in creating enterprise-level applications with React and Node.js.",
    color: "#D6F0FF",
    technologies: [
      { name: "React", icon: <span>⚛️</span> },
      { name: "Node.js", icon: <span>🟢</span> },
      { name: "TypeScript", icon: <span>📘</span> },
    ],
  },
  {
    year: "2023",
    title: "Tech Lead",
    company: "FutureTech",
    description:
      "Architected and implemented scalable frontend solutions for high-traffic applications.",
    color: "#D6FFDA",
    technologies: [
      { name: "React", icon: <span>⚛️</span> },
      { name: "Next.js", icon: <span>⏭️</span> },
      { name: "GraphQL", icon: <span>📊</span> },
    ],
  },
  {
    year: "2024",
    title: "Principal Engineer",
    company: "InnovateX",
    description:
      "Designed system architecture and mentored junior developers in advanced programming techniques.",
    color: "#FFF9D6",
    technologies: [
      { name: "React", icon: <span>⚛️</span> },
      { name: "AWS", icon: <span>☁️</span> },
      { name: "Docker", icon: <span>🐳</span> },
    ],
  },
  {
    year: "2025",
    title: "CTO",
    company: "TechVision",
    description:
      "Oversaw all technical operations and set the strategic direction for technology development.",
    color: "#E8D6FF",
    technologies: [
      { name: "Leadership", icon: <span>👑</span> },
      { name: "Strategy", icon: <span>🧠</span> },
      { name: "Innovation", icon: <span>💡</span> },
    ],
  },
];

// Floating Card Component
function FloatingCard({ data, isVisible }) {
  if (!data) return null;

  return (
    <div
      className={`md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-md px-4 transition-all duration-500 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div
        className="bg-white rounded-xl shadow-lg p-4 border border-gray-200"
        style={{ backgroundColor: data.color }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="bg-gray-800 text-white text-xs font-bold py-1 px-2 rounded-full">
            {data.year}
          </div>
          <div className="text-sm font-medium text-gray-800">
            {data.company}
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{data.title}</h3>
        <p className="text-sm text-gray-700">{data.description}</p>
      </div>
    </div>
  );
}

// Tech Stack Display Component
function TechStackDisplay({ technologies }) {
  const containerRef = useRef(null);

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
  }, [technologies]);

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

// Main Work Experience Component
function WorkExperience() {
  const mainContainerRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const desktopCardWrapperRef = useRef(null);
  const [isMobileCardVisible, setIsMobileCardVisible] = useState(false);

  const headingText = "Work Experience";
  const letters = headingText.split("").map((char, i) => (
    <span key={i} className="inline-block">
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  // Main timeline animation effect
  useEffect(() => {
    gsap.defaults({ ease: "none" });

    const updateActiveCard = (index) => {
      if (index === activeIndexRef.current) return;
      activeIndexRef.current = index;
      setActiveIndex(index);

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      }
    };

    const pulses = gsap.timeline({
      defaults: {
        duration: 0.05,
        autoAlpha: 1,
        scale: 2,
        transformOrigin: "center",
        ease: "elastic(2.5, 1)",
      },
    });

    pulses
      .to(".ball02, .text01", {}, 0.2)
      .call(() => updateActiveCard(0), [], 0.2)
      .to(".ball03, .text02", {}, 0.33)
      .call(() => updateActiveCard(1), [], 0.33)
      .to(".ball04, .text03", {}, 0.46)
      .call(() => updateActiveCard(2), [], 0.46)
      .to(".ball05, .text04", {}, 0.59)
      .call(() => updateActiveCard(3), [], 0.59)
      .to(".ball06, .text05", {}, 0.76)
      .call(() => updateActiveCard(4), [], 0.76);

    const main = gsap
      .timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: "#svg-stage",
          scrub: true,
          start: "top center",
          end: "bottom center",
          pin: desktopCardWrapperRef.current,
          pinSpacing: true,
          pinType: "fixed",
        },
      })
      .call(() => updateActiveCard(0))
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
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger === mainContainerRef.current ||
          trigger.trigger === headingRef.current ||
          trigger.trigger === document.querySelector("#svg-stage")
        ) {
          trigger.kill();
        }
      });
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

  // Mobile card visibility and animation effect
  useEffect(() => {
    if (!mainContainerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: mainContainerRef.current,
      start: "top 20%",
      end: "bottom 80%",
      onEnter: () => setIsMobileCardVisible(true),
      onLeave: () => setIsMobileCardVisible(false),
      onEnterBack: () => setIsMobileCardVisible(true),
      onLeaveBack: () => setIsMobileCardVisible(false),
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div ref={mainContainerRef} className="relative pb-20 md:pb-0">
      <h1
        ref={headingRef}
        className="text-4xl md:text-5xl font-bold text-left text-[#ADD8E6] pt-10 overflow-hidden ml-[5vw]"
      >
        {letters}
      </h1>

      {/* Main Content */}
      <div className="relative md:grid md:grid-cols-2 md:gap-x-12">
        {/* SVG Timeline */}
        <div className="md:col-span-1 mt-16 md:mt-0">
          <svg
            id="svg-stage"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 600 1200"
            className="w-full max-w-[600px]"
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
          <div ref={desktopCardWrapperRef} className="pt-24">
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

      {/* Mobile Floating Card */}
      <FloatingCard
        data={workData[activeIndex]}
        isVisible={isMobileCardVisible}
      />

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
