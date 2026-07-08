"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { animation } from "../../helpers/utils";
import CommonButton from "../../components/common/CommonButton";
import ImageComponent from "../../components/common/ImageComponent";
import { featuredEvent } from "./config";
import CalendarIcon from "../../assets/icons/whitePaperCalendar.svg";
import LocationIcon from "../../assets/icons/location.svg";

const FeaturedEvent = () => {
  const router = useRouter();
  const e = featuredEvent;

  // No upcoming events → nothing to feature.
  if (!e) return null;

  return (
    <div className="bg-[#FDFDFD] class-gap" id="featured-event">
      <div
        className="featured-event-head">
        <p className="font-40-regular text-[#141313]">Featured Event</p>
        <span className="next-up-pill font-14-regular color-green-1">
          Next Up
        </span>
      </div>

      <div
        className="featured-event-card">
        <div className="featured-event-img">
          <ImageComponent src={e.image} alt={e.title} className="common-img" />
        </div>

        <div className="featured-event-content">
          <span className="featured-event-eyebrow font-14-semibold color-green-1">
            {e.tag}
          </span>
          <h2 className="font-32-medium text-[#141313]">{e.title}</h2>
          <p className="font-16-light text-[#4a4a4a] featured-event-desc">
            {e.description}
          </p>

          <div className="featured-event-meta">
            <div className="featured-meta-item">
              <CalendarIcon className="featured-meta-icon" />
              <span className="font-14-regular text-[#818382]">{e.date}</span>
            </div>
            <div className="featured-meta-item">
              <LocationIcon stroke="#079d92" className="featured-meta-icon" />
              <span className="font-14-regular text-[#818382]">
                {e.location}
              </span>
            </div>
          </div>

          <div className="featured-event-btns">
            <CommonButton
              theme="green"
              title="Register Now"
              onClick={() => router.push(e.registerLink)}
            />
            <CommonButton
              theme="white"
              title="Add to Calendar"
              onClick={() => window.open(e.calendarLink, "_blank")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvent;
