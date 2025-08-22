"use client";
import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import HeaderComponent from "@/components/layout/HeaderComponent";
import ProjectIntro from "@/components/ProjectIntro";
import ProjectsComponent from "@/components/ProjectsComponent";
import FooterLayout from "@/components/layout/FooterLayout";
import ContactForm from "@/components/layout/ContactForm";
import TestComponent from "@/components/TestComponent";

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

  useEffect(() => {
    // Check if the window object exists to ensure we're on the client side
    if (typeof window !== "undefined") {
      // Check for a flag in session storage
      const hasReloaded = sessionStorage.getItem("hasReloaded_Page");

      // If the page has not been reloaded yet
      if (!hasReloaded) {
        // Set the flag to true
        sessionStorage.setItem("hasReloaded_Page", "true");
        // Perform the hard reload
        window.location.reload(true);
      }
    }
  }, []);
  return (
    <div ref={main}>
      <HeaderComponent onContactClick={() => setContactFormOpen(true)} />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* <ProjectIntro /> */}
            {/* <TestComponent /> */}
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

        
        }
      `}</style>
    </div>
  );
}

export default Page;
