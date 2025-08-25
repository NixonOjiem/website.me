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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
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
        <>
          {loading ? (
            // 👇 Pass the formatted page name as a prop
            <PageLoader pageName={getPageName(pathname)} />
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
