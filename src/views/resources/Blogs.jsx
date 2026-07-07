"use client";

import React from "react";
import { animation } from "../../helpers/utils";
import { motion } from "framer-motion";
import "./index.css";
import CommonButton from "../../components/common/CommonButton";
import BlogCard from "../../components/common/BlogCard";
import FeaturedCommonComponent from "./FeaturedCommonComponent";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import { frontendUrl } from "../../helpers/config";
import { useBlogs, useFeaturedBlog } from "../../hooks/useResources";
import BlogSkeleton from "../../components/common/BlogSkeleton";
import FeaturedSkeleton from "../../components/common/FeaturedSkeleton";
import { blogsSchema } from "../../helpers/schemas";

const Blogs = () => {
  const { blogs, isLoading, size, setSize, hasMore, isValidating } = useBlogs(3);
  const { featuredBlog, isLoading: featuredLoading } = useFeaturedBlog();

  const handleSeeMore = () => {
    setSize(size + 1);
  };

  const isInitialLoading = isLoading && blogs.length === 0;
  const isFetchingMore = isValidating && blogs.length > 0;

  return (
    <>
      <HelmetWrapper
        title="Blogs"
        description="Updates, innovations, and insights powering the next evolution of robotic logistics."
        url={`${frontendUrl}/blogs`}
      />
      <div className="resources-main-div-2">
        <motion.div
          className="resources-title-main-div"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h1
            initial="hidden"
            whileInView="visible"
            variants={animation.fadeInUpVariant}
            viewport={{ once: true, amount: 0.2 }}
            className="font-40-regular color-white"
          >
            Blogs
          </motion.h1>
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={animation.fadeInUpVariant}
            viewport={{ once: true, amount: 0.2 }}
            className="font-16-light color-white text-center"
          >
            Updates, innovations, and insights powering the next evolution of
            robotic logistics.
          </motion.p>
        </motion.div>
      </div>
      {featuredLoading ? (
        <FeaturedSkeleton />
      ) : (
        !!featuredBlog && (
          <FeaturedCommonComponent
            title={"Blog"}
            data={featuredBlog}
            type="blogs"
            redirectUrl={`/blogs/${featuredBlog?.slug}`}
          />
        )
      )}
      {(isInitialLoading || blogs?.length > 0) && (
        <div className="bg-[#FDFDFD] class-gap">
          <div className="flex flex-row gap-4 items-center justify-start max-[1024px]:justify-center">
            <motion.p
              initial="hidden"
              whileInView="visible"
              variants={animation.fadeInUpVariant}
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              className="font-40-regular text-[#141313] "
            >
              Blogs
            </motion.p>
          </div>

          <div className="blogs-data-map-div">
            {blogs?.map((item, index) => {
              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={animation.fadeInUpVariant}
                  custom={index}
                >
                  <BlogCard item={item} />
                </motion.div>
              );
            })}
            {(isInitialLoading || isFetchingMore) &&
              Array.from({ length: 3 }).map((_, idx) => (
                <motion.div
                  key={`skeleton-${idx}`}
                  initial="hidden"
                  animate="visible"
                  variants={animation.fadeInUpVariant}
                >
                  <BlogSkeleton />
                </motion.div>
              ))}
          </div>

          {hasMore && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={animation.fadeInUpVariant}
              viewport={{ once: true, amount: 0.2 }}
              className="self-center"
            >
              <CommonButton
                title={isFetchingMore ? "Wait..." : "See More"}
                theme={"green"}
                onClick={handleSeeMore}
                disabled={isFetchingMore}
              />
            </motion.div>
          )}
        </div>
      )}
    </>
  );
};

export default Blogs;
