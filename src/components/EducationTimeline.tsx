"use client"; // This directive is necessary for using React hooks
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./EducationTimeline.module.css";

// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Your education data
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
  const component = useRef(null);
  const slider = useRef(null);

  useLayoutEffect(() => {
    // A GSAP context allows for safe cleanup
    let ctx = gsap.context(() => {
      let panels = gsap.utils.toArray(`.${styles.timelineItem}`);

      // Main horizontal scroll animation
      let scrollTween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + (slider.current.offsetWidth - window.innerWidth),
        },
      });

      // Animate elements inside each section as it scrolls into view
      panels.forEach((panel, i) => {
        // Year Animation (fades and slides up)
        gsap.from(panel.querySelector(`.${styles.timelineYear}`), {
          y: 80,
          opacity: 0,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left center",
            toggleActions: "play none none reverse",
          },
        });

        // Institution & Details Animation (slides in from left)
        gsap.from(
          panel.querySelectorAll(
            `.${styles.institution}, .${styles.qualification}, .${styles.date}`
          ),
          {
            x: -100,
            opacity: 0,
            stagger: 0.2, // Animate them one after another
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, component); // Scope animations to the component

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <div className={styles.container} ref={component}>
      <div className={styles.timelineWrapper} ref={slider}>
        {educationData.map((item, index) => (
          <section key={index} className={styles.timelineItem}>
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
