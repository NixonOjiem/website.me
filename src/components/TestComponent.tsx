"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, DrawSVGPlugin, MotionPathPlugin } from "gsap/all";

function WorkExperience() {
  useEffect(() => {
    console.clear();
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

    // Create timeline with proper scrub configuration
    const main = gsap.timeline({
      scrollTrigger: {
        trigger: "#svg-stage",
        scrub: 1, // Smoother scrubbing
        start: "top center",
        end: "bottom bottom", // Extend to bottom of container
        markers: false, // Set to true for debugging
      },
    });

    // Ball animation with improved motion path
    main.to(
      ".ball01",
      {
        duration: 1,
        autoAlpha: 1,
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
    );

    // Pulse effects with proper synchronization
    main.to(
      ".ball02, .text01",
      {
        autoAlpha: 1,
        scale: 2,
        duration: 0.05,
        transformOrigin: "center",
        ease: "elastic(2.5, 1)",
        immediateRender: false,
      },
      0.2
    );

    main.to(
      ".ball03, .text02",
      {
        autoAlpha: 1,
        scale: 2,
        duration: 0.05,
        transformOrigin: "center",
        ease: "elastic(2.5, 1)",
        immediateRender: false,
      },
      0.33
    );

    main.to(
      ".ball04, .text03",
      {
        autoAlpha: 1,
        scale: 2,
        duration: 0.05,
        transformOrigin: "center",
        ease: "elastic(2.5, 1)",
        immediateRender: false,
      },
      0.46
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div>
        <h1 className="header-section">Scroll to see a timeline animation</h1>
        <svg
          id="svg-stage"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 600 1400" // Increased height
        >
          {/* ... your SVG content ... */}
          <path
            className="theLine"
            d="M -5,0
           Q 450 230 300 450 
           T 130 750
           Q 100 850 300 1000
           T 150 1400" // Extended to bottom
            fill="none"
            strokeWidth="10px"
          />
          {/* ... circles and text ... */}
        </svg>
      </div>
      <style jsx global>{`
        /* ... your styles ... */
        #svg-stage {
          max-width: 600px;
          overflow: visible;
          margin-top: 60vh;
          margin-bottom: 60vh; /* Add space at bottom */
        }

        .theLine {
          stroke: var(--light);
          stroke-dasharray: none; /* Ensure no dasharray */
        }
      `}</style>
    </>
  );
}

export default WorkExperience;
