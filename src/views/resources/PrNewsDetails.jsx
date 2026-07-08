"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import "./index.css";
import CommonButton from "../../components/common/CommonButton";
import { animation } from "../../helpers/utils";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import { createPrNewsSchema } from "../../helpers/schemas";
import { backendUrl, frontendUrl } from "../../helpers/config";
import SimpleLoader from "../../components/loader/SimpleLoader";
import NotFoundComponent from "../../components/common/NotFoundComponent";
import TiptapContent from "../../components/common/TiptapContent";
import ShareSection from "../../components/common/ShareSection";
import AboutUnbox from "../../components/common/AboutUnbox";
import PrNewsCard from "../../components/common/PrNewsCard";
import { usePrNewsDetail, useRecentPrNews } from "../../hooks/useResources";

const resolveAssetUrl = (assetPath) => {
  if (!assetPath) return "";
  return assetPath.startsWith("http") ? assetPath : `${backendUrl}${assetPath}`;
};

const PrNewsDetails = () => {
  const { slug } = useParams();
  const {
    prNews: state,
    isLoading: loadingDetail,
    error: detailError,
  } = usePrNewsDetail(slug);
  const { recentPrNews } = useRecentPrNews(slug);

  const mediaUrl = resolveAssetUrl(state?.media || state?.thumbnail_url);
  const pageUrl = `${frontendUrl}/pr-news/${slug}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (detailError) {
    return (
      <NotFoundComponent
        title="PR & News Not Found"
        buttonText="Discover Other Stories"
        buttonLink="/pr-news"
      />
    );
  }

  if (loadingDetail || !state) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <SimpleLoader />
      </div>
    );
  }

  const dateLocation = [state?.date, state?.location]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <HelmetWrapper
        title={state?.title}
        description={state?.description}
        image={mediaUrl}
        url={pageUrl}
      />
      <SchemaMarkup schema={createPrNewsSchema(state, slug)} />

      <div className="bg-[#FDFDFD] class-gap overflow-hidden">
        {/* Header */}
        <div className="blogs-details-div-1">
          <div
            className="blogs-details-data-div">
            <div className="blogs-details-inner-div-1">
              {!!state?.category && (
                <p className="font-20-regular color-green-1">{state.category}</p>
              )}
              <p className="font-40-semibold color-black-1">{state.title}</p>
              {!!state.description && (
                <p className="font-20-regular color-black-1">
                  {state.description}
                </p>
              )}
              {!!dateLocation && (
                <p className="font-16-regular color-black-1">{dateLocation}</p>
              )}
            </div>
            <ShareSection
              url={pageUrl}
              title={state?.title}
              className="max-[1024px]:!hidden"
            />
          </div>
          <div
            className="blogs-details-image-div">
            <img
              src={mediaUrl}
              className="common-img"
              alt={state?.title || "PR & News image"}
              fetchPriority="high"
              loading="eager"
              draggable={false}
            />
          </div>
        </div>

        <ShareSection
          url={pageUrl}
          title={state?.title}
          className="!hidden max-[1024px]:!flex"
        />

        {/* Body */}
        <div
          className="blogs-details-div-2 relative overflow-hidden">
          <TiptapContent
            content={state?.content}
            className="prose casestudy-content whitespace-normal max-w-full"
          />
        </div>

        {/* Read the original coverage */}
        {!!state?.externalUrl && (
          <div
            className="blogs-details-btn">
            <a href={state.externalUrl} target="_blank" rel="noreferrer">
              <CommonButton title={"Read the original coverage"} theme={"green"} />
            </a>
          </div>
        )}

        {/* Static About Unbox Robotics block (common to all PR & News) */}
        <AboutUnbox />
      </div>

      {/* More from the Newsroom */}
      {recentPrNews?.length> 0 && (
        <div className="bg-[#FDFDFD] class-gap">
          <p
            className="font-40-regular text-[#141313]">
            More from the Newsroom
          </p>
          <div className="blogs-data-map-div">
            {recentPrNews.map((item, index) => (
              <div
                key={item.id || index}>
                <PrNewsCard item={item} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* See what the news is about CTA */}
      <div className="bg-[#141313] w-full">
        <div className="class-gap items-center text-center">
          <p
            className="font-40-regular color-white">
            See what the news is about
          </p>
          <Link href="/get-in-touch">
            <CommonButton title={"Book A Meeting"} theme={"white"} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default PrNewsDetails;
