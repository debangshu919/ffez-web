# ffez — Marketing & Landing Page Copy Deck

**Document Purpose:** Complete production-ready copy, microcopy, structural annotations, and alternatives for `ffez` (`debangshu919/ffez`).  
**Copywriting Skill Reference:** [`.agents/skills/copywriting/SKILL.md`](.agents/skills/copywriting/SKILL.md)  
**Diagnosis:** Situation A (Blank brief built from product specification and architectural breakdown).  

---

## 1. Metadata & SEO

### Page Title
`ffez — Never look up FFmpeg flags again`

### Meta Description
`An open-source, minimal FFmpeg CLI wrapper written in Rust. Extract audio, mute screen recordings, and format media with human-readable subcommands and instant --dry-run previews.`

### OpenGraph / Social Sharing Card
- **OG Title:** `ffez: The Human-Readable CLI for FFmpeg`
- **OG Description:** `Stop searching Stack Overflow for -vn and -c:v copy flags. Mute screen recordings, extract audio tracks, and format video in plain English.`
- **OG Image Alt Text:** `Terminal screenshot showing ffez mute demo.mov clean.mp4 alongside an instant --dry-run inspection preview.`

---

## 2. Navigation Bar

- **Brand Mark:** `ffez`
- **Badges:**
  - `v0.1.0` (or `latest`)
  - `Rust`
  - `MIT / Apache-2.0`
- **Nav Links:**
  - Scenarios (`#scenarios`)
  - Features (`#features`)
  - Comparison (`#comparison`)
  - FAQ (`#faq`)
  - Docs (`https://github.com/debangshu919/ffez#readme`)
- **Action Button:** `GitHub ⭐` (`debangshu919/ffez`)

---

## 3. Hero Section

### Eyebrow Badge
`OPEN SOURCE RUST CLI · DUAL LICENSED MIT / APACHE-2.0`

### Headline
# Never look up FFmpeg flags again.

### Subheadline
Stop searching Stack Overflow for `-vn` and `-c:v copy` flags. `ffez` gives you human-readable commands for stripping audio, converting tracks, and formatting clips.

### Installation Switcher (Primary Hero CTA)
Tabbed interface allowing developers to grab their preferred install method instantly:

#### Tab 1: Cargo (Recommended)
- **Command:** `cargo install ffez`
- **Helper text:** Compiles native Rust binary directly from crates.io.

#### Tab 2: Homebrew
- **Command:** `brew install debangshu919/tap/ffez`
- **Helper text:** Prebuilt bottles for macOS Apple Silicon and Intel.

#### Tab 3: Prebuilt Binaries
- **Command:** `curl -proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/debangshu919/ffez/main/install.sh | sh`
- **Helper text:** Standalone binary releases for Linux, macOS, and Windows on GitHub.

### Secondary Actions
- **Button:** `View Source on GitHub` (opens `https://github.com/debangshu919/ffez`)
- **Microcopy:** `Requires ffmpeg on your PATH · Zero background daemons`

---

## 4. Hero Demonstration: Use-Case Scenario Cards

Three concrete developer situations demonstrating the exact problem, the command, and the terminal result.

### Scenario 1: Cleaning a Screen Recording for a PR
- **The Context:** You recorded a quick product demo or bug report, but your microphone picked up fan noise, keystrokes, or background chatter.
- **The Old Way:** Hunting down the magic stream copy syntax: `ffmpeg -i bug-demo.mov -c:v copy -an bug-demo-muted.mp4`.
- **The ffez Way:**
  ```bash
  ffez mute bug-demo.mov bug-demo-clean.mp4
  ```
- **Terminal Output:**
  ```text
  [ffez] Plan: copy video stream, strip audio tracks
  [ffez] Completed in 0.08s -> bug-demo-clean.mp4 (stream copied, 0% quality loss)
  ```
- **Why It Matters:** Finishes in milliseconds because it never re-encodes video frames.

---

### Scenario 2: Pulling a Soundtrack from an Interview or Podcast
- **The Context:** You need an audio file from an hour-long video recording to edit in Audacity or transcribe with Whisper.
- **The Old Way:** Memorizing stream mapping and sample rates: `ffmpeg -i session.mp4 -vn -c:a libmp3lame -q:a 2 session.mp3`.
- **The ffez Way:**
  ```bash
  ffez audio session.mp4 session.mp3 --format mp3
  ```
- **Terminal Output:**
  ```text
  [ffez] Plan: extract audio stream -> MP3 (libmp3lame, VBR Q2)
  [ffez] Writing audio stream -> session.mp3
  [ffez] Finished extraction.
  ```
- **Supported Formats:** MP3, WAV, AAC, FLAC, M4A, Opus.

---

