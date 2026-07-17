"use client";

import React, { useEffect, useRef, useState } from "react";
import DownArrow from "../../../assets/icons/arrow-down-black.svg";
import ReactCountryFlag from "react-country-flag";
import { getCountryCallingCode } from "libphonenumber-js";
import { getData } from "country-list";

const PhoneNumberField = ({
  label = "Phone Number",
  required = false,
  name,
  field, // React Hook Form Controller field
  error, // React Hook Form error object
  className = "",
  ...rest
}) => {
  const codeRef = useRef(null);
  const listRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const countriesData = getData();

  // Extract values from React Hook Form field prop
  const { value: formValue = {}, onChange: formOnChange } = field || {};
  const phoneNumber = formValue.number || "";
  const selectedCode = {
    code: formValue.code || "IN",
    callingCode: formValue.callingCode || "+91",
  };

  const getCallingCode = (countryCode) => {
    try {
      return `+${getCountryCallingCode(countryCode.toUpperCase())}`;
    } catch (err) {
      return "";
    }
  };

  // ✅ Handle Country Change for React Hook Form
  const handleCountryCodeChange = (country) => {
    const callingCode = getCallingCode(country.code);
    formOnChange({
      ...formValue,
      code: country.code,
      callingCode: callingCode,
    });
    setShowDropdown(false);
    setSearchValue("");
    setFocusedIndex(-1);
  };

  // ✅ Handle Number Change (Digits only)
  const handlePhoneNumberChange = (e) => {
    const sanitizedValue = e.target.value.replace(/\D/g, "");
    formOnChange({
      ...formValue,
      number: sanitizedValue,
    });
  };

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (codeRef.current && !codeRef.current.contains(event.target)) {
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
      });
    }
  };

  const handleKeyDown = (e) => {
    if (!showDropdown) return;

    const filtered = filteredCountries;

    if (["ArrowUp", "ArrowDown", "Enter", "Escape"].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (e.key === "ArrowDown") {
      setFocusedIndex((prev) => {
        const next = prev < filtered.length - 1 ? prev + 1 : 0;
        scrollToOption(next);
        return next;
      });
    }

    if (e.key === "ArrowUp") {
      setFocusedIndex((prev) => {
        const next = prev > 0 ? prev - 1 : filtered.length - 1;
        scrollToOption(next);
        return next;
      });
    }

    if (e.key === "Enter" && focusedIndex >= 0 && filtered[focusedIndex]) {
      handleCountryCodeChange(filtered[focusedIndex]);
    }

    if (e.key === "Escape") {
      setShowDropdown(false);
      setFocusedIndex(-1);
    }
  };

  useEffect(() => {
    if (showDropdown && listRef.current) listRef.current.focus();
    if (!showDropdown) setFocusedIndex(-1);
  }, [showDropdown]);

  const filteredCountries = countriesData.filter(
    (option) =>
      option.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      option.code.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div
      ref={codeRef}
      style={{ width: "100%" }}
      className={`relative ${className}`}
    >
      <div className="get-in-touch-div">
        <p className="font-14-regular color-black-1">
          {label}
          {required && <span className="text-[#DC2743]">*</span>}
        </p>

        <div
          className={`get-in-touch-input-div ${error ? "error-border" : ""} ${
            isFocused ? "focused-border" : ""
          }`}
        >
          {/* Country Code Dropdown */}
          <div
            className="currency-div cursor-pointer"
            role="combobox"
            aria-expanded={showDropdown}
            aria-haspopup="listbox"
            aria-label="Select country code"
            aria-controls="phone-country-list"
            tabIndex={0}
            onClick={() => {
              setShowDropdown(!showDropdown);
              setIsFocused(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setShowDropdown(!showDropdown);
                setIsFocused(true);
              } else {
                handleKeyDown(e);
              }
            }}
          >
            <p className="currency-code-txt">{selectedCode?.callingCode}</p>
            <div
              className={`cursor-pointer arrow-wrapper ${
                showDropdown ? "rotate" : ""
              }`}
            >
              <DownArrow aria-hidden="true" />
            </div>
          </div>

          {/* Number Input */}
          <input
            type="tel"
            className="get-in-touch-input font-14-regular color-black-1"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            maxLength={15}
            aria-label={`${label} number`}
            {...rest}
          />

          {/* Dropdown List */}
          {showDropdown && (
            <div className="absolute top-16 left-0 w-full bg-white shadow-md rounded-md mt-5 z-50">
              <div className="flex-1 p-2">
                <div className="search-bar-form">
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

              <ul
                id="phone-country-list"
                ref={listRef}
                className="max-h-60 overflow-auto outline-none"
                tabIndex={0}
                onKeyDown={handleKeyDown}
                role="listbox"
                aria-label="Select country"
              >
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country, index) => (
                    <li
                      key={country.code}
                      className={`flex items-center justify-between px-[10px] py-[10px] cursor-pointer drop-down-text font-14-regular color-black-1 ${
                        focusedIndex === index
                          ? "bg-gray-100"
                          : "hover:bg-gray-100"
                      }`}
                      onMouseEnter={() => setFocusedIndex(index)}
                      onClick={() => handleCountryCodeChange(country)}
                      role="option"
                      aria-selected={selectedCode.code === country.code}
                    >
                      <div className="flag-code-div">
                        <ReactCountryFlag
                          countryCode={country.code}
                          svg
                          style={{
                            width: "22px",
                            height: "16px",
                            borderRadius: "5px",
                          }}
                        />
                        <span>{country.name}</span>
                      </div>
                      <span className="text-gray-600">
                        {getCallingCode(country.code)}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-2 text-gray-500">No results found</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {error && (
          <p className="error-text">{error.message || error.number?.message}</p>
        )}
      </div>
    </div>
  );
};

export default PhoneNumberField;
