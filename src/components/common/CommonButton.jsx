"use client";

import React from "react";
import "./index.css";

const CommonButton = ({ title, onClick, theme, disabled, type = "button" }) => {
  return (
    <button
      type={type}
      className={`common-button ${disabled ? "!cursor-not-allowed" : "!cursor-pointer"} ${
        theme === "white"
          ? "white-button"
          : theme === "green"
            ? "green-button"
            : theme === "gray"
              ? "gray-button"
              : "black-button"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default CommonButton;
