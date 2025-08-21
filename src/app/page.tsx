"use client";
import React, { useState } from "react";
import HeaderComponent from "@/components/layout/HeaderComponent";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import EducationComponent from "@/components/EducationTimeline";
import WorkExperience from "@/components/WorkExperience";
import FooterLayout from "@/components/layout/FooterLayout";
import ContactForm from "@/components/layout/ContactForm";
import Head from "next/head";

export default function Home() {
  const [isContactFormOpen, setContactFormOpen] = useState(false);
  return (
    <div className="">
      <Head>
        <style jsx global>{`
          .nav-link {
            position: relative;
            transition: color 0.3s;
          }
          .hamburger-line {
            display: block;
            width: 100%;
            height: 2px;
            background-color: white;
            transition: all 0.3s ease-in-out;
          }
        `}</style>
      </Head>
      <HeaderComponent onContactClick={() => setContactFormOpen(true)} />
      <HeroSection />
      <IntroSection />
      <WorkExperience />
      <EducationComponent />
      <FooterLayout />
      <ContactForm
        show={isContactFormOpen}
        onClose={() => setContactFormOpen(false)}
      />
    </div>
  );
}
