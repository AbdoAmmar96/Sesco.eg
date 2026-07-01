import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Download } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import SmartImage from '../components/SmartImage'
import Stats from '../components/Stats'
import CTABanner from '../components/CTABanner'
import Reveal from '../components/Reveal'
import { triggerDownload } from '../utils/download'
import { useContent } from '../context/ContentContext'

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const TAG_COLORS = {
  'Fire Fighting': 'text-red-600',
  'Fire Alarm': 'text-brand-orange',
  'Water Networks': 'text-brand-royal',
  'MEP Contracting': 'text-brand-royal',
  'Maintenance': 'text-navy-700',
}

export default function Projects() {
  const { projects, projectFilters, projectStats, pages } = useContent()
  const hero = pages?.projects || {}
  const [active, setActive] = useState(projectFilters[0])

  const visible = useMemo(() => {
    if (/^all/i.test(active)) return projects
    return projects.filter((p) => p.category === active)
  }, [active])

  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Projects' }]}
        title={hero.title || 'Our Projects'}
        subtitle={hero.subtitle || 'Delivering Integrated Fire Fighting, Fire Alarm, MEP & Water Network Solutions with excellence across Egypt.'}
        bgImage="/images/hero-projects.jpg"
        buttons={
          <>
            <Link to="/contact" className="btn btn-orange">
              Request a Quotation <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => triggerDownload('#', 'SES Company Profile')}
              className="btn btn-outline-light"
            >
              Download Company Profile <Download className="h-4 w-4" />
            </button>
          </>
        }
      />

      {/* Filters */}
      <div className="sticky top-[72px] z-30 border-b border-line bg-white/95 backdrop-blur">
        <div className="container flex gap-2 overflow-x-auto py-4 no-scrollbar">
          {projectFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active === f
                  ? 'bg-brand-orange text-white'
                  : 'border border-line bg-white text-navy-600 hover:border-navy-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Project grid */}
      <section className="section bg-surface">
        <div className="container">
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, idx) => (
              <Reveal key={p.title} delay={(idx % 3) * 80}>
                <article className="card card-hover group flex h-full flex-col overflow-hidden">
                  <SmartImage
                    src={p.image || `/images/project-${slugify(p.title)}.jpg`}
                    icon={p.icon}
                    label={p.title}
                    alt={p.title}
                    rounded="rounded-none"
                    className="h-52 w-full"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold text-navy-800">{p.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className={`inline-flex items-center gap-1.5 text-xs font-bold ${TAG_COLORS[t] || 'text-brand-royal'}`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-500">{p.desc}</p>
                    <Link
                      to="/contact"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange transition-all hover:gap-2.5"
                    >
                      View Project <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="py-12 text-center text-navy-500">No projects in this category yet.</p>
          )}
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-white pb-16">
        <div className="container">
          <Stats items={projectStats} variant="band" />
        </div>
      </section>

      <CTABanner
        variant="section"
        title="Have a Project in Mind? Let's Talk."
        text="Contact SES Trading & Industries for fire fighting, fire alarm and water network solutions tailored to your needs."
        secondary={{ to: '/contact', label: 'Contact Technical Team' }}
      />
    </>
  )
}
