import type { Metadata } from 'next'
import { CreatorApplyForm } from '@/components/creator-apply-form'

export const metadata: Metadata = {
  title: 'Become a Creator | Quad',
  description:
    'Partner with Quad on a performance-based revenue share. Apply to join the creator program and earn every month your audience joins their study groups.',
}

const CORAL = '#E5502E'
const TEXT = '#1B1B2B'
const MUTED = '#6E6A78'
const GHOST = '#9A94A2'
const BG = '#FAF8F3'
const TINT = '#FDECE7'
const BORDER = '#EAE4DA'

const PERKS = [
  { title: 'Recurring revenue', body: 'Earn a flat payout for every subscriber your audience brings in — every month they stay.' },
  { title: 'Your own promo code', body: 'A vanity code that unlocks a Plus trial for your audience and tracks every signup back to you.' },
  { title: 'No minimums', body: 'No follower thresholds, no exclusivity. Apply whether you have 500 followers or 500k.' },
]

export default function QuadCreatorsPage() {
  return (
    <main style={{ background: BG, color: TEXT }}>
      {/* Hero */}
      <section style={{ padding: 'clamp(72px,11vh,120px) clamp(16px,4vw,48px) 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <span style={{
            display: 'inline-block', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: CORAL, background: TINT,
            padding: '6px 14px', borderRadius: 999, marginBottom: 20,
          }}>
            Quad Creator Program
          </span>
          <h1 style={{ fontSize: 'clamp(34px,5vw,56px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, margin: '0 0 18px' }}>
            Become a <span style={{ color: CORAL }}>Quad Creator.</span>
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.65, color: MUTED, margin: '0 auto 32px', maxWidth: 500 }}>
            Partner with us on a performance-based revenue share. Every subscriber your audience brings in
            earns you recurring monthly income — while they find their people and their focus.
          </p>
          <a href="#apply" style={{
            display: 'inline-block', fontSize: 15, fontWeight: 700, color: '#fff',
            background: CORAL, borderRadius: 999, padding: '15px 34px', textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(229,80,46,.28)',
          }}>
            Apply to become a creator
          </a>
        </div>
      </section>

      {/* Perks */}
      <section style={{ background: '#fff', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: 'clamp(56px,8vh,88px) clamp(16px,4vw,48px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 28 }}>
          {PERKS.map((p) => (
            <div key={p.title}>
              <h3 style={{ fontSize: 19, fontWeight: 700, margin: '0 0 8px' }}>{p.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: MUTED, margin: 0 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Apply */}
      <section id="apply" style={{ padding: 'clamp(64px,9vh,104px) clamp(16px,4vw,48px)', scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 620, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 12px' }}>
              Ready to <span style={{ color: CORAL }}>partner?</span>
            </h2>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.6, margin: '0 auto', maxWidth: 440 }}>
              Applications take under 3 minutes. We review every one personally and get back to you within 48 hours.
            </p>
          </div>
          <CreatorApplyForm />
          <p style={{ fontSize: 12, color: GHOST, marginTop: 18, textAlign: 'center' }}>
            No follower minimums. No exclusivity requirements.
          </p>
        </div>
      </section>
    </main>
  )
}
