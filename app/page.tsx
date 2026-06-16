"use client";

import { useState, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";

// ── Animation variants ────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.5 } },
};

const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
};

const staggerFast: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

function useScrollReveal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, inView };
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function UploadIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 10l-4-4-4 4M12 6v10" />
    </svg>
  );
}
function SparklesIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
  );
}
function CalendarIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}
function ChartIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}
function BellIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
  );
}
function UserIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

// ── Magnetic button ───────────────────────────────────────────────────────────

function MagneticButton({
  children, className, type = "button",
}: {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  function onMove(e: React.MouseEvent<HTMLButtonElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  }

  return (
    <motion.button ref={ref} type={type}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// ── Waitlist form ─────────────────────────────────────────────────────────────

function WaitlistForm({ onDark = false }: { onDark?: boolean }) {
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res  = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) { setErrMsg(data.error ?? "Something went wrong."); setStatus("error"); }
      else setStatus(data.duplicate ? "duplicate" : "success");
    } catch {
      setErrMsg("Network error — please try again.");
      setStatus("error");
    }
  }

  const done = status === "success" || status === "duplicate";

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <motion.div key="ok"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 font-semibold text-lg text-campus-accent"
        >
          <motion.span
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 15 }}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-campus-accent/20"
          >
            <CheckIcon />
          </motion.span>
          {status === "duplicate" ? "You're already on the list!" : "You're on the list! We'll reach out soon."}
        </motion.div>
      ) : (
        <div key="form" className="w-full max-w-md">
          <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onSubmit={submit} className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email" required value={email}
              onChange={e => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
              placeholder="your@email.com"
              disabled={status === "loading"}
              className={`flex-1 h-13 rounded-2xl px-4 text-base focus:outline-none transition disabled:opacity-50 ${
                onDark
                  ? "bg-white/10 border border-white/20 text-white placeholder-white/40 focus:ring-2 focus:ring-campus-accent"
                  : "border border-campus-border bg-campus-surface text-campus-text placeholder-campus-muted focus:ring-2 focus:ring-campus-primary"
              }`}
            />
            <MagneticButton type="submit"
              className="h-13 px-7 rounded-2xl bg-campus-accent hover:bg-campus-accent-dark font-semibold text-campus-text transition-colors flex items-center justify-center gap-2 cursor-pointer text-base shrink-0"
            >
              {status === "loading" ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="w-4 h-4 border-2 border-campus-text/30 border-t-campus-text rounded-full inline-block"
                />
              ) : (
                <>
                  Join the waitlist
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  >
                    <ArrowRightIcon />
                  </motion.span>
                </>
              )}
            </MagneticButton>
          </motion.form>
          {status === "error" && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-500"
            >
              {errMsg}
            </motion.p>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}

// ── Phone mockup ──────────────────────────────────────────────────────────────

function PhoneMockup() {
  const items = [
    { label: "Problem Set 3", date: "Mon · Oct 7",  chip: "bg-red-900/40 border-red-700/40 text-red-300" },
    { label: "Midterm Exam",  date: "Wed · Oct 9",  chip: "bg-campus-accent/15 border-campus-accent/30 text-campus-accent" },
    { label: "Lab Report",    date: "Fri · Oct 11", chip: "bg-emerald-900/30 border-emerald-700/30 text-emerald-300" },
    { label: "Paper Draft",   date: "Mon · Oct 14", chip: "bg-white/5 border-white/10 text-white/50" },
  ];

  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-72 mx-auto"
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-campus-primary/25 blur-3xl rounded-full scale-75 translate-y-8" />

      <div className="relative rounded-[2.5rem] bg-[#1f0d08] border border-white/10 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="flex justify-center pt-4 pb-1">
          <div className="w-24 h-6 rounded-full bg-black" />
        </div>

        <div className="px-5 pb-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-white/40 text-xs mb-0.5">Fall 2025</p>
              <p className="text-white font-bold text-lg">Good morning ☀️</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-campus-accent flex items-center justify-center text-campus-text text-sm font-bold">
              F
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {[{ n: "5", l: "Classes" }, { n: "18", l: "Deadlines" }, { n: "4.2", l: "GPA target" }].map(s => (
              <div key={s.l} className="rounded-xl bg-white/5 border border-campus-primary/20 p-2.5 text-center">
                <p className="text-campus-accent font-bold text-lg leading-none">{s.n}</p>
                <p className="text-white/40 text-[10px] mt-1">{s.l}</p>
              </div>
            ))}
          </div>

          {/* Deadlines */}
          <p className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-2">This week</p>
          <div className="flex flex-col gap-2">
            {items.map((d, i) => (
              <motion.div key={d.label}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                className={`flex items-center justify-between rounded-xl border px-3 py-2.5 ${d.chip}`}
              >
                <span className="text-white/90 text-sm font-medium">{d.label}</span>
                <span className="text-xs font-medium">{d.date}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-5">
            <div className="w-28 h-1 rounded-full bg-white/15" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Ticker ────────────────────────────────────────────────────────────────────

function Ticker() {
  const items = [
    "Calendar export","Grade tracking","Exam alerts","Office hours",
    "AI extraction","Deadline tracker","Professor info","Zero manual entry",
    "Works with any syllabus","Calendar export","Grade tracking","Exam alerts",
    "Office hours","AI extraction","Deadline tracker","Professor info",
    "Zero manual entry","Works with any syllabus",
  ];
  return (
    <div className="overflow-hidden border-y border-campus-border py-3 bg-campus-tint">
      <div className="ticker-track flex gap-12 whitespace-nowrap w-max">
        {items.map((item, i) => (
          <span key={i} className="text-sm font-medium text-campus-muted flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-campus-accent inline-block" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="sticky top-0 z-50 bg-campus-bg/90 backdrop-blur-md border-b border-campus-border"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.span whileHover={{ scale: 1.05 }}
          className="font-extrabold text-xl tracking-tight text-campus-primary cursor-default"
        >
          Quad
        </motion.span>
        <a href="#waitlist">
          <MagneticButton className="text-sm font-semibold bg-campus-accent hover:bg-campus-accent-dark text-campus-text transition-colors rounded-xl px-5 py-2.5 cursor-pointer">
            Join waitlist
          </MagneticButton>
        </a>
      </div>
    </motion.header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  const { scrollY } = useScroll();
  const y1      = useTransform(scrollY, [0, 500], [0, 90]);
  const y2      = useTransform(scrollY, [0, 500], [0, -60]);
  const opacity = useTransform(scrollY, [0, 280], [1, 0.4]);

  return (
    <section className="relative overflow-hidden bg-campus-bg min-h-screen flex flex-col justify-center pt-12 pb-24 px-6">
      {/* Blobs */}
      <motion.div style={{ y: y1 }} className="absolute -top-20 -right-20 w-[640px] h-[640px] pointer-events-none">
        <div className="blob w-full h-full rounded-full bg-campus-primary/10 blur-[110px]" />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute -bottom-20 -left-20 w-[560px] h-[560px] pointer-events-none">
        <div className="blob blob-delay-1 w-full h-full rounded-full bg-campus-accent/12 blur-[120px]" />
      </motion.div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] pointer-events-none">
        <div className="blob blob-delay-2 w-full h-full rounded-full bg-campus-tint blur-[80px]" />
      </div>

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #E5502E14 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <motion.div style={{ opacity }} className="relative max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Copy */}
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 bg-campus-accent/15 text-campus-accent-dark text-sm font-semibold px-4 py-1.5 rounded-full mb-8 border border-campus-accent/25"
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 rounded-full bg-campus-accent"
            />
            Coming soon to iOS &amp; Android
          </motion.div>

          <motion.h1 variants={fadeUp}
            className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] text-campus-primary mb-6"
          >
            Turn any syllabus into{" "}
            <span className="shimmer-text">a semester plan.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-campus-muted leading-relaxed mb-10 max-w-lg">
            Upload a PDF or photo. Quad&apos;s AI extracts every deadline, exam,
            grade weight, and professor detail — then sends it all to your
            calendar in seconds.
          </motion.p>

          <motion.div variants={fadeUp}>
            <WaitlistForm />
          </motion.div>

          <motion.p variants={fadeUp} className="mt-4 text-sm text-campus-muted/60">
            No spam · No credit card · Just early access
          </motion.p>

          <motion.div
            variants={staggerFast} initial="hidden" animate="show"
            className="flex gap-10 mt-12 pt-10 border-t border-campus-border"
          >
            {[
              { n: "4–6",  label: "syllabi per semester" },
              { n: "30+",  label: "deadlines extracted" },
              { n: "~0",   label: "minutes of manual work" },
            ].map(s => (
              <motion.div key={s.label} variants={fadeUp}>
                <p className="text-3xl font-extrabold text-campus-primary">{s.n}</p>
                <p className="text-campus-muted text-sm mt-1">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Phone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
        >
          <PhoneMockup />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── Problem ───────────────────────────────────────────────────────────────────

function Problem() {
  const { ref, inView } = useScrollReveal();

  const pains = [
    "Manually entering 30+ deadlines into your calendar every semester",
    "Missing assignments buried in 10-page PDF syllabi",
    "Forgetting your prof's office hours until you actually need them",
    "Losing track of grade weights when you need to strategize",
  ];

  return (
    <section ref={ref} className="py-28 px-6 bg-campus-surface">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
            <motion.p variants={fadeUp}
              className="text-campus-accent font-semibold text-sm uppercase tracking-widest mb-4"
            >
              The problem
            </motion.p>
            <motion.h2 variants={fadeUp}
              className="text-4xl sm:text-5xl font-extrabold text-campus-primary leading-tight mb-6"
            >
              Syllabi are chaos.
              <br />
              <span className="text-campus-muted">Your semester doesn&apos;t have to be.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-campus-muted text-lg leading-relaxed">
              Every semester you get 4–6 syllabi. Each one is a wall of text
              hiding the deadlines you actually need. Most students either spend
              hours entering them by hand — or just miss things entirely.
            </motion.p>
          </motion.div>

          <motion.ul
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden" animate={inView ? "show" : "hidden"}
            className="flex flex-col gap-3"
          >
            {pains.map(pain => (
              <motion.li key={pain} variants={slideRight} whileHover={{ x: 4 }}
                className="flex gap-4 items-start bg-campus-bg hover:bg-red-50 border border-campus-border hover:border-red-200 rounded-2xl px-5 py-4 transition-colors duration-200 cursor-default"
              >
                <span className="mt-0.5 text-red-400 font-bold text-base shrink-0">✗</span>
                <span className="text-campus-text text-sm leading-relaxed">{pain}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

// ── How it works ──────────────────────────────────────────────────────────────

function HowItWorks() {
  const { ref, inView } = useScrollReveal();

  const steps = [
    {
      icon: <UploadIcon className="w-7 h-7" />,
      step: "01",
      title: "Upload your syllabus",
      desc: "Snap a photo or share a PDF. Quad accepts any format — scanned, digital, or screenshot.",
    },
    {
      icon: <SparklesIcon className="w-7 h-7" />,
      step: "02",
      title: "AI extracts everything",
      desc: "Deadlines, exam dates, grading policies, professor info — all pulled out automatically.",
    },
    {
      icon: <CalendarIcon className="w-7 h-7" />,
      step: "03",
      title: "Export to your calendar",
      desc: "Review and edit, then push everything to Apple Calendar or Google Calendar in one tap.",
    },
  ];

  return (
    <section ref={ref} className="py-28 px-6 bg-campus-tint relative overflow-hidden">
      {/* Soft glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-campus-primary/6 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          className="text-center mb-20"
        >
          <motion.p variants={fadeUp}
            className="text-campus-accent font-semibold text-sm uppercase tracking-widest mb-4"
          >
            How it works
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="text-4xl sm:text-5xl font-extrabold text-campus-primary"
          >
            Three steps to a clear semester
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector */}
          <div className="hidden md:block absolute top-11 left-[calc(16.6%+2.5rem)] right-[calc(16.6%+2.5rem)] h-px bg-gradient-to-r from-campus-border via-campus-accent/50 to-campus-border" />

          {steps.map((s, i) => (
            <motion.div key={s.step}
              variants={scaleIn} initial="hidden"
              animate={inView ? "show" : "hidden"}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="relative flex flex-col items-center text-center bg-campus-surface border border-campus-border rounded-3xl p-8 shadow-sm"
            >
              <motion.div
                whileHover={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.4 }}
                className="relative z-10 w-20 h-20 rounded-2xl bg-campus-primary text-white flex items-center justify-center shadow-lg shadow-campus-primary/20 mb-6"
              >
                {s.icon}
              </motion.div>
              <span className="text-xs font-bold text-campus-muted tracking-widest mb-3">STEP {s.step}</span>
              <h3 className="text-xl font-bold text-campus-primary mb-3">{s.title}</h3>
              <p className="text-campus-muted text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Features ──────────────────────────────────────────────────────────────────

function Features() {
  const { ref, inView } = useScrollReveal();

  const features = [
    {
      icon: <CalendarIcon />,
      title: "One-tap calendar export",
      desc: "Every deadline lands in Apple or Google Calendar automatically — right class, right time.",
    },
    {
      icon: <ChartIcon />,
      title: "Grade breakdown",
      desc: "See exactly how much each assignment, quiz, and exam is worth. Know where to focus.",
    },
    {
      icon: <BellIcon />,
      title: "Deadline tracking",
      desc: "Everything organized by week. Get reminded when deadlines are approaching.",
    },
    {
      icon: <UserIcon />,
      title: "Professor cheat sheet",
      desc: "Office hours, email, room number — all pulled from your syllabus, saved in one place.",
    },
  ];

  return (
    <section ref={ref} className="py-28 px-6 bg-campus-bg">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp}
            className="text-campus-accent font-semibold text-sm uppercase tracking-widest mb-4"
          >
            Features
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="text-4xl sm:text-5xl font-extrabold text-campus-primary mb-5"
          >
            Everything your syllabus hides
          </motion.h2>
          <motion.p variants={fadeUp} className="text-campus-muted text-lg max-w-xl mx-auto">
            Quad doesn&apos;t just read your syllabus — it turns it into every
            tool you need for the semester.
          </motion.p>
        </motion.div>

        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden" animate={inView ? "show" : "hidden"}
          className="grid sm:grid-cols-2 gap-5"
        >
          {features.map(f => (
            <motion.div key={f.title}
              variants={scaleIn}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group rounded-3xl border border-campus-border bg-campus-surface p-8 card-glow transition-all duration-300 cursor-default"
            >
              <div className="w-13 h-13 rounded-2xl bg-campus-tint text-campus-primary group-hover:bg-campus-primary group-hover:text-white flex items-center justify-center mb-5 transition-all duration-300">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-campus-text mb-2">{f.title}</h3>
              <p className="text-campus-muted text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Waitlist CTA ──────────────────────────────────────────────────────────────

function WaitlistCTA() {
  const { ref, inView } = useScrollReveal();

  return (
    <section id="waitlist" ref={ref}
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #E5502E 0%, #C43D1C 100%)" }}
    >
      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob absolute top-0 left-1/4 w-[480px] h-[480px] bg-campus-accent/12 blur-[100px] rounded-full" />
        <div className="blob blob-delay-1 absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-campus-primary-dark/60 blur-[100px] rounded-full" />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.p variants={fadeUp}
            className="text-campus-accent font-semibold text-sm uppercase tracking-widest mb-6"
          >
            Early access
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-tight"
          >
            Your semester,{" "}
            <span className="text-campus-accent">organized.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/60 text-xl mb-12 leading-relaxed">
            Join hundreds of students who are done entering deadlines by hand.
            Be the first to know when Quad launches.
          </motion.p>

          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            <WaitlistForm onDark />
          </motion.div>

          <motion.ul
            variants={staggerFast} initial="hidden" animate={inView ? "show" : "hidden"}
            className="flex flex-wrap justify-center gap-x-8 gap-y-3"
          >
            {["Free during beta", "iOS & Android", "Works with any syllabus"].map(item => (
              <motion.li key={item} variants={fadeIn}
                className="flex items-center gap-2 text-sm text-white/50"
              >
                <span className="text-campus-accent"><CheckIcon /></span>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-10 px-6 bg-campus-text border-t border-white/5 text-white/40 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-extrabold text-campus-accent text-lg">Quad</span>
        <p>© {new Date().getFullYear()} Quad. Built for students, by students.</p>
        <div className="flex gap-6">
          <a href="mailto:hello@quadapp.co" className="hover:text-white transition">Contact</a>
          <a href="#" className="hover:text-white transition">Privacy</a>
        </div>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1">
        <Hero />
        <Ticker />
        <Problem />
        <HowItWorks />
        <Features />
        <WaitlistCTA />
      </main>
      <Footer />
    </>
  );
}
