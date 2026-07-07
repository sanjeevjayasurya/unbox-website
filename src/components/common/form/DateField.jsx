"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";

// Brand-styled date picker (no native browser calendar). Emits the selected
// date as a "YYYY-MM-DD" string via onChange(value). Supports day / month /
// year navigation. The popup is rendered in a portal with fixed positioning so
// it's never clipped by an ancestor's `overflow:hidden`, and flips above the
// field when there isn't room below.
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const YEAR_BLOCK = 12;
const POPUP_W = 300;
const POPUP_H = 380; // estimate used only to decide up/down

const pad = (n) => String(n).padStart(2, "0");
const toISO = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;

const parseISO = (s) => {
  if (!s || typeof s !== "string") return null;
  const [y, m, d] = s.split("-").map(Number);
  if (!y || !m || !d) return null;
  return { y, m: m - 1, d };
};

const formatDisplay = (s) => {
  const p = parseISO(s);
  if (!p) return "";
  return `${p.d} ${MONTHS_SHORT[p.m]} ${p.y}`;
};

const DateField = ({ label, required = false, value, onChange, name }) => {
  const wrapRef = useRef(null);
  const popupRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState(null);
  const [mode, setMode] = useState("days"); // days | months | years

  const selected = useMemo(() => parseISO(value), [value]);
  const today = new Date();

  const [view, setView] = useState(() =>
    selected
      ? { year: selected.y, month: selected.m }
      : { year: today.getFullYear(), month: today.getMonth() },
  );

  const computeCoords = () => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const up = spaceBelow < POPUP_H && rect.top > spaceBelow;
    let left = rect.left;
    if (left + POPUP_W > window.innerWidth - 8)
      left = window.innerWidth - POPUP_W - 8;
    setCoords({
      left: Math.max(8, left),
      top: up ? rect.top - 8 : rect.bottom + 8,
      up,
    });
  };

  const toggle = () => {
    if (!open) {
      setMode("days");
      if (selected) setView({ year: selected.y, month: selected.m });
      computeCoords();
    }
    setOpen((o) => !o);
  };

  useEffect(() => {
    if (!open) return;
    const reposition = () => computeCoords();
    const onDown = (e) => {
      if (
        wrapRef.current &&
        !wrapRef.current.contains(e.target) &&
        popupRef.current &&
        !popupRef.current.contains(e.target)
      )
        setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const cells = useMemo(() => {
    const { year, month } = view;
    const startDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const out = [];
    for (let i = 0; i < startDay; i++) out.push(null);
    for (let d = 1; d <= daysInMonth; d++) out.push(d);
    // Only pad to complete the final week so the popup height fits the month.
    while (out.length % 7 !== 0) out.push(null);
    return out;
  }, [view]);

  const decadeStart = Math.floor(view.year / YEAR_BLOCK) * YEAR_BLOCK;

  const nav = (delta) => {
    if (mode === "days") {
      setView((v) => {
        const m = v.month + delta;
        return { year: v.year + Math.floor(m / 12), month: ((m % 12) + 12) % 12 };
      });
    } else if (mode === "months") {
      setView((v) => ({ ...v, year: v.year + delta }));
    } else {
      setView((v) => ({ ...v, year: v.year + delta * YEAR_BLOCK }));
    }
  };

  const pickDay = (day) => {
    onChange(toISO(view.year, view.month, day));
    setOpen(false);
  };
  const pickToday = () => {
    onChange(toISO(today.getFullYear(), today.getMonth(), today.getDate()));
    setOpen(false);
  };

  const isSelectedDay = (day) =>
    selected && selected.y === view.year && selected.m === view.month && selected.d === day;
  const isToday = (day) =>
    today.getFullYear() === view.year &&
    today.getMonth() === view.month &&
    today.getDate() === day;

  const headerTitle =
    mode === "days"
      ? `${MONTHS[view.month]} ${view.year}`
      : mode === "months"
        ? `${view.year}`
        : `${decadeStart} - ${decadeStart + YEAR_BLOCK - 1}`;

  const onTitleClick = () => {
    if (mode === "days") setMode("months");
    else if (mode === "months") setMode("years");
  };

  const popup =
    open && coords
      ? ReactDOM.createPortal(
          <div
            ref={popupRef}
            className="datepicker-pop"
            data-lenis-prevent
            style={{
              position: "fixed",
              left: coords.left,
              top: coords.top,
              transform: coords.up ? "translateY(-100%)" : "none",
            }}
          >
            <div className="datepicker-head">
              <button type="button" className="datepicker-nav" onClick={() => nav(-1)} aria-label="Previous">
                ‹
              </button>
              <button type="button" className="datepicker-title" onClick={onTitleClick} disabled={mode === "years"}>
                {headerTitle}
              </button>
              <button type="button" className="datepicker-nav" onClick={() => nav(1)} aria-label="Next">
                ›
              </button>
            </div>

            {mode === "days" && (
              <>
                <div className="datepicker-grid datepicker-weekdays">
                  {WEEKDAYS.map((w, i) => (
                    <span key={i} className="datepicker-weekday">{w}</span>
                  ))}
                </div>
                <div className="datepicker-grid">
                  {cells.map((day, i) =>
                    day ? (
                      <button
                        type="button"
                        key={i}
                        onClick={() => pickDay(day)}
                        className={`datepicker-day ${isSelectedDay(day) ? "is-selected" : ""} ${
                          isToday(day) ? "is-today" : ""
                        }`}
                      >
                        {day}
                      </button>
                    ) : (
                      <span key={i} className="datepicker-day is-muted" />
                    ),
                  )}
                </div>
              </>
            )}

            {mode === "months" && (
              <div className="datepicker-grid cols-3">
                {MONTHS_SHORT.map((m, i) => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => {
                      setView((v) => ({ ...v, month: i }));
                      setMode("days");
                    }}
                    className={`datepicker-day datepicker-cell ${view.month === i ? "is-selected" : ""}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}

            {mode === "years" && (
              <div className="datepicker-grid cols-3">
                {Array.from({ length: YEAR_BLOCK }, (_, i) => decadeStart + i).map((yr) => (
                  <button
                    type="button"
                    key={yr}
                    onClick={() => {
                      setView((v) => ({ ...v, year: yr }));
                      setMode("months");
                    }}
                    className={`datepicker-day datepicker-cell ${view.year === yr ? "is-selected" : ""}`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            )}

            <div className="datepicker-foot">
              <button type="button" className="datepicker-link" onClick={() => { onChange(""); setOpen(false); }}>
                Clear
              </button>
              <button type="button" className="datepicker-link" onClick={pickToday}>
                Today
              </button>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="form-input-div">
      <p className="font-14-regular color-black-1">
        {label}
        {required && <span className="text-[#DC2743]">*</span>}
      </p>

      <div className="datepicker-wrap" ref={wrapRef}>
        <button
          type="button"
          id={name}
          className={`input-main-style datepicker-trigger ${open ? "focused-border" : ""}`}
          onClick={toggle}
        >
          <span className={`font-14-regular ${value ? "color-black-1" : "color-grey-1"}`}>
            {value ? formatDisplay(value) : "Select a date"}
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4.5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
            <path d="M3 9h18M8 3v3M16 3v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        {popup}
      </div>
    </div>
  );
};

export default DateField;
