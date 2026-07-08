"use client";

import React, { useEffect, useRef } from "react";
import { animation } from "../../helpers/utils";
import CommonButton from "../../components/common/CommonButton";
import { useRouter } from "next/navigation";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import "../solutions/index.css";
import { DeliveryHubLastMileFaqData } from "../../helpers/config";
import Faq from "../../components/home/Faq";
import StickyScrollFill from "../../components/home/StickyScrollFill";

import RadarIcon from "../solutions/assets/radar.svg";
import RoutingIcon from "../solutions/assets/routing-2.svg";
import MonitorIcon from "../solutions/assets/monitor.svg";
import AccuracyIcon from "./assets/accuracy.svg";
import DeploymentIcon from "./assets/deployment.svg";
import FailureIcon from "./assets/failure.svg";
import OperatorIcon from "./assets/operator.svg";
import ScalesIcon from "./assets/scales.svg";
import SpaceIcon from "./assets/space.svg";
import WmsIcon from "./assets/wms.svg";
import { useCaseDeliveryHubSchema } from "../../helpers/schemas";

/* ── Data ─────────────────────────────────────────────────────────── */

const kpiCards = [
  { value: "100%", label: "Sort accuracy by route & pin code" },
  { value: "3× faster", label: "Morning dispatch readiness" },
  { value: "50%", label: "Hub floor space recovered" },
  { value: "3–6 wks", label: "Deployment timeline" },
];

const hubSteps = [
  {
    step: "Step 1",
    title: "Hub Induction",
    desc: "Parcels arrive from mid-mile, inducted into UnboxSort with delivery label scanned",
  },
  {
    step: "Step 2",
    title: "Route Assignment",
    desc: "Software assigns each parcel to route, driver and pin-code area in real time",
  },
  {
    step: "Step 3",
    title: "Swarm Sorting",
    desc: "SR450 robots route each parcel to correct route staging destination",
  },
  {
    step: "Step 4",
    title: "Driver Staging",
    desc: "Route-complete parcel batches staged per driver and vehicle load sequence",
  },
  {
    step: "Step 5",
    title: "Dispatch Release",
    desc: "Driver arrives, route is loaded and dispatch-ready with no morning sorting queue",
  },
];

const challengeTimeline = [
  {
    phase: "Morning queue delays first delivery",
    color: "#E24B4A",
    bg: false,
    text: "Manual sortation creates dispatch backlogs. Drivers arrive and wait. First delivery delayed by 30–60 minutes daily. SLA clock starts before a single parcel has moved.",
  },
  {
    phase: "Route errors cause failed deliveries",
    color: "#E65100",
    bg: false,
    text: "1–3% route-level mis-sorts mean wrong parcels reach wrong drivers. Failed first attempts cost 3–5× the initial delivery cost. Customer experience breaks at the last step.",
  },
  {
    phase: "Parcel volume growth breaks the hub",
    color: "#F0A500",
    bg: false,
    text: "E-commerce parcel volumes grow 15–20% annually. Manual hub capacity hits its ceiling. The hub cannot process inbound fast enough. Expansion requires a new site.",
  },
  {
    phase: "With UnboxSort drivers leave on time every day",
    color: "#079d92",
    bg: true,
    text: "Route-sorted parcels ready before driver arrival. Zero morning queue. 100% route accuracy. 20,000 pph capacity. Same deployment grows with parcel volume annually.",
  },
];

const capabilityCards = [
  {
    title: "Route-level sort precision",
    desc: "Sorts every parcel to its exact route and pin-code destination with 100% accuracy across all delivery sequences simultaneously.",
    icon: <RadarIcon />,
  },
  {
    title: "Driver-aligned staging",
    desc: "Parcels staged per driver and vehicle load sequence so drivers arrive to a ready load with no sorting queue.",
    icon: <RoutingIcon />,
  },
  {
    title: "Compact hub footprint",
    desc: "Vertical 3D recovers 50–70% of hub floor leaving more space for vehicle staging, induction and handling.",
    icon: <SpaceIcon />,
  },
  {
    title: "Overnight pre-sort capability",
    desc: "Runs overnight inbound sortation so morning dispatch begins immediately with driver productivity maximised from first run.",
    icon: <MonitorIcon />,
  },
  {
    title: "Parcel volume scalability",
    desc: "Scales from 500 to 20,000 parcels per hub shift and handles 15–20% annual parcel volume growth within same deployment.",
    icon: <ScalesIcon />,
  },
  {
    title: "Real-time dispatch dashboard",
    desc: "Live route completion status so dispatch supervisors see which routes are ready before shift start every day.",
    icon: <WmsIcon />,
  },
];

