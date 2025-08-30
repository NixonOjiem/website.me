"use client";

import React, { useLayoutEffect, useRef } from "react";
import ProjectsComponent from "@/components/ProjectsComponent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Page() {
  const main = useRef(null);

  useLayoutEffect(() => {
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

    // Use a timeout to ensure all elements are rendered
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
  }, []);

  return (
    <div ref={main}>
      <main>
        <ProjectsComponent />
      </main>
    </div>
  );
}

export default Page;
