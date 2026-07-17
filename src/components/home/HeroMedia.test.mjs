import assert from "node:assert/strict";
import test from "node:test";

import {
  isVideoEligible,
  isVideoLoadCycleReady,
  selectDeferredVideoSource,
} from "./heroMediaEligibility.mjs";

const eligibleState = {
  posterLoaded: true,
  mediaMatches: true,
  reducedMotion: false,
  idleReady: true,
};

test("video is eligible when every loading condition is satisfied", () => {
  assert.equal(isVideoEligible(eligibleState), true);
});

for (const [condition, value] of [
  ["posterLoaded", false],
  ["mediaMatches", false],
  ["reducedMotion", true],
  ["idleReady", false],
]) {
  test(`video is ineligible when ${condition} is ${value}`, () => {
    assert.equal(
      isVideoEligible({ ...eligibleState, [condition]: value }),
      false,
    );
  });
}

test("video is ready only when the current load cycle reached canplay", () => {
  const loadCycle = {};

  assert.equal(
    isVideoLoadCycleReady({
      videoEligible: true,
      loadCycle,
      readyLoadCycle: loadCycle,
    }),
    true,
  );
});

test("returning to a prior source remains hidden during its new load cycle", () => {
  const firstSourceALoadCycle = {};
  const secondSourceALoadCycle = {};

  assert.equal(
    isVideoLoadCycleReady({
      videoEligible: true,
      loadCycle: secondSourceALoadCycle,
      readyLoadCycle: firstSourceALoadCycle,
    }),
    false,
  );
});

test("eligible video receives its deferred source", () => {
  assert.equal(
    selectDeferredVideoSource({
      videoEligible: true,
      videoSrc: "/videos/hero.webm",
    }),
    "/videos/hero.webm",
  );
});

test("ineligible video has no source to fetch", () => {
  assert.equal(
    selectDeferredVideoSource({
      videoEligible: false,
      videoSrc: "/videos/hero.webm",
    }),
    undefined,
  );
});
