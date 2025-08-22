"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function ProjectsComponent() {
  const main = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const ctx = gsap.context(() => {
      // Create ScrollSmoother instance
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper", // Explicitly define the wrapper
        content: "#smooth-content", // Explicitly define the content
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
      });

      // Animation functions
      const animateFrom = (elem: HTMLElement, direction?: number) => {
        direction = direction || 1;
        let x = 0,
          y = direction * 100;

        if (elem.classList.contains("gs_reveal_fromLeft")) {
          x = -100;
          y = 0;
        } else if (elem.classList.contains("gs_reveal_fromRight")) {
          x = 100;
          y = 0;
        }

        elem.style.transform = `translate(${x}px, ${y}px)`;
        elem.style.opacity = "0";

        gsap.fromTo(
          elem,
          { x, y, autoAlpha: 0 },
          {
            duration: 1.25,
            x: 0,
            y: 0,
            autoAlpha: 1,
            ease: "expo",
            overwrite: "auto",
          }
        );
      };

      const hide = (elem: HTMLElement) => {
        gsap.set(elem, { autoAlpha: 0 });
      };

      // Use a small delay to ensure DOM is fully rendered
      setTimeout(() => {
        const elements = gsap.utils.toArray(".gs_reveal");

        elements.forEach((elem) => {
          hide(elem as HTMLElement);

          ScrollTrigger.create({
            trigger: elem as HTMLElement,
            onEnter: () => animateFrom(elem as HTMLElement),
            onEnterBack: () => animateFrom(elem as HTMLElement, -1),
            onLeave: () => hide(elem as HTMLElement),
            // Mark for refresh to ensure proper detection
            markers: false, // Set to true for debugging
          });
        });

        // Refresh ScrollTrigger after all elements are set up
        ScrollTrigger.refresh();

        // Also refresh the smoother
        if (smoother) {
          smoother.refresh();
        }
      }, 100);
    }, main);

    return () => ctx.revert();
  }, [isMounted]);

  return (
    <div id="smooth-wrapper" ref={main}>
      <div id="smooth-content">
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

          <style jsx>{`
            /* Global styles for ScrollSmoother */
            #smooth-wrapper {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
            }

            #smooth-content {
              overflow: visible;
              width: 100%;
            }

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
        </div>
      </div>
    </div>
  );
}
