import { useEffect, useState } from 'react'
import { t, ui, type Lang } from '../i18n'

/**
 * Convite de rolagem no canto inferior direito. Alem de indicar, leva.
 *
 * Enquanto ainda ha trabalho abaixo, a seta aponta para baixo e o clique pula
 * para a proxima faixa. Passado o ultimo trabalho, ela vira para cima e o
 * clique volta ao topo, no Sandler. Nao some em lugar nenhum: seguir chamando
 * para rolar no rodape era o errado, mas sumir deixava o canto orfao.
 */
export default function ScrollCue({ lang }: { lang: Lang }) {
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    const works = document.getElementById('work')
    if (!works) return

    // Passou dos trabalhos quando a area deles nao encosta mais na tela.
    const observer = new IntersectionObserver(([record]) => setAtEnd(!record.isIntersecting))
    observer.observe(works)
    return () => observer.disconnect()
  }, [])

  const handleClick = () => {
    if (atEnd) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    // A altura das faixas muda com o hover, entao a conta e feita no clique.
    const bands = [...document.querySelectorAll<HTMLElement>('.band')]
    const next = bands.find((band) => band.offsetTop > window.scrollY + 8)
    const target = next ?? document.getElementById('about')
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const label = t(atEnd ? ui.backToTop : ui.scrollMore, lang)

  return (
    <button
      type="button"
      className={`scroll-cue${atEnd ? ' is-up' : ''}`}
      onClick={handleClick}
      aria-label={label}
    >
      <span className="scroll-cue-label">{label}</span>
      {/* A bolha inteira gira: o circulo fica igual e a seta e que vira. */}
      <span className="scroll-cue-dot" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path
            d="M12 4v15m0 0 6-6m-6 6-6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  )
}
