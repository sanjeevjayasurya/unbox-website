"use client";

import React, { useState, useEffect, useRef } from "react";
import { animation } from "../../helpers/utils";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import CommonButton from "../../components/common/CommonButton";
import { useRouter } from "next/navigation";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import SmarterArchImg from "../solutions/assets/smart-arch.webp";
import OperationHead from "../solutions/assets/operation-head.webp";
import industryHeaderImg from "../solutions/assets/hero-img.webp";
import "../solutions/index.css";
import { FulfillmentConsolidationFaqData } from "../../helpers/config";
import Faq from "../../components/home/Faq";
import StickyScrollFill from "../../components/home/StickyScrollFill";

import RadarIcon from "../solutions/assets/radar.svg";
import RoutingIcon from "../solutions/assets/routing-2.svg";
import SquareIcon from "../solutions/assets/arrange-square-2.svg";
import MonitorIcon from "../solutions/assets/monitor.svg";
import PuzzlePieceIcon from "../solutions/assets/puzzle-piece.svg";
import ExpandIcon from "../solutions/assets/arrow-expand-04.svg";
import ImageComponent from "../../components/common/ImageComponent";
import DeploymentIcon from "./assets/deployment.svg";
import AccuracyIcon from "./assets/accuracy.svg";
import SpaceIcon from "./assets/space.svg";
import FailureIcon from "./assets/failure.svg";
import ScalesIcon from "./assets/scales.svg";
import RoiIcon from "./assets/roi.svg";
import WmsIcon from "./assets/wms.svg";
import OperatorIcon from "./assets/operator.svg";
import { useCaseOrderConsolidationSchema } from "../../helpers/schemas";

/* ── Data ─────────────────────────────────────────────────────────── */

const kpiCards = [
  { value: "100%", label: "Sort accuracy across all SKUs" },
  { value: "1,500+", label: "Orders per batch" },
  { value: "50%", label: "Floor space recovered" },
  { value: "3–6 wks", label: "From contract to live" },
];

const consolidationSteps = [
  {
    step: "Step 1",
    title: "Inbound Scan",
    desc: "Parcel enters system, SKU and order ID read by scanner",
  },
  {
    step: "Step 2",
    title: "Wave Assignment",
    desc: "Software assigns parcel to active fulfilment wave in real time",
  },
  {
    step: "Step 3",
    title: "Dynamic Routing",
    desc: "SR450 robots route parcel to correct consolidation destination",
  },
  {
    step: "Step 4",
    title: "Order Grouping",
    desc: "All items for one order grouped at destination cell",
  },
  {
    step: "Step 5",
    title: "Dispatch Ready",
    desc: "Consolidated order released to packing or outbound lane",
  },
];

const challengeTimeline = [
  {
    phase: "Volumes grow — errors appear",
    color: "#E24B4A",
    bg: false,
    text: "Multi-wave consolidation with manual processes creates mis-sort rates of 1–3%. At low volume this is manageable. At thousands of orders per day, this means thousands of wrong items shipped.",
  },
  {
    phase: "Labour cost spirals",
    color: "#E65100",
    bg: false,
    text: "Headcount grows to compensate for errors and volume. Attrition on the consolidation floor runs at 35–40% annually. The cost per order climbs while throughput stays flat.",
  },
  {
    phase: "Peak season triggers crisis",
    color: "#F0A500",
    bg: false,
    text: "Black Friday, Diwali, end-of-season. Fixed conveyor capacity is overwhelmed. Overtime, mis-sorts, missed SLAs. The operation enters crisis mode exactly when it matters most.",
  },
  {
    phase: "With UnboxSort — all stages resolved",
    color: "#079d92",
    bg: true,
    text: "100% sort accuracy. Team reduced to as few as 10 associates. Scales from 500 to 20,000 pph without new infrastructure. Peak handled with zero additional headcount.",
  },
];

const capabilityCards = [
  {
    title: "Multi-wave consolidation",
    desc: "Handles simultaneous fulfilment waves without cross-contamination each order grouped correctly regardless of inbound sequence.",
    icon: <RadarIcon />,
  },
  {
    title: "Vertical sort architecture",
    desc: "7 levels up to 2.4m consolidates within existing mezzanine footprints. No civil works, no layout redesign.",
    icon: <SquareIcon />,
  },
  {
    title: "Real-time wave adaptation",
    desc: "Software dynamically reassigns parcels to waves as order profiles change no manual intervention or system downtime.",
    icon: <MonitorIcon />,
  },
  {
    title: "100% order integrity",
    desc: "Swarm intelligence ensures every item reaches its correct order destination mis-sort rate reduced to zero.",
    icon: <RoutingIcon />,
  },
  {
    title: "WMS-native integration",
    desc: "Connects to your existing WMS via standard API in 2–3 weeks reads order data directly, no custom integration.",
    icon: <PuzzlePieceIcon />,
  },
  {
    title: "Scalable capacity",
    desc: "Add robot capacity for peak without structural changes scales up and down within the same deployment.",
    icon: <ExpandIcon />,
  },
];

