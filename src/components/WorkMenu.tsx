import { useRef, useState } from 'react'
import { works, workTitleText, type Work } from '../data/works'
import { t, ui, type Lang } from '../i18n'

type Props = {
  lang: Lang
  onOpen: (work: Work) => void
}

/**
 * Menu do "Work" no desktop: a lista dos dez trabalhos com uma previa da capa
 * que troca conforme o mouse anda pelos itens.
 *
 * Entre o rotulo e o painel existe a folga do header. Se o painel comecasse
 * exatamente onde ele aparece, atravessar essa folga tiraria o mouse de cima
 * dos dois e o menu fecharia no meio do caminho. Por isso a caixa do painel
 * comeca colada no rotulo e o cartao visivel e empurrado para baixo por um
 * padding transparente, que serve de ponte.
 */
export default function WorkMenu({ lang, onOpen }: Props) {
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState<Work>(works[0])
  const closing = useRef(0)

  const show = () => {
    window.clearTimeout(closing.current)
    setOpen(true)
  }

  // Uma folga curta perdoa o mouse que corta caminho por fora do painel.
  const hide = () => {
    window.clearTimeout(closing.current)
    closing.current = window.setTimeout(() => setOpen(false), 120)
  }

  return (
    <div
      className={`nav-work${open ? ' is-open' : ''}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <a href="#work" className="nav-work-label" aria-expanded={open} aria-haspopup="true">
        {t(ui.navWork, lang)}
        <span className="nav-work-caret" aria-hidden="true" />
      </a>

      <div className="work-menu" hidden={!open}>
        <div className="work-menu-card">
          <ul className="work-menu-list">
            {works.map((work, i) => (
              <li key={work.id} style={{ '--i': i } as React.CSSProperties}>
                <button
                  type="button"
                  className={preview.id === work.id ? 'is-active' : ''}
                  style={{ '--accent': work.accent } as React.CSSProperties}
                  onMouseEnter={() => setPreview(work)}
                  onFocus={() => setPreview(work)}
                  onClick={() => {
                    setOpen(false)
                    onOpen(work)
                  }}
                >
                  <span className="work-menu-num">{work.number}</span>
                  <span className="work-menu-title">{workTitleText(work, lang)}</span>
                  <span className="work-menu-client">{work.client}</span>
                </button>
              </li>
            ))}
          </ul>

          <figure className="work-menu-preview">
            <div className="work-menu-frame">
              {/* Uma imagem so, trocando de src: nao baixa as dez capas. */}
              <img src={preview.cover} alt="" loading="lazy" decoding="async" />
            </div>
            <figcaption>
              <span className="work-menu-preview-client">
                {preview.number} — {preview.client}
              </span>
              <span className="work-menu-preview-tag">{t(preview.tagline, lang)}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  )
}
