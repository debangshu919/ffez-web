"use client";

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon, Tick01Icon } from "@hugeicons/core-free-icons";
import { INSTALL_COMMAND } from "@/lib/constants";

const COPY_FEEDBACK_DURATION_MS = 2000;

const CORNER_BRACKETS = [
  { position: "-top-px -left-px", path: "M6 0.5H0.5V6" },
  { position: "-top-px -right-px", path: "M0 0.5h5.5V6" },
  { position: "-bottom-px -left-px", path: "M0.5 0v5.5H6" },
  { position: "-bottom-px -right-px", path: "M0 5.5h5.5V0" },
] as const;

export function HeroCommandPill() {
  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopied(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, COPY_FEEDBACK_DURATION_MS);
    } catch {
      // Fallback when Clipboard API is unavailable
    }
  }, []);

  return (
    <div className="relative inline-flex items-center">
      {/* Interactive Command Pill with Flush Technical Corner Brackets (0 padding) */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy '${INSTALL_COMMAND}' to clipboard`}
        title="Click to copy install command"
        className="relative group flex items-center gap-3 px-3.5 py-1.5 bg-card/60 hover:bg-muted/60 border border-border/80 transition-all cursor-pointer rounded-none active:scale-[0.99] select-none"
      >
        {/* Flush CAD Corner Brackets */}
        {CORNER_BRACKETS.map((bracket) => (
          <svg
            key={bracket.position}
            className={`absolute ${bracket.position} h-1.5 w-1.5 text-muted-foreground/80 group-hover:text-primary transition-colors select-none pointer-events-none`}
            viewBox="0 0 6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            aria-hidden="true"
          >
            <path d={bracket.path} />
          </svg>
        ))}

        {/* Command text */}
        <div className="flex items-center font-mono text-xs sm:text-[13px] tracking-tight">
          <span className="text-primary mr-2 font-medium select-none">$</span>
          <span className="text-foreground font-medium group-hover:text-primary transition-colors">
            {INSTALL_COMMAND}
          </span>
        </div>

        {/* Copy action icon & feedback */}
        <div className="flex items-center pl-2 border-l border-border/60 text-muted-foreground group-hover:text-foreground">
          {copied ? (
            <span className="flex items-center gap-1 font-mono text-[11px] text-primary font-medium animate-in fade-in zoom-in duration-150">
              <HugeiconsIcon icon={Tick01Icon} className="h-3.5 w-3.5" />
              <span>Copied!</span>
            </span>
          ) : (
            <HugeiconsIcon
              icon={Copy01Icon}
              className="h-3.5 w-3.5 transition-transform duration-150 group-hover:scale-110"
            />
          )}
        </div>
      </button>
    </div>
  );
}
