import type { L, Lang } from '../i18n'

export type Work = {
  id: string
  number: string
  /** Titulo e cliente sao nomes proprios: em regra nao traduzem. */
  title: string
  /** Excecao: titulo que e frase, e por isso ganha versao em portugues. */
  titlePt?: string
  client: string
  year: string
  discipline: L
  tagline: L
  lead: L
  /** Rotulo do botao. Sem isso, cai no padrao "See the Case". */
  cta?: L
  /** Cor da faixa que aparece atras do case na home. */
  accent: string
  /** Cor do texto sobre a faixa quando o accent e claro. */
  ink?: string
  cover: string
  /** Corte vertical da capa parada: vale ate 1024px, celular e iPad. */
  coverMobile?: string
  coverVideo?: string
  /** Corte vertical: vale ate 1024px, ou seja, celular e iPad. */
  coverVideoMobile?: string
}

/**
 * O titulo do trabalho no idioma da vez. Pode trazer `\n`, que e quebra de
 * linha desenhada — quem renderiza e o WorkTitle.
 */
export function workTitle(work: Work, lang: Lang): string {
  return lang === 'pt' && work.titlePt ? work.titlePt : work.title
}

/** O mesmo titulo em uma linha so: alt, aria-label e titulo da aba. */
export function workTitleText(work: Work, lang: Lang): string {
  return workTitle(work, lang).replace(/\n/g, ' ')
}

const INTEGRATED: L = { en: 'Integrated Campaign', pt: 'Campanha Integrada' }
const OOH: L = { en: 'OOH Campaign', pt: 'Campanha de OOH' }
const PRINT: L = { en: 'Print Campaign', pt: 'Campanha Impressa' }

