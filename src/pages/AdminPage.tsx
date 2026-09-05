import { useEffect, useMemo, useState } from 'react'

/*
 * Painel de analytics, portado do vite-export. O contrato com o PHP e o mesmo
 * (`auth.php` e `stats.php`, que continuam no servidor), entao os numeros
 * antigos aparecem aqui sem migrar nada.
 *
 * Fica em portugues de proposito: e tela sua, nao do portfolio.
 */

const RANGES = [
  { id: '7d', label: '7 DIAS' },
  { id: '30d', label: '30 DIAS' },
  { id: '90d', label: '90 DIAS' },
  { id: '12m', label: '12 MESES' },
  { id: 'all', label: 'TUDO' },
] as const

const MONTHS = [
  'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN',
  'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ',
]

const number = new Intl.NumberFormat('pt-BR')

type Bucket = { visitors: number; pageviews: number }
type Daily = Bucket & { day: string }
type Monthly = Bucket & { month: string }
type Rank = { label: string; code?: string; visitors: number }
type Hit = {
  created_at: string
  ip?: string
  city?: string
  region?: string
  country?: string
  country_code?: string
  path: string
  device?: string
  browser?: string
}

type Stats = {
  totals: Record<string, number>
  daily: Daily[]
  monthly: Monthly[]
  countries: Rank[]
  regions: Rank[]
  cities: Rank[]
  pages: Rank[]
  referrers: Rank[]
  devices: Rank[]
  browsers: Rank[]
  recent: Hit[]
}

function formatDay(day: string) {
  const [, month, date] = day.split('-')
  return `${date}/${month}`
}

function formatMonth(month: string) {
  const [year, index] = month.split('-')
  return `${MONTHS[Number(index) - 1]} ${year.slice(2)}`
}

