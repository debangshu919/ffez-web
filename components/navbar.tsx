"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { StarIcon } from "@hugeicons/core-free-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Crosshair } from "@/components/crosshair";
import { DiagonalHatch } from "@/components/diagonal-hatch";
import {
  DEFAULT_GITHUB_STARS,
  GITHUB_API_REPO_URL,
  GITHUB_DOCS_URL,
  GITHUB_REPO_URL,
} from "@/lib/constants";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#scenarios", label: "Commands" },
  { href: "#comparison", label: "Comparison" },
] as const;

export function Navbar() {
  const [stars, setStars] = React.useState<number>(DEFAULT_GITHUB_STARS);

  React.useEffect(() => {
    const controller = new AbortController();

    fetch(GITHUB_API_REPO_URL, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { stargazers_count?: unknown } | null) => {
        if (data && typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {
        // Fallback to initial value on network error or abort
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      {/* Main Navbar Header - Locked to Dark Mode */}
      <header className="dark sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 sm:h-16 max-w-6xl relative border-x border-border items-center justify-between px-4 sm:px-6">
          {/* Left: Minimal Wordmark Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center transition-opacity hover:opacity-85 focus-visible:outline-hidden"
              aria-label="ffez home"
            >
              <Image
                src="/dark-mode-logo.svg"
                alt="ffez"
                width={116}
                height={80}
                className="h-8 md:h-9 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Center: Technical Nav Links with '+' indicators */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground font-sans">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1 transition-colors hover:text-foreground"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-muted-foreground/60 select-none">
                  +
                </span>
              </Link>
            ))}
            <Link
              href={GITHUB_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Docs
            </Link>
          </nav>

          {/* Right: GitHub Stars CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Star ffez on GitHub"
              className="group inline-flex h-8 sm:h-8.5 items-center gap-2 rounded-none bg-foreground px-3.5 text-xs font-sans font-medium text-background shadow-xs transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
            >
              <FontAwesomeIcon
                icon={faGithub}
                className="h-3.5 w-3.5 transition-transform duration-150 group-hover:scale-105"
              />
              <span className="tracking-tight font-medium">Star on GitHub</span>
              <span className="inline-flex items-center gap-1 rounded-none bg-background/20 px-1.5 py-0.5 font-mono text-[11px] font-medium tabular-nums text-background">
                <HugeiconsIcon
                  icon={StarIcon}
                  className="h-2.5 w-2.5 fill-current text-current"
                />
                <span>{stars}</span>
              </span>
            </a>
          </div>

          {/* Start of Hatched Banner Section: '+' markers */}
          <Crosshair type="plus" className="-bottom-[7px] -left-[7px]" />
          <Crosshair type="plus" className="-bottom-[7px] -right-[7px]" />
        </div>
      </header>

      {/* Diagonal Striped Hatched Bar with Extended Horizontal Line */}
      <DiagonalHatch className="dark" />
    </>
  );
}
