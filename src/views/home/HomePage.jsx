"use client";

import React, { useEffect, Suspense, lazy } from "react";
import "./index.css";
import WarehouseShowcase from "../../components/home/WarehouseShowcase";
import Faq from "../../components/home/Faq";
import {
  unboxIntroImage,
  warehouseImage3,
} from "../../helpers/assets";
import CommonButton from "../../components/common/CommonButton";
import LogoScroller from "../../components/home/LogoScroller";
import { clientInfo, faqData } from "../../helpers/config";
import StickyScrollFill from "../../components/home/StickyScrollFill";
import { useRouter } from "next/navigation";
import ImageComponent from "../../components/common/ImageComponent";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import { homeSchema } from "../../helpers/schemas";

const ProductSlider = lazy(() => import("../../components/home/ProductSlider"));

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HelmetWrapper
        title="Home"
        description="Unleash blazing fast sortation & order consolidation through swarm robotics! Reach your customers faster via scalable automation that adapts to your business needs."
      />
      <SchemaMarkup schema={homeSchema} />
      <div className="home-page-ware-house-container">
        <WarehouseShowcase />
      </div>

      <div className="bg-[#FDFDFD]">
        <div className="client-info-container">
          <div className="flex flex-col gap-[14px] md:gap-[20px]  px-[20px] md:px-[40px]">
            <h1 className="font-40-regular color-black-1 text-center">
              Proven with global scale & trusted by biggest names in logistics
            </h1>
            <p className="font-16-light color-grey-1 text-center max-w-[800px] mx-auto">
              Partnering with world-class logistics and e-commerce leaders who
              trust our robotics and engineering excellence to power resilient,
              scalable operations.
            </p>
          </div>
          <div className="w-full">
            <LogoScroller clients={clientInfo} speed="fast" />
          </div>
        </div>
      </div>

      <StickyScrollFill />

      <div className="bg-[#FDFDFD]">
        <div className="introduction-container">
          <div className="flex flex-col gap-[14px] md:gap-[20px] max-w-[800px]">
            <h1 className="font-40-regular color-black-1 text-center">
              Meet our flagship product - UnboxSort
            </h1>
            <p className="font-16-light color-grey-1 text-center">
              The industry's most flexible and fastest time-to-value robotics
              sortation solution, modernizing e-commerce and urban logistics
              operations.
            </p>
          </div>

          <div className="flex flex-col gap-[10px] md:gap-[20px] w-full lg:flex-row">
            <div className="unbox-intro-container">
              <ImageComponent
                src={unboxIntroImage}
                alt="Unbox Robotics robotic sortation system introduction"
                className="common-img"
              />
            </div>

            <div className="unbox-intro-section flex-1">
              <div className="flex flex-col gap-[10px] md:flex-row md:gap-[20px]">
                <div className="unbox-intro-section-1 flex-1">
                  <div className="flex flex-col gap-[10px]">
                    <h2 className="font-40-semibold color-black-1 uppercase">
                      Driven by Swarm Intelligence
                    </h2>
                    <p className="font-16-light color-black-1">
                      UnboxSort deploys a fleet of high speed robots that work
                      in 3D space using Swarm Intelligence to sort parcels
                      accurately & safely.
                    </p>
                  </div>
                  <CommonButton
                    theme={"green"}
                    title={"Explore More"}
                    onClick={() => router.push("/solutions-overview")}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[10px] md:flex-row md:gap-[20px]">
                <div className="flex-1 intro-card bg-[#141313]">
                  <div className="flex flex-col gap-[10px]">
                    <h3 className="font-16-semibold color-white">
                      Requires minimal to no software integration
                    </h3>
                    <p className="font-14-light color-white">
                      Deploy fast with minimal IT effort - our solution works
                      with your existing systems seamlessly without heavy
                      integration.
                    </p>
                  </div>
                </div>

                <div className="flex-1 intro-card bg-[#079D92]">
                  <div className="flex flex-col gap-[10px]">
                    <h3 className="font-16-semibold color-white">
                      Operationally Resilient by Design
                    </h3>
                    <p className="font-14-light color-white">
                      Designed without single points of failure, ensuring
                      consistent throughput and high uptime during peak
                      operations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[10px] md:flex-row md:gap-[20px]">
                <div className="unbox-intro-section-1 flex-1">
                  <div className="flex flex-col gap-[20px]">
                    <h2 className="font-20-semibold color-black-1 uppercase">
                      Built for Modern Logistics Networks
                    </h2>
                    <p className="font-16-light color-black-1">
                      Deployed in fulfillment centers, sort centers, delivery
                      hubs and return facilities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#FDFDFD]">
        <div className="impact-container">
          <div className="flex flex-col gap-[14px] md:gap-[20px] max-w-[800px]">
            <h2 className="font-40-regular color-black-1 text-center">
              Proven results repeatedly
            </h2>
            <p className="font-16-light color-grey-1 text-center">
              Check out the measurable gains in throughput, accuracy, and
              operational cost reduction achieved on actual projects by our
              global partners.
            </p>
          </div>
          <div className="w-full h-[600px] max-lg:h-[500px] max-md:h-[400px] max-sm:h-[300px] ">
            <ImageComponent
              className="common-img !object-contain"
              src={warehouseImage3}
              alt="UnboxSort deployed in a fulfilment warehouse"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#FDFDFD]">
        <div className="unbox-solution-container">
          <div className="flex flex-col gap-[14px] md:gap-[20px]  max-w-[800px]">
            <h2 className="font-40-regular color-black-1 text-center">
              Unbox suite of solutions
            </h2>
            <p className="font-16-light color-grey-1 text-center">
              Discover our robotics lineup, built to elevate warehouses with
              speed, precision, and scalability.
            </p>
          </div>
          <div className="w-full">
            <Suspense fallback={null}>
              <ProductSlider />
            </Suspense>
          </div>
        </div>
      </div>

      <Faq data={faqData?.slice(0,7)} exploreBtnVisible={true}/>
    </>
  );
};

export default HomePage;
