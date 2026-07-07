"use client";

import React, { useState, useLayoutEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./index.css";
import { animation } from "../../helpers/utils";

const AnimatedLine = ({ line, scrollYProgress, range }) => {
  const backgroundPosition = useTransform(scrollYProgress, range, [
    "100% 0%",
    "0% 0%",
  ]);

  return (
    <span className="line-wrapper">
      <motion.span className="animated-line" style={{ backgroundPosition }}>
        {line}
      </motion.span>
    </span>
  );
};

const DEFAULT_TEXT =
  "Existing sorting methods cannot catchup with the growing demand and shrinking delivery windows. High-growth logistics needs automation that is fast, flexible and built to scale - exactly what our modular sortation delivers.";

const StickyScrollFill = ({ text = DEFAULT_TEXT, className = "" }) => {
  const targetRef = useRef(null);
  const paragraphRef = useRef(null);
  const [lines, setLines] = useState([]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end center"],
  });

  const paragraphText = text;

  useLayoutEffect(() => {
    const measureAndSetLines = () => {
      if (!paragraphRef.current) return;

      const paragraphContainer = paragraphRef.current.parentElement;
      const containerMaxWidth = 1251; // Your max-width

      // Temporarily set the width of the measurement container to ensure consistent wrapping
      paragraphContainer.style.width = "100%";
      paragraphContainer.style.maxWidth = `${containerMaxWidth}px`;

      const segments = paragraphText.split("\n");
      paragraphRef.current.innerHTML = segments
        .map((segment, segIndex) => {
          const words = segment.trim().split(/\s+/).filter(Boolean);
          const wordSpans = words
            .map((word) => `<span>${word} </span>`)
            .join("");
          const breakSpan =
            segIndex < segments.length - 1
              ? `<span style="display:block;width:100%;height:0"></span>`
              : "";
          return wordSpans + breakSpan;
        })
        .join("");

      const spans = Array.from(paragraphRef.current.children);
      const linesMap = new Map();

      spans.forEach((span) => {
        const top = span.offsetTop;
        if (!linesMap.has(top)) {
          linesMap.set(top, "");
        }
        linesMap.set(top, linesMap.get(top) + span.textContent);
      });

      setLines(
        Array.from(linesMap.values()).filter((l) => l.trim().length > 0)
      );
      paragraphRef.current.innerHTML = "";
    };

    // Wait for fonts to be loaded before measuring
    document.fonts.ready.then(() => {
      measureAndSetLines();
    });

    window.addEventListener("resize", measureAndSetLines);
    return () => window.removeEventListener("resize", measureAndSetLines);
  }, [paragraphText]);

  return (
    <motion.section
      ref={targetRef}
      className={`scroll-container ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="sticky-element">
        <motion.p
          className="font-40-regular text-center paragraph-container"
          custom={0}
          variants={animation.fadeInUpVariant}
        >
          <span ref={paragraphRef} className="measurement-span"></span>

          {lines.map((line, index) => {
            const totalLines = lines.length;
            const start = index / totalLines;
            const end = (index + 1) / totalLines;

            return (
              <AnimatedLine
                key={index}
                line={line}
                scrollYProgress={scrollYProgress}
                range={[start, end]}
              />
            );
          })}
        </motion.p>
      </div>
    </motion.section>
  );
};

export default StickyScrollFill;
