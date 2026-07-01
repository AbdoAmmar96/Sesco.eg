import Icon, { IconBadge } from './Icon'

/**
 * Stats row. variant:
 *  - "inline" → compact light stats (About "Who We Are")
 *  - "band"   → dark navy band with big numbers (Projects page)
 */
export default function Stats({ items, variant = 'inline' }) {
  if (variant === 'band') {
    return (
      <div className="overflow-hidden rounded-xl bg-gradient-to-r from-navy-900 to-navy-800">
        <div className="grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {items.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 px-4 py-8 text-center">
              <span className="mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <span className="text-3xl font-extrabold text-white md:text-4xl">{s.value}</span>
              <span className="text-xs font-medium uppercase tracking-wide text-white/60">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((s) => (
        <div key={s.label} className="card card-hover group flex h-full items-center gap-4 p-4">
          <IconBadge name={s.icon} size="md" className="transition-transform duration-300 group-hover:scale-110" />
          <div className="leading-tight">
            <div className="text-2xl font-extrabold text-navy-800">{s.value}</div>
            <div className="text-xs font-medium leading-snug text-navy-500">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
