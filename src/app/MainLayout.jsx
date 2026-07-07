"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavbarComponent from "@/components/navabar/NavbarComponent";
import Footer from "@/components/footer/Footer";
import SmoothScroll from "@/components/common/SmoothScroll";
import CookieBanner from "@/components/CookieBanner";
import EventPopup from "@/components/common/EventPopup";

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const isSuccessPage = pathname === "/thank-you";
  const isBlogsRoute = pathname === "/blogs" || pathname.startsWith("/blogs/");
  const isDeliverRoute = pathname === "/events/deliver-europe-2026";
  const isCematRoute = pathname === "/events/cemat-australia-2026";
  const suppressPopup = isBlogsRoute || isDeliverRoute || isCematRoute;
  const [isEventPopupOpen, setIsEventPopupOpen] = useState(false);

  useEffect(() => {
    if (suppressPopup) {
      setIsEventPopupOpen(false);
      return;
    }

    const isClosedThisSession = sessionStorage.getItem("cematPopupClosed");

    if (!isClosedThisSession) {
      const hasVisitedBefore = localStorage.getItem("hasVisitedCematBefore");
      const delay = 2000;

      const timer = setTimeout(() => {
        setIsEventPopupOpen(true);
        if (!hasVisitedBefore) {
          localStorage.setItem("hasVisitedCematBefore", "true");
        }
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [suppressPopup, pathname]);

  const handleClosePopup = () => {
    setIsEventPopupOpen(false);
    sessionStorage.setItem("cematPopupClosed", "true");
  };

  if (isSuccessPage) {
    return <div className="main-content">{children}</div>;
  }

  return (
    <>
      <div className="main-container">
        <NavbarComponent />
        <SmoothScroll />
        <main id="main-content">
          <div className="main-content">{children}</div>
        </main>
        <Footer />
      </div>
      <CookieBanner />
      <EventPopup isOpen={isEventPopupOpen} onClose={handleClosePopup} />
    </>
  );
}
