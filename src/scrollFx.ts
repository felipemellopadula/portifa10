/*
 * Efeitos de rolagem das faixas, num controlador so.
 *
 * Duas coisas acontecem aqui:
 *
 * 1. Parallax: a midia anda mais devagar que a pagina dentro da propria moldura,
 *    entao uma faixa deixa de parecer um bloco colado no outro e passa a
 *    parecer uma janela para uma cena que continua atras.
 * 2. Entrada: a faixa ganha `is-near` quando encosta na tela, e o CSS usa isso
 *    para subir e revelar o conteudo em vez de ele ja estar la, pronto.
 *
 * Um unico rAF e um unico listener de scroll para todas as faixas: dez
 * listeners concorrendo era justamente o que deixava a rolagem pesada. So as
 * faixas visiveis entram na conta, e quem pediu menos animacao no sistema nao
 * recebe parallax nenhum.
 */

type Entry = { band: HTMLElement; layer: HTMLElement; onNear: () => void }

/** Quanto a midia desliza, em fracao da altura da faixa. */
const SHIFT = 0.08

const entries = new Set<Entry>()
const visible = new Set<Entry>()

let observer: IntersectionObserver | null = null
let frame = 0
let running = false

function reduceMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function paint() {
  frame = 0
  const vh = window.innerHeight

  for (const entry of visible) {
    const box = entry.band.getBoundingClientRect()
    // -1 quando a faixa esta entrando por baixo, +1 quando ja saiu por cima.
    const span = vh / 2 + box.height / 2
    const progress = (box.top + box.height / 2 - vh / 2) / span
    const clamped = progress < -1 ? -1 : progress > 1 ? 1 : progress
    const offset = clamped * box.height * SHIFT
    entry.layer.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`
  }
}

function schedule() {
  if (frame) return
  frame = requestAnimationFrame(paint)
}

function ensureRunning() {
  if (running) return
  running = true

  observer = new IntersectionObserver(
    (records) => {
      for (const record of records) {
        const entry = [...entries].find((e) => e.band === record.target)
        if (!entry) continue

        if (record.isIntersecting) {
          visible.add(entry)
          // Uma vez revelada, fica revelada: piscar na rolagem de volta e pior
          // do que nao ter efeito nenhum. Quem guarda isso e o React: mexer no
          // className por fora nao sobrevive ao proximo render do componente.
          entry.onNear()
        } else {
          visible.delete(entry)
        }
      }
      schedule()
    },
    { rootMargin: '10% 0px 10% 0px' },
  )

  for (const entry of entries) observer.observe(entry.band)

  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  schedule()
}

function stop() {
  running = false
  observer?.disconnect()
  observer = null
  visible.clear()
  cancelAnimationFrame(frame)
  frame = 0
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
}

/** Liga uma faixa ao controlador. Devolve a funcao que a desliga. */
export function registerBand(band: HTMLElement, layer: HTMLElement, onNear: () => void) {
  if (reduceMotion()) {
    onNear()
    return () => {}
  }

  const entry: Entry = { band, layer, onNear }
  entries.add(entry)

  if (running) observer?.observe(band)
  else ensureRunning()

  return () => {
    entries.delete(entry)
    visible.delete(entry)
    observer?.unobserve(band)
    if (entries.size === 0) stop()
  }
}
