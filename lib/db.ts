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
