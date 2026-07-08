"use client";

import React, { useEffect, useState } from "react";
import "./index.css";
import { companyLogo, founderImage } from "../../helpers/assets";
import { animation } from "../../helpers/utils";
import MissionIcon from "../../assets/icons/mission.svg";
import VisionIcon from "../../assets/icons/vision.svg";
import LinkedInIcon from "../../assets/icons/s-linkedin.svg";
import { founderData, whyJoinAboutList } from "./config";
import AboutCompanySlider from "../../components/company/AboutCompanySlider";
import CommonButton from "../../components/common/CommonButton";
import AnimatedArrowButton from "../../components/common/AnimatedArrowButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller } from "swiper/modules";
import { useRouter } from "next/navigation";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import ImageComponent from "../../components/common/ImageComponent";
import { aboutSchema } from "../../helpers/schemas";

const aboutCompanyImage = process.env.PUBLIC_URL + "/images/about-company.webp";

const AboutCompanyPage = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [imageSwiper, setImageSwiper] = useState(null);

  return (
    <>
      <HelmetWrapper
        title="About Us"
        description="Elevating Fulfillment for digital commerce with intelligent vertical robotic sortation"
      />
      <SchemaMarkup schema={aboutSchema} />
      <div className="about-company-section-1">
        <div
          className="about-company-hero-section">
          <img
            src={aboutCompanyImage}
            className="common-img"
            alt="Unbox Robotics company overview"
            fetchPriority="high"
            draggable={false}
          />
          <div className="unbox-company-section-1-overlay">
            <div className="flex flex-col gap-[40px]">
              <h2
                className="font-100-bold text-center uppercase color-white">
                Unbox Robotics
              </h2>
              <p
                className="font-32-light color-white text-center max-w-[800px]">
                Elevating Fulfillment for digital commerce with intelligent
                vertical robotic sortation.
              </p>
              <div
                className="flex justify-center flex-wrap gap-3">
                <CommonButton
                  title={"Join the Team"}
                  onClick={() => router.push("/careers")}
                />
                <CommonButton
                  theme={"white"}
                  title={"Book a Demo"}
                  onClick={() => router.push("/get-in-touch")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#FDFDFD]">
        <div
          className="about-company-section-2">
          <div
            className="about-company-section-2-left">
            <ImageComponent
              src={companyLogo}
              alt="logo-image"
              className="object-contain w-full h-full object-center"
            />
          </div>
          <div
            className="about-company-section-2-right">
            <div
              className="about-company-mission-div">
              <div className="flex gap-[20px] items-center">
                <MissionIcon />
                <span className="font-20-semibold color-white">Mission</span>
              </div>
              <div className="flex flex-col gap-[14px]">
                <p className="font-20-semibold color-white">
                  Faster, Smarter, More Reliable Fulfillment
                </p>
                <p className="font-16-light color-white">
                  Our mission is to enable faster, smarter, and more reliable
                  order fulfillment through intelligent robotics designed for
                  the warehouses of tomorrow.
                </p>
              </div>
            </div>
            <div
              className="about-company-vision-div">
              <div className="flex gap-[20px] items-center">
                <VisionIcon />
                <span className="font-20-semibold color-white">Vision</span>
              </div>
              <div className="flex flex-col gap-[14px]">
                <p className="font-20-semibold color-white">
                  Defining the New Standard for Global Fulfillment Automation
                </p>
                <p className="font-16-light color-white">
                  To become the global leader in next-generation warehouse
                  automation, mastering robotics and software to empower
                  businesses and define the new standard for fulfillment
                  efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#141313]">
        <div
          className="about-company-section-3">
          <div>
            <span className="font-20-medium text-[#818382]">What we do?</span>
          </div>
          <div className="about-company-section-3-right">
            <p className="font-32-light color-white">
              We engineer next-generation intelligent robotics and AI-driven
              software to transform warehouse sortation and fulfillment. Our
              systems ensure unprecedented vertical efficiency and scalable
              throughput for every growing business worldwide.
            </p>
            <div className="founder-company-img">
              <ImageComponent
                src={founderImage}
                alt="company-img"
                className="common-img"
              />
            </div>
            <p className="font-32-light color-white">
              Our tech evolves with you, delivering efficiency today and
              innovation tomorrow. We’re redefining fulfillment operations with
              modular, next-generation solutions.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#FDFDFD]">
        <div
          className="about-company-section-4">
          <h1
            className="font-40-regular color-black-1 text-center">
            Meet the Founders
          </h1>
          <div className="about-company-section-inner">
            {isMobile ? (
              <Swiper
                modules={[Controller]}
                loop={true}
                slidesPerView="auto"
                onSwiper={setImageSwiper}
                spaceBetween={20}
                className="faces-swiper">
                {founderData?.map((item, index) => {
                  return (
                    <SwiperSlide className="faces-slide" key={item?.id}>
                      <div>
                        <ImageComponent
                          src={item?.image}
                          className="common-img"
                          alt={item?.name}
                        />
                        <div className="founder-team-info">
                          <p className="font-20-regular color-black-1">
                            {item?.name}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="font-16-regular text-[#818382]">
                              {item?.status}
                            </span>
                            <div className="flex gap-[10px] items-center">
                              {!!item?.linkedIn && (
                                <a
                                  href={item?.linkedIn}
                                  target="_blank"
                                  rel="noreferrer"
                                  aria-label={`${item?.name} on LinkedIn`}>
                                  <LinkedInIcon aria-hidden="true" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
              founderData?.map((item, index) => {
                return (
                  <div
                    className="founder-team-card"
                    key={item?.id}>
                    <ImageComponent
                      src={item?.image}
                      className="common-img"
                      alt={item?.name}
                    />
                    <div className="founder-team-info">
                      <p className="font-20-regular color-black-1">
                        {item?.name}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-16-regular text-[#818382]">
                          {item?.status}
                        </span>
                        <div className="flex gap-[10px] items-center">
                          {!!item?.linkedIn && (
                            <a
                              href={item?.linkedIn}
                              target="_blank"
                              rel="noreferrer">
                              <LinkedInIcon />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {isMobile && (
            <div className="flex items-center gap-[12px] self-center">
              <AnimatedArrowButton
                direction="up-right"
                onClick={() => imageSwiper?.slidePrev()}
              />
              <AnimatedArrowButton
                direction="down-left"
                onClick={() => imageSwiper?.slideNext()}
              />
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#FDFDFD]">
        <div
          className="about-company-section-5">
          <h1
            className="font-40-regular color-black-1 text-center">
            Our Origin Story
          </h1>
          <div className="w-full">
            <AboutCompanySlider />
          </div>
        </div>
      </div>

      <div className="bg-[#FDFDFD]">
        <div
          className="about-company-section-6">
          <div className="flex flex-col gap-[20px] items-center max-w-[800px]">
            <h1
              className="font-40-regular color-black-1 text-center">
              Why join Unbox Robotics?
            </h1>
            <p
              className="font-16-light color-grey-1 text-center">
              Be part of a bold mission to revolutionize warehouse automation.
              <br />
              Here’s why Unbox stands out:
            </p>
          </div>
          <div className="why-join-about-map-div">
            {whyJoinAboutList?.map((item, index) => {
              return (
                <div
                  className="founder-team-card-2"
                  key={item?.id}>
                  <ImageComponent
                    src={item?.image}
                    className="common-img"
                    alt={item?.title}
                  />
                  <div className="why-join-about-info">
                    <span className="font-20-medium color-white">
                      {item?.title}
                    </span>
                    <span className="font-14-regular color-white">
                      {item?.description}
                    </span>
                  </div>
                  <div className="why-us-progressive-blur common-overlay" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutCompanyPage;
