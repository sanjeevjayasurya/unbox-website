import React from "react";
import "./index.css";

const FeaturedSkeleton = () => {
  return (
    <div className="bg-[#FDFDFD] class-gap skeleton-wrapper">
      <div className="flex flex-row gap-4 items-center justify-start max-[1024px]:justify-center mb-6">
        <div className="skeleton-text pulse" style={{ width: "200px", height: "40px", borderRadius: "8px" }}></div>
      </div>
      <div className="flex bg-[#e0e0e0] pulse rounded-[24px] gap-[20px] p-5 max-[1024px]:flex-col">
        <div className="w-[440px] h-[400px] bg-[#f0f0f0] rounded-[20px] max-[1024px]:w-full max-[1024px]:h-[458px] max-[768px]:h-[300px]"></div>
        <div className="flex items-start flex-col justify-between gap-6 flex-1 p-[10px] max-[768px]:gap-3">
          <div className="flex flex-col gap-4 w-full">
            <div className="skeleton-text pulse" style={{ width: "100px", height: "20px", borderRadius: "4px" }}></div>
            <div className="skeleton-text pulse" style={{ width: "80%", height: "36px", borderRadius: "8px" }}></div>
            <div className="skeleton-text pulse" style={{ width: "100%", height: "100px", borderRadius: "8px" }}></div>
          </div>
          <div className="skeleton-text pulse" style={{ width: "150px", height: "48px", borderRadius: "100px" }}></div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSkeleton;
