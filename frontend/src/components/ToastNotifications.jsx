export default function ToastNotifications({ toasts }) {
  if (!toasts.length) return null
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-[min(92vw,360px)] flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto rounded-xl border px-4 py-3 text-sm shadow-card backdrop-blur ${
            t.type === 'error'
              ? 'border-rose-400/30 bg-rose-950/80 text-rose-100'
              : 'border-emerald-400/30 bg-emerald-950/80 text-emerald-100'
          }`}
          role="status"
        >
          {t.message}
        </div>
      ))}
    </div>
  )
}
