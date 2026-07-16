"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavbarComponent from "@/components/navabar/NavbarComponent";
import Footer from "@/components/footer/Footer";
import CookieBanner from "@/components/CookieBanner";
// import EventPopup from "@/components/common/EventPopup";

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const isSuccessPage = pathname === "/thank-you";
  const [SmoothScroll, setSmoothScroll] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let idleId;
    let timeoutId;

    const load = () => {
      import("@/components/common/SmoothScroll").then((mod) => {
        if (!cancelled) setSmoothScroll(() => mod.default);
      });
    };

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(load, { timeout: 2500 });
    } else {
      timeoutId = window.setTimeout(load, 1);
    }

    return () => {
      cancelled = true;
      if (idleId != null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId != null) window.clearTimeout(timeoutId);
    };
  }, []);

  if (isSuccessPage) {
    return <div className="main-content">{children}</div>;
  }

  return (
    <>
      <div className="main-container">
        <NavbarComponent />
        {SmoothScroll ? <SmoothScroll /> : null}
        <main id="main-content">
          <div className="main-content">{children}</div>
        </main>
        <Footer />
      </div>
      <CookieBanner />
      {/* <EventPopup isOpen={isEventPopupOpen} onClose={handleClosePopup} /> */}
    </>
  );
}
