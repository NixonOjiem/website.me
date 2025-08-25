"use client";

import React, { useState } from "react";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import EducationComponent from "@/components/EducationTimeline";
import WorkExperience from "@/components/WorkExperience";
import FooterLayout from "@/components/layout/FooterLayout";
import FloatingCard from "@/components/FloatingCard";
import { workData } from "./data/workData";
export default function Home() {
  const [isContactFormOpen, setContactFormOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [isCardVisible, setIsCardVisible] = useState(false);
  return (
    <>
      <HeroSection />
      <IntroSection />
      <WorkExperience onActiveIndexChange={(index) => setCardIndex(index)} />
      <EducationComponent />
      <FloatingCard
        data={workData[cardIndex]}
        isVisible={true} // For now, we'll keep it visible.
        // You'd hook this up to scroll logic.
      />
      <FooterLayout onContactClick={() => setContactFormOpen(true)} />
    </>
  );
}
