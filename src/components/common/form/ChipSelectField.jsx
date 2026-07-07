"use client";

import React from "react";

/**
 * Single-select pill/chip field, styled to match the get-in-touch form.
 *
 * Props:
 *  - label, required
 *  - options:  array of strings
 *  - value:    currently selected string
 *  - onChange: (value) => void
 *  - error:    error message string
 */
const ChipSelectField = ({
  label,
  required = false,
  options = [],
  value,
  onChange,
  error,
}) => {
  return (
    <div className="form-input-div">
      {label && (
        <p className="font-14-regular color-black-1">
          {label}
          {required && <span className="text-[#DC2743]">*</span>}
        </p>
      )}

      <div className="chip-select-row" role="radiogroup" aria-label={label}>
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={value === opt}
            className={`chip-select font-14-regular ${
              value === opt ? "is-active" : ""
            }`}
            onClick={() => onChange(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      {error && (
        <p className="error-text" style={{ marginTop: "4px" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default ChipSelectField;
