"use client";

import React from "react";
import { animation } from "../../helpers/utils";
import companyImage from "../../assets/images/company/company.webp";

/**
 * AboutUnbox
 * Static "About Unbox Robotics" block shown on every PR & News detail page.
 * This content is common to all PR & News entries and is intentionally NOT
 * managed through the admin panel.
 */
const AboutUnbox = () => {
  return (
    <div
      className="flex gap-[20px] max-[1024px]:flex-col items-stretch">
      <div className="flex-1 flex flex-col  gap-6 bg-[#F5F5F5] rounded-[24px] p-6 max-[768px]:p-4">
        <p className="font-16-regular !font-semibold uppercase color-green-1 tracking-wide">
          About Unbox Robotics
        </p>
        <p className="font-16-light color-black-1 !leading-[24px]">
          Unbox Robotics builds AI-powered swarm robotics that make warehouse
          fulfilment faster and more compact. Its sortation platform is deployed
          across e-commerce, retail and third-party logistics operations,
          lifting throughput while reducing the footprint committed to
          automation.
        </p>
      </div>
      <div className="flex-2 max-w-[650px] h-[520px] rounded-[24px] overflow-hidden max-[768px]:h-[260px] max-[1140px]:max-w-[550px] max-[1024px]:max-w-none">
        <img
          src={companyImage}
          alt="Unbox Robotics headquarters"
          className="common-img"
          loading="lazy"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default AboutUnbox;
