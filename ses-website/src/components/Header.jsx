import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react'
import Logo from './Logo'
import Icon from './Icon'
import { useContent } from '../context/ContentContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About us' },
  { to: '/services', label: 'Services', dropdown: 'services' },
  { to: '/products', label: 'Products', dropdown: 'products' },
  { to: '/projects', label: 'Projects' },
  { to: '/downloads', label: 'Downloads' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDrop, setOpenDrop] = useState(null)
  const location = useLocation()
  const closeTimer = useRef(null)

  // Open immediately, but delay closing so the cursor can travel from the
  // nav item down into the panel without the menu vanishing.
  const openMenu = (drop) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenDrop(drop)
  }
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenDrop(null), 180)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close menus on route change
  useEffect(() => {
    setMobileOpen(false)
    setOpenDrop(null)
  }, [location.pathname])

  const linkClass = ({ isActive }) =>
    `relative px-1 py-2 text-sm font-semibold transition-colors ${
      isActive ? 'text-brand-royal' : 'text-navy-700 hover:text-brand-royal'
    }`

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow ${
        scrolled ? 'shadow-[0_2px_16px_rgba(16,33,67,0.08)]' : 'border-b border-line'
      }`}
    >
      <div className="container flex h-[72px] items-center justify-between gap-4">
        <Logo variant="dark" />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) =>
            l.dropdown ? (
              <div
                key={l.to}
                className="group relative"
                onMouseEnter={() => openMenu(l.dropdown)}
                onMouseLeave={scheduleClose}
              >
                <NavLink to={l.to} className={linkClass}>
                  <span className="inline-flex items-center gap-1">
                    {l.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${openDrop === l.dropdown ? 'rotate-180' : ''}`}
                    />
                  </span>
                </NavLink>
                {openDrop === l.dropdown && (
                  <DropdownPanel
                    type={l.dropdown}
                    onEnter={() => openMenu(l.dropdown)}
                    onLeave={scheduleClose}
                  />
                )}
              </div>
            ) : (
              <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === '/'}>
                {l.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/contact" className="btn btn-orange hidden sm:inline-flex">
            Request a Quotation <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-navy-800 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — full-screen panel below the header bar */}
      {mobileOpen && (
        <div className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto border-t border-line bg-white lg:hidden">
          <nav className="container flex flex-col py-4">
            {navLinks.map((l) => (
              <MobileItem key={l.to} link={l} />
            ))}
            <Link to="/contact" className="btn btn-orange mt-3">
              Request a Quotation <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

function DropdownPanel({ type, onEnter, onLeave }) {
  const { productCategories, services } = useContent()
  const items = type === 'services' ? services : productCategories
  const baseTo = type === 'services' ? '/services' : '/products'
  // The services list grows from the CMS, so it gets a two-column panel that
  // stays compact; products are only a handful of categories and stay single.
  // Either way the panel caps its height and scrolls once the list outgrows it.
  const twoCols = type === 'services'

  return (
    <div
      className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 ${twoCols ? 'w-[620px]' : 'w-[300px]'}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="origin-top animate-fade-up overflow-hidden rounded-xl border border-line bg-white shadow-card-hover">
        <div
          className={`max-h-[min(26rem,70vh)] overflow-y-auto overscroll-contain ${
            twoCols ? 'grid grid-cols-2' : ''
          }`}
        >
          {items.map((it) => (
            <Link
              key={it.slug || it.name}
              to={it.slug ? `/${type}/${it.slug}` : baseTo}
              className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-navy-50"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-brand-royal">
                <Icon name={it.icon} className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-navy-800">{it.name}</span>
                <span className="block text-xs text-navy-500 line-clamp-1">
                  {it.short || it.desc}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function MobileItem({ link }) {
  const [open, setOpen] = useState(false)
  const { productCategories, services } = useContent()
  if (!link.dropdown) {
    return (
      <NavLink
        to={link.to}
        end={link.to === '/'}
        className={({ isActive }) =>
          `border-b border-line py-3 text-sm font-semibold ${
            isActive ? 'text-brand-royal' : 'text-navy-800'
          }`
        }
      >
        {link.label}
      </NavLink>
    )
  }
  const items = link.dropdown === 'services' ? services : productCategories
  return (
    <div className="border-b border-line">
      <div className="flex items-center justify-between py-3">
        <NavLink to={link.to} className="text-sm font-semibold text-navy-800">
          {link.label}
        </NavLink>
        <button onClick={() => setOpen((v) => !v)} aria-label="Expand" className="p-1">
          <ChevronDown className={`h-5 w-5 text-navy-500 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {open && (
        <div className="pb-2">
          {items.map((it) => (
            <Link
              key={it.slug || it.name}
              to={it.slug ? `/${link.dropdown}/${it.slug}` : link.to}
              className="flex items-center gap-2 py-2 pl-3 text-sm text-navy-600"
            >
              <Icon name={it.icon} className="h-4 w-4 text-brand-royal" />
              {it.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
