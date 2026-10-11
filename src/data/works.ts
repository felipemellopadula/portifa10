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
  /** O problema que o briefing trouxe. So aparece em case com `interleave`. */
  problem?: L
  /** A verdade por tras da campanha: coluna da esquerda no case. */
  insight: L
  /** O que foi feito com essa verdade: coluna da direita no case. */
  idea: L
  /** Como a ideia ganha a imprensa. So aparece em case com `interleave`. */
  pr?: L
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
const ACTIVATION: L = { en: 'Brand Activation', pt: 'Ativação de Marca' }

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
    insight: {
      en: 'Gen Z stopped believing carrier promises a long time ago. Best plan, best price: background noise. The pattern never changes. Prices climb out of nowhere, contracts come full of fine print, and an unpleasant surprise waits somewhere down the line. If nobody trusts a contract anymore, maybe they will trust someone famous for never changing.',
      pt: 'A Gen Z parou de acreditar em promessa de operadora faz tempo. Melhor plano, melhor preço: ruído de fundo. O padrão nunca muda. O preço sobe do nada, o contrato vem cheio de letra miúda e uma surpresa desagradável espera no meio do caminho. Se ninguém confia mais em contrato, talvez confie em alguém conhecido por nunca mudar.',
    },
    idea: {
      en: 'We turned Adam Sandler into a contractual clause. Verizon wrote the Sandler Clause into its plans: as long as Adam Sandler stays Adam Sandler, same hoodie, same shorts, same attitude, same essence, the plan does not change either. And the day he changes, the plan is free.',
      pt: 'Transformamos o Adam Sandler em cláusula contratual. A Verizon escreveu a Cláusula Sandler nos seus planos: enquanto o Adam Sandler continuar sendo o Adam Sandler, mesmo moletom, mesmo short, mesma atitude, mesma essência, o plano também não muda. E no dia em que ele mudar, o plano sai de graça.',
    },
    accent: '#101010',
    cover: '/images/opt/sandler-clause-poster.webp',
    coverVideo: '/videos/sandler-loop.mp4',
  },
  {
    id: 'the-miracle-store',
    number: '02',
    title: 'The Miracle Store',
    titlePt: 'Loja Milagrosa',
    client: 'Cif',
    discipline: ACTIVATION,
    year: '2026',
    tagline: {
      en: 'Cif announces sneakers that look as good as new at Rock in Rio.',
      pt: 'Cif anuncia tênis usados como se fossem novos no Rock in Rio.',
    },
    problem: {
      en: 'After a whole day of walking around and getting trampled at a music festival, your sneakers end up dirtier than the lead singer of a punk band.',
      pt: 'Depois de um dia andando e sendo pisoteado num festival de música, seu tênis fica mais sujo que vocal de banda punk.',
    },
    insight: {
      en: 'Cif has an impressive cleaning power that works on more than 100 surfaces, sneakers included, leaving them looking brand new. What if the brand advertised sneakers cleaned with Cif as if they were new?',
      pt: 'Cif tem um poder de limpeza impressionante, que limpa mais de 100 superfícies, inclusive tênis, deixando-os como se fossem novos. E se a marca anunciasse tênis limpos com Cif como se fossem novos?',
    },
    idea: {
      en: 'During the first week of Rock in Rio, we will buy filthy sneakers from people who spent the whole day at the festival. In the second week, we will open the Miracle Store at the festival: a sneaker store with modest prices between R$10 and R$30. At first glance, anyone walking past will be stopped in their tracks by these miraculous prices. But the moment someone says they want to buy a pair, we reveal the truth: the price on the tag is actually the price of a Cif. The price of having “new” sneakers, all over again. If they still want that pair, they can buy it. But to get your own sneakers brand new, just buy Cif and clean the ones you already have.',
      pt: 'Na primeira semana do Rock in Rio, vamos comprar tênis mega sujos de uma galera que passou o dia todo por lá. Na segunda semana, vamos lançar no festival a Loja Milagrosa: uma loja de tênis a preços módicos, entre R$10,00 e R$30,00. À primeira vista, quem passar na frente da loja vai ficar impactado por esses preços milagrosos. Mas, no momento em que a pessoa falar que quer comprar aquele tênis, a gente revela: o valor anunciado é, na verdade, o valor de um Cif. O preço para se ter um tênis “novo”, de novo. Caso a pessoa ainda queira comprar aquele, ela também pode. Mas, pra ter o seu próprio tênis novo, é só comprar Cif e limpar o que você já tem.',
    },
    pr: {
      en: 'We will bring in Marcos Mion, a card-carrying sneakerhead, to spread the word about the activation at Rock in Rio. He will show off a special sneaker-cleaning service at the store and tell customers that every pair on sale there is actually used. That is how we show the public what it costs to have new sneakers, all over again. The whole activation will be filmed and cut into videos for social, where we will see customers react as they find out the sneakers in the store are used.',
      pt: 'Chamaremos Marcos Mion, um sneakerhead de carteirinha, para divulgar essa ativação no Rock in Rio. Ele mostrará um serviço especial de limpeza de tênis na ativação, além de contar para os clientes que todos os tênis anunciados ali, na verdade, são usados. Assim, mostramos para o público quanto custa ter um tênis novo, de novo. Toda a ativação será captada e transformada em vídeo para as redes, onde veremos a reação dos clientes ao descobrirem que os tênis da loja são usados.',
    },
    accent: '#0B5A2B',
    cover: '/images/cases/miracle-cover.webp',
    coverMobile: '/images/cases/miracle-cover-mobile.webp',
    coverVideo: '/videos/friends_cif_1920.mp4',
    coverVideoMobile: '/videos/friends_cif_1080.mp4',
  },
  {
    id: 'clash-on-hold',
    number: '03',
    title: 'Clash on Hold',
    client: 'Clash of Clans',
    discipline: OOH,
    year: '2026',
    tagline: {
      en: 'Clash went to the cities and left messages for the authorities.',
      pt: 'O Clash foi às cidades e deixou recados para os governantes.',
    },
    insight: {
      en: 'Much of Clash of Clans’ appeal revolves around building. Think about real-life projects that feel like they’re perpetually under construction. What if we surface that idea, this endless building, to promote our game?',
      pt: 'Boa parte da graça de Clash of Clans gira em torno de construir. Pense nas obras da vida real que parecem estar perpetuamente em construção. E se a gente trouxesse essa ideia à tona, essa construção sem fim, para divulgar o nosso jogo?',
    },
    idea: {
      en: 'We will put billboards in front of unfinished construction sites with Clash of Clans ads. The idea is to subtly provoke public authorities to finish these projects, all while promoting our game.',
      pt: 'Vamos colocar outdoors em frente a obras inacabadas com anúncios de Clash of Clans. A ideia é provocar sutilmente o poder público a terminar essas obras, tudo isso enquanto divulgamos o nosso jogo.',
    },
    accent: '#C2410C',
    cover: '/images/cases/clash-kv.webp',
    coverVideo: '/videos/clash-loop.mp4',
  },
  {
    id: 'champion-delivery',
    number: '04',
    title: 'Champion Delivery',
    titlePt: 'Entrega Campeã',
    client: 'Mercado Livre',
    discipline: INTEGRATED,
    year: '2025',
    tagline: {
      en: 'The champion shirt, delivery still inside the stadium.',
      pt: 'A camisa do campeão entregue ainda no estádio.',
    },
    insight: {
      en: 'Minutes after the trophy goes up, the champion jersey is on sale everywhere. The only people who cannot get their hands on it are the ones who were actually there. The fans in the stands, still celebrating.',
      pt: 'Minutos depois de a taça subir, a camisa do campeão já está à venda em todo lugar. Os únicos que não conseguem colocar a mão nela são justamente quem estava lá. O torcedor na arquibancada, ainda comemorando.',
    },
    idea: {
      en: 'To prove no one delivers faster, Mercado Livre, the official sponsor of the Copa Libertadores, will deliver the champions’ jersey inside the stadium right after the final whistle.',
      pt: 'Para provar que ninguém entrega mais rápido, o Mercado Livre, patrocinador oficial da Copa Libertadores da América, vai entregar a camisa de campeão dentro do estádio logo após o apito final.',
    },
    accent: '#FFE600',
    ink: '#101010',
    cover: '/images/aberturamenor2.webp',
    coverVideo: '/videos/ml_capa.mp4',
    coverVideoMobile: '/videos/ml_capa_mobile.mp4',
  },
  {
    id: 'the-first-ai-fryer',
    number: '05',
    title: 'AI Fryer',
    client: 'Philips Walita',
    discipline: INTEGRATED,
    year: '2025',
    tagline: {
      en: 'An airfryer that speaks Gen Z.',
      pt: 'Uma airfryer que fala a língua da Gen Z.',
    },
    insight: {
      en: 'Gen Z does not cook from recipes, it cooks from the feed. What decides dinner is not a cookbook, it is whatever a creator posted that afternoon. Fast, healthy and worth filming. Philips Walita had the appliance. It did not have the language.',
      pt: 'A Gen Z não cozinha a partir de receitas, cozinha a partir do feed. Quem decide o jantar não é o livro de receitas, é o que um creator postou naquela tarde. Rápido, saudável e que valha um vídeo. A Philips Walita tinha o produto. Não tinha a linguagem.',
    },
    idea: {
      en: 'The first AI Fryer: an airfryer with artificial intelligence trained on the repertoire of three TikTok food creators. It reads what is already in the kitchen, suggests the dish and cooks it speaking the same language as the feed.',
      pt: 'A primeira AI Fryer: uma airfryer com inteligência artificial treinada no repertório de três creators de comida do TikTok. Ela lê o que já tem na cozinha, sugere o prato e prepara falando a mesma língua do feed.',
    },
    accent: '#0B5FFF',
    cover: '/images/opt/kv04.webp',
  },
  {
    id: 'for-big-hungers',
    number: '06',
    title: 'For Big Hungers',
    titlePt: 'Para grandes fomes',
    client: 'McDonalds',
    discipline: PRINT,
    year: '2025',
    tagline: {
      en: 'When hunger becomes a monster.',
      pt: 'Quando a fome vira um monstro.',
    },
    insight: {
      en: 'Nobody knows how to measure a hunger. But everybody knows how to measure a monster: pop culture spent decades teaching the whole planet exactly how big King Kong is. So the size of the appetite could be borrowed instead of explained.',
      pt: 'Ninguém sabe medir uma fome. Mas todo mundo sabe medir um monstro: a cultura pop passou décadas ensinando o planeta inteiro qual é exatamente o tamanho do King Kong. Ou seja, o tamanho do apetite podia ser emprestado em vez de explicado.',
    },
    idea: {
      en: 'A print campaign that puts the Big Mac against hungers everyone already knows by heart. Giant characters from global pop culture, drawn at a scale that delivers the idea before the headline does.',
      pt: 'Uma campanha impressa que coloca o Big Mac contra fomes que todo mundo já conhece de cor. Personagens gigantes da cultura pop, desenhados numa escala que entrega a ideia antes do título.',
    },
    accent: '#DA291C',
    cover: '/images/03mc.webp',
    coverMobile: '/images/01mc_mobile.webp',
  },
  {
    id: 'luxury-is-time',
    number: '07',
    title: 'Time is the Greatest Luxury',
    titlePt: 'O Tempo é o maior\ndos Luxos',
    client: 'Audi A6 e-tron',
    discipline: INTEGRATED,
    year: '2025',
    tagline: {
      en: 'A collab between two absolute icons of luxury.',
      pt: 'Uma collab entre dois ícones absolutos do luxo.',
    },
    insight: {
      en: 'For people who can already buy almost anything, luxury stopped being about objects. At that level the only thing still genuinely scarce is time. An hour that belongs to nobody else is the rarest thing money can buy, and the one purchase that never goes on sale.',
      pt: 'Para quem já pode comprar quase tudo, luxo deixou de ser objeto. Nesse nível, a única coisa realmente escassa é tempo. Uma hora que não pertence a mais ninguém é a coisa mais rara que o dinheiro compra, e a única que nunca entra em promoção.',
    },
    idea: {
      en: 'To mark the launch of the new Audi A6 e-tron, a collab between two icons of luxury: Audi and Cartier watches. Two brands that have always sold the same thing, together to say out loud that time is the greatest luxury of all.',
      pt: 'Para marcar o lançamento do novo Audi A6 e-tron, uma collab entre duas marcas icônicas do luxo: a Audi e os relógios Cartier. Duas marcas que sempre venderam a mesma coisa, juntas para dizer em voz alta que o tempo é o maior dos luxos.',
    },
    accent: '#141416',
    cover: '/images/capa_audi.webp',
    coverVideo: '/videos/audi_capa.mp4',
    coverVideoMobile: '/videos/capa_audi_mobile.mp4',
  },
  {
    id: 'no-chance-mustache',
    number: '08',
    title: 'No Chance, Mustache',
    titlePt: 'Zero Chances\npara o Bigode',
    client: 'Gillette',
    discipline: PRINT,
    year: '2025',
    tagline: {
      en: 'The mustache is the first to surrender.',
      pt: 'O bigode é o primeiro a se render.',
    },
    insight: {
      en: 'Razor advertising has been counting blades for fifty years. Nobody buys a razor for the engineering, though. People buy the certainty that whatever is growing on their face does not stand a chance.',
      pt: 'A publicidade de lâmina conta lâminas há cinquenta anos. Só que ninguém compra um aparelho pela engenharia. As pessoas compram a certeza de que o que está nascendo no rosto não tem a menor chance.',
    },
    idea: {
      en: 'One visual satire, no demo and no promise about blade count: the tips of the mustache curl into two tiny hands, raised in surrender the second the blade comes close. The hair gives up before the shave even begins.',
      pt: 'Uma sátira visual, sem demo e sem promessa de quantas lâminas tem: as pontas do bigode viram duas mãozinhas, erguidas em rendição no segundo em que a lâmina se aproxima. O pelo se entrega antes de o barbear começar.',
    },
    accent: '#0A3D91',
    cover: '/images/gilletteA.webp',
  },
  {
    id: 'from-the-amazon',
    number: '09',
    title: 'From Brazil to the World',
    titlePt: 'Do Brasil para o Mundo',
    client: 'Amazonia Coconut Water',
    discipline: { en: '3D Packaging + Print', pt: 'Packaging 3D + Impresso' },
    year: '2024',
    tagline: {
      en: 'New packaging, street size.',
      pt: 'Nova embalagem, pronta para ganhar as ruas do mundo.',
    },
    insight: {
      en: 'Amazônia is a name the whole world already reads as tropical rainforest. All the colour and the joy people associate with Brazil are sitting right there in the brand. So why not take that colour to the streets of the world, and build recognition for the new Água de Coco Amazônia packaging?',
      pt: 'Amazônia é sinônimo de floresta tropical no mundo inteiro. Toda a cor e a alegria que as pessoas associam ao Brasil já estão no nome da marca. Então por que não levar essa cor para as ruas do mundo, ajudando a criar identificação com as novas embalagens da Água de Coco Amazônia?',
    },
    idea: {
      en: 'Instead of photographing the new packaging, we built it: full 3D visualisation taken straight to out of home. The bottle met people at the scale of a building, from Brazil to the world.',
      pt: 'Em vez de fotografar a nova embalagem, nós a construímos: visualização 3D completa levada direto para a mídia exterior. A garrafa encontrou as pessoas na escala de um prédio, do Brasil para o mundo.',
    },
    accent: '#1D6B3A',
    cover: '/images/opt/Am.webp',
    coverMobile: '/images/amazonia_mobile.webp',
  },
  {
    id: 'nature-asks-for-help',
    number: '10',
    title: 'Nature Asks for Help',
    titlePt: 'A Natureza pede Socorro',
    client: 'Yourban2030',
    discipline: { en: 'Social Media', pt: 'Social Media' },
    year: '2024',
    tagline: {
      en: 'Illustrations with signs from Nature.',
      pt: 'Ilustrações com sinais da Natureza.',
    },
    insight: {
      en: 'Climate campaigns have a credibility problem: the more beautiful the image, the more it looks like retouching. The planet does not need an art director speaking on its behalf. It needs someone willing to look at what is already there.',
      pt: 'Campanha de clima tem um problema de credibilidade: quanto mais bonita a imagem, mais parece retoque. O planeta não precisa de um diretor de arte falando por ele. Precisa de alguém disposto a olhar para o que já está lá.',
    },
    idea: {
      en: 'We combed through aerial photography until we found natural formations that already draw SOS, the universal distress signal. Nothing was added, nothing was retouched. The warning was written on the ground the whole time.',
      pt: 'Garimpamos fotografia aérea até encontrar formações naturais que já desenham SOS, o sinal universal de socorro. Nada foi acrescentado, nada foi retocado. O aviso estava escrito no chão esse tempo todo.',
    },
    accent: '#1F4E5F',
    cover: '/images/sos_capa.webp',
    coverMobile: '/images/sos_mobile.webp',
  },
]
