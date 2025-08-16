"use client";
import React, { useEffect } from "react"; // 1. Import useEffect
import { gsap } from "gsap";
import { ScrollTrigger, DrawSVGPlugin, MotionPathPlugin } from "gsap/all";

function WorkExperience() {
  // 2. Wrap all GSAP logic in a useEffect hook
  useEffect(() => {
    console.clear();

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
      .to(".ball04, .text03", {}, 0.46);

    const main = gsap
      .timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: "#svg-stage",
          scrub: true,
          start: "top center",
          end: "bottom center",
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

    // 3. Return a cleanup function
    return () => {
      // Kill the main timeline, which also kills the ScrollTrigger and nested timelines
      main.kill();
    };
  }, []); // 4. Use an empty dependency array

  return (
    <>
      <div>
        <h1 className="header-section text-4xl md:text-5xl font-bold text-[#ADD8E6]">
          Work Experience
        </h1>
        <svg
          id="svg-stage"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 600 1200"
        >
          {/* ... your SVG content remains exactly the same ... */}
          <path className="line01 line" d="M 10 200 600 200"></path>
          <path className="line02 line" d="M 10 400 600 400"></path>
          <path className="line03 line" d="M 10 600 600 600"></path>
          <path className="line04 line" d="M 10 800 600 800"></path>
          <path className="line05 line" d="M 10 1000 600 1000"></path>
          <text className="text01" x="30" y="190">
            2018
          </text>
          <text className="text02" x="30" y="390">
            2019
          </text>
          <text className="text03" x="30" y="590">
            2020
          </text>
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
          <circle className="ball ball01" r="20" cx="50" cy="100"></circle>
          <circle className="ball ball02" r="20" cx="278" cy="201"></circle>
          <circle className="ball ball03" r="20" cx="327" cy="401"></circle>
          <circle className="ball ball04" r="20" cx="203" cy="601"></circle>
        </svg>
      </div>
      <style jsx global>{`
        /* ... your styles remain exactly the same ... */
        @font-face {
          font-display: block;
          font-family: Mori;
          font-style: normal;
          font-weight: 400;
          src: url(https://assets.codepen.io/16327/PPMori-Regular.woff)
            format("woff");
        }

        body {
          --light: #140202ff;
          width: 100%;
          height: 400vh;
          background: #fff;
          color: var(--light);
          font-family: "Mori", sans-serif;
        }

        .header-section {
          position: relative;
          text-align: center;
          margin: 100px auto 0;
        }

        #svg-stage {
          max-width: 600px;
          overflow: visible;
          margin-top: 60vh;
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
      `}</style>
    </>
  );
}

export default WorkExperience;
