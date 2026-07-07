"use client";

import React from "react";
import "./index.css";
import { animation } from "../../helpers/utils";
import { motion } from "framer-motion";
import CommonButton from "../../components/common/CommonButton";
import Link from "next/link";
import CaseStudyCard from "../../components/common/CaseStudyCard";
import BlogCard from "../../components/common/BlogCard";
import FeaturedCommonComponent from "./FeaturedCommonComponent";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import { frontendUrl } from "../../helpers/config";
import { useCaseStudies, useFeaturedCaseStudy, useRecentBlogs } from "../../hooks/useResources";
import CaseStudySkeleton from "../../components/common/CaseStudySkeleton";
import FeaturedSkeleton from "../../components/common/FeaturedSkeleton";
import BlogSkeleton from "../../components/common/BlogSkeleton";
import FeaturedCasestudyComponent from "./FeaturedCasestudyComponent";
import { caseStudyListingSchema } from "../../helpers/schemas";

const CaseStudy = () => {
  const { caseStudies, isLoading, size, setSize, hasMore, isValidating } = useCaseStudies(3);
  const { featuredCaseStudy, isLoading: featuredLoading } = useFeaturedCaseStudy();
  const { recentBlogs, isLoading: recentLoading } = useRecentBlogs("");

  const handleSeeMore = () => {
    setSize(size + 1);
  };

  const isInitialLoading = isLoading && caseStudies.length === 0;
  const isFetchingMore = isValidating && caseStudies.length > 0;

  return (
    <>
      <HelmetWrapper
        title={"Case Study"}
        description={
          "Dive into real-world examples of how Unbox Robotics is helping logistics, e-commerce, and retail leaders achieve operational excellence."
        }
        url={`${frontendUrl}/case-study`}
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
            Case Study
          </motion.h1>
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={animation.fadeInUpVariant}
            viewport={{ once: true, amount: 0.2 }}
            className="font-16-light color-white text-center max-w-[800px]"
          >
            Dive into real-world examples of how Unbox Robotics is helping
            logistics, e-commerce, and retail leaders achieve operational
            excellence.
          </motion.p>
        </motion.div>
      </div>

      {featuredLoading ? (
        <FeaturedSkeleton />
      ) : (
        !!featuredCaseStudy && (
          <FeaturedCasestudyComponent
            title={"Case Study"}
            data={featuredCaseStudy}
            redirectUrl={`/case-study/${featuredCaseStudy?.slug}`}
          />
        )
      )}
      {(isInitialLoading || caseStudies?.length > 0) && (
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
              Case Studies
            </motion.p>
          </div>

          <div className="blogs-data-map-div">
            {caseStudies?.map((item, index) => {
              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={animation.fadeInUpVariant}
                  custom={index}
                >
                  <CaseStudyCard item={item} />
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
                  <CaseStudySkeleton />
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
              className="font-40-regular text-[#141313]"
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

export default CaseStudy;
