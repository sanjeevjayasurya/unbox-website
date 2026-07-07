"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";
import NavLogo from "../../assets/icons/nav-logo.svg";
import ArrowDown from "../../assets/icons/drop-down.svg";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import CommonButton from "../common/CommonButton";
import CommonArrowButton from "../common/CommonArrowButton";
import { navLogo, solutionMenu, uboxSortImg } from "../../helpers/assets";
import { solutionMenuItems, careersUrl } from "../../helpers/config";
import { animation } from "../../helpers/utils";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import NewsBanner from "../NewsBanner";
import ImageComponent from "../common/ImageComponent";
import IdustryIcon from "../../assets/icons/idustryBox.svg";
import UseCaseIcon from "../../assets/icons/useCaseIcon.svg";
import MotifRight from "../../assets/icons/MotifRight.svg";
import motifRightUrl from "../../assets/icons/MotifRight.svg?url";
// --- Animation Variants for the Menu ---
// Variant for the main responsive menu container
const menuVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      staggerChildren: 0.05, // This will make the menu items animate in one by one
    },
  },
};

// Variant for each individual item within the menu
const menuItemVariants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const NavbarComponent = ({ shouldAnimate }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("/");
  const [companyOpen, setCompanyOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [hoveredSolutionCategory, setHoveredSolutionCategory] = useState(null);

  const solutionCategories = [
    {
      key: "industry",
      Icon: IdustryIcon,
      title: "By Industry",
      desc: "Automation tailored to your industry's pace and complexity.",
      items: [
        {
          title: "3PL",
          desc: "Multi-tenant flexibility for logistics providers.",
          link: "/industry/3pl",
        },
        {
          title: "E-commerce",
          desc: "High-velocity sortation for online retail.",
          link: "/industry/e-commerce",
        },
        {
          title: "Retail",
          desc: "Omnichannel fulfilment for global brands.",
          link: "/industry/retail",
        },
        {
          title: "CEP",
          desc: "Efficient Courier, Express, and Parcel hubs.",
          link: "/industry/cep",
        },
      ],
    },
    {
      key: "usecase",
      Icon: UseCaseIcon,
      title: "By Use Cases",
      desc: "Precision solutions for your most critical workflows.",
      items: [
        {
          title: "Order Consolidation",
          desc: "Syncing multi-line items with zero error rates.",
          link: "/use-cases/fulfillment-center-order-consolidation",
        },
        {
          title: "Outbound Sortation",
          desc: "Automating the last physical touch before shipping.",
          link: "/use-cases/fulfillment-center-outbound-sortation",
        },
        {
          title: "Click and Collect",
          desc: "Hyper-local fulfillment for micro-fulfillment centers.",
          link: "/use-cases/fulfillment-center-click-and-collect",
        },
        {
          title: "Returns Processing",
          desc: "Re-integrating stock with industrial speed.",
          link: "/use-cases/distribution-center-returns-sortation",
        },
        {
          title: "Mid-Mile Sortation",
          desc: "High-throughput sortation between hubs and DCs.",
          link: "/use-cases/sort-center-mid-mile-sortation",
        },
        {
          title: "B2B Order Fulfillment",
          desc: "Streamlined store-bound order fulfillment at scale.",
          link: "/use-cases/b2b-store-order-fulfillment",
        },
        {
          title: "Last-Mile Sortation",
          desc: "Final-leg sortation for delivery hubs.",
          link: "/use-cases/delivery-hub-last-mile-sortation",
        },
      ],
    },
  ];
  const isGetInTouchPage =
    pathname === "/get-in-touch" ||
    pathname === "/blogs" ||
    pathname === "/case-study" ||
    pathname === "/white-paper";

  const width = useWindowWidth();
  const isMobile = width <= 1200;

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setResourcesOpen(false);
    setCompanyOpen(false);
    setSolutionOpen(false);
    setOpenDropdown(null);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setCompanyOpen(false);
    setResourcesOpen(false);
    setSolutionOpen(false);
    setOpenDropdown(null);
  };

  useEffect(() => {
    setActiveLink(pathname);
    if (isOpen) {
      closeMenu();
    }
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(new Event("lenis:stop"));
    } else {
      window.dispatchEvent(new Event("lenis:start"));
    }
    return () => {
      window.dispatchEvent(new Event("lenis:start"));
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        className={`navbar-main-container ${isOpen && isMobile && "h-screen"}`}
        initial={shouldAnimate ? "hidden" : false}
        animate={shouldAnimate ? "visible" : false}
        variants={animation.navVariants}
      >
        {showBanner && <NewsBanner onClose={() => setShowBanner(false)} />}
        <div className="wrap-navabar">
          <div className="navbar-container">
            <div className="navbar-main-div">
              <Link className="nav-logo-div" href={"/"}>
                <img
                  src={navLogo}
                  alt="Unbox Robotics"
                  className="h-[52px]"
                  width="133"
                  height="52"
                  draggable={false}
                />
              </Link>

              <div className="flex items-center gap-[14px] display-none-tab">
                <Link
                  href={"/"}
                  className={`nav-link py-[10px] px-[12px] ${
                    activeLink === "/" && "active-link"
                  }`}
                >
                  Home
                </Link>
                {/* Solutions Dropdown */}
                <div className="relative">
                  <div
                    className="relative"
                    onMouseLeave={() => setSolutionOpen(false)}
                  >
                    <button
                      className="flex items-center gap-[8px] z-10 relative py-[10px] px-[12px] "
                      onMouseEnter={() => setSolutionOpen(true)}
                      aria-expanded={solutionOpen}
                      aria-haspopup="true"
                    >
                      <span
                        className={`nav-link ${
                          [
                            "/solutions-overview",
                            "/solution-detail",
                            "/solutions-unbox-sort",
                          ].includes(activeLink)
                            ? "active-link"
                            : ""
                        }`}
                      >
                        Solutions
                      </span>
                      <ArrowDown
                        className={`arrow-div ${
                          solutionOpen ? "rotate-up" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`solution-custom-dropdown ${
                        solutionOpen ? "visible" : ""
                      }`}
                    >
                      <div className="solution-inner-custom-dropdown">
                        <div className="gap-[10px] flex flex-col flex-0 w-[444px]">
                          <div
                            className="p-[14px] flex gap-1 cursor-pointer group"
                            onClick={() => {
                              router.push("/solutions-overview");
                              setSolutionOpen(false);
                            }}
                          >
                            <div className="w-[105px] h-[100px] shrink-0 rounded-[14px] overflow-hidden">
                              <img
                                src={solutionMenu}
                                className="w-full h-full object-cover"
                                alt="solution-overview"
                              />
                            </div>
                            <div className="flex flex-col px-3 py-[10px] gap-[10px]">
                              <h2 className="font-20-medium color-black group-hover:text-[#079d92]">
                                Solutions Overview
                              </h2>
                              <p className="font-12-regular text-[#818382]">
                                Enabling the Next Generation of Logistics &
                                Fulfillment Operations
                              </p>
                            </div>
                          </div>
                          {solutionMenuItems?.map((item) => (
                            <div
                              key={item.id}
                              className="p-[14px] flex gap-1 cursor-pointer group"
                              onClick={() => {
                                router.push(item.link);
                                setSolutionOpen(false);
                              }}
                            >
                              <div className="w-[105px] h-[100px] shrink-0 rounded-[14px] overflow-hidden">
                                <img
                                  src={uboxSortImg}
                                  className="w-full h-full object-cover"
                                  alt="unboxsort"
                                />
                              </div>
                              <div className="flex flex-col px-3 py-[10px] gap-[10px]">
                                <h2 className="font-20-medium color-black group-hover:text-[#079d92]">
                                  UnboxSort
                                </h2>
                                <p className="font-12-regular text-[#818382]">
                                  A smart, compact and ingeniously designed
                                  sortation robot.
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="p-4 bg-white rounded-[20px] shadow-[0_0_50px_0_#0000001A] flex gap-[40px]">
                          <div className="flex flex-col gap-y-[10px] flex-1">
                            {solutionCategories.map((cat) => {
                              const isActive =
                                hoveredSolutionCategory === cat.key;
                              return (
                                <motion.div
                                  key={cat.key}
                                  onMouseEnter={() =>
                                    setHoveredSolutionCategory(cat.key)
                                  }
                                  initial={false}
                                  animate={{
                                    backgroundColor: isActive
                                      ? "#F5F5F5"
                                      : "rgba(245,245,245,0)",
                                  }}
                                  transition={{
                                    duration: 0.25,
                                    ease: "easeOut",
                                  }}
                                  className="py-[10px] px-3 rounded-[14px] cursor-pointer gap-1"
                                >
                                  <div className="flex gap-3 items-center">
                                    <cat.Icon />
                                    <motion.h3
                                      className="font-16-semibold flex flex-1 text-left"
                                      initial={false}
                                      animate={{
                                        color: isActive
                                          ? "var(--green-1)"
                                          : "var(--black-1)",
                                      }}
                                      transition={{ duration: 0.25 }}
                                    >
                                      {cat.title}
                                    </motion.h3>
                                    {isActive && <MotifRight />}
                                  </div>
                                  <p className="font-12-regular text-[#818382] mt-1">
                                    {cat.desc}
                                  </p>
                                </motion.div>
                              );
                            })}
                          </div>
                          <div className="flex flex-col gap-y-[10px] flex-1 py-[10px] w-[200px] relative">
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={hoveredSolutionCategory}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="flex flex-col gap-y-[10px]"
                              >
                                {solutionCategories
                                  .find(
                                    (c) => c.key === hoveredSolutionCategory
                                  )
                                  ?.items.map((item, idx) => {
                                    const isActiveItem =
                                      activeLink === item.link;
                                    return (
                                      <motion.div
                                        key={item.title}
                                        className="cursor-pointer gap-[10px]"
                                        onClick={() => {
                                          router.push(item.link);
                                          setSolutionOpen(false);
                                        }}
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                          duration: 0.2,
                                          delay: 0.04 * idx,
                                          ease: "easeOut",
                                        }}
                                        whileHover="hover"
                                      >
                                        <motion.h4
                                          className="font-14-semibold"
                                          initial={false}
                                          animate={{
                                            color: isActiveItem
                                              ? "var(--green-1)"
                                              : "var(--black-1)",
                                          }}
                                          variants={{
                                            hover: {
                                              color: "var(--green-1)",
                                            },
                                          }}
                                          transition={{ duration: 0.2 }}
                                        >
                                          {item.title}
                                        </motion.h4>
                                        <p className="font-10-regular text-[#818382] mt-1">
                                          {item.desc}
                                        </p>
                                      </motion.div>
                                    );
                                  })}
                              </motion.div>
                            </AnimatePresence>
                          </div>
                        </div>
                        {/* <div className="solution-menu-overview relative">
                          <ImageComponent
                            src={warehouseImage3}
                            className="common-img"
                            alt="Solution Menu"
                          />
                          <div className="solution-menu-content flex flex-col justify-between">
                            <h2 className="font-20-medium color-white">
                              Solutions Overview
                            </h2>
                            <div className="self-end">
                              <CommonArrowButton
                                title={"Explore All"}
                                theme={"white"}
                                onClick={() => {
                                  router.push("/solutions-overview");
                                  setSolutionOpen(false);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="solution-menu-overview relative">
                          <ImageComponent
                            src={unboxProductImage}
                            className="common-img"
                            alt="Solution Menu"
                          />
                          <div className="solution-menu-content flex flex-col justify-between">
                            <div className="flex flex-col gap-[10px]">
                              <h2 className="font-20-medium color-white">
                                UnboxSort
                              </h2>
                              <p className="font-12-regular color-white">
                                Vertical Robotic Sortation
                              </p>
                            </div>
                            <div className="self-end">
                              <CommonArrowButton
                                title={"Explore All"}
                                theme={"white"}
                                onClick={() => {
                                  router.push("/solutions-unbox-sort");
                                  setSolutionOpen(false);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        {/* {solutionMenuItems?.map((item) => (
                          <motion.div
                            className="solution-menu-item"
                            key={item?.id}
                          >

                            <div className="flex flex-col gap-[10px]">
                              <h2 className="font-16-semibold color-black-1">
                                {item?.title}
                              </h2>
                              <p className="font-12-regular color-black-1">
                                {item?.desc}
                              </p>
                            </div>
                            <div className="self-end">
                              <CommonArrowButton
                                title={"Learn More"}
                                onClick={() => {
                                  router.push(item.link);
                                  setSolutionOpen(false);
                                }}
                              />
                            </div>
                          </motion.div>
                        ))}
                        <div className="flex-1 flex justify-center items-center">
                          <h2 className="font-20-medium color-black">
                            Coming Soon
                          </h2>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Technology Link */}
                <Link
                  href={"/technology"}
                  className={`nav-link py-[10px] px-[12px] ${
                    activeLink === "/technology" && "active-link"
                  }`}
                >
                  Technology
                </Link>

                {/* Industry Link */}
                <Link
                  href={"/industry"}
                  className={`nav-link py-[10px] px-[12px] ${
                    activeLink === "/industry" && "active-link"
                  }`}
                >
                  Industry
                </Link>
                {/* Company Dropdown */}
                <div className="relative">
                  <div
                    className="relative"
                    onMouseLeave={() => setCompanyOpen(false)}
                  >
                    <button
                      className="flex items-center gap-[8px] z-10 relative py-[10px] px-[12px]"
                      onMouseEnter={() => setCompanyOpen(true)}
                      aria-expanded={companyOpen}
                      aria-haspopup="true"
                    >
                      <span
                        className={`nav-link ${
                          ["/about-us", "/news-events", "/careers"].includes(
                            activeLink
                          )
                            ? "active-link"
                            : ""
                        }`}
                      >
                        Company
                      </span>
                      <ArrowDown
                        className={`arrow-div ${
                          companyOpen ? "rotate-up" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`custom-dropdown ${
                        companyOpen ? "visible" : ""
                      }`}
                    >
                      <div className="inner-custom-dropdown ">
                        <Link
                          href="/about-us"
                          onClick={() => setCompanyOpen(false)}
                          className={`popup-txt ${
                            activeLink === "/about-us" ? "active-link" : ""
                          }`}
                        >
                          About us
                        </Link>
                        {/* <Link
                          href="/news-events"
                          onClick={() => setCompanyOpen(false)}
                          className={`popup-txt ${
                            activeLink === "/news-events" ? "active-link" : ""
                          }`}
                        >
                          News & Events
                        </Link> */}

                        <Link
                          href="/events"
                          onClick={() => setCompanyOpen(false)}
                          className={`popup-txt ${
                            activeLink === "/events" ? "active-link" : ""
                          }`}
                        >
                          Events
                        </Link>
                        <Link
                          href="/careers"
                          onClick={() => setCompanyOpen(false)}
                          className={`popup-txt ${
                            activeLink === "/careers" ? "active-link" : ""
                          }`}
                        >
                          Careers
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Resources Dropdown */}
                <div className="relative">
                  <div
                    className="relative"
                    onMouseLeave={() => setResourcesOpen(false)}
                  >
                    <button
                      className="flex items-center gap-[8px] z-10 relative py-[10px] px-[12px] "
                      onMouseEnter={() => setResourcesOpen(true)}
                      aria-expanded={resourcesOpen}
                      aria-haspopup="true"
                    >
                      <span
                        className={`nav-link ${
                          [
                            "/blogs",
                            "/case-study",
                            "/pr-news",
                            "/white-paper",
                            "/blogs-details",
                            "/case-study-details",
                            "/pr-news-details",
                            "/white-paper-details",
                          ].includes(activeLink)
                            ? "active-link"
                            : ""
                        }`}
                      >
                        Resources
                      </span>
                      <ArrowDown
                        className={`arrow-div ${
                          resourcesOpen ? "rotate-up" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`custom-dropdown ${
                        resourcesOpen ? "visible" : ""
                      }`}
                    >
                      <div className="inner-custom-dropdown ">
                        <Link
                          href="/blogs"
                          onClick={() => setResourcesOpen(false)}
                          className={`popup-txt ${
                            activeLink === "/blogs" ? "active-link" : ""
                          }`}
                        >
                          Blogs
                        </Link>
                        <Link
                          href="/case-study"
                          onClick={() => setResourcesOpen(false)}
                          className={`popup-txt ${
                            activeLink === "/case-study" ? "active-link" : ""
                          }`}
                        >
                          Case Study
                        </Link>
                        <Link
                          href="/pr-news"
                          onClick={() => setResourcesOpen(false)}
                          className={`popup-txt ${
                            activeLink === "/pr-news" ? "active-link" : ""
                          }`}
                        >
                          PR & News
                        </Link>
                        {/* <Link
                          href="/white-paper"
                          onClick={() => setResourcesOpen(false)}
                          className={`popup-txt ${
                            activeLink === "/white-paper" ? "active-link" : ""
                          }`}
                        >
                          White Paper
                        </Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-[8px]">
                {pathname === "/product/series-b-funded" ? (
                  <div className="display-none-mobile">
                    <CommonButton
                      theme={"green"}
                      title={"Get Free Sorting Audit"}
                      onClick={() =>
                        window.dispatchEvent(new Event("openSortingAudit"))
                      }
                    />
                  </div>
                ) : (
                  <Link href={"/get-in-touch"} className="display-none-mobile">
                    <CommonButton theme={"green"} title={"Get In Touch"} />
                  </Link>
                )}
                <button
                  type="button"
                  className="menu-toggle"
                  onClick={toggleMenu}
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isOpen}
                >
                  {!isOpen ? (
                    <div className="dot-grid">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  ) : (
                    <div className="close-icon">
                      <span />
                      <span />
                    </div>
                  )}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  key="responsive-menu"
                  className="responsive-menu"
                  data-lenis-prevent
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <motion.div variants={menuItemVariants}>
                    <Link
                      href={"/"}
                      className={`nav-link res-menu-btn ${
                        activeLink === "/" ? "active-link" : ""
                      }`}
                    >
                      Home
                    </Link>
                  </motion.div>

                  <motion.div variants={menuItemVariants} className="dropdown">
                    <button
                      className="res-menu-btn relative"
                      onClick={() => toggleDropdown("solutions")}
                    >
                      <span
                        className={`nav-link ${
                          [
                            "/solutions-overview",
                            "/solution-detail",
                            "/solutions-unbox-sort",
                          ].includes(activeLink)
                            ? "active-link"
                            : ""
                        }`}
                      >
                        Solutions
                      </span>
                      <ArrowDown
                        className={`arrow-div ${
                          openDropdown === "solutions" ? "rotate-up" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === "solutions" && (
                      <motion.div
                        className="res-solution-grid"
                        variants={menuItemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {/* Solutions Overview card */}
                        <div
                          className="res-solution-card"
                          onClick={() => {
                            router.push("/solutions-overview");
                            setIsOpen(false);
                          }}
                        >
                          <div className="res-solution-card-img">
                            <img src={solutionMenu} alt="Solutions Overview" />
                          </div>
                          <div className="flex flex-col gap-[6px]">
                            <h2 className="font-16-semibold color-black-1">
                              Solutions Overview
                            </h2>
                            <p className="font-12-regular text-[#818382]">
                              Enabling the Next Generation of Logistics &
                              Fulfillment Operations
                            </p>
                          </div>
                        </div>

                        {/* UnboxSort + other solutionMenuItems */}
                        {solutionMenuItems?.map((item) => (
                          <div
                            key={item?.id}
                            className="res-solution-card"
                            onClick={() => {
                              router.push(item.link);
                              setIsOpen(false);
                            }}
                          >
                            <div className="res-solution-card-img">
                              <img src={uboxSortImg} alt={item?.title} />
                            </div>
                            <div className="flex flex-col gap-[6px]">
                              <h2 className="font-16-semibold color-black-1">
                                {item?.title}
                              </h2>
                              <p className="font-12-regular text-[#818382]">
                                {item?.desc}
                              </p>
                            </div>
                          </div>
                        ))}

                        {/* By Industry / By Use Cases categories */}
                        {solutionCategories.map((cat) => {
                          const isActive = hoveredSolutionCategory === cat.key;
                          return (
                            <div key={cat.key}>
                              <div
                                className={`res-solution-cat-card ${
                                  isActive ? "active" : ""
                                }`}
                                onClick={() =>
                                  setHoveredSolutionCategory((prev) =>
                                    prev === cat.key ? null : cat.key
                                  )
                                }
                              >
                                <div className="res-solution-cat-head">
                                  <cat.Icon />
                                  <h3
                                    className="font-16-semibold flex-1"
                                    style={{
                                      color: isActive
                                        ? "var(--green-1)"
                                        : "var(--black-1)",
                                    }}
                                  >
                                    {cat.title}
                                  </h3>
                                  {isActive && (
                                    <img
                                      src={motifRightUrl}
                                      alt="motif-right"
                                      width={32}
                                      height={32}
                                      style={{ flexShrink: 0 }}
                                    />
                                  )}
                                </div>
                                <p className="font-12-regular text-[#818382] mt-1">
                                  {cat.desc}
                                </p>
                              </div>

                              <AnimatePresence initial={false}>
                                {isActive && (
                                  <motion.div
                                    key={`${cat.key}-items`}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="res-solution-items"
                                  >
                                    {cat.items.map((item) => {
                                      const isActiveItem =
                                        activeLink === item.link;
                                      return (
                                        <div
                                          key={item.title}
                                          className={`res-solution-item ${
                                            isActiveItem ? "active" : ""
                                          }`}
                                          onClick={() => {
                                            router.push(item.link);
                                            setIsOpen(false);
                                          }}
                                        >
                                          <h4 className="font-14-semibold color-black-1">
                                            {item.title}
                                          </h4>
                                          <p className="font-10-regular text-[#818382] mt-1">
                                            {item.desc}
                                          </p>
                                        </div>
                                      );
                                    })}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <Link
                      href={"/technology"}
                      className={`nav-link res-menu-btn ${
                        activeLink === "/technology" ? "active-link" : ""
                      }`}
                    >
                      Technology
                    </Link>
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <Link
                      href={"/industry"}
                      className={`nav-link res-menu-btn ${
                        activeLink === "/industry" ? "active-link" : ""
                      }`}
                    >
                      Industry
                    </Link>
                  </motion.div>

                  <motion.div variants={menuItemVariants} className="dropdown">
                    <button
                      className="res-menu-btn relative"
                      onClick={() => toggleDropdown("company")}
                    >
                      <span
                        className={`nav-link ${
                          ["/about-us", "/news-events", "/careers"].includes(
                            activeLink
                          )
                            ? "active-link"
                            : ""
                        }`}
                      >
                        Company
                      </span>
                      <ArrowDown
                        className={`arrow-div ${
                          openDropdown === "company" ? "rotate-up" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === "company" && (
                      <motion.div
                        className="res-company-dropdown-div"
                        custom={1}
                        variants={menuItemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                      >
                        <Link
                          href="/about-us"
                          className={`res-menu-dropdown-item ${
                            activeLink === "/about-us" ? "active-link" : ""
                          }`}
                          custom={1}
                          variants={menuItemVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.2 }}
                        >
                          About us
                        </Link>
                        {/* <Link
                          href="/news-events"
                          className={`res-menu-dropdown-item ${
                            activeLink === "/news-events" ? "active-link" : ""
                          }`}
                          custom={2}
                          variants={menuItemVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.2 }}
                        >
                          News & Events
                        </Link> */}

                        <Link
                          href="/events"
                          className={`res-menu-dropdown-item ${
                            activeLink === "/events" ? "active-link" : ""
                          }`}
                          custom={2}
                          variants={menuItemVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.2 }}
                        >
                          Events
                        </Link>
                        <Link
                          href="/careers"
                          className={`res-menu-dropdown-item ${
                            activeLink === "/careers" ? "active-link" : ""
                          }`}
                          custom={3}
                          variants={menuItemVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.2 }}
                        >
                          Careers
                        </Link>
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div variants={menuItemVariants} className="dropdown">
                    <button
                      className="res-menu-btn relative"
                      onClick={() => toggleDropdown("resources")}
                    >
                      <span
                        className={`nav-link ${
                          [
                            "/blogs",
                            "/case-study",
                            "/pr-news",
                            "/white-paper",
                            "/blogs-details",
                            "/case-study-details",
                            "/pr-news-details",
                            "/white-paper-details",
                          ].includes(activeLink)
                            ? "active-link"
                            : ""
                        }`}
                      >
                        Resources
                      </span>
                      <ArrowDown
                        className={`arrow-div ${
                          openDropdown === "resources" ? "rotate-up" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === "resources" && (
                      <motion.div
                        className="res-company-dropdown-div"
                        custom={1}
                        variants={menuItemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                      >
                        <Link
                          href="/blogs"
                          className={`res-menu-dropdown-item ${
                            activeLink === "/blogs" ? "active-link" : ""
                          }`}
                        >
                          Blogs
                        </Link>
                        <Link
                          href="/case-study"
                          className={`res-menu-dropdown-item ${
                            activeLink === "/case-study" ? "active-link" : ""
                          }`}
                        >
                          Case Study
                        </Link>
                        <Link
                          href="/pr-news"
                          className={`res-menu-dropdown-item ${
                            activeLink === "/pr-news" ? "active-link" : ""
                          }`}
                        >
                          PR & News
                        </Link>
                        {/* <Link
                          href="/white-paper"
                          className={`res-menu-dropdown-item ${
                            activeLink === "/white-paper" ? "active-link" : ""
                          }`}
                        >
                          White Paper
                        </Link> */}
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>
      <div
        className={`global-blur-overlay ${
          companyOpen || resourcesOpen || solutionOpen ? "active" : ""
        }`}
      />
    </>
  );
};

export default NavbarComponent;
