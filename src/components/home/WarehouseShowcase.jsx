"use client";

import React from "react";
import { motion } from "framer-motion";
import "./index.css";
import { swarmIcon } from "../../helpers/assets";
import CommonButton from "../common/CommonButton";
import { animation } from "../../helpers/utils";
import { useRouter } from "next/navigation";
import { heroVideo, heroVideoPoster } from "../../views/Events/assets";

export default function WarehouseShowcase() {
  const router = useRouter();

  return (
    <>
      <div className="showcase-container">
        <video
          src={heroVideo}
          poster={heroVideoPoster}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          fetchPriority="high"
          draggable={false}
          className="common-img"
        />

        <div className="headline-panel">
          <h1 className="res-font-48-extralight color-black-1">
            <motion.span
              style={{ display: "block" }}
              custom={0}
              initial="hidden"
              animate="visible"
              variants={animation.slideInFromLeft}
            >
              Redefining New Age
            </motion.span>
            <motion.span
              style={{ display: "block" }}
              custom={1}
              initial="hidden"
              animate="visible"
              variants={animation.slideInFromLeft}
            >
              <span className="res-font-48-semibold color-black-1">
                Warehousing
              </span>
            </motion.span>
          </h1>
          <motion.div
            className="flex flex-col items-start lg:flex-row lg:items-center"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={animation.slideInFromLeft}
          >
            <p className="font-20-light color-grey-1">
              Future-ready warehouse automation engineered for space, speed and
              savings.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="hero-bottom-right-row"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={animation.showcaseVariants}
        >
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
        </motion.div>
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
                Redefining New Age
              </motion.span>
              <motion.span
                style={{ display: "block" }}
                custom={1}
                initial="hidden"
                animate="visible"
                variants={animation.showcaseVariants}
              >
                <span className="res-font-48-semibold color-black-1">
                  Warehousing
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
              Future-ready warehouse automation engineered for space, speed and
              savings.
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 relative w-full h-full rounded-[20px] overflow-hidden bg-red"
        >
          <video
            src={heroVideo}
            poster={heroVideoPoster}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            fetchPriority="high"
            draggable={false}
            className="common-img"
          />
        </motion.div>

        <motion.div
          className="mobile-bottom-tab"
          initial="hidden"
          animate="visible"
          variants={animation.showcaseVariants}
        >
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
        </motion.div>
      </div>
    </>
  );
}
