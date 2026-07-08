"use client";

import React from "react";
import { animation } from "../../helpers/utils";
import Location from "../../assets/icons/location.svg";
import Clock from "../../assets/icons/clock.svg";

// Shared dark header for the job details / apply pages — matches the
// Get In Touch page header (.title-main-div) styling.
const JobHeader = ({ title, location, type }) => (
  <div
    className="job-header">
    <h1
      className="font-40-regular color-white text-center">
      {title}
    </h1>

    {(location || type) && (
      <div className="job-header-meta">
        {location && (
          <span className="job-header-chip">
            <Location stroke="#ffffff" className="job-header-icon" />
            <span className="font-14-regular color-white">{location}</span>
          </span>
        )}
        {type && (
          <span className="job-header-chip">
            <Clock stroke="#ffffff" className="job-header-icon" />
            <span className="font-14-regular color-white">{type}</span>
          </span>
        )}
      </div>
    )}
  </div>
);

export default JobHeader;
