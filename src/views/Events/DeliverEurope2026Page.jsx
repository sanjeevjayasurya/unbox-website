"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./index.css";
import "./deliver.css";
import CommonButton from "../../components/common/CommonButton";
import LogoScroller from "../../components/home/LogoScroller";
import { clientInfo } from "../../helpers/config";
import CalendarIcon from "./assets/calendar.svg";
import LocationIcon from "./assets/location.svg";
import CloseIcon from "../../assets/icons/Close_SM.svg";
import navLogoUrl from "../../assets/icons/nav-logo.svg?url";
import {
  eventRobot,
  lukasz,
  rohit,
  shahid,
  europeLogo,
  productImage,
} from "./assets";
import SortDestinationsIcon from "./assets/sort-destinations.svg";
import SpaceOptIcon from "./assets/space-optimization.svg";
import ProductivityIcon from "./assets/productivity.svg";
import LiveInUnderIcon from "./assets/live-in-under.svg";
import AccuracyIcon from "./assets/accuracy.svg";
import VerticalReachIcon from "./assets/verticle-reach.svg";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import TextField from "../../components/common/form/TextField";
import { animation } from "../../helpers/utils";
import { AnimatePresence, motion } from "framer-motion";
import { base_url, rsvpApiEndPoint } from "../../helpers/config";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import { deliverEurope2026Schema } from "../../helpers/schemas";
import caseStudyVideo from "./assets/unbox-robot.mp4";
import MotifeIcon from "./assets/motife.svg";
import { europeEventLogo, unboxsort3 } from "../../helpers/assets";
import { isEventPast } from "./config";

const deliverEuropeHero = process.env.PUBLIC_URL + "/images/deliver-europe-hero.webp";

const PUBLIC_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "aol.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
  "zoho.com",
  "yandex.com",
];

const speakingSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  companyName: z.string().min(1, "Company Name is required"),
  title: z.string().min(1, "Title is required"),
  companyEmail: z
    .string()
    .min(1, "Company Email is required")
    .email("Invalid Email")
    .refine((email) => {
      const domain = email.split("@")[1]?.toLowerCase();
      return !PUBLIC_EMAIL_DOMAINS.includes(domain);
    }, "Please use a business email address. Public email domains are not allowed."),
});

const teamMembers = [
  {
    id: 1,
    name: "Shahid Memon",
    post: "Co-Founder & CTO",
    image: shahid,
    link: "https://www.linkedin.com/in/shahid-m-a7a83a96/",
    tbd: false,
  },
  {
    id: 2,
    name: "Rohit Pitale",
    post: "CGO",
    image: rohit,
    link: "https://www.linkedin.com/in/rohit-pitale/",
    tbd: false,
  },
  { id: 3, name: "TBD", post: "-", image: rohit, link: null, tbd: true },
  { id: 4, name: "TBD", post: "-", image: lukasz, link: null, tbd: true },
];

const experts = [
  {
    id: 1,
    name: "Lukasz Banachowicz",
    post: "Sales Director - EMEA",
    image: lukasz,
    link: "https://calendar.app.google/zgzysD2g1rJNAPZZ6",
  },
  {
    id: 2,
    name: "Rohit Pitale",
    post: "CGO",
    image: rohit,
    link: "https://calendar.app.google/rgn6vqGdfzHNbPc48",
  },
];

const showcaseStats = [
  { value: "2000 +", label: "Sort Destinations", Icon: SortDestinationsIcon },
  { value: "50-70% +", label: "Space Optimization", Icon: SpaceOptIcon },
  { value: "3x +", label: "Productivity", Icon: ProductivityIcon },
  { value: "6-9 weeks", label: "Live  in Under", Icon: LiveInUnderIcon },
  { value: "99.9% +", label: "Accuracy", Icon: AccuracyIcon },
  {
    value: "3D vertical reach",
    label: "Vertical reach up to 2.4",
    Icon: VerticalReachIcon,
  },
];

