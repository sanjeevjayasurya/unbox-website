"use client";

import React from "react";
import "./index.css";
import ArrowIcon from "../../assets/icons/arrow-right.svg";

const CommonArrowButton = ({ title, onClick, theme }) => {
  return (
    <button
      className={`common-arrow-button ${
        theme === "white" ? "white-button" : "black-button"
      }`}
      onClick={onClick}
    >
      {title}
      <div className={`icon ${theme === "white" ? "bg-black-1" : "bg-white "}`}>
        <ArrowIcon stroke={theme === "white" ? "#FFFFFF" : "#141313"} />
      </div>
    </button>
  );
};

export default CommonArrowButton;
