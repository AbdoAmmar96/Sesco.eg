import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Phone, MessageCircle, Info, CheckCircle2 } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import SmartImage from '../components/SmartImage'
import ProductTile from '../components/ProductTile'
import Reveal from '../components/Reveal'
import { IconBadge } from '../components/Icon'
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
  const { productCategories, categoryDetails, featuredSolutions, company, loaded } = useContent()

  // Two entry points share this page: category products (/products/:slug/:product)
  // and home "Featured Solutions" (/featured/:product), which have no category.
  const isFeatured = !slug

  let category = null
  let detail = { groups: [], featured: [] }
  let product = null
  let group = null

  if (isFeatured) {
    product = (featuredSolutions || []).find((f) => slugify(f.name) === productSlug) || null
  } else {
    category = productCategories.find((c) => c.slug === slug)
    detail = (categoryDetails && categoryDetails[slug]) || detail
    const found = category ? findProduct(detail, productSlug) : null
    if (found) {
      product = found.product
      group = found.group
    }
  }

  const missing = isFeatured ? !product : !category || !product
  if (missing) {
    if (!loaded) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center text-navy-400">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-brand-orange" />
        </div>
      )
    }
    return <NotFound />
  }

  const categoryName = category?.name || 'Featured Solutions'
  const categoryTo = category ? `/products/${slug}` : '/products'
  const fallbackImage = `/images/p-${slugify(product.name)}.jpg`

  // Datasheet fields exist only on featured products; group items won't have them.
  const highlights = product.highlights || []
  const techFeatures = product.techFeatures || []
  const dimensions = product.dimensions || null
  const materials = product.materials || []
  // Labelled technical drawings ([{image, caption}]). Falls back to the single
  // diagramImage so older records still render.
  const diagrams = (
    product.diagrams?.length
      ? product.diagrams
      : product.diagramImage
        ? [{ image: product.diagramImage, caption: product.diagramCaption }]
        : []
  ).filter((d) => d && d.image)
  const overview = product.overview || (product.spec && !contactMarker(product.spec) ? product.spec : '')
  const contactOnly = contactMarker(product.spec)

  // A few sibling products from the same category, for cross-navigation.
  const siblings = [
    ...(detail.featured || []).map((f) => ({ name: f.name, icon: f.icon, image: f.image })),
    ...(detail.groups || []).flatMap((g) =>
      (g.items || []).map((it) => ({ name: it.name, icon: it.icon, image: it.image })),
    ),
  ]
    .filter((p) => slugify(p.name) !== productSlug)
    .filter((p, i, arr) => arr.findIndex((x) => slugify(x.name) === slugify(p.name)) === i)
    .slice(0, 6)

  const quoteHref = `/contact?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(categoryName)}`

  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Products', to: '/products' }, { label: categoryName, to: categoryTo }, { label: product.name }]}
        title={product.name}
        subtitle={group ? `${categoryName} · ${group.title}` : categoryName}
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

      {/* Overview: gallery + details */}
      <section className="section bg-surface">
        <div className="container grid gap-10 lg:grid-cols-2">
          <Reveal>
            <Gallery
              images={[product.image, ...(product.gallery || [])]}
              fallback={fallbackImage}
              icon={product.icon}
              name={product.name}
            />
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <IconBadge name={product.icon || 'box'} size="lg" />
                <div>
                  <h2 className="text-2xl font-extrabold text-navy-900">{product.name}</h2>
                  <Link to={categoryTo} className="text-sm font-semibold text-brand-royal hover:underline">
                    {categoryName}
                  </Link>
                </div>
              </div>

              {overview && <p className="mt-6 text-base leading-relaxed text-navy-600">{overview}</p>}

              {highlights.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {highlights.map((h) => (
                    <span
                      key={h}
                      className="inline-flex items-center gap-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/5 px-3 py-1.5 text-xs font-semibold text-navy-800"
                    >
                      <CheckCircle2 className="h-4 w-4 text-brand-orange" /> {h}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-brand-orange/30 bg-brand-orange/5 p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                <p className="text-sm leading-relaxed text-navy-700">
                  {contactOnly
                    ? 'للحصول على هذا المنتج والمواصفات الفنية الكاملة، الرجاء التواصل مع فريق المبيعات.'
                    : 'Technical datasheets and full specifications are available on request. Contact our team for pricing and availability.'}
                </p>
              </div>

              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                  <span className="text-sm leading-relaxed text-navy-700">
                    Category: <span className="font-semibold">{categoryName}</span>
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

      {/* Technical Features */}
      {techFeatures.length > 0 && (
        <section className="section bg-white">
          <div className="container max-w-4xl">
            <Reveal>
              <SectionTitle align="left" eyebrow="Technical Features" />
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-8 overflow-hidden rounded-2xl border border-line">
                <table className="w-full text-sm">
                  <tbody>
                    {techFeatures.map((f, i) => (
                      <tr key={f.label + i} className={i % 2 ? 'bg-surface' : 'bg-white'}>
                        <th className="w-1/3 border-b border-line px-4 py-3 text-left align-top font-semibold text-navy-800">
                          {f.label}
                        </th>
                        <td className="border-b border-line px-4 py-3 align-top text-navy-600">{f.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Technical drawings — structure / cross-section & dimensions */}
      {diagrams.length > 0 && (
        <section className="section bg-surface">
          <div className="container max-w-5xl">
            <Reveal>
              <SectionTitle align="left" eyebrow="Technical Drawings" />
            </Reveal>
            <div className={`mt-8 grid gap-6 ${diagrams.length > 1 ? 'md:grid-cols-2' : 'max-w-3xl mx-auto'}`}>
              {diagrams.map((d, i) => (
                <Reveal key={(d.image || '') + i} delay={(i % 2) * 80}>
                  <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white">
                    <div className="flex flex-1 items-center justify-center p-4">
                      <img
                        src={d.image}
                        alt={d.caption || `${product.name} drawing ${i + 1}`}
                        loading="lazy"
                        className="max-h-[460px] w-full object-contain"
                      />
                    </div>
                    {d.caption && (
                      <figcaption className="border-t border-line bg-navy-50 py-3 text-center text-sm font-semibold text-navy-700">
                        {d.caption}
                      </figcaption>
                    )}
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dimensions */}
      {dimensions?.columns?.length > 0 && dimensions.rows?.length > 0 && (
        <section className="section bg-white">
          <div className="container max-w-4xl">
            <Reveal>
              <SectionTitle align="left" eyebrow="Dimensions" />
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
                <table className="w-full min-w-[520px] text-sm">
                  <thead>
                    <tr className="bg-navy-900 text-white">
                      {dimensions.columns.map((c, i) => (
                        <th key={i} className="px-4 py-3 text-left font-semibold">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dimensions.rows.map((row, ri) => (
                      <tr key={ri} className={ri % 2 ? 'bg-surface' : 'bg-white'}>
                        {dimensions.columns.map((_, ci) => (
                          <td key={ci} className="border-b border-line px-4 py-2.5 text-navy-700">
                            {row[ci] ?? ''}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Materials & Standard List */}
      {materials.length > 0 && (
        <section className="section bg-surface">
          <div className="container max-w-4xl">
            <Reveal>
              <SectionTitle align="left" eyebrow="Materials & Standard List" />
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
                <table className="w-full min-w-[600px] text-sm">
                  <thead>
                    <tr className="bg-navy-900 text-white">
                      <th className="px-4 py-3 text-left font-semibold">No.</th>
                      <th className="px-4 py-3 text-left font-semibold">Name</th>
                      <th className="px-4 py-3 text-left font-semibold">Material</th>
                      <th className="px-4 py-3 text-left font-semibold">Standard</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map((m, i) => (
                      <tr key={i} className={i % 2 ? 'bg-surface' : 'bg-white'}>
                        <td className="border-b border-line px-4 py-2.5 font-semibold text-navy-800">{m.no}</td>
                        <td className="border-b border-line px-4 py-2.5 text-navy-700">{m.name}</td>
                        <td className="border-b border-line px-4 py-2.5 text-navy-700">{m.material}</td>
                        <td className="border-b border-line px-4 py-2.5 text-navy-700">{m.standard}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Related products from the same category */}
      {siblings.length > 0 && (
        <section className="section bg-white">
          <div className="container">
            <Reveal>
              <SectionTitle eyebrow={`More from ${categoryName}`} />
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

/** Products extracted from the catalogue with no datasheet carry this note in `spec`. */
function contactMarker(spec) {
  return typeof spec === 'string' && spec.includes('المورد')
}

/**
 * Main product image with an optional thumbnail strip. Falsy/duplicate sources
 * are dropped; when nothing loads, SmartImage shows the branded placeholder.
 */
function Gallery({ images, fallback, icon, name }) {
  const sources = images.filter((s, i, arr) => s && arr.indexOf(s) === i)
  const list = sources.length ? sources : [fallback]
  const [active, setActive] = useState(0)
  const current = list[Math.min(active, list.length - 1)]

  return (
    <div>
      <SmartImage
        src={current}
        icon={icon}
        label={name}
        tone="light"
        className="aspect-square w-full bg-white"
        imgClassName="object-contain p-4"
        rounded="rounded-2xl"
      />
      {list.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {list.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={`h-16 w-16 overflow-hidden rounded-lg border-2 bg-white transition-colors ${
                i === active ? 'border-brand-orange' : 'border-line hover:border-navy-200'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
