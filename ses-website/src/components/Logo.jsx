import { Link } from 'react-router-dom'
import { company } from '../data/siteData'

/**
 * SES logo (interlocking swirl mark + wordmark). `variant` controls colors:
 *  - "dark"  → for light backgrounds (navy text)
 *  - "light" → for dark/navy backgrounds (white text)
 *
 * To use the real logo image instead, replace the <svg> mark with:
 *   <img src="/images/logo.png" alt="SES" className="h-11 w-auto" />
 */
export default function Logo({ variant = 'dark', className = '' }) {
  const isLight = variant === 'light'
  // "SES" is always the brand orange (works on both light + navy backgrounds);
  // the "Trading & Industries" sub-line adapts to the background.
  const word = 'text-brand-orange'
  const sub = isLight ? 'text-white/70' : 'text-brand-royal'

  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label={company.name}>
      {/* Interlocking SES swirl mark */}
      <svg viewBox="0 0 64 64" className="h-12 w-12 shrink-0" aria-hidden="true">
        {/* blue interlocking arcs */}
        <path
          d="M48 17c-6-5-15-6-22-2 7-1 14 1 17 6 4 6 1 12-4 15 9-2 15-12 9-19z"
          fill="#2155CC"
        />
        <path
          d="M16 47c6 5 15 6 22 2-7 1-14-1-17-6-4-6-1-12 4-15-9 2-15 12-9 19z"
          fill="#13294B"
        />
        {/* orange S-bolt center */}
        <path
          d="M38 20c-5-1-11 0-14 4-2 3-1 6 2 8l8 4c2 1 3 3 1 5-2 2-6 2-9 1 4 4 11 5 16 1 3-3 3-7-1-10l-8-4c-2-1-2-3 0-4 2-2 5-2 8-1l-3-4z"
          fill="#F47A20"
        />
      </svg>
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
