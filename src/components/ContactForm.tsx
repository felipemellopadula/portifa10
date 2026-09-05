import { useState } from 'react'
import { t, ui, type Lang } from '../i18n'

// Mesmo endpoint do vite-export: os envios caem na caixa de entrada que ja
// existe no Formspree, sem backend proprio.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mblnzewd'

const EMPTY = { name: '', email: '', message: '' }

type Status = 'idle' | 'submitting' | 'success' | 'error'

const statusLabel = {
  idle: ui.formIdle,
  submitting: ui.formSubmitting,
  success: ui.formSuccess,
  error: ui.formError,
}

export default function ContactForm({ lang }: { lang: Lang }) {
  const [formData, setFormData] = useState(EMPTY)
  const [status, setStatus] = useState<Status>('idle')

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData(EMPTY)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const busy = status === 'submitting' || status === 'success'

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-row">
        <div className="contact-field">
          <label htmlFor="contact-name">{t(ui.formName, lang)}</label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t(ui.formNamePlaceholder, lang)}
          />
        </div>

        <div className="contact-field">
          <label htmlFor="contact-email">{t(ui.formEmail, lang)}</label>
          <input
            type="email"
            id="contact-email"
            name="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t(ui.formEmailPlaceholder, lang)}
          />
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="contact-message">{t(ui.formMessage, lang)}</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder={t(ui.formMessagePlaceholder, lang)}
        />
      </div>

      <div className="contact-form-foot">
        <button type="submit" className="pill" disabled={busy}>
          <span>{t(statusLabel[status], lang)}</span>
          <span aria-hidden="true">{status === 'success' ? '✓' : '↗'}</span>
        </button>

        {/* aria-live: o retorno do envio precisa ser anunciado por leitor de tela. */}
        <p className="contact-form-status" role="status" aria-live="polite">
          {status === 'success' && t(ui.formSuccessNote, lang)}
          {status === 'error' && t(ui.formErrorNote, lang)}
        </p>
      </div>
    </form>
  )
}
