import { Receipt } from 'lucide-react'

const BADGE = {
  SETTLED: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/20',
  REJECTED: 'bg-rose-400/15 text-rose-300 border-rose-400/20',
  PENDING: 'bg-amber-400/15 text-amber-300 border-amber-400/20',
  'IN MESH': 'bg-cyan-400/15 text-cyan-300 border-cyan-400/20',
  UPLOADED: 'bg-blue-400/15 text-blue-300 border-blue-400/20',
  DUPLICATE_DROPPED: 'bg-amber-400/15 text-amber-200 border-amber-400/20',
  INVALID: 'bg-rose-400/15 text-rose-300 border-rose-400/20',
}

export default function TransactionLedger({ transactions, loading }) {
  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Transaction Ledger</h2>
          <p className="mt-1 text-sm text-slate-400">Settled and rejected packets written by the backend.</p>
        </div>
        <Receipt className="h-5 w-5 text-cyan-300" />
      </div>

      {loading && !transactions.length ? (
        <div className="mt-4 h-32 animate-pulse rounded-xl bg-white/5" />
      ) : !transactions.length ? (
        <EmptyState />
      ) : (
        <>
          <div className="mt-4 hidden overflow-x-auto md:block">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-3 py-2 font-medium">Transaction ID</th>
                  <th className="px-3 py-2 font-medium">From</th>
                  <th className="px-3 py-2 font-medium">To</th>
                  <th className="px-3 py-2 font-medium">Amount</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                  <th className="px-3 py-2 font-medium">Bridge</th>
                  <th className="px-3 py-2 font-medium">Hops</th>
                  <th className="px-3 py-2 font-medium">Settled At</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className="border-t border-white/5 transition hover:bg-white/5">
                    <td className="px-3 py-3 font-mono text-slate-300">{t.id}</td>
                    <td className="px-3 py-3 text-slate-200">{t.senderVpa}</td>
                    <td className="px-3 py-3 text-slate-200">{t.receiverVpa}</td>
                    <td className="px-3 py-3 font-medium text-emerald-300">{formatInr(t.amount)}</td>
                    <td className="px-3 py-3"><StatusBadge status={t.status} /></td>
                    <td className="px-3 py-3 text-slate-400">{t.bridgeNodeId}</td>
                    <td className="px-3 py-3 text-slate-300">{t.hopCount}</td>
                    <td className="px-3 py-3 text-xs text-slate-500">{formatTime(t.settledAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 grid gap-2 md:hidden">
            {transactions.map((t) => (
              <article key={t.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-400">#{t.id}</span>
                  <StatusBadge status={t.status} />
                </div>
                <p className="mt-2 text-sm text-slate-200">
                  {t.senderVpa} → {t.receiverVpa}
                </p>
                <p className="mt-1 text-lg font-semibold text-emerald-300">{formatInr(t.amount)}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {t.bridgeNodeId} · {t.hopCount} hops · {formatTime(t.settledAt)}
                </p>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

function StatusBadge({ status }) {
  const cls = BADGE[status] || 'bg-slate-500/20 text-slate-300 border-white/10'
  return (
    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold ${cls}`}>
      {status}
    </span>
  )
}

function EmptyState() {
  return (
    <div className="mt-6 rounded-xl border border-dashed border-white/10 px-4 py-10 text-center">
      <p className="text-sm font-medium text-slate-300">No transactions yet</p>
      <p className="mt-1 text-xs text-slate-500">Send a payment, gossip it to the bridge, then upload.</p>
    </div>
  )
}

function formatInr(value) {
  const n = Number(value)
  return `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function formatTime(iso) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}
