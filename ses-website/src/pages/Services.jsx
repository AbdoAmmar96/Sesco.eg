import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Clock, Award, Headset } from 'lucide-react'
import PageHero from '../components/PageHero'
import SmartImage from '../components/SmartImage'
import SectionTitle from '../components/SectionTitle'
import Reveal from '../components/Reveal'
import Icon, { IconBadge } from '../components/Icon'
import { useContent } from '../context/ContentContext'

const SERVICE_BENEFITS = [
  { icon: ShieldCheck, title: 'Safety-First Engineering', desc: 'Every system designed and installed to international safety standards.', chip: 'bg-brand-royal/10 text-brand-royal' },
  { icon: Award, title: 'Certified Quality', desc: 'ISO-certified processes and certified products you can rely on.', chip: 'bg-amber-500/10 text-amber-600' },
  { icon: Clock, title: 'On-Time Delivery', desc: 'Strong planning and execution to meet your project deadlines.', chip: 'bg-emerald-500/10 text-emerald-600' },
  { icon: Headset, title: 'After-Sales Support', desc: 'Preventive & corrective maintenance with 24/7 technical support.', chip: 'bg-violet-500/10 text-violet-600' },
]

export default function Services() {
  const { services, pages } = useContent()
  const hero = pages?.services || {}
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Services' }]}
        title={hero.title || 'Our Services'}
        subtitle={hero.subtitle || 'End-to-end solutions backed by engineering expertise, quality workmanship and a commitment to safety.'}
        bgImage="/images/hero-services.jpg"
        buttons={
          <Link to="/contact" className="btn btn-orange">
            Request a Service Quotation <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <section className="section bg-surface">
        <div className="container">
          <Reveal>
            <SectionTitle
              eyebrow="What We Provide"
              subtitle="A complete range of engineering services — from design and supply to installation, commissioning and long-term maintenance."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 4) * 80}>
                <div className="card card-hover group flex h-full flex-col overflow-hidden">
                  <SmartImage
                    src={s.image || `/images/service-${s.slug}.jpg`}
                    icon={s.icon}
                    label={s.name}
                    className="h-40 w-full"
                    rounded="rounded-none"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-3">
                      <IconBadge
                        name={s.icon}
                        size="sm"
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                      <h3 className="text-base font-bold leading-tight text-navy-800">{s.name}</h3>
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-500">{s.desc}</p>
                    <Link
                      to={`/services/${s.slug}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange transition-all hover:gap-2.5"
                    >
                      Read More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Why our services — colored benefits band */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={(i % 4) * 80} className="h-full">
                <div className="card card-hover group flex h-full flex-col p-6">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${b.chip} transition-transform duration-300 group-hover:scale-110`}>
                    <b.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-navy-800">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Downloads strip */}
          <div className="mt-8 overflow-hidden rounded-xl bg-gradient-to-r from-navy-900 to-navy-800">
            <div className="flex flex-col items-start justify-between gap-5 px-6 py-7 md:flex-row md:items-center md:px-10">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-brand-orange">
                  <Icon name="file-text" className="h-6 w-6" />
                </span>
                <div>
                  <h4 className="text-lg font-bold text-white">Technical Documents &amp; Certificates</h4>
                  <p className="mt-1 text-sm text-white/70">
                    Datasheets, catalogs, certificates and compliance documents.
                  </p>
                </div>
              </div>
              <Link to="/downloads" className="btn btn-orange">
                View All Downloads <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
