"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import "./index.css";
import { industryUserCasesData } from "../../helpers/config";
import AnimatedArrowButton from "../common/AnimatedArrowButton";
import { motion, AnimatePresence } from "framer-motion";
import { animation } from "../../helpers/utils";

import RightIcon from "../../assets/icons/tick-circle.svg";
import ImageComponent from "../common/ImageComponent";

const IndustryUseCases = () => {
  const [imageSwiper, setImageSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTestimonial = industryUserCasesData[activeIndex];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-[20px]"
    >
      <div className="testimonial-section">
        {/* LEFT IMAGE / TAG */}
        <div className="flex-1">
          <div className="industruy-usecases-tag relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <ImageComponent
                  src={activeTestimonial?.image}
                  className="common-img"
                  draggable={false}
                  alt={activeTestimonial?.title || "Industry use case"}
                />
              </motion.div>
            </AnimatePresence>
            <div className="bining-product-badge font-10-light text-white">
              {`${activeTestimonial?.id} / 3`}
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <motion.div
          className="industry-usecases-right"
          variants={animation.fromRightVariant}
        >
          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{
              delay: 7000,
              disableOnInteraction: false,
            }}
            onSwiper={setImageSwiper}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="testimonial-text-swiper"
          >
            {industryUserCasesData?.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="flex flex-col gap-[16px] md:gap-[20px]">
                  <p className="font-40-semibold color-black-1">
                    {testimonial?.title}
                  </p>

                  <p className="font-16-light color-black-1">
                    {testimonial?.desc}
                  </p>

                  <div className="space-y-[18px]">
                    {testimonial?.tags?.map((item, index) => (
                      <motion.div
                        className="flex items-center gap-[10px] md:gap-[20px]"
                        key={`${testimonial.id}-${index}`}
                        custom={index}
                        variants={animation.itemFromRightVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                      >
                        <RightIcon />
                        <p className="font-20-regular color-black-1">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* CUSTOM NAV */}
      <div className="testimonial-nav justify-center">
        <AnimatedArrowButton
          direction="up-right"
          onClick={() => imageSwiper?.slidePrev()}
        />

        <AnimatedArrowButton
          direction="down-left"
          onClick={() => imageSwiper?.slideNext()}
        />
      </div>
    </motion.section>
  );
};

export default IndustryUseCases;
