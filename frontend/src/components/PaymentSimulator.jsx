import { Send, ShieldCheck } from 'lucide-react'
import PaymentProgress from './PaymentProgress.jsx'

const SENDERS = ['alice@demo', 'bob@demo', 'carol@demo']
const RECEIVERS = ['bob@demo', 'carol@demo', 'alice@demo', 'dave@demo']

export default function PaymentSimulator({
  form,
  onChange,
  onSubmit,
  loading,
  progressStep,
}) {
  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Send Offline Payment</h2>
          <p className="mt-1 text-sm text-slate-400">
            Encrypts a UPI instruction on the sender phone and injects it into the mesh.
          </p>
        </div>
        <div className="hidden rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300 sm:flex sm:items-center sm:gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" />
          AES-256-GCM
        </div>
      </div>

      <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
        <Field label="Sender account" htmlFor="senderVpa">
          <select id="senderVpa" name="senderVpa" value={form.senderVpa} onChange={onChange} className="field">
            {SENDERS.map((vpa) => (
              <option key={vpa} value={vpa}>{vpa}</option>
            ))}
          </select>
        </Field>
        <Field label="Receiver account" htmlFor="receiverVpa">
          <select id="receiverVpa" name="receiverVpa" value={form.receiverVpa} onChange={onChange} className="field">
            {RECEIVERS.map((vpa) => (
              <option key={vpa} value={vpa}>{vpa}</option>
            ))}
          </select>
        </Field>
        <Field label="Amount (INR)" htmlFor="amount">
          <input
            id="amount"
            name="amount"
            type="number"
            min="1"
            step="1"
            value={form.amount}
            onChange={onChange}
            className="field"
          />
        </Field>
        <Field label="UPI PIN" htmlFor="pin">
          <input
            id="pin"
            name="pin"
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={form.pin}
            onChange={onChange}
            className="field"
            autoComplete="off"
          />
        </Field>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            <Send className="h-4 w-4" />
            {loading ? 'Encrypting…' : 'Send to Mesh'}
          </button>
        </div>
      </form>

      <PaymentProgress step={progressStep} />

      <style>{`
        .field {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(148,163,184,0.18);
          background: rgba(2,6,23,0.55);
          padding: 0.6rem 0.8rem;
          color: #e2e8f0;
          font-size: 0.875rem;
        }
      `}</style>
    </section>
  )
}

function Field({ label, htmlFor, children }) {
  return (
    <label className="block" htmlFor={htmlFor}>
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">{label}</span>
      {children}
    </label>
  )
}
