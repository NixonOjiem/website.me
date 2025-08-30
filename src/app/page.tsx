"use client";

import React from "react";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import EducationComponent from "@/components/EducationTimeline";
import WorkExperience from "@/components/WorkExperience";
import FooterLayout from "@/components/layout/FooterLayout";
export default function Home() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <WorkExperience />
      <EducationComponent />
      <FooterLayout />
    </>
  );
}
