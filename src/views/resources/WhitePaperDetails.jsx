"use client";

import React, { useEffect, useState } from "react";
import "./index.css";
import { useParams } from "next/navigation";
import { animation } from "../../helpers/utils";
import CommonButton from "../../components/common/CommonButton";
import { backendUrl, frontendUrl } from "../../helpers/config";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import ImageComponent from "../../components/common/ImageComponent";
import SimpleLoader from "../../components/loader/SimpleLoader";
import NotFoundComponent from "../../components/common/NotFoundComponent";
import CaseStudyModal from "../../components/common/CaseStudyModal";
import TiptapContent from "../../components/common/TiptapContent";
import { useWhitePaperDetail } from "../../hooks/useResources";

const WhitePaperDetails = () => {
  const { slug } = useParams();
  const { whitePaper: state, isLoading: loadingDetail, error: detailError } = useWhitePaperDetail(slug);

  const [downloadModal, setDownloadModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const blogUrl = `${frontendUrl}/white-paper/${slug}`;
  const whitePaperImageUrl = state?.image
    ? `${backendUrl}${state.image}`
    : undefined;

  if (detailError) {
    return (
      <>
        <NotFoundComponent
          title="White Paper Not Found"
          buttonText="Discover Other White Papers"
          buttonLink="/white-paper"
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
        image={whitePaperImageUrl}
        url={blogUrl}
      />
      <div className="bg-[#FDFDFD] class-gap overflow-hidden">
        <div className="white-paper-details-div-1">
          <div
            className="white-paper-inner-div ">
            <div className="white-paper-info-div">
              <p className="font-40-medium color-black-1">{state.title}</p>
              <p className="font-16-regular color-black-1">
                {state.description}
              </p>
            </div>
            <div>
              <CommonButton
                title={"Get This White Paper"}
                onClick={() => {
                  setDownloadModal(true);
                }}
                theme={"green"}
              />
            </div>
          </div>
          <div
            className="blogs-details-image-div ">
            <ImageComponent src={whitePaperImageUrl} className="common-img" alt={state?.title || "White paper cover image"} />
          </div>
        </div>
        <div
          className="white-paper-highligts-div  relative overflow-hidden">
          <TiptapContent content={state?.content}   className="prose casestudy-content whitespace-normal max-w-full"/>

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "200px",
              background:
                "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 60%, rgba(255, 255, 255, 1) 100%)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      <CaseStudyModal
        visible={downloadModal}
        onClose={() => setDownloadModal(false)}
        title={"Get The White Paper"}
        buttonText={"Send Me Full White Paper"}
        slug={slug}
        type="whitepaper"
      />
    </>
  );
};

export default WhitePaperDetails;
