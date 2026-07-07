"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { animation } from "../../helpers/utils";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import CommonButton from "../../components/common/CommonButton";
import LogoScroller from "../../components/home/LogoScroller";
import StickyScrollFill from "../../components/home/StickyScrollFill";
import { clientInfo } from "../../helpers/config";
import { machineTabsData } from "../solutions/config";
import "../solutions/index.css";
import "./SeriesBFundedPage.css";
import seriesBFundVideo from "../../assets/video/seriesBFundVideo.mp4";

import RadarIcon from "../solutions/assets/radar.svg";
import RoutingIcon from "../solutions/assets/routing-2.svg";
import MonitorIcon from "../solutions/assets/monitor.svg";
import PuzzlePieceIcon from "../solutions/assets/puzzle-piece.svg";
import AccuracyIcon from "../use-cases/assets/accuracy.svg";
import DeploymentIcon from "../use-cases/assets/deployment.svg";
import ScalesIcon from "../use-cases/assets/scales.svg";
import SpaceIcon from "../use-cases/assets/space.svg";
import FailureIcon from "../use-cases/assets/failure.svg";
import WmsIcon from "../use-cases/assets/wms.svg";
import OperatorIcon from "../use-cases/assets/operator.svg";
import RoiIcon from "../use-cases/assets/roi.svg";

/* ── Data ─────────────────────────────────────────────────────────── */

const heroStats = [
  { value: "3,000+", label: "parcels per hour, stable output" },
  { value: "100%", label: "sort accuracy, zero mis-sorts" },
  { value: "50%", label: "less floor space used" },
  { value: "2×", label: "faster capital recovery" },
];

const outcomesRail = [
  { value: "3×", label: "productivity per person" },
  { value: "60%", label: "reduction in cost per sort" },
  { value: "50%", label: "less floor space needed" },
  { value: "98.5%", label: "system uptime across peaks" },
  { value: "2×", label: "faster ROI vs. standard payback" },
];

const useCaseTabs = [
  {
    id: "fc",
    label: "Retail",
    heading: "Omnichannel Retailers",
    body: "Modern retail doesn't run on one channel. Store replenishment, online dispatch, Click & Collect preparation, and returns processing all happen in the same DC — often in the same shift. UnboxSort handles every flow simultaneously without requiring you to redesign your layout, expand your footprint, or add headcount every time volume grows.",
    metrics: [
      {
        value: "B2B and B2C order consolidation running in parallel",
        label: "",
      },
      {
        value: "Click & Collect sortation with automated pickup readiness",
        label: "",
      },
      {
        value: "Returns classified by condition and disposition automatically",
        label: "",
      },
      {
        value: "Sort to 2,000+ store codes within your existing footprint",
        label: "",
      },
    ],
    quote:
      "The two-step process also made training faster. New associates get up to speed quicker because there is less to learn and fewer places where things can go wrong.",
    attr: "From the deployment report — India's largest fashion e-commerce platform",
  },
  {
    id: "dc",
    label: "E-Commerce",
    heading: "eCommerce Marketplaces",
    body: "E-commerce volumes don't grow linearly they spike. Black Friday, End of season sale, flash sales. Manual consolidation teams and fixed conveyor systems are built for average days, not peak ones. UnboxSort scales with your volume curve, processes thousands of orders per batch with 100% accuracy, and reduces your dependence on a labour market that grows harder to staff every year.",
    metrics: [
      {
        value: "Scales 500–20,000 parcels/hr within the same deployment",
        label: "",
      },
      {
        value: "50–70% floor recovery through vertical 3D sortation",
        label: "",
      },
      {
        value: "Swarm fleet self-heals in 2 sec no peak-season stoppages",
        label: "",
      },
      {
        value: "Carrier-based outbound sortation with real-time adaptation",
        label: "",
      },
    ],
    quote:
      "Analytics dashboards gave them something they did not have before: clear operational data. Track destination fill rates, throughput by shift, and system performance — feeding back into planning for Black Friday.",
    attr: "From the deployment report — Global fast-fashion retailer, Spain",
  },
  {
    id: "sc",
    label: "3PL",
    heading: "Third-Party Logistics",
    body: "3PL operations are defined by complexity multiple clients, unpredictable volume swings, and SLA commitments that leave no room for sortation errors. You need automation that configures per client, scales per contract, and never creates cross-contamination between flows. UnboxSort gives you the flexibility to win new business and onboard it faster than any competitor using conventional automation.",
    metrics: [
      {
        value:
          "Multi-client flows with full segregation zero cross-contamination",
        label: "",
      },
      {
        value: "40–60% sortation headcount reduction across all shifts",
        label: "",
      },
      {
        value: "Mid-mile and last-mile sortation in one deployment",
        label: "",
      },
      {
        value: "Carrier sortation across multiple lanes simultaneously",
        label: "",
      },
    ],
    quote:
      "Conveyor systems face complete downtime with any loop failure or scheduled maintenance. A robotic system keeps the entire floor running while a single robot is serviced — removing the largest source of SLA risk.",
    attr: "From the cost benchmarking report — 3PL operations, Israel & India",
  },
  {
    id: "lm",
    label: "CEP",
    heading: "Courier, Express, and Parcel",
    body: "CEP networks move at parcel-network scale — thousands of destinations, tight morning dispatch windows, and hub footprints that were never designed for the conveyor infrastructure traditional sortation demands. UnboxSort sorts by route, by zone, by carrier, or by pin code — within the space you already have, at the throughput your network needs, without the civil works, the downtime, or the single point of failure.",
    metrics: [
      {
        value: "Single-touch order consolidation across thousands of SKUs",
        label: "",
      },
      {
        value: "Scales 500–20,000 parcels/hr within the same deployment",
        label: "",
      },
      {
        value: "50–70% floor recovery through vertical 3D sortation",
        label: "",
      },
      {
        value: "Swarm fleet self-heals in 2 sec no peak-season stoppages",
        label: "",
      },
    ],
    quote:
      "Designed for last-mile hubs handling delivery bags and mail bags. Replaces manual and matrix sorter setups with faster processing, 100% accuracy, and a compact footprint that works within your existing lease.",
    attr: "From product documentation — European CEP deployments",
  },
];

