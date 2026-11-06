"use client";

import * as React from "react";

interface CommandDemo {
  id: number;
  dir: string;
  folderName: string;
  command: string;
  out1: string;
  out2: string;
  out3: string;
  out4: string;
}

const DEMOS: readonly CommandDemo[] = [
  {
    id: 1,
    dir: "~/recordings",
    folderName: "recordings",
    command: "ffez mute bug-demo.mov bug-demo-clean.mp4",
    out1: "Inspecting bug-demo.mov (1920×1080 @ 60fps, 48kHz stereo AAC)",
    out2: "Plan: copy video stream, strip audio tracks",
    out3: "ffmpeg -i bug-demo.mov -c:v copy -an bug-demo-clean.mp4",
    out4: "Completed in 0.08s -> bug-demo-clean.mp4 (stream copied, 0% quality loss)",
  },
  {
    id: 2,
    dir: "~/media",
    folderName: "media",
    command: "ffez audio interview.mp4 soundtrack.mp3 --format mp3",
    out1: "Inspecting interview.mp4 (3840×2160 H.265, 48kHz stereo AAC)",
    out2: "Plan: extract audio stream #0:1 -> MP3 (libmp3lame, VBR Q2)",
    out3: "ffmpeg -i interview.mp4 -vn -c:a libmp3lame -q:a 2 soundtrack.mp3",
    out4: "Completed in 0.38s -> soundtrack.mp3 (48.6 MB, 320kbps MP3)",
  },
  {
    id: 3,
    dir: "~/demos",
    folderName: "demos",
    command: "ffez platform walkthrough.mp4 --target discord",
    out1: "Inspecting walkthrough.mp4 (188.4 MB, 1440p @ 60fps)",
    out2: "Plan: target profile Discord (<25MB, two-pass H.264/AAC)",
    out3: "ffmpeg -i walkthrough.mp4 -vf scale=1280:-2 -b:v 1.8M walkthrough-discord.mp4",
    out4: "Completed in 1.12s -> walkthrough-discord.mp4 (23.8 MB, <25MB limit)",
  },
];

const CLEAR_COMMAND = "clear";

type TerminalPhase =
  | "fresh_prompt"
  | "typing_command"
  | "pause_command"
  | "out1"
  | "out2"
  | "out3"
  | "out4"
  | "done_prompt"
  | "typing_clear"
  | "pause_clear";

const PHASE_ORDER: Record<TerminalPhase, number> = {
  fresh_prompt: 0,
  typing_command: 1,
  pause_command: 2,
  out1: 3,
  out2: 4,
  out3: 5,
  out4: 6,
  done_prompt: 7,
  typing_clear: 8,
  pause_clear: 9,
};

const STATIC_PHASE_TRANSITIONS: Partial<
  Record<TerminalPhase, { next: TerminalPhase; delay: number }>
> = {
  fresh_prompt: { next: "typing_command", delay: 500 },
  pause_command: { next: "out1", delay: 200 },
  out1: { next: "out2", delay: 220 },
  out2: { next: "out3", delay: 200 },
  out3: { next: "out4", delay: 280 },
  out4: { next: "done_prompt", delay: 320 },
  done_prompt: { next: "typing_clear", delay: 4500 },
};

function TerminalPrompt({
  dir,
  text,
  showCursor,
  className,
}: {
  dir: string;
  text: string;
  showCursor: boolean;
  className?: string;
}) {
  return (
    <div className={className ?? "flex flex-wrap items-center gap-2"}>
      <span className="text-emerald-400 font-medium select-none">
        user@macbook
      </span>
      <span className="text-blue-400 select-none">{dir}</span>
      <span className="text-zinc-500 select-none">%</span>
      <span className="text-white font-medium">
        {text}
        {showCursor && (
          <span className="inline-block w-[2px] h-[1.15em] bg-zinc-100 ml-0.5 align-text-bottom animate-cursor-blink select-none" />
        )}
      </span>
    </div>
  );
}

