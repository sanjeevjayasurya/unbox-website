"use client";

import React from "react";

const TextAreaField = ({
  label,
  name,
  register, // Added for React Hook Form
  required = false,
  error, // Renamed from errorTxt to error to match RHF reference
  divClassName = "",
  placeholder = "",
  rows = 5,
  ...rest
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const registeredProps = register ? register(name) : {};

  return (
    <div className="get-in-touch-div">
      <p className="font-14-regular color-black-1">
        {label}
        {required && <span className="text-[#DC2743]">*</span>}
      </p>

      <div
        className={`get-in-touch-input-div-2 ${divClassName} ${
          error ? "error-border" : ""
        } ${isFocused ? "focused-border" : ""}`}
      >
        <textarea
          id={name}
          className="get-in-touch-input-2 font-14-regular color-black-1"
          placeholder={placeholder}
          rows={rows}
          onInput={(e) => {
            if (e.target.value.startsWith(" ")) {
              e.target.value = e.target.value.trimStart();
            }
          }}
          {...registeredProps}
          {...rest}
          onFocus={(e) => {
            setIsFocused(true);
            if (rest.onFocus) rest.onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (registeredProps.onBlur) registeredProps.onBlur(e);
            if (rest.onBlur) rest.onBlur(e);
          }}
        />
      </div>

      {error && (
        <p className="error-text">
          {typeof error === "string" ? error : error?.message}
        </p>
      )}
    </div>
  );
};

export default TextAreaField;
