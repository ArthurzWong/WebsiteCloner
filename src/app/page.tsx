"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Copy,
  ExternalLink,
  Layers,
  Radar,
  Sparkles,
  Star,
  Users,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Agent = {
  id: string;
  name: string;
  note: string;
  recommended?: boolean;
};

const AGENTS: Agent[] = [
  { id: "claude", name: "Claude Code", note: "Recommended — Opus 5", recommended: true },
  { id: "codex", name: "Codex CLI", note: "Supported" },
  { id: "cursor", name: "Cursor", note: "Supported" },
  { id: "opencode", name: "OpenCode", note: "Supported" },
];

const PIPELINE = [
  {
    icon: Radar,
    step: "01",
    title: "Reconnaissance",
    description:
      "The agent screenshots the target, extracts design tokens, and sweeps every interaction — scroll, click, hover, responsive breakpoints.",
  },
  {
    icon: Layers,
    step: "02",
    title: "Foundation & specs",
    description:
      "Fonts, colors and globals are rebuilt; all assets are downloaded; per-component spec files capture exact computed CSS values and states.",
  },
  {
    icon: Users,
    step: "03",
    title: "Parallel build",
    description:
      "Builder agents work in git worktrees — one per section — each receiving the full spec inline. No guessing, no drift.",
  },
  {
    icon: Sparkles,
    step: "04",
    title: "Assembly & QA",
    description:
      "Worktrees merge into one page, then a visual diff runs against the original until the rebuild matches.",
  },
];

const FEATURES = [
  {
    icon: Star,
    title: "Clean, modern output",
    description:
      "Every clone is a strict-TypeScript Next.js 16 app with React 19, Tailwind v4 and shadcn/ui primitives — not scraped soup.",
  },
  {
    icon: Sparkles,
    title: "Pixel-aware QA",
    description:
      "A built-in visual diff compares the rebuild against the live site, so details survive the translation to code.",
  },
  {
    icon: Users,
    title: "Multi-agent friendly",
    description:
      "One portable skill at .agents/skills/clone-website works with Claude Code, Codex, Cursor and OpenCode out of the box.",
  },
  {
    icon: Wrench,
    title: "Yours to extend",
    description:
      "Edit the canonical skill directly to change the pipeline — there are no generated copies or sync scripts to fight.",
  },
];

const USE_CASES = [
  {
    title: "Platform migration",
    description:
      "Rebuild a site you own from WordPress, Webflow or Squarespace into a modern Next.js codebase.",
  },
  {
    title: "Lost source code",
    description:
      "Site is live but the repo is gone, the developer left, or the stack is legacy — get the code back in a modern format.",
  },
  {
    title: "Learning",
    description:
      "Deconstruct how production sites achieve specific layouts, animations and responsive behavior with real code.",
  },
];

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.295 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z" />
    </svg>
  );
}

