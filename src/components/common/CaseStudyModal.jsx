"use client";

import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Close from "../../assets/icons/Close_SM.svg";
import CommonButton from "./CommonButton";
import WhitePaperCalendar from "../../assets/icons/whitePaperCalendar.svg";
import TextField from "./form/TextField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import {
  base_url,
  casestudyDownloadApiEndPoint,
  resolveMediaUrl,
  whitePaperDownloadApiEndPoint,
} from "../../helpers/config";
import Swal from "sweetalert2";
import HumanGate from "../HumanGate";

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

const schema = z.object({
  firstName: z.string().min(1, "First Name is required").trim(),
  lastName: z.string().min(1, "Last Name is required").trim(),
  emailId: z
    .string()
    .min(1, "Email Id is required")
    .email("Invalid email format")
    .refine((email) => {
      const domain = email.split("@")[1]?.toLowerCase();
      return !PUBLIC_EMAIL_DOMAINS.includes(domain);
    }, "Please use a business email address. Public email domains are not allowed.")
    .trim(),
  company: z.string().min(1, "Company Name is required").trim(),
});

const CaseStudyModal = ({
  visible,
  onClose,
  title,
  slug,
  buttonText = "",
  type = "casestudy",
  pdfUrl = "",
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isHumanVerified, setIsHumanVerified] = React.useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        reset();
        setIsHumanVerified(false);
      }, 300);
    } else {
      setIsHumanVerified(true);
    }
  }, [visible, reset]);

  const handleClose = () => {
    onClose();
  };

  const downloadPdf = () => {
    if (pdfUrl) {
      const pdf_link = resolveMediaUrl(pdfUrl);
      const link = document.createElement("a");
      link.href = pdf_link;
      link.download = `${title || "case-study"}.pdf`;
      link.target = "_blank";
      link.click();
    } else {
      alert("PDF not available for download.");
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      let endpoint = "";
      let payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        emailId: data.emailId,
        companyName: data.company || "",
      };

      if (type === "whitepaper") {
        endpoint = `${base_url}${whitePaperDownloadApiEndPoint}`;
        payload.whitePaperSlug = slug;
      } else {
        endpoint = `${base_url}${casestudyDownloadApiEndPoint}`;
        payload.caseStudySlug = slug;
      }

      const response = await axios.post(endpoint, payload);

      if (response.data.success) {
        // Swal.fire({
        //   icon: "success",
        //   title: "Success",
        //   text:
        //     response.data.message || "Download request processed successfully",
        //   confirmButtonColor: "#079D92",
        // });

        reset();
        onClose();
        downloadPdf();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "Something went wrong",
          confirmButtonColor: "#079D92",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          "Something went wrong. Please try again later.",
        confirmButtonColor: "#079D92",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      show={visible}
      onHide={handleClose}
      dialogClassName="common-modal"
      contentClassName="modal-content !bg-transparent !border-0"
      backdropClassName="custom-backdrop"
      keyboard={true}
      backdrop={true}
      scrollable={false}
      animation={false}>
      
        {visible && (
          <div
            className="modal-main overflow-visible bg-white rounded-lg">
            <div className="modal-header-div">
              <div className="flex flex-row gap-2 items-center">
                <div className="p-[12px] bg-[#079D921A] rounded-full">
                  <WhitePaperCalendar />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-20-medium color-black-1">{title}</p>
                  <p className="font-light text-[10px] text-[#818382]">
                    Fill in your details to download
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="cursor-pointer bg-transparent border-0 p-0"
                aria-label="Close modal">
                <Close stroke="black" aria-hidden="true" />
              </button>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-10">
              <div className="modal-form-div">
                <div className="modal-input-div">
                  <div className="flex-1">
                    <TextField
                      label="First Name"
                      name="firstName"
                      required
                      register={register}
                      error={errors.firstName?.message}
                      placeholder="Enter First Name"
                    />
                  </div>
                  <div className="flex-1">
                    <TextField
                      label="Last Name"
                      name="lastName"
                      required
                      register={register}
                      error={errors.lastName?.message}
                      placeholder="Enter Last Name"
                    />
                  </div>
                </div>
                <div className="modal-input-div">
                  <div className="w-full">
                    <TextField
                      label="Email Id"
                      name="emailId"
                      required
                      register={register}
                      error={errors.emailId?.message}
                      placeholder="Enter Email Id"
                    />
                  </div>
                </div>
                <div className="modal-input-div">
                  <div className="w-full">
                    <TextField
                      label="Company Name"
                      name="company"
                      required
                      register={register}
                      error={errors.company?.message}
                      placeholder="Enter Company Name"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 items-center">
                <div className="flex flex-row p-4 items-center bg-[#EFEFEF] rounded-[12px]">
                  <p className="font-regular text-[12px] text-[#818382]">
                    By providing your details, you consent to our Privacy Policy
                    and agree to receive relevant industry insights and updates.
                    You reserve the right to withdraw your consent and
                    unsubscribe at any time.
                  </p>
                </div>

                {/* <HumanGate
                  variant="compact"
                  persist={false}
                  onVerify={setIsHumanVerified}
                /> */}

                <div className="flex items-center justify-center">
                  <CommonButton
                    title={isSubmitting ? "Submitting..." : buttonText}
                    type="submit"
                    theme={
                      !isValid || isSubmitting || !isHumanVerified
                        ? "white"
                        : "green"
                    }
                    disabled={!isValid || isSubmitting || !isHumanVerified}
                  />
                </div>
              </div>
            </form>
          </div>
        )}
      
    </Modal>
  );
};

export default React.memo(CaseStudyModal);
