"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./index.css";
import CommonButton from "../../components/common/CommonButton";
import CalendarIcon from "./assets/calendar.svg";
import LocationIcon from "./assets/location.svg";
import AccurateIcon from "./assets/accurate.svg";
import ScalableIcon from "./assets/scalable.svg";
import ModularIcon from "./assets/modular.svg";
import LogimatIcon from "../../assets/icons/logimet.svg";
import { eventRobot, robot } from "./assets";
import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import TextField from "../../components/common/form/TextField";
import { animation } from "../../helpers/utils";
import { experts, isEventPast } from "./config";
import { base_url, eventFormApiEndPoint } from "../../helpers/config";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import { logimat2026Schema } from "../../helpers/schemas";

const logimatHeroImage = process.env.PUBLIC_URL + "/images/logimat-hero.webp";

const contactSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid Email").min(1, "Email is required"),
  company: z.string().optional(),
  preferredDate: z.string().min(1, "Preferred Date is required"),
});

const EventPage = () => {
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
      preferredDate: "March 24",
    },
  });

  const [hoveredId, setHoveredId] = useState(2);
  const isPast = isEventPast("/events/logimat2026");

  const scrollToForm = (e) => {
    e.preventDefault();
    const element = document.getElementById("book-meeting");
    if (element) {
      element.scrollIntoView();
    }
  };

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${base_url}${eventFormApiEndPoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, eventName: "LogiMAT 2026" }),
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
        title="LogiMAT 2026"
        description="Experience a complete, automated parcel workflow. This year, we’re showcasing the full journey: from Delta robotic induction to UnboxSort’s 3D vertical sortation and seamless, conveyor-integrated dispatch."
        image={eventRobot}
      />
            <SchemaMarkup schema={logimat2026Schema} />
