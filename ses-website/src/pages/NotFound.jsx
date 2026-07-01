import { Link } from 'react-router-dom'
import { ArrowRight, Home, Flame } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-navy-900 px-6 py-24 text-center">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-orange/20 blur-3xl" />

      <div className="relative">
        <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-orange/15 text-brand-orange">
          <Flame className="h-8 w-8" />
        </span>
        <p className="text-7xl font-extrabold text-white md:text-8xl">404</p>
        <h1 className="mt-4 text-2xl font-bold text-white md:text-3xl">Page Not Found</h1>
        <p className="mx-auto mt-3 max-w-md text-white/70">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-orange">
            <Home className="h-4 w-4" /> Back to Home
          </Link>
          <Link to="/contact" className="btn btn-outline-light">
            Contact Us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
