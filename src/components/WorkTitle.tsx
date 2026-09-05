import { workTitle, type Work } from '../data/works'
import type { Lang } from '../i18n'

/**
 * Titulo do trabalho. O `\n` no dado e quebra de linha desenhada — o titulo da
 * Audi tem duas linhas por decisao de arte, nao por acaso da largura.
 *
 * Titulo de uma linha so sai como texto puro, sem `span` nenhum: assim nada
 * muda para os nove que nao pedem quebra.
 */
export default function WorkTitle({ work, lang }: { work: Work; lang: Lang }) {
  const lines = workTitle(work, lang).split('\n')

  if (lines.length === 1) return <>{lines[0]}</>

  return (
    <>
      {lines.map((line, i) => (
        <span key={`${line}-${i}`}>{line}</span>
      ))}
    </>
  )
}
