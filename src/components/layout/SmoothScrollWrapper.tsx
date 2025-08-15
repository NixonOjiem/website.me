"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

// It's good practice to register plugins once in a central place
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScrollWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const main = useRef<HTMLDivElement>(null);
  const smoother = useRef<ScrollSmoother | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Create the ScrollSmoother instance
      smoother.current = ScrollSmoother.create({
        smooth: 1.2,
        effects: true,
        // The wrapper and content are automatically found inside the scope element (main.current)
        // so you don't need to specify them unless you have a different structure
      });
    }, main); // Scope the context to the main ref

    // Cleanup function to properly dispose of the ScrollSmoother instance
    return () => ctx.revert();
  }, []);

  return (
    // The required structure for ScrollSmoother is a wrapper and content div
    <div id="smooth-wrapper" ref={main}>
      <div id="smooth-content">{children}</div>
    </div>
  );
}
