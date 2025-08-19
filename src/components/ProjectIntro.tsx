"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import React, { useLayoutEffect, useRef } from "react";

function ProjectIntro() {
  const main = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const ctx = gsap.context(() => {
      const smoother = ScrollSmoother.create({
        wrapper: "#wrapper",
        content: "#content",
        smooth: 2,
        speed: 3,
        effects: true,
      });

      smoother.effects(".hero__image-cont", {
        speed: () => gsap.utils.random(0.55, 0.85, 0.05),
      });

      gsap.to(".anim-swipe", {
        yPercent: 300,
        delay: 0.2,
        duration: 3,
        stagger: {
          from: "random",
          each: 0.1,
        },
        ease: "sine.out",
      });

      gsap.to(".hero__image-cont > img", {
        scale: 1.5,
        xPercent: 20,
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "+=3000px",
          scrub: true,
        },
      });

      // --- SCROLL REVEAL ANIMATION CODE ---
      const animateFrom = (elem: HTMLElement, direction: number = 1) => {
        let x = 0,
          y = direction * 100;
        if (elem.classList.contains("gs_reveal_fromLeft")) {
          x = -100;
          y = 0;
        } else if (elem.classList.contains("gs_reveal_fromRight")) {
          x = 100;
          y = 0;
        }
        elem.style.transform = `translate(${x}px, ${y}px)`;
        elem.style.opacity = "0";
        gsap.fromTo(
          elem,
          { x, y, autoAlpha: 0 },
          {
            duration: 1.25,
            x: 0,
            y: 0,
            autoAlpha: 1,
            ease: "expo",
            overwrite: "auto",
          }
        );
      };
      const hide = (elem: HTMLElement) => {
        gsap.set(elem, { autoAlpha: 0 });
      };
      gsap.utils.toArray<HTMLElement>(".gs_reveal").forEach((elem) => {
        hide(elem);
        ScrollTrigger.create({
          trigger: elem,
          onEnter: () => animateFrom(elem),
          onEnterBack: () => animateFrom(elem, -1),
          onLeave: () => hide(elem),
        });
      });
    }, main);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={main}>
      <div id="wrapper">
        <div id="content">
          <section className="hero">
            <div className="hero__inner constrain">
              <div className="hero__image-cont">
                <img
                  src="/images/Nick.jpg"
                  alt="A portrait split into animated columns."
                />
                <div className="anim-swipe"></div>
              </div>
              <div className="hero__image-cont">
                <img src="/images/Nick.jpg" alt="" />
                <div className="anim-swipe"></div>
              </div>
              <div className="hero__image-cont">
                <img src="/images/Nick.jpg" alt="" />
                <div className="anim-swipe"></div>
              </div>
              <div className="hero__image-cont">
                <img src="/images/Nick.jpg" alt="" />
                <div className="anim-swipe"></div>
              </div>
              <div className="hero__image-cont">
                <img src="/images/Nick.jpg" alt="" />
                <div className="anim-swipe"></div>
              </div>
              <div className="hero__image-cont">
                <img src="/images/Nick.jpg" alt="" />
                <div className="anim-swipe"></div>
              </div>
            </div>
          </section>

          <div className="content-padding">
            <div className="features">{/* ... your feature items ... */}</div>
          </div>

          <section className="spacer"></section>
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
          background-color: #111111;
          font-weight: 300;
        }

        .hero {
          height: 100vh;
        }
        .hero__inner {
          height: 100%;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
        }
        .hero__image-cont {
          position: relative;
          overflow: hidden;
        }
        .hero__image-cont:not(:last-child):after {
          content: "";
          position: absolute;
          right: 0px;
          background-color: #111111;
          height: 100%;
          top: 0;
          width: 2.5px;
          z-index: 999;
        }

        .hero__image-cont img,
        .hero__image-cont .anim-swipe {
          position: absolute;
          width: 600%; /* Changed from 700% to match 6 columns */
          height: 100%;
          top: 0;
          left: 0;
          object-fit: cover;
        }
        .anim-swipe {
          width: 100%;
          background-color: #111111;
        }

        /* Corrected the left offsets to start from 0 */
        .hero__image-cont:nth-child(1) img {
          left: 0%;
        }
        .hero__image-cont:nth-child(2) img {
          left: -100%;
        }
        .hero__image-cont:nth-child(3) img {
          left: -200%;
        }
        .hero__image-cont:nth-child(4) img {
          left: -300%;
        }
        .hero__image-cont:nth-child(5) img {
          left: -400%;
        }
        .hero__image-cont:nth-child(6) img {
          left: -500%;
        }

        /* --- Other Styles --- */
        .spacer {
          height: 100vh;
        }
        .scroll {
          position: fixed;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 999;
        }
        .content-padding {
          max-width: 1240px;
          margin: 0 auto;
          padding: 1rem;
        }
        .features {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }
        .features__item {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 2rem;
          height: 100vh;
          border-top: dashed 2px grey;
        }
        .features__item--left {
          flex-direction: row;
          text-align: left;
        }
        .features__item--right {
          flex-direction: row-reverse;
          text-align: right;
        }
        .features__image {
          flex: 1 1 40%;
          position: relative;
        }
        .features__card {
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          aspect-ratio: 1 / 1;
        }
        .features__img {
          width: 100%;
          height: 100%;
          position: absolute;
          object-fit: cover;
          display: block;
        }
        .features__content {
          flex: 1 1 55%;
        }
        .features__title {
          font-size: 1.8em;
          margin-block-end: 1rem;
        }
        .features__description {
          line-height: 1.6;
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
