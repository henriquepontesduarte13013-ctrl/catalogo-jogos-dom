# Catálogo Interativo de Jogos (`catalogo-jogos-dom`)

Aplicação web desenvolvida para a disciplina de **Desenvolvimento Front-End Para Web**, com foco em manipulação dinâmica do DOM utilizando HTML5, CSS3 e JavaScript puro (Vanilla JS).

## Funcionalidades

- **Favoritar e Desfavoritar Jogos:** Alternância dinâmica de estado visual dos cards (`.favorito`) e atualização do texto dos botões (`Favoritar` / `★ Favoritado`).
- **Persistência Local (`localStorage`):** Os jogos marcados como favoritos permanecem salvos no navegador mesmo após recarregar ou fechar a página.
- **Delegação de Eventos (*Event Delegation*):** Uso de um único `addEventListener` no container pai (`#grade-itens`) com `closest()` para capturar cliques nos botões de forma performática.

## Tecnologias e Conceitos Aplicados

- **HTML5 Semântico:** Estruturação com `<header>`, `<main>`, `<section>`, `<article>` e atributos personalizados `data-titulo`.
- **CSS3:** Estilização limpa dos cards com Flexbox e destaque visual para itens favoritados.
- **JavaScript (ES6+):** Manipulação de DOM (`querySelector`, `querySelectorAll`, `classList`, `dataset`, `textContent`) e armazenamento no navegador (`localStorage`, `JSON.parse`, `JSON.stringify`).

## Estrutura de Arquivos

```
catalogo-jogos-dom/
├── index.html        # Estrutura semântica (GAMEVERSE)
├── css/
│   ├── reset.css     # Reset (box-sizing: border-box)
│   └── style.css     # Variáveis, tema Dark Purple, navbar e cards
├── js/
│   ├── main.js       # Inicialização, menu hambúrguer e dropdown
│   └── catalogo.js   # Dados dos jogos, favoritos e localStorage
└── assets/           # images, videos, icons, captions (reservado)
```

## Como Executar

1. Clone ou baixe este repositório.
2. Abra o arquivo `index.html` diretamente em qualquer navegador web moderno.
