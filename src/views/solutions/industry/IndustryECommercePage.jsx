"use client";

import React, { useState, useEffect } from "react";
import { animation } from "../../../helpers/utils";
import { motion, AnimatePresence } from "framer-motion";
import CommonButton from "../../../components/common/CommonButton";
import { useRouter } from "next/navigation";
import HelmetWrapper from "../../../components/common/HelmetWrapper";
import SchemaMarkup from "../../../components/common/SchemaMarkup";
import industryHeaderImg from "../assets/hero-img.webp";
import caseStudyVideo from "../assets/video/e-commerce.mp4";
import OperationHead from "../assets/operation-head.webp";
import SmarterArchImg from "../assets/smart-arch.webp";
import "../index.css";
import {
  IndustryECommerceFaqData,
  solutionIndustryFaqData,
} from "../../../helpers/config";
import Faq from "../../../components/home/Faq";

import RadarIcon from "../assets/radar.svg";
import RoutingIcon from "../assets/routing-2.svg";
import SquareIcon from "../assets/arrange-square-2.svg";
import MonitorIcon from "../assets/monitor.svg";
import PuzzlePieceIcon from "../assets/puzzle-piece.svg";
import ExpandIcon from "../assets/arrow-expand-04.svg";

import RetailIcon from "../assets/icon.svg";
import FashionIcon from "../assets/Icon-1.svg";
import LaborIcon from "../assets/Icon-2.svg";
import OmnichannelIcon from "../assets/Icon-3.svg";
import ImageComponent from "../../../components/common/ImageComponent";
import { industryECommerceSchema } from "../../../helpers/schemas";

const challengePoints = [
  "The bottleneck isn't picking speed. It's consolidation between pick and dispatch.",
  "Thousands of live SKUs make manual order batching impossible to manage accurately.",
  "Mezzanine floors built for storage can't physically fit conventional sorting systems.",
  "Returns and outbound orders compete for the same floor, and one always slows the other.",
  "Carrier cut-off misses aren't caught in time. Rework happens after the parcel is already late.",
  "Peak season doubles throughput demand. Temporary labor can't keep up without errors.",
];

const solutionPoints = [
  "One scan per item, sorted, consolidated and dispatch-ready without wave resets.",
  "Orders mapped to destinations in real time, with no backlogs and no pre-assigned slots.",
  "Deploys on existing mezzanine floors without structural changes or pillar clearance.",
  "Returns and outbound run on the same system simultaneously, with no floor conflicts.",
  "Errors caught at consolidation, before the carrier cut-off is missed.",
  "500 to 20,000 parcels per hour, same deployment, no extra headcount at peak.",
];

const retailInfoCards = [
  {
    title: "What is Unbox?",
    icon: <RadarIcon />,
    desc: "Unbox Robotics is a warehouse automation company that builds AI-powered robotic sortation systems for e-commerce, 3PL and CEP operations — delivering 100% sort accuracy and 50% footprint reduction.",
  },
  {
    title: "How fast is deployment?",
    icon: <RoutingIcon />,
    desc: "Unbox deploys in 3–6 weeks from contract to live operations. No civil works. No IT dependency. No operational shutdown. WMS integration via standard API in 2–3 weeks.",
  },
  {
    title: "What is the ROI?",
    icon: <SquareIcon />,
    desc: "Warehouse automation ROI is typically achieved in 6–9 months, driven by 40–60% labor cost reduction, 100% sort accuracy eliminating rework, and 2× productivity gain from automated parcel sorting.",
  },
];

const retailKpiCards = [
  { value: "11,500+", label: "System throughput (PPH)" },
  { value: "100%", label: "Robotic sorting accuracy" },
  { value: "50%", label: "Warehouse footprint reduced" },
  { value: "1-2 yr", label: "Typical ROI timeline" },
];

