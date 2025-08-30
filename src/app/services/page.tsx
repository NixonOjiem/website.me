"use client";

import React from "react";
import ServicesComponent from "@/components/ServicesComponent";
import FooterLayout from "@/components/layout/FooterLayout";

function Page() {
  return (
    <div className="relative">
      <ServicesComponent />
      <FooterLayout />
    </div>
  );
}

export default Page;
