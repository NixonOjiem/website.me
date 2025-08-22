"use client";
import React from "react";

export default function ProjectsComponent() {
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
      Link: "https://nixonojiem.github.io/video-chat/",
    },
    {
      title: "Nutrition Analysis App",
      description:
        "Nutrition analysis plays a crucial role in maintaining and improving overall health and well-being. By understanding the nutritional content of foods, individuals can make informed dietary choices that support their health goals, whether it’s managing weight, improving energy levels, or preventing chronic diseases.",
      imageUrl: "/images/Screenshot Nutritional Analysis.png",
      altText: "Nutrition Analysis App",
      Link: "https://nutritional-analysis-424f7.web.app/",
    },
    {
      title: "Image Compression App",
      description:
        "An image compression app efficiently reduces file sizes without compromising quality, making it ideal for web developers and photographers to optimize storage and improve website loading speeds. Perfect for enhancing user experience!",
      imageUrl: "/images/compresion.jpg",
      altText: "Image Compression App",
      Link: "https://nixonojiem.github.io/Image-compressor/",
    },
    {
      title: "AI text Detection APP",
      description:
        "The AI Detection App is a powerful tool designed to identify and analyze artificial intelligence-generated content. Leveraging advanced machine learning algorithms, this app can accurately detect AI-generated text.",
      imageUrl:
        "https://images.unsplash.com/photo-1511370235399-52211917f272?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWklMjBkZXRlY3Rpb24lMjBhcHB8ZW58MHx8MHx8fDA%3D",
      altText: "AI text Detection APP",
      Link: "https://nixonojiem.github.io/AI-detector/",
    },
    {
      title: "Movie info App",
      description:
        "The Movie and TV Show Search application is a user-friendly tool designed to help users quickly find information about their favorite films and series. By simply entering a title, the app fetches key details such as the IMDb score and the release year, providing a concise overview for users to make informed viewing choices.",
      imageUrl: "/images/AI detector.png",
      altText: "Movie info App",
    },
  ];

  return (
    <>
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
                    />
                  </div>
                </div>
                <div className="features__content">
                  <h2 className="features__title gs_reveal">{project.title}</h2>
                  <p className="features__description gs_reveal">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="spacer"></div>
        </div>
      </>
      <style jsx>{`
        /* Global styles for ScrollSmoother */

        .content {
          max-width: 1240px;
          margin: 0 auto;
          padding: 1rem;
          padding-top: 30vh;
        }

        .content__hero {
          height: 40vh;
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
          min-height: 100vh;
          border-top: dashed 2px grey;
          padding: 2rem 0;
        }

        .features__item--left {
          flex-direction: row;
          text-align: right;
        }

        .features__item--right {
          flex-direction: row-reverse;
        }

        .features__image {
          flex: 1 1 40%;
          position: relative;
        }

        .features__card {
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          aspect-ratio: 1 / 1;
        }

        .features__img {
          width: 100%;
          height: 100%;
          position: absolute;
          object-fit: cover;
          display: block;
        }

        .features__content {
          flex: 1 1 55%;
        }

        .features__title {
          font-size: 1.8em;
          margin-block-end: 1rem;
        }

        .features__description {
          line-height: 1.6;
          font-size: 1.2rem;
        }

        .gs_reveal {
          opacity: 0;
          visibility: hidden;
          will-change: transform, opacity;
        }

        .spacer {
          height: 100vh;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .features__item {
            flex-direction: column !important;
            text-align: center !important;
            min-height: auto;
            height: auto;
          }

          .features__image,
          .features__content {
            flex: 1 1 100%;
          }

          .content__heading {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
}
