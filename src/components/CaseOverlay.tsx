import { Fragment, useEffect, useRef, useState } from 'react'
import { works, workTitleText, type Work } from '../data/works'
import WorkTitle from './WorkTitle'
import { caseDetails, type Film, type Shot } from '../data/caseDetails'
import { t, ui, type L, type Lang } from '../i18n'
import { useMediaQuery } from '../useMediaQuery'
import { useReveal } from '../useReveal'

/** Ate 1024px — celular e iPad — a capa troca pelo corte vertical. */
const MOBILE_MEDIA = '(max-width: 1024px)'

/** Mesmo corte do `.vp-compact` no CSS: daqui para baixo entra a peca vertical. */
const SHOT_COMPACT_MEDIA = '(max-width: 1100px)'

type Props = {
  work: Work
  lang: Lang
  onOpen: (work: Work) => void
  onClose: () => void
}

/** O proximo da lista; depois do ultimo volta para o primeiro. */
function nextWork(id: string): Work {
  const i = works.findIndex((w) => w.id === id)
  return works[(i + 1) % works.length]
}

/** `span` da peca vira modificador do grid de seis colunas. */
const SPAN_CLASS: Record<NonNullable<Shot['span']>, string> = {
  wide: 'is-full',
  half: 'is-half',
  third: 'is-third',
}

/** Uma peca: com `imageCompact`, o navegador escolhe o corte pela largura. */
function ShotFigure({ shot, lang }: { shot: Shot; lang: Lang }) {
  return (
    <figure
      /* `vp-*` esconde por CSS a peca cortada para a outra largura. */
      className={`${SPAN_CLASS[shot.span ?? 'wide']}${shot.viewport ? ` vp-${shot.viewport}` : ''}`}
      data-reveal
    >
      <picture>
        {shot.imageCompact && <source media={SHOT_COMPACT_MEDIA} srcSet={shot.imageCompact} />}
        <img src={shot.image} alt={shot.alt} loading="lazy" decoding="async" />
      </picture>
      {shot.caption && (
        <figcaption className="mono-label caption">{t(shot.caption, lang)}</figcaption>
      )}
    </figure>
  )
}

/**
 * Fachada do player: nem o iframe do Vimeo nem o arquivo de video entram no DOM
 * antes do clique. Sem isso o case inteiro carregava o filme antes de alguem
 * querer ver.
 */
