"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

function IntroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    let animation: gsap.core.Timeline | null = null;

    const split = new SplitText(headingRef.current, {
      type: "chars",
      charClass: "intro-char",
    });

    animation = gsap.timeline().from(split.chars, {
      x: 150,
      opacity: 0,
      duration: 0.7,
      ease: "power4",
      stagger: 0.04,
      onComplete: () => {
        split.revert();
      },
    });

    return () => {
      if (animation) {
        animation.revert();
        animation.kill();
      }
    };
  }, []);

  return (
    <div className="intro-section mt-[70vh]">
      <section>
        <h1
          ref={headingRef}
          className="text-4xl font-bold text-left text-[#ADD8E6] pt-10 overflow-hidden"
        >
          Hi, I&apos;m <span className="inline-block">Nixon Ojiem</span>
        </h1>
      </section>
    </div>
  );
}

export default IntroSection;
