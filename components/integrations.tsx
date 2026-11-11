"use client";

import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faDiscord,
  faInstagram,
  faXTwitter,
  faYoutube,
  faSlack,
  faWhatsapp,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { cn } from "@/lib/utils";
import { FullWidthDivider } from "@/components/full-width-divider";
import { RotatingText, type RotatingTextRef } from "@/components/ui/rotating-text";

interface PlatformData {
  name: string;
  icon: IconDefinition;
  flag: string;
  flagColor: string;
  spec: string;
  accentClass: string;
}

interface TileData {
  row: number;
  col: number;
  platform?: PlatformData;
}

const HEADLINE_TEXTS = [
  "every platform.",
  "Discord.",
  "X.",
  "YouTube.",
  "Slack.",
  "WhatsApp.",
  "Instagram.",
  "TikTok.",
];

const HEADLINE_COLORS = [
  "#ffffff", // every platform.
  "#5865F2", // Discord.
  "#ffffff", // X.
  "#FF0000", // YouTube.
  "#EBB12C", // Slack.
  "#25D366", // WhatsApp.
  "#FD01BF", // Instagram.
  "#25F4EE", // TikTok.
];

const PLATFORM_INDEX_MAP: Record<string, number> = {
  Discord: 1,
  "X (Twitter)": 2,
  YouTube: 3,
  Slack: 4,
  WhatsApp: 5,
  Instagram: 6,
  TikTok: 7,
};

const PLATFORM_FLAGS: Record<string, string> = {
  Discord: "--target discord",
  "X (Twitter)": "--target twitter",
  YouTube: "--target youtube",
  Slack: "--target slack",
  WhatsApp: "--target whatsapp",
  Instagram: "--target instagram",
  TikTok: "--target tiktok",
};

