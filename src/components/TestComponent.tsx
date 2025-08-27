"use client";
import React, { useState, useEffect } from "react";

export default function ProjectsComponent() {
  const [isMobile, setIsMobile] = useState(false);

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

  const projects = [
    {
      title: "LoveHomeMarts Ecommerce site",
      description:
        "Elevate your shopping experience with LoveHomeMart, the ultimate e-commerce destination for quality home essentials. Designed for seamless browsing and effortless transactions, this platform connects shoppers with a curated selection of stylish and functional products. Discover, shop, and transform your space—all in just a few clicks.",
      imageUrl: "/images/ScreenshotLovehomemart.png",
      altText: "LoveHomeMarts Ecommerce site",
      link: "https://lovehomemart.com/",
    },
    {
      title: "YiehBoats",
      description:
        "Harness the power of the sun and glide across the water with our eco-friendly solar boat rides! Our website offers a unique and sustainable way to experience the beauty of the water. Enjoy a serene, emission-free journey and make unforgettable memories while protecting our planet.",
      imageUrl: "/images/ScreenshotYiehBoats.png",
      altText: "YiehBoats",
      link: "https://yiehboat.co.ke/",
    },
    {
      title: "KenyaHMIS Community Forum",
      description:
        "Empower healthcare professionals with the KenyaHMIS Community Forum, a dynamic platform designed for seamless knowledge exchange among EMR users. Whether seeking solutions, sharing insights, or navigating system enhancements, this interactive space fosters collaboration and expertise. Engage, ask, and elevate healthcare technology—one conversation at a time.",
      imageUrl: "/images/ScreenshotKenyaHMIS.png",
      altText: "KenyaHMIS Community Forum",
      link: "https://community.kenyahmis.org/",
    },
    {
      title: "Anime-Manga Quiz App",
      description:
        "Calling all anime and manga lovers! Dive into the ultimate trivia experience with our fun and interactive quiz app. Challenge yourself with randomly generated questions about your favorite anime and manga series, and see how you stack up with a personalized score.",
      imageUrl: "/images/Screenshot 2025-08-22 105353.png",
      altText: "Anime-Manga Quiz App",
      link: "https://anime-manga-quiz-8ad86.web.app/",
    },
    {
      title: "Video Chat App",
      description:
        "Introducing my video call app! Seamlessly connect with friends, family, and colleagues through high-quality video and audio. Whether for work or play, our app ensures a smooth and engaging communication experience. Stay connected, no matter where you are!",
      imageUrl: "/images/videochat.jpg",
      altText: "Video Chat App",
      link: "https://nixonojiem.github.io/video-chat/",
    },
    {
      title: "Nutrition Analysis App",
      description:
        "Nutrition analysis plays a crucial role in maintaining and improving overall health and well-being. By understanding the nutritional content of foods, individuals can make informed dietary choices that support their health goals, whether it's managing weight, improving energy levels, or preventing chronic diseases.",
      imageUrl: "/images/Screenshot Nutritional Analysis.png",
      altText: "Nutrition Analysis App",
      link: "https://nutritional-analysis-424f7.web.app/",
    },
    {
      title: "Image Compression App",
      description:
        "An image compression app efficiently reduces file sizes without compromising quality, making it ideal for web developers and photographers to optimize storage and improve website loading speeds. Perfect for enhancing user experience!",
      imageUrl: "/images/compresion.jpg",
      altText: "Image Compression App",
      link: "https://nixonojiem.github.io/Image-compressor/",
    },
    {
      title: "AI text Detection APP",
      description:
        "The AI Detection App is a powerful tool designed to identify and analyze artificial intelligence-generated content. Leveraging advanced machine learning algorithms, this app can accurately detect AI-generated text.",
      imageUrl: "/images/AI detector.png",
      altText: "AI text Detection APP",
      link: "https://nixonojiem.github.io/AI-detector/",
    },
    {
      title: "Movie info App",
      description:
        "The Movie and TV Show Search application is a user-friendly tool designed to help users quickly find information about their favorite films and series. By simply entering a title, the app fetches key details such as the IMDb score and the release year, providing a concise overview for users to make informed viewing choices.",
      imageUrl:
        "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1vdmllJTIwaW5mbyUyMGFwcHxlbnwwfHwwfHx8MA%3D%3D",
      altText: "Movie info App",
      link: "https://movie-info-68f8e.web.app/",
    },
  ];

  return (
    <>
      <div className="content">
        <div className="content__hero">
          <h1 className="content__heading gs_reveal">My projects</h1>
        </div>
        <div className="features">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`features__item gs_reveal ${
                index % 2 === 0
                  ? "features__item--left gs_reveal_fromLeft"
                  : "features__item--right gs_reveal_fromRight"
              }`}
            >
              <div className="features__image">
                <div className="features__card">
                  <img
                    className="features__img"
                    src={project.imageUrl}
                    alt={project.altText}
                    onError={(e) => {
                      // Fallback for broken images
                      e.target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlNWU1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+";
                    }}
                  />
                </div>
              </div>
              <div className="features__content">
                <h2 className="features__title gs_reveal">{project.title}</h2>
                <p className="features__description gs_reveal">
                  {project.description}
                </p>
                {project.link && project.link !== "#" ? (
                  <div className="features__link-container">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="features__link"
                    >
                      View Project
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        {/* <div className="spacer"></div> */}
      </div>
      <style jsx>{`
        /* Global styles for ScrollSmoother */
        .content {
          max-width: 1240px;
          margin: 0 auto;
          padding: 1rem;
          padding-top: 20vh;
        }

        .content__hero {
          height: 30vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content__heading {
          text-align: center;
          font-size: 3rem;
          margin: 0;
        }

        .features {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .features__item {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 2rem;
          min-height: 70vh;
          border-top: dashed 2px grey;
          padding: 2rem 0;
        }

        .features__item--left {
          flex-direction: row;
        }

        .features__item--right {
          flex-direction: row-reverse;
        }

        .features__image {
          flex: 1 1 30%;
          min-width: 300px;
          position: relative;
        }

        .features__card {
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 100%; /* Creates a square aspect ratio */
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .features__card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .features__img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .features__content {
          flex: 1 1 65%;
          min-width: 300px;
        }

        .features__title {
          font-size: 1.8em;
          margin-block-end: 1rem;
        }

        .features__description {
          line-height: 1.6;
          font-size: 1.2rem;
        }

        .features__link-container {
          margin-top: 1rem;
        }

        .features__link {
          display: inline-block;
          background-color: #2b6879;
          color: white;
          padding: 0.8rem 1.5rem;
          border-radius: 4px;
          text-decoration: none;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }

        .features__link:hover {
          background-color: #16353dff;
        }

        .gs_reveal {
          opacity: 0;
          visibility: hidden;
          will-change: transform, opacity;
        }

        .spacer {
          height: 50vh;
        }

        /* Mobile-first responsive adjustments */
        @media (max-width: 768px) {
          .content {
            padding-top: 15vh;
          }

          .content__hero {
            height: 20vh;
          }

          .content__heading {
            font-size: 2.2rem;
          }

          .features__item {
            flex-direction: column !important;
            text-align: center;
            min-height: auto;
            height: auto;
            gap: 1.5rem;
            padding: 1.5rem 0;
          }

          .features__image,
          .features__content {
            flex: 1 1 100%;
            min-width: 100%;
          }

          .features__card {
            padding-top: 75%; /* Slightly rectangular aspect ratio for mobile */
          }

          .features__title {
            font-size: 1.6rem;
          }

          .features__description {
            font-size: 1rem;
            text-align: left;
          }

          .features__link {
            padding: 0.7rem 1.2rem;
            font-size: 0.9rem;
          }
        }

        /* Extra small devices */
        @media (max-width: 480px) {
          .content__heading {
            font-size: 1.8rem;
          }

          .features__item {
            padding: 1rem 0;
            gap: 1rem;
          }

          .features__title {
            font-size: 1.4rem;
          }

          .features__description {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
}
