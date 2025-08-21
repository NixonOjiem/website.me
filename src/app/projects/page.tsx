"use client";

import React, { useState } from "react";
import HeaderComponent from "@/components/layout/HeaderComponent";
import ProjectIntro from "@/components/ProjectIntro";
import ProjectsComponent from "@/components/ProjectsComponent";
import FooterLayout from "@/components/layout/FooterLayout";
import ContactForm from "@/components/layout/ContactForm";

function page() {
  const [isContactFormOpen, setContactFormOpen] = useState(false);

  return (
    <div className="">
      <HeaderComponent onContactClick={() => setContactFormOpen(true)} />
      <ProjectIntro />
      <ProjectsComponent />
      <FooterLayout />
      <ContactForm
        show={isContactFormOpen}
        onClose={() => setContactFormOpen(false)}
      />
    </div>
  );
}

export default page;
