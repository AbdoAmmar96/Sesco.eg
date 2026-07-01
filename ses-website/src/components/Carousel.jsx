import { Children, cloneElement, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Horizontal carousel.
 *  - default: snap-scroll with arrow controls.
 *  - auto:    continuous marquee that pauses on hover (brands / featured).
 */
export default function Carousel({ children, ariaLabel = 'carousel', auto = false, speed = 38 }) {
  const trackRef = useRef(null)

  if (auto) {
    const items = Children.toArray(children)
    const row = (prefix) => items.map((c, i) => cloneElement(c, { key: prefix + i }))
    return (
      <div className="group relative overflow-hidden" aria-label={ariaLabel}>
        <div
          className="flex w-max items-stretch gap-4 py-1 animate-marquee group-hover:[animation-play-state:paused]"
          style={{ animationDuration: `${speed}s` }}
        >
          {row('a')}
          {row('b')}
        </div>
      </div>
    )
  }

  const scrollBy = (dir) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <button
        onClick={() => scrollBy(-1)}
        aria-label="Previous"
        className="absolute -left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-navy-700 shadow-card transition-colors hover:border-brand-orange hover:text-brand-orange md:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div
        ref={trackRef}
        aria-label={ariaLabel}
        className="no-scrollbar flex items-stretch gap-4 overflow-x-auto scroll-smooth px-1 py-1"
        style={{ scrollSnapType: 'x proximity' }}
      >
        {children}
      </div>

      <button
        onClick={() => scrollBy(1)}
        aria-label="Next"
        className="absolute -right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-navy-700 shadow-card transition-colors hover:border-brand-orange hover:text-brand-orange md:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
