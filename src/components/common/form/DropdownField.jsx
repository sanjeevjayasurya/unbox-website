"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import DownArrow from "../../../assets/icons/arrow-down-black.svg";
import SearchIcon from "../../../assets/icons/search-normal.svg";

const DropdownField = ({
  label,
  name,
  field, // From React Hook Form Controller
  error, // From React Hook Form
  required = false,
  options = [], // Expected: [{ value: '...', label: '...' }]
  placeholder = "Select an option",
  searchable = false,
  renderOption,
  className = "",
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);

  const dropdownRef = useRef(null);
  const listRef = useRef(null);

  // Logic to find the selected label based on field.value
  const selectedOption = options.find((opt) => opt.value === field?.value);
  const selectedLabel = selectedOption ? selectedOption.label : "";

  // 🔹 Memoized filtering logic
  const filteredOptions = useMemo(() => {
    if (!searchValue) return options;
    const lowerSearch = searchValue.toLowerCase();
    return options.filter((option) =>
      option.label.toLowerCase().includes(lowerSearch)
    );
  }, [options, searchValue]);

  // 🔹 Handle selection
  const handleSelect = (option) => {
    field?.onChange(option.value);
    setShowDropdown(false);
    setSearchValue("");
    setFocusedIndex(-1);
  };

  // 🔹 Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        setFocusedIndex(-1);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToOption = (index) => {
    if (listRef.current && listRef.current.children[index]) {
      listRef.current.children[index].scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  };

  const handleListKeyDown = (e) => {
    if (!showDropdown || filteredOptions.length === 0) return;

    if (["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (e.key === "ArrowDown") {
      setFocusedIndex((prev) => {
        const next = prev < filteredOptions.length - 1 ? prev + 1 : 0;
        scrollToOption(next);
        return next;
      });
    }

    if (e.key === "ArrowUp") {
      setFocusedIndex((prev) => {
        const next = prev > 0 ? prev - 1 : filteredOptions.length - 1;
        scrollToOption(next);
        return next;
      });
    }

    if (e.key === "Enter") {
      if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
        handleSelect(filteredOptions[focusedIndex]);
      }
    }

    if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown && listRef.current) {
      listRef.current.focus();
    }
    if (!showDropdown) setFocusedIndex(-1);
  }, [showDropdown]);

  return (
    <div className={`form-input-div relative ${className}`} ref={dropdownRef}>
      {label && (
        <p
          id={`dropdown-label-${name}`}
          className="font-14-regular color-black-1"
        >
          {label}
          {required && <span className="text-[#DC2743]">*</span>}
        </p>
      )}

      {/* Clickable field with existing CSS */}
      <div
        className={`input-main-style cursor-pointer outline-none ${
          error ? "error-border" : ""
        } ${isFocused || showDropdown ? "focused-border" : ""}`}
        role="combobox"
        aria-expanded={showDropdown}
        aria-haspopup="listbox"
        aria-labelledby={label ? `dropdown-label-${name}` : undefined}
        aria-controls={`dropdown-list-${name}`}
        onClick={() => setShowDropdown(!showDropdown)}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          if (!dropdownRef.current?.contains(e.relatedTarget)) {
            setIsFocused(false);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            setShowDropdown(!showDropdown);
          }
        }}
        tabIndex={0}
      >
        <div className="field-input-style font-14-regular color-black-1">
          <p style={{ color: selectedLabel ? "#151414" : "#041E2F80" }}>
            {selectedLabel || placeholder}
          </p>
        </div>
        <div
          className={`cursor-pointer arrow-wrapper ${
            showDropdown ? "rotate" : ""
          }`}
        >
          <DownArrow aria-hidden="true" />
        </div>
      </div>

      {/* Dropdown menu with existing CSS */}
      {showDropdown && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md rounded-md mt-5 z-50">
          {searchable && (
            <div className="flex-1 p-2">
              <div className="search-bar-form">
                <SearchIcon aria-hidden="true" />
                <input
                  type="text"
                  className="search-input-class font-14-regular color-black-1"
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    setFocusedIndex(-1);
                  }}
                />
              </div>
            </div>
          )}

          <ul
            id={`dropdown-list-${name}`}
            ref={listRef}
            className="max-h-60 overflow-auto outline-none custom-scrollbar-thin"
            data-lenis-prevent
            tabIndex={-1}
            onKeyDown={handleListKeyDown}
            role="listbox"
            aria-label={label || placeholder}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={option.value || index}
                  className={`flex items-center justify-between px-[10px] py-[10px] cursor-pointer font-14-regular color-black-1 ${
                    focusedIndex === index ? "bg-gray-100" : "hover:bg-gray-100"
                  }`}
                  onMouseEnter={() => setFocusedIndex(index)}
                  onClick={() => handleSelect(option)}
                  role="option"
                  aria-selected={field?.value === option.value}
                >
                  {renderOption ? (
                    renderOption(option)
                  ) : (
                    <span>{option.label}</span>
                  )}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )}

      {/* Hidden input for form submission & Error display */}
      <input type="hidden" name={name} {...field} />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default DropdownField;
