"use client";
import React from "react";
import HeaderComponent from "@/components/layout/HeaderComponent";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import WorkExperience from "@/components/WorkExperience";
import EducationComponent from "@/components/EducationComponent";
import TestComponent from "@/components/TestComponent";
export default function Home() {
  return (
    <div className="">
      <HeaderComponent />
      <HeroSection />
      <IntroSection />
      <TestComponent />
      {/* <WorkExperience /> */}
      <EducationComponent />
      {/* Add more sections as needed */}
      {/* This is just a placeholder to ensure the page has enough height for scrolling */}
      {/* Add more sections as needed */}
      {/* This is just a placeholder to ensure the page has enough height for scrolling */}
    </div>
  );
}
