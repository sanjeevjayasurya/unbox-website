"use client";

import React, { useRef, useState } from "react";
import ArrowDown from "../../assets/icons/arrow-down.svg";
import "./index.css";

const AccordionItem = ({ title, content, isOpen, onToggle, className }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");
  const contentId = `tech-accordion-content-${title?.replace(/\s+/g, "-").toLowerCase()}`;

  React.useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [isOpen]);

  return (
    <div className="flex gap-5 max-lg:gap-4">
      <div className="tech-accordian-dot" />
      <div className="w-full">
        <div
          className="flex justify-between"
          onClick={onToggle}
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          aria-controls={contentId}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onToggle()}
        >
          <div className="font-20-regular color-white">{title}</div>
          {!!content && (
            <div
              className={`accordion-icon cursor-pointer ${
                isOpen ? "open" : ""
              }`}
            >
              <ArrowDown stroke="#818382" width={12} height={12} aria-hidden="true" />
            </div>
          )}
        </div>
        <div
          id={contentId}
          className="accordion-content"
          role="region"
          aria-label={title}
          style={{
            maxHeight: height,
            overflow: "hidden",
            transition: "max-height 0.3s ease",
          }}
        >
          <div ref={contentRef} className="pt-2 font-14-light color-white">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
