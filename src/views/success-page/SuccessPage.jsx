"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
        <motion.div
          className="success-header"
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          <motion.h1
            variants={animation.fadeInUpVariant}
            className="font-40-regular color-white"
          >
            Message Received!
          </motion.h1>
          <motion.p
            variants={animation.fadeInUpVariant}
            className="font-16-light color-white"
          >
            Thank you for reaching out to Unbox Robotics.
          </motion.p>
        </motion.div>

        <div className="success-content">
          <motion.div
            className="success-icon-wrapper"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
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
            </motion.div>
          </motion.div>

          <motion.h2
            className="font-40-regular success-title"
            initial="hidden"
            animate="visible"
            variants={animation.fadeInUpVariant}
          >
            Thank You!
          </motion.h2>

          <motion.p
            className="font-20-light success-message"
            initial="hidden"
            animate="visible"
            variants={animation.fadeInUpVariant}
          >
            Your inquiry has been submitted successfully. Our team will review
            your request and get back to you shortly.
          </motion.p>

          <motion.div
            className="success-actions"
            initial="hidden"
            animate="visible"
            variants={animation.fadeInUpVariant}
          >
            <CommonButton
              title="Go To Homepage"
              theme="green"
              onClick={() => router.push("/")}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
