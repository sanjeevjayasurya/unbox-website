"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import "./index.css";
import CareersPositionComponent from "../../components/company/CareersPositionComponent";
import { careerHeroImage } from "../../helpers/assets";
import Search from "../../assets/icons/search-normal.svg";
import LocationPin from "../../assets/icons/location.svg";
import { motion } from "framer-motion";
import { animation } from "../../helpers/utils";
import { useRouter } from "next/navigation";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import ImageComponent from "../../components/common/ImageComponent";
import CommonButton from "../../components/common/CommonButton";
import Loader from "../../components/common/Loader";
import { useJobs } from "../../hooks/useJobs";
import {
  careersWhyWorkTabs,
  lifeAtUnboxImages,
  whyJoinUsList,
  careerLocations,
} from "./config";

const ALL = "All";
const PAGE_SIZE = 5;

const CareersCompanyPage = () => {
  const router = useRouter();
  const { jobs, isLoading, error } = useJobs();

  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(ALL);
  const [selectedDepartment, setSelectedDepartment] = useState(ALL);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const openPositionsRef = useRef(null);

  const scrollToOpenPositions = () => {
    openPositionsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Distinct locations across all live jobs, for the right-hand chip group.
  const locationOptions = useMemo(
    () =>
      [
        ...new Set(
          jobs.flatMap((j) => j.locations || [j.location]).filter(Boolean),
        ),
      ].sort(),
    [jobs],
  );

  // Jobs matching the search + location filters (department-agnostic), so the
  // department chip counts reflect what selecting that chip would surface.
  const baseFiltered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesLoc =
        selectedLocation === ALL ||
        (job.locations || [job.location]).includes(selectedLocation);
      const matchesTerm =
        !term ||
        [job.title, job.department, job.location, job.type, job.summary]
          .filter(Boolean)
          .some((v) => v.toLowerCase().includes(term));
      return matchesLoc && matchesTerm;
    });
  }, [jobs, searchTerm, selectedLocation]);

  const departmentChips = useMemo(() => {
    const counts = new Map();
    baseFiltered.forEach((j) => {
      const d = j.department || "Other";
      counts.set(d, (counts.get(d) || 0) + 1);
    });
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [baseFiltered]);

  // Final list after applying the department chip too, mapped to the card shape.
  const filteredJobs = useMemo(() => {
    return baseFiltered
      .filter(
        (j) =>
          selectedDepartment === ALL ||
          (j.department || "Other") === selectedDepartment,
      )
      .map((job) => ({
        id: job.id,
        title: job.title,
        subTitle: job.summary || "",
        location: job.location,
        type: job.type,
        department: job.department,
        locations: job.locations,
        description: job.description,
        experience: job.experience,
        applyUrl: job.applyUrl,
        postedAt: job.postedAt,
      }));
  }, [baseFiltered, selectedDepartment]);

  // Reset pagination whenever the effective filter set changes.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchTerm, selectedLocation, selectedDepartment]);

  // Warm the browser cache for every tab image up-front so switching tabs
  // swaps instantly with no load flash.
  useEffect(() => {
    careersWhyWorkTabs.forEach((t) => {
      const img = new Image();
      img.src = t.image;
    });
  }, []);

  const visibleJobs = filteredJobs.slice(0, visibleCount);
  const remaining = filteredJobs.length - visibleJobs.length;

  const hasActiveFilters =
    searchTerm || selectedLocation !== ALL || selectedDepartment !== ALL;

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLocation(ALL);
    setSelectedDepartment(ALL);
  };

  const activeTabData = careersWhyWorkTabs[activeTab];

  return (
    <>
      <HelmetWrapper
        title="Careers"
        description="Join the minds behind the machines. Explore open positions at Unbox Robotics."
      />

      {/* ---------- Hero ---------- */}
      <section className="careers-hero-wrap">
        <motion.div
          className="careers-hero"
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: [0, 0.71, 0.2, 1.01] }}
        >
          <ImageComponent
            src={careerHeroImage}
            className="common-img"
            alt="Join the Unbox Robotics team"
          />
          <div className="careers-hero-overlay">
            <motion.h1
              className="color-white careers-hero-title"
              variants={animation.fadeInUpVariant}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              Join the Minds Behind the{" "}
              <span className="hero-accent">Machines.</span>
            </motion.h1>
            <motion.p
              className="font-16-light color-white careers-hero-sub"
              variants={animation.fadeInUpVariant}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              Become part of a passionate team designing intelligent robotic
              solutions for the world's fastest-growing industries.
            </motion.p>
            <motion.div
              variants={animation.fadeInUpVariant}
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <CommonButton
                theme="green"
                title="View Open Position"
                onClick={scrollToOpenPositions}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ---------- Why you should work with Unbox ---------- */}
      <section className="careers-section why-work-section">
        <motion.h2
          className="font-40-regular color-black-1"
          variants={animation.fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          Why you should work with Unbox Robotics
        </motion.h2>
        <div className="why-work-card">
          <div
            className="why-work-tabs flex p-[3px] rounded-full max-[567px]:rounded-[16px] border-[#141313] border max-[567px]:!bg-transparent  max-[567px]:border-none justify-between"
            role="tablist"
            aria-label="Why work with us"
          >
            {careersWhyWorkTabs.map((tab, index) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === index}
                onClick={() => setActiveTab(index)}
                className={`why-work-tab rounded-full font-16-light transition-colors relative w-full responsive-padding ${
                  activeTab === index
                    ? "is-active text-white"
                    : "text-[#141313]"
                }`}
              >
                {activeTab === index && (
                  <motion.div
                    layoutId="whyWorkActivePill"
                    className="why-work-pill absolute inset-0 bg-black rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="why-work-content">
            {/* Persistent <img>: the browser keeps the current frame until the
                new src decodes, so swapping tabs never flashes a blank/blur
                placeholder (unlike a re-mounted lazy image). */}
            <div className="why-work-image">
              <img
                src={activeTabData.image}
                className="common-img"
                alt={activeTabData.label}
                draggable={false}
              />
            </div>
            <motion.p
              key={`txt-${activeTabData.id}`}
              className="font-24-light color-black-1 why-work-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {activeTabData.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ---------- Life at Unbox ---------- */}
      <section className="careers-section life-section">
        <div className="careers-section-head">
          <motion.h2
            className="font-40-regular color-black-1"
            variants={animation.fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            Life at Unbox
          </motion.h2>
          <motion.p
            className="font-16-light color-grey-1"
            variants={animation.fadeInUpVariant}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            A look at the teams, labs and deployments behind the platform.
          </motion.p>
        </div>
        <div className="life-gallery">
          {lifeAtUnboxImages.map((img, index) => (
            <motion.div
              key={img.id}
              className={`life-tile life-tile-${index + 1}`}
              variants={animation.linkVariant}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <ImageComponent
                src={img.image}
                className="common-img"
                alt={img.alt}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- Why Join Us ---------- */}
      <div className="why-join-bg">
        <section className="careers-section why-join-section">
          <div className="careers-section-head">
            <motion.h2
              className="font-40-regular color-black-1"
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              Why Join Us
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1"
              variants={animation.fadeInUpVariant}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              Support to do the best work of your career
            </motion.p>
          </div>
          <div className="why-join-grid">
            {whyJoinUsList.map((item, index) => (
              <motion.div
                key={item.id}
                className="why-join-card"
                variants={animation.fadeInUpVariant}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                {item.icon}
                <div className="why-join-card-text">
                  <p className="font-20-medium color-black-1">{item.title}</p>
                  <p className="font-14-regular color-grey-1">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* ---------- Where we are ---------- */}
      <section className="careers-section locations-section">
        <div className="careers-section-head">
          <motion.h2
            className="font-40-regular color-black-1"
            variants={animation.fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            Where we are
          </motion.h2>
          <motion.p
            className="font-16-light color-grey-1"
            variants={animation.fadeInUpVariant}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            Our offices and engineering hubs across India.
          </motion.p>
        </div>
        <div className="locations-grid">
          {careerLocations.map((loc, index) => (
            <motion.div
              key={loc.id}
              className="location-card"
              variants={animation.fadeInUpVariant}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="location-card-left">
                <LocationPin stroke="#079d92" width={28} height={28} />
                <div className="location-card-info">
                  <p className="font-20-medium color-black-1">{loc.city}</p>
                  <p className="font-14-regular color-grey-1">{loc.country}</p>
                </div>
              </div>
              <span className="location-tag font-14-regular color-black-1">
                {loc.tag}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- Open Positions ---------- */}
      <section
        className="careers-section open-positions-section"
        id="open-positions"
        ref={openPositionsRef}
      >
        <div className="careers-section-head">
          <motion.h2
            className="font-40-regular color-black-1"
            variants={animation.fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            Open Positions
          </motion.h2>
          <motion.p
            className="font-16-light color-grey-1"
            variants={animation.fadeInUpVariant}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            Explore open roles across engineering, deployment and operations.
          </motion.p>
        </div>

        <div className="open-positions-search">
          <Search className="search-bar-icon" />
          <input
            type="text"
            className="text-input-careers font-16-regular color-black-1"
            placeholder="Search by title, skill or location.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search open positions"
          />
          {searchTerm && (
            <button
              type="button"
              className="search-clear-btn"
              aria-label="Clear search"
              onClick={() => setSearchTerm("")}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M12 4L4 12M4 4l8 8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>

        {!isLoading && !error && (
          <div className="chips-filter-row">
            <div className="chips-group">
              <p className="font-14-regular color-grey-1 chips-group-label">
                Department
              </p>
              <div className="chips-wrap">
                <button
                  type="button"
                  className={`filter-chip font-14-regular ${
                    selectedDepartment === ALL ? "is-active" : ""
                  }`}
                  onClick={() => setSelectedDepartment(ALL)}
                >
                  All
                  <span className="chip-count">{baseFiltered.length}</span>
                </button>
                {departmentChips.map(([dept, count]) => (
                  <button
                    key={dept}
                    type="button"
                    className={`filter-chip font-14-regular ${
                      selectedDepartment === dept ? "is-active" : ""
                    }`}
                    onClick={() => setSelectedDepartment(dept)}
                  >
                    {dept}
                    <span className="chip-count">{count}</span>
                  </button>
                ))}
              </div>
            </div>

            {locationOptions.length > 0 && (
              <div className="chips-group">
                <p className="font-14-regular color-grey-1 chips-group-label">
                  Location
                </p>
                <div className="chips-wrap">
                  <button
                    type="button"
                    className={`filter-chip font-14-regular ${
                      selectedLocation === ALL ? "is-active" : ""
                    }`}
                    onClick={() => setSelectedLocation(ALL)}
                  >
                    All
                  </button>
                  {locationOptions.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      className={`filter-chip font-14-regular ${
                        selectedLocation === loc ? "is-active" : ""
                      }`}
                      onClick={() => setSelectedLocation(loc)}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <p className="font-20-medium color-black-1 careers-status-text">
            We couldn't load open positions right now. Please try again later.
          </p>
        ) : filteredJobs.length === 0 ? (
          <div className="careers-status-text">
            <p className="font-20-medium color-black-1">
              No open positions match your search.
            </p>
            {hasActiveFilters && (
              <button className="careers-clear-filters" onClick={clearFilters}>
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            <p className="font-16-regular color-black-1 roles-open-count">
              <strong>{filteredJobs.length}</strong> Roles Open
            </p>
            <CareersPositionComponent
              data={visibleJobs}
              onClick={(job) => router.push(`/careers/${job.id}`)}
            />
            {remaining > 0 && (
              <div className="load-more-wrap">
                <CommonButton
                  theme="green"
                  title={`Load more (${remaining})`}
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                />
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default CareersCompanyPage;