const howSteps = [
  {
    num: "01",
    title: "Audit & design",
    body: "We map your current throughput, space, and bottlenecks. Your customised audit comes back within 48 hours — including a recommended layout, robot count, and projected ROI at your volumes.",
    icon: <RadarIcon />,
  },
  {
    num: "02",
    title: "Deploy on your floor",
    body: "The grid-based system installs on your existing floor — no raised platforms, no civil works. Robots deploy modularly, so your facility stays operational throughout. WMS integration runs via browser-based software with no proprietary hardware lock-in.",
    icon: <MonitorIcon />,
  },
  {
    num: "03",
    title: "Run, scale, and adapt",
    body: "The swarm intelligence software manages robot traffic, destination allocation, and real-time throughput monitoring from a single dashboard. Scale up by adding robots — no rebuild, no downtime, no new facility.",
    icon: <ScalesIcon />,
  },
];

const roiItems = [
  "USD 0.05 per package vs USD 0.19 for manual setups and USD 0.10 for conveyor+PTL at equivalent throughput. That's up to a 80% cost-per-sort advantage.",
  "50% lower total cost of ownership vs conveyor belt sorters over 7 years — with a total 7-year TCO of USD 15M vs USD 28M for linear conveyor setups.",
  "No civil works, no shutdown. Installation on an existing floor means zero lost operating days and no facility reconstruction cost.",
];

const roiBars = [
  { label: "This system", value: "$0.05", pct: 28, color: "#079d92" },
  { label: "Mezzanine robots", value: "$0.09", pct: 75, color: "#B0BAC8" },
  { label: "Conveyor + PTL", value: "$0.10", pct: 88, color: "#B0BAC8" },
  { label: "Elevated robots", value: "$0.06", pct: 63, color: "#D0D3D8" },
  {
    label: "Manual setup",
    value: "$0.19",
    pct: 100,
    color: "#E4E7EC",
    dark: true,
  },
];

/* ── Sub-components ───────────────────────────────────────────────── */

