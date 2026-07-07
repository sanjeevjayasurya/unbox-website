"use client";

import React from "react";
import Search from "../../assets/icons/search-normal.svg";

/**
 * SearchInput
 * Reusable pill search field with a left search icon and a right clear (✕)
 * button that appears once there is text.
 *
 * @param {string} value - controlled input value
 * @param {(next: string) => void} onChange - called with the new string (and "" on clear)
 * @param {string} placeholder
 * @param {string} className - extra classes for the outer container
 */
const SearchInput = ({
  value,
  onChange,
  placeholder = "Search",
  className = "",
  ...rest
}) => {
  return (
    <div
      className={`flex items-center gap-3 bg-white rounded-[100px] px-6 py-4 border border-transparent focus-within:border-[#079D92] transition-colors ${className}`}
    >
      <Search className="w-5 h-5 shrink-0 opacity-60" aria-hidden="true" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 min-w-0 bg-transparent outline-none border-none font-16-light color-black-1"
        {...rest}
      />
      {!!value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange("")}
          className="shrink-0 text-[#141313] opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path
              d="M12 4L4 12M4 4l8 8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchInput;
