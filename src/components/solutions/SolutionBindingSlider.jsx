"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import "./index.css";
import { unboxSuperPowerDataCards } from "../../helpers/config";

import AnimatedArrowButton from "../common/AnimatedArrowButton";
import { animation } from "../../helpers/utils";
import { usePathname } from "next/navigation";
import ImageComponent from "../common/ImageComponent";

const SolutionBindingSlider = () => {
  const pathname = usePathname();

  const [swiperRef, setSwiperRef] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [initialSlide, setInitialSlide] = useState(0);

  const activeTestimonial = unboxSuperPowerDataCards[activeIndex];

  // Set initial slide from URL
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash?.replace("#", "");
    if (!hash) return;

    const index = unboxSuperPowerDataCards.findIndex(
      (item) => item.id === hash,
    );

    if (index === -1) return;

    setInitialSlide(index);
    setActiveIndex(index);
  }, [pathname]);

  // When swiper becomes ready, jump correctly (for safety with loop)
  useEffect(() => {
    if (!swiperRef) return;

    swiperRef.slideToLoop(initialSlide, 0);
  }, [swiperRef, initialSlide]);

  return (
    <section
      className="space-y-[20px]">
      <div className="testimonial-section">
        {/* LEFT IMAGE */}
        <div
          className="flex-1 solution-binding-overview">
          <ImageComponent
            src={activeTestimonial?.image}
            className="object-contain object-center w-full h-full"
            alt={activeTestimonial?.title || "UnboxSort sortation feature"}
          />
        </div>

        {/* RIGHT CONTENT */}
        <div
          className="industry-usecases-right">
          <Swiper
            modules={[Autoplay]}
            loop
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            initialSlide={initialSlide}
            onSwiper={setSwiperRef}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="testimonial-text-swiper">
            {unboxSuperPowerDataCards.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id} className="relative ">
                <div className="flex flex-col gap-[16px] md:gap-[20px]">
                  <p className="font-40-semibold color-black-1">
                    {testimonial.title}
                  </p>

                  <p className="font-16-light color-black-1">
                    {testimonial.description}
                  </p>

                  <div className="flex flex-col gap-[12px] md:gap-[20px]">
                    <p className="font-20-regular leading-relaxed text-[#141313] font-semibold">
                      What UnboxSort Enables
                    </p>

                    <ul className="list-disc ml-5">
                      {testimonial.list?.map((item, idx) => (
                        <li
                          key={idx}
                          className="font-16-light leading-relaxed text-[#141313] mb-1">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="solution-binding-badge font-10-light color-black-1">
                  {`${index + 1} / ${unboxSuperPowerDataCards?.length}`}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* CUSTOM NAV */}
      <div className="testimonial-nav justify-center">
        <AnimatedArrowButton
          direction="up-right"
          onClick={() => swiperRef?.slidePrev()}
        />

        <AnimatedArrowButton
          direction="down-left"
          onClick={() => swiperRef?.slideNext()}
        />
      </div>
    </section>
  );
};

export default SolutionBindingSlider;
