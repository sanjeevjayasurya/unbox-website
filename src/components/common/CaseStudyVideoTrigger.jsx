"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
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
        aria-label="Play case study video"
      >
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
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="case-study-video-popup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                className="case-study-video-popup__dialog"
                initial={{ opacity: 0, scale: 0.88, y: 32 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 24 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="case-study-video-popup__close"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close video"
                >
                  <CloseIcon width={20} height={20} />
                </button>
                <HLSVideoPlayer
                  src={src}
                  className="case-study-video-popup__player"
                  autoPlay={true}
                  controls={true}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default CaseStudyVideoTrigger;
