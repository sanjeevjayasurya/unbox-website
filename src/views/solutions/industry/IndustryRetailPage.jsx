"use client";

import React, { useState, useEffect } from "react";
import { animation } from "../../../helpers/utils";
import CommonButton from "../../../components/common/CommonButton";
import { useRouter } from "next/navigation";
import HelmetWrapper from "../../../components/common/HelmetWrapper";
import SchemaMarkup from "../../../components/common/SchemaMarkup";
import industryHeaderImg from "../assets/hero-img.webp";
import caseStudyVideo from "../assets/video/retail.mp4";
import OperationHead from "../assets/operation-head.webp";
import SmarterArchImg from "../assets/smart-arch.webp";
import "../index.css";
import { solutionIndustryFaqData } from "../../../helpers/config";
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
import { industryRetailSchema } from "../../../helpers/schemas";

const challengePoints = [
  "Wrong size, wrong store manual replenishment errors compound across every shift.",
  "Pillars and low ceilings make conventional sorting systems impossible to install.",
  "One team for sorting store replenishment, returns, and e-commerce after some time it breaks.",
  "Peak windows double the workload with no time or space to adapt.",
  "Scaling means expanding the facility, which is expensive, slow, and often not viable.",
  "A mis-sort doesn't show up in your data. It shows up as an empty shelf.",
];

const solutionPoints = [
  "Every item sorted to the right store and size in a single scan.",
  "Sorts upward to 2.4m and saves 50–70% of your floor, no construction needed.",
  "One system capable of running Store replenishment, returns, and e-commerce dispatch together.",
  "Add stores or size codes as destinations anytime; no downtime, no rebuild.",
  "99.99%+ sort accuracy. Fewer shelf gaps, fewer store complaints.",
  "Live in 6-9 weeks. Daily replenishment continues uninterrupted throughout.",
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
  { value: "4800+", label: "System throughput (PPH)" },
  { value: "100%", label: "Sort accuracy" },
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
    title: "Omnichannel sortation",
    desc: "A single system handles store replenishment, e-commerce dispatch, and returns processing with accurate robotic sorting across every channel.",
    icon: <SquareIcon />,
  },
  {
    title: "WMS integration in days",
    desc: "System agnostic software connects with your existing WMS via standard API - no custom code, no IT dependency, live from day one.",
    icon: <PuzzlePieceIcon />,
  },
  {
    title: "Thousands of  destinations",
    desc: "Massive sorting capacity fulfilling from a few hundreds to thousands of store codes, size codes and SKU variants in one automated parcel sorting run with minimal area requirement.",
    icon: <ExpandIcon />,
  },
  {
    title: "Peak season warehouse scalability",
    desc: "Scalable warehouse robotics handles end-of-season, festive, and sale spikes without additional headcount or operational disruption.",
    icon: <MonitorIcon />,
  },
  {
    title: "Warehouse safety automation",
    desc: "Once deployed, operates continuously with 24x7 uptime support, reducing manual handling on the sortation floor and minimising injury risk.",
    icon: <RoutingIcon />,
  },
];

const retailTrustParagraphs = [
  "As one of the fastest-growing robotic warehouse automation companies, Unbox Robotics has engineered its robotic sortation system specifically for SKU complexity, payload profiles and space constraints of retail, fashion and FMCG distribution. Unlike generic warehouse robotics solutions adapted from other verticals, the UnboxSort system handles parcels with dimensions up to 650×500×400mm and customizable payload configurations up to 20kg, sorting across 100 to 10,000+ destinations simultaneously.",
  "The modular architecture enables retail operators to deploy UnboxSort within existing footprints no civil works, no structural modifications, and no operational shutdown. This makes it a viable automation solution for warehouse environments that cannot accommodate 12–18 month implementation timelines.",
  "For retail distribution operators managing SKU complexity, omnichannel replenishment, and constrained DC footprints, UnboxSort delivers what conveyor systems cannot. A 40–60% reduction in sortation headcount, 99.99%+ accuracy across every store code and size variant, and automation ROI typically visible within 1–2 years with a modular architecture that grows as your retail network expands.",
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
  { value: "1200", label: "System Throughput (PPH)" },
  { value: "100%", label: "Sort Accuracy" },
  { value: "2x", label: "Productivity Gain" },
  { value: "1-2 Years", label: "Warehouse Automation ROI" },
  { value: "460", label: "Total Destinations" },
  { value: "20%", label: "Space Optimization" },
];

