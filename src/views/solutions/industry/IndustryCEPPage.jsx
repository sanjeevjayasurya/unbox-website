"use client";

import React, { useState, useEffect } from "react";
import { animation } from "../../../helpers/utils";
import { motion, AnimatePresence } from "framer-motion";
import CommonButton from "../../../components/common/CommonButton";
import { useRouter } from "next/navigation";
import HelmetWrapper from "../../../components/common/HelmetWrapper";
import SchemaMarkup from "../../../components/common/SchemaMarkup";
import industryHeaderImg from "../assets/hero-img.webp";
import caseStudyVideo from "../assets/video/cep.mp4";
import OperationHead from "../assets/operation-head.webp";
import SmarterArchImg from "../assets/smart-arch.webp";
import "../index.css";
import {
  Industry3PLFaqData,
  IndustryCEPFaqData,
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
import { industryCEPSchema } from "../../../helpers/schemas";

const challengePoints = [
  "E-commerce parcel volumes grow 15-20% annually, outpacing manual sortation and legacy conveyors.",
  "CEP hubs lack the footprint for conventional automation and conveyor systems.",
  "Sorting accuracy failures in high-volume hubs lead to mis-deliveries and re-runs.",
  "Labor shortages make manual sortation teams expensive to sustain across multi-shift operations.",
  "Black Friday sale, New Year's sale, and End of Season sale consistently overwhelm fixed-capacity sortation infrastructure.",
  "Single breakdown in a legacy system brings the entire hub operation to a halt.",
];

const solutionPoints = [
  "99.99%+ sort accuracy across 2,000+ last-mile destinations. Zero mis-deliveries at any volume.",
  "Vertical 3D sortation cuts hub footprint by 50–70%, within existing building constraints.",
  "RCS-orchestrated fleet self-heals and reroutes in under 2 seconds. No downtime at peak.",
  "Scales from 500 to 20,000 parcels per hour within the same hub deployment.",
  "Deploys in 6-9 weeks without civil works or shutdown of live hub operations.",
  "AI-powered sorting processes inbound line-haul and routes every parcel automatically.",
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
  { value: "5,000", label: "System throughput (PPH)" },
  { value: "100%", label: "Sort accuracy" },
  { value: "50%", label: "Warehouse footprint reduced" },
  { value: "1-2 yr", label: "Typical ROI timeline" },
];

const retailCapabilityCards = [
  {
    title: "3D robotic sorting system",
    desc: "With multiple rack levels up to a height of 2.4m, the vertical sortation system recovers 50–70% of your facility floor space for productive use.",
    icon: <MonitorIcon />,
  },
  {
    title: "RCS-orchestrated fleet coordination for CEP",
    desc: "RCS-orchestrated swarm intelligence ensures the fleet self-heals in under 2 seconds if any robot goes offline no single point of failure, 99.99%+ uptime at peak parcel volumes.",
    icon: <SquareIcon />,
  },
  {
    title: "2,000 last-mile destinations",
    desc: "Automated parcel sorting to 2,000+ last-mile delivery routes within a compact hub footprint accurate robotic sorting ensures every parcel is routed correctly, first time.",
    icon: <PuzzlePieceIcon />,
  },
  {
    title: "Peak season warehouse scalability",
    desc: "Scalable warehouse robotics handles Black Friday, Ramadan, and Diwali volume spikes without additional headcount peak season resilience built into every deployment.",
    icon: <ExpandIcon />,
  },
  {
    title: "6-9 week deployment",
    desc: "Modular warehouse automation means CEP operators go live in weeks onboarding new routes and scaling capacity faster than competitors relying on conventional automation.",
    icon: <MonitorIcon />,
  },
  {
    title: "Warehouse safety automation",
    desc: "Once deployed, operates continuously with 24x7 uptime support, reducing manual handling on the sortation floor and minimizing injury risk.",
    icon: <RoutingIcon />,
  },
];

const retailTrustParagraphs = [
  "As one of the fastest-growing warehouse automation companies, Unbox Robotics has engineered its robotic sortation system specifically for the payload profiles and throughput demands of courier, express, and parcel networks. Every element — from robot design to RCS-layer, swarm coordination software — is purpose-built for parcels up to 650×500×400mm. This is not a generic warehouse robotics solution adapted for CEP; it is CEP sortation automation engineered from the ground up.",
  "The modular warehouse automation approach means CEP hub operators can deploy UnboxSort within existing footprints — no civil works, no structural modification, no shutdown of live parcel operations. This is flexible automation for hub environments that cannot tolerate 12–18 month implementations. From contract to live operations typically takes 6-9 weeks.",
  "For CEP operators managing the warehouse labor shortage and e-commerce volume growth of 15–20% annually, UnboxSort delivers: a 40–60% reduction in hub sortation headcount, RCS-orchestrated swarm intelligence that self-heals at peak with no single point of failure, and warehouse automation ROI typically visible within 1-2 years — a reliable sortation solution for CEP hubs that performs consistently when it matters most.",
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
  { value: "5,000", label: "System Throughput (PPH)" },
  { value: "100%", label: "Sort Accuracy" },
  { value: "2x", label: "Productivity Gain" },
  { value: "35%", label: "Space Optimisation" },
  { value: "3-6 weeks", label: "Time to go live" },
  { value: "1-2 years", label: "Warehouse Automation ROI" },
];

const stakeholderImpactTabs = [
  {
    id: "operations",
    label: "Hub Operations Head",
    title: "Hub Operations Head",
    image: OperationHead,
    points: [
      "Achieve 99.99%+ accurate robotic sorting across 2,000+ last-mile destinations, zero mis-delivery SLA penalties.",
      "Scale parcel throughput from 500 to 20,000 per hour within the same deployment as e-commerce volumes grow.",
      "Sortation management software-integrated dashboard tracks hub automation ROI from day one.",
      "RCS-layer swarm intelligence self-heals in under 2 seconds no downtime at Black Friday sale, New Year's sale, or End of Season sale peaks.",
    ],
  },
  {
    id: "engineering",
    label: "Engineering & IE",
    title: "Engineering & IE",
    image: industryHeaderImg,
    points: [
      "Deploy within the existing CEP hub footprint, no civil works, no structural modification required.",
      "The modular UnboxSort fleet scales up or down without infrastructure changes, true flexible automation for CEP hub environments.",
      "System-agnostic API integration with your sortation management software, no IT dependency, no custom code required.",
      "Brownfield deployment in 6-9 weeks with live parcel operations continuing uninterrupted throughout installation.",
    ],
  },
  {
    id: "leadership",
    label: "CEO & Leadership",
    title: "CEO & Leadership",
    image: industryHeaderImg,
    points: [
      "Warehouse automation ROI achievable within 1 to 2 years, driven by reduced mis-delivery costs and labor savings.",
      "Reduce hub footprint by up to 50%, enabling CEP network expansion without the need for new hub facilities.",
      "Scalable warehouse robotics protects capital investment as e-commerce parcel volumes grow 15–20% annually.",
      "99.99%+ accurate robotic sorting eliminates mis-delivery penalties, protecting customer satisfaction and network reputation.",
    ],
  },
  {
    id: "warehouse",
    label: "Warehousing Manager",
    title: "Warehousing Manager",
    image: industryHeaderImg,
    points: [
      "Process inbound line-haul parcels automatically across 2,000+ last-mile routes no manual sortation errors.",
      "Reduce sortation headcount dramatically, resolving warehouse labor shortage across multi-shift hub operations.",
      "Reduced manual parcel handling on the hub floor lowers injury risk consistently across all shifts.",
      "Automated parcel sorting handles peak volume spikes without overtime, additional headcount or operational stoppage.",
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

const IndustryCEPPage = () => {
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

            <SchemaMarkup schema={industryCEPSchema} />
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
              <span className="!font-semibold">CEP Networks at Scale.</span>
            </motion.h1>
            <motion.p
              className="font-16-light color-grey-1 text-center max-w-[800px]"
              custom={1}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              UnboxSort delivers AI-powered warehouse sorting for CEP operators
              running high-velocity last-mile hubs with 99.99%+ sort accuracy
              across thousands of delivery routes, 50% less floor space, and
              warehouse automation payback in 1-2 years.
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
              A smarter architecture for automated parcel sorting in CEP hubs
            </motion.h1>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              UnboxSort autonomous robots operate across multiple vertical
              levels, coordinated by the RCS layer for fleet-level swarm
              intelligence managed by AI-powered sorting software that routes
              each parcel to its last-mile destination automatically, delivering
              a 3D robotic sortation system that scales from 500 to 20,000
              parcels per hour, self-heals at peak, and integrates with your
              existing sortation management software via standard API.
            </motion.p>
          </div>

          <motion.img
            src={SmarterArchImg}
            draggable={false}
            alt="UnboxSort smarter architecture for CEP sortation"
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
              Why CEP and parcel networks demand smarter automated parcel
              sorting
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              E-commerce parcel volumes growing 15–20% annually, rising
              last-mile costs, and the global warehouse labor shortage are
              pushing CEP hub operations beyond the capacity of manual sortation
              and legacy conveyor systems.
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
                How a Top European Parcel Carrier Scaled CEP Sortation Without
                Disrupting Live Operations
              </h2>
              <p className="font-20-light color-grey-1">
                Real deployment at European CEP & express logistics network. See
                how Unbox warehouse automation delivered measurable results
                within the existing hub footprint.
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
              &ldquo;Unbox gave us a reliable sorting solution that handles our
              full last-mile volume with 100% accuracy. The fleet self-heals
              automatically we have never had a sortation stoppage since
              deployment.&rdquo;
            </p>
            <p className="font-20-medium color-green-1">
              Head of Hub Operations
            </p>
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
              How UnboxSort Delivers Value Across Every Stakeholder in CEP
              Sortation
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              Whether you're driving operations, managing capital, or building
              scalable infrastructure Unbox delivers measurable results against
              what matters most to you.
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
              Why Unbox is the trusted robotic sortation system for CEP networks
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

      <Faq data={IndustryCEPFaqData?.slice(0, 7)} exploreBtnVisible={false} />

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

export default IndustryCEPPage;
