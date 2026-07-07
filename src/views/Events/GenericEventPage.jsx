"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { animation } from "../../helpers/utils";
import CommonButton from "../../components/common/CommonButton";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import EventFloorRecap from "./EventFloorRecap";
import { eventData } from "./config";
import CalendarIcon from "./assets/calendar.svg";
import LocationIcon from "./assets/location.svg";
import { navLogo } from "../../helpers/assets";
import "./index.css";
import "./deliver.css";
import "./cemat.css";

// Data-driven detail page for any event in `eventData` that doesn't have a
// bespoke page. Upcoming events show the register / meeting CTAs; past events
// show their recap sections (if any).
const GenericEventPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const event = eventData.find((e) => e.link === pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Unknown event → back to the listing.
  useEffect(() => {
    if (!event) {
      router.replace("/events");
    }
  }, [event, router]);

  if (!event) return null;

  const isPast = event.status === "past";
  const f = event.featured || {};

  return (
    <>
      <HelmetWrapper
        title={event.title}
        description={f.description || `${event.title} — Unbox Robotics`}
        image={event.image}
      />

      {/* ── HERO ── */}
      <section className="event-hero-container">
        <div className="de-hero">
          <img
            src={event.image}
            alt={event.title}
            className="de-hero-bg"
            fetchPriority="high"
            draggable={false}
          />
          <div className="de-hero-gradient" />
          <motion.div
            className="de-hero-content"
            initial="hidden"
            animate="visible"
            variants={animation.fromLeftVariant}
          >
            <div className="space-y-5">
              <div className="de-hero-title-wrap">
                <span className="de-hero-title-bar" />
                <h1 className="text-white res-font-48-extralight">
                  {f.heading || `Meet UnboxSort at ${event.title}`}
                </h1>
              </div>

              {f.description && (
                <p className="font-20-light text-white max-w-[640px]">
                  {f.description}
                </p>
              )}
            </div>

            <div className="de-hero-meta">
              <div className="de-hero-meta-row">
                <div className="de-hero-icon-circle">
                  <CalendarIcon fill="#079D92" width={34} height={34} />
                </div>
                <span className="font-24-light text-white">{event.date}</span>
              </div>
              <div className="de-hero-meta-row">
                <div className="de-hero-icon-circle">
                  <LocationIcon stroke="#079D92" width={34} height={34} />
                </div>
                <span className="font-24-light text-white">
                  {f.location || event.location}
                </span>
              </div>
            </div>

            {!isPast && (
              <div className="flex gap-5 flex-wrap">
                <CommonButton
                  theme="green"
                  title="Register Now"
                  onClick={() => router.push(f.registerLink || "/get-in-touch")}
                />
                {f.calendarLink && (
                  <a href={f.calendarLink} target="_blank" rel="noreferrer">
                    <CommonButton theme="white" title="Add to Calendar" />
                  </a>
                )}
              </div>
            )}

            <div className="de-hero-logos-bar">
              <img
                src={navLogo}
                alt="Unbox Robotics"
                className="h-[88px] max-[567px]:h-[40px] bg-white p-2"
                draggable={false}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Past events → recap sections */}
      {isPast && event.recapSections && (
        <EventFloorRecap data={event.recapSections} />
      )}

      {/* Upcoming events → booking CTA band */}
      {!isPast && (
        <motion.div
          className="de-booth-cta"
          variants={animation.fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p
            className="font-40-regular"
            style={{ color: "#fff", textAlign: "center" }}
          >
            {(f.location || event.location)} &nbsp;|&nbsp; {event.date}
          </p>
          <a href="/get-in-touch">
            <CommonButton theme="white" title="Book A Meeting" />
          </a>
        </motion.div>
      )}
    </>
  );
};

export default GenericEventPage;
