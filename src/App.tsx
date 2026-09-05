import { useCallback, useEffect, useState } from 'react'
import Wordmark, { WordmarkFilters } from './components/Wordmark'
import WorkBand from './components/WorkBand'
import CaseOverlay from './components/CaseOverlay'
import ContactForm from './components/ContactForm'
import WorkMenu from './components/WorkMenu'
import ScrollCue from './components/ScrollCue'
import AdminPage from './pages/AdminPage'
import { works, workTitleText, type Work } from './data/works'
import { readLang, saveLang, t, ui, type L, type Lang } from './i18n'
import { trackPageview } from './analytics'

/*
 * O case aberto e uma rota de verdade: /work/<slug>. Os slugs sao os mesmos que
 * ja estao no ar, entao os links que o Felipe mandou continuam abrindo o case
 * certo. Em producao o .htaccess reescreve tudo para index.html; sem ele, o
 * Apache devolve 404 antes do React carregar.
 */
const CASE_PREFIX = '/work/'

/** O painel de analytics tem rota propria e nao divide tela com o portfolio. */
function isAdminPath() {
  const { pathname } = window.location
  return pathname === '/admin' || pathname.startsWith('/admin/')
}

function caseFromPath(): Work | null {
  const { pathname } = window.location
  if (!pathname.startsWith(CASE_PREFIX)) return null
  const slug = pathname.slice(CASE_PREFIX.length).replace(/\/$/, '')
  return works.find((w) => w.id === slug) ?? null
}

