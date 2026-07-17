"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  isVideoEligible,
  isVideoLoadCycleReady,
  selectDeferredVideoSource,
} from "./heroMediaEligibility.mjs";

const HERO_POSTER_SRC = "/images/hero-poster.webp";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function addMediaQueryListener(query, listener) {
  if (query.addEventListener) {
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }

  query.addListener(listener);
  return () => query.removeListener(listener);
}

export default function HeroMedia({
  videoSrc,
  mediaQuery = "all",
  className = "",
}) {
  const posterRef = useRef(null);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [mediaMatches, setMediaMatches] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [idleReady, setIdleReady] = useState(false);
  const [readyLoadCycle, setReadyLoadCycle] = useState(null);

  useEffect(() => {
    const breakpointQuery = window.matchMedia(mediaQuery);
    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const updateBreakpoint = () => setMediaMatches(breakpointQuery.matches);
    const updateMotionPreference = () =>
      setReducedMotion(motionQuery.matches);

    updateBreakpoint();
    updateMotionPreference();

    const removeBreakpointListener = addMediaQueryListener(
      breakpointQuery,
      updateBreakpoint,
    );
    const removeMotionListener = addMediaQueryListener(
      motionQuery,
      updateMotionPreference,
    );

    return () => {
      removeBreakpointListener();
      removeMotionListener();
    };
  }, [mediaQuery]);

  useEffect(() => {
    if (
      posterRef.current?.complete &&
      posterRef.current.naturalWidth > 0
    ) {
      setPosterLoaded(true);
    }
  }, []);

  useEffect(() => {
    setIdleReady(false);

    if (!posterLoaded || !mediaMatches || reducedMotion) {
      return undefined;
    }

    const markIdleReady = () => setIdleReady(true);

    if ("requestIdleCallback" in window) {
      const idleCallbackId = window.requestIdleCallback(markIdleReady, {
        timeout: 2000,
      });
      return () => window.cancelIdleCallback(idleCallbackId);
    }

    const timeoutId = window.setTimeout(markIdleReady, 1);
    return () => window.clearTimeout(timeoutId);
  }, [mediaMatches, posterLoaded, reducedMotion]);

  const videoEligible =
    Boolean(videoSrc) &&
    isVideoEligible({
      posterLoaded,
      mediaMatches,
      reducedMotion,
      idleReady,
    });
  const activeVideoSrc = selectDeferredVideoSource({
    videoEligible,
    videoSrc,
  });
  const videoLoadCycle = useMemo(
    () => Symbol("hero-video-load-cycle"),
    [activeVideoSrc],
  );
  const videoReady = isVideoLoadCycleReady({
    videoEligible,
    loadCycle: videoLoadCycle,
    readyLoadCycle,
  });
  const videoState = videoReady ? "ready" : videoEligible ? "loading" : "poster";
  const rootClassName = ["hero-media", className].filter(Boolean).join(" ");

  useEffect(() => {
    if (!videoEligible) {
      setReadyLoadCycle(null);
    }
  }, [videoEligible]);

  return (
    <div className={rootClassName} data-video-state={videoState}>
      <img
        ref={posterRef}
        src={HERO_POSTER_SRC}
        width={1920}
        height={1080}
        alt="Automated warehouse robots moving inventory through a modern facility"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        draggable={false}
        className={`hero-media__poster${
          videoReady ? " hero-media__poster--video-ready" : ""
        }`}
        onLoad={() => setPosterLoaded(true)}
      />

      <video
        src={activeVideoSrc}
        poster={HERO_POSTER_SRC}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        draggable={false}
        aria-hidden="true"
        className={`hero-media__video${
          videoReady ? " hero-media__video--ready" : ""
        }`}
        onCanPlay={() => setReadyLoadCycle(videoLoadCycle)}
      />
    </div>
  );
}
