"use client";

import Link from "next/link";
import "./index.css";
import EventPageHeroSection from "./EventPageHeroSection";
import FeaturedEvent from "./FeaturedEvent";
import WhereToFindUs from "./WhereToFindUs";
import ReliveEvent from "./ReliveEvent";
import EventStats from "./EventStats";
import PastEventsCarousel from "./PastEventsCarousel";
import BlogCard from "../../components/common/BlogCard";
import CommonButton from "../../components/common/CommonButton";
import { motion } from "framer-motion";
import { animation } from "../../helpers/utils";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import { unboxSecure } from "./assets";
import { useRecentBlogs } from "../../hooks/useResources";
import BlogSkeleton from "../../components/common/BlogSkeleton";
import { eventsListingSchema } from "../../helpers/schemas";

const NewsAndEventsPage = () => {
  const { recentBlogs, isLoading: recentLoading } = useRecentBlogs("");
  return (
    <>
      <HelmetWrapper
        title="News & Events"
        description="Discover the latest news, funding updates, and breakthrough innovations in warehouse robotics"
        image={unboxSecure}
      />
            <SchemaMarkup schema={eventsListingSchema} />
<div className="home-page-ware-house-container">
        <EventPageHeroSection />
      </div>

      <FeaturedEvent />

      <WhereToFindUs />

      <ReliveEvent />

      <PastEventsCarousel />

      <EventStats />

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

export default NewsAndEventsPage;
