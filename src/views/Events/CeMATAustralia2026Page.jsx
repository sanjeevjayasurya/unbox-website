"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "./index.css";
import "./deliver.css";
import "./cemat.css";
import CommonButton from "../../components/common/CommonButton";
import AnimatedArrowButton from "../../components/common/AnimatedArrowButton";
import LogoScroller from "../../components/home/LogoScroller";
import { clientInfo } from "../../helpers/config";
import CalendarIcon from "./assets/calendar.svg";
import LocationIcon from "./assets/location.svg";
import {
  eventRobot,
  robot,
  rohit,
  shahid,
  cematAusLogo,
  cematAusHero,
  swapnil,
} from "./assets";
import { eventHeroImage, navLogo, unboxsort3 } from "../../helpers/assets";
import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import TextField from "../../components/common/form/TextField";
import { animation } from "../../helpers/utils";
import { base_url, eventFormApiEndPoint } from "../../helpers/config";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import { cematAustralia2026Schema } from "../../helpers/schemas";
import caseStudyVideo from "./assets/unbox-robot-cemat.mp4";
import SolutionOverviewVideo from "./assets/solution-overview.mp4";
import MotifRight from "../../assets/icons/MotifRight.svg";
import MotifeSwarm from "./assets/motif-swarm.svg";
import EventFloorRecap from "./EventFloorRecap";
import { cematRecap, isEventPast } from "./config";

const cematHero = process.env.PUBLIC_URL + "/images/cemat-australia-hero.webp";
/* NOTE: drop the real PDF at public/brochures/unboxsort-cemat-2026.pdf */
const cematBrochure =
  process.env.PUBLIC_URL + "/brochures/unboxsort-cemat-2026.pdf";

const ROHIT_CALENDAR =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0pI8NPvahKAmdluYiMD7PXEfSvM5oo0c1c9gTdTfgQIQTQyf5EjP2Epekk8Uj9kGUGHhLxr-eW";

/* ── Showcase workflow tags ── */
const showcaseWorkflows = [
  "Outbound",
  "Returns",
  "B2B consolidation",
  "Click & collect",
  "Carrier sortation",
];

/* ── Key Outcomes ── */
const keyOutcomes = [
  {
    lead: "2x Productivity Improvement",
  },
  {
    lead: "100% Sort Accuracy",
  },
  {
    lead: "Modular, Scalable Architecture",
  },
  {
    lead: "Deployment in 4 to 8 weeks",
  },
  {
    lead: "Seamless Integration",
  },
  {
    lead: "System-agnostic fleet Intelligence",
  },
  {
    lead: "15000+ PPH",
  },
];

/* ── Use-case cards ── */
// const brandsData = [
//   {
//     title: "Fulfillment Center Order Consolidation",
//     items: [
//       "High-speed consolidation for large order volumes",
//       "Accurate order grouping across multiple fulfillment waves",
//       "Scalable operations without increasing floor footprint",
//     ],
//   },
//   {
//     title: "Fulfillment Center Outbound Sortation",
//     items: [
//       "Consistent high-throughput outbound flows",
//       "Reliable on-time dispatch across multiple lanes",
//       "Rapid adaptation to changing dispatch requirements",
//     ],
//   },
//   {
//     title: "Fulfillment Center Click & Collect",
//     items: [
//       "Faster preparation for in-store pickup",
//       "Clear segregation of store-wise orders",
//       "Streamlined omnichannel fulfillment workflows",
//     ],
//   },
//   {
//     title: "Sort Center Mid-Mile Sortation",
//     items: [
//       "Stable throughput across varying load profiles",
//       "Flexible destination mapping as networks evolve",
//       "Compact sortation layouts suited for growing hubs",
//     ],
//   },
//   {
//     title: "Distribution Center Returns Sortation",
//     items: [
//       "Efficient classification of return parcels",
//       "Faster movement toward inspection, restocking, or redistribution",
//       "Improved visibility across reverse logistics flows",
//     ],
//   },
//   {
//     title: "B2B (Store) Order Fulfillment",
//     items: [
//       "Accurate store-wise order grouping",
//       "Reliable replenishment cycles",
//       "Scalable operations for expanding retail networks",
//     ],
//   },
//   {
//     title: "Delivery Hub Last-Mile Sortation",
//     items: [
//       "Route and pin-code-level sortation",
//       "Faster morning dispatch readiness",
//       "Improved delivery workforce productivity",
//     ],
//   },
// ];

