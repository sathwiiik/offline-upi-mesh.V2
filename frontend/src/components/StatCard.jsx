import { useEffect, useRef, useState } from 'react'

export default function StatCard({ icon: Icon, label, value, hint, accent = 'cyan' }) {
  const display = useAnimatedNumber(value)
  const accents = {
    cyan: 'from-cyan-500/20 to-transparent text-cyan-300 ring-cyan-400/20',
    emerald: 'from-emerald-500/20 to-transparent text-emerald-300 ring-emerald-400/20',
    amber: 'from-amber-500/20 to-transparent text-amber-300 ring-amber-400/20',
    blue: 'from-blue-500/20 to-transparent text-blue-300 ring-blue-400/20',
  }

  return (
    <div className="glass group rounded-2xl p-4 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/20">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{display}</p>
          {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
        </div>
        <div className={`rounded-xl bg-gradient-to-br p-2.5 ring-1 ${accents[accent]}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

function useAnimatedNumber(value) {
  const [shown, setShown] = useState(Number(value) || 0)
  const current = useRef(Number(value) || 0)

  useEffect(() => {
    const target = Number(value) || 0
    const start = current.current
    const delta = target - start
    if (delta === 0) return undefined
    const steps = 18
    let i = 0
    const id = setInterval(() => {
      i += 1
      const next = Math.round(start + (delta * i) / steps)
      current.current = next
      setShown(next)
      if (i >= steps) clearInterval(id)
    }, 20)
    return () => clearInterval(id)
  }, [value])

  return shown
}
