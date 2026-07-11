import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Download, HardHat, Search, X } from 'lucide-react'
import PageHero from '../components/PageHero'
import CategoryCard from '../components/CategoryCard'
import ProductTile from '../components/ProductTile'
import Reveal from '../components/Reveal'
import { triggerDownload } from '../utils/download'
import { useContent } from '../context/ContentContext'
import { slugify } from '../lib/utils'

export default function Products() {
  const { productCategories, categoryDetails, pages } = useContent()
  const hero = pages?.products || {}
  const [activeCat, setActiveCat] = useState('all')
  const [query, setQuery] = useState('')

  // Flatten the whole catalogue into one searchable product list. A product is
  // either a group item or a featured product; dedupe per category by slug so a
  // featured product that mirrors a group item isn't listed twice.
  const allProducts = useMemo(() => {
    const out = []
    for (const cat of productCategories) {
      const det = (categoryDetails && categoryDetails[cat.slug]) || { groups: [], featured: [] }
      const seen = new Set()
      const push = (name, icon, image, group) => {
        const s = slugify(name)
        if (!s || seen.has(s)) return
        seen.add(s)
        out.push({ name, icon, image, group, category: cat.name, categorySlug: cat.slug })
      }
      for (const g of det.groups || []) for (const it of g.items || []) push(it.name, it.icon, null, g.title)
      for (const f of det.featured || []) push(f.name, f.icon, f.image, null)
    }
    return out
  }, [productCategories, categoryDetails])

  const q = query.trim().toLowerCase()
  const results = useMemo(
    () =>
      allProducts.filter((p) => {
        if (activeCat !== 'all' && p.categorySlug !== activeCat) return false
        if (!q) return true
        return (
          p.name.toLowerCase().includes(q) ||
          (p.group || '').toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        )
      }),
    [allProducts, activeCat, q]
  )

  const filtering = activeCat !== 'all' || q.length > 0
  const chips = [{ slug: 'all', name: 'All Products' }, ...productCategories.map((c) => ({ slug: c.slug, name: c.name }))]

  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Products' }]}
        title={hero.title || 'Products & Engineering Solutions'}
        subtitle={
          hero.subtitle ||
          'Browse SES products across Fire Fighting, Fire Alarm and Water Network — search by name or filter by category to find exactly what your project needs.'
        }
        bgImage="/images/hero-products.jpg"
        buttons={
          <>
            <Link to="/contact" className="btn btn-orange">
              Request a Quotation <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => triggerDownload('#', 'SES Product Catalog')}
              className="btn btn-outline-light"
            >
              Download Product Catalog <Download className="h-4 w-4" />
            </button>
          </>
        }
      />

      {/* Search + category filters */}
      <div className="sticky top-[72px] z-30 border-b border-line bg-white/95 backdrop-blur">
        <div className="container flex flex-col gap-3 py-4 lg:flex-row lg:items-center">
          <div className="flex flex-1 gap-2 overflow-x-auto no-scrollbar">
            {chips.map((c) => (
              <button
                key={c.slug}
                onClick={() => setActiveCat(c.slug)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  activeCat === c.slug
                    ? 'bg-brand-royal text-white'
                    : 'border border-line bg-white text-navy-600 hover:border-navy-300'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
          <div className="relative w-full shrink-0 lg:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-full border border-line bg-white py-2.5 pl-9 pr-9 text-sm text-navy-800 outline-none focus:border-brand-royal"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <section className="section bg-surface">
        <div className="container">
          {/* Default overview: browse by category */}
          {!filtering && (
            <>
              <div className="grid gap-6 lg:grid-cols-3">
                {productCategories.map((cat, i) => (
                  <Reveal key={cat.slug} delay={i * 100}>
                    <CategoryCard category={cat} cta="View Category" />
                  </Reveal>
                ))}
              </div>
              <p className="mt-8 text-center text-sm text-navy-500">
                {allProducts.length} products across {productCategories.length} categories — use the search or filters above to explore.
              </p>
            </>
          )}

          {/* Filtered / search results */}
          {filtering && (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm font-semibold text-navy-600">
                  {results.length} {results.length === 1 ? 'product' : 'products'}
                  {activeCat !== 'all' && ` in ${chips.find((c) => c.slug === activeCat)?.name}`}
                  {q && ` matching “${query}”`}
                </p>
                <button
                  onClick={() => {
                    setActiveCat('all')
                    setQuery('')
                  }}
                  className="text-sm font-semibold text-brand-orange hover:underline"
                >
                  Reset
                </button>
              </div>

              {results.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                  {results.map((p, i) => (
                    <Reveal key={`${p.categorySlug}-${slugify(p.name)}`} delay={(i % 6) * 50} className="h-full">
                      <div className="flex h-full flex-col">
                        <ProductTile
                          name={p.name}
                          icon={p.icon}
                          src={p.image || `/images/p-${slugify(p.name)}.jpg`}
                          to={`/products/${p.categorySlug}/${slugify(p.name)}`}
                        />
                        <span className="mt-1.5 text-center text-[10px] font-semibold uppercase tracking-wide text-navy-400">
                          {p.category.replace(' Systems', '').replace(' Products', '')}
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 py-16 text-center">
                  <p className="text-navy-500">No products match your search.</p>
                  <Link to="/contact" className="btn btn-orange">
                    Ask Our Team <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Help strip */}
      <section className="section-tight before-footer bg-surface">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-navy-950 to-navy-800 px-6 py-8 md:px-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-orange/15 blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="flex items-center gap-4">
                <span className="hidden h-14 w-14 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange sm:flex">
                  <HardHat className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-white md:text-2xl">Need Help Selecting the Right Products?</h3>
                  <p className="mt-1 text-sm text-white/70">
                    Our experts are here to help you choose the best solutions for your project.
                  </p>
                </div>
              </div>
              <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto sm:flex-wrap">
                <Link to="/contact" className="btn btn-orange">
                  Request a Quotation <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/contact" className="btn btn-outline-light">
                  Contact Our Team <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
