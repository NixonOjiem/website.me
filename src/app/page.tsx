"use client";

import React, { useState } from "react";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import EducationComponent from "@/components/EducationTimeline";
import WorkExperience from "@/components/WorkExperience";
import FooterLayout from "@/components/layout/FooterLayout";
export default function Home() {
  const [isContactFormOpen, setContactFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 6000);
  }, []);

  return (
    <>
      {/* {!loading ? (
        <>
          <HeroSection />
          <IntroSection />
          <WorkExperience />
          <EducationComponent />
          <FooterLayout onContactClick={() => setContactFormOpen(true)} />
        </>
      ) : (
        <PageLoader />
      )} */}
      <HeroSection />
      <IntroSection />
      <WorkExperience />
      <EducationComponent />
      <FooterLayout onContactClick={() => setContactFormOpen(true)} />
    </>
  );
}
