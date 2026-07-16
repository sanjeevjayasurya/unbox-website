"use client";

import React, { useState, useEffect } from "react";
import { fetchLocationInfo } from "../actions/locationActions";
import { ipInfoToken } from "../helpers/config";
import { useDispatch } from "react-redux";
import { isEUCountry } from "../helpers/utils";

const CookieBanner = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    const storedRegion = localStorage.getItem("userRegion");
    let idleId;
    let timeoutId;

    if (storedRegion) {
      setRegion(storedRegion);
    } else if (!ipInfoToken) {
      // Avoid /json?token=undefined third-party request flagged by PSI.
      setRegion("OTHER");
    } else {
      setRegion("OTHER");
      const run = () => {
        dispatch(fetchLocationInfo(ipInfoToken))
          .then((data) => {
            let userRegion = "OTHER";

            if (data.country_code === "US" && data.region_code === "CA") {
              userRegion = "US-CA";
            } else if (isEUCountry(data.country_code)) {
              userRegion = "EU";
            }

            setRegion(userRegion);
            localStorage.setItem("userRegion", userRegion);
          })
          .catch((error) => {
            console.error("Failed to fetch region", error);
            setRegion("OTHER");
          });
      };

      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(run, { timeout: 3000 });
      } else {
        timeoutId = window.setTimeout(run, 1);
      }
    }

    const consent = localStorage.getItem("cookieConsent");
    const sessionConsent = sessionStorage.getItem("cookieConsent");
    if (consent === "accepted" || consent === "do-not-sell") {
      // permanently decided
    } else if (sessionConsent === "rejected") {
      // rejected this session, ask again on next visit
    } else {
      if (consent === "rejected") localStorage.removeItem("cookieConsent");
      setVisible(true);
    }

    return () => {
      if (idleId != null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId != null) window.clearTimeout(timeoutId);
    };
  }, [dispatch]);

  // --- User actions ---
  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    sessionStorage.setItem("cookieConsent", "rejected");
    localStorage.removeItem("cookieConsent");
    setVisible(false);
  };

  const handleDoNotSell = () => {
    localStorage.setItem("cookieConsent", "do-not-sell");
    setVisible(false);
  };

  // --- Style toggle for body class ---
  useEffect(() => {
    const className = "cookie-banner-visible";
    if (visible) document.documentElement.classList.add(className);
    else document.documentElement.classList.remove(className);
    return () => document.documentElement.classList.remove(className);
  }, [visible]);

  if (!visible || !region) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "var(--green-2)",
        color: "var(--white)",
        padding: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <p
        style={{
          margin: 0,
          paddingRight: "16px",
          fontSize: "14px",
          whiteSpace: "pre-wrap",
        }}
      >
        We use cookies for a better experience.
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={handleReject} style={btnStyle}>
          Reject
        </button>
        <button onClick={handleAccept} style={btnStyle}>
          Accept
        </button>
      </div>
    </div>
  );
};

const btnStyle = {
  background: "#fff",
  color: "#202021",
  border: "none",
  padding: "8px 12px",
  borderRadius: "4px",
  fontSize: "14px",
  textWrap: "nowrap",
  cursor: "pointer",
};

export default CookieBanner;
