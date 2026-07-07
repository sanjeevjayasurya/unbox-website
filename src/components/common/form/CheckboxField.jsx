"use client";

import React from "react";

const CheckboxField = ({ checked, onChange, label, error }) => {
  const id = `checkbox-${typeof label === "string" ? label.replace(/\s+/g, "-").toLowerCase() : Math.random().toString(36).slice(2)}`;
  return (
    <div className="captcha-div">
      <input
        type="checkbox"
        id={id}
        className={`checkbox-div ${error ? "error-border" : ""}`}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="font-14-regular color-black-1">
        {label}
      </label>
    </div>
  );
};

export default CheckboxField;
