"use client";

import React, { useEffect, useRef } from "react";
import { animation } from "../../helpers/utils";
import CommonButton from "../../components/common/CommonButton";
import { useRouter } from "next/navigation";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import "../solutions/index.css";
import { B2BStoreFulfillmentFaqData } from "../../helpers/config";
import Faq from "../../components/home/Faq";
import StickyScrollFill from "../../components/home/StickyScrollFill";

import RadarIcon from "../solutions/assets/radar.svg";
import RoutingIcon from "../solutions/assets/routing-2.svg";
import MonitorIcon from "../solutions/assets/monitor.svg";
import ExpandIcon from "../solutions/assets/arrow-expand-04.svg";
import AccuracyIcon from "./assets/accuracy.svg";
import DeploymentIcon from "./assets/deployment.svg";
import ScalesIcon from "./assets/scales.svg";
import SpaceIcon from "./assets/space.svg";
import WmsIcon from "./assets/wms.svg";
import { useCaseB2BSchema } from "../../helpers/schemas";

/* ── Data ─────────────────────────────────────────────────────────── */

const kpiCards = [
  { value: "100%", label: "Store-wise accuracy" },
  { value: "2,000+", label: "Store destinations" },
  { value: "50%", label: "Reduction in replenishment errors" },
  { value: "3–6 wks", label: "Deployment timeline" },
];

const storeSteps = [
  {
    step: "Step 1",
    title: "Store Order Receipt",
    desc: "B2B store orders received, store code and replenishment schedule identified",
  },
  {
    step: "Step 2",
    title: "Wave Grouping",
    desc: "Orders grouped by store, route and delivery window with no manual planning required",
  },
  {
    step: "Step 3",
    title: "Item Sortation",
    desc: "SR450 robots consolidate all items for each store order to dedicated destination",
  },
  {
    step: "Step 4",
    title: "Route Staging",
    desc: "Store-wise consolidated orders staged by delivery route or vehicle",
  },
  {
    step: "Step 5",
    title: "On-Schedule Dispatch",
    desc: "Route-sorted store replenishment dispatched on schedule with zero manual sortation",
  },
];

const challengeTimeline = [
  {
    phase: "Store errors cause stockouts",
    color: "#E24B4A",
    bg: false,
    text: "Store-wise consolidation errors send wrong items to wrong stores. Stockouts hit store shelves. Customer availability fails. Buyer relationships are damaged at the store level.",
  },
  {
    phase: "Delivery schedule pressure compounds",
    color: "#E65100",
    bg: false,
    text: "Large replenishment teams required across multiple DC shifts. Delivery schedule pressure means throughput must be consistent but manual teams create variability every single cycle.",
  },
  {
    phase: "Network growth creates capacity crisis",
    color: "#F0A500",
    bg: false,
    text: "As the retail network expands to 200, 500, 1,000 stores, the complexity of manual store-wise sortation grows exponentially. Space constraints prevent adding new conveyor lanes.",
  },
  {
    phase: "With UnboxSort every store gets the right order on time",
    color: "#079d92",
    bg: true,
    text: "100% store-wise accuracy. Route-aligned wave planning. 2,000+ store destinations via software. Team reduced by 40–60%. Network expansion via dashboard with no hardware.",
  },
];

const capabilityCards = [
  {
    title: "Store-wise consolidation",
    desc: "Groups every item to its exact store destination across 2,000+ store codes with 100% accuracy regardless of SKU complexity or order volume.",
    icon: <RadarIcon />,
  },
  {
    title: "Route-aligned staging",
    desc: "Consolidated store orders staged by delivery route and vehicle so driver dispatch aligns to replenishment schedule automatically.",
    icon: <RoutingIcon />,
  },
  {
    title: "Schedule-driven waves",
    desc: "Wave planning driven by delivery schedule and store replenishment frequency with no manual planning intervention.",
    icon: <MonitorIcon />,
  },
  {
    title: "SKU variant handling",
    desc: "Handles size, colour and variant sorting per store planogram requirement for fashion and FMCG replenishment at scale.",
    icon: <AccuracyIcon />,
  },
  {
    title: "Retail network scalability",
    desc: "Same UnboxSort deployment scales as the retail network grows from 100 stores today to 2,000 tomorrow with no hardware changes.",
    icon: <ExpandIcon />,
  },
  {
    title: "Replenishment visibility",
    desc: "Real-time dashboard shows store order consolidation status, route readiness and dispatch schedule for full replenishment visibility.",
    icon: <WmsIcon />,
  },
];

