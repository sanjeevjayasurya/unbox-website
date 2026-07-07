"use client";

// components/SmoothScroll.jsx
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { usePathname } from "next/navigation";

const SmoothScroll = () => {
  const pathname = usePathname();
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;
    // Expose for programmatic scrolling (e.g. scroll-to-first-error in forms).
    window.lenis = lenis;

    // Store the RAF id so cleanup can cancel the loop. Without this, a
    // remount (e.g. React Strict Mode's double-invoke) leaves the previous
    // loop running against a destroyed Lenis instance, so two RAF loops
    // fight over the scroll position and cause severe scroll latency.
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const handleStop = () => lenisRef.current?.stop();
    const handleStart = () => lenisRef.current?.start();
    window.addEventListener("lenis:stop", handleStop);
    window.addEventListener("lenis:start", handleStart);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("lenis:stop", handleStop);
      window.removeEventListener("lenis:start", handleStart);
      if (window.lenis === lenis) delete window.lenis;
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default SmoothScroll;
