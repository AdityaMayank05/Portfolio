import React, { useEffect, useRef } from "react";
import { gsap } from "../../utils/gsapAnimations";
import { initTextSplitReveal } from "../../utils/gsapAnimations";
import { HiSparkles } from "react-icons/hi2";

const HeroMain = () => {
  const heroRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const photoContainerRef = useRef(null);
  const rollingImgRef = useRef(null);
  const star1Ref = useRef(null);
  const star2Ref = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text reveal for title lines
      initTextSplitReveal(title1Ref.current, { noScroll: true, delay: 0.2, duration: 1.2 });
      initTextSplitReveal(title2Ref.current, { noScroll: true, delay: 0.4, duration: 1.2 });

      // The travel animation is now handled by TravelingPhoto.jsx at the root level

      // 4. Parallax & floating stars
      if (star1Ref.current) {
        gsap.to(star1Ref.current, {
          y: -60,
          rotation: 60,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      if (star2Ref.current) {
        gsap.to(star2Ref.current, {
          y: -90,
          rotation: -90,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });
      }

      // 5. Bottom bar fade up
      if (bottomRef.current) {
        gsap.fromTo(
          bottomRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power2.out" }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="hero" style={{ overflow: "visible" }}>
      {/* Decorative Parallax Stars */}
      <div
        ref={star1Ref}
        className="hero-star animate-float"
        style={{ top: "22%", left: "8%" }}
      >
        <HiSparkles />
      </div>
      <div
        ref={star2Ref}
        className="hero-star animate-float-delayed"
        style={{ bottom: "28%", right: "10%" }}
      >
        <HiSparkles />
      </div>

      <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 10 }}>
        <h1 className="hero-title">
          <span ref={title1Ref} className="hero-title-line">
            FULL STACK
          </span>
          <span ref={title2Ref} className="hero-title-line">
            DEVELOPER
          </span>
        </h1>

        <div className="hero-photo-container">
          <div id="hero-photo-placeholder" className="hero-rolling-photo">
            {/* The traveling photo from App.jsx will position itself here */}
          </div>
        </div>
      </div>

      <div ref={bottomRef} className="hero-bottom">
        <div>© 2026 ADITYA MAYANK SINHA</div>
        <div>/ CRAFTING EXPERIENCES SINCE 2023</div>
      </div>
    </section>
  );
};

export default HeroMain;
