"use client";

import React, { useRef } from "react";
import ArrowDown from "../../assets/icons/arrow-down.svg";
import ReactMarkdown from "react-markdown";
import "./index.css";

const AccordionItem = ({ title, content, isOpen, onToggle, className }) => {
  const contentRef = useRef(null);
  const contentId = `accordion-content-${title?.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className={`accordion-item ${className}`}>
      <div
        className="accordion-header"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onToggle()}
      >
        <div className="font-20-regular color-black-1">{title}</div>
        <div className={`accordion-icon ${isOpen ? "open" : ""}`}>
          <ArrowDown stroke="#141313" aria-hidden="true" />
        </div>
      </div>
      <div
        id={contentId}
        ref={contentRef}
        className="accordion-content"
        role="region"
        aria-label={title}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
      >
        <div className="pt-[20px] font-16-light color-dark-1">
          {typeof content === "string" ? (
            <div className="markdown-content">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          ) : (
            content
          )}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
