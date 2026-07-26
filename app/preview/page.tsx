'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── Design tokens ──────────────────────────────────────────────────────────── */
const C = {
  bg:      '#F7F7FB',
  surface: '#FFFFFF',
  border:  '#E6E4EC',
  coral:   '#E5502E',
  dark:    '#C43D1C',
  tint:    '#FDECE7',
  deep:    '#7A2A18',
  text:    '#1B1B2B',
  muted:   '#6E7280',
} as const

const CLASS_COLORS = {
  cs:   '#378ADD',
  engl: '#EAB308',
  bio:  '#97C459',
  hist: '#ED93B1',
}

const ease = [0.25, 0.46, 0.45, 0.94] as const

/* ── Quad phone mockup ──────────────────────────────────────────────────────── */
function QuadPhone({ size = 300 }: { size?: number }) {
  const s = size / 300

  const deadlines = [
    { title: 'Problem set 4',    code: 'CS 301',   color: CLASS_COLORS.cs,   time: 'Today · 3:55 AM',  urgent: true },
    { title: 'Reading response', code: 'ENGL 210', color: CLASS_COLORS.engl, time: 'Today · 11:59 PM', urgent: false },
    { title: 'Lab report draft', code: 'BIO 150',  color: CLASS_COLORS.bio,  time: 'Thu · 2:00 AM',   urgent: false },
    { title: 'Midterm exam',     code: 'HIST 220', color: CLASS_COLORS.hist, time: 'Fri · 8:00 AM',   urgent: false },
  ]

  return (
    <div style={{ position: 'relative', width: size, flexShrink: 0, userSelect: 'none' }}>
      {/* Coral bloom */}
      <div aria-hidden style={{
        position: 'absolute',
        inset: -80 * s,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${C.coral}1A 0%, transparent 68%)`,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* iPhone frame */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        borderRadius: 52 * s,
        background: '#18181F',
        border: '1.5px solid rgba(255,255,255,0.12)',
        boxShadow: `0 48px 100px rgba(27,27,43,0.28), 0 12px 40px rgba(27,27,43,0.18), inset 0 1px 0 rgba(255,255,255,0.07)`,
        padding: 10 * s,
      }}>
        {/* Dynamic Island */}
        <div aria-hidden style={{
          position: 'absolute',
          top: 14 * s,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 104 * s,
          height: 30 * s,
          background: '#000',
          borderRadius: 22 * s,
          zIndex: 10,
        }} />

        {/* Screen */}
        <div style={{
          borderRadius: 44 * s,
          background: C.bg,
          overflow: 'hidden',
          minHeight: 590 * s,
        }}>
          {/* Status bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `${46 * s}px ${20 * s}px ${6 * s}px`,
          }}>
            <span style={{ fontSize: 12 * s, fontWeight: 600, color: C.text }}>9:41</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 * s }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2 * s }}>
                {[0.3, 0.5, 0.8, 1].map((op, i) => (
                  <div key={i} style={{ width: 3 * s, height: (4 + i * 2) * s, background: C.text, opacity: op, borderRadius: 1 }} />
                ))}
              </div>
              <svg width={16 * s} height={11 * s} viewBox="0 0 16 11" fill="none">
                <path d="M8 2C10.5 2 12.7 3 14.3 4.7L15.7 3.3C13.7 1.3 11 0 8 0C5 0 2.3 1.3 0.3 3.3L1.7 4.7C3.3 3 5.5 2 8 2Z" fill={C.text}/>
                <path d="M8 5.5C9.8 5.5 11.4 6.2 12.6 7.3L14 5.9C12.5 4.5 10.4 3.5 8 3.5C5.6 3.5 3.5 4.5 2 5.9L3.4 7.3C4.6 6.2 6.2 5.5 8 5.5Z" fill={C.text}/>
                <circle cx="8" cy="10" r="1.5" fill={C.text}/>
              </svg>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: 22 * s, height: 11 * s, border: `1.5px solid ${C.muted}80`, borderRadius: 3 * s, padding: 1.5 }}>
                  <div style={{ width: '75%', height: '100%', background: C.text, borderRadius: 2 * s }} />
                </div>
              </div>
            </div>
          </div>

          {/* App content */}
          <div style={{ padding: `0 ${16 * s}px ${24 * s}px` }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 * s }}>
              <div>
                <p style={{ margin: 0, fontSize: 11 * s, color: C.muted, marginBottom: 2 * s }}>Monday, Jun 16</p>
                <p style={{ margin: 0, fontSize: 22 * s, fontWeight: 700, color: C.text, lineHeight: 1.1, letterSpacing: '-0.02em' }}>Good morning</p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  marginTop: 6 * s,
                  padding: `${3 * s}px ${9 * s}px`,
                  background: C.tint,
                  borderRadius: 8 * s,
                }}>
                  <span style={{ fontSize: 11 * s, fontWeight: 600, color: C.deep }}>2 due today</span>
                </div>
              </div>
              <div style={{
                width: 36 * s, height: 36 * s,
                borderRadius: '50%',
                background: C.coral,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: 14 * s, fontWeight: 700,
              }}>F</div>
            </div>

            {/* Next up card */}
            <div style={{
              background: C.surface,
              borderRadius: 14 * s,
              padding: 12 * s,
              marginBottom: 12 * s,
              boxShadow: '0 1px 3px rgba(27,27,43,0.06)',
              border: `1px solid ${C.border}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 * s }}>
                <span style={{ fontSize: 10 * s, color: C.muted }}>Next up</span>
                <span style={{
                  fontSize: 10 * s, fontWeight: 600,
                  color: '#92400E', background: '#FEF3C7',
                  padding: `${2 * s}px ${7 * s}px`, borderRadius: 6 * s,
                }}>due in 3h</span>
              </div>
              <div style={{
                display: 'inline-flex', alignItems: 'center',
                marginBottom: 5 * s,
                padding: `${2 * s}px ${8 * s}px`,
                background: `${CLASS_COLORS.cs}1A`,
                borderRadius: 6 * s,
              }}>
                <span style={{ fontSize: 10 * s, fontWeight: 600, color: CLASS_COLORS.cs }}>CS 301</span>
              </div>
              <p style={{ margin: 0, fontSize: 14 * s, fontWeight: 700, color: C.text, marginBottom: 3 * s }}>Problem set 4</p>
              <p style={{ margin: 0, fontSize: 10 * s, color: C.muted }}>Today · 3:55 AM · 10% of grade</p>
            </div>

            {/* Section: Today */}
            <p style={{ margin: `0 0 ${6 * s}px`, fontSize: 10 * s, fontWeight: 600, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.09em' }}>Today</p>

            {deadlines.slice(0, 2).map((d) => (
              <DeadlineRow key={d.title} d={d} s={s} />
            ))}

            {/* Section: This week */}
            <p style={{ margin: `${10 * s}px 0 ${6 * s}px`, fontSize: 10 * s, fontWeight: 600, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.09em' }}>This week</p>

            {deadlines.slice(2).map((d) => (
              <DeadlineRow key={d.title} d={d} s={s} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DeadlineRow({ d, s }: { d: { title: string; code: string; color: string; time: string }; s: number }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'stretch',
      marginBottom: 7 * s,
      background: C.surface,
      borderRadius: 11 * s,
      border: `1px solid ${C.border}`,
      overflow: 'hidden',
    }}>
      <div style={{ width: 3.5 * s, flexShrink: 0, background: d.color }} />
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `${8 * s}px ${10 * s}px`,
      }}>
        <div>
          <p style={{ margin: 0, fontSize: 12 * s, fontWeight: 600, color: C.text }}>{d.title}</p>
          <p style={{ margin: 0, fontSize: 10 * s, color: C.muted }}>{d.code} · {d.time}</p>
        </div>
        <div style={{
          width: 18 * s, height: 18 * s,
          borderRadius: '50%',
          border: `2px solid ${C.border}`,
          flexShrink: 0,
        }} />
      </div>
    </div>
  )
}

/* ── Nav ────────────────────────────────────────────────────────────────────── */
function Nav() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(247,247,251,0.88)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        height: 62,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(20px, 5vw, 48px)',
      }}>
        <span style={{
          fontFamily: 'var(--font-fraunces, Georgia, serif)',
          fontSize: 22, fontWeight: 700,
          color: C.text, letterSpacing: '-0.025em',
        }}>Quad</span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <a href="#how-it-works" style={{ fontSize: 14, color: C.muted, textDecoration: 'none' }}>
            How it works
          </a>
          <a href="#deadlines" style={{ fontSize: 14, color: C.muted, textDecoration: 'none' }}>
            Features
          </a>
          <a href="#waitlist" style={{
            fontSize: 14, fontWeight: 600,
            color: 'white', background: C.coral,
            padding: '9px 22px', borderRadius: 100,
            textDecoration: 'none',
            boxShadow: `0 2px 12px ${C.coral}40`,
          }}>
            Join waitlist
          </a>
        </div>
      </div>
    </nav>
  )
}

