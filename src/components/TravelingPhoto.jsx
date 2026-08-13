import React, { useEffect, useRef } from "react";
import { gsap } from "../utils/gsapAnimations";

const TravelingPhoto = () => {
  const photoWrapperRef = useRef(null);

  useEffect(() => {
    let ctx;
    let st;
    let checkInterval;

    const initAnimation = () => {
      const heroPlaceholder = document.getElementById("hero-photo-placeholder");
      const aboutPlaceholder = document.getElementById("about-photo-slot");
      const photoWrapper = photoWrapperRef.current;

      if (!heroPlaceholder || !aboutPlaceholder || !photoWrapper) {
        return false; // not ready
      }

      ctx = gsap.context(() => {
        // Initial placement
        const setInitialPosition = () => {
          const heroRect = heroPlaceholder.getBoundingClientRect();
          gsap.set(photoWrapper, {
            top: heroRect.top + window.scrollY,
            left: heroRect.left + window.scrollX,
            width: heroRect.width,
            height: heroRect.height,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            rotateY: 0
          });
        };

        setInitialPosition();

      // We use a slight delay for the entrance animation to match the previous hero entrance
      gsap.fromTo(
        photoWrapper,
        { scale: 0.6, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.5 }
      );

      // Create the scroll animation
      const createScrollTrigger = () => {
        // Calculate the difference in position and size
        const heroRect = heroPlaceholder.getBoundingClientRect();
        const aboutRect = aboutPlaceholder.getBoundingClientRect();

        const deltaX = aboutRect.left - heroRect.left;
        const deltaY = aboutRect.top - heroRect.top;
        const scaleX = aboutRect.width / heroRect.width;
        // Assuming aspect ratio is the same, scaleX === scaleY
        
        return gsap.to(photoWrapper, {
          x: deltaX,
          y: deltaY,
          scale: scaleX,
          rotation: 360,
          rotateY: 360,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            endTrigger: "#about",
            end: "center center",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });
      };

      st = createScrollTrigger();

      // Handle resize
      const onResize = () => {
        if (st) st.kill();
        setInitialPosition();
        st = createScrollTrigger();
      };

      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);

    });
    
    return true; // Successfully initialized
  }; // end initAnimation

  // Poll until elements are mounted
  if (!initAnimation()) {
    checkInterval = setInterval(() => {
      if (initAnimation()) {
        clearInterval(checkInterval);
      }
    }, 100);
  }

  return () => {
    if (checkInterval) clearInterval(checkInterval);
    if (ctx) ctx.revert();
  };
}, []);

  return (
    <div
      ref={photoWrapperRef}
      style={{
        position: "absolute",
        zIndex: 50,
        pointerEvents: "none", // Let clicks pass through if needed, though maybe we want hover
        transformOrigin: "center center",
        transformStyle: "preserve-3d",
      }}
    >
      <img
        src="/images/HexaPic.png"
        alt="Aditya Mayank Sinha"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          filter: "drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2))",
        }}
      />
    </div>
  );
};

export default TravelingPhoto;
