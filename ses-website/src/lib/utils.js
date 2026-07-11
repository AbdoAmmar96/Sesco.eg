import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge conditional + Tailwind classes (Shadcn convention). */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Slugify a product name for URLs and image filenames. MUST stay in sync with
 * the extractor that saves `public/images/p-<slug>.jpg`, so a product tile,
 * its detail-page URL, and its photo all resolve to the same slug.
 */
export function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[°²&()/]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
