import React from "react";
import InstaIcon from "../../assets/icons/insta.svg";
import TwitterIcon from "../../assets/icons/twitter.svg";
import LinkedinIcon from "../../assets/icons/linkedin.svg";
import FacebookIcon from "../../assets/icons/facebook.svg";

/**
 * ShareSection Component
 * Provides social media sharing links for a given URL and title.
 *
 * @param {string} url - The URL to share.
 * @param {string} title - The title or text for the share (useful for Twitter).
 * @param {string} className - Optional CSS classes for the container.
 */
const ShareSection = ({ url, title, className = "" }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title || "");

  return (
    <div className={`blogs-details-share-div ${className}`}>
      <p className="font-20-regular color-black-1">Share on:</p>
      <div className="flex gap-5">
        {/* Instagram */}
        <a
          href={`https://www.instagram.com/?url=${encodedUrl}`}
          target="_blank"
          className="footer-social-btn insta-gradient"
          rel="noreferrer"
        >
          <InstaIcon className="social-icon" aria-hidden="true" />
          <span className="text text-center font-14 text-white">Instagram</span>
        </a>

        {/* X (Twitter) */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          className="footer-social-btn twitter-gradient"
          rel="noreferrer"
        >
          <TwitterIcon className="social-icon" aria-hidden="true" />
          <span className="text text-center font-14 text-white">X</span>
        </a>

        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          className="footer-social-btn facebook-gradient"
          rel="noreferrer"
        >
          <FacebookIcon className="social-icon" aria-hidden="true" />
          <span className="text text-center font-14 text-white">Facebook</span>
        </a>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          className="footer-social-btn linkedin-gradient"
          rel="noreferrer"
        >
          <LinkedinIcon className="social-icon" aria-hidden="true" />
          <span className="text text-center font-14 text-white">Linked In</span>
        </a>
      </div>
    </div>
  );
};

export default ShareSection;
