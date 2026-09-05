export type Lang = 'en' | 'pt'

/** Todo texto do site vem nos dois idiomas. */
export type L = { en: string; pt: string }

export const DEFAULT_LANG: Lang = 'en'

const STORAGE_KEY = 'fmp-lang'

export function readLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'pt') return saved
  } catch {
    /* localStorage bloqueado: cai no default */
  }
  return DEFAULT_LANG
}

export function saveLang(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    /* sem persistencia, mas a sessao continua */
  }
}

export const ui = {
  navWork: { en: 'Work', pt: 'Trabalhos' },
  navAbout: { en: 'About', pt: 'Sobre' },
  navContact: { en: 'Contact', pt: 'Contato' },

  aboutEyebrow: { en: 'About', pt: 'Sobre' },
  aboutP1: {
    en: 'I’m Felipe Mello Padula, an Art Director from Brazil. I’ve worked across agencies in Brazil, the United States and Singapore, building ideas from the first sketch to the final frame.',
    pt: 'Sou Felipe Mello Padula, diretor de arte brasileiro. Passei por agências no Brasil, nos Estados Unidos e em Singapura, construindo ideias do primeiro rabisco ao frame final.',
  },
  aboutP2: {
    en: 'My practice combines concept, art direction, design and film. The medium changes. The standard for a sharp idea does not.',
    pt: 'Meu trabalho junta conceito, direção de arte, design e filme. O meio muda. A régua para uma ideia afiada, não.',
  },
  aboutPortraitAlt: {
    en: 'Studio portrait of Felipe Mello Padula, arms crossed',
    pt: 'Retrato de estúdio de Felipe Mello Padula, de braços cruzados',
  },
  aboutRole: { en: 'Art Director', pt: 'Diretor de Arte' },
  aboutLocation: { en: 'São Paulo-SP / Brazil', pt: 'São Paulo-SP / Brasil' },
  aboutAvailability: { en: 'Available worldwide', pt: 'Disponível no mundo todo' },

  contactEyebrow: { en: 'Contact', pt: 'Contato' },
  contactBody: {
    en: 'Currently taking on new work. Say hello.',
    pt: 'Aberto a novos projetos. Manda um oi.',
  },
  whatsapp: { en: 'Chat on WhatsApp', pt: 'Chamar no WhatsApp' },

  formName: { en: 'Name', pt: 'Nome' },
  formNamePlaceholder: { en: 'Your name', pt: 'Seu nome' },
  formEmail: { en: 'Email', pt: 'E-mail' },
  formEmailPlaceholder: { en: 'email@example.com', pt: 'email@exemplo.com' },
  formMessage: { en: 'Message', pt: 'Mensagem' },
  formMessagePlaceholder: { en: 'What are we making?', pt: 'O que vamos criar?' },
  formIdle: { en: 'Send Message', pt: 'Enviar Mensagem' },
  formSubmitting: { en: 'Sending...', pt: 'Enviando...' },
  formSuccess: { en: 'Message Sent', pt: 'Mensagem Enviada' },
  formError: { en: 'Send Message', pt: 'Enviar Mensagem' },
  formSuccessNote: {
    en: 'Message sent. I’ll get back to you shortly.',
    pt: 'Mensagem enviada. Respondo em breve.',
  },
  formErrorNote: {
    en: 'Something went wrong. Try again or reach me on WhatsApp.',
    pt: 'Algo deu errado. Tente de novo ou chame no WhatsApp.',
  },

  rights: {
    en: '© 2026 Felipe Mello Padula. All rights reserved.',
    pt: '© 2026 Felipe Mello Padula. Todos os direitos reservados.',
  },

  factClient: { en: 'Client', pt: 'Cliente' },
  factDiscipline: { en: 'Discipline', pt: 'Disciplina' },
  factYear: { en: 'Year', pt: 'Ano' },

  seeCase: { en: 'See the Case', pt: 'Veja o Case' },
  scrollMore: { en: 'Scroll for more works', pt: 'Role para ver mais trabalhos' },
  backToTop: { en: 'Back to top', pt: 'Voltar ao topo' },
  close: { en: 'Close', pt: 'Fechar' },
  backToWork: { en: 'Back to Work', pt: 'Voltar aos Trabalhos' },
  seeAllWork: { en: 'See all work', pt: 'Ver todos os trabalhos' },

  caseIdea: { en: 'The idea', pt: 'A ideia' },
  caseCredits: { en: 'Credits', pt: 'Ficha técnica' },
  caseWork: { en: 'The work', pt: 'As peças' },
  caseNext: { en: 'Next project', pt: 'Próximo projeto' },
  playFilm: { en: 'Play the film', pt: 'Ver o filme' },
  watchOnVimeo: { en: 'Watch on Vimeo', pt: 'Ver no Vimeo' },

  langLabel: { en: 'Language', pt: 'Idioma' },
} satisfies Record<string, L>

/** Escolhe o idioma de um par de textos. */
export function t(value: L, lang: Lang): string {
  return value[lang]
}
