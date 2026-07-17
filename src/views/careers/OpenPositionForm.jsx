"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import "./index.css";
import axios from "axios";
import { z } from "zod";
import { base_url } from "../../helpers/config";
import { useJob } from "../../hooks/useJobs";
import JobHeader from "./JobHeader";
import CommonButton from "../../components/common/CommonButton";
import CommonDropdown from "../../components/common/CommonDropdown";
import TextField from "../../components/common/form/TextField";
import FileUpload from "../../components/common/form/FileUpload";
import CheckboxField from "../../components/common/form/CheckboxField";
import PhoneNumberField from "../../components/common/form/PhoneNumberField";
import DateField from "../../components/common/form/DateField";
import Loader from "../../components/common/Loader";

const CURRENCIES = ["INR", "USD", "EUR", "GBP", "AED", "AUD", "SGD", "CAD"].map(
  (c) => ({ label: c, value: c }),
);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\d{7,15}$/;

// Initial empty value for a field, based on its composite widget.
const emptyValue = (widget) => {
  switch (widget) {
    case "phone":
      return { code: "IN", callingCode: "+91", number: "" };
    case "salary":
      return { currency: "INR", amount: "" };
    case "experience":
      return { years: "", months: "" };
    default:
      return "";
  }
};

// Build a zod schema dynamically from the Keka application fields.
const buildSchema = (fields) => {
  const shape = {};
  fields.forEach((f) => {
    const reqMsg = "This field is required";
    let s;
    switch (f.widget) {
      case "phone": {
        const num = z
          .string()
          .regex(PHONE_RE, "Enter a valid phone number");
        s = z.object({
          code: z.string().optional(),
          callingCode: z.string().optional(),
          number: f.required ? num : num.or(z.literal("")),
        });
        break;
      }
      case "salary": {
        const amt = f.required
          ? z.string().min(1, reqMsg)
          : z.string().optional();
        s = z.object({ currency: z.string(), amount: amt });
        break;
      }
      case "experience": {
        const yrs = f.required
          ? z.string().min(1, reqMsg)
          : z.string().optional();
        s = z.object({ years: yrs, months: z.string().optional() });
        break;
      }
      case "select":
        s = f.required ? z.string().min(1, "Please select an option") : z.string().optional();
        break;
      case "email": {
        const em = z.string().regex(EMAIL_RE, "Enter a valid email address");
        s = f.required ? em : em.or(z.literal(""));
        break;
      }
      default:
        if (f.type === "number") {
          const n = z.string().regex(/^\d+$/, "Enter a valid number");
          s = f.required ? n : n.or(z.literal(""));
        } else {
          s = f.required ? z.string().min(1, reqMsg) : z.string().optional();
        }
    }
    shape[f.id] = s;
  });
  return z.object(shape);
};

