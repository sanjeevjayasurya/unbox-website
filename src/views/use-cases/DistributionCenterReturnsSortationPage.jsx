"use client";

import React, { useEffect, useRef } from "react";
import { animation } from "../../helpers/utils";
import { motion, useScroll } from "framer-motion";
import CommonButton from "../../components/common/CommonButton";
import { useRouter } from "next/navigation";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import "../solutions/index.css";
import { ReturnsSortationFaqData } from "../../helpers/config";
import Faq from "../../components/home/Faq";
import StickyScrollFill from "../../components/home/StickyScrollFill";

import RadarIcon from "../solutions/assets/radar.svg";
import RoutingIcon from "../solutions/assets/routing-2.svg";
import MonitorIcon from "../solutions/assets/monitor.svg";
import PuzzlePieceIcon from "../solutions/assets/puzzle-piece.svg";
import AccuracyIcon from "./assets/accuracy.svg";
import DeploymentIcon from "./assets/deployment.svg";
import ScalesIcon from "./assets/scales.svg";
import WmsIcon from "./assets/wms.svg";
import OperatorIcon from "./assets/operator.svg";
import { useCaseReturnsSortationSchema } from "../../helpers/schemas";

/* ── Data ─────────────────────────────────────────────────────────── */

const kpiCards = [
  { value: "100%", label: "Returns classification accuracy" },
  { value: "35%+", label: "E-commerce return volumes growing annually" },
  { value: "50%", label: "Faster returns processing vs manual" },
  { value: "3–6 wks", label: "Deployment timeline" },
];

const returnsSteps = [
  {
    step: "Step 1",
    title: "Returns Induction",
    desc: "Returned parcel inducted with original order ID and return reason code",
  },
  {
    step: "Step 2",
    title: "Condition Assessment",
    desc: "Returns associate performs condition check with result logged in system",
  },
  {
    step: "Step 3",
    title: "Rule Assignment",
    desc: "UnboxSort software applies disposition rule: restock, inspect, quarantine or redistribute",
  },
  {
    step: "Step 4",
    title: "Automated Routing",
    desc: "SR450 robots route each return to correct disposition destination",
  },
  {
    step: "Step 5",
    title: "Downstream Processing",
    desc: "Returns reach inspection, restocking or redistribution faster with full traceability",
  },
];

const challengeTimeline = [
  {
    phase: "Returns pile up inventory locked",
    color: "#E24B4A",
    bg: false,
    text: "Manual classification creates multi-day processing backlogs. Returned stock sits unprocessed locking up inventory capital. Finance and merchandising teams have no visibility.",
  },
  {
    phase: "Misclassification increases costs",
    color: "#E65100",
    bg: false,
    text: "Condition assessment and disposition without automation leads to errors. Items restocked in wrong condition, wrong client stock mixed and inspection queues not prioritised.",
  },
  {
    phase: "Peak return surges trigger crisis",
    color: "#F0A500",
    bg: false,
    text: "Post-festive, end-of-season. Return volumes spike 3–5x. Manual teams cannot process fast enough. Refund cycles extend. Customer satisfaction drops. Re-purchase rate follows.",
  },
  {
    phase: "With UnboxSort returns become a managed flow",
    color: "#079d92",
    bg: true,
    text: "Rule-based classification routes every return correctly. 100% accuracy. Same-shift processing. Live dashboard. Post-festive surges handled without additional headcount.",
  },
];

const capabilityCards = [
  {
    title: "Rule-based disposition",
    desc: "Software applies configurable disposition rules per SKU, condition code and return reason with restock, inspect, quarantine or redistribute handled automatically.",
    icon: <RadarIcon />,
  },
  {
    title: "Multi-client segregation",
    desc: "Handles simultaneous multi-client return flows with complete segregation and no cross-contamination across client returns inventories.",
    icon: <RoutingIcon />,
  },
  {
    title: "Real-time returns visibility",
    desc: "Live returns dashboard shows processing status per SKU, condition and disposition path so finance and merchandising have instant inventory visibility.",
    icon: <MonitorIcon />,
  },
  {
    title: "Peak returns capacity",
    desc: "Scales for post-festive and end-of-season return surges without adding headcount or infrastructure changes.",
    icon: <ScalesIcon />,
  },
  {
    title: "Full traceability",
    desc: "Every returned parcel tracked from induction to final disposition with complete audit trail for customer refunds and inventory reconciliation.",
    icon: <PuzzlePieceIcon />,
  },
  {
    title: "Downstream integration",
    desc: "Triggers downstream processes automatically including restocking notifications, inspection queue updates and redistribution routing via WMS.",
    icon: <WmsIcon />,
  },
];

const icpProfiles = [
  {
    role: "Head of Returns Operations",
    company: "E-Commerce & Fashion Fulfillment",
    pains: [
      "Managing growing return volumes with fixed team size",
      "Return backlogs delaying refund cycles",
      "Needs real-time visibility into returns inventory status",
    ],
  },
  {
    role: "VP Supply Chain",
    company: "Omnichannel Retailer",
    pains: [
      "Returns processing across multiple channels and conditions",
      "Disposition rules varying by SKU and customer tier",
      "Needs unified automation for forward and reverse logistics",
    ],
  },
  {
    role: "Operations Manager",
    company: "3PL with Multi-Client Returns",
    pains: [
      "Handling returns for multiple e-commerce clients simultaneously",
      "Client segregation critical",
      "Evaluating returns automation as a contract differentiator",
    ],
  },
];

