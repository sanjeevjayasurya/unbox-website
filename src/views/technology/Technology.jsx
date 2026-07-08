"use client";

import React, { useEffect } from "react";
import "./index.css";
import { animation } from "../../helpers/utils";
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
        <div
          className="technology-header">
          <div className="flex flex-col gap-[14px] md:gap-[20px] max-w-[800px]">
            <h1
              className="font-40-regular color-black-1 text-center">
              Our Core Technology
            </h1>
            <p
              className="font-16-light color-grey-1 text-center">
              Unbox Robotics is built on a focused set of core technologies.
              Vertical robotic sortation, swarm-enabled fleet coordination, and
              tightly integrated hardware-software systems, designed to maximise
              throughput, accuracy, and space efficiency in real warehouse
              environments.
            </p>
          </div>
          <div
            className="git-container max-w-[843px]">
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
          </div>
        </div>
      </div>

      <div className="bg-[#FDFDFD]">
        <div
          className="technology-section-2">
          <h1
            className="font-40-regular color-black-1 text-center">
            Core Technology Pillars
          </h1>

          <div className="tech-help-container">
            {techHelp?.map((item, index) => {
              return (
                <div
                  className="flex-1 tech-help-item"
                  key={index}>
                  {item?.icon}
                  <div className="flex flex-col gap-[12px]">
                    <h3 className="font-20-medium color-black-1">
                      {item?.title}
                    </h3>
                    <p className="font-16-light color-black-1">
                      {item?.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-[#FDFDFD]">
        <div
          className="technology-section-4">
          <div className="flex flex-col gap-[14px] md:gap-[20px] max-w-[800px]">
            <h1
              className="font-40-regular color-black-1 text-center">
              Automation Beyond the Robot
            </h1>
            <p
              className="font-16-light color-grey-1 text-center">
              To deliver reliable, end-to-end sortation performance, Unbox
              integrates a set of tightly coupled peripheral systems that
              automate induction, measurement, safety, and output handling.
            </p>
          </div>
          <div
            className="technology-section-3">
            <div
              className="flex-1 technology-section-3-right">
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
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#FDFDFD]">
        <div
          className="technology-section-4">
          <div className="flex flex-col gap-[14px] md:gap-[20px] ">
            <h1
              className="font-40-regular color-black-1 text-center">
              Built for Accuracy, Uptime, and Safe Operations
            </h1>
            <p
              className="font-16-light color-grey-1 text-center max-w-[900px] mx-auto">
              Unbox integrates measurement, charging, and safety systems
              directly into the robotic workflow to eliminate manual
              intervention and ensure consistent operations.
            </p>
          </div>
          <TechAccordion data={techAccordionData} />
        </div>
      </div>
    </>
  );
};

export default Technology;
