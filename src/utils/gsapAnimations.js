import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export { gsap, ScrollTrigger };

/**
 * Text Split Reveal Helper
 * Wraps words/characters in spans and animates them coming up from below
 */
export const initTextSplitReveal = (element, options = {}) => {
  if (!element) return;
  const text = element.innerText;
  element.innerHTML = "";
  
  const words = text.split(" ");
  words.forEach((word, wIdx) => {
    const wordSpan = document.createElement("span");
    wordSpan.style.display = "inline-block";
    wordSpan.style.overflow = "hidden";
    wordSpan.style.verticalAlign = "top";
    wordSpan.style.marginRight = "0.25em";

    const innerSpan = document.createElement("span");
    innerSpan.style.display = "inline-block";
    innerSpan.innerText = word;
    innerSpan.classList.add("split-text-target");
    
    wordSpan.appendChild(innerSpan);
    element.appendChild(wordSpan);
  });

  const targets = element.querySelectorAll(".split-text-target");
  return gsap.fromTo(
    targets,
    { y: "110%", opacity: 0, rotateZ: options.rotate ? 5 : 0 },
    {
      y: "0%",
      opacity: 1,
      rotateZ: 0,
      duration: options.duration || 1.1,
      ease: "power4.out",
      stagger: options.stagger || 0.04,
      scrollTrigger: options.noScroll
        ? null
        : {
            trigger: element,
            start: options.start || "top 85%",
            toggleActions: "play none none none",
          },
      delay: options.delay || 0,
    }
  );
};

/**
 * Fade Up Elements on Scroll
 */
export const initFadeUp = (elements, options = {}) => {
  if (!elements || (Array.isArray(elements) && elements.length === 0)) return;
  
  return gsap.fromTo(
    elements,
    { y: options.y || 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: options.duration || 1,
      ease: "power3.out",
      stagger: options.stagger || 0.15,
      scrollTrigger: {
        trigger: options.trigger || elements,
        start: options.start || "top 85%",
        toggleActions: "play none none none",
      },
      delay: options.delay || 0,
    }
  );
};

/**
 * Image Reveal via Clip Path
 */
export const initImageReveal = (element, options = {}) => {
  if (!element) return;
  
  return gsap.fromTo(
    element,
    { clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      scale: 1,
      duration: options.duration || 1.4,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: element,
        start: options.start || "top 80%",
        toggleActions: "play none none none",
      },
    }
  );
};

/**
 * Magnetic button hover effect
 */
export const initMagneticHover = (element, strength = 0.35) => {
  if (!element) return () => {};

  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;

    gsap.to(element, {
      x,
      y,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1.2, 0.4)",
    });
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
};

/**
 * Smooth Scroll to section
 */
export const scrollToSection = (targetId, offset = -70) => {
  const target = document.getElementById(targetId);
  if (!target) return;
  
  gsap.to(window, {
    duration: 1.2,
    scrollTo: { y: target, offsetY: Math.abs(offset) },
    ease: "power3.inOut",
  });
};
