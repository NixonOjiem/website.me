"use client";

import React, { useState } from "react";
import HeaderComponent from "@/components/layout/HeaderComponent";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import EducationComponent from "@/components/EducationTimeline";
import WorkExperience from "@/components/WorkExperience";
import FooterLayout from "@/components/layout/FooterLayout";
import ContactForm from "@/components/layout/ContactForm";

export default function Home() {
  const [isContactFormOpen, setContactFormOpen] = useState(false);

  return (
    <div className="">
      <HeaderComponent onContactClick={() => setContactFormOpen(true)} />
      <HeroSection />
      <IntroSection />
      <WorkExperience />
      <EducationComponent />
      <FooterLayout onContactClick={() => setContactFormOpen(true)} />
      <ContactForm
        show={isContactFormOpen}
        onClose={() => setContactFormOpen(false)}
      />
    </div>
  );
}
