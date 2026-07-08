"use client";

import React, { useState, useRef } from "react"; // 1. Import useRef
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "./index.css";

import {
  productCommingSoon1Image,
  productCommingSoon2Image,
  productCommingSoonImage,
  unboxProductImage,
} from "../../helpers/assets";
import AnimatedArrowButton from "../common/AnimatedArrowButton";
import { animation } from "../../helpers/utils";
import Link from "next/link";
import { techonologyInteligenceInfo } from "../../views/technology/config";
import ImageComponent from "../common/ImageComponent";

const BiningSlider = () => {
  const [imageSwiper, setImageSwiper] = useState(null);

  // 3. Set up the ref and the hook
  const ref = useRef(null);
  const isInView = true; // Trigger once when 50% is visible

  return (
    <div ref={ref} className="slider-container">
      <div>
        <Swiper
          modules={[Navigation, FreeMode]}
          loop={true}
          freeMode={true}
          slidesPerView={"auto"}
          onSwiper={setImageSwiper}
          spaceBetween={20}
          className="technology-binding-swiper">
          {techonologyInteligenceInfo.map((product) => (
            <SwiperSlide
              key={product.id}
              className="binding-slide bg-[#336864]">
              <div className="slide-content-active">
                <ImageComponent
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain containt-img object-center transition-transform ease-linear duration-300"
                />
                <div className="product-info-overlay">
                  <h3 className="font-20-regular text-center color-white">
                    {product.question}
                  </h3>
                  {!!product.answer && (
                    <p className="font-14-light color-white text-center">
                      {product.answer}
                    </p>
                  )}
                </div>
              </div>
              <div className="bining-product-badge font-10-light text-white">
                {`${product?.id} / ${techonologyInteligenceInfo?.length}`}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div
        className="flex gap-[12px]">
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

export default BiningSlider;
