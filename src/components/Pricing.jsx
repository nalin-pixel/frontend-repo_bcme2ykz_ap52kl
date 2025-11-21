import { useMemo, useState } from 'react'

export default function Pricing() {
  const [spend, setSpend] = useState(10000)

  const calc = useMemo(() => {
    const extra = spend * 1.4 - spend // +40% revenue lift on ad spend
    const fee = Math.max(600, extra * 0.15)
    const you = extra - fee
    return { extra, fee, you }
  }, [spend])

  return (
    <section id="start" className="relative w-full bg-black py-16 text-white md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-extrabold sm:text-4xl">Pricing That Doesn't Hide</h2>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <label className="text-sm text-white/70">Monthly Ad Spend ($)</label>
            <input type="range" min="5000" max="200000" step="1000" value={spend} onChange={(e) => setSpend(parseInt(e.target.value))} className="mt-3 w-full" />
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <Stat label="Extra revenue" value={`$${Math.round(calc.extra).toLocaleString()}`} accent="emerald" />
              <Stat label="Our fee" value={`$${Math.round(calc.fee).toLocaleString()}`} accent="purple" />
              <Stat label="You keep" value={`$${Math.round(calc.you).toLocaleString()}`} accent="white" />
            </div>
            <p className="mt-4 text-sm text-white/60">We only win when you win. Show the math. No fine print.</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-bold">28-Day Trial</h3>
            <p className="mt-2 text-white/70">Your competitors started their trial 3 minutes ago.</p>
            <LiveTrials />
            <a href="#start" className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:brightness-95">Start Making Money</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ label, value, accent = 'white' }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/40 p-3">
      <p className="text-[10px] uppercase tracking-wider text-white/60">{label}</p>
      <p className="mt-1 font-mono text-2xl" style={{ color: accent === 'emerald' ? '#10F896' : accent === 'purple' ? '#8B5CF6' : '#ffffff' }}>{value}</p>
    </div>
  )
}

function LiveTrials() {
  const [items, setItems] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useState(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/trials`)
        const data = await res.json()
        setItems(data)
      } catch {}
    }
    load()
  }, [])

  return (
    <div className="mt-4 space-y-2">
      {items.map((t, i) => (
        <div key={i} className="flex items-center justify-between rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm">
          <span className="font-mono text-white/80">{t.anon_id}</span>
          <span className="text-white/60">{t.minutes_ago}m ago • {t.market}</span>
        </div>
      ))}
    </div>
  )
}
