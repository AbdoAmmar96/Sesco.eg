import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import SmartImage from '../components/SmartImage'
import Stats from '../components/Stats'
import CTABanner from '../components/CTABanner'
import Reveal from '../components/Reveal'
import { IconBadge } from '../components/Icon'
import { useContent } from '../context/ContentContext'

export default function About() {
  const { aboutStats, whatWeDo, missionVisionValues, capabilities, whyChoose, pages } = useContent()
  const hero = pages?.about || {}
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'About Us' }]}
        title={hero.title || 'About SES Trading & Industries'}
        subtitle={hero.subtitle || 'Integrated engineering solutions for Fire Fighting, Fire Alarm, MEP, Water Networks, Testing, Commissioning and Maintenance across Egypt.'}
        bgImage="/images/hero-about.jpg"
      />

      {/* WHO WE ARE */}
      <section className="section bg-white">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SmartImage
              src="/images/about-pumproom.jpg"
              icon="pump"
              label="Engineered Solutions"
              className="aspect-[4/3] w-full shadow-card"
              rounded="rounded-xl"
            />
          </Reveal>
          <Reveal delay={120}>
            <SectionTitle align="left" eyebrow="Who We Are" />
            <p className="mt-4 text-base leading-relaxed text-navy-600">
              SES Trading &amp; Industries is an Egyptian engineering company delivering high quality,
              reliable and sustainable solutions for critical building infrastructure. With our
              experienced team and strong project execution capability, we serve industrial,
              commercial and governmental clients with systems that are safe, efficient and built to
              last.
            </p>
            <div className="mt-8">
              <Stats items={aboutStats} variant="inline" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section bg-surface">
        <div className="container">
          <SectionTitle eyebrow="What We Do" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {whatWeDo.map((w, i) => (
              <Reveal key={w.name} delay={i * 70}>
                <div className="card card-hover group h-full p-5 text-center">
                  <IconBadge
                    name={w.icon}
                    size="lg"
                    className="mx-auto transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110"
                  />
                  <h4 className="mt-4 text-sm font-bold text-navy-800">{w.name}</h4>
                  <p className="mt-2 text-xs leading-snug text-navy-500">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION / VISION / VALUES + CAPABILITIES */}
      <section className="section bg-white">
        <div className="container grid gap-12 lg:grid-cols-2">
          {/* MVV */}
          <div>
            <SectionTitle align="left" eyebrow="Mission, Vision & Values" />
            <div className="mt-6 space-y-4">
              {missionVisionValues.map((m) => (
                <div key={m.title} className="card card-hover group flex gap-4 p-5">
                  <IconBadge
                    name={m.icon}
                    size="md"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <div>
                    <h4 className="text-base font-bold text-navy-800">{m.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-navy-500">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div>
            <SectionTitle align="left" eyebrow="Our Capabilities" />
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {capabilities.map((c) => (
                <div
                  key={c.name}
                  className="card card-hover group flex h-full items-center gap-3 p-4"
                >
                  <IconBadge
                    name={c.icon}
                    size="sm"
                    shape="rounded-lg"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="text-sm font-semibold text-navy-700">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SES */}
      <section className="section bg-surface">
        <div className="container">
          <SectionTitle eyebrow="Why Choose SES" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {whyChoose.map((w, i) => (
              <Reveal key={w.title} delay={i * 70}>
                <div className="card card-hover group h-full p-5 text-center">
                  <IconBadge
                    name={w.icon}
                    size="lg"
                    className="mx-auto transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110"
                  />
                  <h4 className="mt-4 text-sm font-bold text-navy-800">{w.title}</h4>
                  <p className="mt-2 text-xs leading-snug text-navy-500">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        variant="section"
        accentBar
        title="Looking for a Reliable Engineering Partner?"
        text="Partner with SES Trading & Industries for safe, efficient and sustainable engineering solutions."
        buttons={[
          { to: '/contact', label: 'Request Quotation', style: 'orange' },
          { to: '/contact', label: 'Contact Our Team', style: 'royal' },
          { to: '/downloads', label: 'Download Company Profile', style: 'navy', download: true },
        ]}
      />
    </>
  )
}
