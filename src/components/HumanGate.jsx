"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { base_url, turnstileSiteKey } from "../helpers/config";
import unboxLogo from "../assets/icons/unbox-white-logo.svg?url";
import "./HumanGate.css";
import SimpleLoader from "./loader/SimpleLoader";

const HumanGate = ({ children, onVerify, variant = "full", persist = true }) => {
  const [verified, setVerified] = useState(null);
  const turnstileRef = useRef(null);
  const hasRendered = useRef(false); // 🔥 prevent multiple render

  useEffect(() => {
    checkVerification();
  }, []);

  const checkVerification = async () => {
    try {
      // 🕵️ Check local session first if persist is enabled
      if (persist) {
        const storedSession = localStorage.getItem("human_gate_session");
        if (storedSession) {
          const { verified: isStoredVerified, timestamp } = JSON.parse(storedSession);
          const oneDay = 24 * 60 * 60 * 1000;
          
          if (isStoredVerified && Date.now() - timestamp < oneDay) {
            setVerified(true);
            if (onVerify) onVerify(true);
            return;
          }
        }
      }

      const res = await axios.get(`${base_url}/security/check`, {
        withCredentials: true,
      });

      if (res.data.verified) {
        setVerified(true);
        if (onVerify) onVerify(true);
        
        // Sync local storage if verified by backend and persist is enabled
        if (persist) {
          localStorage.setItem(
            "human_gate_session",
            JSON.stringify({ verified: true, timestamp: Date.now() })
          );
        }
      } else {
        setVerified(false);
        if (onVerify) onVerify(false);
      }
    } catch {
      setVerified(false);
      if (onVerify) onVerify(false);
    }
  };

  const handleVerify = async (token) => {
    try {
      await axios.post(
        `${base_url}/security/verify`,
        { token },
        { withCredentials: true }
      );

      // ⏳ Delay so the user sees the "Success" checkmark on the widget
      setTimeout(() => {
        setVerified(true);
        if (onVerify) onVerify(true);
        
        if (persist) {
          localStorage.setItem(
            "human_gate_session",
            JSON.stringify({ verified: true, timestamp: Date.now() })
          );
        }
      }, 1500);
    } catch (err) {
      console.error("Verification failed", err);

      // 🔁 reset widget if failed
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.reset(turnstileRef.current);
        hasRendered.current = false;
      }
    }
  };

  // 🔥 Render Turnstile ONLY ONCE
  useEffect(() => {
    if (
      verified === false &&
      turnstileRef.current &&
      window.turnstile &&
      !hasRendered.current
    ) {
      hasRendered.current = true;

      window.turnstile.render(turnstileRef.current, {
        sitekey: turnstileSiteKey,
        callback: handleVerify,
      });
    }
  }, [verified]);

  // 📦 Compact variant (used in forms)
  if (variant === "compact") {
    return (
      <div className="hg-compact-wrapper">
        <div ref={turnstileRef}></div>
      </div>
    );
  }

  // ⏳ Loading state (full variant)
  if (verified === null) {
    return (
      <div className="hg-container">
        <SimpleLoader />
      </div>
    );
  }

  // 🔐 Show CAPTCHA (full variant)
  if (!verified) {
    return (
      <div className="hg-container">
        <div className="hg-glow-1"></div>
        <div className="hg-glow-2"></div>

        <div
          className="hg-card">
          <div className="hg-logo-container">
            <img src={unboxLogo} alt="Unbox Robotics" className="hg-logo" />
          </div>

          <div className="hg-header">
            <h2 className="hg-title">Security Verification</h2>
            <p className="hg-subtitle">
              Please verify to continue to Unbox Robotics
            </p>
          </div>

          <div className="hg-widget-wrapper">
            <div ref={turnstileRef}></div>
          </div>

          <p className="hg-footer-text">Protected by Cloudflare Turnstile</p>
        </div>
      </div>
    );
  }

  return children;
};

export default HumanGate;