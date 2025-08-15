"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

// Throttle function (unchanged)
const throttle = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId) return;
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
};

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      once: true, // Whether animation should happen only once
    });
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
      setIsOpen(false); // Close menu on scroll for better UX
    };
    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  // Track mouse position over header (unchanged)
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Dynamic heights for smooth mobile expansion
  const baseHeightClass = isOpen
    ? "h-[200px]"
    : isScrolled
    ? "h-[65px]"
    : "h-[80px]";
  const desktopHeightClass = isScrolled ? "md:h-[65px]" : "md:h-[80px]";

  return (
    <>
      <header
        onMouseMove={handleMouseMove}
        style={
          {
            "--x": `${pos.x}px`,
            "--y": `${pos.y}px`,
          } as React.CSSProperties
        }
        className={`z-50 fixed top-[10px] left-1/2 -translate-x-1/2
                   w-[90vw] md:w-[70vw] lg:w-[50vw]
                   flex items-center justify-center
                   text-[#212722] rounded-2xl shadow-md
                   transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                   ${baseHeightClass} ${desktopHeightClass}`}
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1000"
      >
        {/* Effect container */}
        <div className="w-full h-full rounded-2xl header-bg overflow-hidden relative">
          {/* Top bar: brand left, nav right, hamburger on mobile */}
          <div className="relative z-10 w-full h-[65px] md:h-full px-5 md:px-6 flex items-center justify-between">
            {/* Brand (left) */}
            <Link
              href="/"
              className="text-white text-lg md:text-xl font-semibold tracking-tight"
            >
              Nixon Ojiem
            </Link>

            {/* Desktop nav (right) */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-8 text-white">
                <li>
                  <Link
                    href="/projects"
                    className="nav-link opacity-90 hover:opacity-100"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="nav-link opacity-90 hover:opacity-100"
                  >
                    Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="nav-link opacity-90 hover:opacity-100"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Hamburger + "Menu" label (mobile) */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center gap-2 px-3 h-10 rounded-lg bg-white/10 hover:bg-white/15 active:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition-colors"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen((v) => !v)}
            >
              <div className="relative w-6 h-4">
                <span
                  className={`hamburger-line absolute left-0 top-0 ${
                    isOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`hamburger-line absolute left-0 top-1/2 -translate-y-1/2 ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`hamburger-line absolute left-0 bottom-0 ${
                    isOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </div>
              <span className="text-white text-sm font-medium tracking-wide">
                {isOpen ? "Close" : "Menu"}
              </span>
            </button>
          </div>

          {/* Mobile menu (revealed by expanding header height) */}
          <div
            id="mobile-menu"
            className={`md:hidden relative z-10 w-full px-5 pb-4 overflow-hidden
                       transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]
                       ${
                         isOpen
                           ? "opacity-100 translate-y-0"
                           : "opacity-0 -translate-y-4 pointer-events-none"
                       }`}
          >
            <ul className="flex flex-col gap-3 text-white text-base">
              <li>
                <a
                  href="/projects"
                  className="block py-1.5 px-2 rounded-md bg-white/0 hover:bg-white/10 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="block py-1.5 px-2 rounded-md bg-white/0 hover:bg-white/10 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Service
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="block py-1.5 px-2 rounded-md bg-white/0 hover:bg-white/10 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Styles */}
        <style jsx>{`
          .header-bg {
            background-color: #2b6879ff;
          }
          .header-bg::before {
            content: "";
            position: absolute;
            inset: 0;
            background-color: #8b718aff;
            clip-path: circle(0% at var(--x) var(--y));
            transition: clip-path 0.4s ease-out;
          }
          .header-bg:hover::before {
            clip-path: circle(150% at var(--x) var(--y));
          }

          /* --- FIX STARTS HERE --- */

          /* Desktop-only hover bounce animation keyframes */
          @keyframes nav-bounce {
            0% {
              transform: translateY(0) scale(1);
            }
            30% {
              transform: translateY(-4px) scale(1.05);
            }
            60% {
              transform: translateY(0) scale(0.98);
            }
            80% {
              transform: translateY(-2px) scale(1.02);
            }
            100% {
              transform: translateY(0) scale(1);
            }
          }

          /* Consolidated and corrected media query for the nav-link hover effect */
          @media (min-width: 768px) and (hover: hover) {
            .nav-link {
              display: inline-block;
              /* Prepares the element for transformation, improving performance */
              will-change: transform;
              /* Promotes the element to its own layer for smoother animation */
              transform: translateZ(0);
            }
            .nav-link:hover {
              /* Applies the bounce animation on hover */
              animation: nav-bounce 420ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
            }
          }

          /* --- FIX ENDS HERE --- */

          /* Hamburger lines styling */
          .hamburger-line {
            display: block;
            width: 24px;
            height: 2px;
            background: #ffffff;
            border-radius: 9999px;
            transition: transform 300ms ease, opacity 200ms ease;
          }
        `}</style>
      </header>
    </>
  );
};

export default App;
