import { RefreshCcw, RotateCcw, Send, Upload, Zap } from 'lucide-react'

export default function DemoControls({
  onSend,
  onInject,
  onGossip,
  onFlush,
  onReset,
  busy,
}) {
  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <h2 className="text-lg font-semibold text-white">Demo Controls</h2>
      <p className="mt-1 text-sm text-slate-400">Drive the mesh simulation without changing backend APIs.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Control onClick={onSend} disabled={busy} icon={Send} label="Send Payment" tone="primary" />
        <Control onClick={onInject} disabled={busy} icon={Zap} label="Inject Into Mesh" />
        <Control onClick={onGossip} disabled={busy} icon={RefreshCcw} label="Run Gossip Round" />
        <Control onClick={onFlush} disabled={busy} icon={Upload} label="Bridge Upload" />
        <Control onClick={onReset} disabled={busy} icon={RotateCcw} label="Reset Demo" tone="danger" />
      </div>
    </section>
  )
}

function Control({ onClick, disabled, icon: Icon, label, tone = 'default' }) {
  const tones = {
    primary: 'from-cyan-500 to-blue-600 text-white border-transparent',
    danger: 'border-rose-400/30 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20',
    default: 'border-white/10 bg-white/5 text-slate-200 hover:border-cyan-400/30 hover:text-white',
  }
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition disabled:opacity-50 ${
        tone === 'primary' ? `bg-gradient-to-r ${tones.primary}` : tones[tone]
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  )
}
