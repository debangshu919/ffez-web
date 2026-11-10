import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faInstagram,
  faXTwitter,
  faYoutube,
  faSlack,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { cn } from "@/lib/utils";

interface PlatformTarget {
  name: string;
  spec: string;
  icon: IconDefinition;
  wordmarkText: string;
  wordmarkClassName: string;
}

const TARGET_PLATFORMS: readonly PlatformTarget[] = [
  {
    name: "Discord",
    spec: "--target discord (25MB auto-fit, H.264/AAC)",
    icon: faDiscord,
    wordmarkText: "Discord",
    wordmarkClassName: "font-semibold tracking-tight",
  },
  {
    name: "Instagram",
    spec: "Reels & Stories 9:16 auto-fit export",
    icon: faInstagram,
    wordmarkText: "Instagram",
    wordmarkClassName: "font-semibold tracking-tight",
  },
  {
    name: "X (Twitter)",
    spec: "--target twitter (140s / 512MB social clip)",
    icon: faXTwitter,
    wordmarkText: "Twitter",
    wordmarkClassName: "font-medium tracking-tight",
  },
  {
    name: "YouTube",
    spec: "Optimal web-stream resolution & bitrate",
    icon: faYoutube,
    wordmarkText: "YouTube",
    wordmarkClassName: "font-bold tracking-tighter",
  },
  {
    name: "Slack",
    spec: "Silent async product demos & screen recordings",
    icon: faSlack,
    wordmarkText: "slack",
    wordmarkClassName: "font-bold tracking-tight lowercase",
  },
  {
    name: "WhatsApp",
    spec: "--target whatsapp (<16MB chat & status video limit)",
    icon: faWhatsapp,
    wordmarkText: "WhatsApp",
    wordmarkClassName: "font-semibold tracking-tight",
  },
];

export function HeroPlatforms() {
  return (
    <div className="w-full border-t border-border bg-background/80">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 w-full min-h-[58px] sm:min-h-[64px] lg:min-h-[68px]">
        {/* Leading Context Label */}
        <div className="col-span-2 sm:col-span-3 md:col-span-1 flex flex-row flex-wrap md:flex-col items-center justify-center text-center md:items-start md:text-left px-4 py-2.5 sm:py-3 sm:px-5 gap-x-1.5 border-b md:border-b-0 md:border-r border-border bg-card/20 select-none">
          <span className="text-[11px] sm:text-xs font-sans font-medium text-foreground/90 tracking-tight leading-snug">
            Target presets &
          </span>
          <span className="text-[11px] sm:text-xs font-sans text-muted-foreground/70 tracking-tight leading-snug">
            export profiles for
          </span>
        </div>

        {/* 6 Target Platform Cells */}
        {TARGET_PLATFORMS.map((platform, i) => {
          // Responsive blueprint borders matching the grid
          const isLast = i === TARGET_PLATFORMS.length - 1;
          const isMobileRowEnd = i % 2 === 1;
          const isTabletRowEnd = (i + 1) % 3 === 0;

          return (
            <div
              key={platform.name}
              title={`${platform.name}: ${platform.spec}`}
              className={cn(
                "group relative flex items-center justify-center gap-2.5 px-3 py-3.5 transition-all duration-150 select-none cursor-default",
                "text-muted-foreground/75 hover:text-foreground hover:bg-muted/25",
                // Mobile (2-column) borders
                !isMobileRowEnd && "border-r md:border-r-0 border-border",
                i < 4 && "border-b md:border-b-0 border-border",
                // Tablet (3-column) borders
                !isTabletRowEnd && "sm:border-r md:border-r-0 border-border",
                i < 3 && "sm:border-b md:border-b-0 border-border",
                // Desktop (7-column) borders
                !isLast && "md:border-r md:border-b-0 border-border",
                isLast && "border-r-0 border-b-0 md:border-b-0"
              )}
            >
              <FontAwesomeIcon
                icon={platform.icon}
                className="h-4 w-4 shrink-0 transition-transform duration-150 group-hover:scale-105"
              />
              <span
                className={cn(
                  "font-sans text-xs sm:text-[13px]",
                  platform.wordmarkClassName
                )}
              >
                {platform.wordmarkText}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
