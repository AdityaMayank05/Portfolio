import React, { useEffect, useRef } from "react";
import { gsap } from "../../utils/gsapAnimations";
import { initTextSplitReveal, initFadeUp } from "../../utils/gsapAnimations";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaPython,
} from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
} from "react-icons/si";

const skillCategories = [
  {
    title: "Frontend Development",
    tags: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit"],
  },
  {
    title: "Backend & Systems",
    tags: ["Node.js", "Express.js", "REST APIs", "Python", "Authentication"],
  },
  {
    title: "Database & Cloud",
    tags: ["MongoDB", "PostgreSQL", "Mongoose", "Vercel", "Git & GitHub"],
  },
  {
    title: "Interactive & UI Animation",
    tags: ["GSAP", "ScrollTrigger", "Micro-Interactions", "Responsive Design"],
  },
];

const marqueeSkills = [
  { name: "React", icon: FaReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Node.js", icon: FaNodeJs },
  { name: "Express", icon: SiExpress },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Redux", icon: SiRedux },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Python", icon: FaPython },
  { name: "HTML5", icon: FaHtml5 },
  { name: "CSS3", icon: FaCss3Alt },
];

const SkillsMain = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const rowsRef = useRef([]);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      initTextSplitReveal(headingRef.current);
      
      initFadeUp(rowsRef.current, {
        trigger: sectionRef.current,
        start: "top 75%",
        stagger: 0.12,
      });

      // Infinite Marquee animation
      if (marqueeRef.current) {
        const track = marqueeRef.current;
        const totalWidth = track.scrollWidth / 2;

        gsap.to(track, {
          x: `-${totalWidth}px`,
          ease: "none",
          duration: 25,
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section skills">
      <div className="container">
        <h2 ref={headingRef} style={{ marginBottom: "3rem" }}>
          Capabilities & Stack
        </h2>

        <div className="skills-list">
          {skillCategories.map((item, index) => (
            <div
              key={index}
              ref={(el) => (rowsRef.current[index] = el)}
              className="skill-row"
            >
              <div className="skill-name">{item.title}</div>
              <div className="skill-tags">
                {item.tags.map((tag, tIdx) => (
                  <span key={tIdx}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Skills Marquee */}
      <div className="marquee-wrapper">
        <div ref={marqueeRef} className="marquee-track">
          {/* Double list for smooth seamless loop */}
          {[...marqueeSkills, ...marqueeSkills].map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <div key={idx} className="marquee-item">
                <Icon className="icon" />
                <span>{skill.name}</span>
                <span style={{ opacity: 0.3, margin: "0 1rem" }}>✦</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsMain;
