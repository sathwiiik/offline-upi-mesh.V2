import { Wallet } from 'lucide-react'

export default function AccountBalances({ accounts, loading, flashVpas }) {
  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Account Balances</h2>
          <p className="mt-1 text-sm text-slate-400">Live ledger from the Spring Boot backend.</p>
        </div>
        <Wallet className="h-5 w-5 text-cyan-300" />
      </div>

      {loading && !accounts.length ? (
        <div className="mt-4 space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-xl bg-white/5" />
          ))}
        </div>
      ) : (
        <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
          <table className="hidden w-full text-sm md:table">
            <thead className="bg-white/5 text-left text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-3 font-medium">Account</th>
                <th className="px-4 py-3 font-medium">Holder</th>
                <th className="px-4 py-3 font-medium text-right">Balance</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((a) => (
                <tr key={a.vpa} className={flashVpas.includes(a.vpa) ? 'animate-balanceFlash' : ''}>
                  <td className="px-4 py-3 font-mono text-cyan-200">{a.vpa}</td>
                  <td className="px-4 py-3 text-slate-200">{a.holderName}</td>
                  <td className="px-4 py-3 text-right font-semibold text-emerald-300">
                    {formatInr(a.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="grid gap-2 p-2 md:hidden">
            {accounts.map((a) => (
              <article
                key={a.vpa}
                className={`rounded-xl border border-white/10 bg-white/5 p-3 ${flashVpas.includes(a.vpa) ? 'animate-balanceFlash' : ''}`}
              >
                <div className="text-xs text-slate-400">{a.holderName}</div>
                <div className="font-mono text-sm text-cyan-200">{a.vpa}</div>
                <div className="mt-1 text-lg font-semibold text-emerald-300">{formatInr(a.balance)}</div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

function formatInr(value) {
  const n = Number(value)
  return `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
