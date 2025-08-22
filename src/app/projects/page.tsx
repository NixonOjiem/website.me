"use client";
import React, { useState, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import HeaderComponent from "@/components/layout/HeaderComponent";
import ProjectIntro from "@/components/ProjectIntro";
import ProjectsComponent from "@/components/ProjectsComponent";
import FooterLayout from "@/components/layout/FooterLayout";
import ContactForm from "@/components/layout/ContactForm";

function Page() {
  const [isContactFormOpen, setContactFormOpen] = useState(false);
  const main = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const ctx = gsap.context(() => {
      // 1. Make the ScrollSmoother instance more robust
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
      });

      const animateFrom = (elem: HTMLElement, direction?: number) => {
        // ... (your animateFrom function remains the same)
        direction = direction || 1;
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

      // 2. Use a setTimeout to delay the animation setup
      // This gives images time to load and ensures correct trigger points
      setTimeout(() => {
        const elements = gsap.utils.toArray(".gs_reveal");
        elements.forEach((elem) => {
          hide(elem as HTMLElement);
          ScrollTrigger.create({
            trigger: elem as HTMLElement,
            onEnter: () => animateFrom(elem as HTMLElement),
            onEnterBack: () => animateFrom(elem as HTMLElement, -1),
            onLeave: () => hide(elem as HTMLElement),
          });
        });
      }, 100);
    }, main);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={main}>
      <HeaderComponent onContactClick={() => setContactFormOpen(true)} />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* <ProjectIntro /> */}
            <ProjectsComponent />
          </main>
          <FooterLayout onContactClick={() => setContactFormOpen(true)} />
        </div>
      </div>

      <ContactForm
        show={isContactFormOpen}
        onClose={() => setContactFormOpen(false)}
      />

      {/* Your JSX styles remain the same */}
      <style jsx>{`
        /* Global styles for ScrollSmoother */
        #smooth-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        #smooth-content {
          overflow: visible;
          width: 100%;
        }

        .content {
          max-width: 1240px;
          margin: 0 auto;
          padding: 1rem;
          padding-top: 30vh;
        }

        .content__hero {
          height: 40vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content__heading {
          text-align: center;
          font-size: 3rem;
          margin: 0;
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
          min-height: 100vh;
          border-top: dashed 2px grey;
          padding: 2rem 0;
        }

        .features__item--left {
          flex-direction: row;
          text-align: right;
        }

        .features__item--right {
          flex-direction: row-reverse;
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
          font-size: 1.2rem;
        }

        .gs_reveal {
          opacity: 0;
          visibility: hidden;
          will-change: transform, opacity;
        }

        .spacer {
          height: 100vh;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .features__item {
            flex-direction: column !important;
            text-align: center !important;
            min-height: auto;
            height: auto;
          }

          .features__image,
          .features__content {
            flex: 1 1 100%;
          }

          .content__heading {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Page;
