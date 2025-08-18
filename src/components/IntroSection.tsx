"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

function IntroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Effect for initial text and card entrance animation
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

  // Effect for card entrance animation once text is done
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

  // Effect for interactive card hover animation
  useEffect(() => {
    if (animationComplete && cardsRef.current) {
      const cards = gsap.utils.toArray<HTMLElement>(".skill-card");

      cards.forEach((card) => {
        // Apply a transform style needed for 3D effects
        gsap.set(card, { transformStyle: "preserve-3d" });

        const onMouseMove = (e: MouseEvent) => {
          const { left, top, width, height } = card.getBoundingClientRect();
          // Calculate mouse position relative to the card center (-0.5 to 0.5)
          const x = (e.clientX - left) / width - 0.5;
          const y = (e.clientY - top) / height - 0.5;

          // Animate the card's rotation based on mouse position
          gsap.to(card, {
            duration: 0.7,
            rotationY: x * 20, // Control the tilt intensity
            rotationX: -y * 20,
            ease: "power2.out",
          });
        };

        const onMouseEnter = () => {
          gsap.to(card, {
            duration: 0.3,
            scale: 1.05, // Pop effect
            ease: "power3.out",
          });
          card.addEventListener("mousemove", onMouseMove);
        };

        const onMouseLeave = () => {
          card.removeEventListener("mousemove", onMouseMove);
          // Animate back to the default state with a nice elastic feel
          gsap.to(card, {
            duration: 0.7,
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            ease: "elastic.out(1, 0.5)",
          });
        };

        card.addEventListener("mouseenter", onMouseEnter);
        card.addEventListener("mouseleave", onMouseLeave);

        // Cleanup function to remove event listeners when the component unmounts
        return () => {
          card.removeEventListener("mouseenter", onMouseEnter);
          card.removeEventListener("mouseleave", onMouseLeave);
        };
      });
    }
  }, [animationComplete]);

  // ✨ UPDATED: The skills array now contains objects with a name and an icon.
  const skills = [
    {
      title: "Backend",
      icon: "💻",
      items: [
        { name: "Node.js", icon: "🟢" },
        { name: "Express", icon: "🚀" },
        { name: "Laravel", icon: "🔥" },
        { name: "GraphQL", icon: "⚛️" },
        { name: "REST APIs", icon: "🔗" },
      ],
      color: "#3b82f6", // Blue
    },
    {
      title: "Frontend",
      icon: "🎨",
      items: [
        { name: "React", icon: "⚛️" },
        { name: "Next.js", icon: "▲" },
        { name: "Vue", icon: "💚" },
        { name: "TypeScript", icon: "🔵" },
        { name: "Tailwind CSS", icon: "💨" },
        { name: "Redux", icon: "🔄" },
        { name: "HTML", icon: "📄" },
        { name: "CSS", icon: "🎨" },
      ],
      color: "#8b5cf6", // Purple
    },
    {
      title: "Databases",
      icon: "🗄️",
      items: [
        { name: "MongoDB", icon: "🍃" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "Firebase", icon: "🔥" },
        { name: "Redis", icon: "🟥" },
        { name: "MySQL", icon: "🐬" },
        { name: "SQL-lite", icon: "🪶" },
      ],
      color: "#10b981", // Green
    },
    {
      title: "DevOps & Tools",
      icon: "🛠️",
      items: [
        { name: "Docker", icon: "🐳" },
        { name: "CI/CD", icon: "🔁" },
        { name: "Git", icon: "🌿" },
        { name: "AWS/Azure", icon: "☁️" },
        { name: "Testing", icon: "🧪" },
        { name: "Jira", icon: " Jira" },
      ],
      color: "#f59e0b", // Amber
    },
  ];

  return (
    <div className="intro-section mt-[70vh] h-auto">
      <h1
        ref={headingRef}
        className="text-4xl md:text-5xl font-bold text-left text-[#ADD8E6] pt-10 overflow-hidden ml-[5vw]"
      >
        Hi, I&apos;m <span className="inline-block">Nixon Ojiem,</span>
      </h1>
      <p
        className="text-4xl md:text-5xl font-bold text-left text-[#ADD8E6] overflow-hidden mb-16 ml-[5vw]"
        ref={subheadingRef}
      >
        A Fullstack Developer.
      </p>
      <section className="container mx-auto">
        {/* Skills cards container */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-5 sm:px-0"
          style={{ perspective: "1000px" }}
        >
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card rounded-xl p-6 shadow-xl transform transition-all duration-300 hover:shadow-2xl relative overflow-hidden"
              style={{
                backgroundColor: skill.color,
                opacity: 0,
                transform: "translateY(30px)",
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
                {/* ✨ UPDATED: The mapping now accesses item.icon and item.name */}
                {skill.items.map((item, i) => (
                  <li key={i} className="flex items-center text-white/90">
                    <span className="w-6 text-center mr-2">{item.icon}</span>
                    <span className="text-white font-medium">{item.name}</span>
                  </li>
                ))}
              </ul>
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