const retailCapabilityCards = [
  {
    title: "3D robotic sorting system",
    desc: "With multiple rack levels up to a height of 2.4m, the vertical sortation system recovers 50-70% of your retail DC floor for productive use.",
    icon: <MonitorIcon />,
  },
  {
    title: "RCS-orchestrated swarm coordination",
    desc: "UnboxSort autonomous mobile robots are coordinated via RCS-layer swarm intelligence for fleet-level dynamic load balancing — no single point of failure, fleet self-heals in under 2 seconds.",
    icon: <SquareIcon />,
  },
  {
    title: "WMS integration in days",
    desc: "System agnostic software connects with your existing WMS via standard API — no custom code, no IT dependency, live from day one.",
    icon: <PuzzlePieceIcon />,
  },
  {
    title: "Thousands of destinations",
    desc: "Massive sorting capacity fulfilling from a few hundreds to thousands of store codes, size codes and SKU variants in one automated parcel sorting run with minimal area requirement.",
    icon: <ExpandIcon />,
  },
  {
    title: "Peak season warehouse scalability",
    desc: "Scalable warehouse robotics handles Black Friday sale, New Year's sale, and End of Season sale spikes without additional headcount or operational disruption.",
    icon: <MonitorIcon />,
  },
  {
    title: "Warehouse safety automation",
    desc: "Once deployed, operates continuously with 24x7 uptime support, reducing manual handling on the sortation floor and minimising injury risk.",
    icon: <RoutingIcon />,
  },
];

const retailTrustParagraphs = [
  "As one of the fastest-growing warehouse automation companies, Unbox Robotics has built its robotic sortation system specifically for the payload profiles, throughput demands, and space constraints of e-commerce and fashion fulfillment. Unlike generic warehouse robotics solutions adapted from other verticals, every element of the Unbox system from robot design to software architecture is engineered for parcels up to 650×500×400mm, payloads configurable up to 20kg, and sortation volumes from 500 to 20,000 parcels per hour.",
  "The modular warehouse automation approach means operators can deploy UnboxSort within their existing footprint no civil works, no structural modification, no operational shutdown. This is flexible automation for warehouse environments that cannot afford 12–18 month implementations. From contract to live operations typically takes 6-9 weeks.",
  "For e-commerce fulfillment operators where the consolidation bottleneck is that limits dispatch throughput, UnboxSort closes the gap between the pick zone and the carrier dock. A 40–60% reduction in sortation headcount, order-level consolidation accuracy at 99.99%+, and automation ROI typically visible within 1–2 years, with scalable warehouse robotics that absorbs order volume growth without additional floor space or headcount.",
];

const marketDataCards = [
  {
    title: "Retail automation market",
    desc: "Global retail automation projected to grow at 11% CAGR through 2030, driven by omnichannel complexity and warehouse labor shortage (Industry data, 2025).",
    icon: <RetailIcon />,
  },
  {
    title: "Fashion returns",
    desc: "E-commerce fashion returns growing 35%+ annually - creating urgent demand for automated returns processing and accurate robotic sorting (Market research, 2025).",
    icon: <FashionIcon />,
  },
  {
    title: "Labor cost",
    desc: "Warehouse labour accounts for 60-70% of DC operating costs. Warehouse labour shortage making manual retail sortation increasingly unsustainable (Marketing Pillars, 2026).",
    icon: <LaborIcon />,
  },
  {
    title: "Omnichannel",
    desc: "Retailers operating omnichannel models process 3-5x more SKUs per fulfilment run than single-channel - making scalable warehouse robotics essential (Industry data, 2025).",
    icon: <OmnichannelIcon />,
  },
];

const caseStudyKpis = [
  { value: "11,500", label: "System Throughput" },
  { value: "100%", label: "Robotic sorting accuracy" },
  { value: "2x", label: "Productivity Gain" },
  { value: "1-2 years", label: "Warehouse automation ROI" },
  // { value: "2 steps", label: "Down from 4 manual" },
  { value: "3-6 weeks", label: "Time to go live" },
  { value: "20%", label: "Space Optimisation" },
];

