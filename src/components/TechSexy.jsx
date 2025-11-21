import { motion } from 'framer-motion'

export default function TechSexy() {
  return (
    <section className="relative w-full bg-black py-16 text-white md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-extrabold sm:text-4xl">Tech, But Sexy</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/70">Animated AI brain processing feeds</p>
            <div className="mt-4 h-24 w-full animate-pulse rounded-md bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/70">Matrix rain of product titles optimizing</p>
            <div className="mt-4 h-24 w-full overflow-hidden rounded-md bg-black/60">
              <div className="animate-marquee space-y-2 p-3 text-[10px] text-emerald-400/90">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="font-mono">[OPT] SKU{i.toString().padStart(4,'0')} → OK</div>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/70">Speed: Human vs QScale</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-md border border-red-400/30 bg-red-400/10 p-3 text-center">
                <p className="text-[10px] uppercase tracking-wider text-red-300">Human</p>
                <p className="mt-1 font-mono text-xl">1 hr/SKU</p>
              </div>
              <div className="rounded-md border border-emerald-400/30 bg-emerald-400/10 p-3 text-center">
                <p className="text-[10px] uppercase tracking-wider text-emerald-300">QScale</p>
                <p className="mt-1 font-mono text-xl">10,000/sec</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
