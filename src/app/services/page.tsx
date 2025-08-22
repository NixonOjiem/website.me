"use client";
import React, { useState, useLayoutEffect, useRef } from "react";
import HeaderComponent from "@/components/layout/HeaderComponent";
import ServicesComponent from "@/components/ServicesComponent";
import ContactForm from "@/components/layout/ContactForm";
import FooterLayout from "@/components/layout/FooterLayout";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

function Page() {
  const [isContactFormOpen, setContactFormOpen] = useState(false);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useLayoutEffect(() => {
    // Check if we're on the client side
    if (typeof window === "undefined") return;

    // Initialize ScrollSmoother
    if (ScrollSmoother) {
      smootherRef.current = ScrollSmoother.create({
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
      });
    }

    // Clean up function
    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
      }
    };
  }, []);

  return (
    <div className="relative">
      <HeaderComponent onContactClick={() => setContactFormOpen(true)} />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <ServicesComponent />
          <FooterLayout onContactClick={() => setContactFormOpen(true)} />
        </div>
      </div>

      <ContactForm
        show={isContactFormOpen}
        onClose={() => setContactFormOpen(false)}
      />
      <style jsx>{`
        /* Smooth Scrolling Styles */
        #smooth-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        #smooth-content {
          will-change: transform;
        }

        /* Fix for potential layout issues */
        body {
          margin: 0;
          overflow: hidden;
        }

        html {
          height: 100%;
        }
      `}</style>
    </div>
  );
}

export default Page;
