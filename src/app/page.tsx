"use client";

import React, { useState } from "react";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import EducationComponent from "@/components/EducationTimeline";
import WorkExperience from "@/components/WorkExperience";
import FooterLayout from "@/components/layout/FooterLayout";
import PageLoader from "@/components/layout/PageLoader";
export default function Home() {
  const [isContactFormOpen, setContactFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setTimeout(() => setLoading(true), 6000);
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <HeroSection />
          <IntroSection />
          <WorkExperience />
          <EducationComponent />
          <FooterLayout onContactClick={() => setContactFormOpen(true)} />
        </>
      ) : (
        <PageLoader />
      )}
    </>
  );
}