const OpenPositionForm = () => {
  const { jobId } = useParams();
  const router = useRouter();
  const { job, isLoading: jobLoading } = useJob(jobId);

  const [fields, setFields] = useState([]);
  const [loadingFields, setLoadingFields] = useState(true);
  const [fieldsError, setFieldsError] = useState(null);

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [resume, setResume] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  const schema = useMemo(() => buildSchema(fields), [fields]);

  // Fetch the dynamic application fields for this job.
  useEffect(() => {
    if (!jobId) return;
    let active = true;
    setLoadingFields(true);
    axios
      .get(`${base_url}/front/jobs/${jobId}/application-fields`)
      .then((res) => {
        if (!active) return;
        const fetched = res.data?.fields || [];
        setFields(fetched);
        const init = {};
        fetched.forEach((f) => {
          init[f.id] = emptyValue(f.widget);
        });
        setValues(init);
        setFieldsError(res.data?.success === false ? res.data.error : null);
      })
      .catch((err) => active && setFieldsError(err.message))
      .finally(() => active && setLoadingFields(false));
    return () => {
      active = false;
    };
  }, [jobId]);

  const setValue = (id, v) => {
    setValues((prev) => ({ ...prev, [id]: v }));
    setErrors((prev) => (prev[id] ? { ...prev, [id]: undefined } : prev));
  };

  const validate = () => {
    const next = {};
    const result = schema.safeParse(values);
    if (!result.success) {
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (key && !next[key]) next[key] = issue.message;
      }
    }
    if (!resume) next._resume = "Please upload your resume";
    if (!agreed) next._agreed = "Please accept the terms to continue";
    setErrors(next);
    return next;
  };

  // Scroll to + focus the first field (in display order) that has an error.
  const focusFirstError = (errs) => {
    const order = ["_resume", ...fields.map((f) => f.id), "_agreed"];
    const firstKey = order.find((k) => errs[k]);
    if (!firstKey) return;
    requestAnimationFrame(() => {
      const el = document.getElementById(`field-${firstKey}`);
      if (!el) return;
      el.scrollIntoView({ block: "center" });
      const focusable = el.querySelector(
        "input:not([type=hidden]), textarea, select, button",
      );
      if (focusable) focusable.focus({ preventScroll: true });
    });
  };

  const handleSubmit = async () => {
    if (submitting) return;
    const errs = validate();
    if (Object.keys(errs).length) {
      focusFirstError(errs);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const payload = {};
    fields.forEach((f) => {
      const v = values[f.id];
      const filled =
        f.widget === "phone"
          ? !!v?.number
          : f.widget === "salary"
            ? !!v?.amount
            : f.widget === "experience"
              ? !!v?.years
              : typeof v === "string"
                ? v.trim() !== ""
                : v != null && v !== "";
      if (!filled) return;
      payload[f.id] =
        f.widget === "phone"
          ? { countryCode: v.callingCode, number: v.number }
          : v;
    });

    const formData = new FormData();
    formData.append("payload", JSON.stringify(payload));
    if (resume) formData.append("resume", resume);

    try {
      const res = await axios.post(
        `${base_url}/front/jobs/${jobId}/apply`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      if (res.data?.success) setSubmitted(true);
      else setSubmitError(res.data?.error || "Could not submit your application.");
    } catch (err) {
      const data = err.response?.data;
      if (data?.duplicate) {
        // Already applied — show a friendly notice instead of an error.
        setAlreadyApplied(true);
        setSubmitted(true);
      } else {
        setSubmitError(
          data?.error ||
            "Could not submit your application right now. Please try again later.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (jobLoading) {
    return (
      <div className="open-positions-status">
        <Loader />
      </div>
    );
  }
  if (!job) {
    router.replace("/careers");
    return null;
  }

  const Label = ({ f }) => (
    <p className="font-14-regular color-black-1">
      {f.name}
      {f.required && <span className="text-[#DC2743]">*</span>}
    </p>
  );

  const ErrorText = ({ id }) =>
    errors[id] ? <p className="error-text apply-error-text">{errors[id]}</p> : null;

  const renderField = (f) => {
    const v = values[f.id];

    switch (f.widget) {
      case "select":
        return (
          <div className="form-input-div" key={f.id}>
            <Label f={f} />
            <CommonDropdown
              className="apply-field-dropdown"
              label="Select an option"
              options={f.options}
              value={v}
              onChange={(val) => setValue(f.id, val)}
            />
            <ErrorText id={f.id} />
          </div>
        );

      case "phone":
        return (
          <PhoneNumberField
            key={f.id}
            label={f.name}
            required={f.required}
            error={errors[f.id] ? { message: errors[f.id] } : undefined}
            field={{ value: v, onChange: (val) => setValue(f.id, val) }}
          />
        );

      case "salary":
        return (
          <div className="form-input-div" key={f.id}>
            <Label f={f} />
            <div
              className={`input-main-style salary-field ${
                errors[f.id] ? "error-border" : ""
              }`}>
              <CommonDropdown
                className="bare-dropdown salary-currency"
                label="INR"
                options={CURRENCIES}
                value={v?.currency}
                onChange={(cur) => setValue(f.id, { ...v, currency: cur })}
              />
              <span className="salary-divider" />
              <input
                type="number"
                className="field-input-style no-spinner font-14-regular color-black-1"
                placeholder="Amount"
                value={v?.amount || ""}
                onChange={(e) => setValue(f.id, { ...v, amount: e.target.value })}
              />
            </div>
            <ErrorText id={f.id} />
          </div>
        );

      case "experience":
        return (
          <div className="form-input-div" key={f.id}>
            <Label f={f} />
            <div className="experience-input-main-div">
              <div
                className={`input-main-style ${
                  errors[f.id] ? "error-border" : ""
                }`}>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  className="field-input-style no-spinner font-14-regular color-black-1"
                  value={v?.years || ""}
                  onChange={(e) => setValue(f.id, { ...v, years: e.target.value })}
                />
                <p className="font-14-regular color-grey-1">Years</p>
              </div>
              <div className="input-main-style">
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  className="field-input-style no-spinner font-14-regular color-black-1"
                  value={v?.months || ""}
                  onChange={(e) =>
                    setValue(f.id, { ...v, months: e.target.value })
                  }
                />
                <p className="font-14-regular color-grey-1">Months</p>
              </div>
            </div>
            <ErrorText id={f.id} />
          </div>
        );

      case "date":
        return (
          <div key={f.id}>
            <DateField
              label={f.name}
              required={f.required}
              name={f.id}
              value={v}
              onChange={(val) => setValue(f.id, val)}
            />
            <ErrorText id={f.id} />
          </div>
        );

      default: {
        // text / email / number -> shared TextField
        const type =
          f.widget === "email" ? "email" : f.type === "number" ? "number" : "text";
        return (
          <TextField
            key={f.id}
            name={f.id}
            label={f.name}
            required={f.required}
            type={type}
            error={errors[f.id]}
            placeholder={`Enter ${f.name.toLowerCase()}`}
            value={v || ""}
            onChange={(e) => setValue(f.id, e.target.value)}
          />
        );
      }
    }
  };

  return (
    <>
      <JobHeader title={job.title} location={job.location} type={job.type} />

      {/* Body */}
      <div className="bg-[#FDFDFD]">
        <div
          className="open-positions-about-div">
          {submitted ? (
            <div className="apply-success">
              {alreadyApplied ? (
                <>
                  <p className="font-20-medium color-green-1">
                    👋 You’ve already applied
                  </p>
                  <p className="font-16-light color-black-1">
                    It looks like you’ve already applied to {job.title} with
                    these details. Our team already has your application on file
                    and will get back to you.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-20-medium color-green-1">
                    🎉 Application submitted!
                  </p>
                  <p className="font-16-light color-black-1">
                    Thanks for applying to {job.title}. Our team will review
                    your application and get back to you.
                  </p>
                </>
              )}
              <div className="open-postions-btn-div">
                <CommonButton
                  title="Back to Careers"
                  onClick={() => router.push("/careers")}
                />
              </div>
            </div>
          ) : loadingFields ? (
            <div className="open-positions-status">
              <Loader />
            </div>
          ) : fieldsError ? (
            <p className="font-16-light color-black-1">
              We couldn’t load this application form. Please try again later.
            </p>
          ) : (
            <>
              <p className="font-20-medium color-black-1">Apply for this role</p>

              <div id="field-_resume" className="apply-field-row">
                <FileUpload
                  label="Upload Resume"
                  file={resume}
                  onUpload={(file) => {
                    setResume(file);
                    setErrors((p) => ({ ...p, _resume: undefined }));
                  }}
                  onRemove={() => setResume(null)}
                  accept=".pdf,.doc,.docx"
                />
                {errors._resume && (
                  <p className="error-text apply-error-text">{errors._resume}</p>
                )}
              </div>

              {fields.map((f) => (
                <div className="apply-field-row" id={`field-${f.id}`} key={f.id}>
                  {renderField(f)}
                </div>
              ))}

              <div id="field-_agreed">
                <CheckboxField
                  checked={agreed}
                  onChange={() => {
                    setAgreed((p) => !p);
                    setErrors((e) => ({ ...e, _agreed: undefined }));
                  }}
                  label="By applying, you accept the data processing terms under the Privacy Policy."
                  error={!!errors._agreed}
                />
                {errors._agreed && (
                  <p className="error-text apply-error-text">{errors._agreed}</p>
                )}
              </div>

              {submitError && (
                <p className="error-text apply-error-text">{submitError}</p>
              )}

              <div className="open-postions-btn-div">
                <CommonButton
                  title={submitting ? "Submitting…" : "Submit Application"}
                  theme={'green'}
                  disabled={submitting}
                  onClick={handleSubmit}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OpenPositionForm;
