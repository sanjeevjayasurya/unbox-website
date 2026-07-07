"use client";

import React from "react";
import "./index.css";
import ArrowNextIcon from "../../assets/icons/arrowNext.svg";
import ArrowPrevIcon from "../../assets/icons/arrowPrev.svg";
const icons = {
  "up-right": <ArrowPrevIcon aria-hidden="true" />,
  "down-left": <ArrowNextIcon aria-hidden="true" />,
};

const AnimatedArrowButton = ({
  onClick,
  direction = "up-right",
  ariaLabel = "action button",
}) => {
  return (
    <button
      className={`animated-button ${direction}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icons[direction]}
      {icons[direction]}
    </button>
  );
};

export default AnimatedArrowButton;
