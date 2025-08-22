// app/your-route/page.tsx

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
  const main = useRef(null); // Create ref for the main wrapper

  // 1. Move the entire GSAP setup to the Page component
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const ctx = gsap.context(() => {
      ScrollSmoother.create({
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
      });

      // --- The same animation logic from before ---
      const animateFrom = (elem: HTMLElement, direction?: number) => {
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
    }, main); // Scope to the main ref

    return () => ctx.revert();
  }, []);

  return (
    // The main wrapper is no longer an empty div
    <div ref={main}>
      {/* Elements outside ScrollSmoother will be fixed (Header, Modals) */}
      <HeaderComponent onContactClick={() => setContactFormOpen(true)} />

      {/* 2. Add the required HTML structure for ScrollSmoother here */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          {/* 3. Place all scrollable content inside smooth-content */}
          <ProjectIntro />
          <ProjectsComponent />
          <FooterLayout onContactClick={() => setContactFormOpen(true)} />
        </div>
      </div>

      <ContactForm
        show={isContactFormOpen}
        onClose={() => setContactFormOpen(false)}
      />
    </div>
  );
}

export default Page;
