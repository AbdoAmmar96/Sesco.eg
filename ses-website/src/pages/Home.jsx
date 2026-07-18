import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Download, LayoutGrid, Quote, ShieldCheck, CheckCircle2 } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import CategoryCard from '../components/CategoryCard'
import Carousel from '../components/Carousel'
import ProductTile from '../components/ProductTile'
import CTABanner from '../components/CTABanner'
import Reveal from '../components/Reveal'
import Icon, { IconBadge, iconColor, iconBg } from '../components/Icon'
import { triggerDownload } from '../utils/download'
import { useContent } from '../context/ContentContext'

export default function Home() {
  const {
    productCategories,
    homeServices,
    brands,
    consultants,
    featuredSolutions,
    aboutStats,
    whyChoose,
    processSteps,
    testimonials,
    pages,
  } = useContent()
  const hero = pages?.home || {}
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative flex min-h-[560px] items-center overflow-hidden bg-navy-950">
        {/* Background photo (shows when /images/hero-home.jpg exists) */}
        <img
          src="/images/hero-home.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-right"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
        {/* Navy→blue overlay — solid on the left, reveals the photo on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/95 to-navy-950/40" />
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-royal/25 via-transparent to-transparent" />
        {/* engineered grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-brand-orange/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand-royal/30 blur-3xl" />

        <div className="container relative py-20 md:py-24">
          <div className="max-w-2xl animate-fade-up">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-royal/40 bg-brand-royal/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange">
              <ShieldCheck className="h-4 w-4" /> ISO Certified Engineering
            </span>
            <h1 className="text-4xl font-extrabold leading-[1.12] text-white md:text-5xl lg:text-[3.3rem]">
              {hero.title || (
                <>
                  Integrated Fire Fighting,
                  <br />
                  Fire Alarm &amp;
                  <br />
                  <span className="text-brand-orange">Water Network</span> Solutions
                </>
              )}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
              {hero.subtitle ||
                'SES Trading & Industries delivers end-to-end engineered solutions in Fire Protection, Fire Alarm and Water Networks. Built for safety. Designed for reliability.'}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <Link to="/products" className="btn btn-royal">
                <LayoutGrid className="h-4 w-4" /> Explore Solutions
              </Link>
              <Link to="/contact" className="btn btn-orange">
                Request a Quotation <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={() => triggerDownload('#', 'SES Company Catalog')}
                className="btn btn-navy"
              >
                Download Catalog <Download className="h-4 w-4" />
              </button>
            </div>
            {/* hero trust row */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
              {['10+ Years of Experience', '100+ Projects Delivered', 'Nationwide Support'].map((t) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-orange" /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS BAND (blue) ============ */}
      <section className="relative -mt-px bg-gradient-to-r from-brand-royal-dark via-brand-royal to-navy-800">
        <div className="container py-10 md:py-12">
          <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4">
            {aboutStats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 px-4 text-center">
                <span className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <span className="text-3xl font-extrabold text-white md:text-4xl">{s.value}</span>
                <span className="text-xs font-semibold uppercase tracking-wide text-white/75">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MAIN CATEGORIES ============ */}
      <section className="section bg-surface">
        <div className="container">
          <Reveal>
            <SectionTitle
              eyebrow="What We Offer"
              subtitle="Three core solution lines, engineered and supported end-to-end across Egypt."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {productCategories.map((cat, i) => (
              <Reveal key={cat.slug} delay={i * 100}>
                <CategoryCard category={cat} cta="View Solutions" />
              </Reveal>
            ))}
          </div>

          {/* services strip */}
          <Reveal>
            <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
              {homeServices.map((s) => (
                <div
                  key={s.name}
                  className="group relative flex items-start gap-3.5 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-navy-50 hover:shadow-card"
                >
                  <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand-orange transition-transform duration-300 group-hover:scale-x-100" />
                  <IconBadge
                    name={s.icon}
                    size="md"
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
                  />
                  <div>
                    <h4 className="text-sm font-bold leading-tight text-navy-900">{s.name}</h4>
                    <p className="mt-1 text-xs leading-snug text-navy-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="section bg-white">
        <div className="container">
          <Reveal>
            <SectionTitle
              eyebrow="Why Choose SES"
              subtitle="A trusted engineering partner committed to safety, quality and on-time delivery."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 90} className="h-full">
                <div className="card card-hover group flex h-full flex-col p-6">
                  <IconBadge
                    name={w.icon}
                    size="lg"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <h3 className="mt-4 text-lg font-bold text-navy-900">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW WE WORK (blue) ============ */}
      <section className="section bg-navy-50">
        <div className="container">
          <Reveal>
            <SectionTitle
              eyebrow="How We Work"
              subtitle="A clear, proven process — from first survey to final handover and beyond."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((p, i) => (
              <Reveal key={p.step} delay={(i % 4) * 90} className="h-full">
                <div className="card card-hover group relative flex h-full flex-col p-6">
                  <span className="absolute right-5 top-4 text-4xl font-black text-brand-royal/10 transition-colors group-hover:text-brand-royal/20">
                    {p.step}
                  </span>
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg(p.icon)} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon name={p.icon} className={`h-6 w-6 ${iconColor(p.icon)}`} />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-navy-900">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BRANDS (bold blue band) ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-brand-royal-dark to-navy-900">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="container relative py-16 md:py-20">
          <Reveal>
            <SectionTitle
              light
              eyebrow="Brands We Work With"
              subtitle="We partner with globally recognised manufacturers to deliver certified, dependable products."
            />
          </Reveal>
          <div className="mt-10">
            <Carousel ariaLabel="brands" auto speed={36}>
              {brands.map((b) => (
                <LogoChip key={b.name} name={b.name} src={b.logo} className="h-28 w-56" />
              ))}
            </Carousel>
          </div>

          {/* Consultants */}
          <div className="mt-14">
            <Reveal>
              <p className="mb-7 text-center text-sm font-bold uppercase tracking-[0.18em] text-white/60">
                Trusted by Leading Consultants
              </p>
            </Reveal>
            <Carousel ariaLabel="trusted consultants" auto speed={44}>
              {consultants.map((c) => (
                <LogoChip key={c.name} name={c.name} src={c.logo} className="h-24 w-60" />
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* ============ FEATURED SOLUTIONS ============ */}
      <section className="section bg-surface">
        <div className="container">
          <Reveal>
            <SectionTitle
              eyebrow="Featured Solutions"
              subtitle="A selection of the certified products and systems we supply and install."
            />
          </Reveal>
          <div className="mt-12">
            <Carousel ariaLabel="featured solutions" auto speed={48}>
              {featuredSolutions.map((f) => (
                <ProductTile
                  key={f.name}
                  name={f.name}
                  icon={f.icon}
                  size="md"
                  src={f.image || `/images/p-${slugify(f.name)}.jpg`}
                  to={`/featured/${slugify(f.name)}`}
                  ctaLabel="View Details"
                />
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="section bg-white">
        <div className="container">
          <Reveal>
            <SectionTitle
              eyebrow="What Our Clients Say"
              subtitle="Trusted by developers, consultants and facility owners across Egypt."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={(i % 3) * 100} className="h-full">
                <figure className="card card-hover group flex h-full flex-col p-6">
                  <Quote className="h-8 w-8 text-brand-orange/40 transition-colors group-hover:text-brand-orange" />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-navy-600">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-full ${iconBg(t.icon)}`}>
                      <Icon name={t.icon} className={`h-5 w-5 ${iconColor(t.icon)}`} />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-navy-900">{t.name}</span>
                      <span className="block text-xs text-navy-500">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <CTABanner variant="section" />
    </>
  )
}

function LogoChip({ name, src, className = 'h-20 w-44' }) {
  const [failed, setFailed] = useState(false)
  return (
    <div
      className={`group relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-card-hover ${className}`}
      style={{ scrollSnapAlign: 'start' }}
    >
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-royal to-brand-orange transition-transform duration-300 group-hover:scale-x-100" />
      {src && !failed ? (
        <img
          src={src}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="max-h-full max-w-full object-contain"
        />
      ) : (
        <span className="text-base font-extrabold tracking-tight text-navy-700">{name}</span>
      )}
    </div>
  )
}

function slugify(s) {
  return s.toLowerCase().replace(/[°²&()/]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}
