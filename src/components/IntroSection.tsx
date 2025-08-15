"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

function IntroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(SplitText);

    if (!headingRef.current || !subheadingRef.current) return;

    const headingSplit = new SplitText(headingRef.current, {
      type: "chars",
      charClass: "intro-char",
    });

    const subheadingSplit = new SplitText(subheadingRef.current, {
      type: "chars",
      charClass: "intro-char",
    });

    const tl = gsap.timeline();

    // Text animation
    tl.from([headingSplit.chars, subheadingSplit.chars], {
      y: 100,
      opacity: 0,
      duration: 0.7,
      ease: "power4",
      stagger: 0.04,
    }).call(() => {
      setAnimationComplete(true);
    });

    return () => {
      headingSplit.revert();
      subheadingSplit.revert();
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (animationComplete && cardsRef.current) {
      const cardElements = cardsRef.current.querySelectorAll(".skill-card");

      gsap.to(cardElements, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)",
      });
    }
  }, [animationComplete]);

  // Skill categories with simplified color definitions
  const skills = [
    {
      title: "Backend",
      icon: "💻",
      items: ["Node.js", "Express", "Laravel", "GraphQL", "REST APIs"],
      color: "#3b82f6", // Blue
    },
    {
      title: "Frontend",
      icon: "🎨",
      items: ["React", "Next.js", "Vue", "TypeScript", "Tailwind CSS", "Redux"],
      color: "#8b5cf6", // Purple
    },
    {
      title: "Databases",
      icon: "🗄️",
      items: ["MongoDB", "PostgreSQL", "Firebase", "Redis", "MySQL"],
      color: "#10b981", // Green
    },
    {
      title: "DevOps & Tools",
      icon: "🛠️",
      items: ["Docker", "CI/CD", "Git", "AWS/Azure", "Testing"],
      color: "#f59e0b", // Amber
    },
  ];

  return (
    <div className="intro-section mt-[70vh] h-auto">
      <section className="container mx-auto px-4">
        <h1
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold text-left text-[#ADD8E6] pt-10 overflow-hidden ml-5"
        >
          Hi, I&apos;m <span className="inline-block">Nixon Ojiem,</span>
        </h1>
        <p
          className="text-4xl md:text-5xl font-bold text-left text-[#ADD8E6] overflow-hidden ml-5 mb-16"
          ref={subheadingRef}
        >
          A Fullstack Developer
        </p>

        {/* Skills cards container */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card rounded-xl p-6 shadow-xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden"
              style={{
                backgroundColor: skill.color,
                opacity: animationComplete ? 1 : 0,
                transform: animationComplete
                  ? "translateY(0)"
                  : "translateY(30px)",
              }}
            >
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0.1) 100%)`,
                }}
              ></div>

              <div className="flex items-center mb-4 relative z-10">
                <span className="text-3xl mr-3">{skill.icon}</span>
                <h3 className="text-xl font-bold text-white">{skill.title}</h3>
              </div>
              <ul className="space-y-2 relative z-10">
                {skill.items.map((item, i) => (
                  <li key={i} className="flex items-center text-white/90">
                    <span className="mr-2">•</span>
                    <span className="text-white font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Hover effect layer */}
              <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-xl pointer-events-none z-20"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Add some spacing at the bottom */}
      <div className="h-20"></div>
    </div>
  );
}

export default IntroSection;
