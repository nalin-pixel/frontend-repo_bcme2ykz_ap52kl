import { motion } from 'framer-motion'

export default function Problem() {
  const bullets = [
    { t: "You're paying Google & Meta to show the WRONG products to the RIGHT people", c: 'warning' },
    { t: 'Your competitors use AI. You use spreadsheets.', c: 'warn' },
    { t: 'Every day without QScale = money burned', c: 'burn' },
  ]

  return (
    <section id="problem" className="relative w-full bg-black py-16 text-white md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-extrabold sm:text-4xl">The Problem</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {bullets.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.05 * i }}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <p className="text-lg">{b.t}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
