"use client";

import React from "react";
import "./index.css";

const DEFAULT_TEXT =
  "Existing sorting methods cannot catchup with the growing demand and shrinking delivery windows. High-growth logistics needs automation that is fast, flexible and built to scale - exactly what our modular sortation delivers.";

const StickyScrollFill = ({ text = DEFAULT_TEXT, className = "" }) => {
  return (
    <section className={`scroll-container ${className}`}>
      <div className="sticky-element">
        <p className="font-40-regular text-center paragraph-container color-black-1">
          {text.split("\n").map((segment, index, segments) => (
            <React.Fragment key={index}>
              {segment}
              {index < segments.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      </div>
    </section>
  );
};

export default StickyScrollFill;
