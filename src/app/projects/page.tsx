import React from "react";
import HeaderComponent from "@/components/layout/HeaderComponent";
import ProjectIntro from "@/components/ProjectIntro";
import ProjectsComponent from "@/components/ProjectsComponent";

function page() {
  return (
    <div className="">
      <HeaderComponent />
      <ProjectIntro />
      <ProjectsComponent />
    </div>
  );
}

export default page;
