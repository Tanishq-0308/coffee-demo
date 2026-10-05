import { AnimatePresence, animate, motion, useInView, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { gallery, img, menu, origins, reviews } from './data'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
}

function Steam({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden>
      {[35, 60, 85].map((x, i) => (
        <motion.path
          key={x}
          d={`M${x} 58 q-8 -10 0 -20 q8 -10 0 -20 q-8 -10 0 -16`}
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          animate={{ opacity: [0, 0.7, 0], y: [8, -4, -14], pathLength: [0.3, 1, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  )
}

function Bean({ className = '', delay = 0, size = 'w-8' }: { className?: string; delay?: number; size?: string }) {
  return (
    <motion.svg
      viewBox="0 0 40 56"
      className={`absolute ${size} ${className}`}
      animate={{ y: [0, -24, 0], rotate: [0, 40, 0] }}
      transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }}
      aria-hidden
    >
      <ellipse cx="20" cy="28" rx="17" ry="25" fill="#7a4e2d" />
      <path d="M20 5 q-9 23 0 46" stroke="#3b2416" strokeWidth="3" fill="none" />
    </motion.svg>
  )
}

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2, ease: 'easeOut', onUpdate: (v) => ref.current && (ref.current.textContent = Math.round(v).toLocaleString() + suffix) })
    return () => c.stop()
  }, [inView, to, suffix])
  return <span ref={ref}>0{suffix}</span>
}

function Pour() {
  const cup = 'M40 110 h120 l-10 90 a12 12 0 0 1 -12 10 h-76 a12 12 0 0 1 -12 -10 z'
  const loop = { duration: 3.5, repeat: Infinity, repeatDelay: 0.6 }
  return (
    <svg viewBox="0 0 220 230" className="w-64 md:w-80" aria-hidden>
      <path d="M60 4 h100 l-10 22 h-80 z" fill="#3b2416" />
      <motion.path d="M110 26 v110" stroke="#5e3620" strokeWidth="9" strokeLinecap="round" animate={{ pathLength: [0, 1, 1, 0], opacity: [1, 1, 1, 0] }} transition={{ ...loop, times: [0, 0.2, 0.75, 1] }} />
      <clipPath id="cup"><path d={cup} /></clipPath>
      <g clipPath="url(#cup)">
        <rect x="30" y="100" width="160" height="120" fill="#fffaf2" />
        <motion.g animate={{ y: [100, 8, 8, 100] }} transition={{ ...loop, times: [0, 0.75, 0.92, 1] }}>
          <rect x="30" y="112" width="160" height="120" fill="#7a4e2d" />
          <motion.ellipse cx="100" cy="114" rx="34" ry="5" fill="#e6d3b8" animate={{ rx: [10, 40, 10] }} transition={{ duration: 1.6, repeat: Infinity }} />
        </motion.g>
      </g>
      <path d={cup} fill="none" stroke="#3b2416" strokeWidth="5" />
      <path d="M156 130 h14 a18 18 0 0 1 0 36 h-18" stroke="#3b2416" strokeWidth="5" fill="none" />
    </svg>
  )
}

