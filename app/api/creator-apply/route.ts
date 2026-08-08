// Creator/affiliate application intake — first-party (replaces Airtable).
// Writes to the deny-all `creator_applications` table via the service-role key.
// Mirrors the waitlist route: REST API direct, no client dependency.

const SUPABASE_URL = process.env.SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

// Fields we accept from the form. Anything else is ignored.
const FIELDS = [
  'full_name', 'email', 'country',
  'primary_platform', 'instagram', 'tiktok', 'youtube', 'twitter', 'other_links',
  'audience_size', 'niche',
  'why_partner', 'promo_plan', 'desired_code', 'payout_method', 'anything_else',
] as const

function svcHeaders() {
  return {
    apikey: SERVICE_KEY as string,
    Authorization: `Bearer ${SERVICE_KEY}`,
    'Content-Type': 'application/json',
  }
}

export async function POST(request: Request) {
  try {
    const raw = await request.json()

    const full_name = String(raw.full_name ?? '').trim()
    const email = String(raw.email ?? '').trim().toLowerCase()

    if (!full_name) {
      return Response.json({ error: 'Please enter your name.' }, { status: 400 })
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }
    if (!SUPABASE_URL || !SERVICE_KEY) {
      console.error('Creator apply: Supabase env not configured')
      return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
    }

    // Whitelist + trim; empty strings become null so the table stays clean.
    const row: Record<string, string | null> = {}
    for (const f of FIELDS) {
      const v = raw[f] == null ? '' : String(raw[f]).trim()
      row[f] = v === '' ? null : v
    }
    row.full_name = full_name
    row.email = email

    const res = await fetch(`${SUPABASE_URL}/rest/v1/creator_applications`, {
      method: 'POST',
      headers: { ...svcHeaders(), Prefer: 'return=minimal' },
      body: JSON.stringify(row),
    })

    if (!res.ok) {
      console.error('Creator apply insert failed:', res.status, await res.text())
      return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
    }

    return Response.json(
      { success: true, message: "Application received — we'll be in touch." },
      { status: 201 },
    )
  } catch (error) {
    console.error('Creator apply POST error:', error)
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
