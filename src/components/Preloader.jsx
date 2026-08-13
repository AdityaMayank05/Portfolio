import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const textRef = useRef(null);
  const barFillRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counterObj = { value: 0 };
      
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(preloaderRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: "power4.inOut",
            onComplete: () => {
              if (onComplete) onComplete();
            },
          });
        },
      });

      // Animate percentage counter & progress bar
      tl.to(counterObj, {
        value: 100,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => {
          const val = Math.floor(counterObj.value);
          setCount(val);
          if (barFillRef.current) {
            barFillRef.current.style.width = `${val}%`;
          }
        },
      });

      // Text reveal
      tl.fromTo(
        textRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.2
      );
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      <div ref={textRef} className="preloader-text">
        AMS
      </div>
      <div className="preloader-counter">{count}%</div>
      <div className="preloader-bar">
        <div ref={barFillRef} className="preloader-bar-fill" />
      </div>
    </div>
  );
};

export default Preloader;
