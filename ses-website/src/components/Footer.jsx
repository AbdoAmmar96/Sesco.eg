import { Link } from 'react-router-dom'
import { Phone, Mail, Globe, MapPin, Facebook, Linkedin, Youtube } from 'lucide-react'
import Logo from './Logo'
import { useContent } from '../context/ContentContext'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/products', label: 'Products' },
  { to: '/projects', label: 'Projects' },
  { to: '/downloads', label: 'Downloads' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  const { company, services, certifications } = useContent()
  const year = new Date().getFullYear()
  return (
    <footer className="bg-navy-800 text-white/80">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              {company.intro}
            </p>
            <div className="mt-6 flex gap-3">
              <SocialIcon href={company.social?.facebook} fallback={company.websiteHref} label="Facebook"><Facebook className="h-4 w-4" /></SocialIcon>
              <SocialIcon href={company.social?.linkedin} fallback={company.websiteHref} label="LinkedIn"><Linkedin className="h-4 w-4" /></SocialIcon>
              <SocialIcon href={company.social?.youtube} fallback={company.websiteHref} label="YouTube"><Youtube className="h-4 w-4" /></SocialIcon>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wide text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/60 transition-colors hover:text-brand-orange">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wide text-white">Our Services</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link to="/services" className="flex items-start gap-2 text-white/60 transition-colors hover:text-brand-orange">
                    <span className="mt-1 text-brand-orange">›</span> {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + certifications */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wide text-white">Contact Us</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                <span>{company.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-brand-orange" />
                <a href={company.phoneHref} className="hover:text-brand-orange">{company.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-brand-orange" />
                <a href={`mailto:${company.email}`} className="hover:text-brand-orange">{company.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="h-4 w-4 shrink-0 text-brand-orange" />
                <a href={company.websiteHref} className="hover:text-brand-orange">{company.website}</a>
              </li>
            </ul>

            <h4 className="mt-6 text-sm font-bold uppercase tracking-wide text-white">Certifications</h4>
            <img
              src="/images/iso-certifications.png"
              alt={
                certifications.length
                  ? `Certified: ${certifications.map((c) => `${c.code} ${c.standard}`).join(', ')}`
                  : 'ISO Certified'
              }
              loading="lazy"
              className="mt-4 h-16 w-auto max-w-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/50 md:flex-row">
          <p>© {year} {company.name}. All Rights Reserved.</p>
          <div className="flex flex-col items-center gap-1 text-center md:flex-row md:gap-4">
            <p className="text-white/45">{company.tagline}</p>
            <span className="hidden text-white/20 md:inline">|</span>
            <p className="text-white/45">
              ©&nbsp;{year}{' '}
              <span className="font-semibold text-white/60">
                Business Partner for Information Technology
              </span>
              . All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ href, label, children, fallback }) {
  // Use the configured social URL; if none is set yet, fall back to the company
  // site so the icon still does something. Hide only if there's no target at all.
  const url = href && href !== '#' ? href : fallback
  if (!url) return null
  return (
    <a
      href={url}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:-translate-y-0.5 hover:bg-brand-orange"
    >
      {children}
    </a>
  )
}
