import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Phone, MessageCircle, Info, CheckCircle2 } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import SmartImage from '../components/SmartImage'
import ProductTile from '../components/ProductTile'
import Reveal from '../components/Reveal'
import Icon, { IconBadge } from '../components/Icon'
import NotFound from './NotFound'
import { useContent } from '../context/ContentContext'
import { slugify } from '../lib/utils'

/**
 * Finds a single product inside a category's live content tree. A product can
 * be a featured product (has spec + image) or a plain group item (name + icon).
 * Returns the product plus the group it belongs to, or null if not found.
 */
function findProduct(detail, productSlug) {
  for (const f of detail.featured || []) {
    if (slugify(f.name) === productSlug) return { product: f, group: null }
  }
  for (const g of detail.groups || []) {
    for (const it of g.items || []) {
      if (slugify(it.name) === productSlug) return { product: it, group: g }
    }
  }
  return null
}

export default function ProductDetail() {
  const { slug, product: productSlug } = useParams()
  const { productCategories, categoryDetails, company, loaded } = useContent()

  const category = productCategories.find((c) => c.slug === slug)
  const detail = (categoryDetails && categoryDetails[slug]) || { groups: [], featured: [] }
  const found = category ? findProduct(detail, productSlug) : null

  if (!category || !found) {
    if (!loaded) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center text-navy-400">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-brand-orange" />
        </div>
      )
    }
    return <NotFound />
  }

  const { product, group } = found
  const image = product.image || `/images/p-${slugify(product.name)}.jpg`
  // Products extracted from the catalogue with no datasheet carry this note in
  // `spec`; treat it as the "contact supplier" state rather than a real spec.
  const contactOnly = typeof product.spec === 'string' && product.spec.includes('المورد')
  const hasSpec = product.spec && !contactOnly

  // A few sibling products from the same category, for cross-navigation.
  const siblings = [
    ...detail.featured.map((f) => ({ name: f.name, icon: f.icon, image: f.image })),
    ...detail.groups.flatMap((g) =>
      (g.items || []).map((it) => ({ name: it.name, icon: it.icon, image: it.image })),
    ),
  ]
    .filter((p) => slugify(p.name) !== productSlug)
    .filter((p, i, arr) => arr.findIndex((x) => slugify(x.name) === slugify(p.name)) === i)
    .slice(0, 6)

  const quoteHref = `/contact?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(category.name)}`

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: 'Products', to: '/products' },
          { label: category.name, to: `/products/${slug}` },
          { label: product.name },
        ]}
        title={product.name}
        subtitle={group ? `${category.name} · ${group.title}` : category.name}
        buttons={
          <>
            <Link to={quoteHref} className="btn btn-orange">
              Request a Quotation <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={company.phoneHref || `tel:${company.phone}`} className="btn btn-outline-light">
              Call Technical Team <Phone className="h-4 w-4" />
            </a>
          </>
        }
      />

      {/* Overview: image + details */}
      <section className="section bg-surface">
        <div className="container grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <Reveal>
            <SmartImage
              src={image}
              icon={product.icon}
              label={product.name}
              tone="light"
              className="aspect-square w-full"
              rounded="rounded-2xl"
            />
          </Reveal>

          {/* Details */}
          <Reveal delay={120}>
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <IconBadge name={product.icon || 'box'} size="lg" />
                <div>
                  <h2 className="text-2xl font-extrabold text-navy-900">{product.name}</h2>
                  <Link to={`/products/${slug}`} className="text-sm font-semibold text-brand-royal hover:underline">
                    {category.name}
                  </Link>
                </div>
              </div>

              {hasSpec && <p className="mt-6 text-base leading-relaxed text-navy-600">{product.spec}</p>}

              {/* Availability / contact-supplier note */}
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-brand-orange/30 bg-brand-orange/5 p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                <p className="text-sm leading-relaxed text-navy-700">
                  {contactOnly
                    ? 'للحصول على هذا المنتج والمواصفات الفنية الكاملة، الرجاء التواصل مع فريق المبيعات.'
                    : 'Technical datasheets and full specifications are available on request. Contact our team for pricing and availability.'}
                </p>
              </div>

              {/* Quick facts */}
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                  <span className="text-sm leading-relaxed text-navy-700">
                    Category: <span className="font-semibold">{category.name}</span>
                  </span>
                </li>
                {group && (
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                    <span className="text-sm leading-relaxed text-navy-700">
                      Range: <span className="font-semibold">{group.title}</span>
                    </span>
                  </li>
                )}
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                  <span className="text-sm leading-relaxed text-navy-700">Supplied &amp; supported by SES Trading &amp; Industries.</span>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-2.5">
                <Link to={quoteHref} className="btn btn-orange">
                  Request a Quotation <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`https://wa.me/201003029064?text=${encodeURIComponent(`Hi SES, I'd like details about: ${product.name}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-navy"
                >
                  Ask on WhatsApp <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related products from the same category */}
      {siblings.length > 0 && (
        <section className="section bg-white">
          <div className="container">
            <Reveal>
              <SectionTitle eyebrow={`More from ${category.name}`} />
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {siblings.map((p, i) => (
                <Reveal key={p.name} delay={(i % 6) * 60} className="h-full">
                  <ProductTile
                    name={p.name}
                    icon={p.icon}
                    src={p.image || `/images/p-${slugify(p.name)}.jpg`}
                    to={`/products/${slug}/${slugify(p.name)}`}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
