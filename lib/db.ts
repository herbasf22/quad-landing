const SUPABASE_URL = process.env.SUPABASE_URL
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY

function authHeaders() {
  return {
    apikey: SERVICE_KEY!,
    Authorization: `Bearer ${SERVICE_KEY}`,
    'Content-Type': 'application/json',
  }
}

export async function insertEmail(email: string): Promise<{ duplicate: boolean }> {
  if (!SUPABASE_URL || !SERVICE_KEY) throw new Error('Supabase env not configured')

  const res = await fetch(`${SUPABASE_URL}/rest/v1/quad_waitlist`, {
    method: 'POST',
    headers: { ...authHeaders(), Prefer: 'return=minimal' },
    body: JSON.stringify({ email: email.toLowerCase().trim() }),
  })

  if (res.status === 409) return { duplicate: true }
  if (!res.ok) throw new Error(`Supabase insert failed: ${res.status}`)
  return { duplicate: false }
}

export async function getAllEmails(): Promise<{ id: number; email: string; created_at: string }[]> {
  if (!SUPABASE_URL || !SERVICE_KEY) return []

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/quad_waitlist?select=id,email,created_at&order=created_at.desc`,
    { headers: authHeaders(), cache: 'no-store' }
  )
  if (!res.ok) throw new Error(`Supabase fetch failed: ${res.status}`)
  return res.json()
}

// ── Creator / affiliate dashboard ───────────────────────────────────────────

export type PayoutModel = 'per_conversion' | 'per_video' | 'both'

export type CreatorRow = {
  name: string
  code: string
  email: string | null
  /// How this creator is paid. Gates which earnings column applies.
  payout_model: PayoutModel
  commission_per_conversion: number
  rate_per_video: number
  signups: number
  converted: number
  active_now: number
  conversion_rate_pct: number | null
  videos_approved: number
  earned_conversions: number
  earned_videos: number
  earned_total: number
  paid_out: number
  balance_owed: number
}

export type CreatorApplication = {
  id: string
  created_at: string
  full_name: string
  email: string
  primary_platform: string | null
  instagram: string | null
  tiktok: string | null
  youtube: string | null
  twitter: string | null
  audience_size: string | null
  niche: string | null
}

/// Applications still awaiting review, oldest first — the /creators page
/// promises a reply within 48 hours, so the oldest is the one that matters.
export async function getPendingApplications(): Promise<CreatorApplication[]> {
  if (!SUPABASE_URL || !SERVICE_KEY) return []
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/creator_applications` +
      `?select=id,created_at,full_name,email,primary_platform,instagram,tiktok,youtube,twitter,audience_size,niche` +
      `&status=eq.pending&order=created_at.asc&limit=50`,
    { headers: authHeaders(), cache: 'no-store' }
  )
  if (!res.ok) throw new Error(`creator_applications fetch failed: ${res.status}`)
  return res.json()
}

/// Reads the admin-only creator_dashboard view (service role required).
export async function getCreatorDashboard(): Promise<CreatorRow[]> {
  if (!SUPABASE_URL || !SERVICE_KEY) return []
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/creator_dashboard?select=*&order=earned_total.desc`,
    { headers: authHeaders(), cache: 'no-store' }
  )
  if (!res.ok) throw new Error(`creator_dashboard fetch failed: ${res.status}`)
  return res.json()
}
