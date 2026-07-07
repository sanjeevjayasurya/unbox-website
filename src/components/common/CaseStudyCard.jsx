"use client";

import React from "react";
import "./index.css";
import Link from "next/link";
import ImageComponent from "./ImageComponent";
import { backendUrl } from "../../helpers/config";

const CaseStudyCard = ({ item, redirect }) => {

  const resolveAssetUrl = (assetPath) => {
    if (!assetPath) return "";
    return assetPath.startsWith("http")
      ? assetPath
      : `${backendUrl}${assetPath}`;
  };

  const videoThumbnailUrl = resolveAssetUrl(item?.thumbnail_url || item?.media);

  return (
    <Link href={`/case-study/${item?.slug}`}>
      <div className="blogs-data-main-div cursor-pointer">
        <div className="blogs-data-img-div bg-[#F5F5F5]">
          <ImageComponent src={videoThumbnailUrl} className="common-img" alt={item?.title || "Case study thumbnail"} />

          {item?.type !== undefined && (
            <div className="blogs-data-type-div">
              <p className="font-14-regular color-black-1">{item?.type}</p>
            </div>
          )}
        </div>
        <div className="space-y-[6px]">
          <div className="flex items-center justify-between gap-4">
            {item?.date !== undefined && (
              <p className="font-14-regular !font-medium color-green-1">{item.date}</p>
            )}
            {!!item?.tags && (
              <p className="font-14-regular color-green-1 ">{item?.tags}</p>
            )}
          </div>
          <p className="font-20-regular color-black-1 line-clamp-2">
            {item.title}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CaseStudyCard;
