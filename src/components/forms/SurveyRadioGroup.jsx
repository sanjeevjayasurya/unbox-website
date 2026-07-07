"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import "./index.css";

const SurveyRadioGroup = ({
  name,
  question,
  minLabel,
  maxLabel,
  required = true,
}) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const options = [1, 2, 3, 4, 5];
  const currentValue = watch(name) || "";

  return (
    <div className="questions-container">
      <p className=" text-[#141313] font-14-regular">{question}</p>

      <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-4 lg:gap-[30px]">
        <span className="hidden lg:block text-center flex-1 font-14-regular text-[#C2C2C2] ">
          {minLabel}
        </span>

        <RadioGroup
          row
          name={name}
          value={currentValue}
          onChange={(e) => setValue(name, e.target.value, { shouldValidate: true })}
          className="flex flex-row justify-center gap-[18px] min-w-[192px]"
        >
          {options.map((opt) => (
            <div key={opt} className="flex flex-col items-center">
              <span className="text-[#C2C2C2] mb-3 font-14-regular">{opt}</span>
              <label className="cursor-pointer relative flex items-center justify-center">
                <Radio
                  value={String(opt)}
                  sx={{
                    color: "#818382",
                    "&.Mui-checked": {
                      color: "var(--green-2)",
                    },
                    width: "24px",
                    height: "24px",
                    "& .MuiSvgIcon-root": {
                      fontSize: "24px",
                    }
                  }}
                />
              </label>
            </div>
          ))}
        </RadioGroup>

        <span className="hidden lg:block flex-1 text-[var(--green-2)] text-center font-14-regular">
          {maxLabel}
        </span>

        {/* Mobile Labels */}
        <div className="flex lg:hidden justify-between w-full mt-2 sm:px-6">
          <span className="flex-1 font-14-regular text-[#C2C2C2] text-left pr-2">{minLabel}</span>
          <span className="flex-1 text-[var(--green-2)] text-right font-14-regular pl-2">{maxLabel}</span>
        </div>
      </div>

   
      {errors[name] && (
        <p className="error-text" style={{ marginTop: "4px" }}>
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export default SurveyRadioGroup;
