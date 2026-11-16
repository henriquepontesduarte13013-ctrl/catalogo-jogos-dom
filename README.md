# Catálogo Interativo de Jogos (`catalogo-jogos-dom`)

Aplicação web desenvolvida para a disciplina de **Desenvolvimento Front-End Para Web**, com foco em manipulação dinâmica do DOM utilizando HTML5, CSS3 e JavaScript puro (Vanilla JS).

## Funcionalidades

- **Catálogo com 30 jogos** em 8 categorias: Ação e Aventura, Battle Royale, Esportes e Corrida, Mundo Aberto e Sandbox, RPG, FPS e MOBA, Estratégia e Simulação, e Plataforma, Luta e Terror.
- **Pesquisa por nome:** atualiza a cada tecla, sem diferenciar maiúsculas/minúsculas nem acentos.
- **Filtro por categoria:** chips e menu *Categorias* (gerados a partir dos dados em `js/catalogo.js`); combina com a pesquisa.
- **Favoritos:** favoritar/desfavoritar nos cards, lista na seção Favoritos com opção de remover, persistência em `localStorage` (chave `jogosFavoritos`) e *Event Delegation*.
- **SVG:** sprite inline de ícones (`<symbol>`/`<use>`), logo, favicon e uma capa ilustrativa original e exclusiva para cada um dos 30 jogos (`assets/images/capa-*.svg`, sem artes ou logotipos oficiais).
- **Canvas:** gráfico de barras horizontais "Favoritos por categoria" (todas as categorias, inclusive as com zero favoritos), redesenhado a cada alteração e ao redimensionar a tela, com alternativa em texto para leitores de tela.
- **Vídeo de destaque:** player `<video>` com legendas (`<track>`) e aviso de fallback quando o arquivo não existe.
- **Estados vazios, responsividade e acessibilidade** (ARIA, `aria-live`, foco visível).

## Tecnologias e Conceitos Aplicados

- **HTML5 Semântico:** `<header>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<video>`, `<canvas>` e atributos `data-*`.
- **CSS3:** variáveis em `:root`, Flexbox, Grid, tema Dark Purple e media queries.
- **JavaScript (ES6+):** manipulação do DOM sem `innerHTML`, `CustomEvent`, `ResizeObserver`, API Canvas 2D e `localStorage`.

## Estrutura de Arquivos

```
catalogo-jogos-dom/
├── index.html          # Estrutura semântica e sprite SVG
├── css/
│   ├── reset.css       # Reset (box-sizing: border-box)
│   └── style.css       # Variáveis, tema Dark Purple e componentes
├── js/
│   ├── main.js         # Inicialização, menu, dropdown e fallback do vídeo
│   ├── catalogo.js     # Dados (30 jogos, 8 categorias), pesquisa, filtros e favoritos
│   └── graficos.js     # Gráfico de barras em Canvas
└── assets/
    ├── images/         # 30 capas (capa-*.svg) e pôster do vídeo (SVG)
    ├── icons/          # Favicon
    ├── captions/       # Legendas WebVTT
    └── videos/         # Coloque aqui destaque.mp4 / destaque.webm
```

## Como Executar

Use um servidor local (necessário para carregar as legendas `<track>`, que o navegador bloqueia em `file://`):

1. Clone ou baixe este repositório.
2. Na pasta do projeto, execute: `python -m http.server 8000`
3. Acesse `http://localhost:8000` no navegador.

O vídeo de destaque não acompanha o repositório: adicione `assets/videos/destaque.mp4` (e, opcionalmente, `destaque.webm`) para ativar o player. Sem ele, a página mostra um aviso.
