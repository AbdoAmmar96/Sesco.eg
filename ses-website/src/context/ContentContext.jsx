import { createContext, useContext, useEffect, useState } from 'react'
import * as siteData from '../data/siteData'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Bundled siteData is the default/fallback so the site renders instantly and
// keeps working even if the backend is offline. The API (when reachable)
// overrides it with the CMS-managed content.
const DEFAULTS = {
  ...siteData,
  pages: {},
  // Detail keyed by slug, so the dynamic /products/:slug page works offline
  // for the seeded categories too. The API replaces this with the full set.
  categoryDetails: {
    'fire-fighting': siteData.fireFighting,
    'fire-alarm': siteData.fireAlarm,
    'water-network': siteData.waterNetwork,
  },
  // Becomes true once the API call settles (success OR failure). Lets pages
  // tell "still loading" apart from "really not found" — avoids a 404 flash
  // on a freshly CMS-created category when the page is opened directly.
  loaded: false,
}

const ContentContext = createContext(DEFAULTS)

// Merge API data over the bundled defaults, but never let a null/undefined
// value from the API blank out a good default (a CMS section that returns
// `null` instead of `[]` would otherwise crash the matching `.map`).
function mergeContent(data) {
  const merged = { ...DEFAULTS }
  for (const [key, value] of Object.entries(data)) {
    if (value !== null && value !== undefined) merged[key] = value
  }
  merged.loaded = true
  return merged
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULTS)

  useEffect(() => {
    let alive = true
    fetch(`${API_BASE}/api/content`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('bad status'))))
      .then((data) => {
        if (alive && data && typeof data === 'object') {
          setContent(mergeContent(data))
        }
      })
      .catch(() => {
        /* keep bundled defaults, but mark the load as settled */
        if (alive) setContent((c) => ({ ...c, loaded: true }))
      })
    return () => {
      alive = false
    }
  }, [])

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
}

export function useContent() {
  return useContext(ContentContext)
}
