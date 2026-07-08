"use client";

import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./index.css";
import CommonButton from "../../components/common/CommonButton";
import {
  base_url,
  contactApiEndPoint,
  frontendUrl,
  locationQuestion,
  sfOrgId,
} from "../../helpers/config";
import { animation } from "../../helpers/utils";
import TextField from "../../components/common/form/TextField";
import DropdownField from "../../components/common/form/DropdownField";
import TextAreaField from "../../components/common/form/TextAreaField";
import PhoneNumberField from "../../components/common/form/PhoneNumberField";
import ChipSelectField from "../../components/common/form/ChipSelectField";
import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import Swal from "sweetalert2";
import HumanGate from "../../components/HumanGate";
import CheckboxField from "../../components/common/form/CheckboxField";
import Link from "next/link";
import { getInTouchSchema } from "../../helpers/schemas";


const hearAboutUsOptions = [
  "Social Media",
  "Google Search",
  "Word of Mouth",
  "Event / Conference",
  "Other",
];

const contactSchema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    emailId: z
      .string()
      .email("Invalid Email ID")
      .min(1, "Email ID is required"),
    phoneNumber: z.object({
      number: z
        .string()
        .min(8, "Number is too short")
        .max(15, "Number is too long"),
      callingCode: z.string().min(1, "Required"),
      code: z.string().min(1, "Required"),
    }),
    company: z.string().min(1, "Company is required"),
    inquiringFor: z.string().min(1, "Please select a reason"),
    hearAboutUs: z.string().min(1, "Please select an option"),
    hearAboutUsOther: z.string().optional(),
    howCanWeHelpYou: z
      .string()
      .min(10, "Message must be at least 10 characters"),
    consent: z.literal(true, {
      errorMap: () => ({
        message: "Please agree to the terms and conditions.",
      }),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.hearAboutUs === "Other" && !data.hearAboutUsOther?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["hearAboutUsOther"],
        message: "Please tell us where you found us",
      });
    }
  });

