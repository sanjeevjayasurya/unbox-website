"use client";

import React, { useState, useRef } from "react"; // 1. Import useRef
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import { motion, useInView } from "framer-motion"; // 2. Import useInView

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
import { unboxSuperPowerData } from "../../helpers/config";
import ImageComponent from "../common/ImageComponent";

const BiningUnboxSortSlider = () => {
  const [imageSwiper, setImageSwiper] = useState(null);

  // 3. Set up the ref and the hook
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 }); // Trigger once when 50% is visible

  return (
    <div ref={ref} className="slider-container">
      <motion.div
        variants={animation.fadeInUpVariant}
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Swiper
          modules={[Navigation, FreeMode]}
          loop={true}
          freeMode={true}
          slidesPerView={"auto"}
          onSwiper={setImageSwiper}
          spaceBetween={20}
          className="binding-swiper"
        >
          {unboxSuperPowerData.map((product, index) => (
            <SwiperSlide key={product.id} className="unbox-sort-binding-slide">
              <div className="unbox-sort-bining-img-div">
                <ImageComponent
                  src={product?.image}
                  alt={product.name}
                  className="common-img !object-contain transition-transform ease-linear duration-300"
                />
                <div className="bining-product-badge font-10-light color-green-1">
                  {`${index + 1} / ${unboxSuperPowerData?.length}`}
                </div>
              </div>
              <div className="unbox-bining-card-overlay">
                <h3 className="font-16-semibold text-[#141313]">
                  {product.name}
                </h3>
                {!!product.desc && (
                  <p className="font-12-light text-[#818382]">{product.desc}</p>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      <motion.div
        className="flex gap-[12px]"
        variants={animation.fadeInUpVariant}
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <AnimatedArrowButton
          direction="up-right"
          onClick={() => imageSwiper?.slidePrev()}
        />
        <AnimatedArrowButton
          direction="down-left"
          onClick={() => imageSwiper?.slideNext()}
        />
      </motion.div>
    </div>
  );
};

export default BiningUnboxSortSlider;
