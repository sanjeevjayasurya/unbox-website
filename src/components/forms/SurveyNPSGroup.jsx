"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

const SurveyNPSGroup = ({ name, question, minLabel, maxLabel, required = true }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="questions-container">
      <p className="text-[#141313] font-14-regular">{question}</p>
      <div  className="w-full h-[1px] bg-[#EFEFEF]"/>
      <div className="flex justify-between items-center ">
        <span className="font-14-regular text-[#C2C2C2]">{minLabel}</span>
        <span className="font-14-regular text-[var(--green-2)]">{maxLabel}</span>
      </div>

      <div className="flex justify-center flex-wrap gap-2 md:gap-4">
        {options.map((opt) => (
          <label key={opt} className="cursor-pointer min-w-[38px] max-w-[38px] flex-1 group">
            <input
              type="radio"
              value={opt}
              {...register(name)}
              className="peer sr-only"
            />
            <div className="w-full h-10 flex items-center justify-center rounded-md bg-gray-100 text-[#141313] font-medium transition-colors peer-checked:bg-[var(--green-2)] peer-checked:text-white hover:bg-gray-200 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--green-2)] peer-focus-visible:ring-offset-1">
              {opt}
            </div>
          </label>
        ))}
      </div>
      {errors[name] && (
        <p className="error-text" style={{ marginTop: "8px" }}>
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export default SurveyNPSGroup;
