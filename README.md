# Catálogo Interativo de Jogos (`catalogo-jogos-dom`)

Aplicação web desenvolvida para a disciplina de **Desenvolvimento Front-End Para Web**, com foco em manipulação dinâmica do DOM utilizando HTML5, CSS3 e JavaScript puro (Vanilla JS).

## Funcionalidades

- **Catálogo com 30 jogos** em 8 categorias: Ação e Aventura, Battle Royale, Esportes e Corrida, Mundo Aberto e Sandbox, RPG, FPS e MOBA, Estratégia e Simulação, e Plataforma, Luta e Terror.
- **Pesquisa por nome:** atualiza a cada tecla, sem diferenciar maiúsculas/minúsculas nem acentos.
- **Filtro por categoria:** chips e menu *Categorias* (gerados a partir dos dados em `js/catalogo.js`); combina com a pesquisa.
- **Favoritos:** favoritar/desfavoritar nos cards, lista na seção Favoritos com opção de remover, persistência em `localStorage` (chave `jogosFavoritos`) e *Event Delegation*.
- **SVG:** sprite inline de ícones (`<symbol>`/`<use>`), logo, favicon e uma ilustração original provisória (League of Legends). As demais capas são imagens reais locais (ver *Capas dos jogos*).
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
    ├── images/         # 30 capas (capa-*.jpg / .svg) e pôster do vídeo
    ├── icons/          # Favicon
    ├── captions/       # Legendas WebVTT
    └── videos/         # Coloque aqui destaque.mp4 / destaque.webm
