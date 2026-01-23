import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const TextReveal = React.forwardRef(
  (
    {
      text,
      className = "",
      tag = "p",
      delay = 0,
      stagger = 0.05,
      speed = 1.0,
      colorTo,
    },
    ref,
  ) => {
    const el = useRef(null);
    const splitRef = useRef(null);

    const GSAPSplitText = window.SplitText;

    useGSAP(
      () => {
        if (!el.current || !text || !GSAPSplitText) return;

        splitRef.current?.revert();

        splitRef.current = new GSAPSplitText(el.current, { type: "chars" });

        const chars = splitRef.current.chars || [];
        gsap.set(chars, {
          autoAlpha: 0,
          y: 10,
          color: colorTo ? "#FFFFFF" : null,
        });

        const tl = gsap.timeline({ delay: delay });

        tl.to(chars, {
          autoAlpha: 1,
          y: 0,
          duration: speed,
          ease: "power3.out",
          stagger: stagger,
          color: colorTo || null,
        });
      },
      { dependencies: [text, delay, stagger, speed, colorTo], scope: el },
    );

    const Tag = tag;
    return React.createElement(Tag, { ref: el, className: className }, text);
  },
);

export default TextReveal;
