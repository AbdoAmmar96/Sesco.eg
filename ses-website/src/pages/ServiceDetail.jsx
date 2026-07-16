import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Phone, CheckCircle2 } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import SmartImage from '../components/SmartImage'
import CTABanner from '../components/CTABanner'
import Reveal from '../components/Reveal'
import Icon, { IconBadge, iconColor, iconBg } from '../components/Icon'
import NotFound from './NotFound'
import { useContent } from '../context/ContentContext'

const EMPTY = { intro: '', scope: [], applications: [], benefits: [] }

export default function ServiceDetail() {
  const { slug } = useParams()
  const { services, serviceDetails, company, loaded } = useContent()

  const service = services.find((s) => s.slug === slug)

  if (!service) {
    if (!loaded) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center text-navy-400">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-brand-orange" />
        </div>
      )
    }
    return <NotFound />
  }

  const data = (serviceDetails && serviceDetails[slug]) || EMPTY
  const related = services.filter((s) => s.slug !== slug).slice(0, 4)

  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Services', to: '/services' }, { label: service.name }]}
        title={service.name}
        subtitle={data.tagline || service.desc}
        bgImage={service.image || `/images/service-${slug}.jpg`}
        buttons={
          <>
            <Link to="/contact" className="btn btn-orange">
              Request a Quotation <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={company.phoneHref || `tel:${company.phone}`} className="btn btn-outline-light">
              Call Technical Team <Phone className="h-4 w-4" />
            </a>
          </>
        }
      />

      {/* Overview + scope */}
      <section className="section bg-surface">
        <div className="container grid gap-10 lg:grid-cols-2">
          {/* Overview */}
          <Reveal>
            <div className="flex items-center gap-3">
              <IconBadge name={service.icon} size="lg" />
              <h2 className="text-2xl font-extrabold text-navy-900">Overview</h2>
            </div>
            <p className="mt-5 text-base leading-relaxed text-navy-600">{data.intro || service.desc}</p>

            {data.applications?.length > 0 && (
              <>
                <h3 className="mt-8 text-sm font-bold uppercase tracking-wide text-navy-700">Typical Applications</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {data.applications.map((a) => (
                    <span
                      key={a}
                      className="rounded-full border border-brand-royal/20 bg-brand-royal/5 px-3 py-1.5 text-xs font-semibold text-brand-royal"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </>
            )}
          </Reveal>

          {/* Scope / what's included */}
          <Reveal delay={120}>
            <div className="card flex flex-col p-6 md:p-8">
              <h3 className="text-lg font-bold text-navy-900">What&apos;s Included</h3>
              <ul className="mt-5 space-y-3">
                {(data.scope || []).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                    <span className="text-sm leading-relaxed text-navy-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn btn-orange mt-7 w-full">
                Request This Service <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why choose / benefits */}
      {data.benefits?.length > 0 && (
        <section className="section bg-white">
          <div className="container">
            <Reveal>
              <SectionTitle eyebrow="Why Choose SES for This" />
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.benefits.map((b, i) => (
                <Reveal key={b.title} delay={(i % 3) * 90} className="h-full">
                  <div className="card card-hover group flex h-full flex-col p-6">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg(b.icon)} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon name={b.icon} className={`h-6 w-6 ${iconColor(b.icon)}`} />
                    </span>
                    <h3 className="mt-4 text-base font-bold text-navy-900">{b.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-500">{b.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related services */}
      {related.length > 0 && (
        <section className="section bg-navy-50">
          <div className="container">
            <Reveal>
              <SectionTitle eyebrow="Other Services" />
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((s, i) => (
                <Reveal key={s.slug} delay={(i % 4) * 80} className="h-full">
                  <Link to={`/services/${s.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden">
                    <SmartImage
                      src={s.image || `/images/service-${s.slug}.jpg`}
                      icon={s.icon}
                      label={s.name}
                      className="h-32 w-full"
                      rounded="rounded-none"
                    />
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-3">
                        <IconBadge name={s.icon} size="sm" className="transition-transform duration-300 group-hover:scale-110" />
                        <h3 className="text-sm font-bold leading-tight text-navy-800">{s.name}</h3>
                      </div>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange transition-all group-hover:gap-2.5">
                        Read More <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner variant="section" />
    </>
  )
}
