"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Controller } from "swiper/modules";
import "swiper/css";
import "./index.css";
import { testimonialData } from "../../helpers/config";
import AnimatedArrowButton from "../common/AnimatedArrowButton";
import { animation } from "../../helpers/utils";
import { companyAboutList } from "../../views/company/config";
import ImageComponent from "../common/ImageComponent";

const AboutCompanySlider = () => {
  const [imageSwiper, setImageSwiper] = useState(null);
  const [textSwiper, setTextSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTestimonial = testimonialData[activeIndex];

  return (
    <section>
      <div className="testimonial-section">
        <div
          className="testimonial-right">
          <Swiper
            modules={[Controller]}
            loop={true}
            onSwiper={setTextSwiper}
            controller={{ control: imageSwiper }}
            allowTouchMove={false}
            className="testimonial-text-swiper">
            {companyAboutList?.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="flex flex-col gap-[16px] md:gap-[40px]">
                  <p className="font-32-light color-black-1">
                    {testimonial?.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div
          className="testimonial-left relative">
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
            className="testimonial-swiper">
            {companyAboutList?.map((testimonial, index) => (
              <SwiperSlide key={testimonial?.id} className="relative">
                <ImageComponent
                  src={testimonial?.image}
                  alt="Warehouse background"
                  className="common-img"
                />
                <div className="right-product-badge font-10-light text-white">
                  {`${index + 1} / ${companyAboutList?.length}`}
                </div>
              </SwiperSlide>
            ))}
            {/* <div className="about-slider-overlay  progressive-blur"></div> */}
          </Swiper>
          <div className="about-slider-nav">
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
      </div>
    </section>
  );
};

export default AboutCompanySlider;
