import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function FlexZone() {
  const [metrics, setMetrics] = useState({ total_extra_revenue_month: 2300000, before_after: [] })
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/metrics`)
        const data = await res.json()
        setMetrics(data)
      } catch {}
    }
    load()
  }, [baseUrl])

  return (
    <section id="proof" className="relative w-full bg-black py-16 text-white md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <h2 className="text-3xl font-extrabold sm:text-4xl">The Flex Zone</h2>
          <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-mono">
            +${Math.round(metrics.total_extra_revenue_month).toLocaleString()} extra this month
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-wide text-white/60">Before → After</p>
              <div className="mt-3 space-y-3">
                {metrics.before_after.map((row, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-1 gap-3 rounded-lg bg-black/40 p-3 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-red-400">Before</p>
                      <p className="font-mono text-sm text-white/80">{row.before}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-emerald-400">After</p>
                      <p className="font-mono text-sm text-white">{row.after}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="grid w-full grid-cols-3 gap-3">
              {["Flipkart","Swiggy","Zalora","Nykaa","Myntra","Ajio"].map((logo, i) => (
                <motion.div key={i} whileHover={{ scale: 1.06, boxShadow: '0 0 24px rgba(139,92,246,0.7)' }} className="flex h-16 items-center justify-center rounded-md border border-white/10 bg-black/40 text-sm text-white/70">
                  {logo}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
