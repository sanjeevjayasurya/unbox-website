"use client";

import React from "react";
import { usePathname } from "next/navigation";

const Template = () => {
  const pathname = usePathname();
  
  return (
    
      <div key={pathname} className="main-content">
        {/* The actual page content, wrapped to optionally fade in/out slightly behind the block */}
        <div // Delay reveal until block uncovers>
          {children}
        </div>
        
        {/* Slide-in block when leaving the page (covers the screen) */}
        <div
          className="slide-in"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "#041e2f",
            transformOrigin: "bottom",
            zIndex: 9999,
          }}
        />
        
        {/* Slide-out block when entering the new page (reveals the screen) */}
        <div
          className="slide-out"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "#041e2f",
            transformOrigin: "top",
            zIndex: 9999,
          }}
        />
      </div>
    
  );
};

export default Template;
