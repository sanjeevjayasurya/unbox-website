"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "./index.css";

import {
  productCommingSoon1Image,
  productCommingSoon2Image,
  unboxProductImage,
} from "../../helpers/assets";
import AnimatedArrowButton from "../common/AnimatedArrowButton";
import Link from "next/link";
import ImageComponent from "../common/ImageComponent";

const productData = [
  {
    id: 1,
    image: unboxProductImage,
    title: "UnboxSort",
    description: "AI Powered Sortation Solution",
    status: "active",
    navigate: "solutions-overview",
  },
  { id: 2, image: productCommingSoon1Image, status: "comingSoon" },
  { id: 3, image: productCommingSoon2Image, status: "comingSoon" },
];

const ProductSlider = () => {
  const [imageSwiper, setImageSwiper] = useState(null);

  return (
    <div className="slider-container">
      <div>
        <Swiper
          modules={[Navigation, FreeMode]}
          loop={true}
          freeMode={true}
          slidesPerView={"auto"}
          onSwiper={setImageSwiper}
          spaceBetween={20}
          className="product-swiper"
        >
          {productData.map((product) => (
            <SwiperSlide
              key={product.id}
              className="product-slide bg-[#a5a6a3]"
            >
              {product.status === "active" ? (
                <Link
                  href={`/${product?.navigate}`}
                  className="slide-content-active group"
                >
                  <ImageComponent
                    src={product.image}
                    alt={product.title}
                    className="common-img  transition-transform ease-linear duration-300"
                  />
                  <div className="product-info-overlay">
                    <h3 className="product-slider-title color-white">
                      {product.title}
                    </h3>
                    <p className="product-slider-description text-[#F0F0F0] text-center">
                      {product.description}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="slide-content-coming-soon">
                  <img
                    src={product.image}
                    alt={`${product.title} - coming soon`}
                    className="common-img"
                  />
                  <div className="comming-soon-overlay">
                    <h3 className="font-32-medium color-white">On the way…</h3>
                  </div>
                </div>
              )}
              <div className="product-badge font-10-light color-black-1">
                {`${product?.id} / ${productData?.length}`}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex gap-[12px]">
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

export default ProductSlider;
