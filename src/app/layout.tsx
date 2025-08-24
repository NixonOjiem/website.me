// app/layout.tsx (or create a new layout if needed)
"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import "./globals.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import HeaderComponent from "@/components/layout/HeaderComponent";
import ContactForm from "@/components/layout/ContactForm";

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
  const [isContactFormOpen, setContactFormOpen] = useState(false);

  return (
    <html lang="en">
      <body>
        <HeaderComponent onContactClick={() => setContactFormOpen(true)} />
        <div id="smooth-wrapper">
          <div id="smooth-content">{children}</div>
        </div>
        <ContactForm
          show={isContactFormOpen}
          onClose={() => setContactFormOpen(false)}
        />
      </body>
    </html>
  );
}
