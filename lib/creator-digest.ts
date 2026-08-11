import type { CreatorRow, CreatorApplication } from './db'

/// Internal QA rows that must never appear in reports or totals.
const EXCLUDED_CODES = ['TESTQUAD']

const money = (n: number) => `$${(n ?? 0).toFixed(2)}`

const pct = (n: number | null) => (n == null ? '—' : `${n}%`)

export type Digest = {
  embeds: Array<Record<string, unknown>>
}

/**
 * Formats the creator dashboard as a Discord embed for #staff-chat.
 *
 * Kept pure (no fetch, no env) so it can be rendered and eyeballed without
 * posting anything.
 */
/** Best handle to address someone by, preferring the platform they named. */
function handleOf(a: CreatorApplication): string {
  const byPlatform: Record<string, string | null> = {
    tiktok: a.tiktok,
    instagram: a.instagram,
    youtube: a.youtube,
    x: a.twitter,
    twitter: a.twitter,
  }
  const named = byPlatform[(a.primary_platform ?? '').toLowerCase().split(/[\s/]/)[0]]
  const handle = named || a.tiktok || a.instagram || a.youtube || a.twitter
  return handle ? handle.replace(/^@?/, '@') : a.full_name
}

const ageHours = (iso: string, now: Date) =>
  (now.getTime() - new Date(iso).getTime()) / 36e5

function ageLabel(hours: number): string {
  if (hours < 1) return 'just now'
  if (hours < 24) return `${Math.floor(hours)}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function buildDigest(
  all: CreatorRow[],
  today = new Date(),
  applications: CreatorApplication[] = [],
): Digest {
  const rows = all.filter((r) => !EXCLUDED_CODES.includes(r.code?.toUpperCase()))

  const t = rows.reduce(
    (a, r) => ({
      signups: a.signups + (r.signups ?? 0),
      converted: a.converted + (r.converted ?? 0),
      active: a.active + (r.active_now ?? 0),
      owed: a.owed + (r.balance_owed ?? 0),
      paid: a.paid + (r.paid_out ?? 0),
    }),
    { signups: 0, converted: 0, active: 0, owed: 0, paid: 0 }
  )

  const convRate = t.signups > 0 ? ((100 * t.converted) / t.signups).toFixed(1) : '0.0'
  const date = today.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'America/New_York',
  })

  const fields: Array<Record<string, unknown>> = [
    {
      name: 'Totals',
      value: [
        `**${t.signups}** signups · **${t.converted}** converted · **${convRate}%**`,
        `**${t.active}** subscribed right now`,
      ].join('\n'),
      inline: false,
    },
  ]

  // Leaderboard — by conversions, then signups. Creators with nothing yet are
  // listed separately below, so keep them out of the table.
  const top = rows
    .filter((r) => (r.signups ?? 0) > 0)
    .sort((a, b) => (b.converted ?? 0) - (a.converted ?? 0) || (b.signups ?? 0) - (a.signups ?? 0))
    .slice(0, 8)

  if (top.length) {
    const w = Math.max(4, ...top.map((r) => r.code.length))
    const table = [
      `${'CODE'.padEnd(w)}  ${'SIGN'.padStart(5)} ${'CONV'.padStart(5)} ${'RATE'.padStart(6)}`,
      ...top.map(
        (r) =>
          `${r.code.padEnd(w)}  ${String(r.signups ?? 0).padStart(5)} ` +
          `${String(r.converted ?? 0).padStart(5)} ${pct(r.conversion_rate_pct).padStart(6)}`
      ),
    ].join('\n')
    fields.push({ name: 'Top creators', value: '```\n' + table + '\n```', inline: false })
  }

  // Money — only meaningful once a real rate is set.
  if (t.owed > 0 || t.paid > 0) {
    fields.push({
      name: 'Payouts',
      value: `**${money(t.owed)}** owed across ${rows.filter((r) => (r.balance_owed ?? 0) > 0).length} creators · ${money(t.paid)} paid to date`,
      inline: false,
    })
  }

  // Applications waiting. /creators promises a reply within 48 hours and
  // nothing else surfaces these — they just sit in the table.
  if (applications.length) {
    const overdue = applications.filter((a) => ageHours(a.created_at, today) > 48)
    const lines = applications.slice(0, 8).map((a) => {
      const hrs = ageHours(a.created_at, today)
      const size = a.audience_size ? ` · ${a.audience_size}` : ''
      const flag = hrs > 48 ? ' ⚠️' : ''
      return `${handleOf(a)} — ${a.primary_platform ?? '?'}${size} · ${ageLabel(hrs)}${flag}`
    })
    if (applications.length > 8) {
      lines.push(`…and ${applications.length - 8} more`)
    }
    fields.push({
      name: overdue.length
        ? `📥 ${applications.length} waiting — ${overdue.length} past 48h`
        : `📥 ${applications.length} waiting to review`,
      value: lines.join('\n'),
      inline: false,
    })
  }

  // Creators who signed up but aren't producing — the ones to go help.
  const stalled = rows.filter((r) => (r.signups ?? 0) === 0)
  if (stalled.length) {
    fields.push({
      name: `No signups yet (${stalled.length})`,
      value: stalled
        .slice(0, 10)
        .map((r) => r.code)
        .join(', '),
      inline: false,
    })
  }

  if (!rows.length) {
    fields.push({
      name: 'No creators yet',
      value: 'Add one in Supabase: `insert into creators (name, email, code) values (…);`',
      inline: false,
    })
  }

  return {
    embeds: [
      {
        title: `📊 Quad Creators — ${date}`,
        color: 0xe5502e, // Quad coral
        fields,
        footer: { text: 'Updates daily · full dashboard on the website' },
      },
    ],
  }
}
