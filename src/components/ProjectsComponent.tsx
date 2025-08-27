"use client";
import React, { useState, useEffect } from "react";

export default function ProjectsComponent() {
  const [isMobile, setIsMobile] = useState(false);
  const [expandedProject, setExpandedProject] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const toggleExpand = (index) => {
    if (expandedProject === index) {
      setExpandedProject(null);
    } else {
      setExpandedProject(index);
    }
  };

  const projects = [
    {
      title: "LoveHomeMarts Ecommerce site",
      description:
        "Elevate your shopping experience with LoveHomeMart, the ultimate e-commerce destination for quality home essentials. Designed for seamless browsing and effortless transactions, this platform connects shoppers with a curated selection of stylish and functional products. Discover, shop, and transform your space—all in just a few clicks.",
      imageUrl: "/images/ScreenshotLovehomemart.png",
      altText: "LoveHomeMarts Ecommerce site",
      link: "https://lovehomemart.com/",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    },
    {
      title: "YiehBoats",
      description:
        "Harness the power of the sun and glide across the water with our eco-friendly solar boat rides! Our website offers a unique and sustainable way to experience the beauty of the water. Enjoy a serene, emission-free journey and make unforgettable memories while protecting our planet.",
      imageUrl: "/images/ScreenshotYiehBoats.png",
      altText: "YiehBoats",
      link: "https://yiehboat.co.ke/",
      technologies: ["Vue.js", "CSS3", "PHP", "MySQL"],
    },
    {
      title: "KenyaHMIS Community Forum",
      description:
        "Empower healthcare professionals with the KenyaHMIS Community Forum, a dynamic platform designed for seamless knowledge exchange among EMR users. Whether seeking solutions, sharing insights, or navigating system enhancements, this interactive space fosters collaboration and expertise. Engage, ask, and elevate healthcare technology—one conversation at a time.",
      imageUrl: "/images/ScreenshotKenyaHMIS.png",
      altText: "KenyaHMIS Community Forum",
      link: "https://community.kenyahmis.org/",
      technologies: ["React", "Firebase", "Material UI", "Node.js"],
    },
    {
      title: "Anime-Manga Quiz App",
      description:
        "Calling all anime and manga lovers! Dive into the ultimate trivia experience with our fun and interactive quiz app. Challenge yourself with randomly generated questions about your favorite anime and manga series, and see how you stack up with a personalized score.",
      imageUrl: "/images/Screenshot 2025-08-22 105353.png",
      altText: "Anime-Manga Quiz App",
      link: "https://anime-manga-quiz-8ad86.web.app/",
      technologies: ["JavaScript", "Firebase", "HTML5", "CSS3"],
    },
    {
      title: "Video Chat App",
      description:
        "Introducing my video call app! Seamlessly connect with friends, family, and colleagues through high-quality video and audio. Whether for work or play, our app ensures a smooth and engaging communication experience. Stay connected, no matter where you are!",
      imageUrl: "/images/videochat.jpg",
      altText: "Video Chat App",
      link: "https://nixonojiem.github.io/video-chat/",
      technologies: ["WebRTC", "Socket.io", "Node.js", "React"],
    },
    {
      title: "Nutrition Analysis App",
      description:
        "Nutrition analysis plays a crucial role in maintaining and improving overall health and well-being. By understanding the nutritional content of foods, individuals can make informed dietary choices that support their health goals, whether it's managing weight, improving energy levels, or preventing chronic diseases.",
      imageUrl: "/images/Screenshot Nutritional Analysis.png",
      altText: "Nutrition Analysis App",
      link: "https://nutritional-analysis-424f7.web.app/",
      technologies: ["React", "Nutrition API", "Firebase", "Chart.js"],
    },
    {
      title: "Image Compression App",
      description:
        "An image compression app efficiently reduces file sizes without compromising quality, making it ideal for web developers and photographers to optimize storage and improve website loading speeds. Perfect for enhancing user experience!",
      imageUrl: "/images/compresion.jpg",
      altText: "Image Compression App",
      link: "https://nixonojiem.github.io/Image-compressor/",
      technologies: ["JavaScript", "Browser APIs", "HTML5", "CSS3"],
    },
    {
      title: "AI text Detection APP",
      description:
        "The AI Detection App is a powerful tool designed to identify and analyze artificial intelligence-generated content. Leveraging advanced machine learning algorithms, this app can accurately detect AI-generated text.",
      imageUrl: "/images/AI detector.png",
      altText: "AI text Detection APP",
      link: "https://nixonojiem.github.io/AI-detector/",
      technologies: ["TensorFlow.js", "React", "Node.js", "ML Algorithms"],
    },
    {
      title: "Movie info App",
      description:
        "The Movie and TV Show Search application is a user-friendly tool designed to help users quickly find information about their favorite films and series. By simply entering a title, the app fetches key details such as the IMDb score and the release year, providing a concise overview for users to make informed viewing choices.",
      imageUrl:
        "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1vdmllJTIwaW5mbyUyMGFwcHxlbnwwfHwwfHx8MA%3D%3D",
      altText: "Movie info App",
      link: "https://movie-info-68f8e.web.app/",
      technologies: ["React", "OMDb API", "Firebase", "CSS3"],
    },
  ];

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 pt-[200px]">
        <div className="mb-12 text-center">
          <h1 className="bg-gradient-to-br from-cyan-800 to-gray-800 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
            My Projects
          </h1>
          <p className="mx-auto mt-2 max-w-3xl text-lg text-gray-600">
            A collection of my recent work and personal projects
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`transform overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg ${
                expandedProject === index
                  ? "sm:col-span-3 md:col-span-full"
                  : ""
              }`}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  src={project.imageUrl}
                  alt={project.altText}
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlNWU1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+";
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md bg-white px-4 py-2 font-semibold text-cyan-800 transition-colors duration-200 hover:bg-cyan-800 hover:text-white"
                  >
                    Live Preview
                  </a>
                </div>
              </div>

              <div className="flex flex-col p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {project.title}
                </h3>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="mb-4 text-sm text-gray-700">
                  {expandedProject === index
                    ? project.description
                    : `${project.description.substring(0, 100)}...`}
                </p>

                <div className="flex items-center justify-between">
                  <button
                    className="text-sm font-medium text-cyan-800 hover:underline"
                    onClick={() => toggleExpand(index)}
                  >
                    {expandedProject === index ? "Read Less" : "Read More"}
                  </button>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-cyan-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-cyan-900"
                  >
                    View Project
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 17L17 7M17 7H7M17 7V17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
