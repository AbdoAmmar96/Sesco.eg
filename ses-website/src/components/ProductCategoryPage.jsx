import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Download, FileText, ShieldCheck, Headphones, Truck, MessageCircle, Search } from 'lucide-react'
import { triggerDownload } from '../utils/download'
import PageHero from './PageHero'
import SectionTitle from './SectionTitle'
import ProductTile from './ProductTile'
import Carousel from './Carousel'
import Reveal from './Reveal'
import { slugify } from '../lib/utils'

// Real product catalogs (PDF) served from /public/catalogs, keyed by category
// slug. A slug without an entry falls back to the placeholder download.
const CATALOGS = {
  'fire-fighting': '/catalogs/fire-fighting-catalogue.pdf',
  'water-network': '/catalogs/water-network-catalogue.pdf',
}

function matchesFilter(group, filter) {
  if (/^all/i.test(filter)) return true
  const term = filter.toLowerCase().replace(/s$/, '')
  if (group.title.toLowerCase().includes(term)) return true
  return group.items.some((it) => it.name.toLowerCase().replace(/s$/, '').includes(term))
}

export default function ProductCategoryPage({ category, data, slug }) {
  const [active, setActive] = useState(data.filters[0])
  const [query, setQuery] = useState('')

  // Real PDF for this category (if any), used by the Download Catalog buttons.
  const catalogUrl = CATALOGS[slug] || '#'
  const catalogName = `SES ${category.name} Catalog.pdf`

  const visibleGroups = useMemo(() => {
    let groups = data.groups.filter((g) => matchesFilter(g, active))
    if (!groups.length) groups = data.groups
    const q = query.trim().toLowerCase()
    if (q) {
      groups = groups
        .map((g) => ({ ...g, items: g.items.filter((it) => it.name.toLowerCase().includes(q)) }))
        .filter((g) => g.items.length || g.title.toLowerCase().includes(q))
    }
    return groups
  }, [active, query, data.groups])

  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Products', to: '/products' }, { label: category.name }]}
        title={category.name}
        subtitle={category.intro}
        bgImage={category.heroImage || `/images/hero-${slug}.jpg`}
        highlights={data.highlights}
        buttons={
          <>
            <Link to="/products" className="btn btn-outline-light">
              View All Products
            </Link>
            <Link to="/contact" className="btn btn-orange">
              Request a Quotation <ArrowRight className="h-4 w-4" />
            </Link>
            <button type="button" onClick={() => triggerDownload(catalogUrl, catalogName)} className="btn btn-navy">
              Download Catalog <Download className="h-4 w-4" />
            </button>
          </>
        }
      />

      {/* Filters */}
      <div className="sticky top-[72px] z-30 border-b border-line bg-white/95 backdrop-blur">
        <div className="container flex items-center gap-3 py-4">
          <div className="flex flex-1 gap-2 overflow-x-auto no-scrollbar">
            {data.filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active === f
                    ? 'bg-brand-royal text-white'
                    : 'border border-line bg-white text-navy-600 hover:border-navy-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative hidden w-56 shrink-0 lg:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-line bg-white py-2 pl-9 pr-3 text-sm text-navy-800 outline-none focus:border-brand-royal"
            />
          </div>
        </div>
      </div>

      {/* Groups */}
      <section className="section bg-surface">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {visibleGroups.map((g, idx) => (
              <Reveal key={g.title} delay={(idx % 3) * 80} className="h-full">
                <div className="card card-hover flex h-full flex-col p-5">
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-orange text-sm font-bold text-white">
                      {g.n}
                    </span>
                    <h3 className="pt-1 text-base font-bold leading-tight text-navy-900">{g.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{g.desc}</p>

                  <div className="mt-4 grid grid-cols-3 gap-2.5">
                    {g.items.map((it) => (
                      <ProductTile
                        key={it.name}
                        name={it.name}
                        icon={it.icon}
                        src={it.image || `/images/p-${slugify(it.name)}.jpg`}
                        to={`/products/${slug}/${slugify(it.name)}`}
                      />
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-orange transition-all hover:gap-2.5"
                  >
                    {g.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section bg-white">
        <div className="container">
          <SectionTitle eyebrow={`Featured ${category.name.replace(' Products', '').replace(' Systems', '')} Products`} />
          <div className="mt-10">
            <Carousel ariaLabel="featured products">
              {data.featured.map((f) => (
                <ProductTile
                  key={f.name}
                  name={f.name}
                  spec={f.spec}
                  icon={f.icon}
                  size="md"
                  to={`/products/${slug}/${slugify(f.name)}`}
                  ctaLabel="View Details"
                  src={f.image || `/images/p-${slugify(f.name)}.jpg`}
                />
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* Catalog strip — slim bar (matches design) */}
      <section className="bg-surface before-footer pt-2">
        <div className="container">
          <div className="flex flex-col gap-5 rounded-xl border border-line bg-white px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <CatalogItem
                title={`${category.name} Catalog`}
                desc="Complete product catalog with technical specs."
                link="Download Catalog (PDF)"
                href={catalogUrl}
                file={catalogName}
              />
              <CatalogItem
                title="Technical Data Sheets"
                desc="Datasheets for all major products."
                link="Download Data Sheets"
                file={`${category.name} Data Sheets`}
              />
            </div>
            <div className="flex shrink-0 flex-wrap gap-2.5">
              <Link to="/contact" className="btn btn-orange">
                Request a Quotation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn btn-navy">
                Contact Technical Team <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          {/* trust row */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            <Trust icon={<ShieldCheck className="h-4 w-4" />} label="Certified Products" />
            <Trust icon={<Headphones className="h-4 w-4" />} label="Technical Support" />
            <Trust icon={<Truck className="h-4 w-4" />} label="Fast Delivery" />
          </div>
        </div>
      </section>

      {/* Floating help button → opens WhatsApp chat */}
      <a
        href="https://wa.me/201003029064?text=Hi%20SES%2C%20I%27d%20like%20help%20choosing%20a%20product."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-navy-900 py-3 pl-3 pr-4 text-sm font-semibold text-white shadow-card-hover transition-all hover:-translate-y-0.5 hover:bg-brand-royal"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange">
          <MessageCircle className="h-4 w-4" />
        </span>
        <span className="hidden sm:inline">Need Help? Chat with Us</span>
      </a>
    </>
  )
}

function CatalogItem({ title, desc, link, file, href = '#' }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
        <FileText className="h-5 w-5" />
      </span>
      <div>
        <h4 className="text-sm font-bold text-navy-900">{title}</h4>
        <p className="mt-0.5 text-xs text-navy-500">{desc}</p>
        <button
          type="button"
          onClick={() => triggerDownload(href, file || title)}
          className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-royal transition-all hover:gap-2.5"
        >
          {link} <Download className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

function Trust({ icon, label }) {
  return (
    <div className="flex items-center gap-2 text-navy-600">
      <span className="text-brand-royal">{icon}</span>
      <span className="text-xs font-semibold">{label}</span>
    </div>
  )
}
