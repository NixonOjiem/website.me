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
          end: () =>
            "+=" + ((slider.current?.offsetWidth ?? 0) - window.innerWidth),
        },
      });

      panels.forEach((panel) => {
        if (!(panel instanceof HTMLElement)) return;

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
    <div className={styles.container} ref={component}>
      <div className={styles.timelineWrapper} ref={slider}>
        {educationData.map((item, index) => (
          <section key={index} className={styles.timelineItem}>
            <br />
            <div className={styles.timelineContent}>
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
  );
};

export default EducationTimeline;
