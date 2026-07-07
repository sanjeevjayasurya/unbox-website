"use client";

import React from "react";
import "../../views/resources/index.css";
import Link from "next/link";
import ImageComponent from "./ImageComponent";
import CommonButton from "./CommonButton";
import { backendUrl } from "../../helpers/config";

const PrNewsCard = ({ item }) => {
  const resolveAssetUrl = (assetPath) => {
    if (!assetPath) return "";
    return assetPath.startsWith("http")
      ? assetPath
      : `${backendUrl}${assetPath}`;
  };

  const imageUrl = resolveAssetUrl(item?.thumbnail_url || item?.media);
  const detailUrl = `/pr-news/${item?.slug}`;

  return (
    <div className="blogs-data-main-div pr-news-card h-full">
      <Link href={detailUrl} aria-label={item?.title}>
        <div className="pr-news-card-img bg-[#F5F5F5]">
          <ImageComponent
            src={imageUrl}
            className="common-img"
            alt={item?.title || "PR & News thumbnail"}
          />
          {!!item?.category && (
            <div className="blogs-data-type-div">
              <p className="font-14-regular color-black-1">{item?.category}</p>
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-col gap-2">
        {item?.date !== undefined && (
          <p className="font-14-regular !font-medium color-green-1">
            {item.date}
          </p>
        )}
        <Link href={detailUrl}>
          <p className="font-20-regular color-black-1 line-clamp-2">
            {item?.title}
          </p>
        </Link>
        {!!item?.description && (
          <p className="font-16-light color-black-1 line-clamp-3 opacity-80">
            {item?.description}
          </p>
        )}
      </div>
      <Link href={detailUrl} className="inline-block">
        <CommonButton title={"Read More"} theme={"gray"} />
      </Link>
    </div>
  );
};

export default PrNewsCard;