```

## Capas dos jogos: fontes e direitos de uso

As capas ficam salvas localmente em `assets/images/` (a página não carrega imagens de outros sites). Todas as proporções são preservadas: cada card usa uma moldura 2:3 com `object-fit: contain`, sem distorção nem corte.

**Aviso importante sobre direitos:** as capas dos jogos são obras protegidas por direitos autorais dos respectivos desenvolvedoras/publicadoras (Valve, Nintendo, Riot Games, Electronic Arts, Sony, Capcom, etc.) e **não são de uso livre**. Elas aparecem aqui somente para identificar cada jogo, em um **projeto acadêmico sem fins lucrativos**. As imagens da Steam são arte promocional de loja, e as da Wikipédia estão hospedadas lá sob alegação de *fair use* (válida no contexto da enciclopédia, sem garantia de reutilização livre). Os termos de uso/licenças de cada fonte não foram revistos juridicamente. Antes de qualquer publicação além da avaliação, é necessário obter permissão dos titulares ou substituir as imagens (por exemplo, por arte de *press kit* com licença explícita). Os titulares podem solicitar a remoção a qualquer momento.

| Jogo | Origem | Fonte | Arquivo |
|---|---|---|---|
| Brawl Stars | App Store (ícone oficial do app, Supercell Oy) | [App Store](https://apps.apple.com/us/app/brawl-stars/id1229016807) | `capa-brawl-stars.jpg` |
| Free Fire | Google Play (ícone oficial do app, Garena; arte temática de evento) | [Google Play](https://play.google.com/store/apps/details?id=com.dts.freefireth) | `capa-free-fire.png` |
| EA Sports FC | Steam (capa vertical oficial da loja) | [Página na Steam](https://store.steampowered.com/app/2669320/) · [imagem](https://cdn.cloudflare.steamstatic.com/steam/apps/2669320/library_600x900.jpg) | `capa-ea-sports-fc.jpg` |
| God of War Ragnarök | Steam (capa vertical oficial da loja) | [Página na Steam](https://store.steampowered.com/app/2322010/) · [imagem](https://cdn.cloudflare.steamstatic.com/steam/apps/2322010/library_600x900.jpg) | `capa-god-of-war-ragnarok.jpg` |
| The Legend of Zelda: Breath of the Wild | Wikipédia (EN), imagem de capa do artigo; arquivo marcado como *fair use* (Nintendo) | [Página do arquivo](https://en.wikipedia.org/wiki/File:The_Legend_of_Zelda_Breath_of_the_Wild.jpg) | `capa-zelda-breath-of-the-wild.jpg` |
| Fortnite | Epic Games Store (arte vertical oficial de divulgação do Fortnite Battle Royale, edição temática de temporada) | [Epic Games Store](https://store.epicgames.com/en-US/p/fortnite) | `capa-fortnite.jpg` |
| PUBG: Battlegrounds | Steam (capa vertical oficial da loja) | [Página na Steam](https://store.steampowered.com/app/578080/) · [imagem](https://cdn.cloudflare.steamstatic.com/steam/apps/578080/library_600x900.jpg) | `capa-pubg-battlegrounds.jpg` |
| Apex Legends | Steam (capa vertical oficial da loja) | [Página na Steam](https://store.steampowered.com/app/1172470/) · [imagem](https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/library_600x900.jpg) | `capa-apex-legends.jpg` |
| Rocket League | Steam (capa vertical oficial da loja) | [Página na Steam](https://store.steampowered.com/app/252950/) · [imagem](https://cdn.cloudflare.steamstatic.com/steam/apps/252950/library_600x900.jpg) | `capa-rocket-league.jpg` |
| Forza Horizon 5 | Steam (capa vertical oficial da loja) | [Página na Steam](https://store.steampowered.com/app/1551360/) · [imagem](https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/library_600x900.jpg) | `capa-forza-horizon-5.jpg` |
| Mario Kart 8 Deluxe | Loja oficial da Nintendo (imagem de divulgação da página do produto, formato horizontal) | [Nintendo Store](https://www.nintendo.com/us/store/products/mario-kart-8-deluxe-switch/) | `capa-mario-kart-8-deluxe.jpg` |
| GTA V | Steam (capa vertical oficial da loja) | [Página na Steam](https://store.steampowered.com/app/271590/) · [imagem](https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900.jpg) | `capa-gta-v.jpg` |
| Minecraft | App Store (ícone oficial do app Minecraft, Mojang AB) | [App Store](https://apps.apple.com/us/app/minecraft-play-with-friends/id479516143) | `capa-minecraft.jpg` |
| Terraria | Steam (capa vertical oficial da loja) | [Página na Steam](https://store.steampowered.com/app/105600/) · [imagem](https://cdn.cloudflare.steamstatic.com/steam/apps/105600/library_600x900.jpg) | `capa-terraria.jpg` |
| Genshin Impact | App Store (ícone oficial do app, Cognosphere/HoYoverse) | [App Store](https://apps.apple.com/us/app/genshin-impact/id1517783697) | `capa-genshin-impact.jpg` |
| Elden Ring | Steam (capa vertical oficial da loja) | [Página na Steam](https://store.steampowered.com/app/1245620/) · [imagem](https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900.jpg) | `capa-elden-ring.jpg` |
| The Witcher 3 | Steam (capa vertical oficial da loja) | [Página na Steam](https://store.steampowered.com/app/292030/) · [imagem](https://cdn.cloudflare.steamstatic.com/steam/apps/292030/library_600x900.jpg) | `capa-the-witcher-3.jpg` |
| Valorant | Wikipédia (EN), imagem de capa do artigo; arquivo marcado como *fair use* (Riot Games) | [Página do arquivo](https://en.wikipedia.org/wiki/File:Valorant_cover.jpg) | `capa-valorant.jpg` |
| Counter-Strike 2 | Steam (capa vertical oficial da loja) | [Página na Steam](https://store.steampowered.com/app/730/) · [imagem](https://cdn.cloudflare.steamstatic.com/steam/apps/730/library_600x900.jpg) | `capa-counter-strike-2.jpg` |
| League of Legends | **Sem capa oficial incluída** — ilustração SVG original do projeto (provisória) | — | `capa-league-of-legends.svg` |
| Dota 2 | Steam (capa vertical oficial da loja) | [Página na Steam](https://store.steampowered.com/app/570/) · [imagem](https://cdn.cloudflare.steamstatic.com/steam/apps/570/library_600x900.jpg) | `capa-dota-2.jpg` |
| Clash of Clans | App Store (ícone oficial do app, Supercell Oy) | [App Store](https://apps.apple.com/us/app/clash-of-clans/id529479190) | `capa-clash-of-clans.jpg` |
| Civilization VI | Steam (capa vertical oficial da loja) | [Página na Steam](https://store.steampowered.com/app/289070/) · [imagem](https://cdn.cloudflare.steamstatic.com/steam/apps/289070/library_600x900.jpg) | `capa-civilization-vi.jpg` |
| The Sims 4 | Steam (capa vertical oficial da loja) | [Página na Steam](https://store.steampowered.com/app/1222670/) · [imagem](https://cdn.cloudflare.steamstatic.com/steam/apps/1222670/library_600x900.jpg) | `capa-the-sims-4.jpg` |
| Stardew Valley | Steam (capa vertical oficial da loja) | [Página na Steam](https://store.steampowered.com/app/413150/) · [imagem](https://cdn.cloudflare.steamstatic.com/steam/apps/413150/library_600x900.jpg) | `capa-stardew-valley.jpg` |
| Hollow Knight | Steam (capa vertical oficial da loja) | [Página na Steam](https://store.steampowered.com/app/367520/) · [imagem](https://cdn.cloudflare.steamstatic.com/steam/apps/367520/library_600x900.jpg) | `capa-hollow-knight.jpg` |
| Super Mario Odyssey | Wikipédia (EN), imagem de capa do artigo; arquivo marcado como *fair use* (Nintendo) | [Página do arquivo](https://en.wikipedia.org/wiki/File:Super_Mario_Odyssey.jpg) | `capa-super-mario-odyssey.jpg` |
| Street Fighter 6 | Steam (capa vertical oficial da loja) | [Página na Steam](https://store.steampowered.com/app/1364780/) · [imagem](https://cdn.cloudflare.steamstatic.com/steam/apps/1364780/library_600x900.jpg) | `capa-street-fighter-6.jpg` |
| Among Us | Steam (capa vertical oficial da loja) | [Página na Steam](https://store.steampowered.com/app/945360/) · [imagem](https://cdn.cloudflare.steamstatic.com/steam/apps/945360/library_600x900.jpg) | `capa-among-us.jpg` |
| Resident Evil 4 | Steam (capa vertical oficial da loja) | [Página na Steam](https://store.steampowered.com/app/2050650/) · [imagem](https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/library_600x900.jpg) | `capa-resident-evil-4.jpg` |

**Observações sobre as capas de jogos mobile e de Fortnite/Mario Kart:** para jogos mobile (Brawl Stars, Clash of Clans, Genshin Impact, Minecraft e Free Fire) a "capa" é o ícone oficial do app na loja (imagem quadrada), pois esses jogos não possuem arte de capa vertical. Os ícones refletem a arte vigente nas lojas na data da coleta (o do Free Fire e o do Genshin Impact têm temática de evento/marca da publicadora). O Mario Kart 8 Deluxe usa a imagem horizontal da página oficial da Nintendo e o Fortnite usa arte vertical de uma temporada. Todas são exibidas inteiras, sem corte nem distorção.

**League of Legends** segue com uma ilustração SVG original provisória: não foi encontrada imagem oficial inequívoca do jogo para PC (as páginas oficiais retornaram apenas imagens de notícias, logos da Riot Games ou o ícone de *Wild Rift*, que é outro jogo). Esta é a única capa pendente.

## Como Executar

Use um servidor local (necessário para carregar as legendas `<track>`, que o navegador bloqueia em `file://`):

1. Clone ou baixe este repositório.
2. Na pasta do projeto, execute: `python -m http.server 8000`
3. Acesse `http://localhost:8000` no navegador.

O vídeo de destaque não acompanha o repositório: adicione `assets/videos/destaque.mp4` (e, opcionalmente, `destaque.webm`) para ativar o player. Sem ele, a página mostra um aviso.
