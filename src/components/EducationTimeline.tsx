"use client";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./EducationTimeline.module.css";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    year: "2023",
    institution: "Microsoft & LinkedIn Learning",
    qualification: "Certificate in Search Engine Optimization",
    date: "Aug 2023",
  },
  {
    year: "2022",
    institution: "United States International University: Cybershujaa",
    qualification: "Certificate in Cloud & Network Technology Azure",
    date: "Nov 2022",
  },
  {
    year: "2021",
    institution: "Multimedia University of Kenya",
    qualification: "Degree in Information Technology",
    date: "Dec 2021",
  },
  {
    year: "2016",
    institution: "Maranda High school",
    qualification: "Kenya Certificate of Secondary Education",
    date: "Nov 2016",
  },
];

// SVG component for the graduation cap icon
const GraduationCapIcon = () => (
  <svg
    className={styles.icon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 8.48L5.43 8.02 12 4.8l6.57 3.22L12 11.48zM17 17.5c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    <path d="M1 13.91V17h2v-2.1l9-4.91-11 6.02z" />
  </svg>
);

const EducationTimeline = () => {
  const component = useRef<HTMLDivElement | null>(null);
  const slider = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(`.${styles.timelineItem}`);

      const scrollTween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current!,
          pin: true,
          scrub: 1,
          pinSpacing: true,
          end: () =>
            `+=${
              (slider.current?.offsetWidth ?? 0) -
              window.innerWidth +
              window.innerHeight
            }`,
        },
      });

      panels.forEach((panel) => {
        if (!(panel instanceof HTMLElement)) return;

        // Animate the icon
        const iconEl = panel.querySelector(`.${styles.icon}`);
        if (iconEl) {
          gsap.from(iconEl, {
            scale: 0.5,
            opacity: 0,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left 80%",
              toggleActions: "play none none reverse",
            },
          });
        }

        const yearEl = panel.querySelector(`.${styles.timelineYear}`);
        if (yearEl) {
          gsap.from(yearEl, {
            y: 80,
            opacity: 0,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left center",
              toggleActions: "play none none reverse",
            },
          });
        }

        const detailEls = panel.querySelectorAll(
          `.${styles.institution}, .${styles.qualification}, .${styles.date}`
        );
        if (detailEls.length > 0) {
          gsap.from(detailEls, {
            x: -100,
            opacity: 0,
            stagger: 0.2,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left 70%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });
    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className={styles.container} ref={component}>
        <div className={styles.timelineWrapper} ref={slider}>
          {educationData.map((item, index) => (
            <section key={index} className={styles.timelineItem}>
              {index === 0 && (
                <h1 className="top-0 text-4xl md:text-5xl font-bold text-left text-[#FEF6E6] pt-10 overflow-hidden ml-[5vw]">
                  Educational Background
                </h1>
              )}
              <div className={styles.timelineContent}>
                {/* SVG Icon Added Here */}
                <GraduationCapIcon />

                <div className={styles.timelineYear}>{item.year}</div>
                <div className={styles.timelineDetails}>
                  <h2 className={styles.institution}>{item.institution}</h2>
                  <h3 className={styles.qualification}>{item.qualification}</h3>
                  <p className={styles.date}>{item.date}</p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default EducationTimeline;