function formatMoment(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/** Bandeira a partir do codigo ISO: A = 0x1F1E6. Sem imagem, sem requisicao. */
function flag(code?: string) {
  if (!code || code.length !== 2) return ''
  const base = 0x1f1e6
  return String.fromCodePoint(
    base + code.toUpperCase().charCodeAt(0) - 65,
    base + code.toUpperCase().charCodeAt(1) - 65,
  )
}

class ApiError extends Error {
  status?: number
}

async function api<T = Record<string, unknown>>(path: string, options?: RequestInit) {
  const response = await fetch(path, options)
  const text = await response.text()

  let data: (T & { ok?: boolean; error?: string }) | undefined
  try {
    data = JSON.parse(text)
  } catch {
    // Endpoint ausente devolve o index.html do SPA, nao JSON.
    throw new ApiError(
      'O servidor nao respondeu em JSON. O PHP esta ativo e a pasta /api foi enviada?',
    )
  }

  if (!response.ok || !data?.ok) {
    const error = new ApiError(data?.error || 'Falhou.')
    error.status = response.status
    throw error
  }
  return data as T
}

/* ------------------------------------------------------------------ blocos */

function StatTile({ label, value, note }: { label: string; value: number; note?: string }) {
  return (
    <div className="admin-stat">
      <p className="admin-stat-label">{label}</p>
      <p className="admin-stat-value">{number.format(value ?? 0)}</p>
      {note && <p className="admin-stat-note">{note}</p>}
    </div>
  )
}

type BarProps<T> = {
  title: string
  data: T[]
  keyOf: (item: T) => string
  formatKey: (key: string) => string
  asTable: boolean
  onToggle: () => void
}

/**
 * Barras de serie unica. A cor nao carrega informacao nenhuma — o comprimento
 * carrega — entao e uma cor so, e o valor exato vive no tooltip e na tabela.
 */
function BarChart<T extends Bucket>({
  title,
  data,
  keyOf,
  formatKey,
  asTable,
  onToggle,
}: BarProps<T>) {
  const [active, setActive] = useState<number | null>(null)

  const max = useMemo(() => data.reduce((peak, i) => Math.max(peak, i.visitors), 0), [data])
  const peak = useMemo(
    () => data.findIndex((i) => i.visitors === max && max > 0),
    [data, max],
  )
  const total = useMemo(() => data.reduce((sum, i) => sum + i.visitors, 0), [data])

  const head = (
    <div className="admin-card-head">
      <div>
        <p className="admin-eyebrow">{title}</p>
        <p className="admin-card-note">{number.format(total)} visitantes no período</p>
      </div>
      <button type="button" className="admin-toggle" onClick={onToggle}>
        {asTable ? 'VER GRÁFICO' : 'VER TABELA'}
      </button>
    </div>
  )

  if (!data.length) {
    return (
      <section className="admin-card">
        {head}
        <p className="admin-empty">Sem visitas registradas ainda.</p>
      </section>
    )
  }

  if (asTable) {
    return (
      <section className="admin-card">
        {head}
        <div className="admin-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>PERÍODO</th>
                <th className="is-num">VISITANTES</th>
                <th className="is-num">PAGEVIEWS</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={keyOf(item)}>
                  <td>{formatKey(keyOf(item))}</td>
                  <td className="is-num">{number.format(item.visitors)}</td>
                  <td className="is-num">{number.format(item.pageviews)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    )
  }

  return (
    <section className="admin-card">
      {head}
      <div className="admin-chart">
        <div className="admin-chart-grid" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="admin-chart-plot">
          {data.map((item, index) => {
            const height = max > 0 ? (item.visitors / max) * 100 : 0
            const isActive = active === index
            return (
              <button
                type="button"
                key={keyOf(item)}
                className={`admin-bar${isActive ? ' is-active' : ''}`}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
                aria-label={`${formatKey(keyOf(item))}: ${item.visitors} visitantes, ${item.pageviews} pageviews`}
              >
                {/* Rotulo so no pico: um numero em cima de cada barra vira ruido. */}
                {index === peak && !isActive && (
                  <span className="admin-bar-peak">{number.format(item.visitors)}</span>
                )}

                {isActive && (
                  <span className="admin-tip" role="status">
                    <strong>{formatKey(keyOf(item))}</strong>
                    {number.format(item.visitors)} visitantes
                    <br />
                    {number.format(item.pageviews)} pageviews
                  </span>
                )}

                <span
                  className="admin-bar-fill"
                  style={{ height: `${Math.max(height, item.visitors > 0 ? 2 : 0)}%` }}
                />
              </button>
            )
          })}
        </div>

        <div className="admin-chart-axis">
          {data.map((item, index) => (
            <span key={keyOf(item)}>
              {/* Em 30 barras so cabe um rotulo a cada 5. */}
              {data.length > 14
                ? index % 5 === 0
                  ? formatKey(keyOf(item))
                  : ''
                : formatKey(keyOf(item))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Ranking: rotulo, barra de magnitude e o numero. A barra e redundante com o
 * numero de proposito — deixa a ordem de grandeza legivel de relance.
 */
function RankList({
  title,
  items,
  showFlag,
}: {
  title: string
  items: Rank[]
  showFlag?: boolean
}) {
  const max = items.reduce((peak, item) => Math.max(peak, item.visitors), 0)

  return (
    <section className="admin-card">
      <div className="admin-card-head">
        <p className="admin-eyebrow">{title}</p>
      </div>

      {items.length === 0 ? (
        <p className="admin-empty">Nada aqui ainda.</p>
      ) : (
        <ul className="admin-rank">
          {items.map((item) => (
            <li key={`${item.label}-${item.code ?? ''}`}>
              <span className="admin-rank-label" title={item.label}>
                {showFlag && item.code ? `${flag(item.code)} ` : ''}
                {item.label}
              </span>
              <span className="admin-rank-track" aria-hidden="true">
                <span
                  className="admin-rank-fill"
                  style={{ width: `${max > 0 ? (item.visitors / max) * 100 : 0}%` }}
                />
              </span>
              <span className="admin-rank-value">{number.format(item.visitors)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

/* ------------------------------------------------------------------- login */

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSending(true)
    setError('')

    try {
      await api('/api/auth.php?action=login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      onSuccess()
    } catch (problem) {
      setError(problem instanceof Error ? problem.message : 'Falhou.')
      setSending(false)
    }
  }

  return (
    <main className="admin admin-login-screen">
      <form className="admin-login" onSubmit={handleSubmit}>
        <p className="admin-eyebrow">[ ADMIN ]</p>
        <h1>Analytics</h1>

        <label htmlFor="admin-password">SENHA</label>
        <input
          id="admin-password"
          type="password"
          value={password}
          autoFocus
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}
        />

        {error && <p className="admin-error">{error}</p>}

        <button type="submit" className="pill" disabled={sending || !password}>
          {sending ? 'ENTRANDO...' : 'ENTRAR'}
        </button>

        <a className="admin-back" href="/">
          ← Voltar ao site
        </a>
      </form>
    </main>
  )
}

/* ------------------------------------------------------------------ painel */

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [range, setRange] = useState<string>('30d')
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [dailyTable, setDailyTable] = useState(false)
  const [monthlyTable, setMonthlyTable] = useState(false)

  useEffect(() => {
    // `alive` evita escrever estado de uma resposta que chegou depois da troca.
    let alive = true

    const load = async () => {
      try {
        const data = await api<Stats>(`/api/stats.php?range=${range}`)
        if (!alive) return
        setStats(data)
        setError('')
      } catch (problem) {
        if (!alive) return
        if (problem instanceof ApiError && problem.status === 401) {
          onLogout()
          return
        }
        setError(problem instanceof Error ? problem.message : 'Falhou.')
      } finally {
        if (alive) setLoading(false)
      }
    }

    load()
    return () => {
      alive = false
    }
  }, [range, onLogout])

  async function handleLogout() {
    try {
      await api('/api/auth.php?action=logout', { method: 'POST' })
    } catch {
      // Mesmo falhando no servidor, a tela volta para o login.
    }
    onLogout()
  }

  const rangeNote =
    range === 'all'
      ? 'desde o início'
      : `últimos ${RANGES.find((item) => item.id === range)?.label.toLowerCase() ?? ''}`

  return (
    <main className="admin">
      <header className="admin-top">
        <a className="admin-home" href="/">
          Felipe M Padula
        </a>
        <p className="admin-eyebrow">[ ADMIN ] ANALYTICS</p>
        <button type="button" className="admin-logout" onClick={handleLogout}>
          SAIR ×
        </button>
      </header>

      {/* Uma linha de filtro acima de tudo: todos os blocos usam o mesmo recorte. */}
      <div className="admin-filters">
        <p className="admin-eyebrow">[ PERÍODO ]</p>
        <div className="admin-range">
          {RANGES.map((item) => (
            <button
              type="button"
              key={item.id}
              className={range === item.id ? 'is-active' : undefined}
              onClick={() => {
                setRange(item.id)
                setLoading(true)
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="admin-error admin-error-page">{error}</p>}

      {stats && (
        /* Recarregando, o painel antigo perde opacidade em vez de sumir: sem
           salto de layout a cada troca de periodo. */
        <div className={`admin-body${loading ? ' is-loading' : ''}`}>
          <section className="admin-stats">
            <StatTile label="VISITANTES" value={stats.totals.range_visitors} note={rangeNote} />
            <StatTile label="PAGEVIEWS" value={stats.totals.range_pageviews} note={rangeNote} />
            <StatTile
              label="HOJE"
              value={stats.totals.today_visitors}
              note={`${number.format(stats.totals.today_pageviews ?? 0)} pageviews`}
            />
            <StatTile
              label="ESTE MÊS"
              value={stats.totals.month_visitors}
              note={`${number.format(stats.totals.month_pageviews ?? 0)} pageviews`}
            />
            <StatTile
              label="TOTAL"
              value={stats.totals.all_visitors}
              note={`${number.format(stats.totals.all_pageviews ?? 0)} pageviews`}
            />
          </section>

          <BarChart
            title="[ VISITANTES POR DIA ]"
            data={stats.daily}
            keyOf={(item) => item.day}
            formatKey={formatDay}
            asTable={dailyTable}
            onToggle={() => setDailyTable((v) => !v)}
          />

          <BarChart
            title="[ VISITANTES POR MÊS ]"
            data={stats.monthly}
            keyOf={(item) => item.month}
            formatKey={formatMonth}
            asTable={monthlyTable}
            onToggle={() => setMonthlyTable((v) => !v)}
          />

          <div className="admin-grid">
            <RankList title="[ PAÍSES ]" items={stats.countries} showFlag />
            <RankList title="[ ESTADOS ]" items={stats.regions} showFlag />
            <RankList title="[ CIDADES ]" items={stats.cities} />
            <RankList title="[ PÁGINAS ]" items={stats.pages} />
            <RankList title="[ ORIGENS ]" items={stats.referrers} />
            <RankList title="[ DISPOSITIVOS ]" items={stats.devices} />
            <RankList title="[ NAVEGADORES ]" items={stats.browsers} />
          </div>

          <section className="admin-card">
            <div className="admin-card-head">
              <div>
                <p className="admin-eyebrow">[ ÚLTIMAS VISITAS ]</p>
                <p className="admin-card-note">
                  IP guardado sem o último bloco — dá para distinguir visitantes, não para
                  identificar pessoas.
                </p>
              </div>
            </div>

            {stats.recent.length === 0 ? (
              <p className="admin-empty">Nada aqui ainda.</p>
            ) : (
              <div className="admin-scroll">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>QUANDO</th>
                      <th>IP</th>
                      <th>CIDADE</th>
                      <th>ESTADO</th>
                      <th>PAÍS</th>
                      <th>PÁGINA</th>
                      <th>DISPOSITIVO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recent.map((hit, index) => (
                      <tr key={`${hit.created_at}-${index}`}>
                        <td>{formatMoment(hit.created_at)}</td>
                        <td className="is-num">{hit.ip || '—'}</td>
                        <td>{hit.city || '—'}</td>
                        <td>{hit.region || '—'}</td>
                        <td>
                          {hit.country_code ? `${flag(hit.country_code)} ` : ''}
                          {hit.country || '—'}
                        </td>
                        <td>{hit.path}</td>
                        <td>
                          {hit.device} / {hit.browser}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      )}

      {loading && !stats && <p className="admin-empty">Carregando...</p>}
    </main>
  )
}

/* -------------------------------------------------------------------------- */

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    api<{ authenticated?: boolean }>('/api/auth.php?action=session')
      .then((data) => setAuthenticated(Boolean(data.authenticated)))
      .catch(() => setAuthenticated(false))
  }, [])

  if (authenticated === null) {
    return (
      <main className="admin admin-login-screen">
        <p className="admin-empty">Carregando...</p>
      </main>
    )
  }

  return authenticated ? (
    <Dashboard onLogout={() => setAuthenticated(false)} />
  ) : (
    <Login onSuccess={() => setAuthenticated(true)} />
  )
}
