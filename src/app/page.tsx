import React from "react";
import HeaderComponent from "@/components/layout/HeaderComponent";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import WorkExperience from "@/components/WorkExperience";
export default function Home() {
  return (
    <div className="">
      <HeaderComponent />
      <HeroSection />
      <IntroSection />
      <WorkExperience />
      {/* Add more sections as needed */}
      {/* This is just a placeholder to ensure the page has enough height for scrolling */}
    </div>
  );
}
