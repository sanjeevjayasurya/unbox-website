"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SurveyRadioGroup from "../../components/forms/SurveyRadioGroup";
import SurveyNPSGroup from "../../components/forms/SurveyNPSGroup";
import TextField from "../../components/common/form/TextField";
import TextAreaField from "../../components/common/form/TextAreaField";
import { surveyRobot } from "../../helpers/assets";
import { base_url } from "../../helpers/config";

const surveySchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  companyName: z.string().optional(),
  solutionDesign: z.any().refine((val) => !!val, { message: "Please select an option" }),
  productDesign: z.any().refine((val) => !!val, { message: "Please select an option" }),
  userExperience: z.any().refine((val) => !!val, { message: "Please select an option" }),
  easeOfOperations: z.any().refine((val) => !!val, { message: "Please select an option" }),
  systemUptime: z.any().refine((val) => !!val, { message: "Please select an option" }),
  kpiCommitments: z.any().refine((val) => !!val, { message: "Please select an option" }),
  slaCommitments: z.any().refine((val) => !!val, { message: "Please select an option" }),
  communication: z.any().refine((val) => !!val, { message: "Please select an option" }),
  supportResponsiveness: z.any().refine((val) => !!val, { message: "Please select an option" }),
  qualityOfResolution: z.any().refine((val) => !!val, { message: "Please select an option" }),
  npsScore: z.any().refine((val) => !!val, { message: "Please select an option" }),
  improvementFeedback: z.string().optional(),
  workingWellFeedback: z.string().optional(),
});

const SurveyPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [tokenStatus, setTokenStatus] = useState("loading"); // loading | valid | invalid | completed | declined
  const [submitting, setSubmitting] = useState(false);
  const [declining, setDeclining] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const methods = useForm({ resolver: zodResolver(surveySchema) });

  useEffect(() => {
    if (!token) {
      setTokenStatus("invalid");
      return;
    }
    fetch(`${base_url}/survey/validate/${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.valid) {
          setTokenStatus("valid");
          if (data.email) methods.setValue("email", data.email);
        } else {
          setTokenStatus(data.reason || "invalid");
        }
      })
      .catch(() => setTokenStatus("invalid"));
  }, [token]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch(`${base_url}/survey/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, ...data }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");
      router.push("/survey-success");
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNotNow = async () => {
    if (!token) return;
    setDeclining(true);
    try {
      await fetch(`${base_url}/survey/decline`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
    } catch (_) {}
    router.push("/");
  };

  if (tokenStatus === "loading") {
    return (
      <main className="bg-[#FDFDFD] min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Verifying your survey link…</p>
      </main>
    );
  }

  if (tokenStatus === "completed") {
    return (
      <main className="bg-[#FDFDFD] min-h-screen flex items-center justify-center p-10">
        <div className="text-center max-w-md">
          <h1 className="font-40-semibold uppercase text-[#141313] mb-4">
            Already <span style={{ color: "var(--green-2)" }}>Submitted</span>
          </h1>
          <p className="font-20-medium text-[#141313] mb-8">
            You've already completed this survey. Thank you for your feedback!
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-[var(--green-2)] text-white px-10 py-3 rounded-full font-medium hover:bg-[#068e83] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  if (tokenStatus === "invalid" || tokenStatus === "declined") {
    return (
      <main className="bg-[#FDFDFD] min-h-screen flex items-center justify-center p-10">
        <div className="text-center max-w-md">
          <h1 className="font-40-semibold uppercase text-[#141313] mb-4">
            {tokenStatus === "declined" ? "Survey Declined" : "Invalid Link"}
          </h1>
          <p className="font-20-medium text-[#141313] mb-8">
            {tokenStatus === "declined"
              ? "You've already declined this survey. Reach out to us if you'd like to share feedback."
              : "This survey link is invalid or has expired. Please contact us for a new link."}
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-[var(--green-2)] text-white px-10 py-3 rounded-full font-medium hover:bg-[#068e83] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#FDFDFD] p-[20px] md:p-[40px] lg:p-[60px] max-w-[1440px] mx-auto box-border">
      <div className="flex flex-col gap-10 lg:flex-row w-full min-h-screen">
        {/* Left Sidebar */}
        <div className="flex-1 bg-transparent flex flex-col lg:sticky lg:top-[60px] h-fit lg:h-[calc(100vh-80px)] overflow-hidden">
          <h1 className="font-40-semibold uppercase text-[#141313]">
            HOW'S YOUR <span style={{ color: "var(--green-2)" }}>UNBOX</span>{" "}
            <br />
            <span style={{ color: "var(--green-2)" }}>EXPERIENCE</span> SO FAR?
          </h1>
          <p className="mt-10 text-[#141313] font-20-medium">
            Your honest feedback helps us improve the Unbox Robotics system to better serve your
            operations.{" "}
            <span style={{ color: "var(--green-2)" }}>2-3 minutes. Big impact.</span>
          </p>
          <div className="flex-1 flex items-center justify-center mt-10 lg:mt-0">
            <img src={surveyRobot} alt="Unbox Robot" className="w-full h-auto" />
          </div>
        </div>

        {/* Right Form Area */}
        <div className="survey-container">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col gap-6">
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  required={true}
                  register={methods.register}
                  error={methods.formState.errors.email?.message}
                />
                {/* <TextField
                  label="Company Name"
                  name="companyName"
                  register={methods.register}
                /> */}
              </div>

              <SurveyRadioGroup
                name="solutionDesign"
                question="Solution design: How well does the deployed solution fit your operational layout and throughput requirements?"
                minLabel="No, significantly mismatch with actual need"
                maxLabel="Yes, thoroughly covered"
              />
              <SurveyRadioGroup
                name="productDesign"
                question="Product design: How satisfied are you with the hardware build quality and form factor of Unbox robots?"
                minLabel="Not satisfied"
                maxLabel="Very satisfied"
              />
              <SurveyRadioGroup
                name="userExperience"
                question="User experience: How intuitive is the operator interface (screens, alerts, controls)?"
                minLabel="Confusing"
                maxLabel="Very Intuitive"
              />
              <SurveyRadioGroup
                name="easeOfOperations"
                question="Ease of operations: How easy is it for your team to run the operation?"
                minLabel="Very difficult"
                maxLabel="Very easy"
              />
              <SurveyRadioGroup
                name="systemUptime"
                question="System uptime & availability: Was the system available when your team needed it?"
                minLabel="Rare Available"
                maxLabel="Always Available"
              />
              <SurveyRadioGroup
                name="kpiCommitments"
                question="KPI commitments met: Are we delivering on the performance targets we promised?"
                minLabel="Consistently missed"
                maxLabel="Always on time"
              />
              <SurveyRadioGroup
                name="slaCommitments"
                question="SLA commitments met: How satisfied are you with our response and resolution times?"
                minLabel="Consistently missed"
                maxLabel="Always on time"
              />
              <SurveyRadioGroup
                name="communication"
                question="Communication: Does the team proactively communicate updates – even without you following up?"
                minLabel="Rarely communicates"
                maxLabel="Always proactive"
              />
              <SurveyRadioGroup
                name="supportResponsiveness"
                question="Support responsiveness: When you raised an issue, how quickly did our team get back to you?"
                minLabel="Very slow"
                maxLabel="Very fast"
              />
              <SurveyRadioGroup
                name="qualityOfResolution"
                question="Quality of resolution: When issues were resolved, how satisfied were you with the outcome?"
                minLabel="Not satisfied"
                maxLabel="Fully satisfied"
              />

              <SurveyNPSGroup
                name="npsScore"
                question="Net Promoter Score: How likely are you to recommend Unbox Robotics to a peer?"
                minLabel="Not at all likely"
                maxLabel="Extremely likely"
              />

              <div className="space-y-6">
                <TextAreaField
                  label={
                    <>
                      What's one thing we could improve that would make the biggest difference for
                      you?
                      <br />
                      <span className="font-14-regular text-[var(--green-2)]">
                        Be as specific as you like – this goes directly to our product and operations
                        team.
                      </span>
                    </>
                  }
                  name="improvementFeedback"
                  register={methods.register}
                  placeholder="Your Answer"
                  style={{ minHeight: "40px" }}
                />
                <TextAreaField
                  label="Anything working really well that you'd like us to keep doing?"
                  name="workingWellFeedback"
                  register={methods.register}
                  placeholder="Your Answer"
                  style={{ minHeight: "40px" }}
                />
              </div>

              {submitError && (
                <p className="text-red-500 text-sm text-center">{submitError}</p>
              )}

              <div className="flex flex-col justify-center items-center gap-4 mt-8">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[var(--green-2)] text-white px-10 py-3 rounded-full font-medium hover:bg-[#068e83] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting…" : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={handleNotNow}
                  disabled={declining}
                  className="text-gray-400 hover:text-gray-600 underline text-sm transition-colors disabled:opacity-60"
                >
                  {declining ? "Saving…" : "Not Now"}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </main>
  );
};

export default SurveyPage;
