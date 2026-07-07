"use client";

import React from "react";
import { motion } from "framer-motion";
import "./index.css";
import {
  footerMenuList,
  contactEmail,
  instagramUrl,
  linkedinUrl,
  xUrl,
  facebookUrl,
  youtubeUrl,
} from "../../helpers/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CommonButton from "../common/CommonButton";
import InstaIcon from "../../assets/icons/insta.svg";
import YoutubeIcon from "../../assets/icons/youtube.svg";
import TwitterIcon from "../../assets/icons/twitter.svg";
import LinkedinIcon from "../../assets/icons/linkedin.svg";
import FacebookIcon from "../../assets/icons/facebook.svg";
import EmailIcon from "../../assets/icons/email.svg";
import PhoneIcon from "../../assets/icons/phone-call.svg";
import LocationIcon from "../../assets/icons/location-pin.svg";
import { animation } from "../../helpers/utils";

const Footer = () => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  return (
    <motion.footer
      className="footer-container"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="footer-main-div">
        <div className="footer-section-1">
          {footerMenuList?.map((item, index) => {
            return (
              <motion.div
                key={item?.id}
                custom={index}
                variants={animation.linkVariant}
                className="footer-menu-item"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <Link href={item?.navigate}>{item?.name}</Link>
              </motion.div>
            );
          })}
        </div>
        <div className="footer-section-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex-1 footer-inner-section-2"
            variants={animation.fromLeftVariant}
          >
            <div className="flex flex-col items-center gap-[14px]">
              <h2 className="font-40-regular text-center color-white">
                Ready to Revolutionize Your Warehouse?
              </h2>
              <p className="font-16-light color-white text-center">
                Let's discuss how Unbox Robotics can tailor a solution to meet
                your unique challenges.
              </p>
            </div>
            <CommonButton
              theme={"white"}
              title={"Get In Touch"}
              onClick={() => router.push("/get-in-touch")}
            />
          </motion.div>
          <motion.div
            className="footer-contact-info-div"
            variants={animation.fromRightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="flex flex-col gap-[12px] md:gap-[16px]">
              <div className="flex gap-[12px] items-center">
                <PhoneIcon />
                <p className="font-20-medium color-white uppercase">Phone</p>
              </div>
              <a
                className="font-16-regular color-white cursor-pointer"
                href="tel:+918956365282"
              >
                +91 89563 65282
              </a>
            </div>
            <div className="flex flex-col gap-[12px] md:gap-[16px]">
              <div className="flex gap-[12px] items-center">
                <EmailIcon />
                <p className="font-20-medium color-white uppercase">Email id</p>
              </div>

              <a
                className="font-16-regular color-white cursor-pointer"
                href={`mailto:${contactEmail}`}
                onClick={(e) => {
                  window.location.href = `mailto:${contactEmail}`;
                  e.preventDefault();
                }}
              >
                {contactEmail}
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="address-info-div"
          variants={animation.fromLeftVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <LocationIcon width={26} height={26} />{" "}
            <span className="font-24-medium text-black-1">Locations</span>
          </div>
          <div className="flex gap-6 flex-wrap max-md:flex-col max-md:gap-5">
            <div className="flex flex-col gap-3 flex-1">
              <h3 className="font-20-medium text-black-1">Head Office</h3>
              <a
                href="https://maps.app.goo.gl/5wTDq7TfYjzwTADx6"
                className="font-16-light text-black-1 transition-all duration-300 hover:text-[var(--black-1)]"
                target="__blank"
              >
                Unboxrobotics Labs Pvt Ltd. C9-10(11), MIDC road, T Block, MIDC,
                Bhosari, Pimpri-Chinchwad, Maharashtra 411026
              </a>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <h3 className="font-20-medium text-black-1">Factory</h3>
              <a
                href="https://maps.app.goo.gl/DZVY7CASj3Gxi5nJ7"
                target="__blank"
                className="font-16-light text-black-1 transition-all duration-300 hover:text-[var(--black-1)]"
              >
                Unboxrobotics Labs Pvt Ltd. Dangat Patil Nagar, Shivane, Pune,
                Maharashtra 411023
              </a>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <h3 className="font-20-medium text-black-1">USA</h3>
              <a
                href="https://maps.app.goo.gl/CuNNv5zzFjGsoZJz9"
                target="__blank"
                className="font-16-light text-black-1 transition-all duration-300 hover:text-[var(--black-1)]"
              >
                2140 S, Dupont Hwy, Camden, Kent, Delaware - 19934
              </a>
            </div>
          </div>
        </motion.div>

        <div className="footer-section-3">
          <motion.div
            className="footer-social-info-div flex-1"
            variants={animation.fromRightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <a
              href={instagramUrl}
              target="__blank"
              className="footer-social-btn insta-gradient"
            >
              <InstaIcon className="social-icon" aria-hidden="true" />
              <span className="text text-center font-14-regular color-white">
                Instagram
              </span>
            </a>
            <a
              href={linkedinUrl}
              target="__blank"
              className="footer-social-btn linkedin-gradient"
            >
              <LinkedinIcon className="social-icon" aria-hidden="true" />
              <span className="text text-center font-14-regular color-white">
                Linked In
              </span>
            </a>
            <a
              href={xUrl}
              target="__blank"
              className="footer-social-btn twitter-gradient"
            >
              <TwitterIcon className="social-icon" aria-hidden="true" />
              <span className="text text-center font-14-regular color-white">
                X
              </span>
            </a>
            <a
              href={facebookUrl}
              target="__blank"
              className="footer-social-btn facebook-gradient"
            >
              <FacebookIcon className="social-icon" aria-hidden="true" />
              <span className="text text-center font-14-regular color-white">
                Facebook
              </span>
            </a>
            <a
              href={youtubeUrl}
              className="footer-social-btn youtube-gradient "
              target="__blank"
            >
              <YoutubeIcon className="social-icon" aria-hidden="true" />
              <span className="text text-center font-14-regular color-white">
                Youtube
              </span>
            </a>
          </motion.div>

          <motion.div
            className="flex-2 footer-inner-section-3"
            variants={animation.fromRightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="py-[9px] text-center font-14-regular color-black-1">
              © {currentYear} Unbox Robotics. All rights reserved.
            </div>
            <div className="flex items-center gap-x-[25px] gap-y-[10px] flex-wrap justify-center">
              <Link className="footer-privacy-info " href={"/gdpr-compliance"}>
                GDPR Compliance
              </Link>
              <Link className="footer-privacy-info " href={"/privacy-policy"}>
                Cookie & Privacy Policy
              </Link>
              <Link className="footer-privacy-info " href={"/data-processing-agreement"}>
                Data Processing Agreement
              </Link>
              <Link className="footer-privacy-info " href={"/terms-of-services"}>
                Terms of Services
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
