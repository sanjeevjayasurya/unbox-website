import React from "react";
import "./index.css";

const WhitePaperSkeleton = () => {
  return (
    <div className="blogs-data-main-div skeleton-wrapper">
      <div className="whitepaper-card-img-div skeleton-img pulse"></div>
      <div className="space-y-[8px]">
        <div className="skeleton-text skeleton-date pulse"></div>
        <div className="skeleton-text skeleton-title pulse"></div>
        <div className="skeleton-text skeleton-info pulse"></div>
      </div>
      <div className="skeleton-text skeleton-button pulse"></div>
    </div>
  );
};

export default WhitePaperSkeleton;