const brandResults = [
  {
    category: "RETAIL",
    title: "Omnichannel Fashion Retailer",
    items: ["1,200 parcels/hour", "460 destinations", "1-month deployment"],
    note: "Fitted into a corridor where a conveyor couldn't.",
  },
  {
    category: "E-COMMERCE",
    title: "High-Growth E-commerce Marketplace",
    items: ["5,610 parcels/hour", "105 robots", "8-10 week deployment"],
    note: "Sustained through seasonal peaks.",
  },
  {
    category: "THIRD-PARTY LOGISTICS",
    title: "Global 3PL Provider",
    items: ["900 parcels/hour", "15 robots", "25%+ efficiency gain"],
    note: "Three associates run the floor.",
  },
];

/* ── Team ── */
const teamMembers = [
  {
    id: 1,
    name: "Rohit Pitale",
    post: "Co-founder & CGO",
    image: rohit,
    link: ROHIT_CALENDAR,
    tbd: false,
  },
  {
    id: 2,
    name: "Swapnil Jadhav",
    post: "Senior Manager - Sales",
    image: swapnil,
    link: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1ALLJddskCroDc6Q8bctuFhiNe1N9tbzKt6pKfYryJl0xzeGhpsr7IXurgYauiA-6wYUlMsmcz",
    tbd: false,
  },
];

const PUBLIC_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "aol.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
  "zoho.com",
  "yandex.com",
];

const contactSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z
    .string()
    .min(1, "Work Email is required")
    .email("Invalid Email")
    .refine((email) => {
      const domain = email.split("@")[1]?.toLowerCase();
      return !PUBLIC_EMAIL_DOMAINS.includes(domain);
    }, "Please use a business email address. Public email domains are not allowed."),
  company: z.string().optional(),
  preferredDate: z.string().min(1, "Preferred Date is required"),
});

