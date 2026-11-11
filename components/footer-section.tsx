"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faXTwitter,
  faDiscord,
  faRust,
} from "@fortawesome/free-brands-svg-icons";
import { Crosshair } from "@/components/crosshair";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  APP_VERSION,
  GITHUB_DOCS_URL,
  GITHUB_REPO_URL,
} from "@/lib/constants";

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: GITHUB_REPO_URL,
    icon: faGithub,
    ariaLabel: "ffez GitHub repository",
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/debangshu919",
    icon: faXTwitter,
    ariaLabel: "Follow ffez on X",
  },
  {
    name: "Discord",
    href: "https://discord.gg",
    icon: faDiscord,
    ariaLabel: "Join Discord community",
  },
  {
    name: "Crates.io",
    href: "https://crates.io/crates/ffez",
    icon: faRust,
    ariaLabel: "ffez crate on crates.io",
  },
] as const;

interface NavLink {
  title: string;
  href: string;
  external?: boolean;
}

const RESOURCES_LINKS: readonly NavLink[] = [
  { title: "Documentation", href: GITHUB_DOCS_URL, external: true },
  { title: "Cargo Quickstart", href: GITHUB_DOCS_URL, external: true },
  { title: "Homebrew Formula", href: GITHUB_REPO_URL, external: true },
  { title: "GitHub Releases", href: `${GITHUB_REPO_URL}/releases`, external: true },
  { title: "crates.io Package", href: "https://crates.io/crates/ffez", external: true },
];

const PROJECT_LINKS: readonly NavLink[] = [
  { title: "Rust Architecture", href: "#features" },
  { title: "Developer FAQ", href: "#features" },
  {
    title: "MIT License",
    href: `${GITHUB_REPO_URL}/blob/main/LICENSE-MIT`,
    external: true,
  },
  {
    title: "Apache-2.0 License",
    href: `${GITHUB_REPO_URL}/blob/main/LICENSE-APACHE`,
    external: true,
  },
  { title: "Security & Issues", href: `${GITHUB_REPO_URL}/issues`, external: true },
];

export function FooterSection() {
  return (
    <footer className="dark w-full bg-background text-foreground relative border-t border-border">
      <div
        className={cn(
          "mx-auto max-w-6xl relative border-x border-border px-4 sm:px-8 pt-12 sm:pt-16 pb-8 overflow-hidden",
          // Radial spotlight glow inspiration from footer-2
          "bg-[radial-gradient(35%_70%_at_15%_0%,rgba(255,255,255,0.06),transparent)]"
        )}
      >
        {/* Top Section: footer-2 Grid Structure */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 relative z-10">
          {/* Left Brand Column (45% on desktop - from footer-2) */}
          <div className="md:col-span-6 lg:col-span-7 flex flex-col items-start gap-4">
            <Link
              href="/"
              className="w-max inline-flex items-center gap-2 focus-visible:outline-hidden"
              aria-label="ffez home"
            >
              <Image
                src="/dark-mode-logo.svg"
                alt="ffez"
                width={100}
                height={34}
                className="h-7 w-auto object-contain opacity-95 hover:opacity-100 transition-opacity"
              />
              <span className="font-mono text-[10px] text-primary/80 border border-primary/30 bg-primary/10 px-1.5 py-0.5 select-none">
                {APP_VERSION}
              </span>
            </Link>

            {/* Brand Tagline */}
            <p className="max-w-sm text-balance text-sm text-muted-foreground leading-relaxed font-sans">
              Never look up FFmpeg flags again. An open-source, deterministic
              CLI wrapper for fast media manipulation with instant dry-run previews.
            </p>

            {/* Social Icon Buttons (from footer-2 & footer-14) */}
            <div className="flex items-center gap-2 mt-2">
              {SOCIAL_LINKS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "icon" }),
                    "size-8 rounded-lg border-border/80 bg-card/60 hover:bg-muted/80 hover:border-foreground/30 hover:text-foreground text-muted-foreground transition-all duration-150"
                  )}
                >
                  <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Navigation Columns */}
          <div className="md:col-span-6 lg:col-span-5 grid grid-cols-2 gap-8 sm:gap-12 md:max-w-sm md:ml-auto w-full">
            {/* Column 1: Resources */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground/80 select-none">
                Resources
              </span>
              <ul className="flex flex-col gap-2">
                {RESOURCES_LINKS.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Project */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground/80 select-none">
                Project
              </span>
              <ul className="flex flex-col gap-2">
                {PROJECT_LINKS.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal Links & Live Status Indicator (from footer-14 & footer-2) */}
        <div className="mt-4 pt-6 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-sans relative z-10">
          {/* Left Copyright & Legal */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-center sm:text-left">
            <span>&copy; 2026 ffez. All rights reserved.</span>
            <span className="hidden sm:inline text-muted-foreground/30">&middot;</span>
            <span className="hidden sm:inline text-muted-foreground/30">&middot;</span>
            <Link
              href={GITHUB_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href={GITHUB_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Corner CAD Crosshairs */}
        <Crosshair type="plus" className="-top-[7px] -left-[7px]" />
        <Crosshair type="plus" className="-top-[7px] -right-[7px]" />
        <Crosshair type="minus" className="-bottom-[7px] -left-[7px]" />
        <Crosshair type="minus" className="-bottom-[7px] -right-[7px]" />
      </div>
    </footer>
  );
}
