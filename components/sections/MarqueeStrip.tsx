const ITEMS = [
  'AI defect detection',
  'Millimetre measurement',
  'Four-Point scoring',
  'Automatic reports',
  'Encoder-locked capture',
  'Retrofit installation',
]

export const MarqueeStrip = () => (
  <div className="marquee relative overflow-hidden border-y border-line bg-panel/60 py-5 backdrop-blur-sm">
    <div className="marquee-track flex w-max items-center gap-10">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center gap-10" aria-hidden={copy === 1}>
          {ITEMS.map((item) => (
            <span key={item} className="flex items-center gap-10">
              <span className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-ink-muted">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      ))}
    </div>

    {/* Edge fades */}
    <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-canvas to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-canvas to-transparent" />
  </div>
)
