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
      transformOrigin: "50% 50%",
    });
  }, []);

  return (
    <section id="pin-windmill-wrap" className="relative w-full">
      {/* HERO (pinned area) */}
      <div
        id="pin-windmill"
        className="z-1 h-[90vh] w-full bg-gray-200 relative overflow-hidden flex items-center"
      >
        {/* LEFT: Intro + Skills */}
        <div className="flex-1 px-6 md:pl-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            I’m a Full‑Stack Developer
          </h1>
          <p className="text-base md:text-lg text-gray-700 mb-8 max-w-xl">
            Building responsive, interactive, and visually polished applications
            end‑to‑end — from robust APIs to kinetic, delightful UIs.
          </p>

          {/* Skills grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            <div className="p-4 bg-white/90 backdrop-blur rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-800">Frontend</h3>
              <p className="text-sm text-gray-600">
                React, Vue, TypeScript, Tailwind, GSAP
              </p>
            </div>
            <div className="p-4 bg-white/90 backdrop-blur rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-800">Backend</h3>
              <p className="text-sm text-gray-600">
                Node.js, Express, JWT, API Design
              </p>
            </div>
            <div className="p-4 bg-white/90 backdrop-blur rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-800">UI/UX</h3>
              <p className="text-sm text-gray-600">
                Responsive layouts, animation, micro‑interactions
              </p>
            </div>
            <div className="p-4 bg-white/90 backdrop-blur rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-800">Architecture</h3>
              <p className="text-sm text-gray-600">
                Scalable code, reusable utilities, centralized error handling
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Animated Gradient SVG (contained) */}
        <div className="h-full flex items-center justify-end pr-6 md:pr-16">
          {/* Hard mask to prevent spillover on scale */}
          <div className="w-[220px] h-[220px] md:w-[260px] md:h-[260px] overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 248 248"
              width="100%"
              height="100%"
              aria-hidden="true"
              className="block"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient
                  id="paint0_linear_2452_11835"
                  x1="218"
                  x2="-47.283"
                  y1="258"
                  y2="153.706"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset=".27" stopColor="#FFD3FD" />
                  <stop offset=".838" stopColor="#806EFF" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_2452_11835"
                  x1="-21.183"
                  x2="223.712"
                  y1="-7.807"
                  y2="329.472"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset=".27" stopColor="#FEC5FB" />
                  <stop offset=".838" stopColor="#00BAE2" />
                </linearGradient>
              </defs>

              {/* Animate this group, not the <svg> canvas */}
              <g id="turbine-shape" style={{ transformBox: "fill-box" }}>
                <path
                  fill="url(#paint0_linear_2452_11835)"
                  d="M152.266 123.716h94.275c.802 0 1.459.656 1.459 1.459v121.067c0 .81-.664 1.474-1.474 1.466-67.274-.78-121.669-55.137-122.522-122.387v121.22c0 .803-.657 1.459-1.46 1.459H1.474c-.81 0-1.474-.664-1.467-1.474C.795 178.721 56 124.008 123.996 124H1.459C.657 124 0 123.344 0 122.541V1.474C0 .664.664 0 1.474.008c67.274.78 121.669 55.137 122.522 122.387V1.46c0-.803.657-1.46 1.46-1.46h121.07c.81 0 1.474.664 1.467 1.474-.679 58.224-41.486 106.801-96.055 119.367-1.686.386-1.401 2.875.336 2.875h-.008Z"
                />
                <path
                  fill="url(#paint1_linear_2452_11835)"
                  d="M152.266 123.716h94.275c.802 0 1.459.656 1.459 1.459v121.067c0 .81-.664 1.474-1.474 1.466-67.274-.78-121.669-55.137-122.522-122.387v121.22c0 .803-.657 1.459-1.46 1.459H1.474c-.81 0-1.474-.664-1.467-1.474C.795 178.721 56 124.008 123.996 124H1.459C.657 124 0 123.344 0 122.541V1.474C0 .664.664 0 1.474.008c67.274.78 121.669 55.137 122.522 122.387V1.46c0-.803.657-1.46 1.46-1.46h121.07c.81 0 1.474.664 1.467 1.474-.679 58.224-41.486 106.801-96.055 119.367-1.686.386-1.401 2.875.336 2.875h-.008Z"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Spacer/next section to give ScrollTrigger an end target */}
      <div className="h-[120vh] bg-transparent" />
    </section>
  );
}

export default HeroSection;
