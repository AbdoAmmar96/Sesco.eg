import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  CheckCircle2,
  Box,
  Calculator,
  Headset,
  Wrench,
  Gauge,
  Users,
  MessageSquare,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import CTABanner from '../components/CTABanner'
import Reveal from '../components/Reveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { useContent } from '../context/ContentContext'

const HELP = [
  { icon: Box, title: 'Product Inquiries', desc: 'Information about products, specifications, availability, and pricing.', color: 'royal' },
  { icon: Calculator, title: 'Project Quotations', desc: 'Request detailed quotations for your projects and engineering requirements.', color: 'orange' },
  { icon: Headset, title: 'Technical Support', desc: 'Get expert advice, product guidance, and technical documentation.', color: 'emerald' },
  { icon: Wrench, title: 'Maintenance & Service', desc: 'Inquiries about maintenance contracts, AMC, and after-sales support.', color: 'violet' },
]

const TRUST = [
  { icon: Gauge, title: 'Fast Response', desc: 'We respond quickly to all inquiries and requests.' },
  { icon: Users, title: 'Experienced Team', desc: 'Skilled engineers and experts ready to help you.' },
  { icon: MapPin, title: 'Nationwide Support', desc: 'Serving clients across Egypt with reliable solutions.' },
  { icon: MessageSquare, title: 'Reliable Communication', desc: 'Clear, consistent and professional communication at every step.' },
]

// soft tinted chip colours for the "How Can We Help" cards
const CHIP = {
  royal: 'bg-brand-royal/10 text-brand-royal',
  orange: 'bg-brand-orange/10 text-brand-orange',
  emerald: 'bg-emerald-500/10 text-emerald-600',
  violet: 'bg-violet-500/10 text-violet-600',
}

const INTERESTS = [
  'Fire Fighting Systems',
  'Fire Alarm Systems',
  'Water Network Products',
  'MEP Contracting',
  'Testing & Commissioning',
  'Maintenance & Service',
  'Other',
]

const EMPTY = {
  name: '',
  company: '',
  email: '',
  phone: '',
  subject: '',
  interest: '',
  message: '',
  website: '', // honeypot — must stay empty
  agree: false,
}

