// Cliente de medicao, portado do vite-export sem mudar o contrato: manda um
// pageview para /api/track.php, o mesmo endpoint PHP que ja roda no servidor.
// Falha calado, entao `npm run dev` (que nao roda PHP) segue normal.

const ENDPOINT = '/api/track.php'

function isTrackable() {
  if (typeof window === 'undefined') return false

  const { hostname, pathname } = window.location
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '') {
    return false
  }
  if (pathname.startsWith('/admin')) return false

  // `window.doNotTrack` e legado do IE/Safari antigo e nao esta na lib do TS.
  const legacyDnt = (window as { doNotTrack?: string }).doNotTrack
  if (navigator.doNotTrack === '1' || legacyDnt === '1') return false

  return true
}

export function trackPageview(path?: string) {
  if (!isTrackable()) return

  const payload = JSON.stringify({
    path: path || window.location.pathname,
    referrer: document.referrer || '',
    screen: `${window.screen.width}x${window.screen.height}`,
  })

  // sendBeacon sobrevive a navegacao e nao segura a pagina; fetch e o plano B.
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' })
      if (navigator.sendBeacon(ENDPOINT, blob)) return
    }
  } catch {
    // cai no fetch abaixo
  }

  fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => {})
}
