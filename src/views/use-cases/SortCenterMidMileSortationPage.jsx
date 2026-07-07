"use client";

import React, { useEffect, useRef } from "react";
import { animation } from "../../helpers/utils";
import { motion, useScroll } from "framer-motion";
import CommonButton from "../../components/common/CommonButton";
import { useRouter } from "next/navigation";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import "../solutions/index.css";
import { MidMileSortationFaqData } from "../../helpers/config";
import Faq from "../../components/home/Faq";
import StickyScrollFill from "../../components/home/StickyScrollFill";

import RadarIcon from "../solutions/assets/radar.svg";
import RoutingIcon from "../solutions/assets/routing-2.svg";
import SquareIcon from "../solutions/assets/arrange-square-2.svg";
import MonitorIcon from "../solutions/assets/monitor.svg";
import ExpandIcon from "../solutions/assets/arrow-expand-04.svg";
import DeploymentIcon from "./assets/deployment.svg";
import FailureIcon from "./assets/failure.svg";
import ScalesIcon from "./assets/scales.svg";
import SpaceIcon from "./assets/space.svg";
import WmsIcon from "./assets/wms.svg";
import { useCaseMidMileSchema } from "../../helpers/schemas";

/* ── Data ─────────────────────────────────────────────────────────── */

const kpiCards = [
  { value: "20,000", label: "Parcels per hour max" },
  { value: "2,000+", label: "Sort destinations" },
  { value: "100%", label: "Sort accuracy" },
  { value: "3–6 wks", label: "Deployment timeline" },
];

const midMileSteps = [
  {
    step: "Step 1",
    title: "Line-Haul Inbound",
    desc: "Parcels arrive from origin hubs, inducted into UnboxSort system",
  },
  {
    step: "Step 2",
    title: "Destination Read",
    desc: "Barcode and label scan assigns destination hub, route or postal code",
  },
  {
    step: "Step 3",
    title: "Swarm Routing",
    desc: "SR450 robots dynamically route each parcel to correct destination cell",
  },
  {
    step: "Step 4",
    title: "Destination Staging",
    desc: "Parcels grouped by destination hub, route or pin code area",
  },
  {
    step: "Step 5",
    title: "Outbound Dispatch",
    desc: "Destination-sorted batches released to outbound carriers on schedule",
  },
];

const challengeTimeline = [
  {
    phase: "Fixed sorters limit network growth",
    color: "#E24B4A",
    bg: false,
    text: "Legacy conveyor sorters are locked to their installed destination configuration. Every new route or hub requires expensive re-engineering and network expansion is physically constrained.",
  },
  {
    phase: "Manual re-sorting causes backlogs",
    color: "#E65100",
    bg: false,
    text: "When destination patterns shift, manual teams re-sort parcels already in lane. Throughput drops. Backlogs cascade through the network. SLAs break downstream.",
  },
  {
    phase: "Single failures stop everything",
    color: "#F0A500",
    bg: false,
    text: "One belt motor, one conveyor jam, one scanner failure. The entire hub sort operation stops. Every downstream delivery is affected. Recovery takes hours.",
  },
  {
    phase: "With UnboxSort the hub scales with the network",
    color: "#079d92",
    bg: true,
    text: "Software-defined destinations. Swarm self-heals in 2 seconds. 2,000+ destinations. 20,000 pph. Network growth handled through dashboard with no hardware changes and no stoppage.",
  },
];

const capabilityCards = [
  {
    title: "Destination flexibility",
    desc: "Software-defined destination mapping so you can add new routes, hubs or pin codes without hardware changes. Network expansion enabled immediately.",
    icon: <RadarIcon />,
  },
  {
    title: "High-density sortation",
    desc: "2,000+ simultaneous destinations within a compact vertical footprint with more destinations per sqm than any conveyor-based system.",
    icon: <SquareIcon />,
  },
  {
    title: "Adaptive load management",
    desc: "Swarm algorithms balance parcel load dynamically across the robot fleet for stable throughput regardless of inbound volume spikes.",
    icon: <MonitorIcon />,
  },
  {
    title: "Self-healing fleet",
    desc: "If any robot goes offline, the fleet self-heals and reroutes in under 2 seconds. No hub stoppage. No single point of failure.",
    icon: <FailureIcon />,
  },
  {
    title: "Network scale readiness",
    desc: "Same UnboxSort deployment scales from current volume to 2x or 3x growth with no re-engineering required.",
    icon: <ScalesIcon />,
  },
  {
    title: "Real-time hub visibility",
    desc: "Live dashboard tracks destination fill rates, throughput and dispatch readiness so hub managers have full operational visibility.",
    icon: <RoutingIcon />,
  },
];

const icpProfiles = [
  {
    role: "Head of Hub Operations",
    company: "CEP Network & Express Logistics",
    pains: [
      "Managing high daily parcel volumes across hundreds of destinations",
      "Network expanding into new routes and regions",
      "Legacy sorters hitting throughput ceiling",
    ],
  },
  {
    role: "VP Network Operations",
    company: "National Postal & Parcel Network",
    pains: [
      "Running mid-mile hubs with shifting daily destination patterns",
      "Labour shortage impacting shift coverage",
      "Evaluating hub automation investment for network resilience",
    ],
  },
  {
    role: "Director of Automation",
    company: "3PL with Sort Hub Infrastructure",
    pains: [
      "Automating sort hub for multiple client networks",
      "Needs flexible destination mapping per client",
      "Evaluating lease vs CapEx automation options",
    ],
  },
];