const icpProfiles = [
  {
    role: "Head of Last-Mile Operations",
    company: "CEP & Express Delivery Network",
    pains: [
      "Managing urban hub morning dispatch across multiple routes",
      "Driver idle time from morning sorting queue",
      "Labour shortage affecting early-morning shift staffing",
    ],
  },
  {
    role: "VP Hub Operations",
    company: "National E-Commerce Delivery Network",
    pains: [
      "Processing surging e-commerce parcel volumes at urban hubs",
      "Hub footprint too constrained for conveyor expansion",
      "Morning dispatch window too short for manual sort volume",
    ],
  },
  {
    role: "Director of Urban Logistics",
    company: "3PL with Last-Mile Delivery Contracts",
    pains: [
      "Running last-mile delivery for multiple e-commerce clients",
      "Route-level accuracy tied to client SLAs",
      "Evaluating hub automation to win new last-mile contracts",
    ],
  },
];

const advantages = [
  {
    headline: "Route & pin-code accuracy",
    proof: "Every parcel to exact route and delivery sequence. 100% zero misroutes.",
    icon: <AccuracyIcon />,
  },
  {
    headline: "Pre-sort before drivers arrive",
    proof: "Overnight inbound sort means zero morning queue. Drivers load and go.",
    icon: <MonitorIcon width={24} height={24}/>,
  },
  {
    headline: "Urban hub footprint fit",
    proof: "Vertical 3D within constrained urban buildings. No civil works.",
    icon: <SpaceIcon />,
  },
  {
    headline: "20,000 pph hub capacity",
    proof: "Grows with 15–20% annual parcel volume. Same deployment forever.",
    icon: <ScalesIcon />,
  },
  {
    headline: "Self-healing no stoppages",
    proof: "Fleet reroutes in 2 seconds. Hub operations never stop.",
    icon: <FailureIcon />,
  },
  {
    headline: "40–60% labour reduction",
    proof: "Early-morning sortation headcount dramatically reduced.",
    icon: <OperatorIcon />,
  },
  {
    headline: "3–6 week deployment",
    proof: "Live before next peak. No hub shutdown during installation.",
    icon: <DeploymentIcon />,
  },
  {
    headline: "Real-time dispatch intelligence",
    proof: "Live route completion before shift start. Data-driven dispatch.",
    icon: <WmsIcon />,
  },
];

/* ── Component ────────────────────────────────────────────────────── */

