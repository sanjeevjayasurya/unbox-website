"use client";

import React, { useEffect } from "react";
import "./EventPopup.css";
import LogimatIcon from "../../assets/icons/logimat-white.svg";
import CloseIcon from "../../assets/icons/close.svg";
import MotifeIcon from "../../assets/icons/motife.svg";
import Unboxlogo from "../../assets/icons/unbox-white-logo.svg";
import { cematAusLogo } from "../../views/Events/assets";
import Link from "next/link";

const EventPopup = ({ isOpen, onClose }) => {
  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, scale: 0.8, y: 20, transition: { duration: 0.2 } },
  };

  return isOpen ? (
        <div
          className="event-popup-overlay"
          onClick={onClose}>
          <div
            className="event-popup-container"
            onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn-popup"
              onClick={onClose}
              aria-label="Close popup">
              <CloseIcon width="16" height="16" />
            </button>
            <div className="event-popup-content">
              <div>
                <Unboxlogo className="max-w-max h-10" />
              </div>

              <div className="event-popup-body">
                <div className="event-popup-title-section">
                  <h2 className="font-32-semibold text-white">
                    Come join us <br />
                    @CeMAT Australia <i className="italic">2026</i>
                  </h2>
                </div>

                <div className="flex gap-5">
                  <div className="flex-1 event-card-main">
                    <p className="font-32-semibold italic text-white">
                      23-25 June
                    </p>

                    <div className="flex gap-2 max-lg:flex-col max-lg:gap-4">
                      <div>
                        <img src={cematAusLogo} alt="CeMAT Australia 2026" className="h-18 min-w-18 max-lg:min-w-8 max-lg:h-12" />
                      </div>
                      <p className="font-14-light !text-[13px] text-white">
                        The Melbourne Convention and Exhibition Centre (MCEC)
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-5">
                    <div className=" event-card-booth">
                      <p className="font-24-medium !font-semibold text-white italic">
                        Booth #IT24
                      </p>
                    </div>

                    <Link
                      href="/events/cemat-australia-2026"
                      className="flex-1 event-card-more"
                      onClick={onClose}>
                      <div>
                        <MotifeIcon width={60} height={60} />
                      </div>
                      <p className="font-16-light text-[#00A89C]">
                        Click to find <br /> out more
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null;
};

export default EventPopup;
