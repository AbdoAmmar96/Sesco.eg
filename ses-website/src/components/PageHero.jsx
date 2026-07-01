import { Link } from 'react-router-dom'
import { Home, ChevronRight } from 'lucide-react'
import Icon from './Icon'

/**
 * Inner page hero with a navy engineered background, breadcrumb and title.
 * Pass `bgImage` to use a real photo (e.g. "/images/hero-about.jpg"); a navy
 * gradient shows by default.
 */
export default function PageHero({
  title,
  subtitle,
  breadcrumb = [],
  buttons = null,
  highlights = null,
  bgImage,
  align = 'left',
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      {/* Background photo (optional) + overlay */}
      {bgImage && (
        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/95 to-navy-950/40" />
      {/* engineered grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* orange accent glow */}
      <div className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-orange/20 blur-3xl" />

      <div className={`container relative animate-fade-up py-16 md:py-24 ${align === 'center' ? 'text-center' : ''}`}>
        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <nav className={`mb-5 flex items-center gap-2 text-sm text-white/60 ${align === 'center' ? 'justify-center' : ''}`}>
            <Link to="/" className="flex items-center gap-1 hover:text-white">
              <Home className="h-4 w-4" />
            </Link>
            {breadcrumb.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight className="h-3.5 w-3.5" />
                {b.to ? (
                  <Link to={b.to} className="hover:text-white">{b.label}</Link>
                ) : (
                  <span className="text-white/90">{b.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <span className="mb-4 inline-block h-1 w-16 rounded bg-brand-orange" />
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className={`mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg ${align === 'center' ? 'mx-auto' : ''}`}>
            {subtitle}
          </p>
        )}

        {buttons && <div className={`mt-8 flex flex-wrap gap-3 ${align === 'center' ? 'justify-center' : ''}`}>{buttons}</div>}

        {highlights && (
          <div className={`mt-8 flex flex-wrap gap-x-8 gap-y-4 ${align === 'center' ? 'justify-center' : ''}`}>
            {highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 text-sm font-medium text-white/80">
                <Icon name="check" className="h-5 w-5 text-brand-orange" />
                {h}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
