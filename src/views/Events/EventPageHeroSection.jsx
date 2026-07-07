"use client";

import React from "react";
import { motion } from "framer-motion";
import "./index.css";
import { animation } from "../../helpers/utils";
import Link from "next/link";
import CommonButton from "../../components/common/CommonButton";
import { eventHeroImage } from "../../helpers/assets";

const eventsHeroImage = process.env.PUBLIC_URL + "/images/events-hero.webp";

export default function EventPageHeroSection() {
  return (
    <>
      <div className="showcase-container">
        <motion.img
          src={eventHeroImage}
          draggable={false}
          className="common-img rounded-[38px]"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          fetchPriority="high"
          alt="News and events hero image"
        />
        <div className="overlay-event-news">
          <motion.div
            className="overlay-event-text-div"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={animation.showcaseVariants}
          >
            <p className="font-36-light text-[#FDFDFD]">
              Be part of a growing ecosystem of innovators, engineers, and
              industry leaders at{" "}
              <span className="font-medium">Unbox Robotics events.</span>
            </p>
          </motion.div>
        </div>

        {/* Top-left headline panel */}
        <div className="event-headline-panel">
          <h1 className="res-font-48-extralight color-black-1">
            <motion.span
              style={{ display: "block" }}
              custom={0}
              initial="hidden"
              animate="visible"
              variants={animation.slideInFromLeft}
            >
              Latest{" "}
              <span className="res-font-48-semibold color-black-1">
                News & Events
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
              Discover the latest news, funding updates, and breakthrough
              innovations in warehouse robotics.
            </p>
          </motion.div>
        </div>

        {/* <motion.div
          className="news-bottom-row"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={animation.showcaseVariants}
        >
          <div className="p-4 w-full rounded-[20px] bg-[#F3F3F3] flex flex-col gap-7 ">
            <p className="font-18-regular text-black-1">
              Stay updated with the latest developments, funding announcements
              from Unbox Robotics
            </p>
            <div className="self-end">
              <Link href={"/events/logimat2026"}>
                <CommonButton theme={"green"} title={"Read Full Article"} />
              </Link>
            </div>
          </div>
        </motion.div> */}
      </div>

      <div className="mobile-showcase-container">
        <div className="mobile-headline-panel">
          <h1 className="res-font-48-extralight color-black-1">
            <motion.span
              style={{ display: "block" }}
              custom={0}
              initial="hidden"
              animate="visible"
              variants={animation.slideInFromLeft}
            >
              Latest{" "}
              <span className="res-font-48-semibold color-black-1">
                News & Events
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
            <p className="font-20-light color-grey-1 text-center">
              Discover the latest news, funding updates, and breakthrough
              innovations in warehouse robotics.
            </p>
          </motion.div>
        </div>

        <div className="flex-1 relative w-full h-full rounded-[20px] overflow-hidden bg-red">
          <motion.img
            src={eventsHeroImage}
            draggable={false}
            className="common-img"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            alt="News and events hero image"
          />
          <div className="overlay-event-news">
            <div className="overlay-event-text-div">
              <p className="font-36-light text-[#FDFDFD]">
                Be part of a growing ecosystem of innovators, engineers, and
                industry leaders at{" "}
                <span className="font-medium">Unbox Robotics events.</span>
              </p>
            </div>
          </div>
        </div>

        {/* <div className="mobile-bottom-tab">
          <div className="p-4 w-full rounded-[20px] bg-[#F3F3F3] flex flex-col gap-7 ">
            <p className="font-18-regular text-black-1">
              Stay updated with the latest developments, funding announcements
              from Unbox Robotics
            </p>
            <div className="self-end">
              <Link href={"/events/logimat2026"}>
                <CommonButton theme={"green"} title={"Read Full Article"} />
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
