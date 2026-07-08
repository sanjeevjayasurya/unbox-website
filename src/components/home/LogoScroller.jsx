"use client";

import React, { useEffect, useRef } from "react";
import "./index.css";

const LogoScroller = ({ clients, speed = "slow" }) => {
  const scrollerRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scroller.setAttribute("data-animated", true);
    }
  }, []);

  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <div
      className="scroller scroller--forward"
      ref={scrollerRef}
      data-speed={speed}
    >
      <ul className="tag-list scroller__inner">
        {duplicatedClients.map((client, index) => (
          <li className="mobile-logo" key={`${client.id}-${index}`}>
            {client.icon}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogoScroller;
