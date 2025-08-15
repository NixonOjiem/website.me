"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

function HeroSection() {
  const boxRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#pin-windmill",
        pin: true,
        scrub: 1,
        start: "top top",
        // FIX: Define duration relative to viewport height.
        // This makes the animation last for a scroll distance of 100% of the viewport height.
        end: "+=100%",
        // (Optional but recommended) Prevents the next section from overlapping during the pin.
        pinSpacing: false,
      },
    });

    // Animate the entire content track upwards to reveal the second slide
    tl.to("#scroll-content", {
      yPercent: -50, // Move up by 50% of its own height (since there are 2 slides)
      ease: "power2.inOut",
    });

    // SVG rotation animation (synchronized with the scroll)
    tl.to(
      "#turbine-shape",
      {
        rotate: 360,
        ease: "none", // Use 'none' for a linear spin tied to scroll
      },
      0 // Start at the same time as the previous animation
    );
    // Green box animation with ScrollTrigger
    gsap.to(boxRef.current, {
      rotation: 360,
      x: "100vw",
      xPercent: -100,
      duration: 2,
      repeat: 2,
      yoyo: true,
      scrollTrigger: {
        trigger: boxRef.current,
        start: "top bottom", // Start when top of box hits bottom of viewport
        end: "bottom center", // End when bottom of box hits center of viewport
        toggleActions: "play none none none", // Only play once
        markers: false, // Set to true for debugging
      },
    });

    // Cleanup function
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    // FIX: Removed the id="pin-windmill-wrap" as it's no longer needed for the end trigger
    <section className="relative w-full">
      {/* HERO (pinned area) */}
      <div
        id="pin-windmill"
        className="z-1 flex h-[90vh] w-full items-center overflow-hidden bg-gray-200"
      >
        {/* LEFT: Intro + Skills "mask" container */}
        <div className="flex-1 overflow-hidden px-6 md:pl-16">
          {/* This is the scrolling "track" that contains both slides */}
          <div id="scroll-content">
            {/* SLIDE 1: Intro Content (Aligned to Bottom) */}
            <div className="flex h-[80vh] flex-col justify-end pb-8">
              <Image
                src="/images/profilephoto.jpg"
                alt="Nick's Image"
                className="mb-2 h-40 w-40 rounded-full object-cover"
                width={128}
                height={128}
              />
              <h1 className="mb-4 mt-8 text-4xl font-bold text-gray-900 md:text-5xl">
                Hi Im Nick, a Full Stack Developer
              </h1>
              <p className="max-w-xl text-base text-gray-700 md:text-lg">
                Building responsive, interactive, and visually polished
                applications end-to-end — from robust APIs to kinetic,
                delightful UIs.
              </p>
            </div>

            {/* SLIDE 2: Skills Grid (Aligned to Top) */}
            <div className="flex h-[80vh] flex-col justify-start pt-8">
              <div className="grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-lg bg-white/90 p-4 shadow-md backdrop-blur">
                  <h3 className="font-semibold text-gray-800">Frontend</h3>
                  <p className="text-sm text-gray-600">
                    React, Vue, TypeScript, Tailwind, GSAP, HTML, & CSS
                  </p>
                </div>
                <div className="rounded-lg bg-white/90 p-4 shadow-md backdrop-blur">
                  <h3 className="font-semibold text-gray-800">Backend</h3>
                  <p className="text-sm text-gray-600">
                    Node.js, Laravel, REST API, GraphQL, Express, JWT, API
                    Design
                  </p>
                </div>
                <div className="rounded-lg bg-white/90 p-4 shadow-md backdrop-blur">
                  <h3 className="font-semibold text-gray-800">UI/UX</h3>
                  <p className="text-sm text-gray-600">
                    Responsive layouts, animation, micro-interactions
                  </p>
                </div>
                <div className="rounded-lg bg-white/90 p-4 shadow-md backdrop-blur">
                  <h3 className="font-semibold text-gray-800">Databases</h3>
                  <p className="text-sm text-gray-600">
                    MySQL, MongoDB, PostgreSQL, Redis, & Firebase
                  </p>
                </div>
              </div>
            </div>

            <div
              ref={boxRef}
              className="box green w-20 h-20 bg-green-500 rounded-lg"
            ></div>
          </div>
        </div>

        {/* RIGHT: Animated Gradient SVG (Unchanged) */}
        <div className="flex h-full w-[280px] items-center justify-end overflow-hidden pr-6 md:w-[320px] md:pr-16">
          <svg
            id="turbine-shape"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 248 248"
            width="220"
            height="220"
            aria-hidden="true"
            className="transform"
          >
            <path
              fill="url(#paint0_linear_2452_11835)"
              d="M152.266 123.716h94.275c.802 0 1.459.656 1.459 1.459v121.067c0 .81-.664 1.474-1.474 1.466-67.274-.78-121.669-55.137-122.522-122.387v121.22c0 .803-.657 1.459-1.46 1.459H1.474c-.81 0-1.474-.664-1.467-1.474C.795 178.721 56 124.008 123.996 124H1.459C.657 124 0 123.344 0 122.541V1.474C0 .664.664 0 1.474.008c67.274.78 121.669 55.137 122.522 122.387V1.46c0-.803.657-1.46 1.46-1.46h121.07c.81 0 1.474.664 1.467 1.474-.679 58.224-41.486 106.801-96.055 119.367-1.686.386-1.401 2.875.336 2.875h-.008Z"
            />
            <path
              fill="url(#paint1_linear_2452_11835)"
              d="M152.266 123.716h94.275c.802 0 1.459.656 1.459 1.459v121.067c0 .81-.664 1.474-1.474 1.466-67.274-.78-121.669-55.137-122.522-122.387v121.22c0 .803-.657 1.459-1.46 1.459H1.474c-.81 0-1.474-.664-1.467-1.474C.795 178.721 56 124.008 123.996 124H1.459C.657 124 0 123.344 0 122.541V1.474C0 .664.664 0 1.474.008c67.274.78 121.669 55.137 122.522 122.387V1.46c0-.803.657-1.46 1.46-1.46h121.07c.81 0 1.474.664 1.467 1.474-.679 58.224-41.486 106.801-96.055 119.367-1.686.386-1.401 2.875.336 2.875h-.008Z"
            />
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
          </svg>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
