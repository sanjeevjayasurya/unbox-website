"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import "./index.css";
import { faqData, contactEmail } from "../../helpers/config";
import AccordionItem from "../common/AccordionItem";
import { animation } from "../../helpers/utils";
import CommonButton from "../common/CommonButton";
import { useRouter } from "next/navigation";

const Faq = ({ data, exploreBtnVisible = true }) => {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <motion.div
      className="faq_main"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="faq_main_1">
        <div className="flex-1 flex flex-col justify-between items-start gap-10">
          <div className="flex flex-col gap-[40px] max-lg:gap-[20px]">
            <motion.p
              className={`font-40-regular color-black-1 `}
              custom={0} // Stagger index 0
              variants={animation.lineVariant}
            >
              Quick answers to questions you may have
            </motion.p>
            <div className="flex flex-col gap-[14px]">
              <motion.p
                className="font-16-light color-black-1"
                custom={1} // Stagger index 1
                variants={animation.lineVariant}
              >
                Can't find what you're looking for? <br />
                Contact us here:
              </motion.p>
              <motion.a
                className="font-20-medium color-green-1 cursor-pointer"
                custom={2} // Stagger index 2
                variants={animation.lineVariant}
                href={`mailto:${contactEmail}`}
                onClick={(e) => {
                  window.location.href = `mailto:${contactEmail}`;
                  e.preventDefault();
                }}
              >
                {contactEmail}
              </motion.a>
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
          {data?.map((item, index) => {
            return (
              <motion.div
                key={item?.id}
                custom={index}
                variants={animation.accordionVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <AccordionItem
                  title={item?.name}
                  content={item?.desc}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Faq;
