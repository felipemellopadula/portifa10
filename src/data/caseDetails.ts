import type { L } from '../i18n'

/**
 * GERADO a partir de C:\\Users\\Felipe\\Desktop\\vite-export
 * (src/data/projects.js + projects.pt.js): ficha tecnica, filme do case e as
 * legendas peca a peca, nos dois idiomas.
 */

export type Credit = [L, L]

export type Film = {
  /** Vimeo ou arquivo local: um dos dois. */
  vimeoId?: string
  src?: string
  poster: string
  caption: L
}

export type Shot = {
  image: string
  alt: string
  caption?: L
  span?: 'wide' | 'half' | 'third'
  /** Sem isso a peca aparece em qualquer largura. */
  viewport?: 'desktop' | 'compact'
}

export type CaseDetail = {
  credits: Credit[]
  film?: Film
  shots: Shot[]
}

export const caseDetails: Record<string, CaseDetail> = {
  "the-sandler-clause": {
    credits: [
      [{ en: "CLIENT", pt: "CLIENTE" }, { en: "VERIZON", pt: "VERIZON" }],
      [{ en: "AGENCY", pt: "AGÊNCIA" }, { en: "MIAMI AD SCHOOL BRAZIL", pt: "MIAMI AD SCHOOL BRASIL" }],
      [{ en: "SCOPE", pt: "ESCOPO" }, { en: "INTEGRATED CAMPAIGN + FILM", pt: "CAMPANHA INTEGRADA + FILME" }],
      [{ en: "YEAR", pt: "ANO" }, { en: "2026", pt: "2026" }],
      [{ en: "CREATIVE DIRECTOR", pt: "DIREÇÃO CRIATIVA" }, { en: "FILIPE SANCHES", pt: "FILIPE SANCHES" }],
      [{ en: "ROLE", pt: "FUNÇÃO" }, { en: "CONCEPT / ART DIRECTION", pt: "CONCEITO / DIREÇÃO DE ARTE" }],
      [{ en: "RECOGNITION", pt: "RECONHECIMENTO" }, { en: "ONE SHOW YOUNG ONES 2026 / SEMIFINALIST", pt: "ONE SHOW YOUNG ONES 2026 / SEMIFINALISTA" }],
    ],
    film: {
      vimeoId: "1201113241",
      poster: "/images/cases/sandler-film-poster.webp",
      caption: { en: "CASE FILM / 01:44", pt: "FILME DO CASE / 01:44" },
    },
    shots: [
      {
        image: "/images/cases/sandler-ooh-03.webp",
        alt: "Digital out of home panel reading: Yes. This guy not changing is your contractual guarantee.",
        caption: { en: "“YES. THIS GUY NOT CHANGING IS YOUR CONTRACTUAL GUARANTEE.”", pt: "“SIM. ESSE CARA NÃO MUDAR É A SUA GARANTIA CONTRATUAL.”" },
        span: "half",
      },
      {
        image: "/images/cases/sandler-ooh-01.webp",
        alt: "Digital out of home panel reading: Your contract just put on basketball shorts.",
        caption: { en: "“YOUR CONTRACT JUST PUT ON BASKETBALL SHORTS.”", pt: "“SEU CONTRATO ACABOU DE VESTIR UM SHORT DE BASQUETE.”" },
        span: "half",
      },
      {
        image: "/images/cases/sandler-ooh-02.webp",
        alt: "Digital out of home panel reading: A contractual guarantee inspired by the only guy in Hollywood who did not get the dress code memo.",
        caption: { en: "“A CONTRACTUAL GUARANTEE INSPIRED BY THE ONLY GUY IN HOLLYWOOD WHO DIDN’T GET THE DRESS CODE MEMO.”", pt: "“UMA GARANTIA CONTRATUAL INSPIRADA NO ÚNICO CARA DE HOLLYWOOD QUE NÃO RECEBEU O AVISO SOBRE DRESS CODE.”" },
        span: "wide",
      },
    ],
  },
  "clash-on-hold": {
    credits: [
      [{ en: "CLIENT", pt: "CLIENTE" }, { en: "CLASH OF CLANS / NETFLIX", pt: "CLASH OF CLANS / NETFLIX" }],
      [{ en: "AGENCY", pt: "AGÊNCIA" }, { en: "MIAMI AD SCHOOL BRAZIL", pt: "MIAMI AD SCHOOL BRASIL" }],
      [{ en: "SCOPE", pt: "ESCOPO" }, { en: "OOH CAMPAIGN + FILM", pt: "CAMPANHA OOH + FILME" }],
      [{ en: "YEAR", pt: "ANO" }, { en: "2026", pt: "2026" }],
      [{ en: "CREATIVE DIRECTOR", pt: "DIREÇÃO CRIATIVA" }, { en: "FILIPE SANCHES", pt: "FILIPE SANCHES" }],
      [{ en: "ROLE", pt: "FUNÇÃO" }, { en: "CONCEPT / ART DIRECTION", pt: "CONCEITO / DIREÇÃO DE ARTE" }],
    ],
    film: {
      src: "/videos/videocase-clash-web.mp4",
      poster: "/images/cases/clash-kv.webp",
      caption: { en: "CASE FILM / 01:26", pt: "FILME DO CASE / 01:26" },
    },
    shots: [
      {
        image: "/images/hq/clash1.webp",
        alt: "Billboard in front of an unfinished concrete shell: 32 episodes aired and nothing happened here.",
        caption: { en: "“32 EPISODES AIRED AND NOTHING HAPPENED HERE.”", pt: "“32 EPISÓDIOS NO AR E NADA ACONTECEU AQUI.”" },
        span: "wide",
      },
      {
        image: "/images/hq/clash2.webp",
        alt: "Billboard beside a halted construction site with a stopped crane: Unlike this construction, our characters evolve.",
        caption: { en: "“UNLIKE THIS CONSTRUCTION, OUR CHARACTERS EVOLVE.”", pt: "“DIFERENTE DESTA OBRA, NOSSOS PERSONAGENS EVOLUEM.”" },
        span: "wide",
      },
      {
        image: "/images/hq/clash3.webp",
        alt: "Billboard on a downtown corner in front of a stalled tower, with an endless loading bar: Plenty of time to watch Clash of Clans on Netflix.",
        caption: { en: "“PLENTY OF TIME TO WATCH CLASH OF CLANS ON NETFLIX.” / DOWNTOWN PLACEMENT", pt: "“TEMPO DE SOBRA PARA ASSISTIR CLASH OF CLANS NA NETFLIX.” / PONTO NO CENTRO" },
        span: "wide",
      },
    ],
  },
  "champion-delivery": {
    credits: [
      [{ en: "CLIENT", pt: "CLIENTE" }, { en: "MERCADO LIVRE", pt: "MERCADO LIVRE" }],
      [{ en: "AGENCY", pt: "AGÊNCIA" }, { en: "MIAMI AD SCHOOL BRAZIL", pt: "MIAMI AD SCHOOL BRASIL" }],
      [{ en: "SCOPE", pt: "ESCOPO" }, { en: "INTEGRATED CAMPAIGN", pt: "CAMPANHA INTEGRADA" }],
      [{ en: "YEAR", pt: "ANO" }, { en: "2025", pt: "2025" }],
      [{ en: "CREATIVE DIRECTOR", pt: "DIREÇÃO CRIATIVA" }, { en: "GABRIEL SILVA", pt: "GABRIEL SILVA" }],
      [{ en: "ROLE", pt: "FUNÇÃO" }, { en: "CONCEPT / ART DIRECTION", pt: "CONCEITO / DIREÇÃO DE ARTE" }],
    ],
    shots: [
      {
        image: "/images/opt/entrega1.webp",
        alt: "Airport baggage carousel branded as a Mercado Livre delivery belt",
        caption: { en: "AIRPORT ACTIVATION / THE BAGGAGE BELT TURNED INTO A DELIVERY BELT", pt: "ATIVAÇÃO NO AEROPORTO / A ESTEIRA DE BAGAGEM VIROU ESTEIRA DE ENTREGA" },
        span: "wide",
      },
      {
        image: "/images/faixa_menor.webp",
        alt: "Entrega Campeã embroidered on blue fabric labels",
        caption: { en: "EMBROIDERED TAG / SEWN LIKE A SHIRT LABEL", pt: "ETIQUETA BORDADA / COSTURADA COMO TAG DE CAMISA" },
        span: "wide",
      },
      {
        image: "/images/Instagram.webp",
        alt: "Instagram post about receiving the champion shirt inside the stadium",
        caption: { en: "ANNOUNCEMENT / “IF YOUR TEAM LIFTS THE TROPHY, THE NEW SHIRT REACHES YOU IN THE STANDS”", pt: "ANÚNCIO / “SE O SEU TIME LEVANTAR A TAÇA, A CAMISA NOVA CHEGA ATÉ VOCÊ NA ARQUIBANCADA”" },
        span: "wide",
      },
      {
        image: "/images/telaonovomenor.webp",
        alt: "Stadium screen inviting fans to buy the champion shirt in the Mercado Livre app",
        caption: { en: "STADIUM SCREEN / “GET THE CHAMPION SHIRT WITHOUT LEAVING THE STADIUM”", pt: "TELÃO DO ESTÁDIO / “GARANTA A CAMISA DE CAMPEÃO SEM SAIR DO ESTÁDIO”" },
        span: "wide",
      },
      {
        image: "/images/pushmenor.webp",
        alt: "Phone lock screen with a Mercado Livre push notification releasing the champion shirt",
        caption: { en: "PUSH AT THE FINAL WHISTLE / SHIRT RELEASED", pt: "PUSH NO APITO FINAL / CAMISA LIBERADA" },
        span: "half",
      },
      {
        image: "/images/storiesmenor.webp",
        alt: "Social story reading final whistle, the delivery starts now",
        caption: { en: "SOCIAL / “FINAL WHISTLE. THE DELIVERY STARTS NOW.”", pt: "SOCIAL / “APITO FINAL. A ENTREGA COMEÇA AGORA.”" },
        span: "half",
      },
    ],
  },
  "the-first-ai-fryer": {
    credits: [
      [{ en: "CLIENT", pt: "CLIENTE" }, { en: "PHILIPS WALITA", pt: "PHILIPS WALITA" }],
      [{ en: "AGENCY", pt: "AGÊNCIA" }, { en: "MIAMI AD SCHOOL BRAZIL", pt: "MIAMI AD SCHOOL BRASIL" }],
      [{ en: "SCOPE", pt: "ESCOPO" }, { en: "INTEGRATED CAMPAIGN", pt: "CAMPANHA INTEGRADA" }],
      [{ en: "YEAR", pt: "ANO" }, { en: "2025", pt: "2025" }],
      [{ en: "CREATIVE DIRECTOR", pt: "DIREÇÃO CRIATIVA" }, { en: "GABRIEL SILVA", pt: "GABRIEL SILVA" }],
      [{ en: "ROLE", pt: "FUNÇÃO" }, { en: "ART DIRECTION", pt: "DIREÇÃO DE ARTE" }],
      [{ en: "MEDIA", pt: "MÍDIA" }, { en: "DIGITAL + PRINT", pt: "DIGITAL + IMPRESSO" }],
    ],
    shots: [
      {
        image: "/images/opt/sm01.webp",
        alt: "Sponsored Instagram post inviting the audience to cook with TikTok creators",
        caption: { en: "SOCIAL / COOK WITH THE CREATORS", pt: "SOCIAL / COZINHE COM OS CRIADORES" },
        span: "third",
      },
      {
        image: "/images/opt/sm2.webp",
        alt: "Sponsored Instagram post showing the app suggesting a recipe with AI",
        caption: { en: "SOCIAL / RECIPES BY CREATORS + AI", pt: "SOCIAL / RECEITAS POR CRIADORES + IA" },
        span: "third",
      },
      {
        image: "/images/opt/sm3.webp",
        alt: "Sponsored Instagram post with the AI Fryer turning a simple ingredient into the star",
        caption: { en: "SOCIAL / EVEN CHUCHU BECOMES THE STAR", pt: "SOCIAL / ATÉ O CHUCHU VIRA ESTRELA" },
        span: "third",
      },
      {
        image: "/images/ooh_desk.webp",
        alt: "Out of home panel announcing the first airfryer that speaks Gen Z",
        caption: { en: "OUT OF HOME / THE FIRST AIRFRYER THAT SPEAKS GEN Z", pt: "OUT OF HOME / A PRIMEIRA AIRFRYER QUE FALA GEN Z" },
        span: "wide",
      },
      {
        image: "/images/apps_vert.webp",
        alt: "Phone screens with the AI Fryer app answering with a creator recipe",
        caption: { en: "APP / THE RECIPE ANSWERED IN THE CREATOR'S OWN VOICE", pt: "APP / A RECEITA RESPONDIDA NA VOZ DO PRÓPRIO CRIADOR" },
        span: "wide",
      },
      {
        image: "/images/livro-receitas.webp",
        alt: "AI Fryer recipe book cover: the community favourite recipes, by Philips Walita",
        caption: { en: "RECIPE BOOK / AI, CREATORS AND THE COMMUNITY’S OWN RECIPES, CURATED BY THE PHILIPS WALITA TEAM ON SOCIAL", pt: "LIVRO DE RECEITAS / AI, CREATORS E AS RECEITAS DAS PESSOAS, CURADAS PELA EQUIPE DA PHILIPS WALITA NAS REDES SOCIAIS" },
        span: "wide",
      },
    ],
  },
  "for-big-hungers": {
    credits: [
      [{ en: "CLIENT", pt: "CLIENTE" }, { en: "MCDONALD'S", pt: "MCDONALD'S" }],
      [{ en: "AGENCY", pt: "AGÊNCIA" }, { en: "MIAMI AD SCHOOL BRAZIL", pt: "MIAMI AD SCHOOL BRASIL" }],
      [{ en: "SCOPE", pt: "ESCOPO" }, { en: "PRINT CAMPAIGN", pt: "CAMPANHA IMPRESSA" }],
      [{ en: "YEAR", pt: "ANO" }, { en: "2025", pt: "2025" }],
      [{ en: "CREATIVE DIRECTOR", pt: "DIREÇÃO CRIATIVA" }, { en: "TONI RODRIGUES", pt: "TONI RODRIGUES" }],
      [{ en: "ROLE", pt: "FUNÇÃO" }, { en: "ART DIRECTION", pt: "DIREÇÃO DE ARTE" }],
      [{ en: "MEDIA", pt: "MÍDIA" }, { en: "PRINT", pt: "IMPRESSO" }],
    ],
    shots: [
      {
        image: "/images/cases/2.webp",
        alt: "Big Mac print ad with a red crane lifting a pallet of Big Macs to King Kong outside a McDonald's",
        caption: { en: "PRINT / THE STORE FEEDS IT BY CRANE", pt: "PRINT / THE STORE FEEDS IT BY CRANE" },
        span: "wide",
        viewport: "desktop",
      },
      {
        image: "/images/cases/5.webp",
        alt: "Big Mac print ad with a giant lizard's head at the scaffold as the crew hands over Big Macs",
        caption: { en: "PRINT / SERVED AT EYE LEVEL", pt: "IMPRESSO / A LOJA ALIMENTA DE GUINDASTE" },
        span: "wide",
        viewport: "desktop",
      },
      {
        image: "/images/cases/6.webp",
        alt: "Big Mac print ad with a forklift raising a pallet of Big Macs to a roaring giant lizard",
        caption: { en: "PRINT / RESTOCKING AT THE SAME SCALE", pt: "IMPRESSO / A ESCALA É O ARGUMENTO" },
        span: "wide",
        viewport: "desktop",
      },
      {
        image: "/images/cases/7.webp",
        alt: "Big Mac print ad with a McDonald's helicopter airlifting a tray of Big Macs to King Kong over the city",
        caption: { en: "PRINT / DELIVERY BY AIR", pt: "IMPRESSO / A EQUIPE DA OBRA ANOTA O PEDIDO" },
        span: "wide",
        viewport: "desktop",
      },
      {
        image: "/images/cases/8.webp",
        alt: "Big Mac print ad with King Kong roaring over a downtown McDonald's while the crew feeds him from a scaffold",
        caption: { en: "PRINT / THE WHOLE BLOCK STOPS TO WATCH", pt: "IMPRESSO / SERVIDO NA ALTURA DO OLHO" },
        span: "wide",
        viewport: "desktop",
      },
      {
        image: "/images/cases/9.webp",
        alt: "Big Mac print ad with the crew running ramps of Big Macs up a scaffold to King Kong in the fog",
        caption: { en: "PRINT / A PRODUCTION LINE, NOT A SERVING", pt: "IMPRESSO / REPOSIÇÃO NA MESMA ESCALA" },
        span: "wide",
        viewport: "desktop",
      },
      {
        image: "/images/cases/10.webp",
        alt: "Big Mac print ad with the Big Mac Launcher truck catapulting Big Macs at King Kong in the parking lot",
        caption: { en: "PRINT / THE CREW FEEDS IT BY CATAPULT", pt: "IMPRESSO / ENTREGA PELO AR" },
        span: "wide",
        viewport: "desktop",
      },
      {
        image: "/images/cases/10768.webp",
        alt: "Big Mac print ad with King Kong at a downtown McDonald's as the crowd films the feeding",
        caption: { en: "PRINT / THE WHOLE BLOCK STOPS TO WATCH", pt: "IMPRESSO / A QUADRA INTEIRA PARA PARA VER" },
        span: "wide",
        viewport: "compact",
      },
      {
        image: "/images/cases/11768.webp",
        alt: "Big Mac print ad with a forklift raising a pallet of Big Macs to a roaring giant lizard",
        caption: { en: "PRINT / RESTOCKING AT THE SAME SCALE", pt: "IMPRESSO / UMA LINHA DE PRODUÇÃO, NÃO UMA PORÇÃO" },
        span: "wide",
        viewport: "compact",
      },
      {
        image: "/images/cases/12768.webp",
        alt: "Big Mac print ad with the crew running ramps of Big Macs up a scaffold to King Kong in the fog",
        caption: { en: "PRINT / A PRODUCTION LINE, NOT A SERVING", pt: "IMPRESSO / A EQUIPE ALIMENTA NA CATAPULTA" },
        span: "wide",
        viewport: "compact",
      },
      {
        image: "/images/cases/13768.webp",
        alt: "Big Mac print ad with a giant lizard's head at the scaffold as the crew hands over Big Macs",
        caption: { en: "PRINT / SERVED AT EYE LEVEL", pt: "IMPRESSO / A EQUIPE DA OBRA ANOTA O PEDIDO" },
        span: "wide",
        viewport: "compact",
      },
    ],
  },
  "luxury-is-time": {
    credits: [
      [{ en: "CLIENT", pt: "CLIENTE" }, { en: "AUDI", pt: "AUDI" }],
      [{ en: "PARTNER", pt: "PARCERIA" }, { en: "CARTIER", pt: "CARTIER" }],
      [{ en: "AGENCY", pt: "AGÊNCIA" }, { en: "MIAMI AD SCHOOL BRAZIL", pt: "MIAMI AD SCHOOL BRASIL" }],
      [{ en: "SCOPE", pt: "ESCOPO" }, { en: "INTEGRATED CAMPAIGN", pt: "CAMPANHA INTEGRADA" }],
      [{ en: "YEAR", pt: "ANO" }, { en: "2025", pt: "2025" }],
      [{ en: "CREATIVE DIRECTOR", pt: "DIREÇÃO CRIATIVA" }, { en: "GABRIEL SILVA", pt: "GABRIEL SILVA" }],
      [{ en: "ROLE", pt: "FUNÇÃO" }, { en: "CONCEPT / ART DIRECTION", pt: "CONCEITO / DIREÇÃO DE ARTE" }],
      [{ en: "EDITION", pt: "EDIÇÃO" }, { en: "100 NUMBERED PIECES", pt: "100 PEÇAS NUMERADAS" }],
    ],
    shots: [
      {
        image: "/images/cartier4.webp",
        alt: "The Audi Cartier watch resting on the seat of the A6 e-tron",
        caption: { en: "PRODUCT / THE WATCH AND THE CAR, ONE OBJECT", pt: "PRODUTO / O RELÓGIO E O CARRO, UM OBJETO SÓ" },
        span: "wide",
      },
      {
        image: "/images/mockup-aeroporto-menor.webp",
        alt: "Airport panel with the watch on a branch and the line about living time instead of counting it",
        caption: { en: "AIRPORT / REAL LUXURY ISN'T COUNTING TIME, IT'S KNOWING HOW TO LIVE IT", pt: "AEROPORTO / O VERDADEIRO LUXO NÃO É CONTAR O TEMPO, É SABER VIVÊ-LO" },
        span: "wide",
      },
      {
        image: "/images/oohaudimenor.webp",
        alt: "Digital totem in an airport terminal running the Audi Cartier piece",
        caption: { en: "DOOH / AIRPORT", pt: "DOOH / AEROPORTO" },
        span: "wide",
      },
      {
        image: "/images/cartier7.webp",
        alt: "A wrist wearing the Audi Cartier watch while the A6 e-tron charges in the background",
        caption: { en: "THE WAIT / MEASURED ON THE WRIST", pt: "A ESPERA / MEDIDA NO PULSO" },
        span: "wide",
      },
      {
        image: "/images/cartier8.webp",
        alt: "The Audi Cartier watch in its presentation box",
        caption: { en: "DELIVERY / BOXED FOR THE FIRST OWNERS", pt: "ENTREGA / EMBALADO PARA OS PRIMEIROS DONOS" },
        span: "third",
      },
      {
        image: "/images/cartier9.webp",
        alt: "The Audi Cartier watch held in a hand",
        caption: { en: "PRODUCT / ONE OF ONE HUNDRED", pt: "PRODUTO / UM DE CEM" },
        span: "third",
      },
      {
        image: "/images/cartier10.webp",
        alt: "Macro of the watch dial with the four rings under the Cartier signature",
        caption: { en: "DIAL / THE FOUR RINGS AS A COMPLICATION", pt: "MOSTRADOR / OS QUATRO ANÉIS COMO COMPLICAÇÃO" },
        span: "third",
      },
      {
        image: "/images/cartier5.webp",
        alt: "Hands on the steering wheel of the A6 e-tron wearing the Cartier edition",
        caption: { en: "IN USE / THE DRIVE WEARS IT", pt: "EM USO / QUEM DIRIGE, USA" },
        span: "wide",
      },
      {
        image: "/images/cartier2.webp",
        alt: "Caseback engraved Cartier and Audi, numbered 7 of 100",
        caption: { en: "CASEBACK / NUMBERED, ENGRAVED, SWISS MADE", pt: "FUNDO DA CAIXA / NUMERADO, GRAVADO, SWISS MADE" },
        span: "wide",
      },
    ],
  },
  "no-chance-mustache": {
    credits: [
      [{ en: "CLIENT", pt: "CLIENTE" }, { en: "GILLETTE", pt: "GILLETTE" }],
      [{ en: "AGENCY", pt: "AGÊNCIA" }, { en: "MIAMI AD SCHOOL BRAZIL", pt: "MIAMI AD SCHOOL BRASIL" }],
      [{ en: "SCOPE", pt: "ESCOPO" }, { en: "PRINT CAMPAIGN", pt: "CAMPANHA IMPRESSA" }],
      [{ en: "YEAR", pt: "ANO" }, { en: "2025", pt: "2025" }],
      [{ en: "CREATIVE DIRECTORS", pt: "DIREÇÃO CRIATIVA" }, { en: "RAFAEL BORNA + DANIEL POLETTO", pt: "RAFAEL BORNA + DANIEL POLETTO" }],
      [{ en: "ROLE", pt: "FUNÇÃO" }, { en: "CONCEPT / ART DIRECTION", pt: "CONCEITO / DIREÇÃO DE ARTE" }],
      [{ en: "MEDIA", pt: "MÍDIA" }, { en: "PRINT", pt: "IMPRESSO" }],
    ],
    shots: [
      {
        image: "/images/gilletteE.webp",
        alt: "Man in a barber chair sweating as a razor is held up and his braided mustache tips surrender",
        caption: { en: "PRINT / THE BARBER CHAIR", pt: "IMPRESSO / A CADEIRA DE BARBEIRO" },
        span: "wide",
      },
      {
        image: "/images/gilletteD.webp",
        alt: "Man in a white bathroom screaming while his mustache tips go up as two hands in front of a safety razor",
        caption: { en: "PRINT / NO WAY OUT OF THE BATHROOM", pt: "IMPRESSO / SEM SAÍDA NO BANHEIRO" },
        span: "wide",
      },
      {
        image: "/images/gilletteF.webp",
        alt: "Man in a dark alley with both his own hands and his mustache tips raised in surrender to a Gillette razor",
        caption: { en: "PRINT / HOLD-UP IN THE ALLEY", pt: "IMPRESSO / ASSALTO NO BECO" },
        span: "wide",
      },
      {
        image: "/images/gilletteI.webp",
        alt: "Man in a beanie on a night street, mustache tips raised as hands while a razor is pointed at him",
        caption: { en: "PRINT / NOWHERE TO RUN", pt: "IMPRESSO / SEM PARA ONDE CORRER" },
        span: "wide",
      },
      {
        image: "/images/gilletteG.webp",
        alt: "Man backed against a bedroom wall as an electric shaver approaches and his mustache surrenders",
        caption: { en: "PRINT / CORNERED AT HOME", pt: "IMPRESSO / ENCURRALADO EM CASA" },
        span: "wide",
      },
      {
        image: "/images/gilletteH.webp",
        alt: "Man on a sofa with a trimmer held to his chin and his mustache tips raised in surrender",
        caption: { en: "PRINT / THE LAST NEGOTIATION", pt: "IMPRESSO / A ÚLTIMA NEGOCIAÇÃO" },
        span: "wide",
      },
      {
        image: "/images/gilletteB.webp",
        alt: "Man with dreadlocks and a braided mustache whose tips have become two hands raised in surrender above a Gillette razor",
        caption: { en: "PRINT / NO CHANCE, MUSTACHE", pt: "IMPRESSO / SEM CHANCE, BIGODE" },
        span: "wide",
      },
    ],
  },
  "from-the-amazon": {
    credits: [
      [{ en: "CLIENT", pt: "CLIENTE" }, { en: "AMAZÔNIA TROPICAL BLENDS", pt: "AMAZÔNIA TROPICAL BLENDS" }],
      [{ en: "STUDIO", pt: "ESTÚDIO" }, { en: "HÉRCULES 3D ESTÚDIO", pt: "HÉRCULES 3D ESTÚDIO" }],
      [{ en: "SCOPE", pt: "ESCOPO" }, { en: "3D PACKAGING + PRINT", pt: "EMBALAGEM 3D + IMPRESSO" }],
      [{ en: "YEAR", pt: "ANO" }, { en: "2024", pt: "2024" }],
      [{ en: "ROLE", pt: "FUNÇÃO" }, { en: "ART DIRECTION / 3D", pt: "DIREÇÃO DE ARTE / 3D" }],
      [{ en: "MEDIA", pt: "MÍDIA" }, { en: "OOH + PRINT", pt: "OOH + IMPRESSO" }],
    ],
    shots: [
      {
        image: "/images/comp2menor.webp",
        alt: "Full Água de Coco Amazônia packaging range rendered in 3D",
        caption: { en: "3D / THE PACKAGING RANGE BUILT FROM SCRATCH", pt: "3D / A LINHA DE EMBALAGENS CONSTRUÍDA DO ZERO" },
        span: "wide",
      },
      {
        image: "/images/opt/am12.webp",
        alt: "Bus shelter panel where the three Amazônia packs sit inside a tropical illustrated scene",
        caption: { en: "SCENE / THE PACK BUILT INTO THE LANDSCAPE", pt: "CENA / O PACK CONSTRUÍDO DENTRO DA PAISAGEM" },
        span: "wide",
      },
      {
        image: "/images/opt/am10.webp",
        alt: "Highway billboard with the toucan key visual and the new packaging",
        caption: { en: "OOH / THE PACK AT BILLBOARD SCALE", pt: "OOH / O PACK EM ESCALA DE OUTDOOR" },
        span: "wide",
      },
      {
        image: "/images/Paris_desk.webp",
        alt: "Paris street panel running the Água de Coco Amazônia campaign",
        caption: { en: "OOH / FROM BRAZIL TO THE WORLD, IN PARIS", pt: "OOH / DO BRASIL PARA O MUNDO, EM PARIS" },
        span: "wide",
      },
      {
        image: "/images/am.webp",
        alt: "Água de Coco Amazônia campaign key visual",
        caption: { en: "KEY VISUAL / ÁGUA DE COCO AMAZÔNIA", pt: "KEY VISUAL / ÁGUA DE COCO AMAZÔNIA" },
        span: "wide",
      },
    ],
  },
  "nature-asks-for-help": {
    credits: [
      [{ en: "CLIENT", pt: "CLIENTE" }, { en: "YOURBAN2030", pt: "YOURBAN2030" }],
      [{ en: "AGENCY", pt: "AGÊNCIA" }, { en: "MAGLA CREATIVE AGENCY LA", pt: "MAGLA CREATIVE AGENCY LA" }],
      [{ en: "SCOPE", pt: "ESCOPO" }, { en: "SOCIAL MEDIA", pt: "MÍDIA SOCIAL" }],
      [{ en: "YEAR", pt: "ANO" }, { en: "2024", pt: "2024" }],
      [{ en: "ROLE", pt: "FUNÇÃO" }, { en: "ART DIRECTION", pt: "DIREÇÃO DE ARTE" }],
      [{ en: "MEDIA", pt: "MÍDIA" }, { en: "DIGITAL", pt: "DIGITAL" }],
    ],
    shots: [
      {
        image: "/images/opt/sos6.webp",
        alt: "Phone in hand showing the Yourban2030 post with the islands spelling SOS",
        caption: { en: "SOCIAL / THE SIGNAL IN THE FEED", pt: "SOCIAL / O SINAL NO FEED" },
        span: "wide",
      },
      {
        image: "/images/sos3menor.webp",
        alt: "Underwater photograph where floating waste forms the letters SOS below the surface",
        caption: { en: "AERIAL / NO RETOUCHING, NO EXAGGERATION", pt: "AÉREA / SEM TRATAMENTO, SEM EXAGERO" },
        span: "wide",
      },
      {
        image: "/images/opt/sos5.webp",
        alt: "Phone in hand showing the underwater SOS post on the Yourban2030 feed",
        caption: { en: "SOCIAL / THE SAME WARNING, SCROLLED PAST DAILY", pt: "SOCIAL / O MESMO AVISO, IGNORADO TODO DIA" },
        span: "wide",
      },
      {
        image: "/images/opt/sos9.webp",
        alt: "Aerial photograph of floating plastic waste arranged into a giant SOS on green water",
        caption: { en: "AERIAL / THE LETTERS THE OCEAN WAS ALREADY HOLDING", pt: "AÉREA / AS LETRAS QUE O OCEANO JÁ SEGURAVA" },
        span: "wide",
      },
      {
        image: "/images/opt/sos7.webp",
        alt: "Phone in hand showing the plastic SOS post on the Yourban2030 feed",
        caption: { en: "SOCIAL / THE SIGNAL CLOSES WHERE PEOPLE LIVE", pt: "SOCIAL / O SINAL FECHA ONDE AS PESSOAS VIVEM" },
        span: "wide",
      },
    ],
  },
  "sound-you-can-see": {
    credits: [
      [{ en: "CLIENT", pt: "CLIENTE" }, { en: "SKOL BEATS", pt: "SKOL BEATS" }],
      [{ en: "AGENCY", pt: "AGÊNCIA" }, { en: "PERSONAL PROJECT", pt: "PROJETO PESSOAL" }],
      [{ en: "SCOPE", pt: "ESCOPO" }, { en: "OOH + PRINT", pt: "OOH + IMPRESSO" }],
      [{ en: "YEAR", pt: "ANO" }, { en: "2025", pt: "2025" }],
      [{ en: "ROLE", pt: "FUNÇÃO" }, { en: "ART DIRECTION", pt: "DIREÇÃO DE ARTE" }],
      [{ en: "MEDIA", pt: "MÍDIA" }, { en: "OOH", pt: "OOH" }],
    ],
    shots: [
      {
        image: "/images/opt/skol5.webp",
        alt: "Giant Skol Beats panel lit in neon at a festival, the crowd and the stage behind it",
        caption: { en: "OOH / THE PANEL LIT LIKE THE STAGE", pt: "OOH / O PAINEL ACESO COMO O PALCO" },
        span: "wide",
      },
      {
        image: "/images/beats_vert.webp",
        alt: "Vertical Skol Beats print piece using the pulse as layout",
        caption: { en: "PRINT / THE PULSE AS LAYOUT", pt: "IMPRESSO / O PULSO COMO LAYOUT" },
        span: "wide",
      },
      {
        image: "/images/beats6.webp",
        alt: "Skol Beats out of home panel closing the campaign",
        caption: { en: "OOH / THE BRAND AS PART OF THE SHOW", pt: "OOH / A MARCA COMO PARTE DO SHOW" },
        span: "wide",
      },
    ],
  },
}
