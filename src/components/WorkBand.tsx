import { useEffect, useRef, useState } from 'react'
import { workTitleText, type Work } from '../data/works'
import WorkTitle from './WorkTitle'
import { t, ui, type Lang } from '../i18n'
import { registerBand } from '../scrollFx'
import { useMediaQuery } from '../useMediaQuery'

/** Ate 1024px — celular e iPad — a capa troca pelo corte vertical. */
const MOBILE_MEDIA = '(max-width: 1024px)'

type Props = {
  work: Work
  lang: Lang
  /** O primeiro case ja nasce em tela cheia. */
  hero?: boolean
  onOpen: (work: Work) => void
}

/**
 * Faixa de case. Parada, ocupa uma tira no meio da tela; com o mouse na area
 * central ela abre para 100vh / 100vw e revela o texto.
 *
 * A area de hover (.band-hit) e um bloco separado do conteudo, ancorado em
 * offsets fixos a partir do topo da faixa. Ela nao muda de tamanho nem de lugar
 * quando a faixa cresce, entao o cursor nunca "cai fora" do alvo — que era o
 * que fazia a faixa abrir e fechar em loop.
 */
export default function WorkBand({ work, lang, hero = false, onOpen }: Props) {
  const [open, setOpen] = useState(false)
  const [near, setNear] = useState(false)
  const expanded = hero || open

  const bandRef = useRef<HTMLElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)
  const compact = useMediaQuery(MOBILE_MEDIA)

  // Corte vertical no celular e no iPad, quando a peca tem um. Vale para a
  // capa parada e para a de video: as duas vem em duas edicoes.
  const still = compact && work.coverMobile ? work.coverMobile : work.cover
  const cut = compact && work.coverVideoMobile ? work.coverVideoMobile : work.coverVideo

  /*
   * O arquivo so entra quando a faixa encosta na tela. Sem isso a home abria
   * baixando a capa em video de todas as faixas de uma vez — e a do Mercado
   * Livre pesa dezenas de vezes mais que os loops curtos. Ate la o `poster`
   * segura a imagem, entao nao ha buraco preto na faixa.
   *
   * A `key` no src forca um elemento novo na troca de corte: e o caminho em que
   * o `autoPlay` volta a valer, ja que trocar o atributo de um <video> que ja
   * tocou nao reinicia sozinho em todo navegador.
   */
  const videoSrc = near ? cut : undefined
  const title = workTitleText(work, lang)

  useEffect(() => {
    if (!bandRef.current || !layerRef.current) return
    return registerBand(bandRef.current, layerRef.current, () => setNear(true))
  }, [])

  return (
    <section
      ref={bandRef}
      id={work.id}
      className={`band${hero ? ' is-hero' : ''}${expanded ? ' is-open' : ''}${
        near ? ' is-near' : ''
      }`}
      style={
        {
          '--accent': work.accent,
          '--ink': work.ink ?? '#ffffff',
        } as React.CSSProperties
      }
    >
      <div className="band-media">
        <div className="band-parallax" ref={layerRef}>
          {cut ? (
            <video
              key={videoSrc ?? 'poster'}
              className="band-video"
              src={videoSrc}
              poster={still}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <img className="band-img" src={still} alt={title} loading="lazy" />
          )}
        </div>
        <span className="band-wash" />
        <span className="band-scrim" />
      </div>

      <div
        className="band-hit"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="band-center">
          <span className="band-index">
            {work.number} — {work.client}
          </span>

          <h2 className="band-title">
            <WorkTitle work={work} lang={lang} />
          </h2>

          <button
            type="button"
            className="pill"
            onClick={() => onOpen(work)}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
          >
            {t(work.cta ?? ui.seeCase, lang)}
          </button>

          <div className="band-reveal">
            <p className="band-tagline">{t(work.tagline, lang)}</p>
            <p className="band-meta">
              {t(work.discipline, lang)} · {work.year}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
