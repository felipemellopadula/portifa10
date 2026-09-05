# Felipe Mello Padula — Portfolio

Art director portfolio. React + TypeScript + Vite, sem dependências além do React.

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm run preview
```

## Como está montado

- `src/data/works.ts` — os 10 cases: textos, cor da faixa, capa e galeria.
  É o único arquivo que precisa mexer pra trocar conteúdo. Todo texto que muda
  de idioma vem como `{ en, pt }`.
- `src/data/caseDetails.ts` — **gerado** a partir de `C:\Users\Felipe\Desktop\vite-export`
  (`src/data/projects.js` + `projects.pt.js`): ficha técnica, filme do case e a
  legenda de cada peça, nos dois idiomas. Mexeu no vite-export, regere; editou
  aqui, os dois passam a divergir. Cada peça tem `span` (`wide` ocupa a linha,
  `half` metade, `third` as trincas de social) e, quando existe corte próprio
  por largura, `viewport`: `desktop` some no iPad e no celular, `compact` só
  aparece lá. O Big Mac usa isso — as horizontais no desktop, as verticais no
  compacto.
- `src/i18n.ts` — os textos de interface nos dois idiomas. Inglês é o default; a
  escolha fica no localStorage e o `<html lang>` acompanha.
- `src/components/Wordmark.tsx` — a assinatura. O nome inteiro leva um
  deslocamento de ruído fixo (`#fmp-rough`); as duas letras finais levam o mesmo
  filtro com a `seed` trocando em passos (`#fmp-boil`), que é o "boil" em loop.
  Na referência isso era um GIF exportado; aqui é texto de verdade.
- `src/components/WorkBand.tsx` — a faixa de case. Parada, ocupa uma tira no meio
  da tela com a cor chapada por cima da imagem. Com o mouse no bloco central ela
  abre pra 100vh / 100vw, tira a cor e revela tagline e ficha técnica.

  O alvo do mouse (`.band-hit`) é um bloco separado do conteúdo, ancorado em
  offsets fixos (`--hit-top` / `--hit-height`) a partir do topo da faixa. Como o
  topo não se mexe quando a faixa cresce, o alvo nunca sai de baixo do cursor.
  Se ele acompanhasse o conteúdo, a faixa abriria e fecharia em loop — foi o que
  aconteceu na primeira versão. **Não troque esses offsets por porcentagens da
  faixa nem mova o alvo junto com o conteúdo.**
- `src/components/WorkMenu.tsx` — o menu do "Work" no desktop: a lista dos dez
  com uma prévia da capa que troca conforme o mouse anda. A caixa do painel
  começa colada na barra do menu e o cartão é empurrado por um padding
  transparente — é essa faixa invisível que segura o mouse na travessia. Sem
  ela, atravessar o vão fecha o menu no meio do caminho.
- `src/components/ScrollCue.tsx` — o convite de rolagem no canto inferior
  direito. Além de indicar, leva: enquanto há trabalho abaixo a seta aponta para
  baixo e o clique pula para a próxima faixa; passado o último, ela gira e o
  clique volta ao topo. Não é montado com o case ou o burger abertos.
- `src/scrollFx.ts` — parallax da mídia e a revelação das faixas ao entrar na
  tela, num controlador só: um `requestAnimationFrame` e um listener de scroll
  para as dez, contando apenas as visíveis. O `is-near` volta para o componente
  por callback — mexer no `className` por fora não sobrevive ao próximo render
  do React, e foi exatamente esse o bug que apagava a revelação no hover.
- `src/pages/AdminPage.tsx` — o painel de analytics em `/admin`, portado do
  vite-export. Fala com o mesmo `auth.php` / `stats.php` que já roda no
  servidor, então o histórico antigo aparece sem migrar nada. Fica em português
  de propósito: é tela interna, não do portfólio.
- `src/analytics.ts` — portado do vite-export sem mudar o contrato: POST em
  `/api/track.php`, o PHP que já roda no servidor. Falha calado fora de produção.
- `src/components/CaseOverlay.tsx` — o case aberto em tela cheia: filme (Vimeo ou
  arquivo local), ficha técnica, texto de abertura e as peças com legenda. Fica na
  rota `/work/<slug>`, então dá pra mandar o link direto de um case. Esc fecha.
- `src/components/ContactForm.tsx` — mesmo formulário e mesmo endpoint do
  Formspree do vite-export, então os envios caem na caixa que já existe.

## Assets

`public/images` e `public/videos` vieram do projeto anterior. Os dois loops de
vídeo (`sandler-loop.mp4`, `clash-loop.mp4`) são as capas animadas dos cases 01 e 02;
`videocase-clash-web.mp4` (25 MB) é o filme do case do Clash, tocado dentro dele.
O filme do Sandler vem do Vimeo (`1201113241`), não é arquivo local.

## Publicando

Os endereços dos cases (`/work/<slug>`) **já foram enviados para vagas** e estão
no ar hoje. Os slugs em `works.ts` são exatamente os do site publicado — mudar um
quebra um link que já está circulando.

Duas coisas precisam existir no servidor, senão esses links caem:

1. **`.htaccess` na raiz.** Vai junto no `dist/` (fica em `public/`). Sem a
   reescrita, o Apache procura uma pasta `/work/the-sandler-clause`, não acha e
   devolve 404 antes do React carregar.
2. **A pasta `/api`.** (É ela que o `/admin` consulta.) É o backend PHP do analytics (`track.php`, `stats.php`) e
   **não faz parte deste projeto** — vive só no servidor, e `api/data` guarda as
   visitas acumuladas. Ao publicar, suba o conteúdo do `dist/` **sem apagar
   `/api`**, ou você perde o histórico e o painel para de registrar.
