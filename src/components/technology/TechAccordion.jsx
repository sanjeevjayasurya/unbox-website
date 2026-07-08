"use client";

import React, { useState } from "react";
import "./index.css";
import ArrowDown from "../../assets/icons/arrow-down.svg";
import { animation } from "../../helpers/utils";
import ImageComponent from "../common/ImageComponent";

const TechAccordion = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAccordionClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div
      className="tech-accordion-container">
      <div
        className="impact-image-container flex-1">
        <ImageComponent
          src={data[activeIndex]?.image}
          alt={data[activeIndex]?.title}
          className="common-img"
        />
      </div>

      <div className="tech-accordion flex-1">
        {data?.map((item, index) => (
          <div
            key={index}>
            <div
              onClick={() => handleAccordionClick(index)}
              className={`tech-accordion-item cursor-pointer ${
                index === activeIndex ? "active" : ""
              }`}>
              <div className="impact-accordion-title">
                <h2 className="font-20-regular flex items-center ">
                  {item.title}
                </h2>
                {/* <div
                  className={`accordion-arrow-icon ${
                    index === activeIndex ? "open" : ""
                  }`}>
                  <ArrowDown
                    width={26}
                    height={26}
                    stroke={index === activeIndex ? "#F3F3F3" : "#141313"}
                  />
                </div> */}
              </div>
              <div className="impact-accordion-content">
                <p className="font-16-light text-[#FFFFFF]">{item.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechAccordion;
