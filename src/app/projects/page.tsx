import React from "react";
import HeaderComponent from "@/components/layout/HeaderComponent";
import ProjectIntro from "@/components/ProjectIntro";
function page() {
  return (
    <div className="">
      <HeaderComponent />
      <ProjectIntro />
      <div className="h-[200vh] w-[100w]">project</div>
    </div>
  );
}

export default page;
