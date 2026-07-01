/**
 * Section heading in the SES style:
 *  - align="center" → orange dash · Heading · orange dash (centered)
 *  - align="left"   → Heading · orange dash
 * Pass the heading text as `eyebrow` (kept for call-site compatibility).
 */
export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}) {
  const isCenter = align === 'center'
  const heading = title || eyebrow
  const headColor = light ? 'text-white' : 'text-navy-900'
  const Dash = () => <span className="h-px w-8 shrink-0 bg-brand-orange" />

  return (
    <div className={`${isCenter ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl text-left'} ${className}`}>
      <div className={`flex items-center gap-3 ${isCenter ? 'justify-center' : ''}`}>
        {isCenter && <Dash />}
        {heading && (
          <h2 className={`text-2xl font-extrabold tracking-tight md:text-[28px] ${headColor}`}>
            {heading}
          </h2>
        )}
        <Dash />
      </div>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed ${light ? 'text-white/70' : 'text-navy-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
