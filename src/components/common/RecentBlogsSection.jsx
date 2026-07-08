"use client";

import React from "react";
import Link from "next/link";
import CommonButton from "./CommonButton";
import BlogCard from "./BlogCard";
import { animation } from "../../helpers/utils";

/**
 * RecentBlogsSection Component
 * Renders a list of recent blogs with consistent styling and animations.
 * 
 * @param {Array} recentBlogs - List of blog objects to display.
 * @param {string} title - Optional title for the section (default: "Recent Blogs").
 */
const RecentBlogsSection = ({ recentBlogs, title = "Recent Blogs" }) => {
  if (!recentBlogs || recentBlogs.length === 0) return null;

  return (
    <div className="bg-[#FDFDFD] class-gap">
      <div className="flex justify-between">
        <p
          className="font-medium text-[40px] text-[#141313] max-[1024px]:text-[26px]">
          {title}
        </p>
        <div>
          <Link href="/blogs">
            <CommonButton title="View All" theme="green" />
          </Link>
        </div>
      </div>

      <div className="blogs-data-map-div">
        {recentBlogs.map((item, index) => (
          <div
            key={item.slug || item.id || index}>
            <BlogCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBlogsSection;
