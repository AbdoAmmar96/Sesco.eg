import { Link } from 'react-router-dom'
import { ArrowRight, Download, FileText } from 'lucide-react'
import PageHero from '../components/PageHero'
import { IconBadge } from '../components/Icon'
import CTABanner from '../components/CTABanner'
import Reveal from '../components/Reveal'
import { triggerDownload } from '../utils/download'
import { useContent } from '../context/ContentContext'

export default function Downloads() {
  const { downloads, pages } = useContent()
  const hero = pages?.downloads || {}
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Downloads' }]}
        title={hero.title || 'Download Center'}
        subtitle={hero.subtitle || 'Easy access to company, product and service documents — profiles, catalogs, datasheets and compliance certificates.'}
        bgImage="/images/hero-downloads.jpg"
        buttons={
          <Link to="/contact" className="btn btn-orange">
            Request a Quotation <ArrowRight className="h-4 w-4" />
          </Link>
        }
        highlights={['Company Profile', 'Product Catalogs', 'Service Profiles', 'Certificates']}
      />

      <section className="section bg-surface">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {downloads.map((d, idx) => (
              <Reveal key={d.title} delay={(idx % 3) * 80}>
                <article className="card card-hover group flex h-full flex-col p-6">
                  <div className="flex items-start justify-between">
                    <IconBadge
                      name={d.icon}
                      size="md"
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-[11px] font-bold text-red-600">
                      <FileText className="h-3.5 w-3.5" /> {d.type}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-navy-800">{d.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-500">{d.desc}</p>
                  <button
                    type="button"
                    onClick={() => triggerDownload(d.file, `${d.title}${d.type ? ` (${d.type})` : ''}`)}
                    className="btn btn-outline-navy mt-5 w-full justify-center"
                  >
                    Download <Download className="h-4 w-4" />
                  </button>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-navy-400">
            Looking for a specific document? Our team can send you the exact catalog,
            datasheet or certificate you need.
          </p>
        </div>
      </section>

      <CTABanner
        variant="section"
        title="Need a specific document?"
        text="Contact our team and we'll send the exact catalog, datasheet or certificate you need."
        secondary={{ to: '/contact', label: 'Contact Our Team' }}
      />
    </>
  )
}
