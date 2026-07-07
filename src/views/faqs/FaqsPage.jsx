"use client";

import { useState } from "react";
import "./index.css";
import { motion } from "framer-motion";
import { animation } from "../../helpers/utils";
import AccordionItem from "../../components/common/AccordionItem";
import { faqData, contactEmail } from "../../helpers/config";
import CommonButton from "../../components/common/CommonButton";
import { useRouter } from "next/navigation";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import { faqsSchema } from "../../helpers/schemas";

const FaqsPage = () => {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <HelmetWrapper
        title="FAQ"
        description="Quick answers to questions you may have"
      />
            <SchemaMarkup schema={faqsSchema} />
      <div className="bg-[#FDFDFD]">
        <motion.h1
          className="font-40-regular color-black-1 text-center p-[28px]"
          custom={0}
          variants={animation.fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          Quick answers to questions you may have
        </motion.h1>
        <div className="py-20 px-[60px] max-lg:py-5 max-lg:px-[20px] w-full">
          <motion.div
            custom={1}
            className="mx-auto max-w-[882px] w-full space-y-3"
            variants={animation.accordionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {faqData?.map((item, index) => {
              return (
                <div key={item?.id}>
                  <AccordionItem
                    title={item?.name}
                    content={item?.desc}
                    isOpen={openIndex === index}
                    onToggle={() => handleToggle(index)}
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-[#141313] mb-10 py-20 px-15 flex flex-col gap-[60px] items-center justify-center"
      >
        <motion.h1
          className="font-40-regular text-white text-center max-w-[836px]"
          custom={0}
          variants={animation.fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          Can't find what you're looking for?
          <br />
          Contact us here:
        </motion.h1>
        <motion.div
          custom={1}
          variants={animation.fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="p-[3px] flex items-center w-[612px] max-lg:w-[320px] gap-2 justify-between bg-[#9C9C9C5C] rounded-[1000px]">
            <span className="font-16-light text-white ml-8 max-lg:ml-2">
              {contactEmail}
            </span>
            <CommonButton
              theme={"white"}
              title={"Get In Touch"}
              onClick={() => router.push("/get-in-touch")}
            />
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default FaqsPage;
