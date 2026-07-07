"use client";

import React, { useState, useEffect, useRef } from "react";
import { animation } from "../../helpers/utils";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import CommonButton from "../../components/common/CommonButton";
import { useRouter } from "next/navigation";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import "../solutions/index.css";
import { ClickAndCollectFaqData } from "../../helpers/config";
import Faq from "../../components/home/Faq";
import StickyScrollFill from "../../components/home/StickyScrollFill";

import RadarIcon from "../solutions/assets/radar.svg";
import RoutingIcon from "../solutions/assets/routing-2.svg";
import SquareIcon from "../solutions/assets/arrange-square-2.svg";
import MonitorIcon from "../solutions/assets/monitor.svg";
import PuzzlePieceIcon from "../solutions/assets/puzzle-piece.svg";
import ExpandIcon from "../solutions/assets/arrow-expand-04.svg";
import DeploymentIcon from "./assets/deployment.svg";
import AccuracyIcon from "./assets/accuracy.svg";
import SpaceIcon from "./assets/space.svg";
import FailureIcon from "./assets/failure.svg";
import ScalesIcon from "./assets/scales.svg";
import WmsIcon from "./assets/wms.svg";
import OperatorIcon from "./assets/operator.svg";
import { useCaseClickAndCollectSchema } from "../../helpers/schemas";

/* ── Data ─────────────────────────────────────────────────────────── */

const kpiCards = [
  { value: "100%", label: "Store-wise sort accuracy" },
  { value: "2,000+", label: "Store destinations" },
  { value: "50%", label: "Less floor footprint" },
  { value: "3–6 wks", label: "Deployment timeline" },
];

const clickCollectSteps = [
  {
    step: "Step 1",
    title: "Order Receipt",
    desc: "Click & Collect order received, store and pickup slot identified",
  },
  {
    step: "Step 2",
    title: "Wave Planning",
    desc: "Software groups C&C orders by store and pickup window",
  },
  {
    step: "Step 3",
    title: "Item Sortation",
    desc: "SR450 robots sort all items for one store order to dedicated destination",
  },
  {
    step: "Step 4",
    title: "Store Segregation",
    desc: "Complete store-wise orders consolidated and labelled for handover",
  },
  {
    step: "Step 5",
    title: "Pickup Ready",
    desc: "Store staff notified when order is available for customer collection",
  },
];

const challengeTimeline = [
  {
    phase: "Pickup errors erode customer trust",
    color: "#E24B4A",
    bg: false,
    text: "Manual store-wise grouping mixed with outbound creates 1–3% C&C error rates. Wrong items, wrong store, customer arrives to no order. Omnichannel NPS drops.",
  },
  {
    phase: "Priority conflicts between channels",
    color: "#E65100",
    bg: false,
    text: "C&C demand clashes with outbound fulfilment priority. Core SLAs compromised. Store staff cannot confirm pickup readiness. Operational tension between channels grows.",
  },
  {
    phase: "Omnichannel growth makes it worse",
    color: "#F0A500",
    bg: false,
    text: "Variable pickup windows and growing store counts overwhelm manual C&C sortation. No path to scale without dedicated infrastructure and no space to build it.",
  },
  {
    phase: "With UnboxSort omnichannel runs in parallel",
    color: "#079d92",
    bg: true,
    text: "100% store-wise accuracy. Dedicated C&C lane, zero conflict with outbound. WMS auto-notifies staff when order is pickup-ready. 2,000+ store destinations. No new footprint.",
  },
];

const capabilityCards = [
  {
    title: "Store-wise order precision",
    desc: "Sorts every item to its exact store destination with 100% accuracy across 2,000+ pickup locations simultaneously.",
    icon: <RadarIcon />,
  },
  {
    title: "C&C lane isolation",
    desc: "Dedicated sortation flow prevents C&C orders mixing with outbound fulfilment with zero cross-contamination.",
    icon: <RoutingIcon />,
  },
  {
    title: "Pickup window management",
    desc: "Software groups orders by pickup window and store slot with preparation aligned to customer collection times.",
    icon: <MonitorIcon  />,
  },
  {
    title: "Real-time readiness notification",
    desc: "WMS integration triggers store staff notification automatically when a C&C order is pickup-ready.",
    icon: <PuzzlePieceIcon />,
  },
  {
    title: "Omnichannel scale",
    desc: "Handles simultaneous store pickup, e-commerce dispatch and returns in the same UnboxSort deployment.",
    icon: <ExpandIcon />,
  },
  {
    title: "Compact vertical layout",
    desc: "Processes thousands of C&C orders within a 50–70% smaller footprint vs dedicated conveyor infrastructure.",
    icon: <SquareIcon />,
  },
];

const icpProfiles = [
  {
    role: "VP Omnichannel Operations",
    company: "Fashion & Lifestyle Retail",
    pains: [
      "Scaling Click & Collect as omnichannel share grows",
      "Needs store-wise accuracy without disrupting core DC",
      "Managing multiple pickup window types simultaneously",
    ],
  },
  {
    role: "Head of Fulfillment",
    company: "Large Format Retail & FMCG",
    pains: [
      "Running high-SKU store replenishment alongside C&C",
      "Space-constrained DC unable to add dedicated infrastructure",
      "Needs unified automation for all outbound flows",
    ],
  },
  {
    role: "Director of E-Commerce",
    company: "Omnichannel D2C Brand",
    pains: [
      "Growing store pickup option driving complexity in fulfillment",
      "Manual C&C sortation creating pickup errors",
      "Needs fast deployment without DC shutdown",
    ],
  },
];