/* ── Hero ───────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: 'clamp(100px, 12vh, 140px) clamp(20px, 5vw, 80px) clamp(60px, 8vh, 100px)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle background grid */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        opacity: 0.4,
        pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
      }} />

      {/* Coral radial glow top-right */}
      <div aria-hidden style={{
        position: 'absolute', top: -200, right: -100,
        width: 700, height: 700,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${C.coral}0D 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1200, margin: '0 auto', width: '100%',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'clamp(48px, 6vw, 80px)',
        position: 'relative', zIndex: 1,
      }}>

        {/* ── Left: text ── */}
        <div style={{ flex: 1, maxWidth: 560 }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.5, ease }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: C.tint, border: `1px solid ${C.coral}28`,
              borderRadius: 100, padding: '6px 14px 6px 10px',
              marginBottom: 36,
            }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.coral }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: C.coral, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Now in early access
              </span>
            </div>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.65, ease }}
            style={{
              margin: '0 0 24px',
              fontFamily: 'var(--font-fraunces, Georgia, serif)',
              fontSize: 'clamp(52px, 7vw, 88px)',
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              color: C.text,
            }}
          >
            Your whole<br />
            semester,{' '}
            <em style={{ fontStyle: 'italic', color: C.coral }}>sorted.</em>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.55, ease }}
            style={{
              margin: '0 0 42px',
              fontSize: 18, lineHeight: 1.65,
              color: C.muted,
              maxWidth: 440,
            }}
          >
            Snap a photo or drop a PDF. Quad reads your syllabus and sends every deadline and exam straight to Google Calendar or Apple Calendar — no manual entry, ever.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.5, ease }}
            style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}
          >
            <a
              href="#waitlist"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: C.coral, color: 'white',
                fontWeight: 600, fontSize: 15,
                padding: '14px 28px', borderRadius: 100,
                textDecoration: 'none',
                boxShadow: `0 4px 24px ${C.coral}44`,
                transition: 'background 0.15s, transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = C.dark
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = `0 6px 28px ${C.coral}55`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = C.coral
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = `0 4px 24px ${C.coral}44`
              }}
            >
              Join the waitlist
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M2.5 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <a
              href="#deadlines"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 15, fontWeight: 500, color: C.muted,
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = C.text }}
              onMouseLeave={e => { e.currentTarget.style.color = C.muted }}
            >
              See how it works
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.5 2.5v10M3.5 8.5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>

          {/* Syncs with row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <p style={{ margin: '0 0 10px', fontSize: 12, color: C.muted, letterSpacing: '0.04em' }}>
              Syncs with
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
              {/* Google Calendar */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 10, padding: '8px 14px',
                boxShadow: '0 1px 3px rgba(27,27,43,0.06)',
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect width="18" height="18" rx="3.5" fill="white" stroke="#E0E0E0" strokeWidth="0.8"/>
                  <rect y="0" width="18" height="5.5" rx="3.5" fill="#4285F4"/>
                  <rect y="3" width="18" height="2.5" fill="#4285F4"/>
                  <circle cx="5.5" cy="3" r="1.8" fill="white"/>
                  <circle cx="12.5" cy="3" r="1.8" fill="white"/>
                  <text x="9" y="14" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="#4285F4" fontFamily="Arial">31</text>
                </svg>
                <span style={{ fontSize: 13, fontWeight: 500, color: C.text }}>Google Calendar</span>
              </div>
              {/* Apple Calendar */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 10, padding: '8px 14px',
                boxShadow: '0 1px 3px rgba(27,27,43,0.06)',
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect width="18" height="18" rx="3.5" fill="white" stroke="#E0E0E0" strokeWidth="0.8"/>
                  <rect y="0" width="18" height="5.5" rx="3.5" fill="#FF3B30"/>
                  <rect y="3" width="18" height="2.5" fill="#FF3B30"/>
                  <circle cx="5.5" cy="3" r="1.8" fill="white"/>
                  <circle cx="12.5" cy="3" r="1.8" fill="white"/>
                  <text x="9" y="14" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="#1C1C1E" fontFamily="Arial">16</text>
                </svg>
                <span style={{ fontSize: 13, fontWeight: 500, color: C.text }}>Apple Calendar</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              {[
                { icon: '🎓', text: 'College & high school' },
                { icon: '📄', text: 'Any syllabus format' },
                { icon: '⚡', text: 'Results in seconds' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ fontSize: 13 }}>{icon}</span>
                  <span style={{ fontSize: 12, color: C.muted }}>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Right: phone mockup (desktop only) ── */}
        <motion.div
          initial={{ opacity: 0, x: 32, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease }}
          className="phone-float hidden md:block"
          style={{ flexShrink: 0 }}
        >
          <QuadPhone size={300} />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        }}
      >
        <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.muted }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ── Feature section: deadline view ────────────────────────────────────────── */
