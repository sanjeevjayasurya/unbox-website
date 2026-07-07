"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { animation } from "../../helpers/utils";
import CommonButton from "../../components/common/CommonButton";
import { backendUrl } from "../../helpers/config";

const FeaturedPrNewsComponent = ({ data, redirectUrl }) => {
  const resolveAssetUrl = (assetPath) => {
    if (!assetPath) return "";
    return assetPath.startsWith("http")
      ? assetPath
      : `${backendUrl}${assetPath}`;
  };

  const imageUrl = resolveAssetUrl(data?.thumbnail_url || data?.media);

  return (
    <div className="bg-[#FDFDFD] class-gap">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={animation.fadeInUpVariant}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="flex flex-row gap-4 items-center justify-start max-[1024px]:justify-center">
          <p className="font-40-medium text-[#141313]">Featured Event</p>
          <div className="px-[16px] py-[10px] bg-[#079D921A] rounded-[100px] items-center justify-center flex">
            <p className="font-normal text-[16px] text-[#079D92] max-[1024px]:text-[14px]">
              Next Up
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex bg-[#F5F5F5] rounded-[24px] gap-[20px] max-[768px]:gap-3 p-5 max-[768px]:p-3 max-[1024px]:flex-col">
          <div className="w-[440px] h-auto rounded-[20px] overflow-hidden max-[1024px]:w-full max-[1024px]:h-[458px] max-[768px]:h-[300px]">
            <img
              src={imageUrl}
              alt={data?.title || "Featured PR & News"}
              className="common-img"
              fetchPriority="high"
              loading="eager"
              draggable={false}
            />
          </div>
          <div className="flex items-start flex-col justify-center gap-6 flex-1 p-[10px] max-[768px]:gap-3">
            {!!data?.category && (
              <p className="font-16-regular !font-semibold uppercase color-green-1 tracking-wide">
                {data?.category}
              </p>
            )}
            <p className="font-32-light !font-medium text-[#141313] max-[768px]:!font-20-light">
              {data?.title}
            </p>
            <p className="font-16-light text-[#141313CC] !leading-[24px] line-clamp-5">
              {data?.description}
            </p>

            <Link
              href={redirectUrl}
              aria-label={`Read the full story: ${data?.title || "Featured PR & News"}`}
            >
              <CommonButton title={"Read Full Story"} theme={"green"} />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturedPrNewsComponent;
