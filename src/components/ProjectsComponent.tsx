"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

import { projects } from "@/app/data/projectsData"; // Your project data
import styles from "./ProjectsComponent.module.css"; // CSS styles

const ProjectsComponent = () => {
  const mainRef = useRef(null);
  const animating = useRef(false);
  const currentIndex = useRef(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  // Define background colors for the slides
  const slideColors = [
    "bg-gradient-to-br from-teal-600 to-blue-700",
    "bg-gradient-to-br from-pink-600 to-red-600",
    "bg-gradient-to-br from-purple-600 to-indigo-700",
    "bg-gradient-to-br from-green-600 to-teal-700",
    "bg-gradient-to-br from-yellow-600 to-orange-600",
  ];

  useEffect(() => {
    gsap.registerPlugin(Observer);

    const context = gsap.context(() => {
      const sections = gsap.utils.toArray(`.${styles.slide}`);
      const slideImages = gsap.utils.toArray(`.${styles.slide__img}`);
      const outerWrappers = gsap.utils.toArray(`.${styles.slide__outer}`);
      const innerWrappers = gsap.utils.toArray(`.${styles.slide__inner}`);
      const count = mainRef.current.querySelector(".count-js");
      const wrap = gsap.utils.wrap(0, sections.length);

      gsap.set(outerWrappers, { xPercent: 100 });
      gsap.set(innerWrappers, { xPercent: -100 });
      gsap.set(`.${styles.slide}:nth-of-type(1) .${styles.slide__outer}`, {
        xPercent: 0,
      });
      gsap.set(`.${styles.slide}:nth-of-type(1) .${styles.slide__inner}`, {
        xPercent: 0,
      });

      function gotoSection(index, direction) {
        if (animating.current) return;
        animating.current = true;

        index = wrap(index);

        let tl = gsap.timeline({
          defaults: { duration: 1, ease: "expo.inOut" },
          onComplete: () => {
            animating.current = false;
            setCurrentProjectIndex(index);
          },
        });

        let currentSection = sections[currentIndex.current];
        let heading = currentSection.querySelector(`.${styles.slide__heading}`);
        let nextSection = sections[index];
        let nextHeading = nextSection.querySelector(
          `.${styles.slide__heading}`
        );

        gsap.set(sections, { zIndex: 0, autoAlpha: 0 });
        gsap.set(sections[currentIndex.current], { zIndex: 1, autoAlpha: 1 });
        gsap.set(sections[index], { zIndex: 2, autoAlpha: 1 });

        tl.set(count, { text: index + 1 }, 0.32)
          .fromTo(
            outerWrappers[index],
            { xPercent: 100 * direction },
            { xPercent: 0 },
            0
          )
          .fromTo(
            innerWrappers[index],
            { xPercent: -100 * direction },
            { xPercent: 0 },
            0
          )
          .to(heading, { "--width": 800, xPercent: 30 * direction }, 0)
          .fromTo(
            nextHeading,
            { "--width": 800, xPercent: -30 * direction },
            { "--width": 200, xPercent: 0 },
            0
          )
          .fromTo(slideImages[index], { scale: 2 }, { scale: 1 }, 0)
          .timeScale(0.8);

        currentIndex.current = index;
      }

      const observer = Observer.create({
        type: "wheel,touch,pointer",
        preventDefault: true,
        wheelSpeed: -1,
        onUp: () => gotoSection(currentIndex.current + 1, +1),
        onDown: () => gotoSection(currentIndex.current - 1, -1),
        tolerance: 10,
      });

      function handleKeyDown(e) {
        if (e.code === "ArrowUp" || e.code === "ArrowLeft") {
          gotoSection(currentIndex.current - 1, -1);
        }
        if (
          e.code === "ArrowDown" ||
          e.code === "ArrowRight" ||
          e.code === "Space" ||
          e.code === "Enter"
        ) {
          gotoSection(currentIndex.current + 1, 1);
        }
      }

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        observer.kill();
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, mainRef);

    return () => context.revert();
  }, []);

  return (
    <div ref={mainRef}>
      <div className={styles.animationContainer}>
        {projects.map((project, index) => (
          <section className={styles.slide} key={project.title}>
            <div className={styles.slide__outer}>
              <div className={styles.slide__inner}>
                <div
                  className={styles.slide__content}
                  style={{
                    backgroundColor: slideColors[index % slideColors.length],
                  }}
                >
                  <div
                    className={styles.slide__container}
                    style={{ marginTop: 0 }}
                  >
                    <h2 className={styles.slide__heading}>{project.title}</h2>
                    <figure className={styles.slide__imgCont}>
                      <img
                        className={styles.slide__img}
                        src={project.imageUrl}
                        alt={project.altText}
                      />
                    </figure>
                    <div className={styles.slide__details}>
                      <p>{project.description}</p>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.projectLink}
                      >
                        View Project ➔
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* This is the overlay with the project count.
            The image inside it has been removed. */}
        <section className={styles.overlay}>
          <div className={styles.overlay__content}>
            <p className={styles.overlay__count}>
              0
              <span className={`${styles.count} count-js`}>
                {currentProjectIndex + 1}
              </span>
            </p>
            {/* The overlay image has been removed from here */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectsComponent;
