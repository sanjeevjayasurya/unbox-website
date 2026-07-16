const _assetUrl = (m) =>
  m && typeof m === "object"
    ? (m.default && m.default.src) || m.default || m.src || m
    : m;
export const eventRobot = _assetUrl(require("./assets/event-robot.webp"));
export const robot = _assetUrl(require("./assets/robot.webp"));

export const shahid = _assetUrl(require("./assets/shahid.webp"));
export const rohit = _assetUrl(require("./assets/rohit.webp"));
export const lukasz = _assetUrl(require("./assets/lukasz.webp"));
export const swapnil = _assetUrl(require("./assets/swapnil.webp"));

export const unboxSecure = _assetUrl(require("./assets/unbox-secure.webp"));

export const europeHero = _assetUrl(require("./assets/europe-hero.webp"));
export const europeLogo = _assetUrl(require("./assets/europe-logo.webp"));
export const cematAusLogo = _assetUrl(require("./assets/cemat-aus.webp"));
export const productImage = _assetUrl(require("./assets/download.webp"));
export const whyUnboxImage = _assetUrl(require("./assets/why-unbox.webp"));
export const cematAusHero = _assetUrl(require("./assets/cemat-aus-hero.webp"));
export const heroVideo = _assetUrl(require("./assets/unbox-robot.webm"));
// Match seo.js LCP preload — same shot as the JPG, much smaller.
export const heroVideoPoster = "/images/hero-poster.webp";
