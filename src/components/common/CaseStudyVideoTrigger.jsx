"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import PlayIcon from "../../assets/icons/playIcon.svg";
import CloseIcon from "../../assets/icons/close.svg";
import HLSVideoPlayer from "./HLSVideoPlayer";

const CaseStudyVideoTrigger = ({ src, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.classList.add("modal-open");
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className={`case-study-video-trigger ${className}`}
        onClick={() => setIsOpen(true)}
        aria-label="Play case study video">
        <video
          src={src}
          preload="metadata"
          muted
          playsInline
          className="case-study-video-trigger__thumb"
        />
        <span className="case-study-video-trigger__overlay">
          <PlayIcon className="case-study-video-trigger__play" />
        </span>
      </button>
      {createPortal(
        
          {isOpen && (
            <div
              className="case-study-video-popup"
              onClick={() => setIsOpen(false)}>
              <div
                className="case-study-video-popup__dialog"
                onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="case-study-video-popup__close"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close video">
                  <CloseIcon width={20} height={20} />
                </button>
                <HLSVideoPlayer
                  src={src}
                  className="case-study-video-popup__player"
                  autoPlay={true}
                  controls={true}
                />
              </div>
            </div>
          )}
        ,
        document.body
      )}
    </>
  );
};

export default CaseStudyVideoTrigger;