function Nav({ cart }: { cart: number }) {
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setSolid(y > 40))
  const links = ['Story', 'Menu', 'Process', 'Beans', 'Visit']
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${solid ? 'bg-cream/90 backdrop-blur shadow-sm py-3' : 'py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-serif text-2xl font-bold flex items-center gap-2">
          <span className="grid place-items-center size-9 rounded-full bg-espresso text-cream text-base">B</span>
          Bean &amp; Brew
        </a>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="relative group">
              {l}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-caramel transition-all group-hover:w-full" />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <motion.span key={cart} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="rounded-full bg-espresso text-cream px-4 py-2 text-sm">
            Order · {cart}
          </motion.span>
          <button className="md:hidden text-2xl" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="md:hidden overflow-hidden bg-cream">
            {links.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="block px-6 py-3 border-b border-latte">{l}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 12])
  const words = 'Crafted coffee, slow mornings.'.split(' ')
  return (
    <header ref={ref} className="relative min-h-screen pt-32 pb-16 overflow-hidden">
      <div className="absolute -right-40 -top-40 size-[600px] rounded-full bg-latte/70 blur-3xl" />
      <Bean className="left-[6%] top-[30%]" />
      <Bean className="left-[45%] top-[18%]" delay={1.5} size="w-6" />
      <Bean className="right-[5%] bottom-[12%]" delay={3} size="w-10" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 rounded-full bg-latte px-4 py-1.5 text-sm text-mocha mb-6">
            <span className="size-2 rounded-full bg-caramel animate-pulse" /> Roasted in-house · Since 2014
          </motion.p>
          <h1 className="font-serif text-5xl md:text-7xl xl:text-8xl font-bold leading-[1.02]">
            {words.map((w, i) => (
              <motion.span key={i} className="inline-block mr-4" initial={{ opacity: 0, y: 60, rotate: 6 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: 0.2 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                {i === 1 ? <em className="text-caramel">{w}</em> : w}
              </motion.span>
            ))}
          </h1>
          <motion.p {...fadeUp} transition={{ delay: 0.8 }} className="mt-8 text-lg text-mocha max-w-lg">
            A neighborhood café pouring ethically sourced, small-batch coffee — plus fresh pastries baked every morning at dawn.
          </motion.p>
          <motion.div {...fadeUp} transition={{ delay: 1 }} className="mt-10 flex flex-wrap gap-4">
            <motion.a href="#menu" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="rounded-full bg-espresso text-cream px-8 py-4 font-medium shadow-lg shadow-espresso/20">
              Explore the menu
            </motion.a>
            <motion.a href="#visit" whileHover={{ scale: 1.05 }} className="rounded-full border-2 border-espresso px-8 py-4 font-medium">
              Find us
            </motion.a>
          </motion.div>
          <div className="mt-14 grid grid-cols-3 gap-6 max-w-md">
            {[
              [12, 'Origins', ''],
              [480, 'Cups daily', '+'],
              [4.9, 'Rating', '★'],
            ].map(([n, label, s]) => (
              <div key={label as string}>
                <div className="font-serif text-3xl font-bold">{n === 4.9 ? '4.9★' : <Counter to={n as number} suffix={s as string} />}</div>
                <div className="text-sm text-mocha">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <motion.div style={{ y }} className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-[4/5] max-w-md rounded-[3rem] overflow-hidden shadow-2xl shadow-espresso/30"
          >
            <motion.img style={{ rotate }} src={img('1541167760496-1628856ab772', 1000)} alt="Barista pouring latte art" className="size-full object-cover scale-110" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
            transition={{ delay: 1.2, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
            className="absolute -left-4 md:-left-10 bottom-16 flex items-center gap-3 rounded-2xl bg-cream/95 backdrop-blur p-4 shadow-xl"
          >
            <div className="relative">
              <Steam className="absolute -top-7 left-0 w-12 text-caramel" />
              <img src={img('1572442388796-11668a67e53d', 120)} alt="" className="size-12 rounded-full object-cover" />
            </div>
            <div>
              <div className="font-bold text-sm">Today’s pour</div>
              <div className="text-xs text-mocha">Honey Oat Latte · $5.75</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            transition={{ delay: 1.4, rotate: { duration: 20, repeat: Infinity, ease: 'linear' } }}
            className="absolute -right-2 top-8 size-28 md:size-32"
          >
            <svg viewBox="0 0 100 100" className="size-full">
              <defs><path id="circle" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" /></defs>
              <circle cx="50" cy="50" r="48" fill="#3b2416" />
              <text fill="#f5ede1" fontSize="10.5" letterSpacing="2.5" fontFamily="DM Sans"><textPath href="#circle">FRESHLY ROASTED · FRESHLY POURED ·</textPath></text>
              <text x="50" y="57" textAnchor="middle" fontSize="20">☕</text>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </header>
  )
}

function Marquee() {
  const items = ['Espresso', 'Cold Brew', 'Pour Over', 'Fresh Pastries', 'Single Origin', 'Oat Milk', 'Latte Art', 'Roasted Daily']
  return (
    <div className="bg-espresso text-cream py-5 overflow-hidden -rotate-1 scale-105">
      <motion.div className="flex gap-10 whitespace-nowrap font-serif text-2xl md:text-3xl" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-10">{t}<span className="text-caramel">✦</span></span>
        ))}
      </motion.div>
    </div>
  )
}

function Story() {
  return (
    <section id="story" className="max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-16 items-center">
      <div className="relative h-[520px]">
        <motion.img {...fadeUp} src={img('1501339847302-ac426a4a7cbb')} alt="Café interior" className="absolute left-0 top-0 w-3/4 h-4/5 object-cover rounded-3xl shadow-xl" />
        <motion.img
          initial={{ opacity: 0, x: 60, rotate: 8 }}
          whileInView={{ opacity: 1, x: 0, rotate: 3 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          src={img('1447933601403-0c6688de566e', 600)}
          alt="Roasted coffee beans"
          className="absolute right-0 bottom-0 w-1/2 h-1/2 object-cover rounded-3xl border-8 border-cream shadow-xl"
        />
        <motion.div {...fadeUp} transition={{ delay: 0.5 }} className="absolute left-6 bottom-6 rounded-2xl bg-caramel text-cream px-6 py-4">
          <div className="font-serif text-4xl font-bold">10+</div>
          <div className="text-sm">years of brewing</div>
        </motion.div>
      </div>
      <motion.div {...fadeUp}>
        <p className="uppercase tracking-[0.3em] text-caramel text-sm mb-4">Our story</p>
        <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">From a tiny cart to your favorite corner café.</h2>
        <p className="mt-6 text-mocha text-lg">
          Bean &amp; Brew started in 2014 with a secondhand espresso machine and a simple belief: great coffee should feel personal. Today we roast every
          bean in-house, work directly with farmers across three continents, and still greet every regular by name.
        </p>
        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          {[
            ['🌱', 'Direct trade', 'Fair prices paid straight to farmers.'],
            ['🔥', 'Small-batch roast', 'Roasted weekly for peak freshness.'],
            ['🥐', 'Baked at dawn', 'Pastries made from scratch daily.'],
            ['♻️', 'Zero waste', 'Compostable cups and grounds recycling.'],
          ].map(([icon, t, d], i) => (
            <motion.div key={t} {...fadeUp} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }} className="rounded-2xl bg-latte/50 p-5">
              <div className="text-2xl">{icon}</div>
              <div className="font-bold mt-2">{t}</div>
              <div className="text-sm text-mocha">{d}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function Menu({ onAdd }: { onAdd: (name: string) => void }) {
  const tabs = Object.keys(menu)
  const [tab, setTab] = useState(tabs[0])
  return (
    <section id="menu" className="bg-latte/50 py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-caramel text-sm mb-4">The menu</p>
          <h2 className="font-serif text-4xl md:text-6xl font-bold">Find your perfect cup</h2>
        </motion.div>
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full bg-cream p-1.5 shadow-sm">
            {tabs.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`relative px-6 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${tab === t ? 'text-cream' : ''}`}>
                {tab === t && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-espresso" transition={{ type: 'spring', bounce: 0.25 }} />}
                <span className="relative">{t}</span>
              </button>
            ))}
          </div>
        </div>
        <motion.div layout className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {menu[tab].map((c, i) => (
              <motion.article
                key={c.name}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="group rounded-3xl bg-cream overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-espresso/15 transition-shadow"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={img(c.photo, 700)} alt={c.name} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  {c.tag && <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-xs font-bold text-mocha">{c.tag}</span>}
                  <Steam className="absolute left-1/2 -translate-x-1/2 top-4 w-20 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif text-2xl font-bold">{c.name}</h3>
                    <span className="font-serif text-xl text-caramel font-bold">${c.price.toFixed(2)}</span>
                  </div>
                  <p className="text-mocha mt-2 text-sm leading-relaxed">{c.desc}</p>
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={() => onAdd(c.name)}
                    className="mt-5 w-full rounded-full bg-espresso text-cream py-3 text-sm font-medium cursor-pointer hover:bg-mocha transition-colors"
                  >
                    Add to order +
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const line = useSpring(scrollYProgress, { stiffness: 80, damping: 20 })
  const steps = [
    ['01', 'Source', 'We visit farms and buy green beans at fair, direct-trade prices.'],
    ['02', 'Roast', 'Small batches roasted in our shop to bring out every origin’s notes.'],
    ['03', 'Grind', 'Ground fresh for each order — never ahead of time.'],
    ['04', 'Pour', 'Brewed and poured by baristas who obsess over every detail.'],
  ]
  return (
    <section id="process" className="py-28 max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeUp} className="flex flex-col items-center">
          <div className="relative rounded-[3rem] bg-latte/60 p-12">
            <Bean className="-left-4 top-10" />
            <Bean className="-right-3 bottom-20" delay={2} size="w-6" />
            <Pour />
          </div>
        </motion.div>
        <div ref={ref}>
          <motion.div {...fadeUp}>
            <p className="uppercase tracking-[0.3em] text-caramel text-sm mb-4">Bean to cup</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold">Poured with patience</h2>
          </motion.div>
          <div className="relative mt-10 pl-12">
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-latte" />
            <motion.div style={{ scaleY: line }} className="absolute left-4 top-2 bottom-2 w-0.5 bg-caramel origin-top" />
            {steps.map(([n, t, d], i) => (
              <motion.div key={n} {...fadeUp} transition={{ delay: i * 0.1 }} className="relative mb-10 last:mb-0">
                <span className="absolute -left-12 grid place-items-center size-8 rounded-full bg-espresso text-cream text-xs font-bold">{n}</span>
                <h3 className="font-serif text-2xl font-bold">{t}</h3>
                <p className="text-mocha mt-1">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Beans() {
  return (
    <section id="beans" className="bg-espresso text-cream py-28 relative overflow-hidden">
      <div className="absolute -left-32 bottom-0 size-96 rounded-full bg-mocha/40 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeUp}>
          <p className="uppercase tracking-[0.3em] text-caramel text-sm mb-4">Take it home</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold">Our beans, your kitchen.</h2>
          <p className="mt-6 text-latte text-lg max-w-lg">Every bag is roasted the week it ships. Pick a single origin or let us surprise you with a monthly subscription.</p>
          <div className="mt-10 space-y-4">
            {origins.map((o, i) => (
              <motion.div
                key={o.name}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ x: 10 }}
                className="flex items-center justify-between rounded-2xl border border-cream/15 p-5 hover:bg-cream/5 transition-colors"
              >
                <div>
                  <div className="font-serif text-xl font-bold">{o.name}</div>
                  <div className="text-sm text-latte/80">{o.notes}</div>
                </div>
                <span className="rounded-full bg-caramel px-3 py-1 text-xs font-bold">{o.roast}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.85, rotate: 6 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative">
          <img src={img('1559056199-641a0ac8b55e', 900)} alt="Bag of coffee beans" className="rounded-[3rem] w-full aspect-square object-cover" />
          <motion.div animate={{ rotate: [0, -4, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -bottom-6 -left-6 rounded-2xl bg-cream text-espresso p-5 shadow-2xl">
            <div className="text-xs uppercase tracking-widest text-mocha">Subscription</div>
            <div className="font-serif text-3xl font-bold">$18<span className="text-base font-normal">/mo</span></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Gallery() {
  return (
    <section className="py-28 max-w-7xl mx-auto px-6">
      <motion.div {...fadeUp} className="text-center mb-14">
        <p className="uppercase tracking-[0.3em] text-caramel text-sm mb-4">@beanandbrew</p>
        <h2 className="font-serif text-4xl md:text-5xl font-bold">Moments from the café</h2>
      </motion.div>
      <div className="columns-2 md:columns-4 gap-4 [&>*]:mb-4">
        {gallery.map((id, i) => (
          <motion.div key={id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.1 }} className="overflow-hidden rounded-2xl break-inside-avoid">
            <motion.img whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }} src={img(id, 500)} alt="" loading="lazy" className={`w-full object-cover ${i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Reviews() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % reviews.length), 5000)
    return () => clearInterval(t)
  }, [])
  const r = reviews[i]
  return (
    <section className="bg-latte/50 py-28">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="font-serif text-8xl text-caramel leading-none h-14">“</div>
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            <p className="font-serif text-2xl md:text-4xl leading-snug">{r.quote}</p>
            <div className="mt-8 font-bold">{r.name}</div>
            <div className="text-sm text-mocha">{r.role}</div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex justify-center gap-2">
          {reviews.map((_, n) => (
            <button key={n} onClick={() => setI(n)} aria-label={`Review ${n + 1}`} className={`h-2 rounded-full transition-all cursor-pointer ${n === i ? 'w-8 bg-espresso' : 'w-2 bg-mocha/30'}`} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Visit() {
  const [sent, setSent] = useState(false)
  return (
    <section id="visit" className="py-28 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
      <motion.div {...fadeUp} className="relative rounded-[3rem] overflow-hidden min-h-[420px]">
        <img src={img('1554118811-1e0d58224f24', 1000)} alt="Café seating" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 to-transparent" />
        <div className="absolute bottom-0 p-10 text-cream">
          <h2 className="font-serif text-4xl md:text-5xl font-bold">Come say hello.</h2>
          <p className="mt-3 text-latte">Free Wi-Fi · Pet friendly · Outdoor seating</p>
        </div>
      </motion.div>
      <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="flex flex-col justify-center gap-8">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-latte/50 p-7">
            <div className="text-sm uppercase tracking-widest text-caramel font-bold">Address</div>
            <p className="mt-3 font-serif text-xl">214 Maple Street<br />Portland, OR 97205</p>
          </div>
          <div className="rounded-3xl bg-latte/50 p-7">
            <div className="text-sm uppercase tracking-widest text-caramel font-bold">Hours</div>
            <p className="mt-3 text-mocha">Mon–Fri · 7am – 7pm<br />Sat–Sun · 8am – 6pm</p>
          </div>
        </div>
        <div className="rounded-3xl bg-espresso text-cream p-8">
          <h3 className="font-serif text-2xl font-bold">Join the coffee club</h3>
          <p className="text-latte mt-1 text-sm">New roasts, events and a free drink on your birthday.</p>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.p key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-5 text-caramel font-bold">
                ☕ You’re on the list — see you soon!
              </motion.p>
            ) : (
              <motion.form key="form" exit={{ opacity: 0 }} onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="mt-5 flex gap-2">
                <input required type="email" placeholder="you@email.com" className="flex-1 min-w-0 rounded-full bg-cream/10 px-5 py-3 outline-none placeholder:text-latte/60 focus:ring-2 ring-caramel" />
                <button className="rounded-full bg-caramel px-6 py-3 font-medium cursor-pointer hover:bg-latte hover:text-espresso transition-colors">Join</button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}

export default function App() {
  const [cart, setCart] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2000)
    return () => clearTimeout(t)
  }, [toast])

  return (
    <div className="overflow-x-clip">
      <motion.div style={{ scaleX: progress }} className="fixed top-0 inset-x-0 h-1 bg-caramel origin-left z-50" />
      <Nav cart={cart} />
      <Hero />
      <Marquee />
      <Story />
      <Menu onAdd={(n) => { setCart((c) => c + 1); setToast(n) }} />
      <Process />
      <Beans />
      <Gallery />
      <Reviews />
      <Visit />
      <footer className="bg-espresso text-latte">
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
          <div>
            <div className="font-serif text-3xl font-bold text-cream">Bean &amp; Brew</div>
            <p className="mt-3 text-sm">Small-batch coffee, roasted and poured with care since 2014.</p>
          </div>
          <div className="text-sm space-y-2">
            {['Story', 'Menu', 'Process', 'Beans', 'Visit'].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="block hover:text-caramel">{l}</a>
            ))}
          </div>
          <div className="text-sm">
            hello@beanandbrew.co<br />(503) 555-0142
          </div>
        </div>
        <div className="border-t border-cream/10 py-6 text-center text-xs">© 2026 Bean &amp; Brew. Practice project.</div>
      </footer>
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full bg-espresso text-cream px-6 py-3 shadow-2xl text-sm">
            ☕ {toast} added to your order
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
