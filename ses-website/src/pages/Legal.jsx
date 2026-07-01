import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { useContent } from '../context/ContentContext'

const CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    intro:
      'How SES Trading & Industries collects, uses and protects the information you share with us.',
    sections: [
      ['Information We Collect', 'We collect the details you provide through our contact and quotation forms — your name, company, email, phone number and message — solely to respond to your enquiry.'],
      ['How We Use It', 'Your information is used to process quotation requests, answer enquiries and provide the technical support you ask for. We never sell or rent your data.'],
      ['Data Security', 'Submissions are stored securely and accessed only by authorized SES staff handling your request.'],
      ['Your Rights', 'You may ask us to access, correct or delete your information at any time by contacting us.'],
    ],
  },
  terms: {
    title: 'Terms of Use',
    intro:
      'The terms that govern your use of the SES Trading & Industries website.',
    sections: [
      ['Use of This Site', 'This website is provided for information about our products and services. Content may be updated or changed without notice.'],
      ['Product Information', 'Product images, specifications and catalogs are indicative. Final specifications are confirmed in writing with each quotation.'],
      ['Intellectual Property', 'All logos, text and images on this site are the property of SES Trading & Industries unless otherwise stated.'],
      ['Contact', 'For any questions about these terms, please reach out through our contact page.'],
    ],
  },
}

export default function Legal() {
  const { pathname } = useLocation()
  const { company } = useContent()
  const key = pathname.includes('terms') ? 'terms' : 'privacy'
  const data = CONTENT[key]

  return (
    <>
      <PageHero breadcrumb={[{ label: data.title }]} title={data.title} subtitle={data.intro} bgImage="/images/hero-contact.jpg" />

      <section className="section bg-surface">
        <div className="container max-w-3xl">
          <div className="space-y-5">
            {data.sections.map(([heading, body], i) => (
              <Reveal key={heading} delay={i * 70}>
                <div className="card p-6">
                  <h2 className="text-lg font-bold text-navy-900">{heading}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 text-sm text-navy-500">
            Questions? Email{' '}
            <a href={`mailto:${company?.email || 'info@sescoeg.com'}`} className="font-semibold text-brand-royal hover:underline">
              {company?.email || 'info@sescoeg.com'}
            </a>
            .
          </p>

          <Link to="/contact" className="btn btn-outline-navy mt-8">
            <ArrowLeft className="h-4 w-4" /> Back to Contact
          </Link>
        </div>
      </section>
    </>
  )
}
