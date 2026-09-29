import { Clock, Fingerprint, Hash, KeyRound, Lock, ShieldCheck } from 'lucide-react'

const ITEMS = [
  { icon: KeyRound, label: 'RSA-2048 encryption', tip: 'OAEP-SHA256 unwraps the AES session key' },
  { icon: Lock, label: 'AES-256-GCM payload encryption', tip: 'Authenticated encryption of the payment instruction' },
  { icon: Hash, label: 'SHA-256 packet hashing', tip: 'Ciphertext hash used as the idempotency key' },
  { icon: Fingerprint, label: 'Idempotency protection', tip: 'Duplicate packets are dropped before settlement' },
  { icon: Clock, label: '24-hour freshness validation', tip: 'Stale or future-dated packets are rejected' },
  { icon: ShieldCheck, label: 'Transactional settlement', tip: 'Debit, credit and ledger write in one transaction' },
]

export default function SecurityPanel() {
  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <h2 className="text-lg font-semibold text-white">Security / System Status</h2>
      <p className="mt-1 text-sm text-slate-400">Cryptographic and settlement controls on every ingest.</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {ITEMS.map((item) => (
          <div
            key={item.label}
            title={item.tip}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3"
          >
            <item.icon className="h-4 w-4 shrink-0 text-cyan-300" />
            <div>
              <div className="text-sm text-slate-100">{item.label}</div>
              <div className="text-[11px] text-slate-500">{item.tip}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