const advantages = [
  {
    headline: "100% store-wise accuracy",
    proof: "Every item to its exact store and order destination. Zero pickup errors.",
    icon: <AccuracyIcon />,
  },
  {
    headline: "Dedicated C&C lane isolation",
    proof: "C&C orders never mix with outbound. Zero cross-contamination.",
    icon: <FailureIcon />,
  },
  {
    headline: "Pickup window management",
    proof: "Pre-sorted by store and pickup slot. No manual reprogram for schedule changes.",
    icon: <MonitorIcon width={24} height={24}/>,
  },
  {
    headline: "Auto readiness notification",
    proof: "WMS triggers staff notification when each C&C order is pickup-ready.",
    icon: <WmsIcon />,
  },
  {
    headline: "2,000+ store destinations",
    proof: "Handles your full store network within a compact vertical footprint.",
    icon: <ScalesIcon />,
  },
  {
    headline: "Omnichannel simultaneity",
    proof: "C&C, e-commerce dispatch and returns in the same deployment.",
    icon: <ExpandIcon width={24} height={24}/>,
  },
  {
    headline: "3–6 week deployment",
    proof: "Live before your next peak. No DC shutdown, no civil works.",
    icon: <DeploymentIcon />,
  },
  {
    headline: "Compact footprint",
    proof: "50–70% less floor vs dedicated conveyor C&C infrastructure.",
    icon: <SpaceIcon />,
  },
];

/* ── Component ────────────────────────────────────────────────────── */

const FulfillmentCenterClickAndCollectPage = () => {
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
        title="Fulfillment Center Click & Collect Sortation — UnboxSort | Unbox Robotics"
        description="UnboxSort automates Click & Collect and store pickup sortation. Precise store-wise and order-level sorting for omnichannel fulfillment. 100% accuracy, deployed in weeks."
      />

            <SchemaMarkup schema={useCaseClickAndCollectSchema} />
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
              Click & Collect{" "}
              <span className="!font-semibold">Ready Faster.</span> Every Order,
              Every Store.
            </motion.h1>
            <motion.p
              className="font-16-light color-grey-1 text-center max-w-[780px]"
              custom={1}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              UnboxSort enables precise store-wise and order-level sortation for
              Click & Collect and store pickup fast enough to meet customer
              expectations and accurate enough to never miss a pickup.
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
            alt="UnboxSort Click & Collect store-wise sortation deployment"
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
              How UnboxSort Powers Click & Collect Fulfillment
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              From customer order placement to store-ready pickup preparation
              with automated store-wise sortation at every step.
            </motion.p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-3 items-stretch overflow-x-auto">
            {clickCollectSteps.map((item, index) => (
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
                {index < clickCollectSteps.length - 1 && (
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
              Why Click & Collect demands dedicated sortation
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              Growing omnichannel volumes mean C&C sortation mixed into core
              operations creates errors, delays and poor pickup experiences
              at exactly the moment customer expectations are highest.
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
              Six capabilities that transform Click & Collect operations
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              UnboxSort delivers the store-wise precision and operational
              separation that modern omnichannel fulfillment demands.
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
                <div className="industry-capability-icon" style={{ color: "#06B1A4" }}>{item.icon}</div>
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
              UnboxSort Click & Collect sortation is built for omnichannel
              retailers and fulfillment operators managing growing store pickup
              volumes.
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
                    <li key={pain} className="font-16-light color-black-1">
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
              Why Omnichannel Operators Choose UnboxSort for Click & Collect
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              Eight capabilities that make UnboxSort the most precise and
              scalable Click & Collect sortation solution available.
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
                <p className="font-16-light color-black-1">{item.proof}</p>
              </motion.article>
            ))}
          </div>

          {/* Closer — StickyScrollFill */}
          <StickyScrollFill
            text={`UnboxSort is the only robotic sortation system that handles Click & Collect, e-commerce dispatch and returns simultaneously with no compromise between omnichannel flows.`}
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
              Questions about Click & Collect sortation automation
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              What retail and omnichannel operators ask when evaluating UnboxSort
              for Click & Collect fulfillment.
            </motion.p>
          </motion.div>
        </section>
      </div>
      <Faq
        data={ClickAndCollectFaqData.slice(0, 4)}
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
                UnboxSort: Omnichannel Click & Collect sortation for modern
                retail fulfillment
              </h2>
              <p className="font-20-light color-black-1">
                <span className="!font-medium">Click & Collect automation</span>{" "}
                has become essential as omnichannel retail grows. UnboxSort
                delivers dedicated store-wise sortation for pickup fulfillment
                without disrupting core outbound operations and without expensive
                dedicated conveyor infrastructure. With 2,000+ simultaneous
                store destinations within a compact vertical footprint, UnboxSort
                enables fashion, FMCG and lifestyle retailers to deliver{" "}
                <span className="!font-medium">
                  omnichannel fulfillment automation
                </span>{" "}
                at scale.
              </p>
              <p className="font-20-light color-black-1">
                As one of the leading{" "}
                <span className="!font-medium">warehouse automation companies</span>{" "}
                in India and Europe, Unbox Robotics has deployed UnboxSort across
                omnichannel retail and fashion fulfillment environments
                delivering 100% store-wise accuracy, real-time pickup readiness
                notification, and{" "}
                <span className="color-black-1 !font-medium">
                  warehouse automation ROI
                </span>{" "}
                within 6–9 months. Modular deployment in 3–6 weeks without civil
                works or operational shutdown.
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
            Ready to automate your Click & Collect operations?
          </motion.h2>
          <motion.p
            className="font-16-light text-white text-center"
            custom={1}
            variants={animation.fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            See how UnboxSort delivers 100% store-wise accuracy and real-time
            pickup readiness within your existing DC footprint.
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

export default FulfillmentCenterClickAndCollectPage;
