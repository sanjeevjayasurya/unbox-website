"use client";

import { usePathname } from "next/navigation";
import NavbarComponent from "@/components/navabar/NavbarComponent";
import Footer from "@/components/footer/Footer";
import CookieBanner from "@/components/CookieBanner";
// import EventPopup from "@/components/common/EventPopup";

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const isSuccessPage = pathname === "/thank-you";

  if (isSuccessPage) {
    return <div className="main-content">{children}</div>;
  }

  return (
    <>
      <div className="main-container">
        <NavbarComponent />
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