const brandsData = [
  {
    category: "RETAIL",
    name: "GLOBAL FASHION RETAIL GROUP",
    detail: "460 sort destinations. 99.9% accuracy. Live in 1 month.",
  },
  {
    category: "E-COMMERCE",
    name: "LEADING E-COMMERCE BRAND",
    detail: "Up to 11,500 parcels per hour. 99.9%+ accuracy.",
  },
  {
    category: "THIRD-PARTY LOGISTICS",
    name: "LEADING EXPRESS LOGISTICS COMPANY",
    detail: "3 FTEs on the floor. Scales up and down on demand.",
  },
];

const whyVisitItems = [
  { id: 1, text: "Browse customer success stories", highlight: false },
  { id: 2, text: "See UnboxSort run live", highlight: true },
  {
    id: 3,
    text: "Catch our session, Thu 4 June at 16:00 CET",
    highlight: false,
  },
  { id: 4, text: "Meet the team behind the platform", highlight: false },
];

/* ── RSVP Modal ── */
const RSVPModal = ({ visible, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(speakingSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      title: "",
      companyEmail: "",
    },
  });

  useEffect(() => {
    if (!visible) {
      const t = setTimeout(() => reset(), 300);
      return () => clearTimeout(t);
    }
    document.body.classList.add("modal-open");
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible, reset, onClose]);

  const toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        fullName: data.fullName,
        companyName: data.companyName,
        title: data.title,
        email: data.companyEmail,
      };
      const res = await fetch(`${base_url}${rsvpApiEndPoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Submission failed");
      }
      onClose();
      reset();
      toast.fire({ icon: "success", title: "Registered successfully!" });
    } catch (error) {
      toast.fire({
        icon: "error",
        title: error.message || "Failed to submit. Please try again.",
      });
    }
  };

  const modal = (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="de-rsvp-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="de-rsvp-modal"
            data-lenis-prevent
            initial={{ opacity: 0, scale: 0.9, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="de-rsvp-modal-header">
              <p className="font-20-medium color-black-1">
                RSVP to our Session
              </p>
              <button
                type="button"
                onClick={onClose}
                className="de-rsvp-close-btn"
                aria-label="Close"
              >
                <CloseIcon stroke="black" aria-hidden="true" />
              </button>
            </div>

            {/* Session banner */}
            <div className="de-rsvp-session-banner">
              <img
                src={lukasz}
                alt="Lukasz Banachowicz"
                className="de-rsvp-speaker-avatar"
                draggable={false}
              />
              <div className="de-rsvp-banner-text">
                <p className="font-20-light color-black-1">
                  World's First{" "}
                  <span className="!font-semibold">
                    Vertical Mobile Sortation:
                  </span>{" "}
                  Redefining Warehouse Physics in Three Dimensions
                </p>
                <p className="font-14-regular color-black-1">
                  Speaker: Łukasz Banachowicz, Sales Director EMEA, Unbox
                  Robotics
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="de-rsvp-form">
              <TextField
                label="Full Name"
                name="fullName"
                required
                register={register}
                error={errors.fullName?.message}
              />
              <TextField
                label="Company Name"
                name="companyName"
                required
                register={register}
                error={errors.companyName?.message}
              />
              <div className="de-form-row">
                <TextField
                  label="Title"
                  name="title"
                  required
                  register={register}
                  error={errors.title?.message}
                />
                <TextField
                  label="Company Email ID"
                  name="companyEmail"
                  type="email"
                  required
                  register={register}
                  error={errors.companyEmail?.message}
                />
              </div>

              {/* Date / Location */}
              <div className="de-rsvp-session-meta">
                <div className="de-rsvp-meta-item flex-1">
                  <div className="de-rsvp-meta-icon">
                    <CalendarIcon fill="#079D92" width={20} height={20} />
                  </div>
                  <span className="font-16-light color-black-1">
                    Thu 4 , June 2026
                  </span>
                </div>
                <div className="de-rsvp-meta-item flex-1">
                  <div className="de-rsvp-meta-icon">
                    <LocationIcon stroke="#079D92" width={20} height={20} />
                  </div>
                  <span className="font-16-light color-black-1">
                    TAETS Event Park, Amsterdam
                  </span>
                </div>
              </div>

              {/* Submit */}
              <div className="de-rsvp-row">
                <CommonButton
                  type="submit"
                  theme={"green"}
                  disabled={isSubmitting}
                  title={isSubmitting ? "Submitting..." : "RSVP to Our Session"}
                />
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return typeof document !== "undefined"
    ? createPortal(modal, document.body)
    : null;
};

/* ── Page ── */
const DeliverEurope2026Page = () => {
  const [hoveredId, setHoveredId] = useState(1);
  const [teamHoveredId, setTeamHoveredId] = useState(1);
  const [rsvpModalOpen, setRsvpModalOpen] = useState(false);
  const isPast = isEventPast("/events/deliver-europe-2026");

  return (
    <>
      <HelmetWrapper
        title="DELIVER Europe 2026"
        description="Meet UnboxSort at DELIVER Europe 2026 — World's First Vertical Mobile Sortation. Join us at Booth C66, TAETS Event Park, Amsterdam, June 3–4, 2026."
        image={eventRobot}
      />
      <SchemaMarkup schema={deliverEurope2026Schema} />

      {/* ── 1. HERO ── */}
      <section className="event-hero-container">
        <div className="de-hero">
          <img
            src={deliverEuropeHero}
            alt="UnboxSort robots"
            className="de-hero-bg"
            fetchPriority="high"
            draggable={false}
          />
          <div className="de-hero-gradient" />
          <motion.div
            className="de-hero-content"
            initial="hidden"
            animate="visible"
            variants={animation.fromLeftVariant}
          >
            <div className="de-hero-title-wrap">
              <span className="de-hero-title-bar" />
              <h1 className="text-white res-font-48-extralight">
                Meet UnboxSort at{" "}
                <span className="font-semibold">DELIVER Europe 2026</span>
              </h1>
            </div>

            <div className="de-hero-meta">
              <div className="de-hero-meta-row">
                <div className="de-hero-icon-circle">
                  <CalendarIcon fill="#079D92" width={34} height={34} />
                </div>
                <span className="font-24-light text-white">
                  Wed 3 – Thu 4 , June 2026
                </span>
              </div>
              <div className="de-hero-meta-row">
                <div className="de-hero-icon-circle">
                  <LocationIcon stroke="#079D92" width={34} height={34} />
                </div>
                <span className="font-24-light text-white">
                  TAETS Event Park, Amsterdam
                </span>
              </div>
            </div>

            <div className="flex gap-5 flex-wrap">
              {!isPast && (
                <a
                  href={"https://calendar.app.google/zgzysD2g1rJNAPZZ6"}
                  target="__blank"
                >
                  <CommonButton theme="green" title="Book A Meeting" />
                </a>
              )}

              <CommonButton
                theme="white"
                title=" RSVP to Our Session"
                onClick={() => setRsvpModalOpen(true)}
              />
            </div>

            <div className="de-hero-logos-bar">
              <img
                src={europeEventLogo}
                alt="Deliver Europe"
                className="h-[74px] max-[567px]:h-[40px] w-auto"
                width={211}
                height={74}
                draggable={false}
              />
              <div className="de-logos-divider max-[567px]:!h-[40px]" />
              <div className="flex items-center gap-1">
                <img
                  src={navLogoUrl}
                  alt="Unbox Robotics icon"
                  className=" h-[52px] max-[567px]:h-[40px]"
                  draggable={false}
                />
                <span className="font-24-medium max-[567px]:!text-[15px] text-white !font-bold">
                  Unbox Robotics
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. SPEAKING SESSION ── */}
      <section className="de-section">
        <motion.div
          className="flex gap-5 max-[768px]:flex-col"
          variants={animation.fadeInUpVariant}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Left — speaker photo card */}
          <div className="de-speaker-card">
            <div className="de-speaker-img-box">
              <img
                src={lukasz}
                alt="Lukasz Banachowicz"
                className="de-speaker-img"
                draggable={false}
              />
            </div>
            <div className="de-speaker-details">
              <p className="font-24-light color-black-1">Lukasz Banachowicz</p>
              <p className="font-16-light color-grey-1">Speaker</p>
            </div>
          </div>

          {/* Right — session info */}
          <div className="de-session-info-panel">
            <p className="font-20-light color-black-1 uppercase">
              Speaking Session
            </p>
            <p className="font-24-medium color-green-1">
              Thu 4 , June 2026 &nbsp;|&nbsp; 14:00 to 14:25
            </p>
            <p className="font-40-light color-black-1">
              World's First{" "}
              <span className="!font-semibold">Vertical Mobile Sortation:</span>{" "}
              Redefining Warehouse Physics in Three Dimensions
            </p>
            <p className="font-16-light color-black-1">
              <span className="color-grey-1">Speaker:</span> Łukasz Banachowicz,
              Sales Director EMEA, Unbox Robotics
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── 3. WHAT WE ARE SHOWCASING ── */}
      <section className="de-section">
        <div className="space-y-5">
          <motion.h2
            className="font-40-regular color-black-1 text-center"
            variants={animation.fadeInUpVariant}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            What We Are Showcasing UnboxSort
          </motion.h2>
          <motion.p
            className="font-16-light color-grey-1 text-center"
            variants={animation.fadeInUpVariant}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Vertical robotic sortation, built for Omnichannel DCs.
          </motion.p>
        </div>

        <motion.div
          className="industry-case-study-image-wrap"
          custom={0}
          variants={animation.itemFromRightVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <video
            src={caseStudyVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            draggable={false}
            className="industry-case-study-image"
          />
        </motion.div>

        <div className="de-showcase-split">
          <motion.div
            className="de-showcase-half-img-wrap"
            variants={animation.fromLeftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <img
              src={unboxsort3}
              className="de-showcase-half-img"
              alt="product image"
              draggable={false}
            />
          </motion.div>

          <motion.div
            className="de-swarm-card"
            variants={animation.fromRightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="font-16-light color-black-1 uppercase">Powered By</p>
            <div className="space-y-5">
              <h3 className="font-40-regular text-[var(--green-2)]">
                Swarm Intelligence
              </h3>
              <div className="font-16-light color-black-1 flex flex-col gap-2">
                <p>No central controller. No fixed paths.</p>
                <p>Each robot picks its own route. The fleet moves as one.</p>
                <p>
                  When a chute fills or volume spikes, the system reroutes in
                  real time.
                </p>
              </div>
            </div>
            <p className="font-20-medium color-black-1">
              Inspired by ant colonies. Built for warehouses.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="de-stats-grid"
          variants={animation.fadeInUpVariant}
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {showcaseStats.map((stat, i) => (
            <div key={i} className="de-stat-card">
              <div className="de-stat-card-icon">
                <stat.Icon width={44} height={44} />
              </div>
              <div className="de-stat-card-text">
                <p className="font-18-regular color-green-1 !font-semibold">
                  {stat.value}
                </p>
                <p className="font-16-light color-black-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── 4. LIVE WITH LEADING BRANDS ── */}
      <section className="de-section-2">
        <div className="flex flex-col gap-5">
          <motion.h2
            className="font-40-regular color-black-1 text-center"
            variants={animation.fadeInUpVariant}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Live with Leading Brands
          </motion.h2>
          <motion.p
            className="font-16-light color-grey-1 text-center"
            style={{ maxWidth: 660, margin: "0 auto" }}
            variants={animation.fadeInUpVariant}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Live deployments across Europe, India, Turkey, and beyond. Many more
            stories at the booth.
          </motion.p>
        </div>

        <div className="de-scroller-breakout">
          <LogoScroller clients={clientInfo} speed="fast" />
        </div>

        <div className="de-brands-cards-wrap">
          <motion.div
            className="de-brands-grid"
            variants={animation.fadeInUpVariant}
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {brandsData.map((brand, i) => (
              <div key={i} className="de-brand-card">
                <p className="font-20-medium text-[var(--green-2)] uppercase">
                  {brand.category}
                </p>
                <div className="de-brand-bottom">
                  <p className="font-20-medium color-black-1">{brand.name}</p>
                  <p className="font-16-light color-black-1 ">{brand.detail}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. MEET THE TEAM ── */}
      <section className="de-section">
        <div className="flex flex-col gap-5">
          <motion.h2
            className="font-40-regular color-black-1 text-center"
            variants={animation.fadeInUpVariant}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Meet the Team at Booth C66
          </motion.h2>
          <motion.p
            className="font-16-light color-grey-1 text-center"
            variants={animation.fadeInUpVariant}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            The two of us will be at the booth across both days.
          </motion.p>
        </div>

        <motion.div
          className="flex flex-col lg:flex-row lg:min-h-[700px] items-center justify-center gap-8 lg:gap-4"
          variants={animation.fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {experts.map((expert) => {
            const isHovered = teamHoveredId === expert.id;

            return (
              <div
                key={expert.id}
                onMouseEnter={() => setTeamHoveredId(expert.id)}
                onMouseLeave={() => setTeamHoveredId(null)}
                className={`relative transition-all max-w-[480px] bg-[#F3F3F3] duration-500 ease-in-out cursor-pointer rounded-[20px] p-4 flex flex-col items-center w-full
                  ${isHovered ? "bg-[#F3F3F3]" : "lg:grayscale  lg:opacity-80"}
                  max-lg:grayscale-0 max-lg:scale-100 max-lg:bg-[#F3F3F3] `}
              >
                <div className="w-full overflow-hidden rounded-[10px] mb-6 max-h-[500px] max-[768px]:max-h-[350px] ">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className=""
                    draggable={false}
                  />
                </div>

                <div className="text-left w-full space-y-2">
                  <h3 className="font-24-light">{expert.name}</h3>
                  <p className="font-16-light">{expert.post}</p>
                </div>

                {!isPast && (
                  <div
                    className={` w-full overflow-hidden transition-all duration-500
                  ${isHovered ? "mt-6 max-h-20 opacity-100 " : "lg:max-h-0 lg:opacity-0"}
                  max-lg:max-h-20 max-lg:opacity-100 max-lg:mt-6
                `}
                  >
                    <a href={expert?.link} target="__blank">
                      <CommonButton theme={"green"} title={"Book a Meeting"} />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* ── 6. WHY VISIT US ── */}
      <section className="de-section">
        <div>
          <motion.h2
            className="font-40-regular color-black-1 text-center"
            variants={animation.fadeInUpVariant}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Why Visit Us
          </motion.h2>
        </div>

        <motion.div
          className="de-why-grid"
          variants={animation.fadeInUpVariant}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {whyVisitItems.map((item) => (
            <div key={item.id} className={`de-why-item`}>
              <MotifeIcon />
              <p className={`font-20-regular`}>{item.text}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── 7. DARK BOOTH CTA (upcoming events only) ── */}
      {!isPast && (
        <motion.div
          className="de-booth-cta"
          variants={animation.fadeInUpVariant}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p
            className="font-40-regular"
            style={{ color: "#fff", textAlign: "center" }}
          >
            Booth C66 &nbsp;|&nbsp; DELIVER Europe 2026
          </p>
          <a
            href={"https://calendar.app.google/zgzysD2g1rJNAPZZ6"}
            target="__blank"
          >
            <CommonButton theme="white" title="Book A Meeting" />
          </a>
        </motion.div>
      )}

      {/* RSVP Modal */}
      <RSVPModal
        visible={rsvpModalOpen}
        onClose={() => setRsvpModalOpen(false)}
      />
    </>
  );
};

export default DeliverEurope2026Page;
