'use client'

import { useState } from 'react'

const CORAL = '#E5502E'
const CORAL_DEEP = '#C43D1C'
const TEXT = '#1B1B2B'
const MUTED = '#6E6A78'
const BG = '#FAF8F3'
const WHITE = '#FFFFFF'
const BORDER = '#EAE4DA'

const PLATFORMS = ['Instagram', 'TikTok', 'YouTube', 'X / Twitter', 'Twitch', 'Podcast', 'Newsletter', 'Other']
const AUDIENCE = ['Under 1k', '1k – 10k', '10k – 50k', '50k – 100k', '100k – 500k', '500k+']

type Field = {
  name: string
  label: string
  type?: 'text' | 'email' | 'textarea' | 'select'
  required?: boolean
  placeholder?: string
  options?: string[]
  half?: boolean
}

const FIELDS: Field[] = [
  { name: 'full_name', label: 'Full name', required: true, half: true },
  { name: 'email', label: 'Email', type: 'email', required: true, half: true },
  { name: 'country', label: 'Country / region', half: true },
  { name: 'primary_platform', label: 'Primary platform', type: 'select', options: PLATFORMS, half: true },
  { name: 'instagram', label: 'Instagram handle', placeholder: '@yourhandle', half: true },
  { name: 'tiktok', label: 'TikTok handle', placeholder: '@yourhandle', half: true },
  { name: 'youtube', label: 'YouTube channel', half: true },
  { name: 'twitter', label: 'X / Twitter handle', placeholder: '@yourhandle', half: true },
  { name: 'audience_size', label: 'Total audience size', type: 'select', options: AUDIENCE, required: true, half: true },
  { name: 'niche', label: 'Who is your audience / your niche', half: true },
  { name: 'why_partner', label: 'Why do you want to partner with Quad?', type: 'textarea', required: true },
  { name: 'promo_plan', label: 'How would you promote Quad?', type: 'textarea' },
  { name: 'desired_code', label: 'Preferred promo code', placeholder: 'e.g. SARAH', half: true },
  { name: 'payout_method', label: 'Payout method (PayPal / Venmo)', half: true },
  { name: 'other_links', label: 'Links to your best content', type: 'textarea' },
  { name: 'anything_else', label: 'Anything else?', type: 'textarea' },
]

export function CreatorApplyForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())
    try {
      const res = await fetch('/api/creator-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }
      setStatus('done')
    } catch {
      setError('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 20, padding: '48px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
        <h3 style={{ color: TEXT, fontSize: 22, fontWeight: 700, margin: '0 0 8px' }}>Application received</h3>
        <p style={{ color: MUTED, fontSize: 15, margin: 0, lineHeight: 1.5 }}>
          Thanks for applying to the Quad creator program. We review every application personally
          and will reach out by email if it&rsquo;s a fit.
        </p>
      </div>
    )
  }

  const inputStyle: React.CSSProperties = {
    fontSize: 15, color: TEXT, background: WHITE, border: `1px solid ${BORDER}`,
    borderRadius: 12, padding: '12px 14px', width: '100%', outline: 'none',
  }
  const labelStyle: React.CSSProperties = {
    fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 6, display: 'block',
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        background: BG, border: `1px solid ${BORDER}`, borderRadius: 20, padding: 28,
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16,
      }}
    >
      {FIELDS.map((f) => (
        <div key={f.name} style={{ gridColumn: f.half ? 'span 1' : 'span 2' }}>
          <label style={labelStyle} htmlFor={f.name}>
            {f.label}
            {f.required && <span style={{ color: CORAL }}> *</span>}
          </label>
          {f.type === 'textarea' ? (
            <textarea id={f.name} name={f.name} required={f.required} rows={3}
              placeholder={f.placeholder} style={{ ...inputStyle, resize: 'vertical' }} />
          ) : f.type === 'select' ? (
            <select id={f.name} name={f.name} required={f.required} defaultValue=""
              style={{ ...inputStyle, appearance: 'none' }}>
              <option value="" disabled>Select…</option>
              {f.options!.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : (
            <input id={f.name} name={f.name} type={f.type ?? 'text'} required={f.required}
              placeholder={f.placeholder} style={inputStyle} />
          )}
        </div>
      ))}

      {status === 'error' && (
        <p style={{ gridColumn: 'span 2', color: '#B4462F', fontSize: 14, margin: 0 }}>{error}</p>
      )}

      <div style={{ gridColumn: 'span 2', marginTop: 4 }}>
        <button
          type="submit"
          disabled={status === 'sending'}
          style={{
            fontSize: 15, fontWeight: 700, color: WHITE,
            background: `linear-gradient(90deg, ${CORAL_DEEP}, ${CORAL})`,
            border: 'none', borderRadius: 999, padding: '14px 32px', cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(229,80,46,.28)', opacity: status === 'sending' ? 0.6 : 1,
          }}
        >
          {status === 'sending' ? 'Sending…' : 'Submit application'}
        </button>
      </div>
    </form>
  )
}
