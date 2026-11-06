import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/navbar";
import { THEME_STORAGE_KEY } from "@/lib/constants";
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

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    document.documentElement.classList.toggle('dark', stored !== 'light');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${rondel.variable} ${rondel.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
