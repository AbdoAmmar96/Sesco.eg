import { Link } from 'react-router-dom'
import { company } from '../data/siteData'

/**
 * SES logo — real brand mark (from logo-ses-final.pdf) + wordmark.
 * `variant` controls the wordmark colors:
 *  - "dark"  → for light backgrounds (navy text, matches the brand logo)
 *  - "light" → for dark/navy backgrounds (white text)
 */
export default function Logo({ variant = 'dark', className = '' }) {
  const isLight = variant === 'light'
  // Wordmark colors match the real logo on light backgrounds (navy "SES"),
  // and invert to white on dark/navy backgrounds so it stays legible.
  const word = isLight ? 'text-white' : 'text-navy-900'
  const sub = isLight ? 'text-white/70' : 'text-brand-royal'

  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label={company.name}>
      {/* Real SES swirl mark */}
      <img src="/images/logo-mark.png" alt="" aria-hidden="true" className="h-12 w-12 shrink-0 object-contain" />
      {/* Wordmark */}
      <span className="flex flex-col leading-none">
        <span className={`text-[26px] font-extrabold tracking-tight ${word}`}>SES</span>
        <span className={`mt-1 text-[8px] font-bold uppercase tracking-[0.2em] ${sub}`}>
          Trading &amp; Industries
        </span>
      </span>
    </Link>
  )
}
