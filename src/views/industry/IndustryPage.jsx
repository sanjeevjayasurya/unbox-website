"use client";

import React, { useEffect } from "react";
import { animation } from "../../helpers/utils";
import { motion } from "framer-motion";
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
        <motion.div
          className="technology-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col gap-[14px] md:gap-[20px] max-w-[828px]">
            <motion.h1
              className="font-40-regular color-black-1 text-center"
              custom={0}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              Optimized Sortation for Leading Industries
            </motion.h1>
            <motion.p
              className="font-16-light color-grey-1 text-center max-w-[800px]"
              custom={1}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              We provide scalable, high-throughput automation engineered to
              meet the unique and dynamic demands of E-commerce, 3PL, Retail,
              and Courier & Parcel (CEP) sectors worldwide.
            </motion.p>
          </div>
          <motion.div
            className="git-container"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
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
          </motion.div>
        </motion.div>
      </div>

      <div className="bg-[#FDFDFD] technology-section-6">
        <div className="w-full">
          <IndustryUseCases />
        </div>
      </div>

      {/* client section */}
      <div className="bg-[#FDFDFD]">
        <motion.div
          className="client-info-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col gap-[14px] md:gap-[20px] max-w-[800px] px-[20px] md:px-[40px]">
            <motion.h1
              className="font-40-regular color-black-1 text-center"
              custom={0}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              Trusted by Industry Leaders
            </motion.h1>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              Clients choose Unbox Robotics for compact, scalable automation
              that delivers unmatched speed and precision.
            </motion.p>
          </div>
          <div className="w-full">
            <LogoScroller clients={clientInfo} speed="fast" />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-[#141313] mb-10 py-20 px-15 flex flex-col gap-[60px] items-center justify-center"
      >
        <motion.h1
          className="font-40-regular text-white text-center max-w-[836px]"
          custom={0}
          variants={animation.fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          Find out why some of the biggest industry brands trust our
          technology
        </motion.h1>
        <motion.div
          custom={1}
          variants={animation.fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <CommonButton
            theme={"white"}
            title={"Get In Touch"}
            onClick={() => router.push("/get-in-touch")}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default IndustryPage;
