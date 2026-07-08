"use client";

import React, { useEffect } from "react";
import { animation } from "../../helpers/utils";
import CommonButton from "../../components/common/CommonButton";
import { useRouter } from "next/navigation";
import { clientInfo } from "../../helpers/config";
import LogoScroller from "../../components/home/LogoScroller";
import IndustryUseCases from "../../components/indusry/IndustryUseCases";
import demoBackgroundVideo from "../../assets/video/back-home-2.mp4";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import { industrySchema } from "../../helpers/schemas";

const industryPoster = process.env.PUBLIC_URL + "/images/industry-poster.webp";

const IndustryPage = () => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HelmetWrapper
        title="Industry"
        description="Optimized Sortation for Leading Industries"
      />

            <SchemaMarkup schema={industrySchema} />
{/* header */}
      <div className="bg-[#FDFDFD]">
        <div
          className="technology-header">
          <div className="flex flex-col gap-[14px] md:gap-[20px] max-w-[828px]">
            <h1
              className="font-40-regular color-black-1 text-center">
              Optimized Sortation for Leading Industries
            </h1>
            <p
              className="font-16-light color-grey-1 text-center max-w-[800px]">
              We provide scalable, high-throughput automation engineered to
              meet the unique and dynamic demands of E-commerce, 3PL, Retail,
              and Courier & Parcel (CEP) sectors worldwide.
            </p>
          </div>
          <div
            className="git-container">
            <video
              src={demoBackgroundVideo}
              poster={industryPoster}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              fetchPriority="high"
              draggable={false}
              className="common-img"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#FDFDFD] technology-section-6">
        <div className="w-full">
          <IndustryUseCases />
        </div>
      </div>

      {/* client section */}
      <div className="bg-[#FDFDFD]">
        <div
          className="client-info-container">
          <div className="flex flex-col gap-[14px] md:gap-[20px] max-w-[800px] px-[20px] md:px-[40px]">
            <h1
              className="font-40-regular color-black-1 text-center">
              Trusted by Industry Leaders
            </h1>
            <p
              className="font-16-light color-grey-1 text-center">
              Clients choose Unbox Robotics for compact, scalable automation
              that delivers unmatched speed and precision.
            </p>
          </div>
          <div className="w-full">
            <LogoScroller clients={clientInfo} speed="fast" />
          </div>
        </div>
      </div>

      <div
        className="bg-[#141313] mb-10 py-20 px-15 flex flex-col gap-[60px] items-center justify-center">
        <h1
          className="font-40-regular text-white text-center max-w-[836px]">
          Find out why some of the biggest industry brands trust our
          technology
        </h1>
        <div>
          <CommonButton
            theme={"white"}
            title={"Get In Touch"}
            onClick={() => router.push("/get-in-touch")}
          />
        </div>
      </div>
    </>
  );
};

export default IndustryPage;