const DeliveryHubLastMileSortationPage = () => {
  const router = useRouter();
  const challengeRef = useRef(null);
  const challengeProgress = 1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HelmetWrapper
        title="Delivery Hub Last-Mile Sortation — UnboxSort | Unbox Robotics"
        description="UnboxSort powers last-mile sortation for urban delivery hubs. Route and pin-code level sortation in constrained spaces. Faster dispatch readiness. 100% accuracy. Deployed in weeks."
      />

            <SchemaMarkup schema={useCaseDeliveryHubSchema} />
{/* ── Hero ── */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <div
          className="technology-header">
          <div className="flex flex-col gap-[14px] md:gap-[20px] max-w-[828px]">
            <h1
              className="font-40-regular !font-extralight color-black-1 text-center">
              Last-Mile Dispatch{" "}
              <span className="!font-semibold">Ready Before the Driver.</span>
            </h1>
            <p
              className="font-16-light color-grey-1 text-center max-w-[780px]">
              UnboxSort enables route and pin-code level last-mile sortation
              within constrained urban delivery hubs for faster morning dispatch
              readiness, improved delivery workforce productivity, and 100% sort
              accuracy at high volumes.
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
            alt="UnboxSort last-mile hub sortation route and pin-code level dispatch view"
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
              How UnboxSort Powers Last-Mile Sortation
            </h2>
            <p
              className="font-16-light color-grey-1 text-center">
              From hub inbound parcel to route-sorted dispatch-ready staging
              automated last-mile sortation for every delivery run.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 items-stretch overflow-x-auto">
            {hubSteps.map((item, index) => (
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
                {index < hubSteps.length - 1 && (
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
              Why urban last-mile hubs need smarter sortation
            </h2>
            <p
              className="font-16-light color-grey-1 text-center">
              Urban delivery hubs operate in constrained spaces under intense
              time pressure. Morning sortation backlogs define delivery
              performance for the entire day and every day it compounds.
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
              Six capabilities for last-mile delivery hub operations
            </h2>
            <p
              className="font-16-light color-grey-1 text-center">
              UnboxSort is engineered for the route precision, space constraints
              and speed demands of urban last-mile delivery hubs.
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
              UnboxSort last-mile sortation is built for the delivery hubs, PUDO
              networks and last-mile logistics operators at the edge of the
              delivery network.
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
              Why Last-Mile Hub Operators Choose UnboxSort
            </h2>
            <p
              className="font-16-light color-grey-1 text-center">
              Eight capabilities that make UnboxSort the most efficient and
              accurate last-mile hub sortation system available.
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
            text={`UnboxSort is purpose-built for the constrained footprints and route-level precision of urban last-mile delivery hubs and not a fulfilment centre system scaled down for hub operations.`}
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
              Questions about last-mile hub sortation automation
            </h2>
            <p
              className="font-16-light color-grey-1 text-center">
              What hub and last-mile operations leaders ask when evaluating
              UnboxSort for urban delivery hub sortation.
            </p>
          </div>
        </section>
      </div>
      <Faq
        data={DeliveryHubLastMileFaqData.slice(0, 4)}
        exploreBtnVisible={false}
      />

      {/* ── SEO / Trust block ── */}
      <div className="bg-[#FDFDFD] overflow-hidden">
        <section className="industry-trust-section">
          <div className="industry-trust-content">
            <div
              className="bg-[#F8F8F8] rounded-[20px] p-6 md:p-9 flex flex-col gap-5">
              <h2 className="font-40-regular color-black-1 !text-[26px]">
                UnboxSort: Last-mile hub sortation for modern urban delivery
                networks
              </h2>
              <p className="font-20-light color-black-1">
                <span className="!font-medium">
                  Last-mile sortation automation
                </span>{" "}
                is the final operational challenge in the logistics chain and the
                one most directly impacting driver productivity, SLA performance
                and customer experience. UnboxSort delivers route and pin-code
                level sortation within constrained urban delivery hub footprints
                enabling faster morning dispatch, 100% route accuracy, and
                delivery workforce productivity gains that translate directly to
                improved first-attempt delivery rates.
              </p>
              <p className="font-20-light color-black-1">
                As one of the leading{" "}
                <span className="!font-medium">warehouse automation companies</span>{" "}
                in India and Europe, Unbox Robotics has built UnboxSort for the
                space constraints, time pressure and volume growth of urban
                last-mile hubs.{" "}
                <span className="!font-medium">Modular warehouse automation</span>{" "}
                deploys in 3–6 weeks with no civil works, no shutdown, and
                operator-level maintenance from day one. With e-commerce parcel
                volumes growing 15–20% annually, last-mile hub automation is no
                longer optional — it is the defining operational investment for
                CEP networks and delivery operators in 2026 and beyond.
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
            Ready to automate your last-mile hub sortation?
          </h2>
          <p
            className="font-16-light text-white text-center">
            See how UnboxSort delivers route-sorted dispatch readiness before
            your drivers arrive within your existing hub footprint.
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

export default DeliveryHubLastMileSortationPage;
