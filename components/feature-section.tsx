import { cn } from "@/lib/utils";
import type React from "react";
import { FullWidthDivider } from "@/components/full-width-divider";
import { Crosshair } from "@/components/crosshair";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	ZapIcon,
	ShieldCheck,
	GlobeIcon,
	CpuIcon,
	AudioWave01Icon,
	CheckmarkCircle02Icon,
	ComputerTerminal01Icon,
	Layers01Icon,
} from "@hugeicons/core-free-icons";

type FeatureType = {
	title: string;
	icon: React.ReactNode;
	description: string;
	badge?: string;
};

export function FeatureSection({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"mx-auto w-full max-w-6xl relative border-x border-border space-y-10 sm:space-y-12 py-16 sm:py-20",
				className
			)}
			{...props}
		>
			{/* Top of Section: '+' markers */}
			<Crosshair type="plus" className="-top-[7px] -left-[7px]" />
			<Crosshair type="plus" className="-top-[7px] -right-[7px]" />

			{/* Section Header */}
			<div className="max-w-3xl space-y-3 px-4 sm:px-6">
				<div className="inline-flex items-center gap-2 border border-border/80 bg-muted/50 px-2.5 py-1 text-[11px] font-mono font-medium text-primary tracking-wider uppercase">
					<span>Why use ffez</span>
				</div>

				<h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.15]">
					Built for speed, safety, and zero bloat.
				</h2>

				<p className="mt-2 text-base sm:text-lg text-muted-foreground leading-relaxed font-sans">
					ffez eliminates the friction of raw FFmpeg while keeping the full
					fidelity, deterministic control, and performance of native Rust.
				</p>
			</div>

			{/* 8-Card (2x4) Grid with Full-Width Dividers */}
			<div className="relative grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
				<FullWidthDivider position="top" />

				{features.map((feature) => (
					<FeatureCard feature={feature} key={feature.title} />
				))}

				<FullWidthDivider position="bottom" />

			</div>
		</div>
	);
}

export function FeatureCard({
	feature,
	className,
	...props
}: React.ComponentProps<"div"> & {
	feature: FeatureType;
}) {
	return (
		<div
			className={cn(
				"relative flex flex-col justify-between overflow-hidden bg-background p-5 sm:p-6 transition-colors hover:bg-muted/30",
				className
			)}
			{...props}
		>
			<div>
				<div className="relative z-10 flex items-center justify-between pt-2 pb-6">
					<div className="flex items-center [&_svg]:size-5 [&_svg]:text-primary">
						{feature.icon}
					</div>
					{feature.badge && (
						<span className="font-mono text-[10px] text-muted-foreground/70 bg-muted/60 border border-border/60 px-1.5 py-0.5 select-none">
							{feature.badge}
						</span>
					)}
				</div>

				<div className="relative z-10 space-y-2">
					<h3 className="font-heading font-medium text-foreground text-lg">
						{feature.title}
					</h3>
					<p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-sans">
						{feature.description}
					</p>
				</div>
			</div>
		</div>
	);
}

const features: FeatureType[] = [
	{
		title: "Instant Stream Copy",
		icon: <HugeiconsIcon icon={ZapIcon} strokeWidth={2} />,
		description:
			"Strips audio and trims video in milliseconds by copying streams directly with zero re-encoding and 0% quality loss.",
		badge: "<100ms execution",
	},
	{
		title: "Deterministic Planning",
		icon: <HugeiconsIcon icon={ShieldCheck} strokeWidth={2} />,
		description:
			"Plans exact FFmpeg arguments predictably before touching files. Inspect the full command array with --dry-run.",
		badge: "--dry-run safe",
	},
	{
		title: "Platform Presets",
		icon: <HugeiconsIcon icon={GlobeIcon} strokeWidth={2} />,
		description:
			"Pre-calculated bitrates for Discord (25MB limit), X (Twitter), and YouTube. Eliminates manual bitrate arithmetic.",
		badge: "Auto-budgeted",
	},
	{
		title: "Zero Runtime Bloat",
		icon: <HugeiconsIcon icon={CpuIcon} strokeWidth={2} />,
		description:
			"Lean standalone native binary under 5MB. Instant sub-millisecond startup with zero Python, Node, or Electron overhead.",
		badge: "<5MB binary",
	},
	{
		title: "Codec-Aware Extraction",
		icon: <HugeiconsIcon icon={AudioWave01Icon} strokeWidth={2} />,
		description:
			"Extract audio into MP3, WAV, FLAC, AAC, or Opus. Stream mapping and encoder flags configured automatically.",
		badge: "6 audio codecs",
	},
	{
		title: "Pre-Flight Guardrails",
		icon: <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />,
		description:
			"Validates system FFmpeg availability on PATH before executing tasks. Clear installation steps instead of cryptic shell exits.",
		badge: "Zero exit 127",
	},
	{
		title: "Script & CI/CD Ready",
		icon: <HugeiconsIcon icon={ComputerTerminal01Icon} strokeWidth={2} />,
		description:
			"Predictable exit codes and structured terminal messages built for local shell scripts, Git hooks, and CI/CD pipelines.",
		badge: "Automation safe",
	},
	{
		title: "Cross-Platform Native",
		icon: <HugeiconsIcon icon={Layers01Icon} strokeWidth={2} />,
		description:
			"First-class native binaries for macOS (Apple Silicon & Intel), Linux, and Windows with zero platform-specific quirks.",
		badge: "macOS · Linux · Win",
	},
];
