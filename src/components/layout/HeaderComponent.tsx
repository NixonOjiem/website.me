"use client";
import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

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
        className={`fixed top-[10px] left-1/2 -translate-x-1/2 
                   w-[70vw] md:w-[70vw] lg:w-[50vw]
                   flex items-center justify-center 
                   text-[#212722] rounded-2xl shadow-md
                   transition-all duration-300 ease-in-out
                   ${isScrolled ? "h-[60px]" : "h-[80px]"}`}
      >
        <div className="w-full h-full flex items-center justify-center rounded-2xl header-bg overflow-hidden relative">
          <h1 className="text-xl font-medium relative z-10 text-white">
            Responsive Header
          </h1>
        </div>

        <style jsx>{`
          .header-bg {
            background-color: #000; /* light base */
          }

          .header-bg::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #c0ad03ff; /* accent fill */
            clip-path: circle(0% at var(--x) var(--y));
            transition: clip-path 0.4s ease-out;
          }

          .header-bg:hover::before {
            clip-path: circle(150% at var(--x) var(--y));
          }
        `}</style>
      </header>
    </>
  );
};

export default App;
