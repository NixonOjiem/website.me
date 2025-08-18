"use client";
import React from "react";
import HeaderComponent from "@/components/layout/HeaderComponent";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import EducationComponent from "@/components/EducationTimeline";
import WorkExperience from "@/components/WorkExperience";
export default function Home() {
  return (
    <div className="">
      <HeaderComponent />
      <HeroSection />
      <IntroSection />
      <WorkExperience />
      <EducationComponent />
    </div>
  );
}
