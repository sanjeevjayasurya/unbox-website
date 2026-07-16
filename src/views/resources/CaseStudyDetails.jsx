"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "./index.css";
import PlayIcon from "../../assets/icons/playIcon.svg";
import CloseIcon from "../../assets/icons/close.svg";
import CommonButton from "../../components/common/CommonButton";
import { animation } from "../../helpers/utils";
import { createPortal } from "react-dom";
import CaseStudyModal from "../../components/common/CaseStudyModal";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import { createCaseStudySchema } from "../../helpers/schemas";
import { frontendUrl, resolveMediaUrl } from "../../helpers/config";
import SimpleLoader from "../../components/loader/SimpleLoader";
import NotFoundComponent from "../../components/common/NotFoundComponent";
import TiptapContent from "../../components/common/TiptapContent";
import HLSVideoPlayer from "../../components/common/HLSVideoPlayer";
import { useCaseStudyDetail } from "../../hooks/useResources";
import ShareSection from "../../components/common/ShareSection";

const CaseStudyDetails = () => {
  const { slug } = useParams();
  const {
    caseStudy: state,
    isLoading: loadingDetail,
    error: detailError,
  } = useCaseStudyDetail(slug);
  const mediaUrl = resolveMediaUrl(state?.media);

  const [caseStudyModal, setCaseStudyModal] = useState(false);
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);

  const videoThumbnailUrl = resolveMediaUrl(
    state?.thumbnail_url || state?.image,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!isVideoPopupOpen) return undefined;

    document.body.classList.add("modal-open");

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsVideoPopupOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoPopupOpen]);

  const blogUrl = `${frontendUrl}/case-study/${slug}`;
  const videoPopup = isVideoPopupOpen && mediaUrl ? (
        <div
          className="case-study-video-popup"
          onClick={() => setIsVideoPopupOpen(false)}>
          <div
            className="case-study-video-popup__dialog"
            onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="case-study-video-popup__close"
              onClick={() => setIsVideoPopupOpen(false)}
              aria-label="Close video">
              <CloseIcon width={20} height={20} />
            </button>
            <HLSVideoPlayer
              src={mediaUrl}
              poster={videoThumbnailUrl || undefined}
              className="case-study-video-popup__player"
              autoPlay={true}
              controls={true}
            />
          </div>
        </div>
      ) : null;

  if (detailError) {
    return (
      <>
        <NotFoundComponent
          title="Case Study Not Found"
          buttonText="Discover Other Case Studies"
          buttonLink="/case-study"
        />
      </>
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

  return (
    <>
      <HelmetWrapper
        title={state?.title}
        description={state?.description}
        image={state?.mediaType === "image" ? mediaUrl : videoThumbnailUrl}
        url={blogUrl}
      />
      <SchemaMarkup schema={createCaseStudySchema(state, slug)} />
      <div className="bg-[#FDFDFD] class-gap overflow-hidden">
        <div className="blogs-details-div-1">
          <div
            className="blogs-details-data-div">
            <div className="blogs-details-inner-div-1">
              <p className="font-20-regular color-green-1">Case Study</p>
              <p className="font-40-semibold color-black-1">{state.title}</p>
              {!!state.description && (
                <p className="font-20-regular color-black-1">
                  {state.description}
                </p>
              )}
              <p className="font-16-regular color-black-1">{state.date}</p>
            </div>
            <ShareSection
              url={blogUrl}
              title={state?.title}
              className="max-[1024px]:!hidden"
            />
          </div>
          <div
            className="blogs-details-image-div">
            {state?.mediaType === "video" ? (
              <button
                type="button"
                className="case-study-video-trigger"
                onClick={() => setIsVideoPopupOpen(true)}
                aria-label={`Play ${state?.title || "case study video"}`}>
                <img
                  src={videoThumbnailUrl}
                  className="common-img"
                  alt={state?.title || "Case study video thumbnail"}
                  fetchPriority="high"
                  loading="eager"
                  draggable={false}
                />
                <span className="case-study-video-trigger__overlay">
                  <PlayIcon className="case-study-video-trigger__play" />
                </span>
              </button>
            ) : (
              <img
                src={mediaUrl}
                className="common-img"
                alt={state?.title || "Case study image"}
                fetchPriority="high"
                loading="eager"
                draggable={false}
              />
            )}
          </div>
        </div>

        <ShareSection
          url={blogUrl}
          title={state?.title}
          className="!hidden max-[1024px]:!flex"
        />
        {!!state?.clientMessage && (
          <section
            className="case-study-testimonial !flex-col !items-center !gap-5">
            <q className="font-20-regular color-black-1 italic text-center">
              {state?.clientMessage}
            </q>
            <div className="case-study-testimonial__line" />
            {!!state?.clientName && (
              <div className="flex items-center gap-2">
                {/* {state?.clientImage && (
                  <div className="w-[120px] h-[60px]  flex items-center justify-center overflow-hidden ">
                    <img
                      src={resolveAssetUrl(state?.clientImage)}
                      alt="Client Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )} */}
                <p className="text-[#079d92] font-20-medium text-center">
                  {state?.clientName}
                </p>
              </div>
            )}
          </section>
        )}
        <div
          className="blogs-details-div-2 relative overflow-hidden">
          <TiptapContent
            content={state?.content}
            className="prose casestudy-content whitespace-normal max-w-full"
          />

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "100px",
              background:
                "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 60%, rgba(255, 255, 255, 1) 100%)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
        </div>

        <div
          className="blogs-details-btn">
          <CommonButton
            title={"Download"}
            theme={"green"}
            onClick={() => setCaseStudyModal(true)}
          />
        </div>
      </div>

      <CaseStudyModal
        visible={caseStudyModal}
        onClose={() => setCaseStudyModal(false)}
        title={"Get The Case Study"}
        buttonText={"Download Now"}
        slug={slug}
        pdfUrl={state?.pdf}
        type="casestudy"
      />

      {typeof document !== "undefined" &&
        createPortal(videoPopup, document.body)}
    </>
  );
};

export default CaseStudyDetails;
