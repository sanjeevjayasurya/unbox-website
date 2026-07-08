"use client";

import React from "react";
import Link from "next/link";
import File from "../../assets/icons/FileText.svg";
import Timer from "../../assets/icons/timer.svg";
import { animation } from "../../helpers/utils";
import CommonButton from "../../components/common/CommonButton";
import { backendUrl } from "../../helpers/config";

const FeaturedCasestudyComponent = ({ title, data, redirectUrl }) => {
  const resolveAssetUrl = (assetPath) => {
    if (!assetPath) return "";
    return assetPath.startsWith("http")
      ? assetPath
      : `${backendUrl}${assetPath}`;
  };

  const videoThumbnailUrl = resolveAssetUrl(
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
        <div className="flex bg-[#079D92] rounded-[24px] gap-[20px] max-[768px]:gap-3 p-5  max-[768px]:p-3 max-[1024px]:flex-col">
          <div className="w-[440px] h-auto  rounded-[20px] overflow-hidden max-[1024px]:w-full max-[1024px]:h-[458px]  max-[768px]:h-[300px]">
            <img
              src={videoThumbnailUrl}
              alt={data?.title || "Case study thumbnail"}
              className="common-img"
              fetchPriority="high"
              loading="eager"
              draggable={false}
            />
          </div>
          <div className="flex items-start flex-col justify-between gap-6 flex-1 p-[10px] max-[768px]:gap-3">
            <p className="font-32-light !font-medium text-white max-[768px]: !font-20-light">
              {data?.title}
            </p>
            <p className="font-16-light text-[#FFFFFFE5] !leading-[24px] line-clamp-5">
              {data?.description}
            </p>

            <Link href={redirectUrl} aria-label={`Read the full story: ${data?.title || title}`}>
              <CommonButton title={"Read the full story"} theme={"white"} />
            </Link>

            {(data?.clientName || data?.clientMessage) && (
              <div className="flex items-center gap-4 p-4 border border-[#FFFFFF33] rounded-lg  bg-[#FFFFFF0D]">
                {/* <div className="w-[80px] h-[80px] bg-white rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img
                    src={resolveAssetUrl(data?.clientImage)}
                    alt="Client Logo"
                    className="w-[80%] h-auto"
                  />
                </div> */}
                <div className="flex flex-col gap-2">
                  <p className="font-14-light text-white italic">
                    "
                    {data?.clientMessage ||
                      "What stood out was their ability to quickly evolve and meet our integration needs."}
                    "
                  </p>
                  <p className="font-14-regular text-white opacity-80">
                    -
                    {data?.clientName ||
                      "Open Innovation & Logistics Hub, Inditex"}
                  </p>
                </div>
              </div>
            )}

            <div className="w-full flex items-center justify-between flex-wrap gap-6">
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
              {!!data?.tags && (
                <p className="font-14-regular text-white ">
                  {data?.tags}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCasestudyComponent;
