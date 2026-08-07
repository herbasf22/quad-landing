import { getCreatorDashboard } from '@/lib/db'
import { buildDigest } from '@/lib/creator-digest'

export const dynamic = 'force-dynamic'

/**
 * Daily creator digest → Discord #staff-chat.
 *
 * Scheduled by vercel.json. Vercel sends `Authorization: Bearer $CRON_SECRET`
 * on cron invocations; ?token=$ADMIN_SECRET works for firing it by hand.
 *
 * Env: DISCORD_STAFF_WEBHOOK, CRON_SECRET, ADMIN_SECRET,
 *      SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */
export async function GET(req: Request) {
  const url = new URL(req.url)
  const auth = req.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  const adminSecret = process.env.ADMIN_SECRET

  const fromCron = !!cronSecret && auth === `Bearer ${cronSecret}`
  const manual = !!adminSecret && url.searchParams.get('token') === adminSecret
  if (!fromCron && !manual) {
    return Response.json({ error: 'unauthorized' }, { status: 401 })
  }

  const webhook = process.env.DISCORD_STAFF_WEBHOOK
  if (!webhook) {
    return Response.json({ error: 'DISCORD_STAFF_WEBHOOK not set' }, { status: 500 })
  }

  let rows
  try {
    rows = await getCreatorDashboard()
  } catch (err) {
    return Response.json({ error: `supabase: ${(err as Error).message}` }, { status: 502 })
  }

  const digest = buildDigest(rows)

  // ?dry=1 renders the payload without posting — for checking formatting.
  if (url.searchParams.get('dry')) {
    return Response.json({ posted: false, creators: rows.length, payload: digest })
  }

  const res = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(digest),
  })

  if (!res.ok) {
    return Response.json(
      { error: `discord ${res.status}: ${await res.text()}` },
      { status: 502 }
    )
  }

  return Response.json({ posted: true, creators: rows.length })
}
