export function isVideoEligible({
  posterLoaded,
  mediaMatches,
  reducedMotion,
  idleReady,
}) {
  return posterLoaded && mediaMatches && !reducedMotion && idleReady;
}

export function isVideoLoadCycleReady({
  videoEligible,
  loadCycle,
  readyLoadCycle,
}) {
  return (
    videoEligible &&
    loadCycle != null &&
    readyLoadCycle === loadCycle
  );
}

export function selectDeferredVideoSource({
  videoEligible,
  videoSrc,
}) {
  return videoEligible ? videoSrc : undefined;
}
