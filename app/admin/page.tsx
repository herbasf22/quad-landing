import { getAllEmails, getCount } from "@/lib/db";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const emails = getAllEmails();
  const count  = getCount();

  return (
    <div className="min-h-screen px-6 py-12" style={{ background: "#0e1f18" }}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-campus-accent text-sm font-semibold uppercase tracking-widest mb-1">Quad</p>
            <h1 className="text-3xl font-extrabold text-white">Waitlist</h1>
          </div>
          <div className="text-right">
            <p className="text-4xl font-extrabold text-campus-accent">{count}</p>
            <p className="text-white/40 text-sm">{count === 1 ? "signup" : "signups"}</p>
          </div>
        </div>

        {emails.length === 0 ? (
          <p className="text-white/30 text-center py-20">No signups yet.</p>
        ) : (
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-5 py-3 text-white/40 font-medium">#</th>
                  <th className="text-left px-5 py-3 text-white/40 font-medium">Email</th>
                  <th className="text-right px-5 py-3 text-white/40 font-medium">Signed up</th>
                </tr>
              </thead>
              <tbody>
                {emails.map((row, i) => (
                  <tr key={row.id} className="border-b border-white/5 hover:bg-white/4 transition-colors">
                    <td className="px-5 py-3.5 text-white/30">{i + 1}</td>
                    <td className="px-5 py-3.5 text-white font-medium">{row.email}</td>
                    <td className="px-5 py-3.5 text-white/40 text-right tabular-nums">
                      {new Date(row.created_at + "Z").toLocaleString("en-US", {
                        month: "short", day: "numeric",
                        hour: "numeric", minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-6 text-white/20 text-xs text-center">
          Stored in <code className="font-mono">waitlist.db</code> · refresh to update
        </p>
      </div>
    </div>
  );
}