const CeMATAustralia2026Page = () => {
  const [teamHoveredId, setTeamHoveredId] = useState(1);
  const [brandsSwiper, setBrandsSwiper] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      preferredDate: "June 23",
    },
  });

  // Past events don't take meeting bookings — hide every "Book A Meeting"
  // CTA and the booking form.
  const isPast = isEventPast("/events/cemat-australia-2026");

  const scrollToForm = (e) => {
    e.preventDefault();
    document
      .getElementById("book-meeting")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${base_url}${eventFormApiEndPoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, eventName: "CeMAT Australia 2026" }),
      });
      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Backend submission failed");
      }
      Swal.fire({
        title: "Success!",
        text: "Form submitted successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      reset();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to submit. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <HelmetWrapper
        title="CeMAT Australia 2026"
        description="Meet UnboxSort at CeMAT Australia 2026 — vertical robotic sortation for fulfillment, 3PL, and omnichannel DCs. Visit us at Booth IT24, MCEC Melbourne, June 23–25, 2026."
        image={eventRobot}
      />
      <SchemaMarkup schema={cematAustralia2026Schema} />

      {/* ── 1. HERO ── */}
      <section className="event-hero-container">
        <div className="de-hero">
          <img
            src={cematAusHero}
            alt="UnboxSort robots"
            className="de-hero-bg"
            fetchPriority="high"
            draggable={false}
          />
          <div className="de-hero-gradient" />
          <div
            className="de-hero-content">
            <div className="space-y-5">
              <div className="de-hero-title-wrap">
                <span className="de-hero-title-bar" />
                <h1 className="text-white res-font-48-extralight">
                  Meet UnboxSort at{" "}
                  <span className="font-semibold">CeMAT Australia 2026</span>
                </h1>
              </div>

              <p className="font-20-light text-white max-w-[640px]">
                Built to fit where conveyors can&apos;t. Vertical parcel
                sortation up to 2.4 m.
              </p>
            </div>

            <div className="de-hero-meta">
              <div className="de-hero-meta-row">
                <div className="de-hero-icon-circle">
                  <CalendarIcon fill="#079D92" width={34} height={34} />
                </div>
                <span className="font-24-light text-white">
                  23 – 25 , June 2026
                </span>
              </div>
              <div className="de-hero-meta-row">
                <div className="de-hero-icon-circle">
                  <LocationIcon stroke="#079D92" width={34} height={34} />
                </div>
                <span className="font-24-light text-white">
                  Booth IT24 &nbsp;|&nbsp; MCEC Melbourne
                </span>
              </div>
            </div>

            {!isPast && (
              <div className="flex gap-5 flex-wrap">
                <a href="#book-meeting" onClick={scrollToForm}>
                  <CommonButton theme="green" title="Book A Meeting" />
                </a>
              </div>
            )}

            <div className="de-hero-logos-bar">
              <div className="flex items-center gap-1">
                <img
                  src={navLogo}
                  alt="Unbox Robotics icon"
                  className=" h-[88px] max-[567px]:h-[40px] bg-white p-2"
                  draggable={false}
                />
              </div>
              <div className="de-logos-divider max-[567px]:!h-[40px]" />
              <img
                src={cematAusLogo}
                alt="Deliver Europe"
                className="h-[88px] max-[567px]:h-[40px] w-auto"
                width={211}
                height={74}
                draggable={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 1b. POST-EVENT RECAP (moments / stats / resources) ── */}
      <EventFloorRecap data={cematRecap} />

      {/* ── 2. WHAT WE ARE SHOWCASING ── */}
      <section className="de-section ">
        <div className="flex flex-col gap-5">
          <h2
            className="font-40-regular color-black-1 text-center">
            What We Are Showcasing UnboxSort
          </h2>
          <p
            className="font-16-light color-grey-1 text-center"
            style={{ maxWidth: 800, margin: "0 auto" }}>
            The world&apos;s first vertical robotic sortation system, delivering
            50–70% space optimization. A fleet of compact mobile robots sorts
            parcels into high-density racks, built for e-commerce, 3PL, and
            omnichannel fulfillment centers.
          </p>

          <div
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {showcaseWorkflows.map((workflow, i) => (
              <div key={i} className="flex items-center gap-x-4">
                <p className="font-20-semibold color-black-1">{workflow}</p>
                {i < showcaseWorkflows.length - 1 && (
                  <span className="font-20-light text-[var(--green-2)]">|</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          className="industry-case-study-image-wrap">
          <video
            src={caseStudyVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            draggable={false}
            className="industry-case-study-image"
          />
        </div>
      </section>

      {/* ── 3. KEY OUTCOMES ── */}
      <section className="de-section">
        <h2
          className="font-40-regular color-black-1 text-center">
          Key Outcomes
        </h2>

        <div
          className="cemat-outcomes-grid">
          {keyOutcomes.map((item, i) => (
            <div
              key={i}
              className={`cemat-outcome-item cemat-outcome-item--${i}`}>
              <span className="font-24-medium color-green-1 cemat-outcome-lead text-center">
                {item.lead.startsWith("2x") ? (
                  <>
                    <i className="italic">2x</i>
                    {item.lead.slice(2)}
                  </>
                ) : (
                  item.lead
                )}
              </span>
              {/* <p className="font-24-light color-black-1">{item.rest}</p> */}
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. SWARM INTELLIGENCE ── */}
      <section className="de-section">
        <div className="de-showcase-split">
          <div
            className="de-showcase-half-img-wrap">
            <video
              src={SolutionOverviewVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              draggable={false}
              className="de-showcase-half-img"
            />
          </div>

          <div
            className="de-swarm-card">
            <div className="flex  justify-between ">
              <p className="font-16-light color-black-1 uppercase">
                Powered By
              </p>

              <MotifeSwarm className="h-[100px] max-sm:h-[80px] mt-3" />
            </div>
            <div className="space-y-5">
              <h3 className="font-40-regular text-[var(--green-2)]">
                Swarm Intelligence
              </h3>

              <p className="font-16-light color-black-1">
                No central controller. No fixed paths. No bottlenecks.
              </p>
              <p className="font-16-light color-black-1">
                Each robot operates autonomously and coordinates locally with
                the fleet, so there is no central controller to fail and no
                fixed conveyor paths to congest. If a robot is taken offline or
                a destination fills, the system reallocates routes automatically
                and maintains throughput. Capacity scales by adding robots, with
                no changes to the building or the host systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. LIVE WITH LEADING BRANDS ── */}
      <section className="de-section-2">
        <div className="flex flex-col gap-5">
          <h2
            className="font-40-regular color-black-1 text-center">
            Proven in Operations
          </h2>
          <p
            className="font-16-light color-grey-1 text-center"
            style={{ maxWidth: 700, margin: "0 auto" }}>
            Operating across Europe, USA and Asia for retailers, marketplaces,
            and 3PLs. Now at CeMAT Australia.
          </p>
        </div>

        <div className="de-scroller-breakout">
          <LogoScroller clients={clientInfo} speed="fast" />
        </div>

        {/* <div
          className="de-brands-cards-wrap">
          <Swiper
            modules={[Navigation, FreeMode]}
            loop={true}
            freeMode={true}
            slidesPerView={"auto"}
            spaceBetween={16}
            onSwiper={setBrandsSwiper}
            className="cemat-brands-swiper">
            {brandsData.map((brand, i) => (
              <SwiperSlide key={i} className="cemat-brand-slide">
                <div className="cemat-brand-card">
                  <p className="font-20-medium text-[var(--green-2)]">
                    {brand.title}
                  </p>
                  <div className="flex flex-col gap-3">
                    <p className="font-20-medium color-black-1">
                      What UnboxSort Enables
                    </p>
                    <div className="cemat-brand-list">
                      {brand.items.map((item, j) => (
                        <div key={j} className="cemat-brand-list-item">
                          <p className="font-16-light color-black-1">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex gap-[12px] justify-center mt-6">
            <AnimatedArrowButton
              direction="up-right"
              onClick={() => brandsSwiper?.slidePrev()}
            />
            <AnimatedArrowButton
              direction="down-left"
              onClick={() => brandsSwiper?.slideNext()}
            />
          </div>
        </div> */}

        <div
          className="de-brands-cards-wrap cemat-results-grid">
          {brandResults.map((brand, i) => (
            <div key={i} className="cemat-brand-card">
              <div className="flex flex-col gap-6">
                <p className="font-14-semibold text-[var(--green-2)] uppercase tracking-wider">
                  {brand.category}
                </p>
                <p className="font-20-medium color-black-1">{brand.title}</p>
                <div className="cemat-brand-list">
                  {brand.items.map((item, j) => (
                    <div key={j} className="cemat-brand-list-item">
                      <MotifRight className="cemat-brand-list-icon" />
                      <p className="font-16-light color-black-1">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="font-16-light color-black-1">{brand.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. MEET THE TEAM ── */}
      <section className="de-section">
        <h2
          className="font-40-regular color-black-1 text-center">
          Meet the Team
        </h2>

        <div
          className="flex flex-col lg:flex-row lg:min-h-[700px] items-center justify-center gap-8 lg:gap-4">
          {teamMembers.map((member) => {
            const isHovered = teamHoveredId === member.id;

            return (
              <div
                key={member.id}
                onMouseEnter={() => setTeamHoveredId(member.id)}
                onMouseLeave={() => setTeamHoveredId(null)}
                className={`relative transition-all max-w-[480px] bg-[#F3F3F3] duration-500 ease-in-out cursor-pointer rounded-[20px] p-4 flex flex-col items-center w-full
                   max-lg:scale-100 max-lg:bg-[#F3F3F3]`}>
                <div
                  className={`w-full overflow-hidden rounded-[10px] mb-6 max-h-[500px] max-[768px]:max-h-[350px] ${
                    member.tbd ? "cemat-team-tbd" : ""
                  }`}>
                  <img
                    src={member.image}
                    alt={member.tbd ? "To be announced" : member.name}
                    draggable={false}
                  />
                </div>

                <div className="text-left w-full space-y-2">
                  <h3 className="font-24-light">{member.name}</h3>
                  <p className="font-16-light">{member.post}</p>
                </div>

                {!isPast && member.link && (
                  <div
                    className={`w-full overflow-hidden transition-all duration-500
                    ${isHovered ? "mt-6 max-h-20 opacity-100" : "lg:max-h-0 lg:opacity-0"}
                    max-lg:max-h-20 max-lg:opacity-100 max-lg:mt-6`}>
                    <a href={member.link} target="__blank">
                      <CommonButton theme={"green"} title={"Book a Meeting"} />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 7. BOOK A MEETING (upcoming events only) ── */}
      {!isPast && (
      <section className="de-section" id="book-meeting">
        <div className="cemat-booking">
          <div
            className="cemat-booking-left">
            <div className="space-y-3">
              <h2 className="font-40-semibold uppercase text-[#141313]">
                Book a Meeting at{" "}
                <span className="text-[#00A99D]">Booth IT24</span>
              </h2>
              <p className="font-16-light color-grey-1">
                See UnboxSort in action and map it to your operation. 15-minute
                slots, 23 to 25 June, MCEC Melbourne.
              </p>
            </div>
            <div className="flex gap-5 flex-wrap">
              <div className="flex-1 flex gap-3 items-center">
                <div className="p-3 rounded-[20px] bg-[#079D921A] border border-[#F3F3F3] flex justify-center items-center">
                  <CalendarIcon fill="#079D92" />
                </div>
                <div className="space-y-[6px]">
                  <p className="font-20-light text-[#141313]">June 23 - 25</p>
                  <p className="font-16-medium text-[#079D92]">2026</p>
                </div>
              </div>
              <div className="flex-1 flex gap-3 items-center">
                <div className="p-3 rounded-[20px] bg-[#079D921A] border border-[#F3F3F3] flex justify-center items-center">
                  <LocationIcon stroke="#079D92" />
                </div>
                <div className="space-y-[6px]">
                  <p className="font-20-light text-[#141313]">MCEC Melbourne</p>
                  <p className="font-16-medium text-[#079D92]">Australia</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="cemat-booking-right">
            <form onSubmit={handleSubmit(onSubmit)} className="event-form">
              <div className="input-row">
                <TextField
                  label="First Name"
                  name="firstName"
                  required
                  register={register}
                  error={errors.firstName?.message}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  required
                  register={register}
                  error={errors.lastName?.message}
                />
              </div>
              <TextField
                label="Work Email"
                name="email"
                required
                register={register}
                error={errors.email?.message}
              />
              <TextField
                label="Company"
                name="company"
                register={register}
                error={errors.company?.message}
              />
              <div className="date-selector-container">
                <p className="font-14-regular color-black-1">
                  Select Preferred Date
                  <span className="text-[#DC2743]">*</span>
                </p>
                <Controller
                  name="preferredDate"
                  control={control}
                  render={({ field }) => (
                    <div className="date-cards">
                      {[
                        { date: "June 23", day: "Tuesday" },
                        { date: "June 24", day: "Wednesday" },
                        { date: "June 25", day: "Thursday" },
                      ].map((item) => (
                        <div
                          key={item.date}
                          className={`date-card ${field.value === item.date ? "active" : ""}`}
                          onClick={() => field.onChange(item.date)}>
                          <p className="card-date">{item.date}</p>
                          <p className="card-day">{item.day}</p>
                        </div>
                      ))}
                    </div>
                  )}
                />
                {errors.preferredDate && (
                  <p className="error-message">
                    {errors.preferredDate.message}
                  </p>
                )}
              </div>
              <div className="self-center">
                <CommonButton
                  title={isSubmitting ? "Submitting..." : "Book A Meeting"}
                  theme={"green"}
                  type="submit"
                  disabled={isSubmitting}
                />
              </div>
            </form>
          </div>
        </div>
      </section>
      )}

      {/* ── 8. DARK BOOTH CTA (upcoming events only) ── */}
      {!isPast && (
        <div
          className="de-booth-cta">
          <p
            className="font-40-regular"
            style={{ color: "#fff", textAlign: "center" }}>
            Booth IT24 &nbsp;|&nbsp; CeMAT Australia &nbsp;|&nbsp; 23 – 25 June
            &nbsp;|&nbsp; MCEC Melbourne
          </p>
          <a href="#book-meeting" onClick={scrollToForm}>
            <CommonButton theme="white" title="Book A Meeting" />
          </a>
        </div>
      )}
    </>
  );
};

export default CeMATAustralia2026Page;
