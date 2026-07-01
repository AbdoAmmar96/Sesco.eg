/**
 * Triggers a file download.
 *
 * If `url` points to a real file it is downloaded/opened. Until the client
 * supplies the real catalogs & datasheets, any button without a real file still
 * does something useful: it generates a small placeholder file on the fly so
 * the click always produces a visible action.
 */
export function triggerDownload(url, filename = 'SES-document') {
  // Real file present → let the browser handle it.
  if (url && url !== '#') {
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.target = '_blank'
    a.rel = 'noreferrer'
    document.body.appendChild(a)
    a.click()
    a.remove()
    return
  }

  // No real file yet → generate a placeholder so the click isn't a dead end.
  const year = new Date().getFullYear()
  const base = String(filename).replace(/\.[a-z0-9]+$/i, '')
  const content =
    `SES Trading & Industries\r\n` +
    `==============================\r\n\r\n` +
    `Placeholder for: ${base}\r\n\r\n` +
    `The final document will be available here soon.\r\n` +
    `Please contact us for the latest catalogs and datasheets.\r\n\r\n` +
    `© ${year} SES Trading & Industries`
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const href = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = href
  a.download = `${base}.txt`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(href), 1000)
}