const icpProfiles = [
  {
    role: "Head of Retail Supply Chain",
    company: "Fashion, Lifestyle & Apparel Retailer",
    pains: [
      "Managing store replenishment across 200–2,000 stores",
      "SKU complexity and size variants creating sortation errors",
      "Needs reliable replenishment cycles for store availability",
    ],
  },
  {
    role: "VP Distribution",
    company: "FMCG & Consumer Goods Manufacturer",
    pains: [
      "Running route-aligned store delivery from central DC",
      "Delivery schedule pressure requiring consistent throughput",
      "Evaluating replenishment automation for DC modernisation",
    ],
  },
  {
    role: "Head of Fulfillment",
    company: "3PL with Retail Distribution Contracts",
    pains: [
      "Fulfilling B2B store orders for multiple retail clients",
      "Store-wise segregation critical",
      "Replenishment accuracy tied to client contract SLAs",
    ],
  },
];

const advantages = [
  {
    headline: "100% store-wise accuracy",
    proof: "Every item consolidated to its exact store code. Zero replenishment errors.",
    icon: <AccuracyIcon />,
  },
  {
    headline: "2,000+ store destinations",
    proof: "Entire retail network within one compact vertical deployment.",
    icon: <ScalesIcon />,
  },
  {
    headline: "Route-aligned wave planning",
    proof: "Delivery routes and windows drive wave planning automatically.",
    icon: <RoutingIcon />,
  },
  {
    headline: "SKU variant handling",
    proof: "Size, colour and variant sortation per store planogram. Fashion at scale.",
    icon: <RadarIcon />,
  },
  {
    headline: "Software-defined expansion",
    proof: "New stores added via dashboard. No hardware changes, instant.",
    icon: <ExpandIcon />,
  },
  {
    headline: "Real-time replenishment visibility",
    proof: "Live store order status and route readiness for dispatch teams.",
    icon: <MonitorIcon />,
  },
  {
    headline: "50–70% less DC footprint",
    proof: "Same throughput in half the floor. No new facility required.",
    icon: <SpaceIcon />,
  },
  {
    headline: "3–6 week deployment",
    proof: "Replenishment automation live quickly. No DC shutdown.",
    icon: <DeploymentIcon />,
  },
];

/* ── Component ────────────────────────────────────────────────────── */

