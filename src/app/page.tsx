import React from "react";
import HeaderComponent from "@/components/layout/HeaderComponent";
import HeroSection from "@/components/HeroSection";
import TestComponent from "@/components/TestComponent";
export default function Home() {
  return (
    <div className="">
      <HeaderComponent />
      {/* <HeroSection /> */}
      <TestComponent />
      {/* This is just a placeholder to ensure the page has enough height for scrolling */}
      <div className="h-[200vh] w-[100vw]"></div>
    </div>
  );
}
