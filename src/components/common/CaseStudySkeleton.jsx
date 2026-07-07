import React from "react";
import "./index.css";

const CaseStudySkeleton = () => {
  return (
    <div className="blogs-data-main-div skeleton-wrapper">
      <div className="blogs-data-img-div skeleton-img pulse"></div>
      <div className="space-y-[6px]">
        <div className="skeleton-text skeleton-date pulse"></div>
        <div className="skeleton-text skeleton-title pulse"></div>
        <div className="skeleton-text skeleton-title-short pulse"></div>
      </div>
    </div>
  );
};

export default CaseStudySkeleton;