function FeatureDeadlines() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="deadlines"
      style={{
        background: C.surface,
        padding: 'clamp(80px, 10vh, 120px) clamp(20px, 5vw, 80px)',
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        alignItems: 'center',
        gap: 'clamp(48px, 7vw, 88px)',
      }}>

        {/* Phone */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="phone-float"
          style={{ justifySelf: 'center' }}
        >
          <QuadPhone size={280} />
        </motion.div>

        {/* Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5, ease }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              background: C.tint, borderRadius: 100,
              padding: '5px 14px', marginBottom: 22,
            }}>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.coral }}>
                Deadline view
              </span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.16, duration: 0.55, ease }}
            style={{
              margin: '0 0 20px',
              fontFamily: 'var(--font-fraunces, Georgia, serif)',
              fontSize: 'clamp(36px, 4.5vw, 54px)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              color: C.text,
            }}
          >
            See what's due.<br />
            <em style={{ fontStyle: 'italic', color: C.coral }}>Every single day.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.22, duration: 0.5, ease }}
            style={{
              margin: '0 0 36px',
              fontSize: 17, lineHeight: 1.65, color: C.muted,
              maxWidth: 420,
            }}
          >
            Every deadline from every class in one clean view. Sorted by urgency, color-coded by class, with grade weight front and center so you always know what matters.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5, ease }}
            style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            {[
              'All deadlines synced to Google or Apple Calendar',
              'Color-coded by class so you always know what\'s what',
              'Grade weight shown so you know exactly what matters',
            ].map((item) => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: C.tint,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 1,
                }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke={C.coral} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span style={{ fontSize: 15, color: C.text, lineHeight: 1.55 }}>{item}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}

/* ── How it works ───────────────────────────────────────────────────────────── */
function HowItWorks() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const steps = [
    {
      n: '01',
      title: 'Snap a photo or drop a PDF',
      body: 'Point your camera at a printed syllabus, upload a PDF, or paste the text. Quad reads any format — typed, scanned, messy or clean.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="5" width="16" height="12" rx="2.5" stroke={C.coral} strokeWidth="1.5"/>
          <circle cx="10" cy="11" r="3" stroke={C.coral} strokeWidth="1.5"/>
          <path d="M7 5V4a1 1 0 011-1h4a1 1 0 011 1v1" stroke={C.coral} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      n: '02',
      title: 'AI extracts every date',
      body: 'Every deadline, exam, quiz, and grade weight is pulled out automatically and organized by class. No manual entry, no copy-pasting.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12M10 4l6 6-6 6" stroke={C.coral} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="4" cy="10" r="2" fill={C.coral} opacity="0.3"/>
        </svg>
      ),
    },
    {
      n: '03',
      title: 'Straight to your calendar',
      body: 'Every deadline lands in Google Calendar or Apple Calendar automatically. Your whole semester — visible, organized, synced.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="4" width="16" height="14" rx="2.5" stroke={C.coral} strokeWidth="1.5"/>
          <path d="M2 8h16" stroke={C.coral} strokeWidth="1.5"/>
          <path d="M6 2v3M14 2v3" stroke={C.coral} strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M6 12l2.5 2.5L14 10" stroke={C.coral} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ]

  return (
    <section
      ref={ref}
      id="how-it-works"
      style={{
        background: C.bg,
        padding: 'clamp(80px, 10vh, 120px) clamp(20px, 5vw, 80px)',
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
          style={{ marginBottom: 64, maxWidth: 520 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            background: C.tint, borderRadius: 100,
            padding: '5px 14px', marginBottom: 20,
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.coral }}>
              How it works
            </span>
          </div>
          <h2 style={{
            margin: '0 0 16px',
            fontFamily: 'var(--font-fraunces, Georgia, serif)',
            fontSize: 'clamp(36px, 4vw, 52px)',
            fontWeight: 700, lineHeight: 1.1,
            letterSpacing: '-0.025em', color: C.text,
          }}>
            Three steps.<br />
            <em style={{ fontStyle: 'italic', color: C.coral }}>One organized semester.</em>
          </h2>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: C.muted }}>
            Upload once at the start of the semester. Quad keeps track of everything else automatically.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'clamp(24px, 3vw, 40px)',
        }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease }}
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 20,
                padding: 28,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 14,
                  background: C.tint,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {step.icon}
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: '0.06em' }}>{step.n}</span>
              </div>
              <h3 style={{ margin: '0 0 10px', fontSize: 17, fontWeight: 600, color: C.text }}>
                {step.title}
              </h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: C.muted }}>
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Waitlist CTA ───────────────────────────────────────────────────────────── */
function WaitlistCTA() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      id="waitlist"
      style={{
        background: C.text,
        padding: 'clamp(80px, 10vh, 120px) clamp(20px, 5vw, 80px)',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease }}
        style={{ maxWidth: 560, margin: '0 auto' }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center',
          background: 'rgba(229,80,46,0.15)',
          border: '1px solid rgba(229,80,46,0.3)',
          borderRadius: 100, padding: '5px 14px', marginBottom: 32,
        }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.coral }}>
            Early access
          </span>
        </div>

        <h2 style={{
          margin: '0 0 20px',
          fontFamily: 'var(--font-fraunces, Georgia, serif)',
          fontSize: 'clamp(42px, 5.5vw, 68px)',
          fontWeight: 700, lineHeight: 1.05,
          letterSpacing: '-0.03em',
          color: '#FFFFFF',
        }}>
          Get organized.<br />
          <em style={{ fontStyle: 'italic', color: C.coral }}>From day one.</em>
        </h2>

        <p style={{ margin: '0 0 40px', fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.65)' }}>
          Join the waitlist and be first to know when Quad launches. No spam — one email when we're live.
        </p>

        <form
          style={{ display: 'flex', gap: 12, maxWidth: 420, margin: '0 auto 24px', flexWrap: 'wrap' }}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="your@email.edu"
            style={{
              flex: 1, minWidth: 0,
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.20)',
              borderRadius: 100,
              padding: '13px 20px',
              fontSize: 15, color: '#FFFFFF',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              background: C.coral, color: 'white',
              fontWeight: 600, fontSize: 15,
              padding: '13px 28px', borderRadius: 100,
              border: 'none', cursor: 'pointer',
              boxShadow: `0 4px 20px ${C.coral}55`,
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.dark }}
            onMouseLeave={e => { e.currentTarget.style.background = C.coral }}
          >
            Join waitlist
          </button>
        </form>

        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.40)' }}>
          No spam. One email when we launch.
        </p>
      </motion.div>
    </section>
  )
}

/* ── Page ───────────────────────────────────────────────────────────────────── */
export default function PreviewPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 62 }}>
        <Hero />
        <HowItWorks />
        <FeatureDeadlines />
        <WaitlistCTA />
      </main>
    </>
  )
}
