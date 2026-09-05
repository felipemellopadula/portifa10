/**
 * Assinatura do site. O nome inteiro leva um deslocamento estatico de ruido
 * (a borda "xerocada"), e so as duas letras finais recebem o mesmo filtro com
 * a seed animada em passos — o "boil" em loop da referencia, que la era um GIF.
 */
export default function Wordmark({ onHome }: { onHome?: () => void }) {
  return (
    <a
      className="wordmark"
      href="#top"
      aria-label="Felipe M Padula, Art Director"
      onClick={(e) => {
        if (onHome) {
          e.preventDefault()
          onHome()
        }
      }}
    >
      <span className="wm-first" aria-hidden="true">
        FELIPE M
      </span>
      <span className="wm-last" aria-hidden="true">
        PADU
        <span className="wm-tail">
          <span className="wm-boil">LA</span>
          <span className="wm-role">
            ART
            <br />
            DIRECTOR
          </span>
        </span>
      </span>
    </a>
  )
}

/** Filtros SVG usados pela assinatura. Montado uma unica vez no App. */
export function WordmarkFilters() {
  return (
    <svg className="wm-defs" aria-hidden="true" focusable="false">
      <defs>
        {/* Borda irregular fixa, aplicada no nome inteiro. */}
        <filter id="fmp-rough" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9 0.65"
            numOctaves="2"
            seed="7"
            result="grain"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="grain"
            scale="1.6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Mesma borda, mas com a seed trocando em passos: o loop das letras finais. */}
        <filter id="fmp-boil" x="-14%" y="-14%" width="128%" height="128%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75 0.55"
            numOctaves="2"
            seed="1"
            result="grain"
          >
            <animate
              attributeName="seed"
              values="1;4;9;2;13;6;17;3;11;8;15;5"
              dur="1s"
              calcMode="discrete"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="grain"
            scale="9"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}