const stakeholderImpactTabs = [
  {
    id: "operations",
    label: "Operations Head",
    title: "Operations Head",
    image: OperationHead,
    points: [
      "Cut manual store replenishment steps in half, eliminate size and store code errors while minimizing labor overheads.",
      "Achieve consistent 1,200 PPH throughput across peak sale or BAU cycles, without reconfiguration or additional resources.",
      "WMS-integrated dashboard to track warehouse automation ROI from day one.",
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
      "Use a modular architecture to scale sortation capacity by adding robots and destinations incrementally.",
      "API-first software and standardized integration workflows simplify commissioning and reduce IT overhead.",
      "Improve process stability through automated load balancing and route-level flow control.",
    ],
  },
  {
    id: "leadership",
    label: "CEO & Leadership",
    title: "CEO & Leadership",
    image: industryHeaderImg,
    points: [
      "Accelerate ROI timelines with lower operating costs and higher throughput per square foot.",
      "Build a future-ready automation roadmap without lock-in to rigid conveyor or legacy robotics infrastructure.",
      "Reduce business risk through accurate sortation and resilient peak season performance.",
      "Scale omnichannel profitability with a modular warehouse automation strategy.",
    ],
  },
  {
    id: "warehouse",
    label: "Warehousing Manager",
    title: "Warehousing Manager",
    image: industryHeaderImg,
    points: [
      "Run daily operations with consistent sort accuracy across store, size, and SKU variations.",
      "Reduce manual handling pressure with safer, more predictable automated process flow.",
      "Get clear shift-level visibility on throughput, exceptions and destination status.",
      "Handle sale spikes without adding temporary complexity to core warehouse workflows.",
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

const IndustrySolutionsPage = () => {
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

            <SchemaMarkup schema={industryRetailSchema} />
{/* Hero */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <div
          className="technology-header">
          <div className="flex flex-col gap-[14px] md:gap-[20px] max-w-[828px]">
            <h1
              className="font-40-regular !font-extralight color-black-1 text-center">
              The Robotic Sortation for{" "}
              <span className="!font-semibold">Retail at Scale</span>
            </h1>
            <p
              className="font-16-light color-grey-1 text-center max-w-[800px]">
              Unbox delivers AI-powered items and packages sorting systems for
              retail distributors automating store replenishment and omnichannel
              fulfillment with scalable, high-performance automation.
            </p>

            <div
              className="flex flex-wrap gap-4 justify-center">
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
            </div>
          </div>

          {/* <img
            src={industryHeaderImg}
            alt="industry-header"
            className="industry-header-img"
            draggable={false}
          /> */}
        </div>
      </div>

      {/* Retail info cards */}
      {/* <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-retail-info-section">
          <div className="industry-retail-info-grid">
            {retailInfoCards.map((card, index) => (
              <article
                key={card.title}
                className="industry-retail-info-card"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                {card.icon}
                <div className="space-y-3">
                  <h3 className="font-20-medium !text-[18px] color-black-1">
                    {card.title}
                  </h3>
                  <p className="font-16-light color-black-1">{card.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div> */}

      {/* KPI cards */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-retail-kpi-section">
          <div className="industry-retail-kpi-grid">
            {retailKpiCards.map((item, index) => (
              <article
                key={item.label}
                className="industry-retail-kpi-card"
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}>
                <h3 className="text-[46px] max-md:text-[28px] font-semibold text-[#00A99D]">
                  {item.value}
                </h3>
                <p className="font-16-light color-black-1">{item.label}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Smarter architecture section */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <div
          className="technology-section-4">
          <div className="flex flex-col gap-[14px] md:gap-[20px]">
            <h1
              className="font-40-regular color-black-1 text-center">
              A smarter architecture for retail sortation and store
              replenishment
            </h1>
            <p
              className="font-16-light color-grey-1 text-center">
              UnboxSort robots sort across multiple vertical levels inside your
              existing DC footprint, handling store replenishment, size-code
              sorting, and returns processing simultaneously. The RCS layer
              orchestrates fleet-level coordination in real time, while
              AI-powered software maps every item to its store code or size
              destination in a single scan and eliminates the multi-step manual
              sortation process that slows retail replenishment cycles.
            </p>
          </div>

          <img
            src={SmarterArchImg}
            draggable={false}
            alt="UnboxSort smarter architecture for retail fulfilment"
            className="industry-smarter-img"
          />
        </div>
      </div>

      {/* Comparison section */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-comparison-section">
          <div
            className="industry-comparison-header">
            <h2
              className="font-40-regular color-black-1 text-center">
              Why retail distribution operations demand smarter warehouse
              automation
            </h2>
            <p
              className="font-16-light color-grey-1 text-center">
              {/* Growing omnichannel volumes, SKU proliferation, and the warehouse
              labour shortage are exposing the limits of manual store
              replenishment and fashion sortation especially in constrained
              facilities. */}
              Omnichannel retail is demanding store-level precision at
              e-commerce. SKU proliferation across size codes, store codes, and
              seasonal variants means a single DC now sorts for hundreds of
              destinations simultaneously while labor costs rise and peak
              windows shrink. Manual store replenishment cannot keep pace
              without error, and conventional conveyor automation was never
              designed for this level of destination complexity in constrained
              DC footprints.
            </p>
          </div>

          <div className="industry-comparison-grid">
            <h3
              className="font-16-semibold color-black-1">
              What holds retail DC operations back
            </h3>
            <h3
              className="font-16-semibold color-black-1">
              How Unbox solves it
            </h3>
            {challengePoints.map((item, index) => (
              <React.Fragment key={index}>
                <article
                  className="industry-comparison-item">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <span className="industry-comparison-dot industry-comparison-dot-left" />
                  </div>
                  <p className="font-16-light color-grey-1">{item}</p>
                </article>
                <article
                  className="industry-comparison-item bg-[#F8F8F8]">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <span className="industry-comparison-dot industry-comparison-dot-right" />
                  </div>
                  <p className="font-16-light color-black-1">{solutionPoints[index]}</p>
                </article>
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
              <article
                key={item.title}
                className="industry-capability-card"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                <div className="industry-capability-icon">{item.icon}</div>
                <div className="space-y-[10px]">
                  <h3 className="font-20-medium color-black-1">{item.title}</h3>
                  <p className="font-16-light color-black-1">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Market data */}
      {/* <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-market-data-section">
          <div className="industry-market-data-content">
            <h2
              className="font-40-regular color-black-1 text-center">
              Market data - warehouse automation industry
            </h2>
            <div className="industry-market-data-grid">
              {marketDataCards.map((item, index) => (
                <article
                  key={item.title}
                  className="industry-market-data-card">
                  <div className="industry-market-data-title-wrap">
                    <span className="industry-market-data-icon">
                      {item.icon}
                    </span>
                    <h3 className="font-20-regular color-black-1">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-16-light color-black-1">{item.desc}</p>
                </article>
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
            style={{ gridTemplateColumns: "minmax(0, 1fr)" }}>
            <div
              className="industry-case-study-content">
              <p className="font-20-medium color-green-1">Case Study</p>
              <h2 className="font-40-regular color-black-1">
                How a Global Fashion Retailer Sorted 460 Destinations at 1,200
                PPH Without Expanding Their Footprint
              </h2>
              <p className="font-20-light color-grey-1">
                A leading global fashion retailer needed to sort 460
                destinations at 1,200 parcels per hour without expanding their
                footprint. Operating a four-step manual sortation process across
                hundreds of store codes and size variants, constrained floor
                area and existing pillar placement ruled out every conventional
                automation option. With peak season and end-of-year sale putting
                mounting pressure on warehouse labor, Unbox Robotics delivered
                the answer inside a single 14 metre corridor.
              </p>
              <div>
                <CommonButton
                  theme={"green"}
                  title={"Read Full Case Study"}
                  onClick={() => router.push("/case-study")}
                />
              </div>
            </div>
            <div
              className="industry-case-study-image-wrap">
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
            </div>
          </div>

          <div className="industry-case-study-kpi-grid">
            {caseStudyKpis.map((item, index) => (
              <article
                key={item.label}
                className="industry-case-study-kpi-card">
                <h3 className="font-20-medium color-green-1">{item.value}</h3>
                <p className="font-20-regular color-black-1">{item.label}</p>
              </article>
            ))}
          </div>

          <div
            className="industry-case-study-quote">
            <p className="font-20-regular color-black-1">
              &ldquo;Unbox transformed our store replenishment process. From
              four manual steps to two automated ones with 100% sort accuracy
              across every store code, size and colour variant.&rdquo;
            </p>
            <p className="font-20-medium color-green-1">
              Head of Fulfillment Operations
            </p>
          </div>
        </section>
      </div>

      {/* Stakeholder impact */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-stakeholder-section">
          <div
            className="industry-stakeholder-header">
            <h2
              className="font-40-regular color-black-1 text-center">
              How UnboxSort Transforms Retail Warehouse Operations for Every
              Stakeholder
            </h2>
            <p
              className="font-16-light color-grey-1 text-center">
              {/* Whether you&apos;re driving operations, managing capital, or
              building scalable infrastructure Unbox delivers measurable results
              against what matters most to you. */}
              Whether you're driving operations, managing capital, or building
              scalable infrastructure, Unbox delivers measurable results against
              what matters most to you.
            </p>
          </div>

          <div className="industry-stakeholder-card">
            <div className="industry-stakeholder-tabs">
              {stakeholderImpactTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`industry-stakeholder-tab ${
                    activeStakeholderTab.id === tab.id ? "active" : ""
                  }`}
                  onClick={() => setActiveStakeholderTab(tab)}>
                  {tab.label}
                </button>
              ))}
            </div>

            
              <div
                key={activeStakeholderTab.id}
                className="industry-stakeholder-content">
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
              </div>
            
          </div>
        </section>
      </div>

      {/* Trust section */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-trust-section">
          <div className="industry-trust-content">
            <h2
              className="font-40-regular color-black-1 text-center">
              Why Unbox is the trusted robotic sortation system for retail
              distribution
            </h2>

            <div className="industry-trust-copy">
              {retailTrustParagraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className="font-16-light color-grey-1 text-center">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Faq
        data={solutionIndustryFaqData}
        exploreBtnVisible={false}
      />

      {/* CTA Section */}
      <div
        className="bg-[#141313] mb-10 py-12 md:py-20 px-5 md:px-15 flex flex-col gap-10 md:gap-[60px] items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-[14px]">
          <h1
            className="font-40-regular text-white text-center max-w-[858px]">
            Ready to transform your retail distribution with warehouse
            automation?
          </h1>
          <p
            className="font-16-light text-white text-center">
            Talk to our team and see how Unbox robotic sortation can be deployed
            within your existing retail DC footprint — with ROI in 6–9 months.
          </p>
        </div>
        <div
          className="flex flex-wrap gap-4 justify-center">
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
        </div>
      </div>
    </>
  );
};

export default IndustrySolutionsPage;
