"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, DrawSVGPlugin, MotionPathPlugin } from "gsap/all";
import { workData } from "@/app/data/workData";
import FloatingCard from "./FloatingCard";
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

type Technology = {
  name: string;
  icon: JSX.Element;
};

type TestComponent = {
  year: string;
  title: string;
  company: string;
  description: string;
  color: string;
  technologies: Technology[];
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

function TestComponent() {
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const desktopCardWrapperRef = useRef<HTMLDivElement | null>(null);
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
      setActiveIndex(index); // This triggers the re-render with new data

      // Animate desktop card content fade-in
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      }
    };

    // Define the pulse animations
    const pulses = gsap.timeline({
      defaults: {
        duration: 0.05,
        autoAlpha: 1,
        scale: 2,
        transformOrigin: "center",
        ease: "elastic(2.5, 1)",
      },
    });

    // ✨ SETUP PULSES WITH PRECISE CALLBACKS
    pulses
      .to(".ball02, .text01", {}, 0.2)
      .call(() => updateActiveCard(0), [], 0.2) // On arrival at 2021 (index 0)

      .to(".ball03, .text02", {}, 0.33)
      .call(() => updateActiveCard(1), [], 0.33) // On arrival at 2022 (index 1)

      .to(".ball04, .text03", {}, 0.46)
      .call(() => updateActiveCard(2), [], 0.46) // On arrival at 2023 (index 2)

      .to(".ball05, .text04", {}, 0.59)
      .call(() => updateActiveCard(3), [], 0.59) // On arrival at 2024 (index 3)

      .to(".ball06, .text05", {}, 0.76)
      .call(() => updateActiveCard(4), [], 0.76); // On arrival at 2025 (index 4)

    // The main timeline that is controlled by scrolling
    const main = gsap
      .timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: "#svg-stage",
          scrub: true,
          start: "top center",
          end: "bottom center",
          pin: desktopCardWrapperRef.current, // ✨ ADD THIS LINE
          pinSpacing: true,
          pinType: "transform",
        },
      })
      .call(() => updateActiveCard(0)) // Set the initial card to 2021 (index 0) when the animation starts
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

    // Use ScrollTrigger to toggle the visibility state
    const trigger = ScrollTrigger.create({
      trigger: mainContainerRef.current,
      start: "top 20%", // Show card when the section top is 20% from viewport top
      end: "bottom 80%", // Hide card when the section bottom is 80% from viewport top
      onEnter: () => setIsMobileCardVisible(true),
      onLeave: () => setIsMobileCardVisible(false),
      onEnterBack: () => setIsMobileCardVisible(true),
      onLeaveBack: () => setIsMobileCardVisible(false),
    });

    // Cleanup function to kill the trigger when the component unmounts
    return () => {
      trigger.kill();
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div ref={mainContainerRef}>
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
            {/* SVG paths and text remain the same */}
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

        {/* Desktop Card --- ✨ MODIFIED SECTION --- */}
        <div className="hidden md:block md:col-span-1">
          {/* This wrapper will be pinned by GSAP. The sticky div is gone. */}
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
      <FloatingCard
        data={workData[activeIndex]}
        isVisible={isMobileCardVisible}
      />
      <style jsx global>{`
        /* CSS remains the same */
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

export default TestComponent;
