import { useEffect, useMemo, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

const neon = {
  purple: '#8B5CF6',
  green: '#10F896',
  red: '#FF3864',
}

function useMoneyCounter(baseMonthly = 2300000) {
  const [value, setValue] = useState(0)
  const ratePerSec = useMemo(() => baseMonthly / (30 * 24 * 3600), [baseMonthly])
  const last = useRef(performance.now())

  useEffect(() => {
    let raf
    const tick = (t) => {
      const dt = (t - last.current) / 1000
      last.current = t
      setValue((v) => v + ratePerSec * dt)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [ratePerSec])

  return value
}

export default function Hero() {
  const [monthlyExtra, setMonthlyExtra] = useState(2300000)
  const [wins, setWins] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/metrics`)
        const data = await res.json()
        setMonthlyExtra(data.total_extra_revenue_month || 2300000)
        setWins(data.wins || [])
      } catch {}
    }
    load()
  }, [baseUrl])

  const moneyCounter = useMoneyCounter(monthlyExtra)

  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0 opacity-80">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.25),transparent_60%)]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 pt-28 pb-16 md:flex-row md:items-start md:gap-16 md:pt-36">
        <div className="w-full md:max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl"
            style={{ fontStretch: 'condensed' }}
          >
            <span className="block">Your Product Feeds Are Broken.</span>
            <span className="mt-2 block text-[color:var(--neon-purple,#8B5CF6)]">You're Losing 40% Revenue.</span>
            <span className="mt-2 block text-white">We Fix That.</span>
          </motion.h1>

          <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-white/60">Money left on the table</p>
              <p className="mt-1 font-mono text-3xl font-bold text-[--green]" style={{ ['--green']: neon.green }}>
                ${moneyCounter.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <p className="mt-2 text-xs text-white/60">Live. Every second you wait, this grows.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-white/60">Extra revenue created this month</p>
              <p className="mt-1 font-mono text-3xl font-bold text-[--purple]" style={{ ['--purple']: neon.purple }}>
                ${Math.round(monthlyExtra).toLocaleString()}
              </p>
              <p className="mt-2 text-xs text-white/60">Across 15+ brands and counting</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#start" className="pointer-events-auto inline-flex items-center justify-center rounded-lg bg-[--purple] px-5 py-3 text-sm font-semibold text-black shadow-[0_0_20px_rgba(139,92,246,0.6)] transition hover:brightness-110" style={{ ['--purple']: neon.purple }}>
              Start Making Money
            </a>
            <a href="#proof" className="pointer-events-auto inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              See The Proof
            </a>
          </div>
        </div>

        <div className="relative mt-4 w-full flex-1 md:mt-0">
          <FeedGlitch />
          <div className="mt-6 hidden gap-2 md:flex md:flex-wrap">
            {wins.slice(0, 6).map((w, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs">
                +${w.delta_revenue.toLocaleString()} • {w.brand}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}

function FeedGlitch() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-wide text-[--red]" style={{ ['--red']: neon.red }}>Broken feed</p>
        <ul className="mt-2 space-y-2">
          {[
            'nike run sh 9 blu',
            'GTIN —',
            'Men > Misc',
            'SKU_991_no-img',
            '20% title duplication',
          ].map((t, i) => (
            <li key={i} className="glitch-item font-mono text-sm text-white/80">{t}</li>
          ))}
        </ul>
        <div className="pointer-events-none absolute inset-0 animate-pulse bg-[repeating-linear-gradient(0deg,transparent,transparent_6px,rgba(255,56,100,0.08)_7px)]" />
      </div>
      <div className="relative overflow-hidden rounded-xl border border-[--green]/30 bg-[--green]/5 p-4" style={{ ['--green']: neon.green }}>
        <p className="text-xs uppercase tracking-wide text-[--green]">Optimized by QScale</p>
        <ul className="mt-2 space-y-2">
          {[
            'Nike Running Shoes | Blue | Size 9',
            'GTIN: 0012345678905',
            'Men > Shoes > Running',
            'High-res image stitched',
            'No duplicates, semantic titles',
          ].map((t, i) => (
            <li key={i} className="font-mono text-sm text-white">{t}</li>
          ))}
        </ul>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,248,150,0.15),transparent_50%)]" />
      </div>
    </div>
  )
}