### Scenario 3: Prepping a Demo Video for Discord or Social Platforms
- **The Context:** Your raw recording is 140MB, but Discord non-Nitro upload limits cap files at 25MB, or Twitter rejects unusual aspect ratios.
- **The Old Way:** Calculating two-pass bitrates by hand or opening a heavy GUI video editor just to downscale.
- **The ffez Way:**
  ```bash
  ffez platform walkthrough.mp4 --target discord
  ```
- **Terminal Output:**
  ```text
  [ffez] Target profile: Discord (target size: <25MB, H.264/AAC)
  [ffez] Calculated target bitrate: 1.8 Mbps
  [ffez] Encoded -> walkthrough-discord.mp4 [23.4 MB]
  ```
- **Available Targets:** Discord, X (Twitter), YouTube, Web.

---

## 5. Core Feature Grid (Unified 6-Card Architecture)

**Section Header:**
### Everything you need for media chores, nothing you don't.
**Section Subhead:**
Built around single-purpose Rust modules that plan FFmpeg arguments deterministically before running them.

---

### Card 1: One-Command Video Muting
- **Sub-tag:** `planner::plan_mute`
- **Headline:** Strip audio without re-encoding video.
- **Body:** Screen recordings don't need audio when embedded in docs or GitHub issues. `ffez mute` strips audio channels while copying the underlying video stream untouched, finishing in a fraction of a second.
- **Example:** `ffez mute input.mov silent.mp4`

---

### Card 2: Codec-Aware Audio Extraction
- **Sub-tag:** `planner::plan_audio`
- **Headline:** Extract audio into your target format.
- **Body:** Pass your input video and choose `--format mp3`, `wav`, `flac`, or `opus`. `ffez` handles stream mapping and encoder flags automatically.
- **Example:** `ffez audio clip.mkv soundtrack.flac`

---

### Card 3: Platform Presets
- **Sub-tag:** `cli::Platform`
- **Headline:** Optimize for social and hosting constraints.
- **Body:** Skip bitrate arithmetic. Presets for Discord, X (Twitter), and YouTube balance file size ceilings and codec standards automatically.
- **Example:** `ffez platform clip.mp4 --target twitter`

---

### Card 4: Transparent Dry-Run Previews
- **Sub-tag:** `runner::format_dry_run`
- **Headline:** Inspect the exact flags before running.
- **Body:** Append `--dry-run` to any command to print the exact `ffmpeg` invocation generated by `ffez`. Verify your flags, paste them into scripts, or learn how raw FFmpeg handles the task.
- **Example:** `ffez mute input.mov out.mp4 --dry-run`

---

### Card 5: Pre-Flight Dependency Checks
- **Sub-tag:** `runner::check_ffmpeg`
- **Headline:** Catches missing binaries before execution.
- **Body:** No mysterious exit codes or terminal stack dumps. `ffez` verifies that `ffmpeg` is installed on your system PATH before running tasks and prints clean installation instructions if missing.
- **Example:** `Error: ffmpeg binary not found on PATH. Run 'brew install ffmpeg' or install via your package manager.`

---

### Card 6: Zero-Bloat Native Rust Binary
- **Sub-tag:** `fast & self-contained`
- **Headline:** Instant startup with no runtime dependencies.
- **Body:** Compiles down to a lean native binary with zero Python, Node.js, or Electron overhead. Runs cleanly in local shell scripts, Git hooks, and CI/CD automation pipelines.
- **Example:** `<5MB single binary · Sub-millisecond startup`

---

## 6. How It Works (Architecture Pipeline)

**Section Header:**
### How ffez translates intent into execution

```
┌─────────────────────┐      ┌─────────────────────────────┐      ┌───────────────────────────────┐
│     User Intent     │      │      Execution Planner      │      │       Runner & Validator      │
│                     │      │                             │      │                               │
│  ffez mute demo.mov │ ───> │  planner::plan_mute         │ ───> │  runner::check_ffmpeg         │
│  clean.mp4          │      │  -> -i demo.mov             │      │  runner::format_dry_run       │
│                     │      │  -> -c:v copy -an clean.mp4 │      │  runner::execute              │
└─────────────────────┘      └─────────────────────────────┘      └───────────────────────────────┘
```

1. **Intent Parsing (`cli::Cli`)**: Captures user subcommands, file paths, target formats, and flags.
2. **Deterministic Planning (`planner::ExecutionPlan`)**: Generates the exact FFmpeg argument array for your task.
3. **Execution & Guardrails (`runner`)**: Verifies system dependencies, formats dry-run outputs if requested, and returns actionable errors on failure.

---

## 7. Direct Syntax Comparison: Raw FFmpeg vs. ffez

