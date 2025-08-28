"use client";

import React, { useState } from "react";
import ServicesComponent from "@/components/ServicesComponent";
import ContactForm from "@/components/layout/ContactForm";
import FooterLayout from "@/components/layout/FooterLayout";

function Page() {
  const [isContactFormOpen, setContactFormOpen] = useState(false);

  return (
    <div className="relative">
      {/* <HeaderComponent onContactClick={() => setContactFormOpen(true)} /> */}
      <ServicesComponent />
      <FooterLayout onContactClick={() => setContactFormOpen(true)} />
      <ContactForm
        show={isContactFormOpen}
        onClose={() => setContactFormOpen(false)}
      />
    </div>
  );
}

export default Page;
