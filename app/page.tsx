import Link from "next/link";
import { Crosshair } from "@/components/crosshair";
import { DiagonalHatch } from "@/components/diagonal-hatch";
import { HeroCommandPill } from "@/components/hero-command-pill";
import { HeroPreview } from "@/components/hero-preview";
import { Integrations } from "@/components/integrations";
import { RotatingText } from "@/components/ui/rotating-text";
import { DitherField } from "@/components/ui/dither-field";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { FeaturesSection } from "@/components/features-section";
import { Footer } from "@/components/footer";
import { GITHUB_DOCS_URL } from "@/lib/constants";

export default function Home() {
  return (
    <div className="w-full relative flex-1 flex flex-col">
      {/* Hero Section - Permanently Dark Mode */}
      <section className="dark w-full bg-background text-foreground relative flex flex-col">
        {/* Main Framed Hero Text Container Continuous with Navbar Guidelines */}
        <main className="mx-auto max-w-6xl relative isolate border-x border-border flex-1 w-full flex flex-col items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 border-b border-border overflow-hidden">
          <DitherField
            pattern="horizon"
            color="var(--primary)"
            dotSize={2}
            className="absolute inset-x-0 bottom-0 h-[480px] pointer-events-none z-0 [mask-image:linear-gradient(to_top,black_25%,black_65%,transparent_100%)]"
          />
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto relative z-10">
            {/* Eyebrow: Interactive Cargo Install Pill with CAD Corner Brackets */}
            <HeroCommandPill />

            {/* Hero Headline */}
            <h1 className="mt-6 sm:mt-8 font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-semibold tracking-tight text-foreground leading-[1.15]">
              One simple command for any video you need to{" "}
              <RotatingText
                texts={["mute.", "compress.", "trim.", "convert."]}
                effect="blur"
                mainClassName="text-primary font-mono inline-flex align-baseline"
                staggerDuration={0.025}
                rotationInterval={2500}
              />
            </h1>

            {/* Hero Subheadline */}
            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl text-center leading-relaxed font-sans">
              Clean up clips without launching a heavy video editor or uploading files to
              random websites.{" "}
              <span className="text-foreground font-medium">ffez</span> gives you
              fast, simple commands that run entirely on your own computer.
            </p>

            {/* Hero CTA Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <RainbowButton asChild className="w-full sm:w-auto">
                <Link href="#features">Get Started</Link>
              </RainbowButton>

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

        {/* Hero Preview Section & Target Presets Integration Block */}
        <div className="w-full border-b border-border bg-background relative">
          <div className="mx-auto max-w-6xl relative border-x border-border">
            <HeroPreview />
            <Integrations />

            {/* End of Section: '-' markers */}
            <Crosshair type="minus" className="-bottom-[7px] -left-[7px]" />
            <Crosshair type="minus" className="-bottom-[7px] -right-[7px]" />
          </div>
        </div>

        {/* Bottom Diagonal Striped Hatched Bar with Extended Horizontal Line */}
        <DiagonalHatch className="dark" />
      </section>

      {/* Features Section - Light Mode Section */}
      <FeaturesSection />

      {/* Footer Section - Efferd Footer-2 */}
      <Footer />
    </div>
  );
}