export const works: Work[] = [
  {
    id: 'the-sandler-clause',
    number: '01',
    title: 'The Sandler Clause',
    titlePt: 'A Cláusula Sandler',
    client: 'Verizon',
    discipline: INTEGRATED,
    year: '2026',
    tagline: {
      en: 'If Adam Sandler changes, the Verizon plan is free.',
      pt: 'Se o Adam Sandler mudar, o plano da Verizon sai de graça.',
    },
    lead: {
      en: 'Gen Z no longer believes carrier promises. Best plan, best price: it all turned into background noise. The pattern is always the same, prices that go up out of nowhere, contracts full of fine print and an unpleasant surprise waiting somewhere along the way. If people no longer trust contracts, maybe they will trust someone who never changes. So Verizon wrote the first contract to legally incorporate the Sandler Clause: as long as Adam Sandler stays Adam Sandler, same look, same attitude, same essence, the plan does not change either.',
      pt: 'A Gen Z não acredita mais em promessa de operadora. Melhor plano, melhor preço: virou tudo ruído de fundo. O padrão é sempre o mesmo, preços que sobem do nada, contratos cheios de letras miúdas e uma surpresa desagradável esperando no meio do caminho. Se as pessoas não confiam mais em contrato, talvez confiem em alguém que nunca muda. Então a Verizon escreveu o primeiro contrato a incorporar juridicamente a Sandler Clause: enquanto o Adam Sandler continuar sendo o Adam Sandler, mesmo visual, mesma atitude, mesma essência, o plano também não muda.',
    },
    accent: '#101010',
    cover: '/images/opt/sandler-clause-poster.webp',
    coverVideo: '/videos/sandler-loop.mp4',
  },
  {
    id: 'clash-on-hold',
    number: '02',
    title: 'Clash on Hold',
    client: 'Clash of Clans',
    discipline: OOH,
    year: '2026',
    tagline: {
      en: 'Clash goes to the cities and leaves messages for local authorities.',
      pt: 'Clash vai às cidades e deixa recados para os governantes.',
    },
    lead: {
      en: 'Clash of Clans landed on Netflix. In the game an upgrade takes days, and every player has learned to wait for it. Outside the game, some buildings have been waiting for decades. The campaign simply put the two waits next to each other.',
      pt: 'Clash of Clans chegou à Netflix. No jogo, um upgrade leva dias, e todo jogador aprendeu a esperar. Fora do jogo, tem obra parada há décadas. A campanha simplesmente colocou as duas esperas lado a lado.',
    },
    accent: '#C2410C',
    cover: '/images/cases/clash-kv.webp',
    coverVideo: '/videos/clash-loop.mp4',
  },
  {
    id: 'champion-delivery',
    number: '03',
    title: 'Champion Delivery',
    titlePt: 'Entrega Campeã',
    client: 'Mercado Livre',
    discipline: INTEGRATED,
    year: '2025',
    tagline: {
      en: 'The champion shirt, delivery still inside the stadium.',
      pt: 'A camisa do campeão entregue ainda no estádio.',
    },
    lead: {
      en: 'Copa Libertadores final, Lima. Minutes after the trophy goes up, the champion shirt is on sale everywhere. The only people who cannot have it are the ones in the stands. Entrega Campea put the delivery inside the stadium.',
      pt: 'Final da Libertadores, Lima. Minutos depois de a taça subir, a camisa do campeão já está à venda em todo lugar. Os únicos que não conseguem são justamente os que estão na arquibancada. A Entrega Campeã levou a entrega para dentro do estádio.',
    },
    accent: '#FFE600',
    ink: '#101010',
    cover: '/images/aberturamenor2.webp',
    coverVideo: '/videos/ml_capa.mp4',
    coverVideoMobile: '/videos/ml_capa_mobile.mp4',
  },
  {
    id: 'the-first-ai-fryer',
    number: '04',
    title: 'AI Fryer',
    client: 'Philips Walita',
    discipline: INTEGRATED,
    year: '2025',
    tagline: {
      en: 'An airfryer that speaks Gen Z.',
      pt: 'Uma airfryer que fala a língua da Gen Z.',
    },
    lead: {
      en: 'Gen Z wants food that is fast, healthy and worth posting. Philips Walita had the appliance but not the language. The first AI Fryer connects the kitchen to artificial intelligence and to the repertoire of three TikTok food creators.',
      pt: 'A Gen Z quer comida rápida, saudável e que valha um post. A Philips Walita tinha o produto, mas não tinha a linguagem. A primeira AI Fryer conecta a cozinha à inteligência artificial e ao repertório de três creators de comida do TikTok.',
    },
    accent: '#0B5FFF',
    cover: '/images/opt/kv04.webp',
  },
  {
    id: 'for-big-hungers',
    number: '05',
    title: 'For Big Hungers',
    titlePt: 'Para grandes fomes',
    client: 'McDonalds',
    discipline: PRINT,
    year: '2025',
    tagline: {
      en: 'When hunger becomes a monster.',
      pt: 'Quando a fome vira um monstro.',
    },
    lead: {
      en: 'The Big Mac is the most recognisable sandwich on the planet. To prove it handles any kind of hunger, we put it against hungers everybody already knows by heart: giant characters from global pop culture, drawn at a scale that makes the point before the headline does.',
      pt: 'O Big Mac é o sanduíche mais reconhecível do planeta. Para provar que ele dá conta de qualquer fome, colocamos o produto contra fomes que todo mundo já conhece de cor: personagens gigantes da cultura pop, desenhados numa escala que entrega a ideia antes do título.',
    },
    accent: '#DA291C',
    cover: '/images/03mc.webp',
    coverMobile: '/images/01mc_mobile.webp',
  },
  {
    id: 'luxury-is-time',
    number: '06',
    title: 'Time is the Greatest Luxury',
    titlePt: 'O Tempo é o maior\ndos Luxos',
    client: 'Audi A6 e-tron',
    discipline: INTEGRATED,
    year: '2025',
    tagline: {
      en: 'A collab between two absolute icons of luxury.',
      pt: 'Uma collab entre dois ícones absolutos do luxo.',
    },
    lead: {
      en: 'Electric launches argue about minutes, as if the time the car spends plugged in were a defect to apologise for. Audi launched the A6 e-tron in Brazil with the opposite argument: at this level, time is not something you shorten. It is something you own.',
      pt: 'Lançamentos elétricos discutem minutos, como se o tempo que o carro passa na tomada fosse um defeito a ser justificado. A Audi lançou o A6 e-tron no Brasil com o argumento oposto: nesse nível, tempo não é algo que se encurta. É algo que se possui.',
    },
    accent: '#141416',
    cover: '/images/capa_audi.webp',
    coverVideo: '/videos/audi_capa.mp4',
    coverVideoMobile: '/videos/capa_audi_mobile.mp4',
  },
  {
    id: 'no-chance-mustache',
    number: '07',
    title: 'No Chance, Mustache',
    titlePt: 'Zero Chances\npara o Bigode',
    client: 'Gillette',
    discipline: PRINT,
    year: '2025',
    tagline: {
      en: 'The mustache is the first to surrender.',
      pt: 'O bigode é o primeiro a se render.',
    },
    lead: {
      en: 'A print campaign built on a single visual satire: the tips of the mustache curl into two tiny hands, raised in surrender the second the blade comes close. No demo, no promise about how many blades it has. Just a mustache that already knows how this ends.',
      pt: 'Uma campanha impressa construída sobre uma única sátira visual: as pontas do bigode viram duas mãozinhas, erguidas em rendição no segundo em que a lâmina se aproxima. Sem demo, sem promessa de quantas lâminas tem. Só um bigode que já sabe como isso termina.',
    },
    accent: '#0A3D91',
    cover: '/images/gilletteA.webp',
  },
  {
    id: 'from-the-amazon',
    number: '08',
    title: 'From Brazil to the World',
    titlePt: 'Do Brasil para o Mundo',
    client: 'Amazonia Coconut Water',
    discipline: { en: '3D Packaging + Print', pt: 'Packaging 3D + Impresso' },
    year: '2024',
    tagline: {
      en: 'New packaging, street size.',
      pt: 'Nova embalagem, pronta para ganhar as ruas do mundo.',
    },
    lead: {
      en: 'Agua de Coco Amazonia redesigned its packaging and needed a launch as considered as the design itself. Instead of photographing the pack, we built it: full 3D visualisation taken to out of home, so the new identity met people at the scale of a building.',
      pt: 'A Água de Coco Amazônia redesenhou sua embalagem e precisava de um lançamento tão cuidadoso quanto o próprio design. Em vez de fotografar o pack, nós o construímos: visualização 3D completa levada para a mídia exterior, para a nova identidade encontrar as pessoas na escala de um prédio.',
    },
    accent: '#1D6B3A',
    cover: '/images/opt/Am.webp',
    coverMobile: '/images/amazonia_mobile.webp',
  },
  {
    id: 'nature-asks-for-help',
    number: '09',
    title: 'Nature Asks for Help',
    titlePt: 'A Natureza pede Socorro',
    client: 'Yourban2030',
    discipline: { en: 'Social Media', pt: 'Social Media' },
    year: '2024',
    tagline: {
      en: 'Illustrations with signs from Nature.',
      pt: 'Ilustrações com sinais da Natureza.',
    },
    lead: {
      en: 'Yourban2030 needed a climate message nobody could dismiss as an art director trick. So we read aerial photography instead of retouching it, and found natural formations that already draw the universal distress signal. Nothing was added. The warning was there.',
      pt: 'A Yourban2030 precisava de uma mensagem climática que ninguém pudesse descartar como truque de diretor de arte. Então lemos a fotografia aérea em vez de retocá-la, e encontramos formações naturais que já desenham o sinal universal de socorro. Nada foi acrescentado. O aviso já estava lá.',
    },
    accent: '#1F4E5F',
    cover: '/images/sos_capa.webp',
    coverMobile: '/images/sos_mobile.webp',
  },
  {
    id: 'sound-you-can-see',
    number: '10',
    title: 'Every Vibe Has a Flavor',
    titlePt: 'Toda Vibe tem um Sabor',
    client: 'Skol Beats',
    discipline: OOH,
    year: '2025',
    tagline: {
      en: 'We turn good vibes into the official drink of music festivals.',
      pt: 'Transformamos boas vibrações na bebida oficial dos Festivais de Música.',
    },
    lead: {
      en: 'At a festival a brand is competing with the stage. Skol Beats went to out of home with a campaign that translates sound into image: vibrant panels, pulsing colour and an aesthetic borrowed from the music itself.',
      pt: 'Num festival, a marca compete com o palco. A Skol Beats foi para a mídia exterior com uma campanha que traduz som em imagem: painéis vibrantes, cor pulsando e uma estética emprestada da própria música.',
    },
    accent: '#6D28D9',
    cover: '/images/beats5.webp',
  },
]
