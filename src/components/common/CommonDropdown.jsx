"use client";

import React, { useEffect, useRef, useState } from "react";
import ArrowDown from "../../assets/icons/arrow-down-black.svg";
import "./CommonDropdown.css";

/**
 * Reusable accessible dropdown / select.
 *
 * Props:
 *  - label:    placeholder shown when nothing is selected (e.g. "Department")
 *  - options:  array of strings, OR array of { label, value }
 *  - value:    currently selected value
 *  - onChange: (value) => void
 *  - className, disabled
 */
const normalize = (opt) =>
  typeof opt === "object" && opt !== null
    ? { label: opt.label, value: opt.value }
    : { label: opt, value: opt };

const CommonDropdown = ({
  label = "Select",
  options = [],
  value,
  onChange,
  className = "",
  disabled = false,
}) => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  const items = options.map(normalize);
  const selected = items.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const handleSelect = (val) => {
    onChange?.(val);
    setOpen(false);
  };

  return (
    <div
      className={`common-dropdown ${open ? "is-open" : ""} ${className}`}
      ref={ref}
    >
      <button
        type="button"
        className="common-dropdown-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((p) => !p)}
      >
        <span
          className={`common-dropdown-label ${
            selected ? "is-selected" : ""
          }`}
        >
          {selected ? selected.label : label}
        </span>
        <ArrowDown className="common-dropdown-chevron" />
      </button>

      {open && (
        <ul
          className="common-dropdown-menu"
          role="listbox"
          data-lenis-prevent
        >
          {items.length > 0 ? (
            items.map((opt) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                className={`common-dropdown-item ${
                  opt.value === value ? "is-active" : ""
                }`}
                onClick={() => handleSelect(opt.value)}
              >
                <span className="common-dropdown-item-text">{opt.label}</span>
                {opt.value === value && (
                  <svg
                    className="common-dropdown-check"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M13.5 4.5L6.5 11.5L3 8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </li>
            ))
          ) : (
            <li className="common-dropdown-empty">No options</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CommonDropdown;
