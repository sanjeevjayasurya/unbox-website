"use client";

import React, { useState } from "react";
import { machineTabsData } from "../../views/solutions/config";
import { animation } from "../../helpers/utils";
import { MachineTabImg } from "../../helpers/assets";
import ImageComponent from "../common/ImageComponent";
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
const MachineTabs = () => {
  const [activeTab, setActiveTab] = useState(machineTabsData[0]);
  const [[page, direction], setPage] = useState([0, 0]);

  const handleTabChange = (tab) => {
    const newIndex = machineTabsData.findIndex((t) => t.id === tab.id);
    const oldIndex = machineTabsData.findIndex((t) => t.id === activeTab.id);
    setPage([newIndex, newIndex> oldIndex ? 1 : -1]);
    setActiveTab(tab);
  };
  return (
    <div className="machine-tabs-main-div">
      <div
        className="machine-tabs-inner-div">
        <div className="flex  p-[3px] rounded-full border-[#141313] border justify-between">
          {machineTabsData?.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab)}
              className={`rounded-full font-16-light  transition-colors relative w-full responsive-padding ${
                activeTab.id === tab.id ? "text-white" : "text-[#141313] "
              }`}>
              {activeTab.id === tab.id && (
                <div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-black rounded-full"
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="class-title-subtitle relative min-h-[120px]">
          {/* Ensure stable height */}
          
            <div
              key={activeTab.id}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              // className="absolute top-0 left-0 w-full gap-5 flex flex-col" // Overlay to prevent shift
              className="class-title-subtitle">
              <p className="font-40-semibold uppercase">
                {activeTab?.content?.title.split(" ").map((word, index) => (
                  <span
                    key={index}
                    className={
                      word.toLowerCase() === "sr"
                        ? "color-green-1"
                        : "color-black-1"
                    }>
                    {word}{" "}
                  </span>
                ))}
              </p>
              <p className="font-20-light color-black-1 text-alignclass">
                {activeTab?.content?.subtitle}
              </p>
            </div>
          
        </div>
        {/* <div> */}
        <div className="machine-features-wrapper">
          
            <div
              key={activeTab.id}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="machine-features absolute top-0 left-0 w-full">
              {activeTab?.content?.features?.map((item, index) => (
                <div key={index} className="feature-div">
                  <item.image className="svg-imgs" />
                  <div className="feature-div-inner">
                    <p className="font-20-light-machine-tab color-black-1">
                      {item.name}
                    </p>
                    <p className="font-16-medium-machine-tab color-green-1">
                      {item.feature}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          
        </div>

        {/* </div> */}
      </div>
      <div
        className="machine-tab-img z-10">
        <ImageComponent
          src={activeTab?.image}
          className={`common-img`}
          alt={activeTab?.name || "UnboxSort machine component"}
        />
      </div>
    </div>
  );
};

export default MachineTabs;
