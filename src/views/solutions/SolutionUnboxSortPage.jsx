"use client";

import React, { useEffect } from "react";
import "./index.css";
import SolutionUnboxHeroSection from "../../components/solutions/SolutionUnboxHeroSection";
import { motion } from "framer-motion";
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
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={animation.fadeInUpVariant}
          viewport={{ once: true, amount: 0.2 }}
          className="solutions-unbox-div-2"
        >
          <p className="font-20-light text-[#818382] text-center">
            Traditional sortation systems struggle with space limitations,
            high labor demands, slow processing, and sorting errors. UnboxSort
            addresses all these challenges with a vertical, AI-powered
            approach that increases efficiency and accuracy while using less
            floor space.
          </p>
        </motion.div>
        <div className="solutions-unbox-div-3">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={animation.fadeInUpVariant}
            viewport={{ once: true, amount: 0.2 }}
            className="div-3-header"
          >
            <p className="font-40-regular color-black-1 text-center">
              UnboxSort’s Superpowers
            </p>
            <p className="font-16-light text-[#818382] text-center">
              From sorting parcels to consolidating orders, UnboxSort adapts
              to every warehouse challenge. Discover the powerful ways our
              system can enhance your current supply chain.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={animation.fadeInUpVariant}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full"
          >
            <BiningUnboxSortSlider />
          </motion.div>
        </div>
        <div className="solutions-unbox-div-4">
          <TechAccordion data={workAreaData} />
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="solutions-unbox-div-6"
        >
          <MachineTabs />
        </motion.div>
      </div>
    </>
  );
};

export default SolutionUnboxSortPage;
