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
      <div className="projects-container">
        <div className="projects-hero">
          <h1 className="projects-heading">My Projects</h1>
          <p className="projects-subheading">
            A collection of my recent work and personal projects
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`project-card ${
                expandedProject === index ? "expanded" : ""
              }`}
            >
              <div className="project-image-container">
                <img
                  className="project-image"
                  src={project.imageUrl}
                  alt={project.altText}
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlNWU1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+";
                  }}
                />
                <div className="project-overlay">
                  <button
                    className="view-project-btn"
                    onClick={() => window.open(project.link, "_blank")}
                  >
                    Live Preview
                  </button>
                </div>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>

                <div className="tech-tags">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="project-description">
                  {expandedProject === index
                    ? project.description
                    : `${project.description.substring(0, 100)}...`}
                </p>

                <div className="project-actions">
                  <button
                    className="expand-btn"
                    onClick={() => toggleExpand(index)}
                  >
                    {expandedProject === index ? "Read Less" : "Read More"}
                  </button>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
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

      <style jsx>{`
        .projects-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .projects-hero {
          text-align: center;
          margin-bottom: 3rem;
        }

        .projects-heading {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #2b6879 0%, #16353d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .projects-subheading {
          font-size: 1.1rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }

        .project-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          height: auto;
        }

        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
        }

        .project-card.expanded {
          grid-column: 1 / -1;
        }

        .project-image-container {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .project-card:hover .project-image {
          transform: scale(1.05);
        }

        .project-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-card:hover .project-overlay {
          opacity: 1;
        }

        .view-project-btn {
          background: #fff;
          color: #2b6879;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .view-project-btn:hover {
          background: #2b6879;
          color: #fff;
        }

        .project-content {
          padding: 1.5rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .project-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: #333;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .tech-tag {
          background: #e9f5f8;
          color: #2b6879;
          padding: 0.25rem 0.6rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .project-description {
          color: #666;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .project-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }

        .expand-btn {
          background: none;
          border: none;
          color: #2b6879;
          cursor: pointer;
          font-weight: 500;
          padding: 0.5rem 0;
        }

        .expand-btn:hover {
          text-decoration: underline;
        }

        .project-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #2b6879;
          color: white;
          padding: 0.6rem 1.2rem;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          transition: background 0.2s ease;
        }

        .project-link:hover {
          background: #16353d;
        }

        /* Mobile-first responsive adjustments */
        @media (max-width: 768px) {
          .projects-container {
            padding: 1rem 0.5rem;
          }

          .projects-heading {
            font-size: 2rem;
          }

          .projects-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .project-card.expanded {
            grid-column: auto;
          }

          .project-image-container {
            height: 180px;
          }

          .project-content {
            padding: 1.2rem;
          }

          .project-actions {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .project-link {
            width: 100%;
            justify-content: center;
          }
        }

        /* Extra small devices */
        @media (max-width: 480px) {
          .projects-heading {
            font-size: 1.8rem;
          }

          .projects-subheading {
            font-size: 1rem;
          }

          .project-title {
            font-size: 1.2rem;
          }

          .project-description {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
}
