import localFont from "next/font/local";
import Providers from "./providers";
import "../index.css";
import "../App.css";
import "../assets/css/typography.css";
// Bootstrap CSS is loaded only when CaseStudy/WhitePaper modals open.

const beVietnamPro = localFont({
  src: [
    {
      path: "../../public/fonts/Be_Vietnam_Pro/BeVietnamPro-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Be_Vietnam_Pro/BeVietnamPro-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Be_Vietnam_Pro/BeVietnamPro-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Be_Vietnam_Pro/BeVietnamPro-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

const geist = localFont({
  src: "../../public/fonts/Geist/Geist-VariableFont_wght.ttf",
  variable: "--font-geist",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_FRONTEND_URL || "https://unboxrobotics.com",
  ),
  title: {
    default:
      "Unbox Robotics - Enter the world of new age parcel distribution",
    template: "%s | Unbox Robotics",
  },
  description:
    "Unleash blazing fast sortation & order consolidation through swarm robotics! Reach your customers faster via scalable automation that adapts to your business needs.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Unbox Robotics",
    images: [{ url: "/logo512.png" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  formatDetection: {
    telephone: false,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo192.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${beVietnamPro.variable} ${geist.variable}`}
    >
      <head>
        <link
          rel="preconnect"
          href="https://unboxadmin.4tysixapplabs.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        style={{
          fontFamily:
            'var(--font-be-vietnam-pro), "Be Vietnam Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
        }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
