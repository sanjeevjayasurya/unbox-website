"use client";

import React, { useEffect } from "react";
import "./index.css";
import SolutionUnboxHeroSection from "../../components/solutions/SolutionUnboxHeroSection";
import { animation } from "../../helpers/utils";
import { workAreaData } from "./config";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import TechAccordion from "../../components/technology/TechAccordion";
import BiningUnboxSortSlider from "../../components/solutions/BiningUnboxSortSlider";
import MachineTabs from "../../components/solutions/MachineTabs";
import { unboxSortSchema } from "../../helpers/schemas";

const SolutionUnboxSortPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HelmetWrapper
        title="UnboxSort"
        description="Enabling the Next Generation of Logistics & Fulfillment Operations"
      />
            <SchemaMarkup schema={unboxSortSchema} />
<div className="home-page-ware-house-container">
        <SolutionUnboxHeroSection />
      </div>
      <div className="bg-[#FDFDFD]">
        <div
          className="solutions-unbox-div-2">
          <p className="font-20-light text-[#818382] text-center">
            Traditional sortation systems struggle with space limitations,
            high labor demands, slow processing, and sorting errors. UnboxSort
            addresses all these challenges with a vertical, AI-powered
            approach that increases efficiency and accuracy while using less
            floor space.
          </p>
        </div>
        <div className="solutions-unbox-div-3">
          <div
            className="div-3-header">
            <p className="font-40-regular color-black-1 text-center">
              UnboxSort’s Superpowers
            </p>
            <p className="font-16-light text-[#818382] text-center">
              From sorting parcels to consolidating orders, UnboxSort adapts
              to every warehouse challenge. Discover the powerful ways our
              system can enhance your current supply chain.
            </p>
          </div>
          <div
            className="w-full">
            <BiningUnboxSortSlider />
          </div>
        </div>
        <div className="solutions-unbox-div-4">
          <TechAccordion data={workAreaData} />
        </div>
        <div
          className="solutions-unbox-div-6">
          <MachineTabs />
        </div>
      </div>
    </>
  );
};

export default SolutionUnboxSortPage;
