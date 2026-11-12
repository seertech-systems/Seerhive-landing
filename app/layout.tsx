import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoreProvider from "@/store/StoreProvider";
import HiveLoader from "@/components/HiveLoader";
import ScrollReveal from "@/components/ScrollReveal";
import HashScroll from "@/components/HashScroll";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "SeerHive — Intelligent Solutions, Infinite Possibilities",
  description:
    "SeerHive brings SeerHive Recruit AI, SeerVoiz AI (voice intelligence powered by AI), SeerHive Invoicing, the SeerHive Data Ingestion Pipeline and the SeerHive HRMS + ATS together, with AI solutions, custom software development and staffing services.",
};

// Runs before paint so the correct theme class is set with no flash, and so
// scroll-reveal targets start hidden immediately (ScrollReveal then reveals them;
// the <noscript> below keeps everything visible when JS is unavailable).
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('seertech-theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    if (theme === 'light') document.documentElement.classList.add('light');
  } catch (e) {}
  document.documentElement.classList.add('reveal-ready');
  // Loader plays on the first visit of a browser session; hide it before paint afterwards.
  try {
    if (sessionStorage.getItem('seerhive-loader-seen')) document.documentElement.classList.add('hive-seen');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={body.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <noscript>
          <style>{`html.reveal-ready [data-reveal]{opacity:1!important;transform:none!important}#hive-loader{display:none!important}`}</style>
        </noscript>
      </head>
      <body className="font-body antialiased bg-ink text-paper transition-colors duration-300">
        <StoreProvider>
        <HiveLoader />
        <Navbar />
        <ScrollReveal />
        <HashScroll />
        {children}
        <Footer />
        <ScrollToTop />
        </StoreProvider>
      </body>
    </html>
  );
}