const advantages = [
  {
    headline: "Rule-based disposition engine",
    proof: "Configurable rules per SKU, condition and return reason. Zero manual decisions.",
    icon: <PuzzlePieceIcon />,
  },
  {
    headline: "100% classification accuracy",
    proof: "Every return routed correctly with restock, inspect, quarantine or redistribute.",
    icon: <AccuracyIcon />,
  },
  {
    headline: "Same-shift processing",
    proof: "Returns processed within the same shift they arrive. Refund in hours not days.",
    icon: <OperatorIcon />,
  },
  {
    headline: "Multi-client segregation",
    proof: "Simultaneous multi-client return flows. Complete isolation. Full traceability.",
    icon: <RoutingIcon />,
  },
  {
    headline: "Peak surge capacity",
    proof: "3–5x return surges handled without headcount or infrastructure changes.",
    icon: <ScalesIcon />,
  },
  {
    headline: "Real-time returns visibility",
    proof: "Live dashboard for finance, merchandising and customer service teams.",
    icon: <MonitorIcon />,
  },
  {
    headline: "Downstream integration",
    proof: "Triggers restocking, inspection and redistribution via WMS automatically.",
    icon: <WmsIcon />,
  },
  {
    headline: "3–6 week deployment",
    proof: "Returns automation live quickly. No disruption to forward logistics.",
    icon: <DeploymentIcon />,
  },
];

/* ── Component ────────────────────────────────────────────────────── */

const DistributionCenterReturnsSortationPage = () => {
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
        title="Distribution Center Returns Sortation — UnboxSort | Unbox Robotics"
        description="UnboxSort automates returns sortation for distribution centers. Rule-based classification of return parcels for faster inspection, restocking and redistribution. 100% accuracy."
      />

            <SchemaMarkup schema={useCaseReturnsSortationSchema} />
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
              Returns Sortation That{" "}
              <span className="!font-semibold">Clears the Backlog.</span>
            </motion.h1>
            <motion.p
              className="font-16-light color-grey-1 text-center max-w-[780px]"
              custom={1}
              variants={animation.fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              UnboxSort enables structured, rule-based returns sortation
              classifying return parcels by condition, SKU and disposition rule
              so they move faster toward inspection, restocking or
              redistribution.
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
            alt="UnboxSort returns sortation reverse logistics classification flow"
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
              How UnboxSort Powers Returns Sortation
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              From returned parcel induction to disposition-ready classification
              structured reverse logistics automation.
            </motion.p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-3 items-stretch overflow-x-auto">
            {returnsSteps.map((item, index) => (
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
                {index < returnsSteps.length - 1 && (
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
              Why returns processing has become a strategic challenge
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              E-commerce return volumes are growing 35%+ annually. Manual
              returns handling creates processing backlogs, inventory
              inaccuracies and cashflow delays that compound each peak cycle.
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
              Six capabilities that transform returns operations
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              UnboxSort enables structured reverse logistics automation from
              returns induction to downstream processing fully automated.
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
              UnboxSort returns sortation is built for operations handling
              growing reverse logistics volumes across e-commerce, fashion and
              3PL environments.
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
              Why Returns Operations Leaders Choose UnboxSort
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              Eight capabilities that make UnboxSort the most intelligent and
              scalable returns sortation system available.
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
            text={`UnboxSort includes a configurable returns disposition rule engine built specifically for reverse logistics workflows and not adapted from a forward sortation system.`}
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
              Questions about returns sortation automation
            </motion.h2>
            <motion.p
              className="font-16-light color-grey-1 text-center"
              custom={1}
              variants={animation.fadeInUpVariant}
            >
              What operations and supply chain leaders ask when evaluating
              UnboxSort for distribution center returns processing.
            </motion.p>
          </motion.div>
        </section>
      </div>
      <Faq
        data={ReturnsSortationFaqData.slice(0, 4)}
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
                UnboxSort: Rule-based returns sortation for modern distribution
                centers
              </h2>
              <p className="font-20-light color-black-1">
                <span className="!font-medium">
                  Returns sortation automation
                </span>{" "}
                has become a strategic priority as e-commerce return volumes
                grow 35%+ annually. UnboxSort delivers structured, rule-based
                returns classification that moves returned parcels faster toward
                inspection, restocking and redistribution reducing processing
                backlogs, improving inventory visibility and accelerating refund
                cycles. Unlike generic{" "}
                <span className="!font-medium">warehouse automation</span>{" "}
                systems designed for forward logistics, UnboxSort includes a
                configurable disposition rule engine built specifically for
                reverse logistics workflows.
              </p>
              <p className="font-20-light color-black-1">
                Deployed in 3–6 weeks within existing DC footprints with{" "}
                <span className="!font-medium">warehouse automation ROI</span>{" "}
                typically visible within 6–9 months, UnboxSort enables
                e-commerce operators, fashion retailers and 3PL providers to
                handle growing return volumes without proportional headcount
                growth. Full WMS integration provides real-time returns
                visibility across finance, merchandising and customer service
                teams transforming returns from a cost centre into a managed,
                measurable operational flow.
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
            Ready to automate your returns sortation?
          </motion.h2>
          <motion.p
            className="font-16-light text-white text-center"
            custom={1}
            variants={animation.fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            See how UnboxSort clears return backlogs and delivers 100%
            classification accuracy within your existing DC footprint.
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

export default DistributionCenterReturnsSortationPage;
