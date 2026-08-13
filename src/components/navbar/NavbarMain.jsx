import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import { scrollToSection, initMagneticHover } from "../../utils/gsapAnimations";
import { FiSun, FiMoon } from "react-icons/fi";
import { LuArrowUpRight } from "react-icons/lu";

const NavbarMain = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pillRef = useRef(null);
  const hireBtnRef = useRef(null);

  useEffect(() => {
    const cleanupMagnetic = initMagneticHover(hireBtnRef.current, 0.2);
    return () => cleanupMagnetic();
  }, []);

  const navLinks = [
    { label: "About", target: "about" },
    { label: "Skills", target: "skills" },
    { label: "Projects", target: "projects" },
    { label: "Contact", target: "contact" },
  ];

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollToSection(target);
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          <nav ref={pillRef} className="navbar-pill">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "hero")}
              className="navbar-logo"
            >
              Aditya Mayank
            </a>

            <div className="navbar-links">
              {navLinks.map((item) => (
                <a
                  key={item.target}
                  href={`#${item.target}`}
                  onClick={(e) => handleNavClick(e, item.target)}
                  className="navbar-link"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="navbar-actions">
              <button
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label="Toggle theme"
                title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "light" ? <FiMoon /> : <FiSun />}
              </button>

              <button
                ref={hireBtnRef}
                onClick={(e) => handleNavClick(e, "contact")}
                className="navbar-cta"
              >
                Hire Me <LuArrowUpRight style={{ display: "inline" }} />
              </button>

              <button
                className={`navbar-hamburger ${mobileMenuOpen ? "active" : ""}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        {navLinks.map((item) => (
          <a
            key={item.target}
            href={`#${item.target}`}
            onClick={(e) => handleNavClick(e, item.target)}
            className="mobile-menu-link"
            style={{ opacity: mobileMenuOpen ? 1 : 0, transform: mobileMenuOpen ? "translateY(0)" : "translateY(30px)", transition: "all 0.4s ease" }}
          >
            {item.label}
          </a>
        ))}
        <button
          onClick={(e) => handleNavClick(e, "contact")}
          className="btn btn-primary"
          style={{ marginTop: "2rem" }}
        >
          Hire Me
        </button>
      </div>
    </>
  );
};

export default NavbarMain;
