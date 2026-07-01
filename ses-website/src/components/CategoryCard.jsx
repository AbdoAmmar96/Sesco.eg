import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SmartImage from './SmartImage'
import Icon, { iconColor, iconBg } from './Icon'

/**
 * The three big product category cards shown on Home & Products pages.
 * Icon accent color is derived per category to match the design
 * (fire fighting = red, fire alarm = orange, water network = blue).
 */
const ACCENT = {
  'fire-fighting': 'text-red-600',
  'fire-alarm': 'text-brand-orange',
  'water-network': 'text-brand-royal',
}

export default function CategoryCard({ category, cta = 'View Solutions' }) {
  const accent = ACCENT[category.slug] || 'text-brand-orange'
  // Prefer an admin-uploaded image (absolute backend URL) over the bundled
  // slug thumbnail. Seeded categories keep their curated /images/cat-*.jpg;
  // a CMS-created category shows the image the admin uploaded.
  const cardSrc =
    category.cardImage ||
    (category.heroImage && !category.heroImage.startsWith('/images/')
      ? category.heroImage
      : `/images/cat-${category.slug}.jpg`)
  return (
    <div className="card card-hover flex h-full flex-col overflow-hidden">
      <SmartImage
        src={cardSrc}
        icon={category.icon}
        label={category.name}
        className="h-48 w-full"
        rounded="rounded-none"
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg(category.icon)}`}>
            <Icon name={category.icon} className={`h-6 w-6 ${accent}`} />
          </span>
          <h3 className="text-xl font-bold text-navy-900">{category.name}</h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-navy-500">{category.short}</p>

        {/* item icon tiles — pushed to the bottom so all cards align */}
        <div className="mt-auto grid grid-cols-5 gap-2 pt-5">
          {category.items.map((it) => (
            <div
              key={it.name}
              className="flex flex-col items-center gap-1.5 rounded-lg border border-line bg-white px-1 py-2.5 text-center transition-all hover:-translate-y-0.5 hover:border-brand-royal/40 hover:shadow-card"
              title={it.name}
            >
              <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconBg(it.icon)}`}>
                <Icon name={it.icon} className={`h-5 w-5 ${iconColor(it.icon)}`} />
              </span>
              <span className="text-[8px] font-semibold uppercase leading-tight tracking-wide text-navy-600">
                {it.name}
              </span>
            </div>
          ))}
        </div>

        <Link
          to={`/products/${category.slug}`}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg border border-brand-orange px-4 py-2.5 text-sm font-bold text-brand-orange transition-colors hover:bg-brand-orange hover:text-white"
        >
          {cta} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
