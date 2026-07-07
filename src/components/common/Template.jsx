"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const Template = () => {
  const pathname = usePathname();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="main-content">
        {/* The actual page content, wrapped to optionally fade in/out slightly behind the block */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }} // Delay reveal until block uncovers
        >
          {children}
        </motion.div>
        
        {/* Slide-in block when leaving the page (covers the screen) */}
        <motion.div
          className="slide-in"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
        <motion.div
          className="slide-out"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
      </motion.div>
    </AnimatePresence>
  );
};

export default Template;
