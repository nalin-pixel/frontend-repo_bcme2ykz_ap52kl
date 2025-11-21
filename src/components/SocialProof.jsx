import { motion } from 'framer-motion'

export default function SocialProof() {
  const quotes = [
    { q: 'We replaced their entire feed team', a: 'Flipkart' },
    { q: 'ROI so good, finance thought it was an error', a: 'Swiggy' },
    { q: 'Turned our catalog from trash to cash', a: 'Zalora' },
  ]

  return (
    <section className="relative w-full bg-black py-16 text-white md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-extrabold sm:text-4xl">What They Said</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {quotes.map((x, i) => (
            <motion.blockquote key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="text-lg">“{x.q}”</p>
              <footer className="mt-4 text-sm text-white/60">— {x.a}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
