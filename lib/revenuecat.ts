// RevenueCat overview metrics — the six tiles from the RC dashboard home.
//
// The creator dashboard answers "is anyone bringing people in". This answers
// "is anyone paying", which is the question that decides whether paying for
// acquisition makes sense at all.
//
// Needs a V2 secret key with Charts metrics = Read only. Nothing else — the
// key can't read customers, change config, or see PII.

const RC_API_KEY = process.env.RC_API_KEY
const RC_PROJECT_ID = process.env.RC_PROJECT_ID

export type Overview = {
  activeTrials: number
  activeSubscriptions: number
  mrr: number
  revenue28d: number
  newCustomers28d: number
  activeUsers28d: number
  currency: string
}

type RawMetric = { id: string; value: number }

/**
 * Returns null rather than throwing when the key is missing or RevenueCat is
 * having a bad day — the digest is still worth sending without this section.
 */
export async function getRevenueCatOverview(): Promise<Overview | null> {
  if (!RC_API_KEY || !RC_PROJECT_ID) return null

  try {
    const res = await fetch(
      `https://api.revenuecat.com/v2/projects/${RC_PROJECT_ID}/metrics/overview`,
      {
        headers: {
          Authorization: `Bearer ${RC_API_KEY}`,
          Accept: 'application/json',
        },
        cache: 'no-store',
      }
    )
    if (!res.ok) {
      console.error('revenuecat overview failed:', res.status)
      return null
    }

    const body = (await res.json()) as { currency?: string; metrics?: RawMetric[] }
    const at = (id: string) => body.metrics?.find((m) => m.id === id)?.value ?? 0

    return {
      activeTrials: at('active_trials'),
      activeSubscriptions: at('active_subscriptions'),
      mrr: at('mrr'),
      revenue28d: at('revenue'),
      newCustomers28d: at('new_customers'),
      activeUsers28d: at('active_users'),
      currency: body.currency ?? 'USD',
    }
  } catch (err) {
    console.error('revenuecat overview error:', err)
    return null
  }
}
