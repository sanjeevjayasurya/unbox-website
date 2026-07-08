"use client";

import React, { useState } from "react";
import { industryTabsData } from "../../views/solutions/config";
import { animation } from "../../helpers/utils";
import { Swiper, SwiperSlide } from "swiper/react";

const variants = {
  enter: (direction) => ({
    x: direction> 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const IndustryTabs = () => {
  const [activeTab, setActiveTab] = useState(industryTabsData[0]);
  const [[page, direction], setPage] = useState([0, 0]);

  const handleTabChange = (tab) => {
    const newIndex = industryTabsData.findIndex((t) => t.id === tab.id);
    const oldIndex = industryTabsData.findIndex((t) => t.id === activeTab.id);
    setPage([newIndex, newIndex> oldIndex ? 1 : -1]);
    setActiveTab(tab);
  };

  return (
    <div className="industry-container">
      <div className="flex justify-center">
        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          freeMode
          className="tech-tabs-swiper">
          {industryTabsData?.map((tab) => (
            <SwiperSlide key={tab.id} className="w-auto!">
              <button
                onClick={() => handleTabChange(tab)}
                className={`rounded-full font-16-light bg-[#F3F3F3] transition-colors relative w-full responsive-padding ${
                  activeTab.id === tab.id ? "text-white" : "text-[#141313] "
                }`}>
                {activeTab.id === tab.id && (
                  <div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-[#141313] rounded-full"
                  />
                )}
                <span className="relative z-10 text-nowrap">{tab.label}</span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="relative overflow-hidden min-h-[420px]">
        
          <div
            key={activeTab.id}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-full grid grid-cols-1 md:grid-cols-2 gap-[40px] items-start responsive-div">
            <div className="industry-image-div">
              <img
                src={activeTab.content.image}
                alt={activeTab.label}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>

            <div className="industry-info-div">
              <h2
                className="font-20-light color-black-1 transition-all duration-75 ease-in-out">
                {activeTab.content.title}
              </h2>
              <div className="flex flex-col gap-[16px]">
                {activeTab.content.features.map((feature, index) => (
                  <div
                    className="flex flex-col gap-[10px]"
                    key={feature.name}>
                    <h3 className="font-16-semibold color-black-1">
                      {feature.name}
                    </h3>
                    <p className="font-12-light color-black-1">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default IndustryTabs;
