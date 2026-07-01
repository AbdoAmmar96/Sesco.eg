import { useState } from 'react'
import Icon, { iconColor } from './Icon'

/**
 * SmartImage
 * - If `src` resolves to a real file in /public/images, it shows the photo.
 * - If the file is missing (onError) OR no src is given, it shows a clean
 *   branded gradient placeholder with the category icon + label.
 *
 * Drop real photos into  public/images/  and pass src="/images/your-file.jpg".
 */
export default function SmartImage({
  src,
  alt = '',
  icon = 'box',
  label,
  className = '',
  imgClassName = 'object-cover',
  rounded = 'rounded-lg',
  tone = 'navy', // navy | light
}) {
  const [failed, setFailed] = useState(!src)

  const toneClasses =
    tone === 'light'
      ? 'bg-gradient-to-br from-navy-50 to-slate-100 text-navy-400'
      : 'bg-gradient-to-br from-navy-700 to-navy-900 text-white/80'

  if (failed) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden ${toneClasses} ${rounded} ${className}`}
        role="img"
        aria-label={alt || label}
      >
        {/* subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
        <Icon
          name={icon}
          className={`relative w-10 h-10 ${tone === 'light' ? iconColor(icon) : ''}`}
          strokeWidth={1.6}
        />
        {label && (
          <span className="relative mt-2 px-3 text-center text-xs font-semibold leading-tight">
            {label}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={`overflow-hidden ${rounded} ${className}`}>
      <img
        src={src}
        alt={alt || label}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`h-full w-full ${imgClassName}`}
      />
    </div>
  )
}
