"use client";

import React, { useEffect, useState } from "react";
import "./index.css";
import { animation } from "../../helpers/utils";
import Link from "next/link";
import CommonButton from "../../components/common/CommonButton";
import SearchInput from "../../components/common/SearchInput";
import PrNewsCard from "../../components/common/PrNewsCard";
import FeaturedPrNewsComponent from "./FeaturedPrNewsComponent";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import { frontendUrl } from "../../helpers/config";
import { usePrNews, useFeaturedPrNews } from "../../hooks/useResources";
import CaseStudySkeleton from "../../components/common/CaseStudySkeleton";
import FeaturedSkeleton from "../../components/common/FeaturedSkeleton";
import { prNewsListingSchema } from "../../helpers/schemas";

const CATEGORIES = [
  "All",
  "Company / News",
  "Partnership",
  "Awards",
  "Media Coverage",
];

const PrNews = () => {
  const [searchInput, setSearchInput] = useState("");
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [year, setYear] = useState("All");

  // Debounce the headline search
  useEffect(() => {
    const timer = setTimeout(() => setQ(searchInput.trim()), 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { prNews, years, isLoading, size, setSize, hasMore, isValidating } =
    usePrNews({ limit: 6, q, category, year });
  const { featuredPrNews, isLoading: featuredLoading } = useFeaturedPrNews();

  const handleSeeMore = () => setSize(size + 1);

  const isInitialLoading = isLoading && prNews.length === 0;
  const isFetchingMore = isValidating && prNews.length> 0;

  const yearChips = ["All", ...years.map(String)];

  const chipBase =
    "px-4 py-2 rounded-[100px] font-14-regular cursor-pointer transition-colors border";
  const chipActive = "bg-[#141313] text-white border-[#141313]";
  const chipInactive =
    "bg-transparent color-black-1 border-[#E0E0E0] hover:border-[#141313]";

  return (
    <>
      <HelmetWrapper
        title={"PR & News"}
        description={
          "Press releases, company milestones, product announcements and coverage from across the world of warehouse automation."
        }
        url={`${frontendUrl}/pr-news`}
      />
      <SchemaMarkup schema={prNewsListingSchema} />

      {/* Hero */}
      <div className="resources-main-div-2">
        <div
          className="resources-title-main-div">
          <h1
            className="font-40-regular color-white">
            PR & News
          </h1>
          <p
            className="font-16-light color-white text-center max-w-[800px]">
            Press releases, company milestones, product announcements and
            coverage from across the world of warehouse automation.
          </p>
        </div>
      </div>

      {/* Featured Event */}
      {featuredLoading ? (
        <FeaturedSkeleton />
      ) : (
        !!featuredPrNews && (
          <FeaturedPrNewsComponent
            data={featuredPrNews}
            redirectUrl={`/pr-news/${featuredPrNews?.slug}`}
          />
        )
      )}

      {/* Where else to find us + filters + grid */}
      <div className="bg-[#FDFDFD] class-gap">
        <p
          className="font-40-regular text-[#141313]">
          Where else to find us
        </p>

        {/* Search + filter chips */}
        <div className="flex flex-col gap-6 bg-[#F5F5F5] rounded-[24px] p-6 max-[768px]:p-4">
          <SearchInput
            value={searchInput}
            onChange={setSearchInput}
            placeholder="Search by Headlines"
            aria-label="Search PR & News by headline"
          />

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <p className="font-14-regular color-black-1 opacity-60">
                Category
              </p>
              <div className="flex flex-wrap gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`${chipBase} ${
                      category === cat ? chipActive : chipInactive
                    }`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {yearChips.length> 1 && (
              <div className="flex flex-col gap-3">
                <p className="font-14-regular color-black-1 opacity-60">Year</p>
                <div className="flex flex-wrap gap-3">
                  {yearChips.map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setYear(yr)}
                      className={`${chipBase} ${
                        year === yr ? chipActive : chipInactive
                      }`}>
                      {yr}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="blogs-data-map-div">
          {prNews?.map((item, index) => (
            <div
              key={item.id || index}>
              <PrNewsCard item={item} />
            </div>
          ))}
          {(isInitialLoading || isFetchingMore) &&
            Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={`skeleton-${idx}`}>
                <CaseStudySkeleton />
              </div>
            ))}
        </div>

        {!isInitialLoading && prNews?.length === 0 && (
          <p className="font-20-regular color-black-1 text-center opacity-70">
            No PR & News found for the selected filters.
          </p>
        )}

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

      {/* Covering Unbox? CTA */}
      <div className="bg-[#141313] w-full">
        <div className="class-gap items-center text-center">
          <p
            className="font-40-regular color-white">
            Covering Unbox?
          </p>
          <p
            className="font-16-light color-white max-w-[700px] text-center">
            For interviews, press assets, or media inquiries, reach our PR team
            directly. We typically respond within two business days.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link href="/get-in-touch">
              <CommonButton title={"Contact Press Team"} theme={"green"} />
            </Link>
            <a href={frontendUrl} target="_blank" rel="noreferrer">
              <CommonButton title={"Visit Unbox Robotics"} theme={"white"} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrNews;
