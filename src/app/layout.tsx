import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "STOA Digital Transformation ROI Calculator",
  description:
    "Calculate the return on investment for your digital transformation initiatives with STOA's ROI calculator.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      {...{
        "data-new-gr-c-s-check-loaded": "suppress-hydration-warning",
        "data-gr-ext-installed": "suppress-hydration-warning",
      }}
    >
      <body
        className={`${plusJakarta.variable} ${outfit.variable}`}
        {...{
          "data-new-gr-c-s-check-loaded": "suppress-hydration-warning",
          "data-gr-ext-installed": "suppress-hydration-warning",
        }}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
