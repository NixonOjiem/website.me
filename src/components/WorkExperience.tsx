"use client";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import "./WorkExperience.css"; // Make sure to create and import this CSS file

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

function WorkExperience() {
  const componentRef = useRef(null);
  const svgRef = useRef(null);
  const tractorRef = useRef(null);
  const pathRef = useRef(null);

  useLayoutEffect(() => {
    // GSAP Context for safe cleanup
    let ctx = gsap.context(() => {
      // Set the tractor's transform origin to its center
      gsap.set(tractorRef.current, { transformOrigin: "50% 50%" });

      // Create the main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: componentRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smoothly link animation to scroll
          // markers: true, // Uncomment for debugging
        },
      });

      // Animate the SVG's opacity to fade it in
      tl.to(
        svgRef.current,
        {
          opacity: 1,
          duration: 0.2,
        },
        0
      );

      // Animate the tractor along the motion path
      tl.to(
        tractorRef.current,
        {
          motionPath: {
            path: pathRef.current,
            align: pathRef.current,
            alignOrigin: [0.5, 0.5],
            autoRotate: true, // Keeps the tractor oriented to the path
          },
        },
        0 // Add to the start of the timeline
      );
    }, componentRef);

    // Cleanup function to revert all GSAP animations
    return () => ctx.revert();
  }, []);

  return (
    <section ref={componentRef} className="work-experience-section">
      <div className="svg-container">
        {/* SVG code is placed here. Note the following changes for JSX compatibility:
          - `class` is changed to `className`
          - `xml:space` is changed to `xmlSpace`
          - `xmlns:xlink` is changed to `xmlnsXlink`
          - inline `style` attributes are converted to JSX style objects, e.g., style={{ mixBlendMode: 'multiply' }}
          - Refs are attached to the key elements we need to animate.
        */}
        <svg
          id="linesvg"
          ref={svgRef}
          opacity="0"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 869 3002"
          xmlSpace="preserve"
        >
          <style type="text/css">{`.st0{fill:none;stroke:red;stroke-width:10;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}`}</style>
          <path
            id="motionPath"
            ref={pathRef}
            className="st0"
            d="M155.395,383.31 C152.773,390.548 92.401,646.162 250.215,727.041 453.479,831.213 835.629,715.412 832.33,924.268 830.006,1071.385 20.339,1040.965 22.58,1206.204 24.517,1348.994 835.125,1320.378 832.275,1445.504 827.175,1669.362 57.235,1623.348 56.673,1760.63 55.674,2004.272 837.157,1936.609 837.205,2053.845 837.283,2246.807 137.92199,2252.96102 137.92199,2252.96102 "
          />
          <g id="motionSVG">
            <g id="tractor" ref={tractorRef}>
              {/* All the tractor path data */}
              <path
                id="Vector"
                d="M30.4786 2.37109C30.1944 1.6945 28.2463 1.46897 26.5629 1.44392L26.561 1.44147C26.5079 1.44147 26.4533 1.44228 26.3993 1.4427C26.3456 1.44228 26.2909 1.44147 26.2378 1.44147L26.2359 1.44392C24.5526 1.46897 22.6045 1.6945 22.3202 2.37109C22.0174 3.09168 22.0406 4.97436 22.46 5.53219C22.46 5.53219 23.2008 6.28613 26.0526 6.36144C26.1275 6.3654 26.2033 6.36894 26.2845 6.36894C26.3247 6.36894 26.36 6.3673 26.3993 6.36705C26.4388 6.3673 26.4742 6.36894 26.5143 6.36894C26.5955 6.36894 26.6713 6.3654 26.7463 6.36144C29.5982 6.28613 30.3388 5.53219 30.3388 5.53219C30.7582 4.97436 30.7814 3.09168 30.4786 2.37109Z"
                fill="#2497C9"
              />
              <path
                id="Vector_2"
                opacity="0.7"
                d="M30.4786 2.37109C30.1944 1.6945 28.2463 1.46897 26.5629 1.44392L26.561 1.44147C26.5079 1.44147 26.4533 1.44228 26.3993 1.4427C26.3456 1.44228 26.2909 1.44147 26.2378 1.44147L26.2359 1.44392C24.5526 1.46897 22.6045 1.6945 22.3202 2.37109C22.0174 3.09168 22.0406 4.97436 22.46 5.53219C22.46 5.53219 23.2008 6.28613 26.0526 6.36144C26.1275 6.3654 26.2033 6.36894 26.2845 6.36894C26.3247 6.36894 26.36 6.3673 26.3993 6.36705C26.4388 6.3673 26.4742 6.36894 26.5143 6.36894C26.5955 6.36894 26.6713 6.3654 26.7463 6.36144C29.5982 6.28613 30.3388 5.53219 30.3388 5.53219C30.7582 4.97436 30.7814 3.09168 30.4786 2.37109Z"
                fill="#566C24"
              />
              <path
                id="Vector_3"
                d="M26.331 3.27753C28.4543 3.27753 30.1756 2.91852 30.1756 2.47565C30.1756 2.03278 28.4543 1.67377 26.331 1.67377C24.2077 1.67377 22.4865 2.03278 22.4865 2.47565C22.4865 2.91852 24.2077 3.27753 26.331 3.27753Z"
                fill="#DFDDB9"
              />
              {/* ... The rest of your SVG paths ... */}
              <g
                id="Vector_12"
                style={{ mixBlendMode: "multiply" }}
                opacity="0.3"
              >
                <path
                  d="M19.9528 46.4493H9.64502C9.66098 46.5866 9.67667 46.7244 9.69457 46.8582C10.5334 53.1338 11.9314 55.7835 13.1896 56.2019C14.4478 56.6202 16.2421 56.7132 18.0595 56.7132C19.8769 56.7132 21.8806 56.5272 22.2069 55.2721C22.2495 55.108 22.2978 54.8355 22.3496 54.489C21.4797 57.475 20.454 51.8627 19.9528 46.4493Z"
                  fill="#333333"
                />
              </g>
              {/* ... All other paths and groups go here ... */}
            </g>
          </g>
        </svg>
      </div>

      <div className="work-content">
        <div className="job">
          <h2>Senior Tractor Operator</h2>
          <h3>Creative Fields Inc.</h3>
          <p>2022 - Present</p>
          <p>
            Led a team of skilled operators in complex agricultural animations,
            increasing narrative yields by 30%.
          </p>
        </div>
        <div className="job">
          <h2>Mid-Level Path Navigator</h2>
          <h3>SVG Scenery Co.</h3>
          <p>2020 - 2022</p>
          <p>
            Specialized in navigating bezier curve pathways for various digital
            assets. Ensured smooth, on-track performance for all animations.
          </p>
        </div>
        <div className="job">
          <h2>Junior Wheel Rotator</h2>
          <h3>Animation Starters LLC</h3>
          <p>2018 - 2020</p>
          <p>
            Assisted in the fundamental rotational aspects of vehicle-based
            animations. Mastered the art of the perfect spin.
          </p>
        </div>
        <div className="job">
          <h2>Intern</h2>
          <h3>The Drawing Board</h3>
          <p>2017</p>
          <p>
            Gained valuable experience in 2D environments, learning the basics
            of vector graphics and motion principles.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WorkExperience;
