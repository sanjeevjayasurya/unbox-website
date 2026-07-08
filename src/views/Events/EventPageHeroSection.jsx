"use client";

import React from "react";
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
        <img
          src={eventHeroImage}
          draggable={false}
          className="common-img rounded-[38px]"
          fetchPriority="high"
          alt="News and events hero image"
        />
        <div className="overlay-event-news">
          <div
            className="overlay-event-text-div">
            <p className="font-36-light text-[#FDFDFD]">
              Be part of a growing ecosystem of innovators, engineers, and
              industry leaders at{" "}
              <span className="font-medium">Unbox Robotics events.</span>
            </p>
          </div>
        </div>

        {/* Top-left headline panel */}
        <div className="event-headline-panel">
          <h1 className="res-font-48-extralight color-black-1">
            <span
              style={{ display: "block" }}>
              Latest{" "}
              <span className="res-font-48-semibold color-black-1">
                News & Events
              </span>
            </span>
          </h1>
          <div
            className="flex flex-col items-start lg:flex-row lg:items-center">
            <p className="font-20-light color-grey-1">
              Discover the latest news, funding updates, and breakthrough
              innovations in warehouse robotics.
            </p>
          </div>
        </div>

        {/* <div
          className="news-bottom-row">
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

      <div className="mobile-showcase-container">
        <div className="mobile-headline-panel">
          <h1 className="res-font-48-extralight color-black-1">
            <span
              style={{ display: "block" }}>
              Latest{" "}
              <span className="res-font-48-semibold color-black-1">
                News & Events
              </span>
            </span>
          </h1>
          <div
            className="flex flex-col items-start lg:flex-row lg:items-center">
            <p className="font-20-light color-grey-1 text-center">
              Discover the latest news, funding updates, and breakthrough
              innovations in warehouse robotics.
            </p>
          </div>
        </div>

        <div className="flex-1 relative w-full h-full rounded-[20px] overflow-hidden bg-red">
          <img
            src={eventsHeroImage}
            draggable={false}
            className="common-img"
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