// Validation schema (Zod) — drives the React Hook Form resolver below.
const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name'),
  company: z.string().trim().optional(),
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
  phone: z.string().trim().optional(),
  subject: z.string().trim().min(2, 'Please enter a subject'),
  interest: z.string().optional(),
  message: z.string().trim().min(10, 'Please tell us a bit more (at least 10 characters)'),
  website: z.string().optional(), // honeypot
  agree: z.boolean().refine((v) => v === true, { message: 'Please accept the Privacy Policy & Terms.' }),
})

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function Contact() {
  const { company, pages } = useContent()
  const hero = pages?.contact || {}
  const CONTACT_CARDS = [
    { icon: Phone, title: 'Call Us', value: company.phone, note: 'Speak with our team for immediate assistance.', href: company.phoneHref },
    { icon: Mail, title: 'Email Us', value: company.email, note: 'We respond to all emails within 24 hours.', href: `mailto:${company.email}` },
    { icon: MapPin, title: 'Visit Us', value: company.address, note: 'Our office is open for visits by appointment.' },
    { icon: Clock, title: 'Working Hours', value: company.hours, note: company.hoursNote },
  ]
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues: EMPTY })

  const onSubmit = async (form) => {
    setError('')
    try {
      const res = await fetch(`${API_BASE}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          interested_in: form.interest,
          message: form.message,
          website: form.website,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'Something went wrong. Please try again.')
      }
      setSent(true)
      reset()
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Could not reach the server. Please make sure the backend is running.'
          : err.message,
      )
    }
  }

  const errCls = 'mt-1 text-xs font-semibold text-red-600'

  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Contact' }]}
        title={hero.title || 'Contact Us'}
        subtitle={hero.subtitle || 'Get in touch with SES Trading & Industries for quotations, product inquiries, technical support, and project discussions.'}
        bgImage="/images/hero-contact.jpg"
        buttons={
          <>
            <a href="#contact-form" className="btn btn-orange">
              Request a Quotation <ArrowRight className="h-4 w-4" />
            </a>
            <a href={company.phoneHref || `tel:${company.phone}`} className="btn btn-outline-light">
              Call Technical Team <Phone className="h-4 w-4" />
            </a>
          </>
        }
      />

      {/* Contact cards */}
      <section className="section bg-surface">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_CARDS.map((c, idx) => {
              const Body = (
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-royal text-white transition-transform duration-300 group-hover:scale-110">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-navy-800">{c.title}</h3>
                  <p className="mt-1 break-words text-sm font-semibold text-brand-royal">{c.value}</p>
                  <p className="mt-2 text-xs leading-relaxed text-navy-500">{c.note}</p>
                </>
              )
              const cls = 'card card-hover group flex h-full flex-col p-6'
              return (
                <Reveal key={c.title} delay={(idx % 4) * 70} className="h-full">
                  {c.href ? (
                    <a href={c.href} className={cls}>
                      {Body}
                    </a>
                  ) : (
                    <div className={cls}>{Body}</div>
                  )}
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Map + Form */}
      <section id="contact-form" className="scroll-mt-24 bg-white pb-16">
        <div className="container grid gap-8 lg:grid-cols-2">
          {/* Location */}
          <div className="card flex flex-col overflow-hidden">
            <div className="border-b border-line px-6 py-5">
              <SectionTitle eyebrow="Our Location" align="left" />
            </div>
            <div className="aspect-[4/3] w-full bg-navy-50">
              <iframe
                title="SES Trading & Industries location"
                src={company.mapEmbed}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="space-y-3 px-6 py-5">
              <p className="flex items-start gap-3 text-sm text-navy-700">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                <span>
                  <span className="font-bold text-navy-800">{company.name}</span>
                  <br />
                  {company.address}
                </span>
              </p>
              <p className="flex items-center gap-3 text-sm text-navy-700">
                <Globe className="h-5 w-5 shrink-0 text-brand-orange" />
                <a href={company.websiteHref} className="font-semibold text-brand-royal hover:underline">
                  {company.website}
                </a>
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="card p-6 md:p-8">
            <SectionTitle eyebrow="Send Us a Message" align="left" />

            {sent ? (
              <div className="mt-8 flex flex-col items-center rounded-xl border border-green-200 bg-green-50 px-6 py-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
                <h3 className="mt-4 text-lg font-bold text-navy-800">Thank you!</h3>
                <p className="mt-2 max-w-sm text-sm text-navy-600">
                  Your message has been received. Our team will get back to you within 24 hours.
                </p>
                <button onClick={() => setSent(false)} className="btn btn-outline-navy mt-6">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-4">
                <div className="grid items-start gap-4 sm:grid-cols-2">
                  <div>
                    <Input placeholder="Full Name *" autoComplete="name" {...register('name')} />
                    {errors.name && <p className={errCls}>{errors.name.message}</p>}
                  </div>
                  <div>
                    <Input placeholder="Company Name" autoComplete="organization" {...register('company')} />
                  </div>
                </div>
                <div className="grid items-start gap-4 sm:grid-cols-2">
                  <div>
                    <Input type="email" placeholder="Email Address *" autoComplete="email" {...register('email')} />
                    {errors.email && <p className={errCls}>{errors.email.message}</p>}
                  </div>
                  <div>
                    <Input type="tel" inputMode="tel" placeholder="Phone Number" autoComplete="tel" {...register('phone')} />
                    {errors.phone && <p className={errCls}>{errors.phone.message}</p>}
                  </div>
                </div>
                <div>
                  <Input placeholder="Subject *" {...register('subject')} />
                  {errors.subject && <p className={errCls}>{errors.subject.message}</p>}
                </div>
                <Select {...register('interest')}>
                  <option value="">Interested In — Please Select</option>
                  {INTERESTS.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </Select>
                <div>
                  <Textarea
                    rows={5}
                    placeholder="Message — Tell us about your requirement... *"
                    {...register('message')}
                  />
                  {errors.message && <p className={errCls}>{errors.message.message}</p>}
                </div>
                {/* Honeypot — hidden from users, traps bots */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  {...register('website')}
                />
                <div>
                  <label className="flex items-start gap-3 text-sm text-navy-600">
                    <input type="checkbox" className="mt-1 h-4 w-4 accent-brand-orange" {...register('agree')} />
                    <span>
                      I agree to the{' '}
                      <Link to="/privacy" className="font-semibold text-brand-royal hover:underline">
                        Privacy Policy
                      </Link>{' '}
                      and{' '}
                      <Link to="/terms" className="font-semibold text-brand-royal hover:underline">
                        Terms of Use
                      </Link>
                      .
                    </span>
                  </label>
                  {errors.agree && <p className={errCls}>{errors.agree.message}</p>}
                </div>
                {error && (
                  <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
                )}
                <Button type="submit" variant="orange" size="full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending…' : (<>Submit Request <ArrowRight className="h-4 w-4" /></>)}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* How can we help */}
      <section className="section bg-surface">
        <div className="container">
          <Reveal>
            <SectionTitle
              eyebrow="How Can We Help?"
              subtitle="Tell us what you need — our team routes every request to the right specialist."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HELP.map((h, idx) => (
              <Reveal key={h.title} delay={(idx % 4) * 70} className="h-full">
                <div className="card card-hover group flex h-full flex-col p-6">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${CHIP[h.color]} transition-transform duration-300 group-hover:scale-110`}>
                    <h.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-navy-800">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">{h.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip — distinct blue band to separate it from the section above */}
      <section className="bg-white pb-16 pt-4">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-950 via-brand-royal-dark to-navy-900 p-8 md:p-10">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
                backgroundSize: '36px 36px',
              }}
            />
            <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {TRUST.map((t) => (
                <div key={t.title} className="flex flex-col items-start gap-2">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-brand-orange ring-1 ring-white/15">
                    <t.icon className="h-5 w-5" />
                  </span>
                  <h4 className="text-sm font-bold text-white">{t.title}</h4>
                  <p className="text-xs leading-relaxed text-white/70">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        variant="section"
        title="Have a Project in Mind? Let's Talk."
        text="Contact SES Trading & Industries for fire fighting, fire alarm and water network solutions tailored to your needs."
        buttons={[
          { href: '#contact-form', label: 'Request a Quotation', style: 'orange' },
          { href: company.phoneHref || `tel:${company.phone}`, label: 'Call Technical Team', style: 'outline' },
        ]}
      />
    </>
  )
}
