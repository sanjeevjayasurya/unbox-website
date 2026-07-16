"use client";

import React from "react";
import Link from "next/link";
import File from "../../assets/icons/FileText.svg";
import Timer from "../../assets/icons/timer.svg";
import { animation } from "../../helpers/utils";
import CommonButton from "../../components/common/CommonButton";
import { resolveMediaUrl } from "../../helpers/config";

const FeaturedCommonComponent = ({
  title,
  type = "blogs",
  data,
  redirectUrl,
}) => {
  const isCaseStudy = type === "case-study";

  const videoThumbnailUrl = resolveMediaUrl(
    data?.thumbnail_url || data?.media || data?.image,
  );

  return (
    <div className="bg-[#FDFDFD] class-gap">
      <div>
        <div className="flex flex-row gap-4 items-center justify-start max-[1024px]:justify-center">
          <p className="font-40-medium text-[#141313] ">Featured {title}</p>
          <div className="px-[16px] py-[10px] bg-[#079D921A] rounded-[100px] items-center justify-center flex ">
            <p className="font-normal text-[16px] text-[#079D92] max-[1024px]:text-[14px]">
              New
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex bg-[#079D92] rounded-[24px] gap-[20px] max-[768px]:gap-3 p-5 max-[1024px]:flex-col">
          <div className="w-[440px] h-[400px] bg-[#F5F5F5] rounded-[20px] overflow-hidden max-[1024px]:w-full max-[1024px]:h-[458px]  max-[768px]:h-[300px]">
            <img
              src={
                isCaseStudy ? videoThumbnailUrl : resolveMediaUrl(data?.image)
              }
              alt={data?.title || "Featured content thumbnail"}
              className="common-img"
              fetchPriority="high"
              loading="eager"
              draggable={false}
            />
          </div>
          <div className="flex items-start flex-col justify-between gap-6 flex-1 p-[10px] max-[768px]:gap-3">
            <p className="font-16-semibold uppercase !tracking-[0.6px] text-white">
              {type === "case-study" || type === "white-paper"
                ? title
                : data?.category}
            </p>
            <p className="font-36-light !font-medium text-white max-[768px]: !font-20-light">
              {data?.title}
            </p>
            <p className="font-16-light text-[#FFFFFFE5] !leading-[24px] line-clamp-5">
              {data?.description}
            </p>
            {type !== "blogs" && (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <File aria-hidden="true" />
                  <p className="font-14-regular text-[#FFFFFFE5] ">
                    {data?.totalPages} pages
                  </p>
                </div>
                <div className="flex items-center  gap-2">
                  <Timer aria-hidden="true" />
                  <p className="font-14-regular text-[#FFFFFFE5] ">
                    Read time: {data?.read_time} minutes
                  </p>
                </div>
              </div>
            )}
            <Link href={redirectUrl} aria-label={`Read more about ${data?.title || title}`}>
              <CommonButton title={"Read More"} theme={"white"} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCommonComponent;
