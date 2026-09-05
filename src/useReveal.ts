import { useEffect, type RefObject } from 'react'

/**
 * Marca `[data-reveal]` como visto quando entra na tela. Sao tres linhas de
 * IntersectionObserver e a transicao fica por conta do CSS — nada de biblioteca
 * de animacao no bundle.
 *
 * O `key` reinicia o observer quando o conteudo troca sem trocar de componente:
 * e o caso de pular de um case direto para o proximo.
 */
export function useReveal(scope: RefObject<HTMLElement | null>, key?: string) {
  useEffect(() => {
    const root = scope.current
    if (!root) return

    const targets = root.querySelectorAll<HTMLElement>('[data-reveal]')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((el) => el.classList.add('is-in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in')
          // Uma vez dentro, fica dentro: reanimar na volta do scroll faz o
          // texto piscar em quem rola pra cima.
          io.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    targets.forEach((el) => {
      el.classList.remove('is-in')
      io.observe(el)
    })

    return () => io.disconnect()
  }, [scope, key])
}
