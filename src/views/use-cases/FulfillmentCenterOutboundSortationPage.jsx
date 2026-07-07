"use client";

import React, { useEffect, useRef } from "react";
import { animation } from "../../helpers/utils";
import { motion, useScroll } from "framer-motion";
import CommonButton from "../../components/common/CommonButton";
import { useRouter } from "next/navigation";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import "../solutions/index.css";
import { OutboundSortationFaqData } from "../../helpers/config";
import Faq from "../../components/home/Faq";
import StickyScrollFill from "../../components/home/StickyScrollFill";

import RadarIcon from "../solutions/assets/radar.svg";
import RoutingIcon from "../solutions/assets/routing-2.svg";
import MonitorIcon from "../solutions/assets/monitor.svg";
import PuzzlePieceIcon from "../solutions/assets/puzzle-piece.svg";
import DeploymentIcon from "./assets/deployment.svg";
import AccuracyIcon from "./assets/accuracy.svg";
import FailureIcon from "./assets/failure.svg";
import ScalesIcon from "./assets/scales.svg";
import WmsIcon from "./assets/wms.svg";
import OperatorIcon from "./assets/operator.svg";
import { useCaseOutboundSortationSchema } from "../../helpers/schemas";

/* ── Data ─────────────────────────────────────────────────────────── */

const kpiCards = [
  { value: "100%", label: "Outbound sort accuracy" },
  { value: "20,000", label: "Parcels per hour max" },
  { value: "Real-time", label: "Carrier plan adaptation" },
  { value: "3–6 wks", label: "Deployment timeline" },
];

const outboundSteps = [
  {
    step: "Step 1",
    title: "Parcel Induction",
    desc: "Packed parcel inducted into UnboxSort with carrier label scanned",
  },
  {
    step: "Step 2",
    title: "Carrier Assignment",
    desc: "Software reads dispatch plan and assigns parcel to carrier and route in real time",
  },
  {
    step: "Step 3",
    title: "Dynamic Routing",
    desc: "SR450 robots route to correct outbound lane or staging area",
  },
  {
    step: "Step 4",
    title: "Lane Staging",
    desc: "Parcels grouped by carrier, route or time window automatically",
  },
  {
    step: "Step 5",
    title: "On-Time Dispatch",
    desc: "Carrier-ready batches released on schedule with zero manual sorting",
  },
];

const challengeTimeline = [
  {
    phase: "Carrier plan changes cause chaos",
    color: "#E24B4A",
    bg: false,
    text: "A carrier plan changes mid-shift. Manual teams must re-sort hundreds of parcels already in lane. Dispatch windows are missed. SLA penalties follow.",
  },
  {
    phase: "Labour cost and risk grows",
    color: "#E65100",
    bg: false,
    text: "Multiple carrier lanes require large shift teams. Attrition at 35–40% annually means consistent re-training and coverage risk especially at early-morning dispatch windows.",
  },
  {
    phase: "Peak dispatch becomes highest operational risk",
    color: "#F0A500",
    bg: false,
    text: "End-of-day cutoffs, peak season, Black Friday. Fixed conveyor capacity creates bottlenecks. One mis-sort triggers expensive carrier re-routing and a customer complaint.",
  },
  {
    phase: "With UnboxSort outbound is always on time",
    color: "#079d92",
    bg: true,
    text: "Real-time carrier plan adaptation. 100% dispatch accuracy. 20,000 pph capacity at peak. Self-healing fleet with no stoppage risk. Dispatch managers work from data not crisis.",
  },
];

const capabilityCards = [
  {
    title: "Real-time carrier routing",
    desc: "Adapts to changing carrier plans, dispatch waves and route updates instantly with no manual system changes required.",
    icon: <RadarIcon />,
  },
  {
    title: "Multi-lane management",
    desc: "Manages simultaneous carrier lanes with independent fill rates with no cross-contamination between carriers or routes.",
    icon: <RoutingIcon />,
  },
  {
    title: "Peak dispatch readiness",
    desc: "Scales to 20,000 parcels per hour for peak dispatch windows with no seasonal headcount or infrastructure changes.",
    icon: <ScalesIcon />,
  },
  {
    title: "Zero single point of failure",
    desc: "Swarm self-heals in under 2 seconds. Dispatch operations continue uninterrupted even if individual robots go offline.",
    icon: <FailureIcon />,
  },
  {
    title: "SLA protection",
    desc: "100% sort accuracy eliminates mis-routed parcels and protects carrier SLAs and customer satisfaction simultaneously.",
    icon: <AccuracyIcon />,
  },
  {
    title: "WMS + TMS integration",
    desc: "Reads carrier plans directly from WMS and TMS via standard API with dispatch scheduling fully automated.",
    icon: <PuzzlePieceIcon />,
  },
];

const icpProfiles = [
  {
    role: "VP Operations / Director Logistics",
    company: "Large E-Commerce & D2C Fulfillment",
    pains: [
      "Responsible for on-time dispatch SLAs across multiple carriers",
      "Managing carrier relationship risks from mis-sorts",
      "Scaling outbound capacity for growth without adding headcount",
    ],
  },
  {
    role: "Head of Supply Chain",
    company: "3PL with Multi-Client Dispatch",
    pains: [
      "Running simultaneous outbound sortation for multiple clients",
      "Needs carrier-specific lane management",
      "Evaluating automation to win and retain 3PL contracts",
    ],
  },
  {
    role: "Operations Manager",
    company: "CEP Sort Hub & Last-Mile Operator",
    pains: [
      "Processing inbound line-haul and routing to last-mile carriers",
      "Constrained hub space",
      "Peak dispatch windows requiring maximum throughput",
    ],
  },
];

