import React, { useEffect, useRef } from "react";
import { gsap } from "../../utils/gsapAnimations";
import { initTextSplitReveal, initFadeUp, scrollToSection, initMagneticHover } from "../../utils/gsapAnimations";
import { LuArrowUpRight } from "react-icons/lu";

const AboutMeMain = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const slotRef = useRef(null);
  const textColsRef = useRef([]);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      initTextSplitReveal(headingRef.current, { start: "top 80%" });
      initFadeUp(textColsRef.current, {
        trigger: sectionRef.current,
        start: "top 75%",
        stagger: 0.2,
      });

      const cleanupMagnetic = initMagneticHover(btnRef.current, 0.3);
      return () => cleanupMagnetic();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section about">
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Heading & Intro */}
          <div className="about-text-col" ref={(el) => (textColsRef.current[0] = el)}>
            <h2 ref={headingRef} className="about-heading">
              Hey!
            </h2>
            <p>
              I'm <strong>Aditya Mayank Sinha</strong>, a full-stack engineer
              based in India with a deep passion for building scalable web apps,
              interactive architectures, and seamless digital experiences.
            </p>
          </div>

          {/* Center Column: Photo Landing Slot */}
          <div
            id="about-photo-slot"
            ref={slotRef}
            className="about-photo-slot"
          >
            <div className="about-slot-border" />
          </div>

          {/* Right Column: Bio & CTA */}
          <div className="about-text-col" ref={(el) => (textColsRef.current[1] = el)}>
            <p>
              Specializing in the MERN stack (MongoDB, Express.js, React, Node.js)
              alongside Next.js and TypeScript, I take pride in crafting clean,
              performant code with meticulous attention to detail and user
              interaction.
            </p>
            <p>
              When I'm not architecting systems, you'll find me exploring music,
              designing fluid UI micro-interactions, and experimenting with creative
              front-end concepts.
            </p>
            <div>
              <button
                ref={btnRef}
                onClick={() => scrollToSection("projects")}
                className="btn btn-primary"
              >
                Selected Works <LuArrowUpRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeMain;
