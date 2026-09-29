import { Radio, Smartphone, Wifi, WifiOff } from 'lucide-react'

const LABELS = {
  'phone-alice': { name: 'Sender Phone', type: 'BLE / Offline' },
  'phone-stranger1': { name: 'Stranger 1', type: 'BLE hop' },
  'phone-stranger2': { name: 'Stranger 2', type: 'BLE hop' },
  'phone-stranger3': { name: 'Stranger 3', type: 'BLE hop' },
  'phone-bridge': { name: 'Bridge Phone', type: '4G / HTTPS' },
}

export default function MeshNode({ device, highlight, isBackend }) {
  if (isBackend) {
    return (
      <article className="relative flex min-w-[140px] flex-1 flex-col items-center">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-400/40">
          <span className="absolute inset-0 rounded-full bg-emerald-400/10 blur-md" />
          <Radio className="relative h-7 w-7 text-emerald-300" />
        </div>
        <h3 className="mt-3 text-sm font-semibold text-white">Backend</h3>
        <p className="text-[11px] text-slate-400">Spring Boot ingest</p>
        <span className="mt-2 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
          Online
        </span>
      </article>
    )
  }

  const meta = LABELS[device.deviceId] || { name: device.deviceId, type: 'Mesh node' }
  const online = device.hasInternet

  return (
    <article className={`relative flex min-w-[140px] flex-1 flex-col items-center ${highlight ? 'scale-[1.03]' : ''} transition`}>
      <div
        className={`relative flex h-20 w-20 items-center justify-center rounded-full ring-1 ${
          online
            ? 'bg-cyan-500/10 ring-cyan-400/40'
            : 'bg-slate-500/10 ring-slate-400/20'
        } ${highlight ? 'shadow-glow' : ''}`}
      >
        <span className={`absolute inset-0 rounded-full blur-md ${online ? 'bg-cyan-400/15' : 'bg-slate-400/10'}`} />
        {online ? (
          <Wifi className="relative h-7 w-7 text-cyan-300" />
        ) : (
          <Smartphone className="relative h-7 w-7 text-slate-300" />
        )}
        {device.packetCount > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-400 px-1 text-[10px] font-bold text-slate-950">
            {device.packetCount}
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 text-sm font-semibold text-white">{meta.name}</h3>
      <p className="text-[11px] text-slate-400">{device.deviceId}</p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-1">
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${online ? 'bg-emerald-400/10 text-emerald-300' : 'bg-slate-500/20 text-slate-300'}`}>
          {online ? 'Online' : 'Offline'}
        </span>
        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">{meta.type}</span>
      </div>
      <p className="mt-1 text-[11px] text-slate-500">
        {device.packetCount} packet{device.packetCount === 1 ? '' : 's'} held
      </p>
      {device.packetIds?.length ? (
        <div className="mt-1 flex flex-wrap justify-center gap-1">
          {device.packetIds.map((id) => (
            <span key={id} className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-cyan-200">
              {id}
            </span>
          ))}
        </div>
      ) : null}
      {!online ? <WifiOff className="mt-1 h-3 w-3 text-slate-600" /> : null}
    </article>
  )
}
