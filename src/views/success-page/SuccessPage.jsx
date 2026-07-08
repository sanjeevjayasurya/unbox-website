"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./index.css";
import CommonButton from "../../components/common/CommonButton";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import { animation } from "../../helpers/utils";

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HelmetWrapper
        title="Thank You | Unbox Robotics"
        description="Your message has been successfully received. We'll get back to you shortly."
      />
      <div className="success-container">
        <div
          className="success-header">
          <h1
            className="font-40-regular color-white">
            Message Received!
          </h1>
          <p
            className="font-16-light color-white">
            Thank you for reaching out to Unbox Robotics.
          </p>
        </div>

        <div className="success-content">
          <div
            className="success-icon-wrapper">
            <div>
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <circle
                  cx="60"
                  cy="60"
                  r="60"
                  fill="#079D92"
                  fillOpacity="0.1"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="#079D92"
                  fillOpacity="0.2"
                />
                <circle cx="60" cy="60" r="40" fill="#079D92" />
                <path
                  d="M45 60L55 70L75 50"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <h2
            className="font-40-regular success-title">
            Thank You!
          </h2>

          <p
            className="font-20-light success-message">
            Your inquiry has been submitted successfully. Our team will review
            your request and get back to you shortly.
          </p>

          <div
            className="success-actions">
            <CommonButton
              title="Go To Homepage"
              theme="green"
              onClick={() => router.push("/")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
