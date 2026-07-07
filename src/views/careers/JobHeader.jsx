"use client";

import React from "react";
import { motion } from "framer-motion";
import { animation } from "../../helpers/utils";
import Location from "../../assets/icons/location.svg";
import Clock from "../../assets/icons/clock.svg";

// Shared dark header for the job details / apply pages — matches the
// Get In Touch page header (.title-main-div) styling.
const JobHeader = ({ title, location, type }) => (
  <motion.div
    className="job-header"
    initial="hidden"
    animate="visible"
    variants={animation.fadeInUpVariant}
  >
    <motion.h1
      variants={animation.fadeInUpVariant}
      className="font-40-regular color-white text-center"
    >
      {title}
    </motion.h1>

    {(location || type) && (
      <motion.div variants={animation.fadeInUpVariant} className="job-header-meta">
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
      </motion.div>
    )}
  </motion.div>
);

export default JobHeader;
