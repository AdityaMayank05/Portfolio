import React, { useEffect, useRef } from "react";
import { gsap } from "../../utils/gsapAnimations";
import { initTextSplitReveal, scrollToSection } from "../../utils/gsapAnimations";

const FooterMain = () => {
  const footerRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      initTextSplitReveal(nameRef.current, { start: "top 90%" });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { label: "About", target: "about" },
    { label: "Skills", target: "skills" },
    { label: "Projects", target: "projects" },
    { label: "Contact", target: "contact" },
  ];

  return (
    <footer ref={footerRef} className="footer">
      <div className="container">
        <div ref={nameRef} className="footer-name">
          ADITYA MAYANK SINHA
        </div>

        <div className="footer-content">
          <ul className="footer-links">
            {navLinks.map((item) => (
              <li key={item.target}>
                <a
                  href={`#${item.target}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.target);
                  }}
                  className="footer-link"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="footer-copyright">
            © {new Date().getFullYear()} Aditya Mayank Sinha. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterMain;
