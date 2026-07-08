"use client";

import React, { useState } from "react";
import "./index.css";
import { contactEmail } from "../../helpers/config";
import AccordionItem from "../common/AccordionItem";
import CommonButton from "../common/CommonButton";
import { useRouter } from "next/navigation";

const Faq = ({ data, exploreBtnVisible = true }) => {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq_main">
      <div className="faq_main_1">
        <div className="flex-1 flex flex-col justify-between items-start gap-10">
          <div className="flex flex-col gap-[40px] max-lg:gap-[20px]">
            <p className="font-40-regular color-black-1">
              Quick answers to questions you may have
            </p>
            <div className="flex flex-col gap-[14px]">
              <p className="font-16-light color-black-1">
                Can't find what you're looking for? <br />
                Contact us here:
              </p>
              <a
                className="font-20-medium color-green-1 cursor-pointer"
                href={`mailto:${contactEmail}`}
                onClick={(e) => {
                  window.location.href = `mailto:${contactEmail}`;
                  e.preventDefault();
                }}
              >
                {contactEmail}
              </a>
            </div>
          </div>
          {exploreBtnVisible && (
            <CommonButton
              theme={"green"}
              title={"Explore More"}
              onClick={() => router.push("/faqs")}
            />
          )}
        </div>

        <div className="faq-title-main-div">
          {data?.map((item, index) => (
            <div key={item?.id}>
              <AccordionItem
                title={item?.name}
                content={item?.desc}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
