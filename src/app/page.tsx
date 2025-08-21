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
        {/* Load GSAP and EmailJS from CDN */}
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
          async
        ></script>
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
          async
        ></script>
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
