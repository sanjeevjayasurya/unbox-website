"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { animation } from "../../helpers/utils";
import CommonButton from "../../components/common/CommonButton";
import AnimatedArrowButton from "../../components/common/AnimatedArrowButton";
import ImageComponent from "../../components/common/ImageComponent";
import { reliveEvents } from "./config";

const mod = (n, m) => ((n % m) + m) % m;

const ReliveEvent = () => {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  if (!reliveEvents.length) return null;

  const n = reliveEvents.length;
  const e = reliveEvents[index];
  const go = (dir) => setIndex((i) => mod(i + dir, n));

  return (
    <div className="bg-[#FDFDFD] class-gap">
      <div
        className="relive-head">
        <p className="font-40-regular text-[#141313]">{e.title}</p>
        {n> 1 && (
          <div className="relive-arrows">
            <AnimatedArrowButton
              direction="up-right"
              ariaLabel="Previous event"
              onClick={() => go(-1)}
            />
            <AnimatedArrowButton
              direction="down-left"
              ariaLabel="Next event"
              onClick={() => go(1)}
            />
          </div>
        )}
      </div>

      {/* Keyed on the active event so switching cross-fades the whole recap. */}
      <div
        className="relive-content"
        key={index}>
        <div className="relive-top">
          <div className="relive-main-img">
            <ImageComponent
              src={e.mainImage}
              alt={e.title}
              className="common-img"
            />
          </div>

          <div className="relive-highlights-card">
            <span className="relive-eyebrow font-14-regular text-[#818382]">
              {e.eyebrow}
            </span>
            <div className="relive-highlights-body">
              <h3 className="font-32-medium color-green-1">{e.aboutTitle}</h3>
              <p className="font-16-light text-[#4a4a4a]">{e.aboutText}</p>
            </div>
            <p className="font-16-medium text-[#141313]">{e.recapText}</p>
          </div>
        </div>

        <div className="relive-gallery">
          {e.gallery.map((item) => (
            <div key={item.id} className="relive-gallery-card">
              <ImageComponent
                src={item.image}
                alt={item.caption}
                className="common-img"
              />
              <div className="relive-gallery-overlay" />
              <p className="relive-gallery-caption font-20-medium color-white">
                {item.caption}
              </p>
            </div>
          ))}
        </div>

        <div className="relive-btns">
          <CommonButton
            theme="green"
            title="View Full Recap"
            onClick={() => router.push(e.viewRecapLink)}
          />
          <CommonButton
            theme="gray"
            title="Meet Us At Next Event"
            onClick={() => {
              // Scroll to the "Featured Event" (Next Up) section if it exists,
              // otherwise fall back to the configured link.
              const featured = document.getElementById("featured-event");
              if (featured) {
                featured.scrollIntoView({ behavior: "smooth", block: "start" });
              } else {
                router.push(e.nextEventLink);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReliveEvent;
