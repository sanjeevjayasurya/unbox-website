"use client";

// ScrollToTop.js
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0); // This will scroll to the top of the page
  }, [location]); // This effect runs on every location change

  return null;
};

export default ScrollToTop;
