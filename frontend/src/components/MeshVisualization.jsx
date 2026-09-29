import { ArrowRight, Radio, Upload } from 'lucide-react'
import MeshNode from './MeshNode.jsx'

const FALLBACK_DEVICES = [
  { deviceId: 'phone-alice', hasInternet: false, packetCount: 0, packetIds: [] },
  { deviceId: 'phone-stranger1', hasInternet: false, packetCount: 0, packetIds: [] },
  { deviceId: 'phone-stranger2', hasInternet: false, packetCount: 0, packetIds: [] },
  { deviceId: 'phone-stranger3', hasInternet: false, packetCount: 0, packetIds: [] },
  { deviceId: 'phone-bridge', hasInternet: true, packetCount: 0, packetIds: [] },
]

export default function MeshVisualization({ devices, animating, transferring }) {
  const ordered = orderDevices(devices.length ? devices : FALLBACK_DEVICES)

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Mesh Network Visualization</h2>
          <p className="mt-1 text-sm text-slate-400">
            Sender Phone → Stranger hops → Bridge Phone → Backend
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Radio className="h-4 w-4 text-cyan-300" />
          Bluetooth-style gossip
        </div>
      </div>

      <div className="relative mt-8 overflow-x-auto pb-4">
        <div className="flex min-w-[820px] items-center justify-between gap-2">
          {ordered.map((device, index) => (
            <div key={device.deviceId} className="flex flex-1 items-center">
              <MeshNode device={device} highlight={animating && device.packetCount > 0} />
              {index < ordered.length - 1 ? (
                <HopLine active={animating || transferring} />
              ) : (
                <HopLine active={transferring} last />
              )}
            </div>
          ))}
          <MeshNode isBackend />
        </div>
      </div>

      <p className="mt-4 flex items-center gap-2 text-xs text-slate-500">
        <ArrowRight className="h-3.5 w-3.5" />
        {animating
          ? 'Gossip round in progress — packets hopping between nearby devices.'
          : transferring
            ? 'Bridge upload in progress — packet traveling to the backend.'
            : 'Idle. Inject a payment, then run gossip until the bridge holds a copy.'}
      </p>
    </section>
  )
}

function HopLine({ active, last }) {
  return (
    <div className="relative mx-1 h-px flex-1 min-w-8 overflow-visible bg-slate-700/70">
      <div className={`absolute inset-y-0 w-full bg-gradient-to-r ${last ? 'from-emerald-400/0 via-emerald-400 to-emerald-400/0' : 'from-cyan-400/0 via-cyan-400 to-cyan-400/0'} ${active ? 'opacity-90' : 'opacity-25'}`} />
      {active ? (
        <span className={`packet-dot absolute -top-1 h-2.5 w-2.5 rounded-full ${last ? 'bg-emerald-300' : 'bg-cyan-300'} shadow-[0_0_10px_currentColor]`} />
      ) : null}
      {last ? <Upload className="absolute -top-3 right-0 h-3 w-3 text-emerald-300" /> : null}
    </div>
  )
}

function orderDevices(devices) {
  const rank = {
    'phone-alice': 0,
    'phone-stranger1': 1,
    'phone-stranger2': 2,
    'phone-stranger3': 3,
    'phone-bridge': 4,
  }
  return [...devices].sort((a, b) => (rank[a.deviceId] ?? 99) - (rank[b.deviceId] ?? 99))
}
