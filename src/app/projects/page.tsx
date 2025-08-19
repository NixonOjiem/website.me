import React from "react";
import HeaderComponent from "@/components/layout/HeaderComponent";
import ProjectIntro from "@/components/ProjectIntro";
import ProjectsComponent from "@/components/ProjectsComponent";
import FooterLayout from "@/components/layout/FooterLayout";

function page() {
  return (
    <div className="">
      <HeaderComponent />
      <ProjectIntro />
      <ProjectsComponent />
      <FooterLayout />
    </div>
  );
}

export default page;
