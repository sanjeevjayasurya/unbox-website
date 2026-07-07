"use client";

import React from "react";
import { motion } from "framer-motion";
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
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={animation.fadeInUpVariant}
          viewport={{ once: true, amount: 0.2 }}
          custom={0}
          className="font-medium text-[40px] text-[#141313] max-[1024px]:text-[26px]"
        >
          {title}
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={animation.fadeInUpVariant}
          viewport={{ once: true, amount: 0.2 }}
          custom={0.2}
        >
          <Link href="/blogs">
            <CommonButton title="View All" theme="green" />
          </Link>
        </motion.div>
      </div>

      <div className="blogs-data-map-div">
        {recentBlogs.map((item, index) => (
          <motion.div
            key={item.slug || item.id || index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={animation.fadeInUpVariant}
            custom={index}
          >
            <BlogCard item={item} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentBlogsSection;