const icpProfiles = [
  {
    role: "VP Operations / COO",
    company: "E-Commerce & Fashion Fulfillment",
    pains: [
      "Needs to scale order volumes without proportional headcount growth",
      "Facing peak season capacity crunch",
      "Under pressure to reduce consolidation error rates",
      "Responsible for WMS integration decisions",
    ],
  },
  {
    role: "Head of Industrial Engineering",
    company: "Large 3PL & Express Logistics",
    pains: [
      "Designing brownfield DC automation without civil works",
      "Evaluating sortation ROI for client contracts",
      "Needs proven deployment in constrained mezzanine layouts",
      "Technical evaluator for system selection",
    ],
  },
  {
    role: "Founder / CEO",
    company: "High-Growth D2C & E-Commerce",
    pains: [
      "Growing order volumes outpacing manual consolidation team",
      "Labour shortage making hiring unreliable",
      "Needs fast deployment before next peak season",
      "Evaluating lease vs CapEx options",
    ],
  },
];

const advantages = [
  {
    headline: "3–6 week deployment",
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
    headline: "ROI in 6–9 months",
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

const stakeholderContentVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: "easeIn" } },
};

/* ── Component ────────────────────────────────────────────────────── */

const FulfillmentCenterOrderConsolidationPage = () => {
  const router = useRouter();
  const challengeRef = useRef(null);
  const { scrollYProgress: challengeProgress } = useScroll({
    target: challengeRef,
    offset: ["start 0.75", "end 0.25"],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HelmetWrapper
        title="Fulfillment Center Order Consolidation — UnboxSort | Unbox Robotics"
        description="UnboxSort enables high-speed order consolidation for fulfillment centers. Dynamic parcel sorting into live order destinations. 100% accuracy, 50% less floor space, deployed in weeks."
      />

            <SchemaMarkup schema={useCaseOrderConsolidationSchema} />
{/* ── Hero ── */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <motion.div
          className="technology-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col gap-[14px] md:gap-[20px] max-w-[828px]">
            <motion.h1
              className="font-40-regular !font-extralight color-black-1 text-center"
              custom={0}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              Order Consolidation That{" "}
              <span className="!font-semibold">Never Misses a Beat.</span>
            </motion.h1>
            <motion.p
              className="font-16-light color-grey-1 text-center max-w-[780px]"
              custom={1}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              UnboxSort dynamically consolidates thousands of parallel orders
              across diverse SKUs and channels within a compact vertical layout,
              with 100% sort accuracy and zero disruption to live operations.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              custom={2}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <CommonButton
                theme={"green"}
                title={"Book a Demo"}
                onClick={() => router.push("/get-in-touch")}
              />
              <CommonButton
                theme={"white"}
                title={"Download Use Case"}
                onClick={() => router.push("/get-in-touch")}
              />
            </motion.div>
          </div>
          {/* 
          <motion.img
            src={SmarterArchImg}
            draggable={false}
            alt="UnboxSort order consolidation deployment — fulfillment center live view"
            className="industry-smarter-img"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
          /> */}
        </motion.div>
      </div>

      {/* ── KPI cards ── */}
      {/* <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-retail-kpi-section">
          <div className="industry-retail-kpi-grid">
            {kpiCards.map((item, index) => (
              <motion.article
                key={item.label}
                className="industry-retail-kpi-card"
                custom={index}
                variants={animation.fadeInUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <h3 className="text-[46px] max-md:text-[28px] font-semibold text-[#00A99D]">
                  {item.value}
                </h3>
                <p className="font-16-light color-black-1">{item.label}</p>
              </motion.article>
            ))}
          </div>
        </section>
      </div> */}

      {/* ── How UnboxSort Works — 5-step flow ── */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-capability-section">
          <motion.div
            className="flex flex-col gap-[14px] md:gap-[20px] max-w-[800px] mx-auto mb-[40px] md:mb-[60px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="font-40-regular color-black-1 text-center"
              custom={0}
              variants={animation.fadeInUpVariant}
            >
              How UnboxSort Powers Order Consolidation
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              From inbound SKU scan to consolidated order dispatch five
              automated steps, zero manual intervention.
            </motion.p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-3 items-stretch overflow-x-auto">
            {consolidationSteps.map((item, index) => (
              <React.Fragment key={item.step}>
                <motion.article
                  className="industry-capability-card flex-1 min-w-[160px]"
                  custom={index}
                  variants={animation.fadeInUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <p className="font-16-light color-green-1 !text-[11px] !font-semibold uppercase tracking-wider">
                    {item.step}
                  </p>
                  <div className="space-y-[8px]">
                    <h3 className="font-20-medium color-black-1">
                      {item.title}
                    </h3>
                    <p className="font-16-light color-grey-1">{item.desc}</p>
                  </div>
                </motion.article>
                {index < consolidationSteps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center color-grey-1 text-[22px] self-center flex-shrink-0 px-1">
                    →
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>
      </div>

      {/* ── The Challenge ── */}
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
              custom={0}
              variants={animation.fadeInUpVariant}
            >
              Why manual order consolidation breaks at scale
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              As order volumes grow and SKU counts multiply, manual
              consolidation becomes the single biggest bottleneck driving
              errors, delays, and runaway costs.
            </motion.p>
          </motion.div>

          <div ref={challengeRef} className="relative">
            {/* Track line — background */}
            <div className="absolute left-[12px] md:left-[24px] top-0 bottom-0 w-[2px] md:w-[3px] bg-[#E0E0E0]" />
            {/* Track line — scroll fill */}
            <motion.div
              className="absolute left-[12px] md:left-[24px] top-0 w-[2px] md:w-[3px] bg-[#079d92] origin-top"
              style={{ scaleY: challengeProgress, height: "100%" }}
            />

            <div className="flex flex-col gap-4 md:gap-6">
              {challengeTimeline.map((item, index) => (
                <motion.div
                  key={item.phase}
                  className="relative flex items-start pl-8 md:pl-16"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: index * 0.08,
                  }}
                >
                  {/* Dot on the line */}
                  <div
                    className="absolute left-[5px] md:left-[16px] top-[20px] w-[14px] h-[14px] md:w-[18px] md:h-[18px] rounded-full border-[2px] md:border-[3px] border-[#F8F8F8] z-10 flex-shrink-0"
                    style={{ background: item.color }}
                  />

                  <article
                    className="flex-1 rounded-[14px] md:rounded-[16px] p-4 md:p-6 flex flex-col gap-3 md:gap-4 relative overflow-hidden bg-white"
                    style={{
                      borderLeft: `4px solid ${item.color}`,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                    }}
                  >
                    {/* Watermark step number */}
                    {/* <span
                      className="absolute right-3 top-0 text-[56px] md:text-[88px] font-black leading-none select-none pointer-events-none"
                      style={{ color: `${item.color}1A` }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span> */}

                    {/* Phase pill */}
                    <span
                      className="w-fit px-[8px] md:px-[10px] py-[3px] md:py-[4px] rounded-full text-[11px] md:text-[12px] font-semibold uppercase tracking-wider"
                      style={{
                        background: `${item.color}18`,
                        color: item.color,
                      }}
                    >
                      {item.phase}
                    </span>

                    {/* Description */}
                    <p className="font-16-light leading-relaxed color-black-1">
                      {item.text}
                    </p>
                  </article>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── What UnboxSort Enables — 6 capability cards ── */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-capability-section">
          <motion.div
            className="flex flex-col gap-[14px] md:gap-[20px] max-w-[800px] mx-auto mb-[40px] md:mb-[60px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="font-40-regular color-black-1 text-center"
              custom={0}
              variants={animation.fadeInUpVariant}
            >
              Six capabilities that transform order consolidation
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              UnboxSort is engineered for the specific demands of multi-SKU,
              multi-channel order consolidation in modern fulfillment centers.
            </motion.p>
          </motion.div>

          <div className="industry-capability-grid">
            {capabilityCards.map((item, index) => (
              <motion.article
                key={item.title}
                className="industry-capability-card"
                custom={index}
                variants={animation.fadeInUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="industry-capability-icon">{item.icon}</div>
                <div className="space-y-[10px]">
                  <h3 className="font-20-medium color-black-1">{item.title}</h3>
                  <p className="font-16-light color-black-1">{item.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </div>

      {/* ── Who This Is Built For — ICP cards ── */}
      {/* <div className="bg-[#F8F8F8] overflow-hidden">
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
              Ideal Customer Profile
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              UnboxSort order consolidation is purpose-built for the following
              buyer profiles across India, Europe, US and Middle East.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {icpProfiles.map((profile, index) => (
              <motion.article
                key={profile.role}
                className="bg-white rounded-[12px] p-5 flex flex-col gap-3"
                style={{
                  border: "1px solid #E0E0E0",
                  borderTop: "3px solid #079d92",
                }}
                custom={index}
                variants={animation.fadeInUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <p className="font-20-medium color-black-1">{profile.role}</p>
                <p className="font-16-light color-green-1">{profile.company}</p>
                <ul className="flex flex-col gap-[6px] ml-4 list-disc">
                  {profile.pains.map((pain) => (
                    <li
                      key={pain}
                      className="font-16-light color-black-1"
                    >
                      {pain}
                    </li>
                  ))}
                </ul>
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
          <StickyScrollFill
            text={`UnboxSort is the only robotic sortation system purpose-built for parcels upto 20kg and scalable according to customer needs engineered for the exact payload profile of\ne-commerce and fulfilment, not adapted from another vertical.`}
          />
        </section>
      </div>

      {/* ── FAQ ── */}
      <div className="bg-[#F8F8F8] overflow-hidden">
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
              Questions about order consolidation automation
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              Answers to the questions operations and engineering leaders ask
              when evaluating UnboxSort for fulfillment center order
              consolidation.
            </motion.p>
          </motion.div>
        </section>
      </div>
      <Faq
        data={FulfillmentConsolidationFaqData.slice(0, 4)}
        exploreBtnVisible={false}
      />

      {/* ── SEO / Trust block ── */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-trust-section">
          <div className="industry-trust-content">
            <motion.div
              className="bg-[#F8F8F8] rounded-[20px] p-6 md:p-9 flex flex-col gap-5"
              custom={0}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h2 className="font-40-regular color-black-1 !text-[26px]">
                UnboxSort: The trusted robotic order consolidation system for
                modern fulfillment centers
              </h2>
              <p className="font-20-light color-black-1">
                As e-commerce order volumes grow 15–20% annually, fulfillment
                center order consolidation has become the defining operational
                bottleneck. <span className="!font-medium">UnboxSort</span> is
                purpose-built for this challenge a vertical 3D robotic sortation
                system that handles multi-wave order consolidation across
                thousands of SKUs with 100% accuracy, 50% less floor space, and
                warehouse automation ROI in 6–9 months. Unlike generic warehouse
                robotics solutions adapted from other verticals, every element
                of UnboxSort is engineered for the parcel profile of modern
                e-commerce: payloads under 15kg, dims under 650×500×300mm, and
                consolidation volumes from 500 to 20,000 units per hour.
              </p>
              <p className="font-20-light color-black-1">
                The{" "}
                <span className="!font-medium">
                  modular warehouse automation
                </span>{" "}
                approach means fulfillment centers deploy UnboxSort without
                civil works, without structural modification, and without
                shutting down live consolidation operations. As one of the
                fastest-growing{" "}
                <span className="color-black-1 !font-medium">
                  warehouse automation companies
                </span>{" "}
                in India and Europe, Unbox Robotics has deployments across
                e-commerce, fashion, CEP and 3PL fulfillment environments
                delivering measurable{" "}
                <span className="color-black-1 !font-medium">
                  warehouse automation ROI
                </span>{" "}
                within 6–9 months of go-live.
              </p>
            </motion.div>
          </div>
        </section>
      </div>

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
            custom={0}
            variants={animation.fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            Ready to automate your order consolidation?
          </motion.h2>
          <motion.p
            className="font-16-light text-white text-center"
            custom={1}
            variants={animation.fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            See how UnboxSort deploys within your existing footprint in 3–6
            weeks — with 100% sort accuracy from day one.
          </motion.p>
        </div>
        <motion.div
          custom={2}
          className="flex flex-wrap gap-4 justify-center"
          variants={animation.fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <CommonButton
            theme={"green"}
            title={"Book a Demo"}
            onClick={() => router.push("/get-in-touch")}
          />
          <CommonButton
            theme={"white"}
            title={"Download Use Case"}
            onClick={() => router.push("/get-in-touch")}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default FulfillmentCenterOrderConsolidationPage;
