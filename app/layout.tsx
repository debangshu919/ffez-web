import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const rondel = localFont({
  src: "../public/fonts/rondel.woff2",
  variable: "--font-rondel",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ffez | Simple FFmpeg CLI to Mute, Trim, and Convert Video",
  description:
    "Mute screen recordings, extract audio, and format video without memorizing FFmpeg flags. Fast, local Rust CLI with plain subcommands and --dry-run previews.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${rondel.variable} ${rondel.className} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