const advantages = [
  {
    headline: "Software-defined destinations",
    proof: "Add, remove or remap routes via dashboard. No hardware changes, ever.",
    icon: <WmsIcon />,
  },
  {
    headline: "2,000+ simultaneous destinations",
    proof: "More destination density per sqm than any conveyor-based system.",
    icon: <ScalesIcon />,
  },
  {
    headline: "Self-healing swarm fleet",
    proof: "Reroutes in under 2 seconds. No hub stoppage. No single point of failure.",
    icon: <FailureIcon />,
  },
  {
    headline: "Adaptive load balancing",
    proof: "Distributes inbound volume dynamically. Stable throughput at any load.",
    icon: <RoutingIcon />,
  },
  {
    headline: "Scales with network growth",
    proof: "Same deployment handles 2–3x volume growth. No re-engineering.",
    icon: <ExpandIcon />,
  },
  {
    headline: "Compact hub footprint",
    proof: "Vertical 3D layout for high-density sortation within existing space.",
    icon: <SpaceIcon />,
  },
  {
    headline: "3–6 week deployment",
    proof: "Hub automation live without shutting down live sort operations.",
    icon: <DeploymentIcon />,
  },
  {
    headline: "Real-time hub visibility",
    proof: "Live fill rate, throughput and dispatch readiness always.",
    icon: <MonitorIcon />,
  },
];

/* ── Component ────────────────────────────────────────────────────── */

const SortCenterMidMileSortationPage = () => {
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
        title="Sort Center Mid-Mile Sortation — UnboxSort | Unbox Robotics"
        description="UnboxSort powers mid-mile sortation for sort centers and logistics hubs. Scalable high-density sortation for shifting destination patterns. 100% accuracy, deployed in weeks."
      />

            <SchemaMarkup schema={useCaseMidMileSchema} />
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
              Mid-Mile Sortation That{" "}
              <span className="!font-semibold">Scales With Your Network.</span>
            </motion.h1>
            <motion.p
              className="font-16-light color-grey-1 text-center max-w-[780px]"
              custom={1}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              UnboxSort enables scalable, high-density mid-mile sortation that
              adapts to shifting destination patterns and network expansion the
              backbone automation for modern logistics sort centers.
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
            alt="UnboxSort mid-mile sort center deployment high-density hub view"
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
              How UnboxSort Powers Mid-Mile Sortation
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              From line-haul inbound to destination-sorted outbound scalable
              hub sortation at every step.
            </motion.p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-3 items-stretch overflow-x-auto">
            {midMileSteps.map((item, index) => (
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
                {index < midMileSteps.length - 1 && (
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
              Why mid-mile sort centers need scalable automation
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              Mid-mile hubs handle massive daily volumes with constantly
              shifting destination patterns. Legacy systems cannot adapt
              creating bottlenecks at the core of the logistics network.
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
              Six capabilities for mid-mile sort center operations
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              UnboxSort is engineered for the destination density, volume
              variability and network growth demands of modern mid-mile sort
              centers.
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
              UnboxSort mid-mile sortation is built for the hubs and sort
              centers at the backbone of modern logistics and express delivery
              networks.
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
              Why Logistics Hub Operators Choose UnboxSort
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              Eight capabilities that make UnboxSort the most flexible and
              resilient mid-mile sortation system available.
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
            text={`UnboxSort is purpose-built for the destination density and volume variability of mid-mile logistics hubs and not a fulfilment centre system repurposed for hub operations.`}
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
              Questions about mid-mile sort center automation
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              What logistics and hub operations leaders ask when evaluating
              UnboxSort for mid-mile sortation.
            </motion.p>
          </motion.div>
        </section>
      </div>
      <Faq
        data={MidMileSortationFaqData.slice(0, 4)}
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
                UnboxSort: Scalable mid-mile sortation for modern logistics sort
                centers
              </h2>
              <p className="font-20-light color-black-1">
                <span className="!font-medium">
                  Mid-mile sortation automation
                </span>{" "}
                is the operational backbone of modern logistics networks.
                UnboxSort delivers high-density, software-defined sortation that
                adapts to network growth and shifting destination patterns
                without the capital cost and civil works of legacy conveyor
                systems. With 2,000+ simultaneous sort destinations and
                throughput from 500 to 20,000 parcels per hour, UnboxSort
                enables sort centers to scale their networks without scaling
                their infrastructure.
              </p>
              <p className="font-20-light color-black-1">
                As one of the leading{" "}
                <span className="!font-medium">warehouse automation companies</span>{" "}
                in India and Europe, Unbox Robotics has built UnboxSort
                specifically for the destination density and volume variability
                of mid-mile logistics hubs.{" "}
                <span className="!font-medium">Modular warehouse automation</span>{" "}
                deploys in 3–6 weeks within existing hub footprints with no
                civil works, no shutdown and operator-managed from day one.{" "}
                <span className="color-black-1 !font-medium">
                  Warehouse automation ROI
                </span>{" "}
                typically visible within 6–9 months.
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
            Ready to automate your mid-mile sort center?
          </motion.h2>
          <motion.p
            className="font-16-light text-white text-center"
            custom={1}
            variants={animation.fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            See how UnboxSort scales with your network with 2,000+ destinations,
            20,000 parcels per hour deployed in weeks.
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

export default SortCenterMidMileSortationPage;
