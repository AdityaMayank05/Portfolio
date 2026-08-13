import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Quick setters for smooth performance
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

    const followXTo = gsap.quickTo(follower, "x", {
      duration: 0.4,
      ease: "power3",
    });
    const followYTo = gsap.quickTo(follower, "y", {
      duration: 0.4,
      ease: "power3",
    });

    const onMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      followXTo(e.clientX);
      followYTo(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest(
        "a, button, input, textarea, .project-card, [data-cursor]"
      );
      if (target) {
        setIsHovered(true);
        const text = target.getAttribute("data-cursor-text");
        if (text) {
          setCursorText(text);
        } else {
          setCursorText("");
        }
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovered ? "hovered" : ""}`}
      >
        <span className="custom-cursor-text">{cursorText}</span>
      </div>
      <div
        ref={followerRef}
        className={`custom-cursor-follower ${isHovered ? "hovered" : ""}`}
      />
    </>
  );
};

export default CustomCursor;
