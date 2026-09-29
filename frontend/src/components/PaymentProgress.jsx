const STEPS = [
  'Encrypted',
  'Broadcasting',
  'Hopping',
  'Bridge Found',
  'Uploaded',
  'Settled',
]

export default function PaymentProgress({ step }) {
  return (
    <ol className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6" aria-label="Payment status">
      {STEPS.map((label, index) => {
        const active = index <= step
        const current = index === step
        return (
          <li
            key={label}
            className={`rounded-xl border px-2.5 py-2 text-center transition ${
              active
                ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-100'
                : 'border-white/10 bg-white/5 text-slate-500'
            }`}
          >
            <div className={`mx-auto mb-1 h-1.5 w-1.5 rounded-full ${active ? 'bg-cyan-300' : 'bg-slate-600'} ${current ? 'animate-pulse' : ''}`} />
            <span className="block text-[11px] font-medium">{label}</span>
          </li>
        )
      })}
    </ol>
  )
}
