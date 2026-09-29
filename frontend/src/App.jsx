import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { api } from './api.js'
import Navbar from './components/Navbar.jsx'
import DashboardOverview from './components/DashboardOverview.jsx'
import PaymentSimulator from './components/PaymentSimulator.jsx'
import MeshVisualization from './components/MeshVisualization.jsx'
import AccountBalances from './components/AccountBalances.jsx'
import TransactionLedger from './components/TransactionLedger.jsx'
import ActivityLog from './components/ActivityLog.jsx'
import SecurityPanel from './components/SecurityPanel.jsx'
import DemoControls from './components/DemoControls.jsx'
import ToastNotifications from './components/ToastNotifications.jsx'

const INITIAL_FORM = {
  senderVpa: 'alice@demo',
  receiverVpa: 'bob@demo',
  amount: 500,
  pin: '1234',
}

let logSeq = 0
let toastSeq = 0

export default function App() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [devices, setDevices] = useState([])
  const [accounts, setAccounts] = useState([])
  const [transactions, setTransactions] = useState([])
  const [cacheSize, setCacheSize] = useState(0)
  const [backendOnline, setBackendOnline] = useState(false)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [progressStep, setProgressStep] = useState(-1)
  const [animating, setAnimating] = useState(false)
  const [transferring, setTransferring] = useState(false)
  const [logs, setLogs] = useState([])
  const [toasts, setToasts] = useState([])
  const [flashVpas, setFlashVpas] = useState([])
  const accountsRef = useRef([])

  const pushLog = useCallback((message) => {
    const time = new Date().toLocaleTimeString()
    setLogs((prev) => [...prev.slice(-199), { id: ++logSeq, time, message }])
  }, [])

  const toast = useCallback((message, type = 'success') => {
    const id = ++toastSeq
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3600)
  }, [])

  const refresh = useCallback(async () => {
    try {
      const [mesh, accs, txs] = await Promise.all([
        api.getMeshState(),
        api.getAccounts(),
        api.getTransactions(),
      ])
      setDevices(mesh.devices || [])
      setCacheSize(mesh.idempotencyCacheSize ?? 0)
      setAccounts(accs || [])
      setTransactions(txs || [])
      setBackendOnline(true)

      const prev = accountsRef.current
      if (prev.length) {
        const changed = (accs || [])
          .filter((a) => {
            const old = prev.find((p) => p.vpa === a.vpa)
            return old && Number(old.balance) !== Number(a.balance)
          })
          .map((a) => a.vpa)
        if (changed.length) {
          setFlashVpas(changed)
          setTimeout(() => setFlashVpas([]), 1400)
        }
      }
      accountsRef.current = accs || []
    } catch {
      setBackendOnline(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
    const id = setInterval(refresh, 3000)
    return () => clearInterval(id)
  }, [refresh])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: name === 'amount' ? value : value }))
  }

  const sendPayment = async () => {
    setBusy(true)
    setProgressStep(0)
    pushLog('Payment encrypted')
    try {
      const body = {
        senderVpa: form.senderVpa,
        receiverVpa: form.receiverVpa,
        amount: parseFloat(form.amount),
        pin: form.pin,
        ttl: 5,
        startDevice: 'phone-alice',
      }
      const r = await api.sendPayment(body)
      setProgressStep(1)
      pushLog(`Packet injected into mesh at ${r.injectedAt}`)
      pushLog(`Packet ${String(r.packetId).slice(0, 8)} encrypted (TTL ${r.ttl})`)
      if (r.ciphertextPreview) pushLog(`Ciphertext: ${r.ciphertextPreview}`)
      toast('Encrypted packet injected into the mesh')
      await refresh()
    } catch (err) {
      toast(err.message || 'Failed to send payment', 'error')
      pushLog(`Send failed: ${err.message}`)
      setProgressStep(-1)
    } finally {
      setBusy(false)
    }
  }

  const runGossip = async () => {
    setBusy(true)
    setAnimating(true)
    setProgressStep((s) => (s < 2 ? 2 : s))
    try {
      const r = await api.gossip()
      pushLog(`Gossip: ${r.transfers} transfer(s) — ${JSON.stringify(r.deviceCounts)}`)
      const counts = r.deviceCounts || {}
      if ((counts['phone-bridge'] || 0) > 0) {
        setProgressStep(3)
        pushLog('Packet forwarded to bridge')
      } else if ((counts['phone-stranger1'] || 0) > 0) {
        pushLog('Stranger-1 received packet')
      }
      toast(r.transfers ? `Gossip moved ${r.transfers} packet(s)` : 'No packets transferred')
      await refresh()
    } catch (err) {
      toast(err.message || 'Gossip failed', 'error')
      pushLog(`Gossip failed: ${err.message}`)
    } finally {
      setTimeout(() => setAnimating(false), 900)
      setBusy(false)
    }
  }

  const bridgeUpload = async () => {
    setBusy(true)
    setTransferring(true)
    setProgressStep(4)
    pushLog('Bridge connected to 4G')
    try {
      const r = await api.flush()
      pushLog(`Packet uploaded (${r.uploadsAttempted} attempt(s))`)
      ;(r.results || []).forEach((res) => {
        pushLog(`${res.bridgeNode} packet ${res.packetId} → ${res.outcome}${res.reason ? ` (${res.reason})` : ''}`)
      })
      const settled = (r.results || []).some((res) => res.outcome === 'SETTLED')
      if (settled) {
        setProgressStep(5)
        pushLog('Payment settled successfully')
        toast('Payment settled successfully')
      } else if (!r.uploadsAttempted) {
        toast('Bridge holds no packets yet — run gossip first', 'error')
        pushLog('Bridge upload skipped: no packets on bridge')
        setProgressStep(3)
      } else {
        toast('Upload complete — see activity log')
      }
      await refresh()
    } catch (err) {
      toast(err.message || 'Bridge upload failed', 'error')
      pushLog(`Upload failed: ${err.message}`)
    } finally {
      setTimeout(() => setTransferring(false), 900)
      setBusy(false)
    }
  }

  const resetDemo = async () => {
    setBusy(true)
    try {
      await api.reset()
      setProgressStep(-1)
      pushLog('Mesh and idempotency cache cleared')
      toast('Demo reset')
      await refresh()
    } catch (err) {
      toast(err.message || 'Reset failed', 'error')
    } finally {
      setBusy(false)
    }
  }

  const stats = useMemo(() => {
    const pending = devices.reduce((sum, d) => sum + (d.packetCount || 0), 0)
    const settled = transactions.filter((t) => t.status === 'SETTLED').length
    const hops = transactions[0]?.hopCount ?? 0
    return {
      devices: devices.length,
      pending,
      settled,
      hops,
    }
  }, [devices, transactions])

  return (
    <div className="min-h-screen">
      <Navbar
        backendOnline={backendOnline}
        meshActive={devices.length > 0 && backendOnline}
        deviceCount={devices.length}
      />

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        <DashboardOverview stats={stats} />

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <PaymentSimulator
              form={form}
              onChange={handleChange}
              onSubmit={(e) => {
                e.preventDefault()
                sendPayment()
              }}
              loading={busy}
              progressStep={progressStep}
            />
          </div>
          <div className="lg:col-span-2">
            <DemoControls
              onSend={sendPayment}
              onInject={sendPayment}
              onGossip={runGossip}
              onFlush={bridgeUpload}
              onReset={resetDemo}
              busy={busy}
            />
            <p className="mt-3 text-xs text-slate-500">
              Idempotency cache size: {cacheSize}
            </p>
          </div>
        </div>

        <MeshVisualization devices={devices} animating={animating} transferring={transferring} />

        <div className="grid gap-6 lg:grid-cols-2">
          <AccountBalances accounts={accounts} loading={loading} flashVpas={flashVpas} />
          <ActivityLog logs={logs} />
        </div>

        <TransactionLedger transactions={transactions} loading={loading} />
        <SecurityPanel />
      </main>

      <ToastNotifications toasts={toasts} />
    </div>
  )
}
