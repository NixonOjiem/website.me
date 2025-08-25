"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import "./globals.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import HeaderComponent from "@/components/layout/HeaderComponent";
import ContactForm from "@/components/layout/ContactForm";
import PageLoader from "@/components/layout/PageLoader";

// Register GSAP plugins once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isContactFormOpen, setContactFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Use a state to store the ScrollSmoother instance
  const [smoother, setSmoother] = useState<ScrollSmoother | null>(null);

  useEffect(() => {
    // Set loading to false after a delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Initialize ScrollSmoother only when not loading
    if (!loading) {
      const smootherInstance = ScrollSmoother.create({
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
      });
      setSmoother(smootherInstance);
    }
    // Cleanup function to kill the smoother instance
    return () => {
      if (smoother) {
        smoother.kill();
        setSmoother(null);
      }
    };
  }, [loading]); // The key change is to add `loading` as a dependency

  return (
    <html lang="en">
      <body>
        <>
          {loading ? (
            <PageLoader />
          ) : (
            <>
              <HeaderComponent
                onContactClick={() => setContactFormOpen(true)}
              />
              <div id="smooth-wrapper">
                <div id="smooth-content">{children}</div>
              </div>
              <ContactForm
                show={isContactFormOpen}
                onClose={() => setContactFormOpen(false)}
              />
            </>
          )}
        </>
      </body>
    </html>
  );
}
