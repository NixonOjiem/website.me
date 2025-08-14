"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function HeroSection() {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
        pin: true,
        trigger: "#pin-windmill",
        start: "top top",
        endTrigger: "#pin-windmill-wrap",
        end: "bottom top",
      },
    });

    tl.to("#turbine-shape", {
      rotate: 720,
      scale: 1.5,
      duration: 3,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <div
      id="pin-windmill"
      className="z-1 h-[90vh] w-full bg-gray-200 relative overflow-hidden flex items-center"
    >
      {/* LEFT: Intro + Skills */}
      <div className="flex-1 pl-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          I’m a Full‑Stack Developer
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Crafting responsive, interactive, and visually polished web
          applications from front to back.
        </p>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 gap-6 max-w-lg">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-800">Frontend</h3>
            <p className="text-sm text-gray-600">
              React, Vue, TypeScript, Tailwind, GSAP
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-800">Backend</h3>
            <p className="text-sm text-gray-600">
              Node.js, Express, JWT, API Design
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-800">UI/UX</h3>
            <p className="text-sm text-gray-600">
              Responsive layouts, animations, micro‑interactions
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-800">Architecture</h3>
            <p className="text-sm text-gray-600">
              Scalable code, reusable utilities, error handling
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT: Animated Turbine */}
      <div className="w-[300px] h-full flex items-center justify-end pr-16 overflow-hidden">
        <svg
          id="turbine-shape"
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="transform"
        >
          <circle cx="100" cy="100" r="16" fill="black" />
          {[0, 90, 180, 270].map((angle) => (
            <path
              key={angle}
              d="M100,100 L90,20 L110,20 L120,100 Z"
              fill="black"
              stroke="black"
              strokeWidth="8"
              transform={`rotate(${angle} 100 100)`}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

export default HeroSection;