const B2BStoreOrderFulfillmentPage = () => {
  const router = useRouter();
  const challengeRef = useRef(null);
  const challengeProgress = 1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HelmetWrapper
        title="B2B Store Order Fulfillment — UnboxSort | Unbox Robotics"
        description="UnboxSort automates B2B store order fulfillment. Store-wise order consolidation for retail and wholesale replenishment. 100% accuracy, reliable replenishment cycles, deployed in weeks."
      />

            <SchemaMarkup schema={useCaseB2BSchema} />
{/* ── Hero ── */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <div
          className="technology-header">
          <div className="flex flex-col gap-[14px] md:gap-[20px] max-w-[828px]">
            <h1
              className="font-40-regular !font-extralight color-black-1 text-center">
              Store Replenishment{" "}
              <span className="!font-semibold">On Time, Every Time.</span>
            </h1>
            <p
              className="font-16-light color-grey-1 text-center max-w-[780px]">
              UnboxSort automates B2B store order fulfillment consolidating
              parcels and cartons by store, route and delivery schedule with
              100% accuracy and reliable replenishment cycles at scale.
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
                title={"Download Use Case"}
                onClick={() => router.push("/get-in-touch")}
              />
            </div>
          </div>
          {/*
          <img
            src={SmarterArchImg}
            draggable={false}
            alt="UnboxSort B2B store order fulfillment store-wise consolidation flow"
            className="industry-smarter-img"
          /> */}
        </div>
      </div>

      {/* ── KPI cards ── */}
      {/* <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-retail-kpi-section">
          <div className="industry-retail-kpi-grid">
            {kpiCards.map((item, index) => (
              <article
                key={item.label}
                className="industry-retail-kpi-card">
                <h3 className="text-[46px] max-md:text-[28px] font-semibold text-[#00A99D]">
                  {item.value}
                </h3>
                <p className="font-16-light color-black-1">{item.label}</p>
              </article>
            ))}
          </div>
        </section>
      </div> */}

      {/* ── How UnboxSort Works — 5-step flow ── */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-capability-section">
          <div
            className="flex flex-col gap-[14px] md:gap-[20px] max-w-[800px] mx-auto mb-[40px] md:mb-[60px]">
            <h2
              className="font-40-regular color-black-1 text-center">
              How UnboxSort Powers B2B Store Fulfillment
            </h2>
            <p
              className="font-16-light color-grey-1 text-center">
              From store order receipt to route-aligned dispatch fully automated
              store-wise consolidation at scale.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 items-stretch overflow-x-auto">
            {storeSteps.map((item, index) => (
              <React.Fragment key={item.step}>
                <article
                  className="industry-capability-card flex-1 min-w-[160px]">
                  <p className="font-16-light color-green-1 !text-[11px] !font-semibold uppercase tracking-wider">
                    {item.step}
                  </p>
                  <div className="space-y-[8px]">
                    <h3 className="font-20-medium color-black-1">
                      {item.title}
                    </h3>
                    <p className="font-16-light color-grey-1">{item.desc}</p>
                  </div>
                </article>
                {index < storeSteps.length - 1 && (
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
          <div
            className="flex flex-col gap-[14px] md:gap-[20px] max-w-[800px] mx-auto mb-[40px] md:mb-[60px]">
            <h2
              className="font-40-regular color-black-1 text-center">
              Why B2B store fulfillment demands precise automation
            </h2>
            <p
              className="font-16-light color-grey-1 text-center">
              Retail and wholesale store replenishment requires store-wise
              precision across hundreds of codes, routes and schedules. Manual
              fulfillment errors disrupt store operations and customer
              availability directly.
            </p>
          </div>

          <div ref={challengeRef} className="relative">
            {/* Track line — background */}
            <div className="absolute left-[12px] md:left-[24px] top-0 bottom-0 w-[2px] md:w-[3px] bg-[#E0E0E0]" />
            {/* Track line — scroll fill */}
            <div
              className="absolute left-[12px] md:left-[24px] top-0 w-[2px] md:w-[3px] bg-[#079d92] origin-top"
              style={{ scaleY: challengeProgress, height: "100%" }}
            />

            <div className="flex flex-col gap-4 md:gap-6">
              {challengeTimeline.map((item, index) => (
                <div
                  key={item.phase}
                  className="relative flex items-start pl-8 md:pl-16">
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
                    }}>
                    {/* Phase pill */}
                    <span
                      className="w-fit px-[8px] md:px-[10px] py-[3px] md:py-[4px] rounded-full text-[11px] md:text-[12px] font-semibold uppercase tracking-wider"
                      style={{
                        background: `${item.color}18`,
                        color: item.color,
                      }}>
                      {item.phase}
                    </span>

                    {/* Description */}
                    <p className="font-16-light leading-relaxed color-black-1">
                      {item.text}
                    </p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── What UnboxSort Enables — 6 capability cards ── */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-capability-section">
          <div
            className="flex flex-col gap-[14px] md:gap-[20px] max-w-[800px] mx-auto mb-[40px] md:mb-[60px]">
            <h2
              className="font-40-regular color-black-1 text-center">
              Six capabilities for B2B store fulfillment
            </h2>
            <p
              className="font-16-light color-grey-1 text-center">
              UnboxSort delivers the store-wise precision and route-aligned
              accuracy that retail and wholesale replenishment networks demand.
            </p>
          </div>

          <div className="industry-capability-grid">
            {capabilityCards.map((item, index) => (
              <article
                key={item.title}
                className="industry-capability-card">
                <div className="industry-capability-icon" style={{ color: "#06B1A4" }}>{item.icon}</div>
                <div className="space-y-[10px]">
                  <h3 className="font-20-medium color-black-1">{item.title}</h3>
                  <p className="font-16-light color-black-1">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* ── Who This Is Built For — ICP cards ── */}
      {/* <div className="bg-[#F8F8F8] overflow-hidden">
        <section className="industry-stakeholder-section">
          <div
            className="industry-stakeholder-header">
            <h2
              className="font-40-regular color-black-1 text-center">
              Ideal Customer Profile
            </h2>
            <p
              className="font-16-light color-grey-1 text-center">
              UnboxSort B2B store fulfillment is built for retailers, wholesalers
              and 3PLs managing large-scale store replenishment networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {icpProfiles.map((profile, index) => (
              <article
                key={profile.role}
                className="bg-white rounded-[12px] p-5 flex flex-col gap-3"
                style={{
                  border: "1px solid #E0E0E0",
                  borderTop: "3px solid #079d92",
                }}>
                <p className="font-20-medium color-black-1">{profile.role}</p>
                <p className="font-16-light color-green-1">{profile.company}</p>
                <ul className="flex flex-col gap-[6px] ml-4 list-disc">
                  {profile.pains.map((pain) => (
                    <li key={pain} className="font-16-light color-black-1">
                      {pain}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div> */}

      {/* ── Why Operators Choose UnboxSort — 8 advantages ── */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-stakeholder-section">
          <div
            className="industry-stakeholder-header">
            <h2
              className="font-40-regular color-black-1 text-center">
              Why Retail Supply Chains Choose UnboxSort for Store Replenishment
            </h2>
            <p
              className="font-16-light color-grey-1 text-center">
              Eight capabilities that make UnboxSort the most accurate and
              scalable B2B store fulfillment system available.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {advantages.map((item, index) => (
              <article
                key={item.headline}
                className="bg-white border border-[#E0E0E0] rounded-[12px] p-5 text-center flex flex-col items-center gap-3">
                <div
                  className="use-case-adv-icon w-[44px] h-[44px] rounded-[12px] bg-[#E8F5F4] flex items-center justify-center flex-shrink-0"
                  style={{ color: "#079d92" }}>
                  {item.icon}
                </div>
                <h3 className="font-16-medium color-black-1">
                  {item.headline}
                </h3>
                <p className="font-16-light color-black-1">{item.proof}</p>
              </article>
            ))}
          </div>

          {/* Closer — StickyScrollFill */}
          <StickyScrollFill
            text={`UnboxSort is the only robotic sortation system with route, aligned wave planning built natively for B2B store replenishment and not a CEP system adapted for retail distribution.`}
          />
        </section>
      </div>

      {/* ── FAQ ── */}
      <div className="bg-[#F8F8F8] overflow-hidden">
        <section className="industry-stakeholder-section">
          <div
            className="industry-stakeholder-header">
            <h2
              className="font-40-regular color-black-1 text-center">
              Questions about B2B store fulfillment automation
            </h2>
            <p
              className="font-16-light color-grey-1 text-center">
              What supply chain and operations leaders ask when evaluating
              UnboxSort for retail store replenishment.
            </p>
          </div>
        </section>
      </div>
      <Faq
        data={B2BStoreFulfillmentFaqData.slice(0, 4)}
        exploreBtnVisible={false}
      />

      {/* ── SEO / Trust block ── */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-trust-section">
          <div className="industry-trust-content">
            <div
              className="bg-[#F8F8F8] rounded-[20px] p-6 md:p-9 flex flex-col gap-5">
              <h2 className="font-40-regular color-black-1 !text-[26px]">
                UnboxSort: Automated B2B store fulfillment for retail and
                wholesale distribution
              </h2>
              <p className="font-20-light color-black-1">
                <span className="!font-medium">
                  B2B store fulfillment automation
                </span>{" "}
                is essential for retailers and wholesalers managing large-scale
                store replenishment networks. UnboxSort delivers 100% store-wise
                accuracy across 2,000+ store codes routing parcels and cartons
                by store, delivery route and replenishment schedule
                automatically. Unlike generic{" "}
                <span className="!font-medium">warehouse automation</span>{" "}
                systems, UnboxSort includes route-aligned wave planning built
                specifically for the delivery schedule demands of retail and
                wholesale replenishment operations.
              </p>
              <p className="font-20-light color-black-1">
                Deployed in 3–6 weeks within existing distribution center
                footprints, UnboxSort reduces replenishment errors to zero,
                eliminates manual store sortation labour, and provides real-time
                replenishment readiness visibility across the supply chain.{" "}
                <span className="!font-medium">Warehouse automation ROI</span>{" "}
                typically visible within 6–9 months. As one of the leading{" "}
                <span className="!font-medium">warehouse automation companies</span>{" "}
                in India and Europe, Unbox Robotics has built UnboxSort for the
                store-wise precision that retail supply chains demand.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ── CTA ── */}
      <div
        className="bg-[#141313] mb-10 py-12 md:py-20 px-5 md:px-15 flex flex-col gap-10 md:gap-[60px] items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-[14px]">
          <h2
            className="font-40-regular text-white text-center max-w-[858px]">
            Ready to automate your B2B store fulfillment?
          </h2>
          <p
            className="font-16-light text-white text-center">
            See how UnboxSort delivers 100% store-wise accuracy across your full
            retail network deployed in 3–6 weeks.
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
            title={"Download Use Case"}
            onClick={() => router.push("/get-in-touch")}
          />
        </div>
      </div>
    </>
  );
};

export default B2BStoreOrderFulfillmentPage;
