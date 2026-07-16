"use client";

import React from "react";
import "./index.css";
import Link from "next/link";
import ImageComponent from "./ImageComponent";
import { resolveMediaUrl } from "../../helpers/config";

const BlogCard = ({ item, index, redirect }) => {
  return (
    <Link href={`/blogs/${item?.slug}`}>
      <div className="blogs-data-main-div cursor-pointer">
        <div className="blogs-data-img-div bg-[#F5F5F5]">
          <ImageComponent src={resolveMediaUrl(item?.image)} className="common-img" alt={item?.title || "Blog post thumbnail"} />
          {item?.type !== undefined && (
            <div className="blogs-data-type-div">
              <p className="font-14-regular color-black-1">{item?.type}</p>
            </div>
          )}
        </div>
        <div className="space-y-[6px]">
          {item?.date !== undefined && (
            <p className="font-14-regular color-green-1">{item.date}</p>
          )}
          <p className="font-20-regular color-black-1 line-clamp-2">
            {item.title}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