const stakeholderImpactTabs = [
  {
    id: "operations",
    label: "Operations Head",
    title: "Operations Head",
    image: OperationHead,
    points: [
      "Cut manual order consolidation steps in half, eliminate mis-sorts across thousands of SKUs, and minimise labor overheads on every shift.",
      "Achieve consistent 1,200 PPH throughput across peak sale or BAU cycles, without reconfiguration or additional resources.",
      "Real-time, WMS-integrated dashboard to track warehouse automation ROI from day one.",
      "24x7 on-ground support keeps the retail DC running without downtime risk.",
    ],
  },
  {
    id: "engineering",
    label: "Engineering & IE",
    title: "Engineering & IE",
    image: industryHeaderImg,
    points: [
      "Deploy within existing infrastructure with minimal civil changes and no long shutdown windows.",
      "UnboxSort robot fleet scales up or down without infrastructure changes — true flexible automation for warehouse environments.",
      "System-agnostic WMS integration with full API compatibility — no IT dependency, no custom code required.",
      "Brownfield and greenfield deployment options with a 6-9 week implementation timeline vs 12-18 months for conventional warehouse automation.",
    ],
  },
  {
    id: "leadership",
    label: "CEO & Leadership",
    title: "CEO & Leadership",
    image: industryHeaderImg,
    points: [
      "Warehouse automation ROI in 1–2 years — 2× faster than standard automation payback timelines.",
      "Reduce warehouse footprint by up to 50% with higher throughput per square metre of facility.",
      "A scalable warehouse robotics architecture that protects capital investment as order volumes grow.",
      "99.99%+ accurate robotic sorting eliminates mis-sort exposure, protecting brand reputation and customer satisfaction at scale.",
    ],
  },
  {
    id: "warehouse",
    label: "Warehousing Manager",
    title: "Warehousing Manager",
    image: industryHeaderImg,
    points: [
      "Reduce consolidation team to as few as 10 associates directly addressing warehouse labor shortage on the sortation floor.",
      "Eliminate reconciliation errors, 99.99%+ robotic sorting accuracy means fewer audit cycles and zero rework.",
      "Reduced manual handling on the sortation floor lowers injury risk significantly.",
      "Scale through peak season volume spikes without additional headcount or operational disruption.",
    ],
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

const IndustryECommercePage = () => {
  const router = useRouter();
  const [activeStakeholderTab, setActiveStakeholderTab] = useState(
    stakeholderImpactTabs[0]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HelmetWrapper
        title="Industry"
        description="Optimized Sortation for Leading Industries"
      />

            <SchemaMarkup schema={industryECommerceSchema} />
{/* Hero */}
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
              The Robotic Sortation System Built for
              <br />
              <span className="!font-semibold">E-Commerce at Scale.</span>
            </motion.h1>
            <motion.p
              className="font-16-light color-grey-1 text-center max-w-[800px]"
              custom={1}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              UnboxSort delivers AI-powered warehouse sorting that doubles
              throughput, reduces warehouse footprint by 50%, and achieves
              99.99%+ robotic sorting accuracy without disrupting your live
              operation.
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
                title={"See Case Studies"}
                onClick={() => router.push("/case-study")}
              />
            </motion.div>
          </div>

          {/* <motion.img
            src={industryHeaderImg}
            alt="industry-header"
            className="industry-header-img"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
            draggable={false}
          /> */}
        </motion.div>
      </div>

      {/* Retail info cards */}
      {/* <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-retail-info-section">
          <div className="industry-retail-info-grid">
            {retailInfoCards.map((card, index) => (
              <motion.article
                key={card.title}
                className="industry-retail-info-card"
                custom={index}
                variants={animation.fadeInUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                {card.icon}
                <div className="space-y-3">
                  <h3 className="font-20-medium !text-[18px] color-black-1">
                    {card.title}
                  </h3>
                  <p className="font-16-light color-black-1">{card.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </div> */}

      {/* KPI cards */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-retail-kpi-section">
          <div className="industry-retail-kpi-grid">
            {retailKpiCards.map((item, index) => (
              <motion.article
                key={item.label}
                className="industry-retail-kpi-card"
                custom={index}
                variants={animation.fadeInUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <h3 className="text-[46px] max-md:text-[28px] font-semibold text-[#00A99D]">
                  {item.value}
                </h3>
                <p className="font-16-light color-black-1">{item.label}</p>
              </motion.article>
            ))}
          </div>
        </section>
      </div>

      {/* Smarter architecture section */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <motion.div
          className="technology-section-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col gap-[14px] md:gap-[20px]">
            <motion.h1
              className="font-40-regular color-black-1 text-center"
              custom={0}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              A smarter architecture for automated parcel sorting
            </motion.h1>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              UnboxSort robots consolidate live orders across thousands of SKUs
              and destinations sorting from pick to dispatch-ready in a single
              automated pass. The RCS layer manages fleet-level routing across
              multi-tier vertical levels, while ML-based binning software
              dynamically maps each scanned item to its open order destination,
              collapsing a 4-step manual consolidation process into one
              continuous flow, without stopping for wave resets or shift
              changes.
            </motion.p>
          </div>

          <motion.img
            src={SmarterArchImg}
            draggable={false}
            alt="UnboxSort smarter architecture for e-commerce fulfilment"
            className="industry-smarter-img"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
          />
        </motion.div>
      </div>

      {/* Comparison section */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-comparison-section">
          <motion.div
            className="industry-comparison-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="font-40-regular color-black-1 text-center"
              custom={0}
              variants={animation.fadeInUpVariant}
            >
              Why e-commerce fulfillment operations demand smarter warehouse
              automation
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              Growing order volumes, faster delivery promises, and rising return
              rates are compressing the consolidation window inside every
              fulfillment center. A four-step manual process that worked at 500
              orders per batch breaks at 1,500 and every mis-sort or wave reset
              directly delays dispatch. For e-commerce operators, the bottleneck
              is no longer picking, it is what happens between the pick zone and
              the outbound dock.
            </motion.p>
          </motion.div>

          <div className="industry-comparison-grid">
            <motion.h3
              className="font-16-semibold color-black-1"
              custom={0}
              variants={animation.fromLeftItemVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              What holds e-commerce operations back
            </motion.h3>
            <motion.h3
              className="font-16-semibold color-black-1"
              custom={0}
              variants={animation.itemFromRightVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              How Unbox solves it
            </motion.h3>
            {challengePoints.map((item, index) => (
              <React.Fragment key={index}>
                <motion.article
                  className="industry-comparison-item"
                  custom={index}
                  variants={animation.fromLeftItemVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <span className="industry-comparison-dot industry-comparison-dot-left" />
                  </div>
                  <p className="font-16-light color-grey-1">{item}</p>
                </motion.article>
                <motion.article
                  className="industry-comparison-item bg-[#F8F8F8]"
                  custom={index}
                  variants={animation.itemFromRightVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <span className="industry-comparison-dot industry-comparison-dot-right" />
                  </div>
                  <p className="font-16-light color-black-1">{solutionPoints[index]}</p>
                </motion.article>
              </React.Fragment>
            ))}
          </div>
        </section>
      </div>

      {/* Capability cards */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-capability-section">
          <div className="industry-capability-grid">
            {retailCapabilityCards.map((item, index) => (
              <motion.article
                key={item.title}
                className="industry-capability-card"
                custom={index}
                variants={animation.fadeInUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
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

      {/* Market data */}
      {/* <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-market-data-section">
          <div className="industry-market-data-content">
            <motion.h2
              className="font-40-regular color-black-1 text-center"
              custom={0}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              Market data - warehouse automation industry
            </motion.h2>
            <div className="industry-market-data-grid">
              {marketDataCards.map((item, index) => (
                <motion.article
                  key={item.title}
                  className="industry-market-data-card"
                  custom={index}
                  variants={animation.fadeInUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="industry-market-data-title-wrap">
                    <span className="industry-market-data-icon">
                      {item.icon}
                    </span>
                    <h3 className="font-20-regular color-black-1">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-16-light color-black-1">{item.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </div> */}

      {/* Case study */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-case-study-section">
          <div
            className="industry-case-study-top"
            style={{ gridTemplateColumns: "minmax(0, 1fr)" }}
          >
            <motion.div
              className="industry-case-study-content"
              custom={0}
              variants={animation.fromLeftItemVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="font-20-medium color-green-1">Case Study</p>
              <h2 className="font-40-regular color-black-1">
                How a Leading Fashion Marketplace Doubled Consolidation Output
                Without a Single Day of Shutdown
              </h2>
              <p className="font-20-light color-grey-1">
                Tight warehouse pillars. 1,500 orders per batch. A slow
                four-step manual process stretched thin during peak. UnboxSort
                was deployed within the existing space and didn't stop
                operations for even a day.
              </p>
              <div>
                <CommonButton
                  theme={"green"}
                  title={"Read Full Case Study"}
                  onClick={() => router.push("/case-study")}
                />
              </div>
            </motion.div>
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
          </div>

          <div className="industry-case-study-kpi-grid">
            {caseStudyKpis.map((item, index) => (
              <motion.article
                key={item.label}
                className="industry-case-study-kpi-card"
                custom={index}
                variants={animation.fadeInUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <h3 className="font-20-medium color-green-1">{item.value}</h3>
                <p className="font-20-regular color-black-1">{item.label}</p>
              </motion.article>
            ))}
          </div>

          <motion.div
            className="industry-case-study-quote"
            custom={0}
            variants={animation.fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="font-20-regular color-black-1">
              &ldquo;Unbox helped us move from a four-step to a two-step
              consolidation process. The robotic sortation system is reliable,
              always available, and consistently delivers 100% sort
              accuracy.&rdquo;
            </p>
            <p className="font-20-medium color-green-1">Automation Leader</p>
          </motion.div>
        </section>
      </div>

      {/* Stakeholder impact */}
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
              How UnboxSort is Reshaping E-Commerce Warehouse Automation for Every Stakeholder
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              Whether you&apos;re driving operations, managing capital, or
              building scalable infrastructure Unbox delivers measurable results
              against what matters most to you.
            </motion.p>
          </motion.div>

          <div className="industry-stakeholder-card">
            <div className="industry-stakeholder-tabs">
              {stakeholderImpactTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`industry-stakeholder-tab ${
                    activeStakeholderTab.id === tab.id ? "active" : ""
                  }`}
                  onClick={() => setActiveStakeholderTab(tab)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStakeholderTab.id}
                className="industry-stakeholder-content"
                variants={stakeholderContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div className="industry-stakeholder-image-wrap">
                  <ImageComponent
                    src={activeStakeholderTab.image}
                    alt={activeStakeholderTab.title}
                    className="industry-stakeholder-image"
                  />
                </div>

                <div className="industry-stakeholder-text">
                  <h3 className="font-16-semibold color-black-1">
                    {activeStakeholderTab.title}
                  </h3>
                  <ul className="industry-stakeholder-points">
                    {activeStakeholderTab.points.map((point) => (
                      <li key={point} className="font-16-light color-black-1">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>

      {/* Trust section */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-trust-section">
          <div className="industry-trust-content">
            <motion.h2
              className="font-40-regular color-black-1 text-center"
              custom={0}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              Why Unbox is the trusted robotic sortation system for e-commerce
            </motion.h2>

            <div className="industry-trust-copy">
              {retailTrustParagraphs.map((paragraph, index) => (
                <motion.p
                  key={paragraph}
                  className="font-16-light color-grey-1 text-center"
                  custom={index}
                  variants={animation.fadeInUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Faq
        data={IndustryECommerceFaqData?.slice(0, 7)}
        exploreBtnVisible={false}
      />

      {/* CTA Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-[#141313] mb-10 py-12 md:py-20 px-5 md:px-15 flex flex-col gap-10 md:gap-[60px] items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center gap-[14px]">
          <motion.h1
            className="font-40-regular text-white text-center max-w-[858px]"
            custom={0}
            variants={animation.fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            Ready to transform your e-commerce fulfillment with warehouse
            automation?
          </motion.h1>
          <motion.p
            className="font-16-light text-white text-center"
            custom={1}
            variants={animation.fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            Talk to our team and see how Unbox robotic sortation can be deployed
            within your existing retail DC footprint — with ROI in 6–9 months.
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
            title={"Calculate ROI"}
            onClick={() => router.push("/get-in-touch")}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default IndustryECommercePage;