<div
        className="event-section-1">
        <div
          className="event-section-1-left">
          <div className="flex flex-col gap-4">
            <LogimatIcon />
            <h1 className="font-48-extra-light text-[#141313]">
              Unbox Robotics at <br />
              <span className="font-semibold text-[#00A99D]">
                LogiMAT 2026
              </span>
            </h1>
          </div>

          <p className="font-20-extra-light text-[#141313] !leading-[160%]">
            Experience a complete, automated parcel workflow. This year, we’re
            showcasing the full journey: from Delta robotic induction to
            UnboxSort’s 3D vertical sortation and seamless,
            conveyor-integrated dispatch.
          </p>
          {!isPast && (
            <a href="#book-meeting" onClick={scrollToForm}>
              <CommonButton theme={"green"} title={"Book A Meeting"} />
            </a>
          )}
          <div className="flex gap-5 flex-wrap">
            <div className="flex-1 p-4 bg-white rounded-[20px] border border-[#E4E4E4] flex gap-3 items-center">
              <CalendarIcon fill="#141313" />
              <div className="space-y-[6px]">
                <p className="font-20-light text-[#141313]">March 24 - 26</p>
                <p className="font-16-medium text-[#079D92]">2026</p>
              </div>
            </div>
            <div className="flex-1 p-4 bg-white rounded-[20px] border border-[#E4E4E4] flex gap-3 items-center">
              <LocationIcon stroke="#141313" />
              <div className="space-y-[6px]">
                <p className="font-20-light text-[#141313]">Stuttgart</p>
                <p className="font-16-medium text-[#079D92]">Germany</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="event-section-1-right flex-1">
          <img
            src={logimatHeroImage}
            alt="UnboxSort robot at LogiMAT 2026"
            className="common-img"
            fetchPriority="high"
            draggable={false}
          />
        </div>
      </div>
      <div
        className="event-section-2">
        <div className="flex flex-col gap-10 items-center  mx-auto w-full max-w-[1000px] py-6">
          <div className="max-w-[800px] space-y-5">
            <h2
              className="font-40-regular text-[#141313] text-center">
              From Induction to Dispatch,
              <br /> See Intelligent Parcel Flow in Action!{" "}
            </h2>
          </div>
        </div>
        <div className="event-section-2-inner">
          <div
            className="event-section-2-inner-image">
            <img
              src={robot}
              alt="UnboxSort robotic sortation demo at LogiMAT 2026"
              className="w-full h-full object-cover object-left-bottom"
              draggable={false}
            />
          </div>
          <div
            className="p-12 max-lg:p-8 max-md:p-5 min-w-[600px] max-lg:min-w-[290px] flex-1 bg-[#F3F3F3] rounded-[32px] max-md:rounded-[20px] flex flex-col gap-10 justify-between">
            <div className="space-y-10">
              <p className="font-40-light text-[#141313]">
                If you're navigating the complexities of modern fulfillment,
                we'd love to show you what we've been working on. Come see the
                full workflow, live and running.
              </p>

              <div
                className="flex justify-between gap-3 flex-wrap w-full">
                <div className="bg-[#F3F3F3]  flex items-center gap-4">
                  <ScalableIcon />
                  <span className="font-20-medium text-[#141313]">
                    Scalable
                  </span>
                </div>
                <div className="bg-[#F3F3F3]  flex items-center gap-4">
                  <ModularIcon />
                  <span className="font-20-medium text-[#141313]">
                    Modular{" "}
                  </span>
                </div>
                <div className="bg-[#F3F3F3]  flex items-center gap-4">
                  <AccurateIcon />
                  <span className="font-20-medium text-[#141313]">
                    Accurate{" "}
                  </span>
                </div>
              </div>
            </div>
            <Link href={"/solutions-unbox-sort"} className="self-end">
              <CommonButton theme={"green"} title={"Learn more"} />
            </Link>
          </div>
        </div>
      </div>

      <div
        className="event-section-3">
        <div className="flex flex-col gap-[14px] md:gap-[20px] max-w-[800px] mx-auto">
          <h1
            className="font-40-regular color-black-1 text-center">
            Meet Our Experts at Hall 8 | Stand 8A37
          </h1>
          <p
            className="font-16-light color-grey-1 text-center">
            Connect with our experts to see how UnboxSort scales your
            operations intelligently.
          </p>
        </div>
        <div
          className="flex flex-col lg:flex-row lg:min-h-[700px] items-center justify-center gap-8 lg:gap-4">
          {experts.map((expert) => {
            const isHovered = hoveredId === expert.id;

            return (
              <div
                key={expert.id}
                onMouseEnter={() => setHoveredId(expert.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative transition-all bg-[#F3F3F3] duration-500 ease-in-out cursor-pointer rounded-[20px] p-4 flex flex-col items-center w-full max-w-sm lg:max-w-none
                  ${isHovered ? "bg-[#F3F3F3]" : "lg:grayscale  lg:opacity-80"} 
                  /* Below 1024px: Forced Active State */
                  max-lg:grayscale-0 max-lg:scale-100 max-lg:bg-[#F3F3F3] `}>
                <div className="w-full overflow-hidden rounded-[10px] mb-6 max-h-[500px] ">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className=""
                    width={420}
                    height={630}
                    draggable={false}
                  />
                </div>

                <div className="text-left w-full space-y-2">
                  <h3 className="font-24-light">{expert.name}</h3>
                  <p className="font-16-light">{expert.post}</p>
                </div>

                {!isPast && (
                  <div
                    className={` w-full overflow-hidden transition-all duration-500
                  ${isHovered ? "mt-6 max-h-20 opacity-100 " : "lg:max-h-0 lg:opacity-0"}
                  /* Ensure visibility on mobile regardless of hover */
                  max-lg:max-h-20 max-lg:opacity-100 max-lg:mt-6
                `}>
                    <a href={expert?.link} target="__blank">
                      <CommonButton
                        theme={"green"}
                        title={"Schedule a Meeting"}
                      />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {!isPast && (
      <div
        className="event-section-4">
        <div
          className="flex-1 space-y-[60px] max-lg:space-y-[40px] max-md:space-y-[20px]"
          id="book-meeting">
          <h1 className="font-40-semibold uppercase text-[#141313]">
            Meet Our Experts at <br />
            <span className="text-[#00A99D]">Hall 8 | Stand 8A37</span>
          </h1>
          <div className="flex gap-5 flex-wrap">
            <div className="flex-1  flex gap-3 items-center">
              <div className="p-3 rounded-[20px] bg-[#079D921A] border border-[#F3F3F3] flex justify-center items-center">
                <CalendarIcon fill="#079D92" />
              </div>
              <div className="space-y-[6px]">
                <p className="font-20-light text-[#141313]">March 24 - 26</p>
                <p className="font-16-medium text-[#079D92]">2026</p>
              </div>
            </div>
            <div className="flex-1  flex gap-3 items-center">
              <div className="p-3 rounded-[20px] bg-[#079D921A] border border-[#F3F3F3] flex justify-center items-center">
                <LocationIcon stroke="#079D92" />
              </div>
              <div className="space-y-[6px]">
                <p className="font-20-light text-[#141313]">Stuttgart</p>
                <p className="font-16-medium text-[#079D92]">Germany</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex-1">
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
                      { date: "March 24", day: "Tuesday" },
                      { date: "March 25", day: "Wednesday" },
                      { date: "March 26", day: "Thursday" },
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
      )}
    </>
  );
};

export default EventPage;
