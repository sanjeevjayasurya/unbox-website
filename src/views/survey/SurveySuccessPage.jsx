"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { surveyRobot } from "../../helpers/assets";

const SurveySuccessPage = () => {
  const router = useRouter();

  return (
    <main className="bg-[#FDFDFD] p-[60px] max-w-[1440px] mx-auto box-border min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center max-w-2xl">
        <h1 className="font-40-semibold uppercase text-[#141313] mb-6">
          THANK <span style={{ color: "var(--green-2)" }}>YOU!</span>
        </h1>
        <p className="text-[#141313] font-20-medium mb-10">
          Thank you for filling out the survey. We appreciate your honest feedback; it helps us
          improve the Unbox Robotics system to better serve your operations!
        </p>

        {/* <img
          src={surveyRobot}
          alt="Unbox Robot"
          className="w-full max-w-[300px] h-auto mb-10"
        /> */}

        <button
          onClick={() => router.push("/")}
          className="bg-[var(--green-2)] text-white px-10 py-3 rounded-full font-medium hover:bg-[#068e83] transition-colors"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
};

export default SurveySuccessPage;
