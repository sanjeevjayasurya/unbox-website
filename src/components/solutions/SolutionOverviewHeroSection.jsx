"use client";

import React from "react";
import "./index.css";
import CommonButton from "../common/CommonButton";
import {
  unboxOverviewImage,
  unboxProductSolutionImage,
} from "../../helpers/assets";
import { useRouter } from "next/navigation";
import ImageComponent from "../common/ImageComponent";

const SolutionOverviewHeroSection = () => {
  const router = useRouter();
  return (
    <>
      <div className="solution-showcase-container">
        <img
          src={unboxOverviewImage}
          alt="Unbox Robotics warehouse automation solutions overview"
          className="common-img"
          fetchPriority="high"
          draggable={false}
        />

        {/* Top-left headline panel */}
        <div className="solution-overview-headline-panel">
          <h1 className="res-font-40-extralight color-black-1">
            <span style={{ display: "block" }}>
              Enabling the Next Generation of
              <br />
              <span className="res-font-40-medium color-black-1">
                Logistics & Fulfillment Operations
              </span>
            </span>
          </h1>
        </div>

        {/* <div className="bottom-row">
          <div
            className="solution-productivity-panel"
            style={{ flex: 2 }}>
            <h3 className="res-font-18-regular color-black-1">
              Book a demo with Unbox Robotics
            </h3>
            <div className="self-end">
              <CommonButton
                title={"Book a Demo"}
                onClick={() => router.push("/get-in-touch")}
              />
            </div>
          </div>
        </div> */}
      </div>

      <div className="mobile-showcase-container">
        <div className="mobile-headline-panel">
          <div className="flex flex-col gap-[16px] items-center">
            <h1 className="res-font-48-extralight color-black-1 text-center">
              <span style={{ display: "block" }}>
                Enabling the Next Generation of
                <br />
                <span className="res-font-48-semibold color-black-1">
                  Logistics & Fulfillment Operations
                </span>
              </span>
            </h1>
            <p className="res-font-16-light color-grey-1 text-center">
              As logistics networks become faster, denser, and more
              interconnected, parcel sortation has evolved from a backend
              operation into a strategic capability. UnboxSort enables modern
              fulfillment centres, sort hubs, and delivery networks to operate
              with speed, precision, and flexibility at scale.
            </p>
          </div>
        </div>

        <div className="flex-1 relative w-full h-full rounded-[20px] overflow-hidden">
          <ImageComponent
            src={unboxProductSolutionImage}
            alt="Unbox Robotics warehouse automation solutions overview"
            className="common-img"
          />
        </div>

        <div className="mobile-bottom-tab">
          <div className="mobile-solution-productivity-panel">
            <h3 className="res-font-18-regular color-black-1">
              Book a demo with Unbox Robotics
            </h3>
            <div className="self-end">
              <CommonButton
                title={"Book a Demo"}
                onClick={() => router.push("/get-in-touch")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SolutionOverviewHeroSection;
