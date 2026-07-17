"use client";

import React from "react";
import "./index.css";
import { swarmIcon } from "../../helpers/assets";
import CommonButton from "../common/CommonButton";
import { useRouter } from "next/navigation";
import { heroVideo } from "../../views/Events/assets";
import HeroMedia from "./HeroMedia";

export default function WarehouseShowcase() {
  const router = useRouter();

  return (
    <>
      <div className="showcase-container">
        <HeroMedia
          videoSrc={heroVideo}
          mediaQuery="(min-width: 769px)"
        />

        <div className="headline-panel">
          <h1 className="res-font-48-extralight color-black-1">
            <span style={{ display: "block" }}>Redefining New Age</span>
            <span style={{ display: "block" }}>
              <span className="res-font-48-semibold color-black-1">
                Warehousing
              </span>
            </span>
          </h1>
          <div className="flex flex-col items-start lg:flex-row lg:items-center">
            <p className="font-20-light color-grey-1">
              Future-ready warehouse automation engineered for space, speed and
              savings.
            </p>
          </div>
        </div>

        <div className="hero-bottom-right-row">
          <div className="flex flex-col gap-[20px] w-full">
            <div className="p-[18px] bg-[#00A99D] rounded-[16px] w-[172px] box-border flex flex-col self-end">
              <span className="font-48-semibold text-white italic">3x</span>
              <p className="font-16-regular text-white">Faster installation</p>
            </div>
            <div className="flex gap-[22px]">
              <div className="p-[18px] bg-[#00A99D] rounded-[16px] w-[172px] box-border flex flex-col self-end">
                <span className="font-48-semibold text-white italic">2x</span>
                <p className="font-16-regular text-white">
                  Faster <br /> ROI
                </p>
              </div>
              <div className="p-[18px] bg-[#F3F3F3] rounded-[16px] w-[172px] box-border flex flex-col self-end">
                <span className="font-48-semibold text-black italic">2x</span>
                <p className="font-16-regular text-black">
                  Increase in space density
                </p>
              </div>
            </div>
            <div className="p-[18px] rounded-2xl bg-[#FDFDFD] flex flex-col gap-[20px]">
              <p className="font-16-regular  text-[#141313]">
                Swarm Intelligence enabled dense sortation systems.
              </p>
              <div className="flex justify-between">
                <img
                  src={swarmIcon}
                  className="w-[48px] h-[48px]"
                  draggable={false}
                  alt="Swarm Intelligence icon"
                />

                <CommonButton
                  theme={"green"}
                  title={"Book a Demo"}
                  onClick={() => router.push("/get-in-touch")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-showcase-container">
        <div className="mobile-headline-panel">
          <div className="flex flex-col gap-[16px] items-center">
            <h1 className="res-font-48-extralight color-black-1 text-center">
              <span style={{ display: "block" }}>Redefining New Age</span>
              <span style={{ display: "block" }}>
                <span className="res-font-48-semibold color-black-1">
                  Warehousing
                </span>
              </span>
            </h1>
            <p className="res-font-16-light color-grey-1 text-center">
              Future-ready warehouse automation engineered for space, speed and
              savings.
            </p>
          </div>
        </div>

        <div className="flex-1 relative w-full h-full rounded-[20px] overflow-hidden bg-red">
          <HeroMedia
            videoSrc={heroVideo}
            mediaQuery="(max-width: 768px)"
          />
        </div>

        <div className="mobile-bottom-tab">
          <div className="flex-1 flex flex-wrap gap-[16px] w-full">
            <div className="p-[16px] flex-1  bg-[#00A99D] rounded-[16px] min-w-[172px] box-border flex flex-col">
              <span className="font-48-semibold text-white italic">3x</span>
              <p className="font-16-regular text-white">Faster installation</p>
            </div>
            <div className="p-[16px] flex-1  bg-[#00A99D] rounded-[16px] min-w-[172px] box-border flex flex-col self-end">
              <span className="font-48-semibold text-white italic">2x</span>
              <p className="font-16-regular text-white">Faster ROI</p>
            </div>
            <div className="p-[16px] flex-1  bg-[#F3F3F3] rounded-[16px] min-w-[172px] box-border flex flex-col self-end">
              <span className="font-48-semibold text-black italic">2x</span>
              <p className="font-16-regular text-black">
                Increase in space density
              </p>
            </div>
            <div className="p-[16px] w-full rounded-2xl bg-[#FDFDFD] flex flex-col gap-[20px]">
              <p className="font-16-regular  text-[#141313]">
                Swarm Intelligence enabled dense sortation systems.
              </p>
              <div className="flex justify-between">
                <img
                  src={swarmIcon}
                  className="w-[48px] h-[48px]"
                  draggable={false}
                  alt="Swarm Intelligence icon"
                />

                <CommonButton
                  theme={"green"}
                  title={"Book a Demo"}
                  onClick={() => router.push("/get-in-touch")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