function FilmPlayer({ film, lang, title }: { film: Film; lang: Lang; title: string }) {
  const [playing, setPlaying] = useState(false)

  return (
    <section className="piece piece--film" data-reveal>
      <div className="film-frame">
        {playing ? (
          film.vimeoId ? (
            <iframe
              src={`https://player.vimeo.com/video/${film.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
              title={`${title} — ${t(film.caption, lang)}`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={film.src}
              poster={film.poster}
              title={title}
              controls
              autoPlay
              playsInline
            />
          )
        ) : (
          <button type="button" className="film-poster" onClick={() => setPlaying(true)}>
            <img src={film.poster} alt="" decoding="async" />
            <span className="film-play" aria-hidden="true">
              &#9654;
            </span>
            <span className="mono-label film-label">{t(ui.playFilm, lang)}</span>
          </button>
        )}
      </div>

      <p className="mono-label caption film-caption">
        <span>{t(film.caption, lang)}</span>
        {film.vimeoId && (
          <a
            href={`https://vimeo.com/${film.vimeoId}`}
            target="_blank"
            rel="noreferrer"
          >
            {t(ui.watchOnVimeo, lang)} &#8599;
          </a>
        )}
      </p>
    </section>
  )
}

/**
 * Case aberto: ocupa 100vh / 100vw por cima da home.
 *
 * Duas colunas. A da esquerda para no lugar com a ficha do projeto e so a da
 * direita rola, com a capa, o filme e as pecas. Quem rola e a `.case-scroll`,
 * nao a janela — por isso o sticky da coluna gruda no topo dela.
 */
export default function CaseOverlay({ work, lang, onOpen, onClose }: Props) {
  const detail = caseDetails[work.id]
  const next = nextWork(work.id)
  const title = workTitleText(work, lang)
  const scroll = useRef<HTMLDivElement>(null)
  const compact = useMediaQuery(MOBILE_MEDIA)

  // Mesmo corte que a faixa da home usa, quando a peca tem um. A home ja
  // baixou o video quando a faixa passou pela tela, entao aqui sai do cache.
  const cover = compact && work.coverMobile ? work.coverMobile : work.cover
  const coverVideo = compact && work.coverVideoMobile ? work.coverVideoMobile : work.coverVideo

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // Pular de um case para o proximo mantinha a rolagem na altura antiga.
  useEffect(() => {
    scroll.current?.scrollTo(0, 0)
  }, [work.id])

  useReveal(scroll, work.id)

  const film = detail?.film

  // Case intercalado: cada bloco de texto puxa a peca de mesma posicao.
  const chapters = (
    [
      [ui.caseProblem, work.problem],
      [ui.caseInsight, work.insight],
      [ui.caseIdea, work.idea],
      [ui.casePR, work.pr],
    ] as const
  ).filter((c): c is readonly [L, L] => c[1] !== undefined)

  return (
    <div
      className="case"
      role="dialog"
      aria-modal="true"
      aria-label={`${title}, ${work.client}`}
      style={{ '--accent': work.accent } as React.CSSProperties}
    >
      <button
        type="button"
        className="case-close mono-label"
        onClick={onClose}
        aria-label={t(ui.close, lang)}
      >
        {t(ui.close, lang)}
      </button>

      <div className="case-scroll" ref={scroll}>
        <div className="case-split">
          {/* Ficha do projeto. Nao rola junto: fica no lugar enquanto as pecas
              passam ao lado. O overflow interno e so para ficha grande em tela
              baixa — a coluna rola por dentro em vez de cortar o texto. */}
          <aside className="case-left">
            <button type="button" className="mono-label case-back" onClick={onClose}>
              &#8592; {t(ui.seeAllWork, lang)}
            </button>

            <p className="mono-label case-index">
              {work.number} / {work.client}
            </p>

            <h2 className="case-title">{title}</h2>

            <p className="mono-label case-kicker">
              {t(work.discipline, lang)}
              <br />
              {work.year}
            </p>

            {detail && (
              <dl className="case-facts mono-label">
                {detail.credits.map(([label, value]) => (
                  <div key={t(label, 'en')}>
                    <dt>{t(label, lang)}</dt>
                    <dd>{t(value, lang)}</dd>
                  </div>
                ))}
              </dl>
            )}
          </aside>

          <div className="case-right">
            <figure className="case-cover">
              {coverVideo ? (
                <video
                  key={coverVideo}
                  src={coverVideo}
                  poster={cover}
                  aria-label={`${work.client} — ${title}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={cover}
                  alt={`${work.client} — ${title}`}
                  fetchPriority="high"
                  decoding="async"
                />
              )}
            </figure>

            <p className="case-tagline" data-reveal>
              {t(work.tagline, lang)}
            </p>

            {film && <FilmPlayer key={work.id} film={film} lang={lang} title={title} />}

            {detail?.interleave ? (
              /* Texto e peca alternando: problema, peca, insight, peca... */
              <>
                <h3 className="piece-title piece-title--story" data-reveal>
                  {work.client}
                </h3>

                {chapters.map(([label, text], i) => {
                  const shot = detail.shots[i]
                  return (
                    <Fragment key={t(label, 'en')}>
                      <section className="piece piece--chapter" data-reveal>
                        <p className="mono-label piece-eyebrow">[ {t(label, lang)} ]</p>
                        <div className="piece-body">
                          <p>{t(text, lang)}</p>
                        </div>
                      </section>

                      {shot && (
                        <div className="piece case-gallery">
                          <ShotFigure shot={shot} lang={lang} />
                        </div>
                      )}
                    </Fragment>
                  )
                })}

                {detail.howItWorks && (
                  <section className="piece piece--gallery">
                    <p className="mono-label piece-eyebrow" data-reveal>
                      [ {t(ui.caseHowItWorks, lang)} ]
                    </p>

                    <div className="case-gallery">
                      {detail.howItWorks.map((shot) => (
                        <ShotFigure key={shot.image} shot={shot} lang={lang} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Pecas alem do numero de blocos fecham a pagina, em sequencia. */}
                {detail.shots.slice(chapters.length).map((shot) => (
                  <div key={shot.image} className="piece case-gallery">
                    <ShotFigure shot={shot} lang={lang} />
                  </div>
                ))}
              </>
            ) : (
              <>
                <section className="piece piece--text" data-reveal>
                  <h3 className="piece-title">{work.client}</h3>

                  {/* Insight a esquerda, ideia a direita: a verdade e o que fizemos com ela. */}
                  <div className="piece-columns">
                    <div className="piece-column">
                      <p className="mono-label piece-eyebrow">[ {t(ui.caseInsight, lang)} ]</p>
                      <div className="piece-body">
                        <p>{t(work.insight, lang)}</p>
                      </div>
                    </div>

                    <div className="piece-column">
                      <p className="mono-label piece-eyebrow">[ {t(ui.caseIdea, lang)} ]</p>
                      <div className="piece-body">
                        <p>{t(work.idea, lang)}</p>
                      </div>
                    </div>
                  </div>
                </section>

                {detail && detail.shots.length > 0 && (
                  <section className="piece piece--gallery">
                    <p className="mono-label piece-eyebrow" data-reveal>
                      [ {t(ui.caseWork, lang)} ]
                    </p>

                    <div className="case-gallery">
                      {detail.shots.map((shot) => (
                        <ShotFigure key={shot.image} shot={shot} lang={lang} />
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}

            <section className="piece piece--next">
              <p className="mono-label piece-eyebrow">[ {t(ui.caseNext, lang)} ]</p>

              <button type="button" className="next-link" onClick={() => onOpen(next)}>
                <span className="next-title">
                  <WorkTitle work={next} lang={lang} />
                </span>
                <span aria-hidden="true">&#8594;</span>
              </button>

              <p className="mono-label next-meta">
                {next.client} / {t(next.discipline, lang)} / {next.year}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
