"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { animation } from "../../helpers/utils";
import CommonButton from "../../components/common/CommonButton";
import ImageComponent from "../../components/common/ImageComponent";

const Head = ({ title, subtitle }) => (
  <div className="recap-head">
    <motion.h2
      className="font-40-regular color-black-1 text-center"
      variants={animation.fadeInUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        className="font-16-light color-grey-1 text-center recap-subtitle"
        variants={animation.fadeInUpVariant}
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// "Recap & Resources": clickable Key-takeaways list that drives the recording
// card on the right. The first takeaway is active by default.
const RecapResources = ({ resources }) => {
  const [active, setActive] = useState(0);
  const takeaways = resources.takeaways || [];
  const recording = takeaways[active]?.recording;

  return (
    <section className="recap-section">
      <Head title={resources.title} subtitle={resources.subtitle} />
      <div className="recap-resources">
        <motion.div
          className="recap-takeaways"
          variants={animation.fromLeftVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="font-24-medium color-black-1">
            {resources.takeawaysTitle}
          </p>
          <div className="recap-takeaways-list">
            {takeaways.map((t, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  type="button"
                  aria-pressed={isActive}
                  className={`takeaway-card ${isActive ? "is-active" : ""}`}
                  onClick={() => setActive(i)}
                >
                  <p
                    className={`font-20-medium takeaway-title ${
                      isActive ? "color-white" : "color-black-1"
                    }`}
                  >
                    {t.title}
                  </p>
                  <p
                    className={`font-16-light takeaway-text ${
                      isActive ? "color-white" : "color-grey-1"
                    }`}
                  >
                    {t.text}
                  </p>
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="recap-recording"
          variants={animation.fromRightVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {recording && (
            <motion.div
              key={active}
              className="recap-recording-inner"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div className="recap-recording-img">
                <ImageComponent
                  src={recording.image}
                  alt={recording.title}
                  className="common-img"
                />
                <span className="recap-recording-tag font-14-regular color-black-1">
                  {recording.tag}
                </span>
              </div>
              <div className="recap-recording-body">
                <h3 className="font-24-medium color-black-1">
                  {recording.title}
                </h3>
                <p className="font-16-regular color-grey-1">{recording.meta}</p>
                <CommonButton
                  theme="green"
                  title={recording.buttonLabel}
                  onClick={() =>
                    recording.link && window.open(recording.link, "_blank")
                  }
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const EventFloorRecap = ({ data }) => {
  if (!data) return null;
  const { moments, stats, resources } = data;

  return (
    <>
      {/* ── Moments from the floor ── */}
      {moments && (
        <section className="recap-section">
          <Head title={moments.title} subtitle={moments.subtitle} />
          <div className="moments-gallery">
            {moments.gallery.map((img, i) => (
              <motion.div
                key={img.id}
                className={`moment-tile moment-tile-${i + 1}`}
                variants={animation.linkVariant}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <ImageComponent
                  src={img.image}
                  alt={img.caption}
                  className="common-img"
                />
                <div className="moment-overlay" />
                <p className="moment-caption font-16-medium color-white">
                  {img.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── Impact stats ── */}
      {stats && stats.length > 0 && (
        <section className="recap-section">
          <div className="recap-stats-grid">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className="recap-stat-card"
                variants={animation.fadeInUpVariant}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <p className="font-40-semibold color-green-1">{s.value}</p>
                <p className="font-16-light color-grey-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── Recap & Resources ── */}
      {resources && <RecapResources resources={resources} />}
    </>
  );
};

export default EventFloorRecap;
