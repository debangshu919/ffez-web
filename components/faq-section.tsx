"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { GITHUB_REPO_URL } from "@/lib/constants";

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 1,
    question: "What types of video tasks does ffez handle?",
    answer:
      "ffez is built for routine media chores developers face every week: stripping microphone noise or audio from screen recordings, extracting audio tracks into MP3, WAV, or FLAC, trimming clips without re-encoding, and auto-budgeting bitrates to fit Discord or social platform upload limits.",
  },
  {
    id: 2,
    question: "How long does it take to process clips?",
    answer:
      "Most operations complete in under 100 milliseconds. ffez uses stream copying (-c:v copy) to strip audio or trim clips directly without re-encoding video frames, preserving 100% video quality with near-instant execution.",
  },
  {
    id: 3,
    question: "Does ffez install or bundle FFmpeg?",
    answer:
      "No. ffez orchestrates your local system's ffmpeg binary. Bundling FFmpeg would inflate binary downloads by over 80MB and risk version conflicts. Instead, ffez validates that ffmpeg is available on your PATH before execution and prints direct platform install commands if missing.",
  },
  {
    id: 4,
    question: "Can I inspect the exact FFmpeg command before running?",
    answer:
      "Yes. Append --dry-run to any command to print the exact planned FFmpeg invocation without executing it or touching any files. You can verify flags, paste them into shell scripts, or learn how raw FFmpeg handles the task.",
  },
  {
    id: 5,
    question: "What if I need complex multi-filter FFmpeg graphs?",
    answer:
      "For bespoke multi-layer compositions, subtitle burns, or custom filtergraphs, use raw FFmpeg. ffez is intentionally designed for the 90% of routine audio and video tasks developers perform every week, saving you from searching flag documentation.",
  },
  {
    id: 6,
    question: "Can I use ffez in shell scripts and CI/CD pipelines?",
    answer:
      "Yes. ffez returns predictable exit codes and clean, machine-friendly terminal messages. Pre-flight guardrails prevent exit code 127 crashes, making it safe for Git hooks, shell automations, and CI runners.",
  },
  {
    id: 7,
    question: "How does platform sizing work for Discord and social uploads?",
    answer:
      "The ffez platform command automatically calculates optimal target bitrates based on clip duration and file size ceilings (like Discord's 25MB limit), eliminating manual bitrate arithmetic.",
  },
  {
    id: 8,
    question: "What operating systems and architectures are supported?",
    answer:
      "ffez compiles to lean native binaries under 5MB for macOS (Apple Silicon and Intel), Linux (x86_64 and ARM64), and Windows with zero Python, Node.js, or Electron runtime dependencies.",
  },
];

interface FaqSectionProps extends React.ComponentProps<"div"> {
  items?: FaqItem[];
  defaultOpenId?: number | null;
  heading?: string;
  subheading?: string;
  contactText?: string;
  contactHref?: string;
}

export function FaqSection({
  className,
  items = DEFAULT_FAQS,
  defaultOpenId = null,
  heading = "Your questions,\nanswered",
  subheading = "Get quick answers to the most common questions about ffez, FFmpeg orchestration, and video workflows.",
  contactText = "Contact Us",
  contactHref = `${GITHUB_REPO_URL}/issues`,
  ...props
}: FaqSectionProps) {
  const [openId, setOpenId] = React.useState<number | null>(defaultOpenId);

  const toggleItem = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-6xl relative border-x border-border",
        className
      )}
      {...props}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Column: Heading, Subtitle & Contact Link */}
        <div className="lg:col-span-1 p-6 sm:p-10 lg:p-12 xl:p-16 lg:border-r border-b lg:border-b-0 border-border flex flex-col justify-between">
          <div className="space-y-4 sm:space-y-6">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight text-foreground leading-[1.12] whitespace-pre-line">
              {heading}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans max-w-md">
              {subheading}
            </p>
          </div>

          <div className="mt-8 lg:mt-16 text-xs sm:text-sm text-muted-foreground font-sans">
            <span>Can&apos;t find what you&apos;re looking for? </span>
            <Link
              href={contactHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-medium hover:underline transition-colors"
            >
              {contactText}
            </Link>
          </div>
        </div>

        {/* Right Column: Accordion Table (Centered 50/50 Split without numbering) */}
        <div className="lg:col-span-1 flex flex-col">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="border-b border-border last:border-b-0 transition-colors group hover:bg-muted/10 p-5 sm:p-6 lg:p-7"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-4 text-left cursor-pointer focus-visible:outline-hidden group/trigger"
                >
                  <span
                    className={cn(
                      "font-heading font-medium sm:font-semibold text-foreground text-sm sm:text-base md:text-[17px] leading-snug transition-colors",
                      isOpen
                        ? "text-foreground"
                        : "text-foreground/90 group-hover/trigger:text-foreground"
                    )}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 text-muted-foreground transition-transform duration-200 mt-1",
                      isOpen
                        ? "rotate-180 text-foreground"
                        : "group-hover/trigger:text-foreground"
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 sm:pt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans pr-2 sm:pr-6">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
