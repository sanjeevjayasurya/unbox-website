"use client";

import React from "react";
import "../../views/get-in-touch/index.css";

const LabeledInput = ({
  label,
  required = false,
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
  inputClassName = "",
  divClassName = "",
  errorTxt = "",
  ...rest
}) => {
  return (
    <div className={`${className}`} style={{ width: "100%" }}>
      <div className="get-in-touch-div">
        <p className="font-14-regular color-black-1">
          {label}
          {required && <span className="text-[#DC2743]">*</span>}
        </p>
        <div className={`get-in-touch-input-div ${divClassName}`}>
          <input
            type={type}
            className={`get-in-touch-input font-14-regular color-black-1  ${inputClassName}`}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...rest}
          />
        </div>
      </div>
      {errorTxt && <p className="error-text">{errorTxt}</p>}
    </div>
  );
};

export default LabeledInput;