| Task | Raw FFmpeg Syntax | ffez Syntax | What You Avoid |
| :--- | :--- | :--- | :--- |
| **Mute video clip** | `ffmpeg -i in.mov -c:v copy -an out.mp4` | `ffez mute in.mov out.mp4` | Remembering `-c:v copy` vs `-vn` vs `-an` |
| **Extract MP3 audio** | `ffmpeg -i in.mp4 -vn -c:a libmp3lame -q:a 2 out.mp3` | `ffez audio in.mp4 out.mp3 --format mp3` | Codec selection and audio channel mapping flags |
| **Extract lossless WAV** | `ffmpeg -i in.mp4 -vn -acodec pcm_s16le -ar 44100 out.wav` | `ffez audio in.mp4 out.wav --format wav` | Audio sample format and rate configuration |
| **Inspect planned command** | Manual inspection or trial-and-error | `ffez <command> --dry-run` | Accidental file overwrites while testing flags |
| **Missing FFmpeg binary** | `bash: ffmpeg: command not found` (exit 127) | Clear check with platform install steps | Script crashes with cryptic return codes |

---

## 8. Objection Handling & Developer FAQ

### Q: Does ffez install or bundle FFmpeg?
**A:** No. `ffez` orchestrates your local system's `ffmpeg` binary. Bundling FFmpeg would inflate binary sizes by over 80MB and risk version conflicts. `ffez` validates that `ffmpeg` is available on your PATH and tells you how to install it if it is missing.

### Q: Does ffez re-encode when muting?
**A:** No. `ffez mute` passes stream copy parameters (`-c:v copy`) to the planner. It drops the audio track and copies video packets directly, running in milliseconds with zero video quality loss.

### Q: What if I need a complex multi-filter FFmpeg graph?
**A:** Use raw FFmpeg for bespoke multi-layer compositions and complex filtergraphs. `ffez` is intentionally designed for the 90% of routine audio and video tasks developers perform every week. For custom pipelines, run `ffez --dry-run` as a starting baseline and customize from there.

### Q: Can I use ffez in shell scripts and CI pipelines?
**A:** Yes. `ffez` outputs predictable exit codes and structured terminal messages. Use `--dry-run` in script tests or run commands directly in batch automations.

### Q: What operating systems are supported?
**A:** macOS, Linux, and Windows. Any system with Rust's toolchain and an accessible FFmpeg binary is supported.

---

## 9. Final CTA & Footer

### Section Header
### Stop fighting FFmpeg flags.

### Subhead
Add `ffez` to your toolchain in 10 seconds with Cargo or Homebrew.

### Terminal Install Block
```bash
cargo install ffez
```

### Links & Metadata
- **GitHub:** `github.com/debangshu919/ffez`
- **License:** Dual-licensed under MIT and Apache-2.0
- **Author:** Debangshu (@debangshu919)
- **Contribution:** Pull requests and issue reports welcome on GitHub.

---

## 10. Copywriting Rationale & Annotations

1. **Pain-Led Framing:** Technical users don't need buzzwords about "revolutionizing media." They need a tool that spares them from looking up flags on Google for the tenth time. Leading with *"Never look up FFmpeg flags again"* directly names the recurring developer annoyance.
2. **Respecting Developer Skepticism:** Senior engineers distrust wrappers that hide what they do. Highlighting `--dry-run` and showing the exact architecture (`planner::plan_mute -> -c:v copy -an`) builds immediate trust by demonstrating that `ffez` produces deterministic, sensible FFmpeg arguments rather than black-box magic.
3. **No AI Tells:**
   - No contrast reveals ("It's not X, it's Y").
   - No negation lists ("No setup, no configs, no bloat").
   - No stock openers ("In today's fast-paced digital world").
   - Every claim is falsifiable and verifiable against the Rust codebase (`planner`, `runner`, `cli`).

---

## 11. Copy Variations for Future Testing

### Headline Alternatives
- **Option 1 (Current Champion - Pain-Led):** *Never look up FFmpeg flags again.*  
  *Rationale:* Highest emotional resonance for developers who despise searching Stack Overflow for simple media tasks.
- **Option 2 (Outcome-Led):** *Common media tasks in plain English.*  
  *Rationale:* Emphasizes readability and clarity of subcommands over FFmpeg's cryptic shorthand.
- **Option 3 (Ergonomic / Rust-Led):** *The human-readable CLI wrapper for FFmpeg.*  
  *Rationale:* Clear, direct category descriptor; works well for Hacker News or Reddit launches.

### Primary CTA Alternatives
- **Option 1 (Current Champion):** Terminal switcher with `cargo install ffez` / `brew install debangshu919/tap/ffez`.  
  *Rationale:* Immediate gratification without leaving the browser tab.
- **Option 2:** `Star on GitHub` as main button + `cargo install ffez` as pill underneath.  
  *Rationale:* Optimizes for repository discovery and developer social proof early in launch phase.