function go(to: string) {
  if (to === window.location.pathname) return
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

/** wa.me quer o numero com codigo do pais e sem sinais. */
const WHATSAPP_URL = 'https://wa.me/5513991188903'

const navItems: { href: string; label: L }[] = [
  { href: '#work', label: ui.navWork },
  { href: '#about', label: ui.navAbout },
  { href: '#contact', label: ui.navContact },
]

export default function App() {
  const [openCase, setOpenCase] = useState<Work | null>(() => caseFromPath())
  const [admin, setAdmin] = useState(() => isAdminPath())
  const [lang, setLang] = useState<Lang>(() => readLang())
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkNav, setDarkNav] = useState(false)
  // Sanfona do "Work" dentro do burger.
  const [worksOpen, setWorksOpen] = useState(false)

  useEffect(() => {
    const sync = () => {
      setAdmin(isAdminPath())
      setOpenCase(caseFromPath())
      // Com rota de verdade, cada case aparece separado no painel.
      trackPageview()
    }
    sync()
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    saveLang(lang)
  }, [lang])

  /*
   * O titulo acompanha o case aberto. Fora a aba e o historico, o Chrome novo
   * desenha "site / titulo da pagina" na barra de endereco em vez do caminho:
   * com o mesmo titulo na home e no case, a barra parecia nunca mudar.
   */
  useEffect(() => {
    if (admin) document.title = 'Analytics — Felipe Mello Padula'
    else if (openCase)
      document.title = `${workTitleText(openCase, lang)} — Felipe Mello Padula`
    else document.title = `Felipe Mello Padula — ${t(ui.aboutRole, lang)}`
  }, [admin, openCase, lang])

  /*
   * A faixa do Mercado Livre e amarela e o menu branco some em cima dela. Cada
   * faixa ja declara o `--ink` que usa sobre a propria cor: aqui so olhamos qual
   * esta atras do header e adotamos o mesmo. Fechada, vale a cor chapada; aberta,
   * a imagem aparece por baixo e o branco volta a ser o certo.
   */
  useEffect(() => {
    const PROBE_Y = 48

    const compute = () => {
      let dark = false
      for (const band of document.querySelectorAll<HTMLElement>('.band')) {
        const box = band.getBoundingClientRect()
        if (box.top <= PROBE_Y && box.bottom > PROBE_Y) {
          const ink = getComputedStyle(band).getPropertyValue('--ink').trim().toLowerCase()
          dark = !band.classList.contains('is-open') && ink !== '' && ink !== '#ffffff'
          break
        }
      }
      setDarkNav(dark)
    }

    let frame = 0
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    // Abrir e fechar faixa no hover nao gera scroll: observamos a classe.
    const observer = new MutationObserver(schedule)
    const main = document.getElementById('work')
    if (main) observer.observe(main, { attributes: true, attributeFilter: ['class'], subtree: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      observer.disconnect()
    }
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    // Reabrir o burger ja esticado na lista dos dez seria estranho.
    setWorksOpen(false)
  }, [])

  // O menu trava o scroll do fundo enquanto esta aberto.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen, closeMenu])

  const open = useCallback((work: Work) => {
    setMenuOpen(false)
    setWorksOpen(false)
    go(CASE_PREFIX + work.id)
  }, [])

  const close = useCallback(() => {
    go('/')
  }, [])

  const langToggle = (className: string) => (
    <span className={className} role="group" aria-label={t(ui.langLabel, lang)}>
      <button
        type="button"
        className={lang === 'en' ? 'is-on' : ''}
        aria-pressed={lang === 'en'}
        onClick={() => setLang('en')}
      >
        EN
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        className={lang === 'pt' ? 'is-on' : ''}
        aria-pressed={lang === 'pt'}
        onClick={() => setLang('pt')}
      >
        PT-BR
      </button>
    </span>
  )

  if (admin) return <AdminPage />

  return (
    <>
      <WordmarkFilters />

      <header
        className={`site-head${menuOpen ? ' menu-open' : ''}${darkNav ? ' ink-dark' : ''}`}
        id="top"
      >
        <Wordmark />

        {/* Menu de barra: notebook e desktop. */}
        <nav className="site-nav" aria-label={lang === 'pt' ? 'Navegação' : 'Navigation'}>
          <WorkMenu lang={lang} onOpen={open} />
          {navItems.slice(1).map((item) => (
            <a key={item.href} href={item.href}>
              {t(item.label, lang)}
            </a>
          ))}
          {langToggle('lang')}
        </nav>

        {/* Burger: tablet e celular. */}
        <button
          type="button"
          className="burger"
          aria-expanded={menuOpen}
          aria-controls="menu-panel"
          aria-label={
            menuOpen
              ? lang === 'pt'
                ? 'Fechar menu'
                : 'Close menu'
              : lang === 'pt'
                ? 'Abrir menu'
                : 'Open menu'
          }
          onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
        >
          <span />
          <span />
        </button>

        <div
          id="menu-panel"
          className="menu"
          hidden={!menuOpen}
          aria-label={lang === 'pt' ? 'Navegação' : 'Navigation'}
        >
          <nav className={`menu-list${worksOpen ? ' works-open' : ''}`}>
            <div className="menu-work">
              <button
                type="button"
                className="menu-work-toggle"
                aria-expanded={worksOpen}
                onClick={() => setWorksOpen((v) => !v)}
              >
                {t(ui.navWork, lang)}
                <span className="menu-caret" aria-hidden="true" />
              </button>

              <ul className="menu-works" hidden={!worksOpen}>
                {works.map((work, i) => (
                  <li key={work.id} style={{ '--i': i } as React.CSSProperties}>
                    <button
                      type="button"
                      style={{ '--accent': work.accent } as React.CSSProperties}
                      onClick={() => open(work)}
                    >
                      <span className="menu-works-num">{work.number}</span>
                      <span className="menu-works-title">{workTitleText(work, lang)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {navItems.slice(1).map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                {t(item.label, lang)}
              </a>
            ))}
          </nav>
          {langToggle('menu-lang')}
        </div>
      </header>

      <main id="work">
        {works.map((work, i) => (
          <WorkBand key={work.id} work={work} lang={lang} hero={i === 0} onOpen={open} />
        ))}
      </main>

      <section className="panel panel-about" id="about">
        <div className="about-grid">
          <div className="panel-inner">
            <p className="panel-eyebrow">{t(ui.aboutEyebrow, lang)}</p>
            <p className="panel-body">{t(ui.aboutP1, lang)}</p>
            <p className="about-second">{t(ui.aboutP2, lang)}</p>
          </div>

          <figure className="about-portrait">
            <img
              src="/images/opt/fe.webp"
              alt={t(ui.aboutPortraitAlt, lang)}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <span>Felipe Mello Padula</span>
              <span>{t(ui.aboutRole, lang)}</span>
              <span>{t(ui.aboutLocation, lang)}</span>
              <span>{t(ui.aboutAvailability, lang)}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="panel panel-contact" id="contact">
        <div className="panel-inner">
          <p className="panel-eyebrow">{t(ui.contactEyebrow, lang)}</p>
          <p className="panel-body">{t(ui.contactBody, lang)}</p>

          <ul className="panel-links">
            <li>
              <a href="mailto:felipe@felipempadula.com">felipe@felipempadula.com</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/fmellopadula" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/felipempadula.d.a" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
          </ul>

          <a
            className="whatsapp"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                fill="currentColor"
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"
              />
            </svg>
            <span>{t(ui.whatsapp, lang)}</span>
          </a>

          <ContactForm lang={lang} />
        </div>
      </section>

      <footer className="site-foot">
        <p>{t(ui.rights, lang)}</p>
      </footer>

      {!openCase && !menuOpen && <ScrollCue lang={lang} />}

      {openCase && (
        <CaseOverlay work={openCase} lang={lang} onOpen={open} onClose={close} />
      )}
    </>
  )
}
