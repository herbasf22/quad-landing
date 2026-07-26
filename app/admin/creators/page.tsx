import { getCreatorDashboard } from "@/lib/db";

export const dynamic = "force-dynamic";

const money = (n: number) =>
  `$${(n ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

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

  const rows = await getCreatorDashboard();

  const totals = rows.reduce(
    (a, r) => ({
      signups: a.signups + (r.signups ?? 0),
      converted: a.converted + (r.converted ?? 0),
      active: a.active + (r.active_now ?? 0),
      earned: a.earned + (r.earned_total ?? 0),
      paid: a.paid + (r.paid_out ?? 0),
      owed: a.owed + (r.balance_owed ?? 0),
    }),
    { signups: 0, converted: 0, active: 0, earned: 0, paid: 0, owed: 0 }
  );

  return (
    <div className="min-h-screen px-6 py-12" style={{ background: "#0e1f18" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-campus-accent text-sm font-semibold uppercase tracking-widest mb-1">
              Quad
            </p>
            <h1 className="text-3xl font-extrabold text-white">Creators &amp; Affiliates</h1>
          </div>
          <div className="text-right">
            <p className="text-4xl font-extrabold text-campus-accent">{money(totals.owed)}</p>
            <p className="text-white/40 text-sm">owed across {rows.length} creators</p>
          </div>
        </div>

        {/* Summary tiles */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          <Tile label="Signups" value={totals.signups.toString()} />
          <Tile label="Converted" value={totals.converted.toString()} />
          <Tile label="Active now" value={totals.active.toString()} />
          <Tile label="Earned" value={money(totals.earned)} />
          <Tile label="Paid out" value={money(totals.paid)} />
        </div>

        {rows.length === 0 ? (
          <p className="text-white/30 text-center py-20">
            No creators yet. Add one in Supabase:
            <br />
            <code className="text-white/50 text-sm">
              insert into creators (name, email, code, commission_per_conversion) values (&hellip;);
            </code>
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-white/40 uppercase text-xs tracking-wider">
                  <th className="px-4 py-3">Creator</th>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3 text-right">Signups</th>
                  <th className="px-4 py-3 text-right">Converted</th>
                  <th className="px-4 py-3 text-right">Conv %</th>
                  <th className="px-4 py-3 text-right">Active</th>
                  <th className="px-4 py-3 text-right">Split</th>
                  <th className="px-4 py-3 text-right">Earned</th>
                  <th className="px-4 py-3 text-right">Paid</th>
                  <th className="px-4 py-3 text-right">Owed</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.code} className="border-t border-white/5 text-white/80">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-white">{r.name}</div>
                      {r.email && <div className="text-white/40 text-xs">{r.email}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-campus-accent">{r.code}</span>
                    </td>
                    <td className="px-4 py-3 text-right">{r.signups ?? 0}</td>
                    <td className="px-4 py-3 text-right">{r.converted ?? 0}</td>
                    <td className="px-4 py-3 text-right">
                      {r.conversion_rate_pct != null ? `${r.conversion_rate_pct}%` : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">{r.active_now ?? 0}</td>
                    <td className="px-4 py-3 text-right">{money(r.commission_per_conversion)}</td>
                    <td className="px-4 py-3 text-right">{money(r.earned_total)}</td>
                    <td className="px-4 py-3 text-right text-white/50">{money(r.paid_out)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-white">
                      {money(r.balance_owed)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-white/15 text-white font-semibold">
                  <td className="px-4 py-3" colSpan={2}>Total</td>
                  <td className="px-4 py-3 text-right">{totals.signups}</td>
                  <td className="px-4 py-3 text-right">{totals.converted}</td>
                  <td className="px-4 py-3 text-right">—</td>
                  <td className="px-4 py-3 text-right">{totals.active}</td>
                  <td className="px-4 py-3 text-right">—</td>
                  <td className="px-4 py-3 text-right">{money(totals.earned)}</td>
                  <td className="px-4 py-3 text-right">{money(totals.paid)}</td>
                  <td className="px-4 py-3 text-right text-campus-accent">{money(totals.owed)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        <p className="text-white/25 text-xs mt-6">
          Earned = conversions × split. Owed = earned − paid out. Record payouts with
          {" "}<code>update creators set paid_out = &lt;amount&gt; where upper(code) = &apos;CODE&apos;;</code>
        </p>
      </div>
    </div>
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
