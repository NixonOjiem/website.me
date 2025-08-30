"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import "./globals.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import HeaderComponent from "@/components/layout/HeaderComponent";
import ContactForm from "@/components/layout/ContactForm";
import PageLoader from "@/components/layout/PageLoader";
import ContactFormContext from "./context/ContactFormContext";
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
  const [smoother, setSmoother] = useState<ScrollSmoother | null>(null);
  const pathname = usePathname();
  // function to pass to the context provider
  const openContactForm = () => setContactFormOpen(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const smootherInstance = ScrollSmoother.create({
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
      });
      setSmoother(smootherInstance);
    }
    return () => {
      if (smoother) {
        smoother.kill();
        setSmoother(null);
      }
    };
  }, [loading]);

  // 👇 Helper function to format the pathname into a display name
  const getPageName = (path: string) => {
    if (path === "/") {
      return "Home";
    }
    // Remove the leading slash, then capitalize the first letter
    const name = path.substring(1);
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <html lang="en">
      <body>
        {/* 👇 ✨ 3. Wrap your components with the Provider */}
        <ContactFormContext.Provider value={{ openContactForm }}>
          {loading ? (
            <PageLoader pageName={getPageName(pathname)} />
          ) : (
            <>
              <HeaderComponent
                onContactClick={openContactForm} // You can use the new function here too
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
        </ContactFormContext.Provider>
      </body>
    </html>
  );
}
