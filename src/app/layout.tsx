// app/layout.tsx (or create a new layout if needed)
"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import "./globals.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register GSAP plugins once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize ScrollSmoother only once
    let smoother: ScrollSmoother | null = null;

    if (ScrollSmoother) {
      smoother = ScrollSmoother.create({
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
      });
    }

    return () => {
      if (smoother) {
        smoother.kill();
      }
    };
  }, []);

  return (
    <html lang="en">
      <body>
        <div id="smooth-wrapper">
          <div id="smooth-content">{children}</div>
        </div>
      </body>
    </html>
  );
}
