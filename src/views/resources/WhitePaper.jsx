"use client";

import React from "react";
import "./index.css";
import { animation } from "../../helpers/utils";
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
  const isFetchingMore = isValidating && whitePapers.length> 0;

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
        <div
          className="resources-title-main-div">
          <h1
            className="font-40-regular color-white">
            White Paper
          </h1>
          <p
            className="font-16-light color-white text-center max-w-[800px]">
            Access in-depth research and expert insights on the technologies
            driving the next wave of warehouse automation.
          </p>
        </div>
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
      {(isInitialLoading || whitePapers?.length> 0) && (
        <div className="bg-[#FDFDFD] class-gap">
          <div className="space-y-5">
            <p
              className="font-40-regular text-[#141313] ">
              All White Papers
            </p>
            <p
              className="font-16-light text-[#818382]">
              {total} publications found
            </p>
          </div>

          <div className="blogs-data-map-div">
            {whitePapers?.map((item, index) => {
              return (
                <div
                  key={index}>
                  <WhitePaperCard item={item} />
                </div>
              );
            })}
            {(isInitialLoading || isFetchingMore) &&
              Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={`skeleton-${idx}`}>
                  <WhitePaperSkeleton />
                </div>
              ))}
          </div>
          {hasMore && (
            <div
              className="self-center">
              <CommonButton
                title={isFetchingMore ? "Wait..." : "See More"}
                theme={"green"}
                onClick={handleSeeMore}
                disabled={isFetchingMore}
              />
            </div>
          )}
        </div>
      )}
      {(recentLoading || recentBlogs?.length> 0) && (
        <div className="bg-[#FDFDFD] class-gap">
          <div className="flex justify-between">
            <p
              className="font-40-regular text-[#141313] ">
              Recent Blogs
            </p>
            <div>
              <Link href={"/blogs"}>
                <CommonButton title={"View All"} theme={"green"} />
              </Link>
            </div>
          </div>

          <div className="blogs-data-map-div">
            {recentBlogs?.map((item, index) => {
              return (
                <div
                  key={index}>
                  <BlogCard item={item} />
                </div>
              );
            })}
            {recentLoading &&
              Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={`skeleton-blog-${idx}`}>
                  <BlogSkeleton />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default WhitePaper;
