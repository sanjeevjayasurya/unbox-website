"use client";

import React, { useEffect, useRef } from "react";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import LogoScroller from "../../components/home/LogoScroller";
import ImageComponent from "../../components/common/ImageComponent";
import { clientInfo } from "../../helpers/config";
import { machineTabsData } from "../solutions/config";
import ContactIcon from "./assets/contact.svg";
import HeroRobot from "./assets/hero-robot.webp";
import UnboxRobot from "./assets/05.webp";
import Robot from "./assets/robot.webp";

const distributionHighlights = [
  {
    title: "Advanced Sorting Technology",
    desc: "Our proprietary AI-driven sorting system processes thousands of parcels per hour with 99.9% accuracy, reducing manual labor and operational costs significantly.",
  },
  {
    title: "Seamlessly Scale Your Operations",
    desc: "Designed for rapid deployment and expansion, our Unbox Sort platform scales seamlessly from small fulfillment centers to enterprise-grade distribution networks.",
  },
  {
    title: "Real-time Analytics & Insights",
    desc: "Monitor every stage of parcel processing with our comprehensive dashboard. Real-time data helps optimize workflows and predict maintenance needs before issues arise.",
  },
  {
    title: "Sustainable & Cost Effective",
    desc: "Reduce energy consumption and carbon footprint while cutting operational expenses by 40%. Our robotics solution balances profitability with environmental responsibility.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

function AnimatedSection({ children, variants, custom, className, style }) {
  const ref = useRef(null);
  const inView = true;
  return (
    <div
      ref={ref}
      className={className}
      style={style}>
      {children}
    </div>
  );
}

const ProductOverviewPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const selectedMachine = machineTabsData[0];

  const impactRef = useRef(null);
  const impactInView = true;

  const specsRef = useRef(null);
  const specsInView = true;

  return (
    <>
      <HelmetWrapper
        title="Product Overview"
        description="Explore UnboxSort product overview with modular robotic sortation capabilities, operating metrics, and deployment-ready architecture."
      />

      <div className="product-overview-page">
        <section className="product-overview-hero">
          <AnimatedSection className="product-overview-headline">
            <h1 className="font-40-regular color-black-1 text-center">
              Next-Generation Autonomous Sorting for Modern Fulfillment
            </h1>
            <p className="font-16-light color-grey-1 text-center max-w-[800px] mx-auto">
              Unlock fast, flexible compact sorting with all-purpose robots that
              reach 24/7 — eliminating bottlenecks and maximizing delivery
              times.
            </p>
          </AnimatedSection>

          <div className="product-overview-hero-grid">
            <AnimatedSection className="product-overview-hero-media">
              <ImageComponent
                src={HeroRobot}
                alt="UnboxSort product overview"
                className="common-img"
              />
            </AnimatedSection>

            <AnimatedSection className="product-overview-form-card">
              <div className="form-card-header">
                <div className="form-icon">
                  <ContactIcon />
                </div>
                <div>
                  <h3 className="font-16-semibold color-black-1">
                    Get Your Free Sorting Audit
                  </h3>
                  <p
                    className="font-12-light color-black-1"
                    style={{ fontSize: "10px", marginTop: "2px" }}>
                    Optimize your facility for operations
                  </p>
                </div>
              </div>
              <div className="space-y-[14px]">
                <div className="product-form-field">
                  <label className="font-12-regular color-black-1">
                    Tell us your Throughput
                  </label>
                  <input type="text" />
                </div>
                <div className="product-form-field">
                  <label className="font-12-regular color-black-1">
                    Your Space
                  </label>
                  <input type="text" placeholder="10,000 sq ft" />
                </div>
                <div className="product-form-field">
                  <label className="font-12-regular color-black-1">
                    Company Email
                  </label>
                  <input type="email" />
                </div>
              </div>

              <div className="space-y-[14px]">
                <div className="form-disclaimer">
                  By submitting your details, you agree to our Privacy Policy
                  and that your personal data is managed and stored
                  appropriately. You may unsubscribe at any time.
                </div>

                <button type="button" className="product-form-button">
                  Get Free Analysis Now
                </button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="product-overview-section">
          <AnimatedSection className="product-overview-title-wrap">
            <h2 className="font-40-regular color-black-1 text-center">
              Trusted by Industry Leaders
            </h2>
            <p className="font-16-light color-grey-1 text-center">
              Clients choose Unbox Robotics for compact, scalable automation
              that delivers unmatched operational precision.
            </p>
          </AnimatedSection>
          <LogoScroller clients={clientInfo} speed="fast" />
        </section>

        <section className="product-overview-feature-row">
          <AnimatedSection className="product-overview-feature-copy">
            <h2 className="font-40-regular color-black-1 uppercase">
              INSTANT COMMAND,
              <br />
              ANYWHERE
            </h2>
            <p className="font-16-light color-black-1">
              The relentless browser-based interface and swarm management
              platform puts you in charge of your sorting operations in real
              time - from parcel flow and bin assignments to throughput
              tracking. Integrates with your WMS, or runs standalone
              effortlessly.
            </p>
          </AnimatedSection>
          <AnimatedSection className="product-overview-feature-media">
            <ImageComponent
              src={UnboxRobot}
              alt="UnboxSort in operation"
              className="common-img"
            />
          </AnimatedSection>
        </section>

        <section className="product-overview-specs">
          <div className="product-overview-machine-content-v2" ref={specsRef}>
            <div
              className="product-overview-machine-copy">
              <h2 className="font-40-regular color-black-1 uppercase text-left">
                MEET THE UNBOXSORT <span className="color-green-1">SR</span>{" "}
                SERIES
              </h2>
              <p
                className="font-16-light color-black-1 text-left"
                style={{ marginTop: "16px", marginBottom: "32px" }}>
                The UnboxSort solution utilizes the SR series which features
                vertical lift robots engineered for compact, high-density
                sortation. Designed to handle varied parcels for modern,
                space-constrained warehouses.
              </p>

              <div className="product-overview-machine-spec-grid-v2">
                {selectedMachine.content.features.map((feature, i) => (
                  <article
                    key={feature.name}
                    className="product-overview-machine-spec-item-v2">
                    <div className="product-overview-machine-icon-wrap-v2">
                      <feature.image className="product-overview-machine-icon-v2" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <h4 className="font-14-regular color-black-1">
                        {feature.name}
                      </h4>
                      <p className="font-16-semibold color-green-1">
                        {feature.feature}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div
              className="product-overview-machine-image-wrap-v2">
              <ImageComponent
                src={Robot}
                alt={`${selectedMachine.label} robot`}
                className="common-img machine-v2-img"
              />
            </div>
          </div>
        </section>

        <section className="product-overview-impact">
          <div className="product-overview-impact-card" ref={impactRef}>
            <ImageComponent
              src={UnboxRobot}
              alt="UnboxSort warehouse impact"
              className="common-img product-overview-impact-image"
            />
            <div className="product-overview-impact-overlay">
              <div
                className="product-overview-title-wrap product-overview-title-wrap-dark">
                <h2 className="font-40-regular color-white text-center">
                  Unbox Sort Revolutionizes Parcel Distribution
                </h2>
                <p className="font-16-light color-white text-center">
                  As pioneers in modern sorting technology, we've developed
                  comprehensive tools that maximize parcel distribution. With an
                  agile and adaptable platform, we translate dense logistical
                  complexities into predictable, outperforming capacity, and
                  efficiency.
                </p>
              </div>
              <div className="product-overview-impact-grid">
                {distributionHighlights.map((item, i) => (
                  <article
                    key={item.title}
                    className="product-overview-impact-point-v2">
                    <div className="check-icon-wrap">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#00AFA9" />
                        <path
                          d="M7.5 12L10.5 15L16.5 9"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="font-20-regular color-white">
                      {item.title}
                    </h3>
                    <h6 className="font-20-light max-[768px]:!text-[12px] color-white">{item.desc}</h6>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductOverviewPage;
