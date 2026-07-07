"use client";

import React from "react";

const TextField = ({
  label,
  name, // Added name for accessibility and register
  required = false,
  type = "text",
  error, // Added error prop
  register, // Added register for React Hook Form
  placeholder = "",
  className = "",
  readOnly = false,
  ...rest
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const registeredProps = register ? register(name) : {};

  return (
    <div className="form-input-div">
      <p className="font-14-regular color-black-1">
        {label}
        {required && <span className="text-[#DC2743]">*</span>}
      </p>

      <div
        className={`input-main-style ${className} ${
          error ? "error-border" : ""
        } ${isFocused ? "focused-border" : ""}`}
      >
        <input
          id={name}
          type={type}
          className="field-input-style font-14-regular color-black-1"
          placeholder={placeholder}
          readOnly={readOnly}
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
        <p className="error-text" style={{ marginTop: "4px" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default TextField;
