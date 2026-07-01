import { Link } from 'react-router-dom'
import { ArrowRight, Download, LayoutGrid, HardHat } from 'lucide-react'
import PageHero from '../components/PageHero'
import CategoryCard from '../components/CategoryCard'
import Reveal from '../components/Reveal'
import { triggerDownload } from '../utils/download'
import { useContent } from '../context/ContentContext'

export default function Products() {
  const { productCategories, pages } = useContent()
  const hero = pages?.products || {}
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Products' }]}
        title={hero.title || 'Products & Engineering Solutions'}
        subtitle={hero.subtitle || 'Explore SES product categories for Fire Fighting Systems, Fire Alarm Systems, and Water Network Products, with organized subcategories, product photos, and easy access to quotations and catalogs.'}
        bgImage="/images/hero-products.jpg"
        buttons={
          <>
            <Link to="/products" className="btn btn-royal">
              <LayoutGrid className="h-4 w-4" /> View Categories
            </Link>
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

      <section className="section bg-surface">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-3">
            {productCategories.map((cat, i) => (
              <Reveal key={cat.slug} delay={i * 100}>
                <CategoryCard category={cat} cta="View Category" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Help strip — contained banner with breathing room before the footer */}
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
                  <h3 className="text-xl font-bold text-white md:text-2xl">
                    Need Help Selecting the Right Products?
                  </h3>
                  <p className="mt-1 text-sm text-white/70">
                    Our experts are here to help you choose the best solutions for your project.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
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
