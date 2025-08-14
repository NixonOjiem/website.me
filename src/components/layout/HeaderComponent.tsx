"use client";
import React, { useState, useEffect } from "react";

// A simple throttle function to limit how often a function is called.
// This improves performance by preventing the scroll handler from running
// hundreds of times per second.
const throttle = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      return;
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
};

const App = () => {
  // useState hook to manage the header's height. 'isScrolled' will be true if the user
  // has scrolled past a certain point, and false otherwise.
  const [isScrolled, setIsScrolled] = useState(false);

  // useEffect hook to add and remove the throttled scroll event listener.
  // The listener is properly cleaned up when the component unmounts.
  useEffect(() => {
    // This function will be called on every scroll event, but the throttled
    // version will only execute once every 100ms.
    const handleScroll = () => {
      // Check if the vertical scroll position (window.scrollY) is greater than 80px.
      // This value matches the initial height of the header.
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Create a throttled version of our handleScroll function.
    const throttledHandleScroll = throttle(handleScroll, 100);

    // Add the throttled event listener for the 'scroll' event.
    window.addEventListener("scroll", throttledHandleScroll);

    // This return function is the cleanup function for useEffect.
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []); // The empty dependency array [] means this effect runs only once after the initial render.

  return (
    <div className="min-h-screen bg-[#0e100f] text-[#fffce1] font-[Mori]">
      {/* The height is 'h-[80px]' by default, and 'h-[60px]' when scrolled. */}
      <header
        className={`fixed top-0 left-0 w-full flex items-center justify-center bg-[#fffce1] text-[#0e100f] transition-all duration-300 shadow-md ${
          isScrolled ? "h-[60px]" : "h-[80px]"
        }`}
      >
        <h1 className="text-xl font-medium">Responsive Header</h1>
      </header>
    </div>
  );
};

export default App;
