import { Activity, ArrowLeftRight, Radio, Smartphone } from 'lucide-react'
import StatCard from './StatCard.jsx'

export default function DashboardOverview({ stats }) {
  return (
    <section className="space-y-6">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
          Infrastructure overview
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Offline payments, connected through the mesh.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Send encrypted UPI payments without internet. Payments hop between nearby devices until a
          bridge device reconnects to the backend.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Smartphone} label="Connected Devices" value={stats.devices} hint="Virtual mesh nodes" accent="cyan" />
        <StatCard icon={Radio} label="Pending Packets" value={stats.pending} hint="Held across the mesh" accent="amber" />
        <StatCard icon={ArrowLeftRight} label="Successful Transactions" value={stats.settled} hint="Settled on backend" accent="emerald" />
        <StatCard icon={Activity} label="Network Hops" value={stats.hops} hint="Last settled path" accent="blue" />
      </div>
    </section>
  )
}
