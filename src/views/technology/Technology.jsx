"use client";

import React, { useEffect } from "react";
import "./index.css";
import { animation } from "../../helpers/utils";
import { motion } from "framer-motion";
import { techAccordionData, techHelp } from "./config";
import TechAccordion from "../../components/technology/TechAccordion";
import BiningSlider from "../../components/technology/BiningSlider";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import TechnologyVideo from "../../assets/video/technology.mp4";
import { technologySchema } from "../../helpers/schemas";

const technologyPoster =
  process.env.PUBLIC_URL + "/images/technology-poster.webp";

const Technology = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HelmetWrapper
        title="Technology"
        description="Unbox Robotics is built on a focused set of core technologies"
      />

      <SchemaMarkup schema={technologySchema} />
      {/* header */}
      <div className="bg-[#FDFDFD]">
        <motion.div
          className="technology-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col gap-[14px] md:gap-[20px] max-w-[800px]">
            <motion.h1
              className="font-40-regular color-black-1 text-center"
              custom={0}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              Our Core Technology
            </motion.h1>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              Unbox Robotics is built on a focused set of core technologies.
              Vertical robotic sortation, swarm-enabled fleet coordination, and
              tightly integrated hardware-software systems, designed to maximise
              throughput, accuracy, and space efficiency in real warehouse
              environments.
            </motion.p>
          </div>
          <motion.div
            className="git-container max-w-[843px]"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <video
              src={TechnologyVideo}
              poster={technologyPoster}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              draggable={false}
              className="common-img"
              fetchPriority="high"
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="bg-[#FDFDFD]">
        <motion.div
          className="technology-section-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h1
            className="font-40-regular color-black-1 text-center"
            custom={0}
            variants={animation.fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            Core Technology Pillars
          </motion.h1>

          <div className="tech-help-container">
            {techHelp?.map((item, index) => {
              return (
                <motion.div
                  className="flex-1 tech-help-item"
                  key={index}
                  custom={index}
                  variants={animation.linkVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {item?.icon}
                  <div className="flex flex-col gap-[12px]">
                    <h3 className="font-20-medium color-black-1">
                      {item?.title}
                    </h3>
                    <p className="font-16-light color-black-1">
                      {item?.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="bg-[#FDFDFD]">
        <motion.div
          className="technology-section-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col gap-[14px] md:gap-[20px] max-w-[800px]">
            <motion.h1
              className="font-40-regular color-black-1 text-center"
              custom={0}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              Automation Beyond the Robot
            </motion.h1>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              To deliver reliable, end-to-end sortation performance, Unbox
              integrates a set of tightly coupled peripheral systems that
              automate induction, measurement, safety, and output handling.
            </motion.p>
          </div>
          <motion.div
            className="technology-section-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="flex-1 technology-section-3-right"
              variants={animation.fromRightVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="space-y-5">
                <h2 className="font-40-regular color-white">
                  Multi-Level Binning Systems
                </h2>
                <p className="font-16-light color-white">
                  Based on customer application and workflow, Unbox supports
                  multiple binning and shelving configurations:
                </p>
              </div>
              <div className="w-full">
                <BiningSlider />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="bg-[#FDFDFD]">
        <motion.div
          className="technology-section-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col gap-[14px] md:gap-[20px] ">
            <motion.h1
              className="font-40-regular color-black-1 text-center"
              custom={0}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              Built for Accuracy, Uptime, and Safe Operations
            </motion.h1>
            <motion.p
              className="font-16-light color-grey-1 text-center max-w-[900px] mx-auto"
              custom={1}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              Unbox integrates measurement, charging, and safety systems
              directly into the robotic workflow to eliminate manual
              intervention and ensure consistent operations.
            </motion.p>
          </div>
          <TechAccordion data={techAccordionData} />
        </motion.div>
      </div>
    </>
  );
};

export default Technology;
