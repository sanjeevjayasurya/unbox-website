"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { animation } from "../../helpers/utils";
import ImageComponent from "../../components/common/ImageComponent";
import CommonButton from "../../components/common/CommonButton";
import AnimatedArrowButton from "../../components/common/AnimatedArrowButton";
import { pastEventsData } from "./config";
import CalendarIcon from "../../assets/icons/whitePaperCalendar.svg";
import LocationIcon from "../../assets/icons/location.svg";

const mod = (n, m) => ((n % m) + m) % m;

const PastEventsCarousel = () => {
  const router = useRouter();
  const n = pastEventsData.length;
  // The "enlarged" card defaults to the centre and follows the pointer on hover.
  const [defaultActive, setDefaultActive] = useState(Math.floor(n / 2));
  const [hovered, setHovered] = useState(null);
  const active = hovered ?? defaultActive;

  return (
    <div className="bg-[#FDFDFD] class-gap">
      <p
        className="font-40-regular text-[#141313] text-center">
        Past Events
      </p>

      <div
        className="past-events-track"
        onMouseLeave={() => setHovered(null)}>
        {pastEventsData.map((item, index) => {
          const isActive = index === active;
          return (
            <div
              key={item.id}
              className={`past-card ${isActive ? "is-active" : ""}`}
              onMouseEnter={() => setHovered(index)}
              onClick={() => isActive && router.push(item.link)}>
              <div className="past-card-img">
                <ImageComponent
                  src={item.image}
                  alt={item.title}
                  className="common-img"
                />
                <span className="where-find-tag font-14-regular color-black-1">
                  {item.tag}
                </span>
              </div>

              <h3
                className={`${
                  isActive ? "font-32-medium" : "font-20-regular"
                } color-black-1 past-card-title`}>
                {item.title}
              </h3>

              <div className="past-card-details">
                <div className="past-center-meta">
                  <div className="where-find-meta">
                    <CalendarIcon className="where-find-icon" />
                    <span className="font-14-regular color-green-1">
                      {item.date}
                    </span>
                  </div>
                  <div className="where-find-meta">
                    <LocationIcon
                      stroke="#818382"
                      className="where-find-icon"
                    />
                    <span className="font-14-regular text-[#818382]">
                      {item.location}
                    </span>
                  </div>
                </div>
                <CommonButton
                  theme="green"
                  title="View Highlights"
                  onClick={() => router.push(item.link)}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="past-events-arrows">
        <AnimatedArrowButton
          direction="up-right"
          ariaLabel="Previous event"
          onClick={() => setDefaultActive((c) => mod(c - 1, n))}
        />
        <AnimatedArrowButton
          direction="down-left"
          ariaLabel="Next event"
          onClick={() => setDefaultActive((c) => mod(c + 1, n))}
        />
      </div>
    </div>
  );
};

export default PastEventsCarousel;
