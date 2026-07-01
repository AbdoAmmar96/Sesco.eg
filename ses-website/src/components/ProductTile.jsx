import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SmartImage from './SmartImage'

/**
 * Small product tile used inside category grids and featured carousels.
 * `size="sm"` for dense subcategory grids, `size="md"` for featured cards.
 * For md tiles, pass `to` + `ctaLabel` to show a "View Details →" link.
 */
export default function ProductTile({ name, spec, icon = 'box', src, size = 'sm', to, ctaLabel }) {
  if (size === 'md') {
    return (
      <div
        className="card card-hover group flex h-full min-h-[248px] w-[190px] shrink-0 flex-col p-3 text-center"
        style={{ scrollSnapAlign: 'start' }}
      >
        <SmartImage
          src={src}
          icon={icon}
          label={name}
          tone="light"
          className="aspect-square w-full"
          rounded="rounded-lg"
        />
        <div className="mt-3 flex flex-1 flex-col px-1">
          <p className="text-sm font-bold leading-snug text-navy-900">{name}</p>
          {spec && <p className="mt-1 text-xs leading-snug text-navy-400">{spec}</p>}
          {to && (
            <Link
              to={to}
              className="mt-2 inline-flex items-center justify-center gap-1 text-xs font-semibold text-brand-orange transition-all hover:gap-2"
            >
              {ctaLabel || 'View Details'} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="group flex h-full flex-col items-center rounded-lg border border-line bg-white p-2.5 text-center transition-all hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-card">
      <SmartImage
        src={src}
        icon={icon}
        label=""
        tone="light"
        className="aspect-square w-full"
        rounded="rounded-md"
      />
      <p className="mt-2 text-[11px] font-semibold leading-tight text-navy-700">{name}</p>
    </div>
  )
}
