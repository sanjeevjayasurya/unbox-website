"use client";

import React from "react";
import "./index.css";
import Link from "next/link";
import CommonButton from "./CommonButton";
import ImageComponent from "./ImageComponent";
import { backendUrl } from "../../helpers/config";

const WhitePaperCard = ({ item, redirect }) => {
  return (
    <div className="blogs-data-main-div">
      <div className="whitepaper-card-img-div bg-[#F5F5F5]">
        <ImageComponent src={backendUrl + item?.image} className="common-img" alt={item?.title || "White paper cover"} />
        {!!item?.type && (
          <div className="blogs-data-type-div">
            <p className="font-14-regular color-black-1">{item?.type}</p>
          </div>
        )}
      </div>
      <div className="space-y-[8px]">
        {!!item?.date && (
          <p className="font-14-regular color-green-1">{item.date}</p>
        )}
        <p className="font-20-regular color-black-1 line-clamp-2">
          {item?.title}
        </p>
        <p className="font-16-light text-[#818382] line-clamp-4">
          {item?.short_info}
        </p>
      </div>

      <Link href={`/white-paper/${item?.slug}`} className="self-start">
        <CommonButton theme={"gray"} title={"View More"} />
      </Link>
    </div>
  );
};

export default WhitePaperCard;
