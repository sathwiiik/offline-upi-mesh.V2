import { useEffect, useRef } from 'react'
import { TerminalSquare } from 'lucide-react'

export default function ActivityLog({ logs }) {
  const scroller = useRef(null)

  useEffect(() => {
    const el = scroller.current
    if (el) el.scrollTop = el.scrollHeight
  }, [logs])

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Activity Log</h2>
          <p className="mt-1 text-sm text-slate-400">Real-time mesh and settlement events.</p>
        </div>
        <TerminalSquare className="h-5 w-5 text-cyan-300" />
      </div>

      <div
        ref={scroller}
        className="scrollbar-thin mt-4 h-56 overflow-y-auto rounded-xl border border-white/10 bg-[#05080f] p-3 font-mono text-xs leading-6"
        aria-live="polite"
      >
        {logs.length === 0 ? (
          <p className="text-slate-500">Waiting for events…</p>
        ) : (
          logs.map((line) => (
            <div key={line.id} className="text-emerald-300/90">
              <span className="text-slate-500">[{line.time}]</span> {line.message}
            </div>
          ))
        )}
      </div>
    </section>
  )
}
