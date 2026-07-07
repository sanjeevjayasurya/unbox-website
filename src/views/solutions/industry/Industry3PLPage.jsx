"use client";

import React, { useState, useEffect } from "react";
import { animation } from "../../../helpers/utils";
import { motion, AnimatePresence } from "framer-motion";
import CommonButton from "../../../components/common/CommonButton";
import { useRouter } from "next/navigation";
import HelmetWrapper from "../../../components/common/HelmetWrapper";
import SchemaMarkup from "../../../components/common/SchemaMarkup";
import industryHeaderImg from "../assets/hero-img.webp";
import caseStudyVideo from "../assets/video/3pl.mp4";
import OperationHead from "../assets/operation-head.webp";
import SmarterArchImg from "../assets/smart-arch.webp";
import "../index.css";
import {
  Industry3PLFaqData,
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
import { industry3PLSchema } from "../../../helpers/schemas";

const challengePoints = [
  "Simultaneous multi-client sortation creates cross-contamination and mis-sort risk at scale.",
  "Contract volume swings make fixed-capacity automation unviable for 3PL demand cycles.",
  "Labor shortages make sortation teams expensive and hard to retain across shifts.",
  "New client onboarding intensifies space pressure without any facility expansion.",
  "One sortation error triggers SLA penalties, client disputes and contract risk.",
  "Conventional automation is too rigid for multi-client, multi-vertical 3PL complexity.",
];

const solutionPoints = [
  "99.99%+ sort accuracy across simultaneous client flows. Zero cross-contamination, zero SLA penalties.",
  "Fleet capacity scales per contract, added or removed without operational shutdown.",
  "50-70% smaller footprint enables new client onboarding within the existing facility.",
  "Configures per client specification without hardware changes.",
  "Deploys in 6-9 weeks. Onboard new contracts faster than competitors.",
  "RCS-orchestrated fleet self-heals and reroutes in real time, no downtime at peak, no SLA risk.",
];

const retailInfoCards = [
  {
    title: "WHAT IS UNBOX FOR RETAIL?",
    icon: <RadarIcon />,
    desc: "Unbox Robotics is a warehouse automation company building AI-powered robotic sortation systems for retail and fashion distribution - delivering 100% sort accuracy and 50% footprint reduction with ROI in 6-9 months.",
  },
  {
    title: "HOW DOES IT HANDLE OMNICHANNEL?",
    icon: <RoutingIcon />,
    desc: "Unbox handles store replenishment, e-commerce dispatch, returns processing and omnichannel order consolidation within the same modular warehouse automation system - no separate infrastructure needed.",
  },
  {
    title: "WHAT IS THE ROI FOR RETAIL?",
    icon: <SquareIcon />,
    desc: "Retail operators achieve warehouse automation ROI in 6-9 months through 40-60% labor reduction, 100% sort accuracy eliminating rework, and 2x productivity gain from automated parcel sorting at scale.",
  },
];

const retailKpiCards = [
  { value: "6,500+", label: "Parcels per hour max" },
  { value: "100%", label: "Sort accuracy" },
  { value: "50%", label: "Warehouse footprint reduced" },
  { value: "1-2 yrs", label: "Typical ROI timeline" },
];

const retailCapabilityCards = [
  {
    title: "3D robotic sorting system",
    desc: "With multiple rack levels up to a height of 2.4m, the vertical sortation system recovers 50-70% of your 3PL facility floor for productive use.",
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
    title: "Flexible capacity scaling",
    desc: "Scalable warehouse robotics adds or removes robot capacity per contract cycle, handling peak season volume without additional headcount or operational shutdown.",
    icon: <ExpandIcon />,
  },
  {
    title: "6-9 week deployment",
    desc: "Modular warehouse automation means 3PL operators go live in weeks win new contracts and onboard faster than competitors using conventional automation.",
    icon: <MonitorIcon />,
  },
  {
    title: "Warehouse safety automation",
    desc: "Once deployed, operates continuously with 24x7 uptime support, reducing manual handling on the sortation floor and minimising injury risk.",
    icon: <RoutingIcon />,
  },
];

const retailTrustParagraphs = [
  "As one of the fastest-growing warehouse automation companies in Asia and Europe, Unbox Robotics has engineered its robotic sortation system for the multi-client complexity, contract volatility, and space constraints unique to third-party logistics operations. Unlike generic warehouse robotics solutions built for single-client environments, every element of the Unbox system is designed to handle simultaneous multi-client sortation with 99.99%+ accuracy.",
  "The modular warehouse automation approach means 3PL operators can deploy Unbox within existing footprints — no civil works, no structural modification, no operational shutdown. This is flexible automation for warehouse environments where new client contracts cannot wait for 12–18 month implementations. From contract award to live sortation typically takes 6-9 weeks.",
  "For 3PL operators managing the labor shortage and rising client SLA pressure, Unbox delivers: a 40–60% reduction in sortation headcount, RCS-orchestrated swarm intelligence that self-heals at peak with zero downtime, and warehouse automation ROI visible within 1–2 years. The competitive edge: win new contracts knowing you can onboard them faster than any competitor relying on conventional automation.",
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
  { value: "1000", label: "System Throughput" },
  { value: "100%", label: "Sort Accuracy" },
  { value: "2x", label: "Productivity Gain" },
  { value: "35%", label: "Space Optimisation" },
  { value: "3-6 weeks", label: "Time to go live" },
  { value: "1-2 years", label: "Warehouse Automation ROI" },
];

const stakeholderImpactTabs = [
  {
    id: "operations",
    label: "Operations Head",
    title: "Operations Head",
    image: OperationHead,
    points: [
      "Eliminate multi-client sortation errors — 99.99%+ sort accuracy, zero SLA penalty risk.",
      "Scale throughput from 500 to 20,000 parcels per hour within the same deployment as client volumes grow.",
      "A real-time, WMS-integrated dashboard tracks warehouse automation ROI per client from day one.",
      "RCS-orchestrated swarm intelligence self-heals continuously — delivering 24×7 uptime with no single point of failure, even at peak.",
    ],
  },
  {
    id: "engineering",
    label: "Engineering & IE",
    title: "Engineering & IE",
    image: industryHeaderImg,
    points: [
      "Deploy within the existing warehouse footprint — no structural modification required.",
      "The UnboxSort robot fleet scales per contract cycle without infrastructure changes, delivering true flexible automation across warehouse environments.",
      "Multi-WMS integration via standard API connects with your system and each client's WMS — no custom code required.",
      "Brownfield deployment in 6-9 weeks — competitive advantage in 3PL contract onboarding speed.",
    ],
  },
  {
    id: "leadership",
    label: "CEO & Leadership",
    title: "CEO & Leadership",
    image: industryHeaderImg,
    points: [
      "Warehouse automation ROI achievable within 1-2 years with measurable return tracked per client contract.",
      "Win new 3PL contracts with the confidence of deploying and onboarding faster than competitors relying on conventional automation.",
      "Reduce warehouse footprint by up to 50%, enabling additional client onboarding within the existing facility.",
      "Scalable warehouse robotics protects capital investment across contract volatility.",
    ],
  },
  {
    id: "warehouse",
    label: "Warehousing Manager",
    title: "Warehousing Manager",
    image: industryHeaderImg,
    points: [
      "Run simultaneous multi-client sortation without cross-contamination — 99.99%+ sort accuracy across every client flow.",
      "Reduce sortation headcount dramatically, resolving labor shortage across multi-shift operations.",
      "Reduced manual handling on the sortation floor lowers injury risk consistently across all shifts.",
      "Handle volume spikes across multiple client contracts during peak season without additional headcount or operational disruption.",
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

const Industry3PLPage = () => {
  const router = useRouter();
  const [activeStakeholderTab, setActiveStakeholderTab] = useState(
    stakeholderImpactTabs[0],
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

            <SchemaMarkup schema={industry3PLSchema} />
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
              The Robotic Sortation System Built for <br />
              <span className="!font-semibold">3PL Operations at Scale.</span>
            </motion.h1>
            <motion.p
              className="font-16-light color-grey-1 text-center max-w-[800px]"
              custom={1}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              Unbox delivers AI-powered warehouse sorting for 3PL operators
              handling multi-client complexity with 99.99%+ sort accuracy, 50%
              less floor space, and warehouse automation payback in 1-2 years.
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
              A smarter architecture for multi-client 3PL sortation
            </motion.h1>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              UnboxSort robots operate on an RCS layer across multi-tier sorting
              levels, orchestrated by AI-powered sorting software that
              integrates seamlessly with your existing WMS. The result is a 3D
              robotic sorting system that handles store replenishment,
              omnichannel dispatch, and returns processing all within a single
              warehousing site, as per client specifications.
            </motion.p>
          </div>

          <motion.img
            src={SmarterArchImg}
            draggable={false}
            alt="UnboxSort smarter architecture for 3PL fulfilment"
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
              Why 3PL operations demand smarter warehouse automation
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              Multi-client complexity, contract volume spikes, and the global
              warehouse labor shortage are pushing 3PL operators to breaking
              point, with clients demanding faster fulfillment at lower cost.
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
              What holds operations back
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
                How a Global 3PL Leader Automated Parcel Sorting and Cut
                Operational Complexity in Half
              </h2>
              <p className="font-20-light color-grey-1">
                A real deployment at 3PL facility running B2C fulfillment for a
                global sports brand. See how UnboxSort delivered measurable
                results without expanding the facility footprint.
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
              &ldquo;Unbox gave us the ability to onboard new clients without
              expanding our footprint. Multi-client sortation runs
              simultaneously with 100% accuracy. We have not had a single SLA
              penalty since deployment.&rdquo;
            </p>
            <p className="font-20-medium color-green-1">Head of Operations</p>
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
              How UnboxSort Delivers Value Across Every Stakeholder in 3PL
              Warehouse Operations
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
              Why Unbox is the trusted robotic sortation system for 3PL
              operators
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

      <Faq data={Industry3PLFaqData?.slice(0, 7)} exploreBtnVisible={false} />

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
            Ready to transform your retail distribution with warehouse
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

export default Industry3PLPage;
