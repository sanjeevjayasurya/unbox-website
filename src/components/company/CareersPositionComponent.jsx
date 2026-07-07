"use client";

import React from "react";
import Location from "../../assets/icons/location.svg";
import Clock from "../../assets/icons/clock.svg";
import Right from "../../assets/icons/arrow-up-right-green.svg";
import { motion } from "framer-motion";
import { animation } from "../../helpers/utils";

// Flat list of open roles. Each card: department pill, title, summary,
// an "Apply" affordance and a meta row (location / type / department).
const CareersPositionComponent = ({ data, onClick }) => {
  return (
    <div className="careers-jobs-list">
      {data.map((job, index) => (
        <motion.div
          className="career-job-card"
          key={job.id ?? index}
          role="button"
          tabIndex={0}
          onClick={() => onClick(job)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onClick(job);
            }
          }}
          custom={index}
          variants={animation.fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.01 }}
        >
          <div className="career-job-card-top">
            <div className="career-job-card-main">
              {job.department && (
                <span className="career-job-tag font-14-regular color-green-1">
                  {job.department}
                </span>
              )}
              <p className="font-24-medium color-black-1 career-job-title">
                {job.title}
              </p>
              {job.subTitle && (
                <p className="font-16-light color-grey-1 career-job-desc">
                  {job.subTitle}
                </p>
              )}
            </div>
            <button
              type="button"
              className="apply-btn up-right career-apply-btn"
              onClick={(e) => {
                e.stopPropagation();
                onClick(job);
              }}
            >
              <span className="font-16-regular color-black-1">Apply</span>
              <div className="animated-Icon">
                <Right />
                <Right />
              </div>
            </button>
          </div>

          <div className="career-job-meta">
            {job.location && (
              <div className="career-meta-item">
                <Location stroke="#079d92" className="career-location-svg" />
                <span className="font-14-regular color-black-1">
                  {job.location}
                </span>
              </div>
            )}
            {job.type && (
              <div className="career-meta-item">
                <Clock stroke="#079d92" className="career-location-svg" />
                <span className="font-14-regular color-black-1">{job.type}</span>
              </div>
            )}
            {job.department && (
              <div className="career-meta-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="career-location-svg"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 13.5h11M3.5 13.5V4l4-2 4 2v9.5M6 6h1M9 6h1M6 8.5h1M9 8.5h1M6 11h1M9 11h1"
                    stroke="#079d92"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-14-regular color-black-1">
                  {job.department}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CareersPositionComponent;
