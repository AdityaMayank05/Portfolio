import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../utils/gsapAnimations";
import { initTextSplitReveal } from "../../utils/gsapAnimations";
import { LuArrowUpRight } from "react-icons/lu";

const projects = [
  {
    id: 1,
    title: "PDF Chats!",
    category: "Full Stack AI Platform",
    year: "2025",
    image: "/images/website-img-1.jpg",
    link: "https://pdf-chats-neon.vercel.app/",
    description: "Interactive conversational document intelligence built with modern React, embeddings, and real-time backend streaming.",
  },
  {
    id: 2,
    title: "Genetic Disease Predictor",
    category: "Machine Learning & Web App",
    year: "2025",
    image: "/images/website-img-2.webp",
    link: "https://github.com/AdityaMayank05",
    description: "High-accuracy diagnostic forecasting system utilizing genomic datasets and interactive analytics dashboards.",
  },
  {
    id: 3,
    title: "Financial AI Agent",
    category: "Fintech & Agentic AI",
    year: "2025",
    image: "/images/website-img-3.jpg",
    link: "https://finance-agent-tawny.vercel.app",
    description: "Automated wealth advisory and portfolio rebalancing assistant powered by LLM agents and market metrics.",
  },
  {
    id: 4,
    title: "Bank of Luck",
    category: "Full Stack Web Application",
    year: "2024",
    image: "/images/website-img-4.jpg",
    link: "https://github.com/AdityaMayank05",
    description: "Secure transactional banking simulator featuring authentication, ledger audits, and dynamic dashboard views.",
  },
];

const ProjectsMain = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      initTextSplitReveal(headingRef.current);

      // Check viewport width: Horizontal scroll on desktop
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop && trackRef.current) {
        const track = trackRef.current;
        const totalWidth = track.scrollWidth - window.innerWidth + 120;

        gsap.to(track, {
          x: () => -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${totalWidth * 1.2}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section projects-horizontal">
      <div className="container projects-header">
        <h2 ref={headingRef}>Selected Works</h2>
      </div>

      <div
        ref={trackRef}
        className="projects-track"
        style={{
          display: "flex",
          gap: "2.5rem",
          overflowX: window.innerWidth < 1024 ? "auto" : "visible",
          paddingBottom: "2rem",
        }}
      >
        {projects.map((project) => (
          <article
            key={project.id}
            className="project-card"
            data-cursor-text="View"
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              style={{ display: "block", textDecoration: "none", color: "inherit" }}
            >
              <div className="project-image-wrapper">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project-overlay" />
              </div>

              <div className="project-info">
                <div>
                  <h3 className="project-name">{project.title}</h3>
                  <p style={{ fontSize: "var(--text-sm)", marginTop: "0.25rem" }}>
                    {project.category}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span className="project-year">{project.year}</span>
                  <div style={{ marginTop: "0.5rem" }}>
                    <span className="project-link">
                      Live Demo <LuArrowUpRight />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProjectsMain;
