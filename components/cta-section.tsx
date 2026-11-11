"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface InstallMethod {
  id: "cargo" | "brew" | "curl";
  label: string;
  command: string;
  helper: string;
}

const INSTALL_METHODS: readonly InstallMethod[] = [
  {
    id: "cargo",
    label: "cargo",
    command: "cargo install ffez",
    helper: "Compiles native Rust binary directly from crates.io",
  },
  {
    id: "brew",
    label: "brew",
    command: "brew install debangshu919/tap/ffez",
    helper: "Prebuilt packages for macOS Apple Silicon and Intel",
  },
  {
    id: "curl",
    label: "curl",
    command: "curl -sSf https://raw.githubusercontent.com/debangshu919/ffez/main/install.sh | sh",
    helper: "Standalone binary for Linux, macOS, and Windows",
  },
];

interface CtaSectionProps extends React.ComponentProps<"div"> {
  heading?: string;
  subheading?: string;
}

export function CtaSection({
  className,
  heading = "Stop fighting FFmpeg flags.",
  subheading = "Add ffez to your toolchain in 10 seconds. Clean up screen recordings, extract audio tracks, and format video directly from your shell.",
  ...props
}: CtaSectionProps) {
  const [activeMethod, setActiveMethod] = React.useState<InstallMethod["id"]>("cargo");
  const [copied, setCopied] = React.useState(false);

  const currentMethod =
    INSTALL_METHODS.find((m) => m.id === activeMethod) || INSTALL_METHODS[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentMethod.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-6xl relative border-x border-border flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-16 py-20 sm:py-24 md:py-28 overflow-hidden bg-background",
        className
      )}
      {...props}
    >
      {/* Subtle Vertical Dashed Center Guideline matching site CAD system */}
      <div className="pointer-events-none absolute top-0 left-1/2 -z-0 h-full border-l border-dashed border-border/60 -translate-x-1/2" />

      {/* Headline - specific, active, zero exclamation points */}
      <h2 className="relative z-10 font-heading text-center font-semibold text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight max-w-2xl leading-[1.15]">
        {heading}
      </h2>

      {/* Subhead - plain, specific, describes direct outcome */}
      <p className="relative z-10 mt-4 sm:mt-5 text-balance text-center font-sans text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
        {subheading}
      </p>

      {/* Interactive Install Commands Block */}
      <div className="relative z-10 mt-8 sm:mt-10 flex flex-col items-center w-full max-w-xl">
        {/* Method Switcher Tabs */}
        <div className="inline-flex items-center gap-1 p-1 border border-border bg-card/60 rounded-none mb-3 text-xs font-mono">
          {INSTALL_METHODS.map((method) => {
            const isActive = activeMethod === method.id;
            return (
              <button
                key={method.id}
                type="button"
                onClick={() => {
                  setActiveMethod(method.id);
                  setCopied(false);
                }}
                className={cn(
                  "px-3 py-1 transition-all cursor-pointer select-none",
                  isActive
                    ? "bg-foreground text-background font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {method.label}
              </button>
            );
          })}
        </div>

        {/* Terminal Command Box */}
        <div className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-card/80 border border-border rounded-none shadow-sm font-mono text-xs sm:text-sm text-foreground relative overflow-hidden group">
          <div className="flex items-center gap-2.5 min-w-0 overflow-x-auto scrollbar-none py-0.5">
            <span className="text-muted-foreground/60 select-none font-semibold">$</span>
            <span className="select-all text-left font-mono whitespace-nowrap">
              {currentMethod.command}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            aria-label={`Copy ${currentMethod.command} to clipboard`}
            className="p-1.5 shrink-0 rounded-none text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer relative focus-visible:outline-hidden"
          >
            {copied ? (
              <Check className="size-4 text-primary" />
            ) : (
              <Copy className="size-4" />
            )}
          </button>
        </div>

        {/* Microcopy & Feedback Status */}
        <div className="mt-2.5 flex items-center justify-between w-full px-1 text-[11px] font-mono text-muted-foreground">
          <span className="truncate">{currentMethod.helper}</span>
          <span
            className={cn(
              "shrink-0 font-medium transition-opacity duration-150",
              copied ? "opacity-100 text-primary" : "opacity-0"
            )}
          >
            Copied!
          </span>
        </div>

        {/* Developer Trust Signals */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground/80 font-sans">
          <span>Requires ffmpeg on PATH</span>
          <span className="text-muted-foreground/40">&middot;</span>
          <span>Single binary under 5MB</span>
          <span className="text-muted-foreground/40">&middot;</span>
          <span>Dual-licensed MIT / Apache-2.0</span>
        </div>
      </div>
    </div>
  );
}
