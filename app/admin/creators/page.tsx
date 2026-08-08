import { getCreatorDashboard, type CreatorRow, type PayoutModel } from "@/lib/db";

export const dynamic = "force-dynamic";

/// Internal QA row — never counts toward totals or appears in the table.
const EXCLUDED_CODES = ["TESTQUAD"];

const money = (n: number) =>
  `$${(n ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const MODEL: Record<PayoutModel, { label: string; fg: string; bg: string }> = {
  per_conversion: { label: "conversion", fg: "#7BD88F", bg: "rgba(123,216,143,0.12)" },
  per_video: { label: "video", fg: "#8AB4F8", bg: "rgba(138,180,248,0.12)" },
  both: { label: "both", fg: "#E5A03E", bg: "rgba(229,160,62,0.14)" },
};

export default async function CreatorsPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const secret = process.env.ADMIN_SECRET;

  if (!secret || token !== secret) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0e1f18" }}>
        <p className="text-campus-accent font-semibold">Unauthorized</p>
      </div>
    );
  }

  const all = await getCreatorDashboard();
  const rows = all.filter((r) => !EXCLUDED_CODES.includes(r.code?.toUpperCase()));

  const totals = rows.reduce(
    (a, r) => ({
      signups: a.signups + (r.signups ?? 0),
      converted: a.converted + (r.converted ?? 0),
      active: a.active + (r.active_now ?? 0),
      videos: a.videos + (r.videos_approved ?? 0),
      fromConv: a.fromConv + (r.earned_conversions ?? 0),
      fromVideo: a.fromVideo + (r.earned_videos ?? 0),
      earned: a.earned + (r.earned_total ?? 0),
      paid: a.paid + (r.paid_out ?? 0),
      owed: a.owed + (r.balance_owed ?? 0),
    }),
    { signups: 0, converted: 0, active: 0, videos: 0, fromConv: 0, fromVideo: 0, earned: 0, paid: 0, owed: 0 }
  );

  const owedCount = rows.filter((r) => (r.balance_owed ?? 0) > 0).length;

  return (
    <div className="min-h-screen px-6 py-12" style={{ background: "#0e1f18" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-campus-accent text-sm font-semibold uppercase tracking-widest mb-1">
              Quad
            </p>
            <h1 className="text-3xl font-extrabold text-white">Creators &amp; Affiliates</h1>
          </div>
          <div className="text-right">
            <p className="text-4xl font-extrabold text-campus-accent">{money(totals.owed)}</p>
            <p className="text-white/40 text-sm">
              owed to {owedCount} of {rows.length} creators
            </p>
          </div>
        </div>

        {/* Summary tiles */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-4">
          <Tile label="Signups" value={totals.signups.toString()} />
          <Tile label="Converted" value={totals.converted.toString()} />
          <Tile label="Active now" value={totals.active.toString()} />
          <Tile label="Videos" value={totals.videos.toString()} />
          <Tile label="Earned" value={money(totals.earned)} />
          <Tile label="Paid out" value={money(totals.paid)} />
        </div>

        {/* Where the money is coming from */}
        {totals.earned > 0 && (
          <p className="text-white/35 text-xs mb-8">
            {money(totals.fromConv)} from conversions &middot; {money(totals.fromVideo)} from videos
          </p>
        )}

        {rows.length === 0 ? (
          <p className="text-white/30 text-center py-20">
            No creators yet. Add one in Supabase:
            <br />
            <code className="text-white/50 text-sm">
              insert into creators (name, email, code, payout_model, commission_per_conversion)
              values (&hellip;);
            </code>
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-white/40 uppercase text-xs tracking-wider">
                  <th className="px-4 py-3">Creator</th>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Paid on</th>
                  <th className="px-4 py-3 text-right">Signups</th>
                  <th className="px-4 py-3 text-right">Conv</th>
                  <th className="px-4 py-3 text-right">Conv %</th>
                  <th className="px-4 py-3 text-right">Active</th>
                  <th className="px-4 py-3 text-right">Videos</th>
                  <th className="px-4 py-3 text-right">Rate</th>
                  <th className="px-4 py-3 text-right">Earned</th>
                  <th className="px-4 py-3 text-right">Paid</th>
                  <th className="px-4 py-3 text-right">Owed</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <Row key={r.code} r={r} />
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-white/15 text-white font-semibold">
                  <td className="px-4 py-3" colSpan={3}>Total</td>
                  <td className="px-4 py-3 text-right">{totals.signups}</td>
                  <td className="px-4 py-3 text-right">{totals.converted}</td>
                  <td className="px-4 py-3 text-right">—</td>
                  <td className="px-4 py-3 text-right">{totals.active}</td>
                  <td className="px-4 py-3 text-right">{totals.videos}</td>
                  <td className="px-4 py-3 text-right">—</td>
                  <td className="px-4 py-3 text-right">{money(totals.earned)}</td>
                  <td className="px-4 py-3 text-right">{money(totals.paid)}</td>
                  <td className="px-4 py-3 text-right text-campus-accent">{money(totals.owed)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        <p className="text-white/25 text-xs mt-6 leading-relaxed">
          Rows are grouped by payout model. Conversion earnings = converted &times; split; video
          earnings = approved videos &times; per-video rate. Owed = earned &minus; paid out.
          <br />
          Log an approved video with{" "}
          <code>
            insert into creator_videos (creator_code, url, cycle) values (&apos;CODE&apos;,
            &apos;url&apos;, &apos;2026-09&apos;);
          </code>
          <br />
          Record a payout with{" "}
          <code>update creators set paid_out = paid_out + &lt;amount&gt; where upper(code) = &apos;CODE&apos;;</code>
        </p>
      </div>
    </div>
  );
}

function Row({ r }: { r: CreatorRow }) {
  const m = MODEL[r.payout_model] ?? MODEL.per_conversion;
  const perConv = r.payout_model === "per_conversion" || r.payout_model === "both";
  const perVideo = r.payout_model === "per_video" || r.payout_model === "both";
  const dim = "text-white/20";

  return (
    <tr className="border-t border-white/5 text-white/80">
      <td className="px-4 py-3">
        <div className="font-semibold text-white">{r.name}</div>
        {r.email && <div className="text-white/40 text-xs">{r.email}</div>}
      </td>
      <td className="px-4 py-3">
        <span className="font-mono text-campus-accent">{r.code}</span>
      </td>
      <td className="px-4 py-3">
        <span
          className="text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap"
          style={{ color: m.fg, background: m.bg }}
        >
          {m.label}
        </span>
      </td>
      <td className="px-4 py-3 text-right">{r.signups ?? 0}</td>
      {/* Conversion columns go dim for video-only creators — the numbers are
          real, they just don't affect what this person is paid. */}
      <td className={`px-4 py-3 text-right ${perConv ? "" : dim}`}>{r.converted ?? 0}</td>
      <td className={`px-4 py-3 text-right ${perConv ? "" : dim}`}>
        {r.conversion_rate_pct != null ? `${r.conversion_rate_pct}%` : "—"}
      </td>
      <td className={`px-4 py-3 text-right ${perConv ? "" : dim}`}>{r.active_now ?? 0}</td>
      <td className={`px-4 py-3 text-right ${perVideo ? "" : dim}`}>{r.videos_approved ?? 0}</td>
      <td className="px-4 py-3 text-right text-white/60 whitespace-nowrap">
        {perConv && <span>{money(r.commission_per_conversion)}/conv</span>}
        {perConv && perVideo && <br />}
        {perVideo && <span>{money(r.rate_per_video)}/vid</span>}
      </td>
      <td className="px-4 py-3 text-right">
        <div>{money(r.earned_total)}</div>
        {r.payout_model === "both" && (
          <div className="text-white/35 text-xs">
            {money(r.earned_conversions)} + {money(r.earned_videos)}
          </div>
        )}
      </td>
      <td className="px-4 py-3 text-right text-white/50">{money(r.paid_out)}</td>
      <td className="px-4 py-3 text-right font-semibold text-white">{money(r.balance_owed)}</td>
    </tr>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 px-4 py-3" style={{ background: "#0c1a14" }}>
      <div className="text-white/40 text-xs uppercase tracking-wider">{label}</div>
      <div className="text-xl font-extrabold text-white mt-1">{value}</div>
    </div>
  );
}
