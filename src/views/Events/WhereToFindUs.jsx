"use client";

import React, { useState } from "react";
import Link from "next/link";
import { animation } from "../../helpers/utils";
import ImageComponent from "../../components/common/ImageComponent";
import { findUsEvents } from "./config";
import CalendarIcon from "../../assets/icons/whitePaperCalendar.svg";
import LocationIcon from "../../assets/icons/location.svg";
import ArrowRight from "../../assets/icons/arrow-right.svg";

const allEventTabs = ["Upcoming", "Past Events"];

const WhereToFindUs = () => {
  // Only show tabs that actually have events (e.g. no "Upcoming" tab when
  // there are no upcoming events).
  const eventTabs = allEventTabs.filter((t) => (findUsEvents[t] || []).length);
  const [activeTab, setActiveTab] = useState(eventTabs[0]);
  const events = findUsEvents[activeTab] || [];

  if (eventTabs.length === 0) return null;

  return (
    <div className="bg-[#FDFDFD] class-gap">
      {eventTabs.length> 1 && (
      <div
        className="find-us-toggle flex p-[3px] rounded-full border-[#141313] border justify-between"
        role="tablist"
        aria-label="Filter events">
        {eventTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full font-16-light transition-colors relative w-full px-[24px] py-[10px] ${
              activeTab === tab ? "text-white" : "text-[#141313]"
            }`}>
            {activeTab === tab && (
              <div
                layoutId="findUsActivePill"
                className="absolute inset-0 bg-black rounded-full"
              />
            )}
            <span className="relative z-10 text-nowrap">{tab}</span>
          </button>
        ))}
      </div>
      )}

      <p
        className="font-40-regular text-[#141313]">
        Where else to find us
      </p>

      <div className="where-find-grid">
        {events.map((item, index) => (
          <div
            key={item.id}>
            <Link href={item.link} className="where-find-card">
              <div className="where-find-img">
                <ImageComponent
                  src={item.image}
                  alt={item.title}
                  className="common-img"
                />
                <span className="where-find-tag font-14-regular color-black-1">
                  {item.tag}
                </span>
              </div>

              <div className="where-find-body">
                <div className="where-find-meta">
                  <CalendarIcon className="where-find-icon" />
                  <span className="font-14-regular color-green-1">
                    {item.date}
                  </span>
                </div>
                <h3 className="font-20-regular color-black-1">{item.title}</h3>
                <div className="where-find-meta">
                  <LocationIcon stroke="#818382" className="where-find-icon" />
                  <span className="font-14-regular text-[#818382]">
                    {item.location}
                  </span>
                </div>

                <span className="where-find-highlights font-14-regular color-green-1">
                  View Highlights
                  <ArrowRight className="where-find-arrow" />
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhereToFindUs;
