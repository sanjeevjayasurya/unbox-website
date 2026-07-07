"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Controller } from "swiper/modules";
import "swiper/css";
import "./index.css";
import { testimonialData } from "../../helpers/config";
import AnimatedArrowButton from "../common/AnimatedArrowButton";
import { motion } from "framer-motion";
import { animation } from "../../helpers/utils";
import { techServiceData } from "../../views/technology/config";

const TechServiceSlider = () => {
  const [imageSwiper, setImageSwiper] = useState(null);
  const [textSwiper, setTextSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTestimonial = testimonialData[activeIndex];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="testimonial-section">
        <motion.div
          className="testimonial-left"
          variants={animation.fromLeftVariant}
        >
          <Swiper
            modules={[Autoplay, Controller]}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
            }}
            onSwiper={setImageSwiper}
            controller={{ control: textSwiper }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="testimonial-swiper"
          >
            {techServiceData?.map((testimonial) => (
              <SwiperSlide key={testimonial?.id}>
                <img
                  src={testimonial?.image}
                  alt={testimonial?.title || "Technology service"}
                  className="common-img"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div
          className="testimonial-right"
          variants={animation.fromRightVariant}
        >
          <Swiper
            modules={[Controller]}
            loop={true}
            onSwiper={setTextSwiper}
            controller={{ control: imageSwiper }}
            allowTouchMove={false}
            className="testimonial-text-swiper"
          >
            {techServiceData?.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="flex flex-col gap-[16px] md:gap-[40px]">
                  <p className="font-40-semibold color-black-1">
                    {testimonial?.title}
                  </p>
                  <p className="font-20-light color-black-1">
                    {testimonial?.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="testimonial-nav">
            <AnimatedArrowButton
              direction="up-right"
              onClick={() => imageSwiper?.slidePrev()}
            />
            <AnimatedArrowButton
              direction="down-left"
              onClick={() => imageSwiper?.slideNext()}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TechServiceSlider;
