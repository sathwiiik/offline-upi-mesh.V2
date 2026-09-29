import { Radio, Server, Settings, UserRound } from 'lucide-react'

export default function Navbar({ backendOnline, meshActive, deviceCount }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070b14]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 ring-1 ring-cyan-400/30">
            <Radio className="h-5 w-5 text-cyan-300" aria-hidden="true" />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight text-white">UPI Mesh</div>
            <div className="text-xs text-slate-400">Offline Payment Network</div>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <StatusChip
            ok={meshActive}
            label={meshActive ? 'Mesh Network Active' : 'Mesh Idle'}
            detail={`${deviceCount} devices`}
          />
          <StatusChip
            ok={backendOnline}
            icon={Server}
            label={backendOnline ? 'Backend Online' : 'Backend Offline'}
            detail="Spring Boot"
          />
        </div>

        <div className="flex items-center gap-2">
          <IconButton label="Settings">
            <Settings className="h-4 w-4" />
          </IconButton>
          <IconButton label="Profile">
            <UserRound className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
    </header>
  )
}

function StatusChip({ ok, label, detail, icon: Icon }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
      <span className={`relative flex h-2 w-2 ${ok ? '' : 'opacity-70'}`}>
        <span className={`absolute inline-flex h-full w-full rounded-full ${ok ? 'bg-emerald-400 animate-ping opacity-60' : 'bg-rose-400'}`} />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${ok ? 'bg-emerald-400' : 'bg-rose-400'}`} />
      </span>
      {Icon ? <Icon className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" /> : null}
      <span className="text-xs font-medium text-slate-200">{label}</span>
      <span className="text-[11px] text-slate-500">{detail}</span>
    </div>
  )
}

function IconButton({ label, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-400/30 hover:text-white"
    >
      {children}
    </button>
  )
}
