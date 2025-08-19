"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import React, { useLayoutEffect, useRef, useState } from "react";
import ProjectsComponent from "./ProjectsComponent";

function ProjectIntro() {
  const main = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!isMounted) return;

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const ctx = gsap.context(() => {
      const smoother = ScrollSmoother.create({
        wrapper: "#wrapper",
        content: "#content",
        smooth: 2,
        effects: true,
        onUpdate: (self) => {
          gsap.set(gsap.utils.toArray(".gsap-effects-wrapper"), {
            overwrite: true,
          });
        },
      });

      // Apply effects to image containers
      smoother.effects(".hero__image-cont", {
        speed: () => gsap.utils.random(0.55, 0.85, 0.05),
      });

      // Improved alignment function
      const alignImages = () => {
        const images = gsap.utils.toArray<HTMLElement>(".hero__image-cont");
        if (images.length === 0) return;

        // Wait for the next tick to ensure GSAP has applied transforms
        requestAnimationFrame(() => {
          let minOffsetY = Infinity;
          const offsets: number[] = [];

          // Get the vertical offset of each wrapper
          images.forEach((img) => {
            const wrapper = img.parentElement;
            if (wrapper) {
              const matrix = new DOMMatrixReadOnly(
                getComputedStyle(wrapper).transform
              );
              const offsetY = matrix.m42; // Get the translateY value
              offsets.push(offsetY);
              if (offsetY < minOffsetY) {
                minOffsetY = offsetY;
              }
            }
          });

          // Apply compensation to each image
          images.forEach((img, i) => {
            const compensation = offsets[i] - minOffsetY;
            gsap.set(img, { y: -compensation });
          });
        });
      };

      // Align images after a short delay to ensure GSAP has processed everything
      const alignTimeout = setTimeout(alignImages, 100);

      const swipeAnimation = () => {
        gsap.to(".anim-swipe", {
          yPercent: 300,
          duration: 1.5,
          stagger: { from: "random", each: 0.1 },
          ease: "power4.out",
        });
      };

      swipeAnimation();

      const hero = heroRef.current;
      if (!hero) return;

      let startY: number;
      const handleTouchStart = (e: TouchEvent) => {
        startY = e.touches[0].clientY;
      };

      const handleTouchEnd = (e: TouchEvent) => {
        const endY = e.changedTouches[0].clientY;
        const deltaY = startY - endY;
        if (deltaY > 50) swipeAnimation();
      };

      hero.addEventListener("touchstart", handleTouchStart);
      hero.addEventListener("touchend", handleTouchEnd);

      return () => {
        hero.removeEventListener("touchstart", handleTouchStart);
        hero.removeEventListener("touchend", handleTouchEnd);
        clearTimeout(alignTimeout);
        smoother.kill();
      };
    }, main);

    return () => ctx.revert();
  }, [isMounted]);

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  return (
    <div ref={main}>
      <div id="wrapper">
        <div id="content">
          <section className="hero" ref={heroRef}>
            <div className="hero__inner">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="hero__image-cont">
                  <div className="anim-swipe"></div>
                </div>
              ))}
            </div>
          </section>

          <div className="content-padding">
            <div className="features">
              <div className="features__item">
                <div className="features__content">
                  <h2 className="features__title gs_reveal">Project Title</h2>
                  <p className="features__description gs_reveal">
                    Project description goes here...
                  </p>
                </div>
              </div>
            </div>
          </div>

          <section className="spacer"> </section>
        </div>
      </div>

      <img
        className="scroll"
        src="https://img.icons8.com/glyph-neue/128/ffffff/circled-down-2.png"
        alt="scroll down icon"
        width={64}
        height={64}
        loading="lazy"
      />

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          overscroll-behavior: none;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background-color: #fffefeff;
          font-weight: 300;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .hero {
          height: 80vh;
          width: 80vw;
          margin: 0 auto;
        }
        .hero__inner {
          height: 100%;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          width: 100%;
        }
        .hero__image-cont {
          position: relative;
          overflow: hidden;
          background-color: #fffefeff;
          background-image: url("images/Nick.jpg");
          background-size: 600% 100%; /* 6x width for 6 columns */
          background-repeat: no-repeat;
        }

        /* Corrected background positions */
        .hero__image-cont:nth-child(1) {
          background-position: 0% 0;
        }
        .hero__image-cont:nth-child(2) {
          background-position: 20% 0;
        }
        .hero__image-cont:nth-child(3) {
          background-position: 40% 0;
        }
        .hero__image-cont:nth-child(4) {
          background-position: 60% 0;
        }
        .hero__image-cont:nth-child(5) {
          background-position: 80% 0;
        }
        .hero__image-cont:nth-child(6) {
          background-position: 100% 0;
        }

        .hero__image-cont:not(:last-child):after {
          content: "";
          position: absolute;
          right: 0px;
          background-color: #0f0101ff;
          height: 100%;
          top: 0;
          width: 2.5px;
          z-index: 999;
        }

        .anim-swipe {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-color: #111111;
          transform: translateY(0);
          z-index: 2;
        }

        .scroll {
          position: fixed;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 999;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-20px);
          }
          60% {
            transform: translateX(-50%) translateY(-10px);
          }
        }

        .content-padding {
          max-width: 1240px;
          margin: 0 auto;
          padding: 4rem 1rem;
          color: white;
        }

        .features__item {
          padding: 2rem 0;
          border-top: 1px solid #333;
        }

        .features__title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .features__description {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #aaa;
        }

        .spacer {
          height: 100vh;
        }

        .gs_reveal {
          opacity: 0;
          visibility: hidden;
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
}

export default ProjectIntro;