export function Integrations() {
  const [copied, setCopied] = React.useState(false);
  const [hoveredPlatform, setHoveredPlatform] = React.useState<string | null>(null);
  const rotatingRef = React.useRef<RotatingTextRef>(null);

  const handlePlatformHover = React.useCallback((name: string | null) => {
    setHoveredPlatform(name);
    setCopied(false);
    if (name && PLATFORM_INDEX_MAP[name] !== undefined) {
      rotatingRef.current?.jumpTo(PLATFORM_INDEX_MAP[name]);
    } else {
      rotatingRef.current?.jumpTo(0);
    }
  }, []);

  const currentFlag = (hoveredPlatform && PLATFORM_FLAGS[hoveredPlatform])
    ? PLATFORM_FLAGS[hoveredPlatform]
    : "--target <platform>";

  const currentCommand = `ffez platform video.mp4 ${currentFlag}`;

  const copyCommand = () => {
    navigator.clipboard.writeText(currentCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full border-t border-border bg-background/60 overflow-hidden">
      <FullWidthDivider position="top" />

      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center px-4 sm:px-8 py-14 sm:py-18 relative z-10">
        {/* Left Content: Headline, Description & CLI Command Preview */}
        <div className="lg:col-span-6 flex flex-col items-start gap-4 sm:gap-5">
          {/* Section Headline */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[40px] font-semibold tracking-tight text-foreground leading-[1.15]">
            Export clips that fit upload limits on{" "}
            <RotatingText
              ref={rotatingRef}
              texts={HEADLINE_TEXTS}
              colors={HEADLINE_COLORS}
              effect="blur"
              auto={false}
              staggerDuration={0.025}
              mainClassName="inline-flex align-baseline font-semibold"
            />
          </h2>

          {/* Subhead Explanation */}
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans max-w-xl">
            Skip manual bitrate math and rejected uploads. Pass a target and{" "}
            <span className="text-foreground font-medium">ffez</span> handles
            compression, dimensions, and audio so your clip slides right under
            destination caps.
          </p>

          {/* Action Row: Interactive Command Snippet + Documentation Link */}
          <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={copyCommand}
              className="group inline-flex items-center gap-2.5 rounded-lg border border-border/90 bg-card/80 px-3.5 py-2 font-mono text-xs text-foreground transition-all duration-150 hover:border-primary/50 hover:bg-muted/60 active:scale-[0.98] select-none"
              title="Click to copy command"
            >
              <span className="text-primary font-bold select-none">$</span>
              <span className="text-foreground/90">
                {currentCommand}
              </span>
              <span className="ml-1 text-[10px] text-muted-foreground group-hover:text-primary transition-colors">
                {copied ? "Copied!" : "Copy"}
              </span>
            </button>
          </div>
        </div>

        {/* Right Content: Scattered 64px Blueprint Matrix */}
        <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
          <div
            className="relative w-[320px] h-[320px] select-none"
            onMouseLeave={() => handlePlatformHover(null)}
          >
            {/* Blueprint Grid Lines with Soft Radial Falloff */}
            <div
              className={cn(
                "absolute inset-0 size-full pointer-events-none",
                "bg-[linear-gradient(to_right,oklch(1_0_0_/_10%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0_/_10%)_1px,transparent_1px)]",
                "bg-[size:64px_64px]",
                "[mask-image:radial-gradient(ellipse_at_center,black_45%,black_70%,transparent_100%)]"
              )}
            />

            {/* Scattered Platform Tiles */}
            {TILES.map((tile) => (
              <IntegrationCard
                key={`${tile.row}_${tile.col}`}
                {...tile}
                onHover={handlePlatformHover}
              />
            ))}
          </div>
        </div>
      </div>

      <FullWidthDivider position="bottom" />
    </div>
  );
}

interface IntegrationCardProps extends TileData {
  onHover?: (name: string | null) => void;
}

function IntegrationCard({ row, col, platform, onHover }: IntegrationCardProps) {
  // Empty decorative aesthetic tile
  if (!platform) {
    return (
      <div
        className="absolute size-16 flex items-center justify-center pointer-events-none"
        style={{
          left: col * 64,
          top: row * 64,
        }}
      >
        <div className="size-2 rounded-full bg-border/40" />
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => onHover?.(platform.name)}
      className={cn(
        "group absolute size-16 flex items-center justify-center rounded-xl",
        "border border-border/80 bg-card/75 backdrop-blur-xs",
        "transition-all duration-200 cursor-pointer",
        "hover:z-20 hover:scale-110 hover:shadow-lg hover:border-primary/50 hover:bg-card/95",
        platform.accentClass
      )}
      style={{
        left: col * 64,
        top: row * 64,
      }}
    >
      <FontAwesomeIcon
        icon={platform.icon}
        className="h-6 w-6 text-foreground/80 group-hover:text-foreground transition-transform duration-150 group-hover:scale-110"
      />

      {/* Floating Tooltip Hover Badge */}
      <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-30 whitespace-nowrap">
        <div className="rounded border border-border bg-popover/95 backdrop-blur-md px-2 py-0.5 text-[11px] font-mono text-popover-foreground shadow-md flex items-center gap-1.5">
          <span className={cn("font-semibold", platform.flagColor)}>{platform.flag}</span>
          <span className="text-muted-foreground/80">({platform.spec})</span>
        </div>
      </div>
    </div>
  );
}

// 5x5 Grid Mapping matching the scattered Efferd integrations aesthetic
const TILES: readonly TileData[] = [
  // Row 0
  {
    row: 0,
    col: 1,
    platform: {
      name: "Discord",
      icon: faDiscord,
      flag: "--target discord",
      flagColor: "text-[#5865F2]",
      spec: "25MB cap",
      accentClass: "hover:border-[#5865F2]/60 hover:text-[#5865F2]",
    },
  },
  {
    row: 0,
    col: 3,
    platform: {
      name: "X (Twitter)",
      icon: faXTwitter,
      flag: "--target twitter",
      flagColor: "text-foreground",
      spec: "512MB / 140s",
      accentClass: "hover:border-foreground/60 hover:text-foreground",
    },
  },

  // Row 1
  { row: 1, col: 0 }, // Empty CAD marker
  {
    row: 1,
    col: 2,
    platform: {
      name: "YouTube",
      icon: faYoutube,
      flag: "--target youtube",
      flagColor: "text-[#FF0000]",
      spec: "Web stream",
      accentClass: "hover:border-[#FF0000]/60 hover:text-[#FF0000]",
    },
  },
  {
    row: 1,
    col: 4,
    platform: {
      name: "Slack",
      icon: faSlack,
      flag: "--target slack",
      flagColor: "text-[#EBB12C]",
      spec: "Silent demo",
      accentClass: "hover:border-[#EBB12C]/60 hover:text-[#EBB12C]",
    },
  },

  // Row 2
  {
    row: 2,
    col: 1,
    platform: {
      name: "WhatsApp",
      icon: faWhatsapp,
      flag: "--target whatsapp",
      flagColor: "text-[#25D366]",
      spec: "<16MB limit",
      accentClass: "hover:border-[#25D366]/60 hover:text-[#25D366]",
    },
  },
  { row: 2, col: 3 }, // Empty CAD marker

  // Row 3
  { row: 3, col: 0 }, // Empty CAD marker
  {
    row: 3,
    col: 2,
    platform: {
      name: "Instagram",
      icon: faInstagram,
      flag: "--target instagram",
      flagColor: "text-[#FD01BF]",
      spec: "9:16 vertical",
      accentClass: "hover:border-[#FD01BF]/60 hover:text-[#FD01BF]",
    },
  },
  {
    row: 3,
    col: 4,
    platform: {
      name: "TikTok",
      icon: faTiktok,
      flag: "--target tiktok",
      flagColor: "text-[#25F4EE]",
      spec: "9:16 vertical",
      accentClass: "hover:border-[#25F4EE]/60 hover:text-[#25F4EE]",
    },
  },

  // Row 4
  { row: 4, col: 1 }, // Empty CAD marker
  { row: 4, col: 3 }, // Empty CAD marker
];
