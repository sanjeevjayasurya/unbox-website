"use client";

import React from "react";
import "./index.css";

/**
 * Seamless, jitter-free infinite logo marquee.
 *
 * The track renders the logos twice back-to-back and is translated by exactly
 * -50% via a compositor-only transform animation. Because the second half is an
 * identical copy of the first, the loop point is invisible (no jump/stutter).
 * Every item carries the same trailing gap so the wrap is pixel-perfect.
 */
const LogoScroller = ({ clients = [], speed = "slow" }) => {
  if (!clients.length) return null;

  const loopClients = [...clients, ...clients];

  return (
    <div className="logo-marquee" data-speed={speed}>
      <ul className="logo-marquee__track">
        {loopClients.map((client, index) => (
          <li
            className="logo-marquee__item"
            key={`${client.id}-${index}`}
            aria-hidden={index >= clients.length}
          >
            {client.icon}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogoScroller;
