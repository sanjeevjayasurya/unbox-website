"use client";

import React from "react";
import "./index.css";
import { animation } from "../../helpers/utils";
import { motion } from "framer-motion";
import CommonButton from "../../components/common/CommonButton";
import Link from "next/link";
import WhitePaperCard from "../../components/common/WhitePaperCard";
import BlogCard from "../../components/common/BlogCard";
import FeaturedCommonComponent from "./FeaturedCommonComponent";
import { frontendUrl } from "../../helpers/config";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import { useWhitePapers, useFeaturedWhitePaper, useRecentBlogs } from "../../hooks/useResources";
import WhitePaperSkeleton from "../../components/common/WhitePaperSkeleton";
import FeaturedSkeleton from "../../components/common/FeaturedSkeleton";
import BlogSkeleton from "../../components/common/BlogSkeleton";

const WhitePaper = () => {
  const { whitePapers, isLoading, size, setSize, hasMore, isValidating, total } = useWhitePapers(3);
  const { featuredWhitePaper, isLoading: featuredLoading } = useFeaturedWhitePaper();
  const { recentBlogs, isLoading: recentLoading } = useRecentBlogs("");

  const handleSeeMore = () => {
    setSize(size + 1);
  };

  const isInitialLoading = isLoading && whitePapers.length === 0;
  const isFetchingMore = isValidating && whitePapers.length > 0;

  return (
    <>
      <HelmetWrapper
        title={"White Paper"}
        description={
          "Access in-depth research and expert insights on the technologies driving the next wave of warehouse automation."
        }
        url={`${frontendUrl}/white-paper`}
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
            White Paper
          </motion.h1>
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={animation.fadeInUpVariant}
            viewport={{ once: true, amount: 0.2 }}
            className="font-16-light color-white text-center max-w-[800px]"
          >
            Access in-depth research and expert insights on the technologies
            driving the next wave of warehouse automation.
          </motion.p>
        </motion.div>
      </div>
      {featuredLoading ? (
        <FeaturedSkeleton />
      ) : (
        !!featuredWhitePaper && (
          <FeaturedCommonComponent
            title={"White Paper"}
            data={featuredWhitePaper}
            type="white-paper"
            redirectUrl={`/white-paper/${featuredWhitePaper?.slug}`}
          />
        )
      )}
      {(isInitialLoading || whitePapers?.length > 0) && (
        <div className="bg-[#FDFDFD] class-gap">
          <div className="space-y-5">
            <motion.p
              initial="hidden"
              whileInView="visible"
              variants={animation.fadeInUpVariant}
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              className="font-40-regular text-[#141313] "
            >
              All White Papers
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              variants={animation.fadeInUpVariant}
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
              className="font-16-light text-[#818382]"
            >
              {total} publications found
            </motion.p>
          </div>

          <div className="blogs-data-map-div">
            {whitePapers?.map((item, index) => {
              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={animation.fadeInUpVariant}
                  custom={index}
                >
                  <WhitePaperCard item={item} />
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
                  <WhitePaperSkeleton />
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
      {(recentLoading || recentBlogs?.length > 0) && (
        <div className="bg-[#FDFDFD] class-gap">
          <div className="flex justify-between">
            <motion.p
              initial="hidden"
              whileInView="visible"
              variants={animation.fadeInUpVariant}
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              className="font-40-regular text-[#141313] "
            >
              Recent Blogs
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={animation.fadeInUpVariant}
              viewport={{ once: true, amount: 0.2 }}
              custom={0.2}
            >
              <Link href={"/blogs"}>
                <CommonButton title={"View All"} theme={"green"} />
              </Link>
            </motion.div>
          </div>

          <div className="blogs-data-map-div">
            {recentBlogs?.map((item, index) => {
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
            {recentLoading &&
              Array.from({ length: 3 }).map((_, idx) => (
                <motion.div
                  key={`skeleton-blog-${idx}`}
                  initial="hidden"
                  animate="visible"
                  variants={animation.fadeInUpVariant}
                >
                  <BlogSkeleton />
                </motion.div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default WhitePaper;
