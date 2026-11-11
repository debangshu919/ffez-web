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
  title: "ffez — Never look up FFmpeg flags again",
  description:
    "An open-source, minimal FFmpeg CLI wrapper written in Rust. Extract audio, mute screen recordings, and format media with human-readable subcommands and instant --dry-run previews.",
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
      className={`${rondel.variable} ${rondel.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
