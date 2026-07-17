"use client";

import React, { useEffect, useRef } from "react";
import "./index.css";
import SolutionOverviewHeroSection from "../../components/solutions/SolutionOverviewHeroSection";
import { animation } from "../../helpers/utils";
import { largeLayoutImage } from "../../helpers/assets";
import CommonButton from "../../components/common/CommonButton";
import { usePathname, useRouter } from "next/navigation";
import SolutionBindingSlider from "../../components/solutions/SolutionBindingSlider";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import ImageComponent from "../../components/common/ImageComponent";
import { solutionOverviewSchema } from "../../helpers/schemas";

const SolutionOverviewPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  // 👇 This will be used to scroll slider into center
  const sliderRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Center scroll when user lands with hash
  useEffect(() => {
    if (!location.hash) return;

    // wait for slider + animations to mount
    const timer = setTimeout(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollIntoView({
          block: "center",
        });
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [location.hash]);

  return (
    <>
      <HelmetWrapper
        title="Solutions"
        description="Enabling the Next Generation of Logistics & Fulfillment Operations"
      />
      <SchemaMarkup schema={solutionOverviewSchema} />
      <div className="home-page-ware-house-container">
        <SolutionOverviewHeroSection />

        <div
          className="mt-[40px] mobile-hidden">
          <p className="res-font-16-light color-grey-1 text-center">
            As logistics networks become faster, denser, and more
            interconnected, parcel sortation has evolved from a backend
            operation into a strategic capability. UnboxSort enables modern
            fulfillment centres, sort hubs, and delivery networks to operate
            with speed, precision, and flexibility at scale.
          </p>
        </div>
      </div>

      <section className="relative overflow-hidden w-full">
        <div className="solution-overview-section-3" ref={sliderRef}>
          <div className="flex flex-col gap-[14px] md:gap-[20px]  max-w-[800px]">
            <h1
              className="font-40-regular color-black-1 text-center">
              Modern Fulfillment & Logistics Workflows Powered by UnboxSort
            </h1>
          </div>

          <div className="w-full">
            <SolutionBindingSlider />
          </div>
        </div>
      </section>

      <div className="bg-[#FDFDFD]">
        <div
          className="unbox-solution-container">
          <div className="flex flex-col gap-[14px] md:gap-[20px]  max-w-[1000px]">
            <h1
              className="font-40-regular color-black-1 text-center">
              One Modern Sortation Platform. <br />
              Many Operational Models.
            </h1>
            <p
              className="font-16-light color-grey-1 text-center">
              UnboxSort is designed for the way modern logistics operates:
              modular, adaptable, and data-driven. Across fulfillment centres,
              sort hubs, distribution centres, and delivery networks, UnboxSort
              enables operators to scale intelligently while maintaining speed,
              accuracy, and control.
            </p>

            <div
              className="flex justify-center mt-4">
              <CommonButton
                theme={"green"}
                title={"Explore More"}
                onClick={() => router.push("/solutions-unbox-sort")}
              />
            </div>
          </div>
          <div
            className="w-full h-[682px] max-lg:h-[400px] max-sm:h-[250px] overflow-hidden rounded-[40px] max-lg:rounded-[20px] max-sm:rounded-[12px]">
            <ImageComponent
              src={largeLayoutImage}
              alt="UnboxSort warehouse overview"
              className="common-img"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SolutionOverviewPage;