const FormPanel = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [facilityType, setFacilityType] = useState("");
  const [formData, setFormData] = useState({
    throughput: "",
    challenge: "",
    area: "",
    email: "",
    company: "",
    name: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const facilityOptions = [
    "Fulfilment Centre (B2C / E-commerce)",
    "Distribution Centre (B2B / Stores)",
    "Sort Centre / Cross-dock",
    "Delivery Hub / Last Mile",
  ];

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="sb-form-success">
        <div className="sb-success-icon">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            stroke="#079d92"
            strokeWidth="2"
          >
            <polyline points="5,14 11,20 23,8" />
          </svg>
        </div>
        <h3
          className="font-20-medium color-white"
          style={{ marginBottom: "10px" }}
        >
          You're in the queue.
        </h3>
        <p
          className="font-16-light"
          style={{ color: "#5A6270", lineHeight: 1.6 }}
        >
          Expect your customised sorting assessment within 48 business hours.
          Explore how similar operations have transformed their throughput
          below.
        </p>
      </div>
    );
  }

  return (
    <div className="sb-form-wrap">
      <h3
        className="font-20-medium color-white"
        style={{ marginBottom: "6px" }}
      >
        Get your free sorting audit
      </h3>
      <p
        className="font-16-light"
        style={{ color: "#8A919E", marginBottom: "24px", fontSize: "13px" }}
      >
        Tell us about your operation. You'll receive a customised assessment
        within 48 hours.
      </p>

      {/* Step indicator */}
      <div className="sb-step-indicator">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`sb-step-dot ${
              s < step ? "done" : s === step ? "active" : "pending"
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="sb-form-step">
          <p className="sb-form-label">What type of facility do you operate?</p>
          <div className="sb-options">
            {facilityOptions.map((opt) => (
              <button
                key={opt}
                className={`sb-option ${
                  facilityType === opt ? "selected" : ""
                }`}
                onClick={() => setFacilityType(opt)}
                type="button"
              >
                <span className="sb-option-radio" />
                {opt}
              </button>
            ))}
          </div>
          <button
            className="sb-btn-primary"
            onClick={() => setStep(2)}
            type="button"
          >
            Continue →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="sb-form-step">
          <p className="sb-form-label">Current throughput (parcels/hour)</p>
          <select
            className="sb-form-select"
            value={formData.throughput}
            onChange={(e) =>
              setFormData({ ...formData, throughput: e.target.value })
            }
          >
            <option value="">Select range</option>
            <option>Under 500/hr</option>
            <option>500 – 2,000/hr</option>
            <option>2,000 – 5,000/hr</option>
            <option>5,000 – 15,000/hr</option>
            <option>15,000+/hr</option>
          </select>
          <p className="sb-form-label">Biggest operational challenge</p>
          <select
            className="sb-form-select"
            value={formData.challenge}
            onChange={(e) =>
              setFormData({ ...formData, challenge: e.target.value })
            }
          >
            <option value="">Select challenge</option>
            <option>Peak season capacity</option>
            <option>Sorting accuracy & errors</option>
            <option>Labour cost & availability</option>
            <option>Space constraints</option>
            <option>Slow ROI on current setup</option>
          </select>
          <p className="sb-form-label">Available floor area (sq ft)</p>
          <input
            className="sb-form-input"
            type="text"
            placeholder="e.g. 15,000 sq ft"
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          />
          <button
            className="sb-btn-primary"
            onClick={() => setStep(3)}
            type="button"
          >
            Continue →
          </button>
          <button
            className="sb-btn-secondary"
            onClick={() => setStep(1)}
            type="button"
          >
            ← Back
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="sb-form-step">
          <p className="sb-form-label">Work email</p>
          <input
            className="sb-form-input"
            type="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <p className="sb-form-label">Company name</p>
          <input
            className="sb-form-input"
            type="text"
            placeholder="Company name"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
          />
          <p className="sb-form-label">Your name</p>
          <input
            className="sb-form-input"
            type="text"
            placeholder="Full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <button
            className="sb-btn-primary"
            onClick={handleSubmit}
            type="button"
          >
            Get My Free Audit →
          </button>
          <button
            className="sb-btn-secondary"
            onClick={() => setStep(2)}
            type="button"
          >
            ← Back
          </button>
        </div>
      )}

      <div className="sb-form-trust">
        {[
          {
            strong: "48-hour turnaround.",
            text: " You'll receive a customised sortation assessment scoped to your throughput and space.",
          },
          {
            strong: "No commitment required.",
            text: " The audit is complimentary with no sales pressure attached.",
          },
          {
            strong: "Used by DHL, Inditex, and Trendyol",
            text: " — globally trusted by enterprise 3PLs and e-commerce leaders.",
          },
        ].map((item) => (
          <div key={item.strong} className="sb-trust-item">
            <div className="sb-trust-icon">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                stroke="#079d92"
                strokeWidth="1.5"
                fill="none"
              >
                <polyline points="2,5 4,7 8,3" />
              </svg>
            </div>
            <p className="sb-trust-text">
              <strong>{item.strong}</strong>
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const RoiBars = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.5"],
  });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      if (v > 0.1) setAnimate(true);
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <div ref={ref} className="sb-roi-chart">
      <p
        className="font-16-light color-grey-1"
        style={{ fontSize: "13px", marginBottom: "24px" }}
      >
        Cost per package · 5,000 PPH, 200 destinations (US/EU market)
      </p>
      <div className="sb-roi-bars">
        {roiBars.map((bar) => (
          <div key={bar.label} className="sb-roi-bar-row">
            <span className="sb-roi-bar-label font-16-light color-grey-1">
              {bar.label}
            </span>
            <div className="sb-roi-bar-track">
              <motion.div
                className="sb-roi-bar-fill"
                style={{ background: bar.color, maxWidth: `${bar.pct}%` }}
                initial={{ width: 0 }}
                animate={animate ? { width: `${bar.pct}%` } : { width: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: bar.dark ? "#5A6270" : "white",
                    paddingRight: "10px",
                  }}
                >
                  {bar.value}
                </span>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
      <p
        className="font-16-light"
        style={{
          fontSize: "11px",
          color: "#8A919E",
          marginTop: "20px",
          lineHeight: 1.5,
        }}
      >
        Source: Unbox Robotics internal cost benchmarking study. US/EU market.
        Includes capex, labour, rental, utilities, and service costs over 7
        years.
      </p>
    </div>
  );
};

const advantages = [
  {
    headline: "6–9 week deployment",
    proof: "No civil works. No IT dependency. No shutdown of live operations.",
    icon: <DeploymentIcon />,
  },
  {
    headline: "100% sort accuracy",
    proof: "Zero mis-consolidations from 500 to 20,000 parcels per hour.",
    icon: <AccuracyIcon />,
  },
  {
    headline: "50–70% less floor space",
    proof:
      "Vertical 3D layout within your existing footprint. No new building.",
    icon: <SpaceIcon />,
  },
  {
    headline: "No single point of failure",
    proof: "Fleet self-heals in under 2 seconds. Operations never stop.",
    icon: <FailureIcon />,
  },
  {
    headline: "Scales without change",
    proof: "Add capacity for peak without hardware modification.",
    icon: <ScalesIcon />,
  },
  {
    headline: "ROI in 1-2 years",
    proof: "40–60% labour reduction. Rework eliminated. 2× productivity.",
    icon: <RoiIcon />,
  },
  {
    headline: "WMS integration in days",
    proof:
      "Standard API. Works with SAP, Manhattan, Blue Yonder and custom systems.",
    icon: <WmsIcon />,
  },
  {
    headline: "Operator-managed",
    proof:
      "Floor supervisors run the system from week one. No specialist engineers.",
    icon: <OperatorIcon />,
  },
];

/* ── Page ─────────────────────────────────────────────────────────── */

const SeriesBFundedPage = () => {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeSpec, setActiveSpec] = useState(0);

  useEffect(() => {
    if (formOpen) {
      window.dispatchEvent(new Event("lenis:stop"));
    } else {
      window.dispatchEvent(new Event("lenis:start"));
    }
    return () => {
      window.dispatchEvent(new Event("lenis:start"));
    };
  }, [formOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const open = () => setFormOpen(true);
    window.addEventListener("openSortingAudit", open);
    return () => window.removeEventListener("openSortingAudit", open);
  }, []);

  const activeUseCase = useCaseTabs[activeTab];
  const activeSpecData = machineTabsData[activeSpec];

  return (
    <>
      <HelmetWrapper
        title="Series B Funded — Autonomous Sortation Technology | Unbox Robotics"
        description="Unbox Robotics — Series B funded autonomous sortation. 3,000+ parcels per hour, 99.9% accuracy, 50% less floor space. Get your free sorting audit today."
      />

      {/* ── Slide-in form drawer (portal so it escapes stacking context) ── */}
      {/*
      {ReactDOM.createPortal(
        <AnimatePresence>
          {formOpen && (
            <>
              <motion.div
                className="sb-drawer-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setFormOpen(false)}
              />
              <motion.div
                className="sb-drawer"
                data-lenis-prevent
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              >
                <button
                  className="sb-drawer-close"
                  onClick={() => setFormOpen(false)}
                  type="button"
                  aria-label="Close"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <line x1="4" y1="4" x2="16" y2="16" />
                    <line x1="16" y1="4" x2="4" y2="16" />
                  </svg>
                </button>
                <FormPanel />
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
      */}

      {/* ── Centered form modal ── */}
      {ReactDOM.createPortal(
        <AnimatePresence>
          {formOpen && (
            <motion.div
              className="sb-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setFormOpen(false)}
            >
              <motion.div
                className="sb-modal"
                data-lenis-prevent
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="sb-modal-close"
                  onClick={() => setFormOpen(false)}
                  type="button"
                  aria-label="Close"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <line x1="4" y1="4" x2="16" y2="16" />
                    <line x1="16" y1="4" x2="4" y2="16" />
                  </svg>
                </button>
                <FormPanel />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* ── Hero ── */}
      <div className="sb-hero-wrap">
        <motion.div
          className="sb-eyebrow sb-eyebrow-top"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Autonomous Sortation Technology
        </motion.div>

        <div className="sb-hero-row">
          <motion.div
            className="sb-hero-video"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sb-hero-video-box">
              <video
                src={seriesBFundVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                draggable={false}
              />
            </div>
          </motion.div>

          <div className="sb-hero-content">
            <motion.h1
              className="font-40-regular color-black-1 sb-hero-h1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Is your facility sorting at{" "}
              <span className="color-green-1">full potential?</span>
            </motion.h1>

            <motion.p
              className="font-16-light color-black- sb-hero-sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Most warehouses leave throughput on the floor — buried under
              manual handling, limited by floor space, and exposed during peak
              demand.{" "}
              <strong className="color-black-1">
                The operations below process 3,000+ parcels per hour, in half
                the footprint, with zero mis-sorts.
              </strong>
            </motion.p>

            {/* Stats rail */}
            <motion.div
              className="sb-stats-rail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {heroStats.map((stat, i) => (
                <React.Fragment key={stat.value}>
                  {i > 0 && <div className="sb-stat-divider" />}
                  <div className="sb-stat-item">
                    <span className="sb-stat-num color-green-1">
                      {stat.value}
                    </span>
                    <span className="sb-stat-label font-16-light color-grey-1">
                      {stat.label}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <CommonButton
                theme={"green"}
                title={"Get Free Sorting Audit"}
                onClick={() => setFormOpen(true)}
              />
              <CommonButton
                theme={"white"}
                title={"Book a Demo"}
                onClick={() => router.push("/get-in-touch")}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Trusted by — LogoScroller ── */}
      <div
        className="bg-[#FDFDFD] overflow-hidden"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          paddingTop: "60px",
          paddingBottom: "60px",
        }}
      >
        <motion.div
          className="flex flex-col gap-[14px] md:gap-[20px] max-w-[800px] mx-auto px-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            className="font-40-regular color-black-1 text-center"
            custom={0}
            variants={animation.fadeInUpVariant}
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p
            className="font-16-light color-grey-1 text-center"
            custom={1}
            variants={animation.fadeInUpVariant}
          >
            Clients choose Unbox Robotics for compact, scalable automation that
            delivers unmatched operational precision.
          </motion.p>
        </motion.div>
        <LogoScroller clients={clientInfo} speed="fast" />
      </div>

      {/* ── Outcomes rail ── */}
      {/* <div className="sb-outcomes-rail">
        <span className="sb-outcomes-label">From live deployments</span>
        {outcomesRail.map((item, i) => (
          <React.Fragment key={item.value}>
            <div className="sb-outcome-stat">
              <span className="sb-outcome-num">{item.value}</span>
              <span className="sb-outcome-desc">{item.label}</span>
            </div>
          </React.Fragment>
        ))}
      </div> */}

      {/* ── Use Cases ── */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-capability-section">
          <motion.div
            className="flex flex-col gap-[14px] md:gap-[20px] max-w-[1440px] mx-auto mb-[40px] md:mb-[60px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="font-40-regular color-black-1 text-center"
              custom={0}
              variants={animation.fadeInUpVariant}
            >
              Built for the way your facility actually works
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              The same sorting problem looks different at a fulfilment centre
              versus a last-mile hub. Here's what the numbers look like in each.
            </motion.p>
          </motion.div>

          {/* Tabs */}
          <div className="sb-uc-tabs">
            {useCaseTabs.map((tab, i) => (
              <button
                key={tab.id}
                className={`sb-uc-tab${activeTab === i ? " active" : ""}`}
                onClick={() => setActiveTab(i)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Panel */}
          <motion.div
            key={activeUseCase.id}
            className="sb-uc-panel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="sb-uc-info">
              <h3
                className="font-40-regular color-black-1 text-center"
                style={{ fontSize: "24px", marginBottom: "12px" }}
              >
                {activeUseCase.heading}
              </h3>
              <p
                className="font-16-light color-grey-1 text-center"
                style={{ marginBottom: "24px", lineHeight: 1.7 }}
              >
                {activeUseCase.body}
              </p>
              <div className="sb-uc-metrics">
                {activeUseCase.metrics.map((m) => (
                  <div key={m.label} className="sb-uc-metric">
                    <span className="sb-uc-metric-num color-green-1 text-center">
                      {m.value}
                    </span>
                    {m.label !== "" && (
                      <span className="sb-uc-metric-label font-16-light color-grey-1">
                        {m.label}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* <div className="sb-uc-client">
              <p
                className="font-16-light color-green-1 !text-[11px] !font-semibold uppercase tracking-wider"
                style={{ marginBottom: "10px" }}
              >
                Deployment result
              </p>
              <p
                className="font-16-light"
                style={{
                  color: "#B0BAC8",
                  lineHeight: 1.6,
                  marginBottom: "16px",
                  fontStyle: "italic",
                  fontSize: "14px",
                }}
              >
                "{activeUseCase.quote}"
              </p>
              <p
                className="font-16-light"
                style={{ color: "#5A6270", fontSize: "12px" }}
              >
                {activeUseCase.attr}
              </p>
            </div> */}
          </motion.div>
        </section>
      </div>

      {/* ── How It Works ── */}
      {/* <div className="bg-[#141313] overflow-hidden">
        <section className="industry-capability-section">
          <motion.div
            className="flex flex-col gap-[14px] md:gap-[20px] max-w-[800px] mx-auto mb-[40px] md:mb-[60px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="font-40-regular text-white text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              From day one to full speed
            </motion.h2>
            <motion.p
              className="font-16-light text-center"
              style={{ color: "#8A919E" }}
              custom={2}
              variants={animation.fadeInUpVariant}
            >
              No months-long civil works. No facility shutdown. The system
              deploys on your existing floor, integrates with your WMS, and
              scales with your network.
            </motion.p>
          </motion.div>

          <div className="sb-how-steps">
            {howSteps.map((step, index) => (
              <motion.article
                key={step.num}
                className="sb-how-step"
                custom={index}
                variants={animation.fadeInUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <span className="sb-how-step-num">{step.num}</span>
                <div
                  className="sb-how-step-icon industry-capability-icon"
                  style={{ color: "#06B1A4" }}
                >
                  {step.icon}
                </div>
                <h3
                  className="font-20-medium"
                  style={{ color: "white", marginBottom: "12px" }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-16-light"
                  style={{ color: "#5A6270", lineHeight: 1.6 }}
                >
                  {step.body}
                </p>
              </motion.article>
            ))}
          </div>
        </section>
      </div> */}
      {/* ── Why Operators Choose UnboxSort — 8 advantages ── */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-stakeholder-section">
          <motion.div
            className="industry-stakeholder-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="font-40-regular color-black-1 text-center"
              custom={0}
              variants={animation.fadeInUpVariant}
            >
              Why Operators Choose UnboxSort
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              Eight advantages that separate UnboxSort from every other
              sortation option on the market.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {advantages.map((item, index) => (
              <motion.article
                key={item.headline}
                className="bg-white border border-[#E0E0E0] rounded-[12px] p-5 text-center flex flex-col items-center gap-3"
                custom={index}
                variants={animation.fadeInUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <div
                  className="use-case-adv-icon w-[44px] h-[44px] rounded-[12px] bg-[#E8F5F4] flex items-center justify-center flex-shrink-0"
                  style={{ color: "#079d92" }}
                >
                  {item.icon}
                </div>
                <h3 className="font-16-medium color-black-1">
                  {item.headline}
                </h3>
                <p className="font-16-light color-black-1 ">{item.proof}</p>
              </motion.article>
            ))}
          </div>

          {/* Closer — StickyScrollFill */}
          {/* <StickyScrollFill
            text={`UnboxSort is the only robotic sortation system purpose-built for parcels upto 20kg and scalable according to customer needs engineered for the exact payload profile of\ne-commerce and fulfilment, not adapted from another vertical.`}
          /> */}
        </section>
      </div>
      {/* ── SR Series Specs ── */}
      <div className="bg-[#F8F8F8] overflow-hidden">
        <section className="industry-capability-section">
          <motion.div
            className="flex flex-col gap-[14px] md:gap-[20px] max-w-[800px] mx-auto mb-[40px] md:mb-[60px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="font-40-regular color-black-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              SR Series — vertical lift robots built for density
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={2}
              variants={animation.fadeInUpVariant}
            >
              Three models, same philosophy: go vertical, minimise footprint,
              handle the parcel range your operation sees every day.
            </motion.p>
          </motion.div>

          {/* Spec tabs */}
          <div className="sb-spec-tabs">
            {machineTabsData.map((m, i) => (
              <button
                key={m.id}
                className={`sb-spec-tab${activeSpec === i ? " active" : ""}`}
                onClick={() => setActiveSpec(i)}
                type="button"
              >
                {m.label}C
              </button>
            ))}
          </div>

          <motion.div
            key={activeSpecData.id}
            className="sb-spec-grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Spec card */}
            <div className="sb-spec-card">
              <div className="sb-spec-card-header">
                <span className="sb-spec-model-badge">
                  {activeSpecData.label}C
                </span>
                <span
                  className="font-16-light"
                  style={{ color: "#8A919E", fontSize: "13px" }}
                >
                  {activeSpec === 0
                    ? "Standard"
                    : activeSpec === 1
                    ? "Mid-range"
                    : "Large parcel"}{" "}
                  sorting robot
                </span>
              </div>
              <div className="sb-spec-rows">
                {activeSpecData.content.features.map((feat) => (
                  <div key={feat.name} className="sb-spec-row">
                    <span
                      className="font-16-light color-grey-1"
                      style={{ fontSize: "12px" }}
                    >
                      {feat.name}
                    </span>
                    <span
                      className="font-16-light color-green-1"
                      style={{ fontSize: "13px", fontWeight: 500 }}
                    >
                      {feat.feature}
                    </span>
                  </div>
                ))}
                <div className="sb-spec-row">
                  <span
                    className="font-16-light color-grey-1"
                    style={{ fontSize: "12px" }}
                  >
                    Charging
                  </span>
                  <span
                    className="font-16-light color-black-1"
                    style={{ fontSize: "13px", fontWeight: 500 }}
                  >
                    Autonomous docking
                  </span>
                </div>
                <div className="sb-spec-row">
                  <span
                    className="font-16-light color-grey-1"
                    style={{ fontSize: "12px" }}
                  >
                    Navigation
                  </span>
                  <span
                    className="font-16-light color-black-1"
                    style={{ fontSize: "13px", fontWeight: 500 }}
                  >
                    Data matrix camera
                  </span>
                </div>
                <div className="sb-spec-row">
                  <span
                    className="font-16-light color-grey-1"
                    style={{ fontSize: "12px" }}
                  >
                    Communication
                  </span>
                  <span
                    className="font-16-light color-black-1"
                    style={{ fontSize: "13px", fontWeight: 500 }}
                  >
                    Wi-Fi 5 / Wi-Fi 6
                  </span>
                </div>
              </div>
            </div>

            {/* Spec meaning cards */}
            <div className="sb-spec-meaning">
              {[
                {
                  spec: "Lifting height: up to 2.4 m",
                  title: "Uses the cubic space you already have",
                  body: "No new building required. The vertical reach means sorting destinations stack upward, not outward — turning overhead height into productive capacity.",
                  icon: <SpaceIcon />,
                },
                {
                  spec: "Max speed: 3.2 m/s",
                  title: "Peak season volumes without adding headcount",
                  body: "A robot swarm running at 3.2 m/s handles End of season or Black Friday the same way it handles a quiet Tuesday — no overtime, no temp staffing, no throughput cliff.",
                  icon: <ScalesIcon />,
                },
                {
                  spec: "Autonomous docking",
                  title: "The system never fully stops",
                  body: "Individual robots dock and charge opportunistically. Unlike conveyor systems that go fully offline for maintenance, the fleet keeps processing while any one unit is serviced.",
                  icon: <DeploymentIcon />,
                },
                {
                  spec: "Browser-based WMS integration",
                  title: "Command everything from one dashboard",
                  body: "Parcel flow, bin assignments, throughput by shift, destination fill rates — all visible and configurable from a browser. No proprietary hardware, no expensive software licences.",
                  icon: <MonitorIcon />,
                },
              ].map((card) => (
                <div key={card.spec} className="sb-spec-meaning-card">
                  <div
                    className="sb-smc-icon industry-capability-icon"
                    style={{ color: "#079d92" }}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <p
                      className="font-16-light color-grey-1"
                      style={{
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: "4px",
                      }}
                    >
                      {card.spec}
                    </p>
                    <h4
                      className="font-16-medium color-black-1"
                      style={{ marginBottom: "4px" }}
                    >
                      {card.title}
                    </h4>
                    <p
                      className="font-16-light color-grey-1"
                      style={{ fontSize: "13px", lineHeight: 1.5 }}
                    >
                      {card.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>

      {/* ── ROI / Cost Benchmark ── */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-capability-section">
          <div className="sb-roi-grid">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col gap-[20px]"
            >
              <motion.h2
                className="font-40-regular color-black-1"
                custom={1}
                variants={animation.fadeInUpVariant}
                style={{ lineHeight: 1.1, letterSpacing: "-0.02em" }}
              >
                The lowest cost per sort in{" "}
                <span className="color-green-1">the market.</span>
              </motion.h2>
              <motion.p
                className="font-16-light color-grey-1"
                custom={2}
                variants={animation.fadeInUpVariant}
                style={{ lineHeight: 1.7 }}
              >
                Capital investment is one number. What you actually spend over 7
                years is another. At 5,000 parcels per hour across 200
                destinations, the total cost of ownership comparison tells a
                clear story.
              </motion.p>
              <div className="flex flex-col gap-[12px]">
                {roiItems.map((item) => (
                  <motion.div
                    key={item}
                    className="sb-roi-item"
                    custom={3}
                    variants={animation.fadeInUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <div className="sb-roi-dot" />
                    <p
                      className="font-16-light color-black-1"
                      style={{ fontSize: "14px", lineHeight: 1.5 }}
                    >
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
              <motion.div
                custom={4}
                variants={animation.fadeInUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <CommonButton
                  theme={"green"}
                  title={"See what this looks like for your volumes"}
                  onClick={() => router.push("/get-in-touch")}
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <RoiBars />
            </motion.div>
          </div>
        </section>
      </div>

      {/* ── Sticky scroll text ── */}
      {/* <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-stakeholder-section">
          <StickyScrollFill text="Unbox Robotics is Series B funded and trusted by global enterprise logistics leaders — because the lowest cost per sort, fastest ROI, and smallest footprint are no longer a trade-off." />
        </section>
      </div> */}

      {/* ── CTA ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-[#141313] mb-10 py-12 md:py-20 px-5 md:px-15 flex flex-col gap-10 md:gap-[60px] items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center gap-[14px]">
          <motion.h2
            className="font-40-regular text-white text-center max-w-[858px]"
            custom={1}
            variants={animation.fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            Stop guessing. Start with a real operations assessment.
          </motion.h2>
          <motion.p
            className="font-16-light text-center"
            style={{ color: "#5A6270", maxWidth: "480px" }}
            custom={2}
            variants={animation.fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            Share your throughput and space. Get back a customised sortation
            layout, robot count, and ROI projection — within 48 hours, at no
            cost.
          </motion.p>
        </div>
        <motion.div
          custom={3}
          className="flex flex-wrap gap-4 justify-center"
          variants={animation.fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <CommonButton
            theme={"green"}
            title={"Get Free Audit"}
            onClick={() => setFormOpen(true)}
          />
          <CommonButton
            theme={"white"}
            title={"Book a Demo"}
            onClick={() => router.push("/get-in-touch")}
          />
        </motion.div>
        <motion.p
          className="font-16-light"
          style={{ color: "#3A4050", fontSize: "12px" }}
          custom={4}
          variants={animation.fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          No obligation · 48-hour turnaround · Used by global enterprise
          operations
        </motion.p>
      </motion.div>
    </>
  );
};

export default SeriesBFundedPage;
