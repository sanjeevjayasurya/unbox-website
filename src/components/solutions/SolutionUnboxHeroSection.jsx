"use client";

import React from "react";
import "./index.css";
import { animation } from "../../helpers/utils";
import CommonButton from "../common/CommonButton";
import {
  solutionHeroImage,
  solutioUnboxnHeroImage,
  thirdPartyImage,
} from "../../helpers/assets";
import { useRouter } from "next/navigation";
import ImageComponent from "../common/ImageComponent";

const unboxSortHeroImage = process.env.PUBLIC_URL + "/images/3pl.webp";

const SolutionUnboxHeroSection = () => {
  const router = useRouter();
  return (
    <>
      <div className="showcase-container-2 relative">
        <img
          src={unboxSortHeroImage}
          alt="UnboxSort robotic sortation system in a warehouse"
          draggable={false}
          className="common-img"
          fetchPriority="high"
        />
        <div className="absolute inset-0 z-1 flex items-end justify-start bg-[#00000066]">
          <p
            className="font-40-medium text-wrap color-white ml-[40px] mb-[40px] mr-[280px] w-full max-w-[calc(100%-400px)] ">
            UnboxSort: A smart, compact and ingeniously designed sortation
            robot.
          </p>
        </div>
        <div className="bottom-row-unbox z-2">
          <div
            className="solution-productivity-panel-2"
            style={{ flex: 2 }}>
            <h3 className="res-font-18-regular color-black-1">
              Book a demo to see this in motion
            </h3>
            <div className="self-end">
              <CommonButton
                theme={"green"}
                title={"Get in Touch"}
                onClick={() => router.push("/get-in-touch")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-showcase-container">
        <div className="mobile-headline-panel">
          <div className="flex flex-col gap-[16px] items-center"></div>
        </div>

        <div className="flex-1 relative w-full h-full rounded-[20px] overflow-hidden bg-red">
          <ImageComponent
            src={thirdPartyImage}
            alt="UnboxSort robotic sortation system in a warehouse"
            className="common-img"
          />
          <div className="absolute inset-0 flex items-end justify-start bg-[rgba(0,0,0,0.5)]">
            <p
              className="font-40-medium color-white p-[10px] w-full">
              UnboxSort: A smart, compact and ingeniously designed sortation
              robot.
            </p>
          </div>
        </div>

        <div className="mobile-bottom-tab">
          <div
            className="mobile-solution-productivity-panel">
            <h3 className="res-font-18-regular color-black-1">
              Book a demo to see this in motion
            </h3>
            <div className="self-end">
              <CommonButton
                theme={"green"}
                title={"Get in Touch"}
                onClick={() => router.push("/get-in-touch")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SolutionUnboxHeroSection;
