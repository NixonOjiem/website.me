"use client";
import React from "react";

export default function ProjectsComponent() {
  return (
    <>
      <>
        <div className="content">
          <div className="content__hero">
            <h1 className="content__heading gs_reveal">My projects</h1>
          </div>

          <div className="features">
            <div className="features__item features__item--left gs_reveal gs_reveal_fromLeft">
              <div className="features__image">
                <div className="features__card">
                  <img
                    className="features__img"
                    src="https://assets.codepen.io/16327/portrait-image-14.jpg"
                    alt="Highway Vinyl Nights"
                  />
                </div>
              </div>
              <div className="features__content">
                <h2 className="features__title gs_reveal">
                  Highway Vinyl Nights
                </h2>
                <p className="features__description gs_reveal">
                  The headlights hum along the painted lines
                  <br />
                  We twist the dial till static turns to choir
                  <br />
                  Your hand keeps time on the wheel and the night leans in
                  <br />
                  Every mile is a chorus we have not written yet
                </p>
              </div>
            </div>

            <div className="features__item features__item--right gs_reveal gs_reveal_fromRight">
              <div className="features__image">
                <div className="features__card">
                  <img
                    className="features__img"
                    src="https://assets.codepen.io/16327/portrait-image-4.jpg"
                    alt="Last Diner on Route 9"
                  />
                </div>
              </div>
              <div className="features__content">
                <h2 className="features__title gs_reveal">
                  Last Diner on Route 9
                </h2>
                <p className="features__description gs_reveal">
                  The coffee tastes like rainwater and luck
                  <br />
                  Neon flickers slow while the jukebox spins a waltz
                  <br />
                  We carve our names in steam on the window glass
                  <br />
                  Stay till sunrise and the road will wait its turn
                </p>
              </div>
            </div>

            <div className="features__item features__item--left gs_reveal gs_reveal_fromLeft">
              <div className="features__image">
                <div className="features__card">
                  <img
                    className="features__img"
                    src="https://assets.codepen.io/16327/portrait-image-3.jpg"
                    alt="Stardust Ballroom"
                  />
                </div>
              </div>
              <div className="features__content">
                <h2 className="features__title gs_reveal">Stardust Ballroom</h2>
                <p className="features__description gs_reveal">
                  Mirror tiles catch every hopeful face
                  <br />
                  Records spin thin silver threads through the dark
                  <br />
                  We move like planets pulled by quiet drums
                  <br />
                  Hold the beat and the night will never close
                </p>
              </div>
            </div>

            <div className="features__item features__item--right gs_reveal gs_reveal_fromRight">
              <div className="features__image">
                <div className="features__card">
                  <img
                    className="features__img"
                    src="https://assets.codepen.io/16327/portrait-image-1.jpg"
                    alt="Sky Without Borders"
                  />
                </div>
              </div>
              <div className="features__content">
                <h2 className="features__title gs_reveal">
                  Sky Without Borders
                </h2>
                <p className="features__description gs_reveal">
                  Lay your worries down beneath the porchlight glow
                  <br />
                  The crickets stitch soft rhythm in the grass
                  <br />
                  We trade small dreams and make them loud together
                  <br />A sky without borders is waiting past the trees
                </p>
              </div>
            </div>
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