export function HeroTerminal() {
  const [demoIndex, setDemoIndex] = React.useState(0);
  const [typedChars, setTypedChars] = React.useState(0);
  const [clearTypedChars, setClearTypedChars] = React.useState(0);
  const [phase, setPhase] = React.useState<TerminalPhase>("fresh_prompt");

  const currentDemo = DEMOS[demoIndex];

  const handleReplay = React.useCallback(() => {
    setDemoIndex(0);
    setTypedChars(0);
    setClearTypedChars(0);
    setPhase("fresh_prompt");
  }, []);

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const staticTransition = STATIC_PHASE_TRANSITIONS[phase];
    if (staticTransition) {
      timer = setTimeout(() => {
        setPhase(staticTransition.next);
      }, staticTransition.delay);
    } else if (phase === "typing_command") {
      if (typedChars < currentDemo.command.length) {
        const delay = 30 + Math.random() * 30;
        timer = setTimeout(() => {
          setTypedChars((prev) => prev + 1);
        }, delay);
      } else {
        timer = setTimeout(() => {
          setPhase("pause_command");
        }, 350);
      }
    } else if (phase === "typing_clear") {
      if (clearTypedChars < CLEAR_COMMAND.length) {
        timer = setTimeout(() => {
          setClearTypedChars((prev) => prev + 1);
        }, 80);
      } else {
        timer = setTimeout(() => {
          setPhase("pause_clear");
        }, 300);
      }
    } else if (phase === "pause_clear") {
      timer = setTimeout(() => {
        setTypedChars(0);
        setClearTypedChars(0);
        setDemoIndex((prev) => (prev + 1) % DEMOS.length);
        setPhase("fresh_prompt");
      }, 180);
    }

    return () => clearTimeout(timer);
  }, [phase, typedChars, clearTypedChars, currentDemo.command.length]);

  const activeCommandText = currentDemo.command.slice(0, typedChars);
  const activeClearText = CLEAR_COMMAND.slice(0, clearTypedChars);

  const currentPhaseOrder = PHASE_ORDER[phase];
  const isPromptActive = currentPhaseOrder <= PHASE_ORDER.typing_command;
  const showOut1 = currentPhaseOrder >= PHASE_ORDER.out1;
  const showOut2 = currentPhaseOrder >= PHASE_ORDER.out2;
  const showOut3 = currentPhaseOrder >= PHASE_ORDER.out3;
  const showOut4 = currentPhaseOrder >= PHASE_ORDER.out4;
  const showBottomPrompt = currentPhaseOrder >= PHASE_ORDER.done_prompt;

  return (
    <div className="w-full max-w-3xl mx-auto rounded-lg border border-white/15 bg-[#121214] shadow-2xl shadow-black/70 overflow-hidden font-mono text-left">
      {/* macOS Terminal Titlebar */}
      <div className="relative flex items-center justify-between px-4 h-9 bg-[#1c1c1f] border-b border-white/10 select-none">
        {/* Left: macOS Traffic Light Buttons */}
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/80 shadow-xs" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/80 shadow-xs" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f] border border-[#1aab29]/80 shadow-xs" />
        </div>

        {/* Center: macOS Window Title with Folder Icon */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs text-zinc-400 font-normal">
          <svg
            className="h-3.5 w-3.5 text-zinc-500"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M1.75 2.5A.75.75 0 0 0 1 3.25v9.5c0 .414.336.75.75.75h12.5a.75.75 0 0 0 .75-.75v-7.5a.75.75 0 0 0-.75-.75H8.81l-1.47-1.47A.75.75 0 0 0 6.81 2.5H1.75Z" />
          </svg>
          <span>{currentDemo.folderName} — zsh — 80×24</span>
        </div>

        {/* Right: Subtle Replay Button */}
        <button
          type="button"
          onClick={handleReplay}
          aria-label="Restart demo loop from command 1"
          title="Restart demo loop"
          className="text-zinc-500 hover:text-zinc-300 transition-colors p-1 cursor-pointer"
        >
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </div>

      {/* Terminal Screen Body with Fixed Height */}
      <div className="p-5 sm:p-6 font-mono text-[13px] sm:text-[13.5px] leading-relaxed text-zinc-300 min-h-[285px] sm:min-h-[300px] flex flex-col justify-start space-y-2.5 select-text">
        {/* Top Active Command Line */}
        <TerminalPrompt
          dir={currentDemo.dir}
          text={activeCommandText}
          showCursor={isPromptActive}
        />

        {/* ffez CLI stdout output lines */}
        <div className="space-y-1 text-zinc-400">
          {showOut1 && (
            <p className="animate-in fade-in duration-150">
              <span className="text-emerald-400 font-semibold">[ffez]</span>{" "}
              <span>{currentDemo.out1}</span>
            </p>
          )}

          {showOut2 && (
            <p className="animate-in fade-in duration-150">
              <span className="text-emerald-400 font-semibold">[ffez]</span>{" "}
              <span className="text-zinc-200 font-medium">
                {currentDemo.out2}
              </span>
            </p>
          )}

          {showOut3 && (
            <p className="text-zinc-500 text-xs animate-in fade-in duration-150">
              <span className="text-zinc-600">[ffez]</span>{" "}
              <span>{currentDemo.out3}</span>
            </p>
          )}

          {showOut4 && (
            <p className="animate-in fade-in duration-150">
              <span className="text-emerald-400 font-semibold">[ffez]</span>{" "}
              <span className="text-emerald-300 font-medium">
                {currentDemo.out4}
              </span>
            </p>
          )}
        </div>

        {/* Bottom Prompt Line: Shows Prompt and types 'clear' before looping */}
        {showBottomPrompt && (
          <TerminalPrompt
            dir={currentDemo.dir}
            text={activeClearText}
            showCursor
            className="pt-2 flex flex-wrap items-center gap-2 animate-in fade-in duration-150"
          />
        )}
      </div>
    </div>
  );
}