const advantages = [
  {
    headline: "Real-time carrier adaptation",
    proof: "Carrier plan changes update lane routing instantly. No manual reprogram.",
    icon: <MonitorIcon />,
  },
  {
    headline: "100% dispatch accuracy",
    proof: "Zero mis-routed parcels. Every carrier lane filled correctly, every time.",
    icon: <AccuracyIcon />,
  },
  {
    headline: "Multi-lane management",
    proof: "Simultaneous carrier lanes with independent fill rates. Zero cross-contamination.",
    icon: <RoutingIcon />,
  },
  {
    headline: "Self-healing at dispatch peak",
    proof: "Fleet reroutes in under 2 seconds. Dispatch never stops.",
    icon: <FailureIcon />,
  },
  {
    headline: "20,000 pph peak capacity",
    proof: "Same deployment handles BAU and peak. No seasonal infrastructure.",
    icon: <ScalesIcon />,
  },
  {
    headline: "WMS + TMS integration",
    proof: "Reads carrier plans direct from WMS and TMS via standard API.",
    icon: <WmsIcon />,
  },
  {
    headline: "3–6 week deployment",
    proof: "Live before your next peak. No civil works. No shutdown.",
    icon: <DeploymentIcon />,
  },
  {
    headline: "SLA protection built in",
    proof: "On-time rate improves from day one. Documented at every deployment.",
    icon: <OperatorIcon />,
  },
];

/* ── Component ────────────────────────────────────────────────────── */

const FulfillmentCenterOutboundSortationPage = () => {
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
        title="Fulfillment Center Outbound Sortation — UnboxSort | Unbox Robotics"
        description="UnboxSort automates outbound sortation for fulfillment centers. Route parcels by carrier, route and dispatch wave in real time. 100% accuracy, deployed in 3–6 weeks."
      />

            <SchemaMarkup schema={useCaseOutboundSortationSchema} />
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
              Outbound Sortation That{" "}
              <span className="!font-semibold">Adapts in Real Time.</span>
            </motion.h1>
            <motion.p
              className="font-16-light color-grey-1 text-center max-w-[780px]"
              custom={1}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              UnboxSort routes every outbound parcel by carrier, route or
              shipment group adapting continuously to changing dispatch waves
              without manual reprogram, delays or mis-routes.
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
            alt="UnboxSort outbound sortation carrier lane routing live view"
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
              How UnboxSort Powers Outbound Sortation
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              From packed parcel induction to carrier-ready dispatch lane
              automated, adaptive and always on time.
            </motion.p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-3 items-stretch overflow-x-auto">
            {outboundSteps.map((item, index) => (
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
                {index < outboundSteps.length - 1 && (
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
              Why manual outbound sortation creates dispatch risk
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              Outbound operations are time-critical. A mis-sorted parcel or a
              delayed lane means missed SLAs, carrier penalties and customer
              complaints that compound over time.
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
              Six capabilities that transform outbound sortation
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              UnboxSort is designed for the real-time, carrier-aligned demands
              of modern outbound fulfillment operations.
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
              UnboxSort outbound sortation is designed for operations leaders
              managing high-volume, time-critical dispatch across multiple
              carriers and routes.
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
              Why Outbound Operations Teams Choose UnboxSort
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              Eight capabilities that make UnboxSort the most reliable outbound
              sortation system available.
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
            text={`UnboxSort is purpose-built for the time critical carrier aligned demands of outbound fulfilment and not a picking system repurposed for sortation.`}
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
              Questions about outbound sortation automation
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              Answers operations leaders ask when evaluating UnboxSort for
              fulfillment center outbound operations.
            </motion.p>
          </motion.div>
        </section>
      </div>
      <Faq
        data={OutboundSortationFaqData.slice(0, 4)}
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
                UnboxSort: The flexible outbound sortation system for modern
                fulfillment centers
              </h2>
              <p className="font-20-light color-black-1">
                <span className="!font-medium">
                  Outbound sortation automation
                </span>{" "}
                is no longer a back-office function. It is a direct driver of
                carrier SLA performance and customer satisfaction. UnboxSort
                delivers real-time carrier routing, multi-lane management and
                peak dispatch readiness within a compact vertical footprint. As
                one of the leading{" "}
                <span className="!font-medium">warehouse automation companies</span>{" "}
                in India and Europe, Unbox Robotics has built outbound sortation
                capability that adapts continuously to changing dispatch plans
                eliminating the mis-sort risk that drives carrier penalties and
                customer complaints.
              </p>
              <p className="font-20-light color-black-1">
                Unlike fixed{" "}
                <span className="!font-medium">conveyor sortation systems</span>{" "}
                that require manual reprogramming for every carrier plan change,
                UnboxSort's{" "}
                <span className="!font-medium">modular warehouse automation</span>{" "}
                reads carrier data directly from WMS and TMS routing parcels to
                the correct outbound lane automatically. Deployed in 3–6 weeks,
                operator-managed from day one, with{" "}
                <span className="color-black-1 !font-medium">
                  warehouse automation ROI
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
            Ready to automate your outbound sortation?
          </motion.h2>
          <motion.p
            className="font-16-light text-white text-center"
            custom={1}
            variants={animation.fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            See how UnboxSort adapts to real-time carrier plans and delivers
            100% dispatch accuracy within your existing footprint.
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

export default FulfillmentCenterOutboundSortationPage;
