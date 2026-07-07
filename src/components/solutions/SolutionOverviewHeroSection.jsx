"use client";

import React from "react";
import "./index.css";
import { motion } from "framer-motion";
import { animation } from "../../helpers/utils";
import CommonButton from "../common/CommonButton";
import {
  solutionHeroImage,
  unboxProductSolutionImage,
} from "../../helpers/assets";
import { useRouter } from "next/navigation";
import ImageComponent from "../common/ImageComponent";

const unboxOverviewImage = process.env.PUBLIC_URL + "/images/unbox-overview.webp";

const MotionImageComponent = motion.create(ImageComponent);

const SolutionOverviewHeroSection = () => {
  const router = useRouter();
  return (
    <>
      <div className="solution-showcase-container">
        <motion.img
          src={unboxOverviewImage}
          alt="Unbox Robotics warehouse automation solutions overview"
          className="common-img"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          fetchPriority="high"
          draggable={false}
        />

        {/* Top-left headline panel */}
        <div className="solution-overview-headline-panel">
          <h1 className="res-font-40-extralight color-black-1">
            <motion.span
              style={{ display: "block" }}
              custom={0}
              initial="hidden"
              animate="visible"
              variants={animation.slideInFromLeft}
            >
              Enabling the Next Generation of
              <br />
              <span className="res-font-40-medium color-black-1">
                Logistics & Fulfillment Operations
              </span>
            </motion.span>
          </h1>
        </div>

        {/* <div className="bottom-row">
          <motion.div
            className="solution-productivity-panel"
            style={{ flex: 2 }}
            custom={4}
            initial="hidden"
            animate="visible"
            variants={animation.showcaseVariants}
          >
            <h3 className="res-font-18-regular color-black-1">
              Book a demo with Unbox Robotics
            </h3>
            <div className="self-end">
              <CommonButton
                title={"Book a Demo"}
                onClick={() => router.push("/get-in-touch")}
              />
            </div>
          </motion.div>
        </div> */}
      </div>

      <div className="mobile-showcase-container">
        <div className="mobile-headline-panel">
          <div className="flex flex-col gap-[16px] items-center">
            <h1 className="res-font-48-extralight color-black-1 text-center">
              <motion.span
                style={{ display: "block" }}
                custom={0}
                initial="hidden"
                animate="visible"
                variants={animation.showcaseVariants}
              >
                Enabling the Next Generation of
                <br />
                <span className="res-font-48-semibold color-black-1">
                  Logistics & Fulfillment Operations
                </span>
              </motion.span>
            </h1>
            <motion.p
              className="res-font-16-light color-grey-1 text-center"
              custom={2}
              initial="hidden"
              animate="visible"
              variants={animation.showcaseVariants}
            >
              As logistics networks become faster, denser, and more
              interconnected, parcel sortation has evolved from a backend
              operation into a strategic capability. UnboxSort enables modern
              fulfillment centres, sort hubs, and delivery networks to operate
              with speed, precision, and flexibility at scale.
            </motion.p>
          </div>
        </div>

        <motion.div
          className="flex-1 relative w-full h-full rounded-[20px] overflow-hidden"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={animation.showcaseVariants}
        >
          <ImageComponent
            src={unboxProductSolutionImage}
            alt="Unbox Robotics warehouse automation solutions overview"
            className="common-img"
          />
        </motion.div>

        <div className="mobile-bottom-tab">
          <motion.div
            className="mobile-solution-productivity-panel"
            custom={4}
            initial="hidden"
            animate="visible"
            variants={animation.showcaseVariants}
          >
            <h3 className="res-font-18-regular color-black-1">
              Book a demo with Unbox Robotics
            </h3>
            <div className="self-end">
              <CommonButton
                title={"Book a Demo"}
                onClick={() => router.push("/get-in-touch")}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SolutionOverviewHeroSection;