const GetInTouch = () => {
  const sfFormRef = useRef(null); // Reference for the hidden Salesforce form
  const router = useRouter();

  const dropdownOptions = locationQuestion.map((item) => ({
    value: item.answer,
    label: item.answer,
  }));

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailId: "",
      phoneNumber: { number: "", callingCode: "+91", code: "IN" },
      company: "",
      inquiringFor: "",
      hearAboutUs: "",
      hearAboutUsOther: "",
      howCanWeHelpYou: "",
      consent: false,
    },
  });

  const [isHumanVerified, setIsHumanVerified] = React.useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = async (data) => {
    try {
      // 1. Submit to your Backend API first
      const res = await fetch(`${base_url}${contactApiEndPoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Backend submission failed");
      }

      // 2. SUCCESS! Now trigger the Salesforce Hidden Form
      // We manually populate the hidden form fields before submitting
      const form = sfFormRef.current;
      form.querySelector('input[name="first_name"]').value = data.firstName;
      form.querySelector('input[name="last_name"]').value = data.lastName;
      form.querySelector('input[name="email"]').value = data.emailId;
      form.querySelector('input[name="company"]').value = data.company;
      form.querySelector('input[name="phone"]').value =
        `${data.phoneNumber.callingCode}${data.phoneNumber.number}`;
      form.querySelector('input[name="00N2w00000O02KC"]').value =
        data.inquiringFor;
      form.querySelector('textarea[name="00N2w00000MXdPP"]').value =
        data.howCanWeHelpYou;

      // This performs a real browser POST just like your working HTML file
      form.submit();

      // Navigate to success page instead of showing Swal.fire
      router.push("/thank-you");

      reset();
      // setIsHumanVerified(false);
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
        title="Get In Touch"
        description="Ready to transform your logistics?"
      />
            <SchemaMarkup schema={getInTouchSchema} />
<div className="main-div-2">
        <div
          className="title-main-div">
          <h1
            className="font-40-regular color-white">
            Get In Touch
          </h1>

          <p
            className="font-16-light color-white text-center">
            Ready to transform your logistics? Contact our team for pricing, a
            custom consultation, or to schedule a live system demonstration.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="input-main-div">
          {/* Input Rows (Keep your existing TextField/DropdownField components) */}
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

          <div className="input-row">
            <div className="flex-1">
              <TextField
                label="Email Id"
                name="emailId"
                required
                register={register}
                error={errors.emailId?.message}
              />
            </div>
            <div className="flex-1">
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <PhoneNumberField
                    label="Phone Number"
                    required
                    field={field}
                    error={errors.phoneNumber}
                  />
                )}
              />
            </div>
          </div>

          <div className="input-row">
            <TextField
              label="Company"
              name="company"
              required
              register={register}
              error={errors.company?.message}
            />
            <Controller
              name="inquiringFor"
              control={control}
              render={({ field }) => (
                <DropdownField
                  label="Inquiring For"
                  required
                  options={dropdownOptions}
                  field={field}
                  error={errors.inquiringFor?.message}
                />
              )}
            />
          </div>

          <Controller
            name="hearAboutUs"
            control={control}
            render={({ field }) => (
              <div className="hear-about-us-group">
                <ChipSelectField
                  label="Where did you find about us?"
                  required
                  options={hearAboutUsOptions}
                  value={field.value}
                  onChange={(val) => {
                    field.onChange(val);
                    if (val !== "Other") setValue("hearAboutUsOther", "");
                  }}
                  error={errors.hearAboutUs?.message}
                />
                {field.value === "Other" && (
                  <TextField
                    label="Please specify"
                    name="hearAboutUsOther"
                    required
                    register={register}
                    error={errors.hearAboutUsOther?.message}
                    placeholder="Tell us where you found us"
                  />
                )}
              </div>
            )}
          />

          <TextAreaField
            label="How Can We Help You?"
            name="howCanWeHelpYou"
            required
            register={register}
            error={errors.howCanWeHelpYou?.message}
          />

          {/* <HumanGate
            variant="compact"
            persist={false}
            onVerify={setIsHumanVerified}
          /> */}

          <div className="checkbox-error-div">
            <Controller
              name="consent"
              control={control}
              render={({ field }) => (
                <CheckboxField
                  checked={field.value}
                  onChange={() => field.onChange(!field.value)}
                  error={!!errors.consent}
                  label={
                    <>
                      By using this website and submitting your information, you
                      consent to the collection, processing, (marketing -
                      optional), and storage of your personal data in accordance
                      with our{" "}
                      <Link
                        className="underline"
                        href="/privacy-policy"
                        target="_blank">
                        Privacy Policy
                      </Link>
                      . Your data will be used solely for the purposes stated
                      and will not be shared with third parties without your
                      explicit consent. You have the right to access, correct,
                      or request deletion of your personal data at any time.
                    </>
                  }
                />
              )}
            />
          </div>

          <div className="common-btn-div">
            <CommonButton
              title={isSubmitting ? "Submitting..." : "Submit"}
              theme={isSubmitting || !isHumanVerified ? "white" : "green"}
              type="submit"
              disabled={isSubmitting || !isHumanVerified}
            />
          </div>
        </form>
      </div>

      {/* --- HIDDEN SALESFORCE FORM (Matches your working HTML) --- */}
      <form
        ref={sfFormRef}
        action={`https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=${sfOrgId}`}
        method="POST"
        style={{ display: "none" }}
        target="sf_hidden_iframe">
        <input type="hidden" name="oid" value={sfOrgId} />
        <input
          type="hidden"
          name="retURL"
          value={`${frontendUrl}/get-in-touch`}
        />

        {/* Debug fields - helpful during testing */}
        {/* <input type="hidden" name="debug" value="1" />
        <input type="hidden" name="debugEmail" value="eshika.durgani@unboxrobotics.com" /> */}

        <input type="text" name="first_name" />
        <input type="text" name="last_name" />
        <input type="text" name="email" />
        <input type="text" name="phone" />
        <input type="text" name="company" />
        <input type="text" name="00N2w00000O02KC" />
        <textarea name="00N2w00000MXdPP"></textarea>
      </form>

      {/* Hidden Iframe for silent submission */}
      <iframe
        name="sf_hidden_iframe"
        id="sf_hidden_iframe"
        style={{ display: "none" }}
        title="Salesforce Submission Hidden Frame"></iframe>
    </>
  );
};

export default GetInTouch;
