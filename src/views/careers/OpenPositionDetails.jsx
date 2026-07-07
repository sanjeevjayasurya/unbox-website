"use client";

import React from "react";
import "./index.css";
import { useRouter, useParams } from "next/navigation";
import DOMPurify from "dompurify";
import CommonButton from "../../components/common/CommonButton";
import { motion } from "framer-motion";
import { animation } from "../../helpers/utils";
import { frontendUrl, linkedinUrl, instagramUrl } from "../../helpers/config";
import { useJob } from "../../hooks/useJobs";
import Loader from "../../components/common/Loader";
import JobHeader from "./JobHeader";

const OpenPositionDetails = () => {
  const { jobId } = useParams();
  const router = useRouter();
  const { job, isLoading } = useJob(jobId);

  // Resolve the job from the URL (survives refresh / deep-links / double-clicks).
  if (isLoading) {
    return (
      <div className="open-positions-status">
        <Loader />
      </div>
    );
  }
  if (!job) {
    router.replace("/careers");
    return null;
  }

  const state = job;
  const descriptionHtml = state.description
    ? DOMPurify.sanitize(state.description)
    : "";

  const handleApply = () => {
    // In-house application form (driven by Keka's application fields).
    router.push(`/careers/${jobId}/apply`);
  };

  return (
    <>
      <JobHeader
        title={state.title}
        location={state.location}
        type={state.type}
      />
      <div className="bg-[#FDFDFD]">
        <motion.div
          className="open-positions-about-div"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p
            className="font-20-medium color-black-1"
            custom={1}
            variants={animation.fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            About Unbox Robotics
          </motion.p>
          <motion.p
            className="open-positions-about-sub-title"
            custom={1}
            variants={animation.fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            We at Unbox Robotics are revolutionizing warehouses and distribution
            centers by building the world's most compact, powerful, and flexible
            mobile robotics systems for the new age of warehousing.  Our product
            is the World's 1st of its kind AI-powered parcel sorting robotic
            system that gets installed 10X faster, saves 50+% space and improves
            productivity by more than 3X with 50% fewer robots than that of the
            competition. Founded in 2019, we are backed by marquee investors and
            angels. We are looking to add to our team of thinkers, innovators
            and doers and would love to have you join us at the Pune, India
            office and build the future of on-demand robotics logistics
            solutions
          </motion.p>
          {descriptionHtml ? (
            <>
              <motion.p
                className="font-20-medium color-black-1"
                custom={1}
                variants={animation.fadeInUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                Job Description:
              </motion.p>
              <motion.div
                className="font-16-light color-black-1 open-positions-description"
                custom={1}
                variants={animation.fadeInUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
            </>
          ) : null}
          <motion.div
            className="font-16-light color-black-1"
            custom={1}
            variants={animation.fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <ul className="">
              <li>
                Also, to learn more about what is like to be a Unbox employee,
                please read more about current employees and company culture :
              </li>
              <li className="underline">
                <a href={frontendUrl}>{frontendUrl}</a>
              </li>
              <li className="underline">
                <a href={linkedinUrl}>{linkedinUrl}</a>
              </li>
              <li className="underline">
                <a href={instagramUrl}>{instagramUrl}</a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={animation.fadeInUpVariant}
            viewport={{ once: true, amount: 0.2 }}
            className="open-postions-btn-div"
          >
            <CommonButton title={"Apply Now"} onClick={handleApply} />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default OpenPositionDetails;
