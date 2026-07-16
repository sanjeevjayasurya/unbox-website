"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller } from "swiper/modules";
import "swiper/css";
import AnimatedArrowButton from "../common/AnimatedArrowButton";
import { superPowersData } from "../../views/solutions/config";
import CommonButton from "../common/CommonButton";
import "./index.css";

const SuperPowerSlider = () => {
  const [imageSwiper, setImageSwiper] = useState(null);

  const [activeIndex, setActiveIndex] = useState(1);

  const [isMobile, setIsMobile] = useState(false);

  const [isTablet, setIsTablet] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1280);

  const handleSlideChange = (swiper) => {
    // Always use realIndex to map to original data
    setActiveIndex(swiper.realIndex);
  };


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth <= 780);
      setIsTablet(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slidesPerView =
    windowWidth <= 390
      ? 1.4
      : windowWidth <= 440
        ? 1.7
        : windowWidth < 769
          ? 2
          : windowWidth < 1024
            ? 1.9
            : 2.5;

  return (
    <div className="flex flex-col items-center gap-5 justify-center">
      <Swiper
        modules={[Controller]}
        onSwiper={setImageSwiper}
        onSlideChange={handleSlideChange}
        onSlideChangeTransitionEnd={handleSlideChange} // ensures correct focus after loop wrap
        slidesPerView={slidesPerView}
        centeredSlides={true}
        loop={false} // Infinite loop enabled
        initialSlide={1}
        spaceBetween={1}
        className="w-full max-w-6xl super-power-swiper self-center"
      >
        {superPowersData?.map((item, index) => (
          <SwiperSlide
            className={`super-power-slide ${
              activeIndex === index ? "active-slide" : ""
            }`}
            key={index}
          >
            <div
              className={`super-power-slider-main-div flex flex-col items-start justify-center ${
                activeIndex === index ? "max-h-[685px]" : "max-h-[522px]"
              }`}
            >
              <div
                className={`
                  ${
                    activeIndex === index
                      ? `super-power-img-div-focused scrollbar-none`
                      : `super-power-img-div scrollbar-none`
                  }`}
              >
                <img
                  src={item.image}
                  className="common-img scrollbar-none "
                  alt={item.title}
                />
              </div>
              <div className="super-power-data-class">
                <p
                  className={`${
                    activeIndex === index
                      ? "font-32-medium-super-power"
                      : "font-24-light-super-power"
                  } color-black-1`}
                >
                  {item.title}
                </p>
                {activeIndex === index && (
                  <div className="super-power-data-inner-class">
                    <div className="gap-[10px] flex flex-col">
                      <p className="font-16-regular-super-power color-black-1">
                        Sorting Units
                      </p>
                      <p className="font-20-light-super-power color-black-1">
                        {item?.units}
                      </p>
                    </div>
                    {!isMobile ? (
                      <CommonButton theme={"green"} title="Read Case Study" />
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation */}
      <div className="flex items-center gap-[12px] self-center mt-4">
        <AnimatedArrowButton
          direction="up-right"
          onClick={() => imageSwiper?.slidePrev()}
        />
        <AnimatedArrowButton
          direction="down-left"
          onClick={() => imageSwiper?.slideNext()}
        />
      </div>
    </div>
  );
};

export default SuperPowerSlider;
