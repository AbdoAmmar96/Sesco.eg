import { useContent } from '../context/ContentContext'

// Floating WhatsApp button pinned to the bottom-right on every page.
// The number is taken from company.whatsapp when provided, otherwise it is
// derived from the site phone number (digits only, as WhatsApp's wa.me expects).
export default function FloatingWhatsApp() {
  const { company } = useContent()

  const raw = company.whatsapp || company.phoneHref || company.phone || ''
  const number = String(raw).replace(/[^0-9]/g, '')
  if (!number) return null

  const message = `Hello ${company.shortName || company.name || ''}, I'd like to know more about your services.`
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition-all hover:scale-105 hover:bg-[#1ebe5d] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 md:bottom-8 md:right-8"
    >
      {/* Pulsing ring */}
      <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-60 motion-safe:animate-ping" />
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7 fill-current"
        aria-hidden="true"
      >
        <path d="M16.004 3C9.383 3 4 8.383 4 15.004c0 2.117.555 4.184 1.61 6.008L4 29l8.184-1.57a11.94 11.94 0 0 0 3.82.63h.004C22.63 28.06 28 22.676 28 16.055 28 12.84 26.746 9.82 24.47 7.543 22.191 5.266 19.219 3 16.004 3zm0 2.18c2.64 0 5.121 1.031 6.988 2.898a9.83 9.83 0 0 1 2.895 6.977c0 5.437-4.426 9.863-9.879 9.863h-.004a9.86 9.86 0 0 1-3.5-.637l-.5-.183-4.856.933.949-4.73-.227-.5a9.78 9.78 0 0 1-1.492-5.22c.004-5.437 4.43-9.4 9.626-9.4zm-5.516 5.207c-.242 0-.637.09-.969.453-.332.363-1.27 1.242-1.27 3.027 0 1.785 1.301 3.512 1.481 3.754.184.242 2.523 3.855 6.152 5.406.86.371 1.531.594 2.055.762.863.273 1.648.234 2.27.141.691-.102 2.129-.871 2.43-1.711.297-.84.297-1.559.207-1.711-.09-.152-.332-.242-.695-.422-.363-.184-2.129-1.051-2.461-1.172-.332-.117-.574-.18-.812.184-.242.363-.934 1.171-1.145 1.414-.211.242-.422.273-.785.09-.363-.184-1.531-.566-2.918-1.805-1.078-.961-1.809-2.148-2.02-2.512-.211-.363-.023-.559.16-.742.164-.16.363-.422.547-.633.184-.211.242-.363.363-.605.121-.242.062-.453-.031-.637-.09-.184-.809-1.977-1.113-2.703-.293-.703-.59-.605-.812-.617-.211-.008-.453-.008-.695-.008z" />
      </svg>
    </a>
  )
}
