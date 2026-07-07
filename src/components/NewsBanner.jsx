"use client";

import React from "react";
import Close from "../assets/icons/Close_SM.svg";

const NewsBanner = ({ onClose }) => {
  return (
    <a
      href="https://economictimes.indiatimes.com/tech/funding/warehouse-automation-startup-unbox-robotics-raises-28-million-led-by-icici-venture/articleshow/126697091.cms"
      target="_blank"
      rel="noreferrer"
      className="news-banner-link"
    >
      <div className="bg-[var(--green-2)] p-4 max-sm:p-3">
        <div className="News-Banner-Div">
          <p className="font-16-regular color-white">
            <span>
              {/* UNBOX ROBOTICS RAISES SERIES B FUNDING. */}
              Unbox Robotics Raises Series B Funding.
            </span>{" "}
            <span className="underline font-semibold cursor-pointer">
              Read The Story
            </span>
          </p>
        </div>

        {/* <button onClick={onClose} className="cursor-pointer">
        <Close stroke="white" />
      </button> */}
      </div>
    </a>
  );
};

export default NewsBanner;
