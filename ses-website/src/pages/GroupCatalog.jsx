import { Link, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import SmartImage from '../components/SmartImage'
import Reveal from '../components/Reveal'
import NotFound from './NotFound'
import { useContent } from '../context/ContentContext'
import { slugify } from '../lib/utils'

/**
 * Full catalogue view for a single product group (e.g. Water Network →
 * Ductile Iron Fittings). Reached from the group card's "View all" link, it
 * lays every item out as a product-card grid; each card opens that item's
 * detail page.
 */
export default function GroupCatalog() {
  const { slug, groupSlug } = useParams()
  const { productCategories, categoryDetails, loaded } = useContent()

  const category = productCategories.find((c) => c.slug === slug)
  const detail = (categoryDetails && categoryDetails[slug]) || { groups: [] }
  const group = (detail.groups || []).find((g) => slugify(g.title) === groupSlug)

  if (!category || !group) {
    if (!loaded) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center text-navy-400">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-brand-orange" />
        </div>
      )
    }
    return <NotFound />
  }

  const items = group.items || []

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: 'Products', to: '/products' },
          { label: category.name, to: `/products/${slug}` },
          { label: group.title },
        ]}
        title={group.title}
        subtitle={group.desc || category.name}
        buttons={
          <>
            <Link to={`/products/${slug}`} className="btn btn-outline-light">
              Back to {category.name}
            </Link>
            <Link to="/contact" className="btn btn-orange">
              Request a Quotation <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        }
      />

      <section className="section bg-surface">
        <div className="container">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {items.map((it, i) => (
              <Reveal key={it.name} delay={(i % 5) * 50}>
                <Link
                  to={`/products/${slug}/${slugify(it.name)}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-all hover:-translate-y-0.5 hover:border-brand-royal hover:shadow-card-hover"
                >
                  <div className="flex aspect-[4/5] items-center justify-center bg-white p-3">
                    <SmartImage
                      src={it.image || `/images/p-${slugify(it.name)}.jpg`}
                      icon={it.icon}
                      label={it.name}
                      tone="light"
                      className="h-full w-full"
                      imgClassName="object-contain"
                      rounded="rounded-none"
                    />
                  </div>
                  <div className="border-t border-line px-2 py-2.5 text-center">
                    <span className="text-xs font-semibold leading-tight text-navy-800 transition-colors group-hover:text-brand-orange">
                      {it.name}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
