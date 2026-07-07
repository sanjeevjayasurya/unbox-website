"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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
    <motion.div
      className="tech-accordion-container"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="impact-image-container flex-1"
        variants={animation.fromLeftVariant}
      >
        <ImageComponent
          src={data[activeIndex]?.image}
          alt={data[activeIndex]?.title}
          className="common-img"
        />
      </motion.div>

      <div className="tech-accordion flex-1">
        {data?.map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={animation.itemFromRightVariant}
          >
            <div
              onClick={() => handleAccordionClick(index)}
              className={`tech-accordion-item cursor-pointer ${
                index === activeIndex ? "active" : ""
              }`}
            >
              <div className="impact-accordion-title">
                <h2 className="font-20-regular flex items-center ">
                  {item.title}
                </h2>
                {/* <div
                  className={`accordion-arrow-icon ${
                    index === activeIndex ? "open" : ""
                  }`}
                >
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
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TechAccordion;
