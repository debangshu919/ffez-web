import Link from "next/link";
import { Crosshair } from "@/components/crosshair";
import { DiagonalHatch } from "@/components/diagonal-hatch";
import { HeroCommandPill } from "@/components/hero-command-pill";
import { HeroPreview } from "@/components/hero-preview";
import { HeroPlatforms } from "@/components/hero-platforms";
import { GITHUB_DOCS_URL } from "@/lib/constants";

export default function Home() {
  return (
    <div className="w-full relative flex-1 flex flex-col">
      {/* Main Framed Hero Text Container Continuous with Navbar Guidelines */}
      <main className="mx-auto max-w-6xl relative border-x border-border flex-1 w-full flex flex-col items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 border-b border-border">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Eyebrow: Interactive Cargo Install Pill with CAD Corner Brackets */}
          <HeroCommandPill />

          {/* Hero Headline */}
          <h1 className="mt-6 sm:mt-8 font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-semibold tracking-tight text-foreground leading-[1.12]">
            Never look up FFmpeg flags again.
          </h1>

          {/* Hero Subheadline */}
          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl text-center leading-relaxed font-sans">
            Stop searching Stack Overflow for{" "}
            <code className="text-foreground/90 bg-muted/60 px-1 py-0.5 rounded-none font-mono text-[0.9em] border border-border/50">
              -vn
            </code>{" "}
            and{" "}
            <code className="text-foreground/90 bg-muted/60 px-1 py-0.5 rounded-none font-mono text-[0.9em] border border-border/50">
              -c:v copy
            </code>{" "}
            flags.{" "}
            <span className="text-foreground font-medium">ffez</span> gives you
            human-readable commands for stripping audio, converting tracks, and
            formatting clips.
          </p>

          {/* Hero CTA Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="#commands"
              className="w-full sm:w-auto inline-flex h-10 items-center justify-center rounded-none bg-primary px-6 text-sm font-medium text-primary-foreground shadow-xs transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              Get Started
            </Link>

            <Link
              href={GITHUB_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex h-10 items-center justify-center rounded-none border border-border bg-card/60 px-6 text-sm font-medium text-foreground transition-all hover:bg-muted/80 active:scale-[0.98]"
            >
              Documentation
            </Link>
          </div>
        </div>
      </main>

      {/* Hero Preview Section (Green Animated Canvas + Interactive CLI Terminal) */}
      <section className="w-full border-b border-border bg-background relative">
        <div className="mx-auto max-w-6xl relative border-x border-border">
          <HeroPreview />
          <HeroPlatforms />

          {/* End of Section: '-' markers */}
          <Crosshair type="minus" className="-bottom-[7px] -left-[7px]" />
          <Crosshair type="minus" className="-bottom-[7px] -right-[7px]" />
        </div>
      </section>

      {/* Bottom Diagonal Striped Hatched Bar with Extended Horizontal Line */}
      <DiagonalHatch />
    </div>
  );
}
