"use client";

import React from "react";
import { animation } from "../../helpers/utils";
import { eventStats } from "./config";

const EventStats = () => {
  return (
    <div className="bg-[#FDFDFD] class-gap">
      <div className="event-stats-grid">
        {eventStats.map((stat, index) => (
          <div
            key={stat.id}
            className="event-stat-card">
            <p className="font-40-semibold color-green-1">{stat.value}</p>
            <p className="font-16-light text-[#4a4a4a]">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventStats;
