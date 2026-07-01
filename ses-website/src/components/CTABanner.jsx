import { Link } from 'react-router-dom'
import { ArrowRight, Download, HardHat } from 'lucide-react'
import { triggerDownload } from '../utils/download'

/**
 * Navy CTA banner.
 *  - Pass `buttons` (array of {to,label,style,download}) for full control.
 *  - `accentBar` shows an orange left bar instead of the hardhat icon.
 *  - Falls back to primary/secondary for the simple two-button case.
 */
const STYLES = {
  orange: 'btn btn-orange',
  royal: 'btn btn-royal',
  navy: 'btn btn-navy',
  outline: 'btn btn-outline-light',
}

export default function CTABanner({
  title = 'Need a reliable engineering partner?',
  text = 'We deliver safe, efficient and compliant solutions that protect lives and assets.',
  primary = { to: '/contact', label: 'Request a Quotation' },
  secondary = { to: '/contact', label: 'Contact Our Team' },
  buttons = null,
  accentBar = false,
  variant = 'band', // band | section
}) {
  const Wrapper = variant === 'section' ? 'section' : 'div'

  const list =
    buttons ||
    [
      primary && { ...primary, style: 'orange' },
      secondary && { ...secondary, style: 'outline' },
    ].filter(Boolean)

  return (
    <Wrapper className={variant === 'section' ? 'section bg-white' : ''}>
      <div className={variant === 'section' ? 'container' : ''}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-navy-950 to-navy-800 px-6 py-8 md:px-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-orange/15 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex items-center gap-4">
              {accentBar ? (
                <span className="hidden h-12 w-1.5 shrink-0 rounded-full bg-brand-orange sm:block" />
              ) : (
                <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange sm:flex">
                  <HardHat className="h-7 w-7" />
                </span>
              )}
              <div>
                <h3 className="text-xl font-bold text-white md:text-2xl">{title}</h3>
                <p className="mt-1 max-w-xl text-sm text-white/70">{text}</p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              {list.map((b) =>
                b.download ? (
                  <button
                    key={b.label}
                    type="button"
                    onClick={() => triggerDownload(b.file || '#', b.label)}
                    className={STYLES[b.style] || STYLES.orange}
                  >
                    {b.label} <Download className="h-4 w-4" />
                  </button>
                ) : b.href ? (
                  <a key={b.label} href={b.href} className={STYLES[b.style] || STYLES.orange}>
                    {b.label} <ArrowRight className="h-4 w-4" />
                  </a>
                ) : (
                  <Link key={b.label} to={b.to} className={STYLES[b.style] || STYLES.orange}>
                    {b.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