function UrlLauncher() {
  const [url, setUrl] = useState("");
  const [agent, setAgent] = useState<string>("claude");
  const [copied, setCopied] = useState(false);
  const [touched, setTouched] = useState(false);

  const normalizedUrl = useMemo(() => {
    const trimmed = url.trim();
    if (!trimmed) return "";
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
  }, [url]);

  const urlIsValid = useMemo(() => {
    if (!normalizedUrl) return false;
    try {
      const parsed = new URL(normalizedUrl);
      return parsed.hostname.includes(".");
    } catch {
      return false;
    }
  }, [normalizedUrl]);

  const command = `/clone-website ${normalizedUrl || "https://example.com"}`;

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — user can still select the text manually
    }
  };

  const showError = touched && url.length > 0 && !urlIsValid;

  return (
    <div className="w-full max-w-2xl">
      <div className="rounded-2xl border bg-card/80 p-1.5 shadow-xl shadow-black/5 backdrop-blur">
        <div className="flex flex-col gap-2 rounded-xl bg-muted/40 p-3 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="hidden shrink-0 rounded-lg bg-primary/10 px-2.5 py-1.5 font-mono text-xs font-semibold text-primary sm:inline-block">
              URL
            </span>
            <input
              type="url"
              inputMode="url"
              value={url}
              onChange={(event) => {
                setUrl(event.target.value);
                setCopied(false);
              }}
              onBlur={() => setTouched(true)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && urlIsValid) {
                  setTouched(true);
                }
              }}
              placeholder="https://example.com"
              aria-label="Website URL to clone"
              aria-invalid={showError || undefined}
              className="w-full min-w-0 bg-transparent px-1 py-1.5 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
            />
          </div>
          {urlIsValid ? (
            <Button size="lg" render={
              <a href="#quick-start">
                Clone it
                <ArrowRight data-icon="inline-end" />
              </a>
            } />
          ) : (
            <Button size="lg" disabled>
              Clone it
              <ArrowRight data-icon="inline-end" />
            </Button>
          )}
        </div>

        <div className="mt-2 rounded-xl bg-foreground/[0.04] px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 overflow-x-auto">
              <code className="whitespace-nowrap font-mono text-sm text-muted-foreground">
                <span className="text-foreground">{"> "}</span>
                {command}
              </code>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={copyCommand}
              className="shrink-0"
            >
              {copied ? (
                <>
                  <Check data-icon="inline-start" className="text-emerald-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy data-icon="inline-start" />
                  Copy command
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">Agent:</span>
        {AGENTS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setAgent(item.id)}
            title={item.note}
            aria-pressed={agent === item.id}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              agent === item.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-foreground/20 hover:text-foreground"
            }`}
          >
            {item.name}
          </button>
        ))}
        <span className="text-xs text-muted-foreground">
          {AGENTS.find((item) => item.id === agent)?.note}
        </span>
      </div>

      {showError ? (
        <p className="mt-2 text-xs text-destructive">
          Enter a valid URL, e.g. https://example.com
        </p>
      ) : null}
    </div>
  );
}

const steps = [
  {
    title: "Set up your project",
    body: "Clone this repository, remove its origin remote, install dependencies, and run npm run check.",
    code: "git clone https://github.com/ArthurzWong/WebsiteCloner.git\ncd WebsiteCloner && npm install\nnpm run check",
  },
  {
    title: "Clone a website",
    body: "Open the project in your agent with browser access enabled, then run the launcher command.",
    code: "/clone-website https://example.com",
  },
  {
    title: "Iterate",
    body: "Ask your agent for any changes you want — copy, layout, animations, responsive behavior.",
    code: '"Make the hero section darker and add a subtle fade-in."',
  },
];

function QuickStart() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copy = async (index: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      window.setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {steps.map((step, index) => (
        <div key={step.title} className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary font-mono text-xs font-semibold text-primary-foreground">
              {index + 1}
            </span>
            <h3 className="font-heading text-lg font-semibold">{step.title}</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          <div className="mt-auto pt-5">
            <div className="group relative overflow-x-auto rounded-xl bg-foreground/[0.04] p-4">
              <button
                type="button"
                onClick={() => copy(index, step.code)}
                aria-label={`Copy: ${step.title}`}
                className="absolute right-2 top-2 rounded-md border bg-background p-1.5 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
              >
                {copiedIndex === index ? (
                  <Check className="size-3.5 text-emerald-600" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </button>
              <pre className="font-mono text-xs leading-relaxed text-foreground/90">
                {step.code}
              </pre>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(75rem_40rem_at_top,oklch(0.55_0.2_265/0.14),transparent_65%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
        <div className="absolute left-1/2 top-[-12rem] size-[36rem] -translate-x-1/2 rounded-full bg-primary/[0.05] blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Layers className="size-4" />
            </span>
            <span className="font-heading text-sm font-semibold tracking-tight">
              WebsiteCloner
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#pipeline" className="transition-colors hover:text-foreground">Pipeline</a>
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#quick-start" className="transition-colors hover:text-foreground">Quick start</a>
            <a href="#use-cases" className="transition-colors hover:text-foreground">Use cases</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" render={
              <a href="https://github.com/ArthurzWong/WebsiteCloner" target="_blank" rel="noopener noreferrer">
                <GithubIcon className="size-4" />
                GitHub
              </a>
            } />
            <Button size="sm" render={
              <a href="#quick-start">
                Get started
              </a>
            } />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-16 sm:pt-24">
          <div className="flex flex-col items-center text-center">
            <a
              href="https://github.com/ArthurzWong/WebsiteCloner"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:text-foreground"
            >
              <Sparkles className="size-3.5 text-primary" />
              Open-source AI cloning pipeline
              <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
            <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
              Clone any website into a{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
                clean Next.js codebase
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              Give your AI coding agent a URL and watch it rebuild the site as
              production-grade Next.js 16 + Tailwind v4 — components, assets and
              pixel-aware QA included.
            </p>
            <div className="mt-8">
              <UrlLauncher />
            </div>
          </div>
        </section>

        {/* Pipeline */}
        <section id="pipeline" className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-20">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-primary">Pipeline</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Four phases, zero guessing
            </h2>
            <p className="mt-4 text-muted-foreground">
              The <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">/clone-website</code> skill
              runs a multi-phase pipeline that turns a live URL into a maintainable codebase.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PIPELINE.map((phase) => (
              <div key={phase.step} className="group relative rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <phase.icon className="size-5" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground/50">{phase.step}</span>
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold">{phase.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{phase.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-y border-border/60 bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-medium uppercase tracking-widest text-primary">Features</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Built for agents, made for humans
              </h2>
              <p className="mt-4 text-muted-foreground">
                The output isn&apos;t a screenshot — it&apos;s a real codebase you can read, diff and extend.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="flex gap-4 rounded-2xl border bg-card p-6 shadow-sm">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <feature.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold">{feature.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick start */}
        <section id="quick-start" className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-20">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-primary">Quick start</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              From URL to codebase in three steps
            </h2>
            <p className="mt-4 text-muted-foreground">
              Everything runs locally in your project — bring your own agent.
            </p>
          </div>
          <div className="mt-12">
            <QuickStart />
          </div>
        </section>

        {/* Use cases */}
        <section id="use-cases" className="border-y border-border/60 bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <p className="font-mono text-xs font-medium uppercase tracking-widest text-primary">Use cases</p>
                <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                  What teams use it for
                </h2>
                <div className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/[0.06] p-5">
                  <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                    Not intended for
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Phishing or impersonation, passing off someone&apos;s design as
                    your own, or violating a site&apos;s terms of service. Clone
                    responsibly — logos, brand assets and original copy belong to
                    their owners.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-4">
                {USE_CASES.map((useCase) => (
                  <div key={useCase.title} className="flex items-start gap-4 rounded-2xl border bg-card p-6 shadow-sm">
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <ArrowRight className="size-4" />
                    </span>
                    <div>
                      <h3 className="font-heading text-base font-semibold">{useCase.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{useCase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-6 py-24">
          <div className="relative overflow-hidden rounded-3xl border bg-foreground px-6 py-16 text-center text-background sm:px-16">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(50rem_24rem_at_top,oklch(0.65_0.18_265/0.35),transparent_70%)]" />
            </div>
            <div className="relative">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready to rebuild the web?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-balance text-muted-foreground">
                Star the repo, spin up a project, and let your agent do the heavy lifting.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" className="bg-background text-foreground hover:bg-background/90" render={
                  <a href="https://github.com/ArthurzWong/WebsiteCloner" target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="size-4" />
                    View on GitHub
                    <ExternalLink data-icon="inline-end" className="opacity-60" />
                  </a>
                } />
                <Button size="lg" variant="outline" className="border-background/20 bg-transparent text-background hover:bg-background/10 hover:text-background dark:border-input dark:bg-input/30 dark:hover:bg-input/50" render={
                  <a href="#quick-start">
                    Quick start
                    <ChevronRight data-icon="inline-end" />
                  </a>
                } />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex size-5 items-center justify-center rounded-md bg-foreground text-background">
              <Layers className="size-3" />
            </span>
            <span>WebsiteCloner</span>
            <span className="text-muted-foreground/50">·</span>
            <span>MIT License</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#pipeline" className="transition-colors hover:text-foreground">Pipeline</a>
            <a href="#quick-start" className="transition-colors hover:text-foreground">Quick start</a>
            <a
              href="https://github.com/ArthurzWong/WebsiteCloner"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
