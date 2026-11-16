// catalogo.js — dados dos jogos, pesquisa, filtros, favoritos e persistência.
(function () {
  'use strict';

  const CHAVE_FAVORITOS = 'jogosFavoritos';
  const TODAS = 'todas';

  // Categorias (ordem dos chips/dropdown). "curto" é o rótulo usado no gráfico.
  const categorias = [
    { nome: 'Ação e Aventura', curto: 'Ação/Aventura', icone: 'icon-acao' },
    { nome: 'Battle Royale', curto: 'Battle Royale', icone: 'icon-battle-royale' },
    { nome: 'Esportes e Corrida', curto: 'Esportes/Corrida', icone: 'icon-esportes' },
    { nome: 'Mundo Aberto e Sandbox', curto: 'Mundo Aberto', icone: 'icon-mundo-aberto' },
    { nome: 'RPG', curto: 'RPG', icone: 'icon-rpg' },
    { nome: 'FPS e MOBA', curto: 'FPS/MOBA', icone: 'icon-fps-moba' },
    { nome: 'Estratégia e Simulação', curto: 'Estratégia/Simulação', icone: 'icon-estrategia' },
    { nome: 'Plataforma, Luta e Terror', curto: 'Plataforma/Luta', icone: 'icon-plataforma' }
  ];

  function jogo(titulo, categoria, arquivo) {
    return { titulo: titulo, categoria: categoria, capa: 'assets/images/capa-' + arquivo + '.svg' };
  }

  const jogos = [
    // Jogos originais
    jogo('Brawl Stars', 'Ação e Aventura', 'brawl-stars'),
    jogo('Free Fire', 'Battle Royale', 'free-fire'),
    jogo('EA Sports FC', 'Esportes e Corrida', 'ea-sports-fc'),
    // Ação e aventura
    jogo('God of War Ragnarök', 'Ação e Aventura', 'god-of-war-ragnarok'),
    jogo('The Legend of Zelda: Breath of the Wild', 'Ação e Aventura', 'zelda-breath-of-the-wild'),
    // Battle Royale
    jogo('Fortnite', 'Battle Royale', 'fortnite'),
    jogo('PUBG: Battlegrounds', 'Battle Royale', 'pubg-battlegrounds'),
    jogo('Apex Legends', 'Battle Royale', 'apex-legends'),
    // Esportes e corrida
    jogo('Rocket League', 'Esportes e Corrida', 'rocket-league'),
    jogo('Forza Horizon 5', 'Esportes e Corrida', 'forza-horizon-5'),
    jogo('Mario Kart 8 Deluxe', 'Esportes e Corrida', 'mario-kart-8-deluxe'),
    // Mundo aberto e sandbox
    jogo('GTA V', 'Mundo Aberto e Sandbox', 'gta-v'),
    jogo('Minecraft', 'Mundo Aberto e Sandbox', 'minecraft'),
    jogo('Terraria', 'Mundo Aberto e Sandbox', 'terraria'),
    // RPG
    jogo('Genshin Impact', 'RPG', 'genshin-impact'),
    jogo('Elden Ring', 'RPG', 'elden-ring'),
    jogo('The Witcher 3', 'RPG', 'the-witcher-3'),
    // FPS e MOBA
    jogo('Valorant', 'FPS e MOBA', 'valorant'),
    jogo('Counter-Strike 2', 'FPS e MOBA', 'counter-strike-2'),
    jogo('League of Legends', 'FPS e MOBA', 'league-of-legends'),
    jogo('Dota 2', 'FPS e MOBA', 'dota-2'),
    // Estratégia e simulação
    jogo('Clash of Clans', 'Estratégia e Simulação', 'clash-of-clans'),
    jogo('Civilization VI', 'Estratégia e Simulação', 'civilization-vi'),
    jogo('The Sims 4', 'Estratégia e Simulação', 'the-sims-4'),
    jogo('Stardew Valley', 'Estratégia e Simulação', 'stardew-valley'),
    // Plataforma, luta, party e terror
    jogo('Hollow Knight', 'Plataforma, Luta e Terror', 'hollow-knight'),
    jogo('Super Mario Odyssey', 'Plataforma, Luta e Terror', 'super-mario-odyssey'),
    jogo('Street Fighter 6', 'Plataforma, Luta e Terror', 'street-fighter-6'),
    jogo('Among Us', 'Plataforma, Luta e Terror', 'among-us'),
    jogo('Resident Evil 4', 'Plataforma, Luta e Terror', 'resident-evil-4')
  ];

  const SVG_NS = 'http://www.w3.org/2000/svg';

  const filtros = { busca: '', categoria: TODAS };
  const el = {};

  /* ---------- Utilitários ---------- */

  function normalizar(texto) {
    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  /* ---------- Persistência ---------- */

  function obterFavoritos() {
    try {
      const salvos = JSON.parse(localStorage.getItem(CHAVE_FAVORITOS));
      return Array.isArray(salvos) ? salvos : [];
    } catch (erro) {
      return [];
    }
  }

  function salvarFavoritos(favoritos) {
    try {
      localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(favoritos));
    } catch (erro) {
      console.warn('Não foi possível salvar os favoritos.', erro);
    }
  }

  function alternarFavorito(titulo) {
    const favoritos = obterFavoritos();
    const atualizados = favoritos.includes(titulo)
      ? favoritos.filter((item) => item !== titulo)
      : favoritos.concat(titulo);
    salvarFavoritos(atualizados);
    atualizarFavoritosNaTela();
    document.dispatchEvent(new CustomEvent('favoritos:alterados', {
      detail: { favoritos: atualizados }
    }));
  }

  /* ---------- Ícones SVG (sprite do index.html) ---------- */

  function criarIcone(id, classe) {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'icone ' + classe);
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    const uso = document.createElementNS(SVG_NS, 'use');
    uso.setAttribute('href', '#' + id);
    svg.appendChild(uso);
    return svg;
  }

  /* ---------- Categorias (chips e dropdown gerados a partir dos dados) ---------- */

  function criarFiltrosDeCategoria() {
    const grupoChips = document.querySelector('.chips');
    const menu = document.querySelector('#categorias-menu');

    categorias.forEach((categoria) => {
      if (grupoChips) {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'chip';
        chip.dataset.categoria = categoria.nome;
        chip.setAttribute('aria-pressed', 'false');
        chip.append(criarIcone(categoria.icone, ''), categoria.nome);
        grupoChips.appendChild(chip);
      }

      if (menu) {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#catalogo';
        link.dataset.categoria = categoria.nome;
        link.textContent = categoria.nome;
        item.appendChild(link);
        menu.appendChild(item);
      }
    });
  }

  /* ---------- Catálogo (cards) ---------- */

  function criarCard(jogo) {
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.titulo = jogo.titulo;
    card.dataset.categoria = jogo.categoria;

    const capa = document.createElement('img');
    capa.className = 'card-capa';
    capa.src = jogo.capa;
    capa.alt = 'Capa ilustrativa de ' + jogo.titulo;
    capa.width = 640;
    capa.height = 360;
    capa.loading = 'lazy';

    const selo = criarIcone('icon-estrela', 'selo-fav');

    const rodape = document.createElement('div');
    rodape.className = 'card-rodape';

    const info = document.createElement('div');
    info.className = 'card-info';

    const titulo = document.createElement('span');
    titulo.className = 'card-titulo';
    titulo.textContent = jogo.titulo;

    const categoria = document.createElement('span');
    categoria.className = 'etiqueta';
    categoria.textContent = jogo.categoria;

    info.append(titulo, categoria);

    const btn = document.createElement('button');
    btn.className = 'btn-fav';
    btn.type = 'button';
    btn.textContent = 'Favoritar';

    rodape.append(info, btn);
    card.append(capa, selo, rodape);
    return card;
  }

  function renderizarCatalogo() {
    el.grade.replaceChildren(...jogos.map(criarCard));
  }

  /* ---------- Pesquisa e filtros ---------- */

  function jogoCorresponde(jogo) {
    if (!jogo || typeof jogo.titulo !== 'string') return false;
    const porCategoria = filtros.categoria === TODAS || jogo.categoria === filtros.categoria;
    const porNome = normalizar(jogo.titulo).includes(normalizar(filtros.busca));
    return porCategoria && porNome;
  }

  function aplicarFiltros() {
    let visiveis = 0;

    el.grade.querySelectorAll('.card').forEach((card) => {
      const jogo = jogos.find((item) => item.titulo === card.dataset.titulo);
      const mostrar = jogoCorresponde(jogo);
      card.hidden = !mostrar;
      if (mostrar) visiveis += 1;
    });

    el.semResultados.hidden = visiveis > 0;
    el.status.textContent = visiveis === 1
      ? '1 jogo encontrado.'
      : visiveis + ' jogos encontrados.';
  }

  function atualizarChips() {
    el.chips.forEach((chip) => {
      const ativo = chip.dataset.categoria === filtros.categoria;
      chip.classList.toggle('ativo', ativo);
      chip.setAttribute('aria-pressed', String(ativo));
    });
  }

  function definirCategoria(categoria) {
    filtros.categoria = categoria;
    atualizarChips();
    aplicarFiltros();
  }

  function definirBusca(texto) {
    filtros.busca = texto;
    aplicarFiltros();
  }

  /* ---------- Favoritos (cards, lista e resumo) ---------- */

  function criarItemFavorito(jogo) {
    const item = document.createElement('li');
    item.className = 'favorito-item';
    item.dataset.titulo = jogo.titulo;

    const info = document.createElement('div');
    info.className = 'card-info';

    const titulo = document.createElement('span');
    titulo.className = 'card-titulo';
    titulo.textContent = jogo.titulo;

    const categoria = document.createElement('span');
    categoria.className = 'etiqueta';
    categoria.textContent = jogo.categoria;

    info.append(titulo, categoria);

    const btn = document.createElement('button');
    btn.className = 'btn-remover';
    btn.type = 'button';
    btn.textContent = 'Remover';
    btn.setAttribute('aria-label', 'Remover ' + jogo.titulo + ' dos favoritos');

    item.append(criarIcone('icon-estrela', 'item-estrela'), info, btn);
    return item;
  }

  function atualizarCards(favoritos) {
    el.grade.querySelectorAll('.card').forEach((card) => {
      const btn = card.querySelector('.btn-fav');
      const favorito = favoritos.includes(card.dataset.titulo);
      card.classList.toggle('favorito', favorito);
      btn.textContent = favorito ? '★ Favoritado' : 'Favoritar';
      btn.setAttribute('aria-pressed', String(favorito));
    });
  }

  function atualizarListaFavoritos(favoritosValidos) {
    el.listaFavoritos.replaceChildren(...favoritosValidos.map(criarItemFavorito));
    el.semFavoritos.hidden = favoritosValidos.length > 0;

    if (favoritosValidos.length === 0) {
      el.resumo.textContent = 'Nenhum jogo favoritado.';
    } else if (favoritosValidos.length === 1) {
      el.resumo.textContent = '1 jogo favoritado.';
    } else {
      el.resumo.textContent = favoritosValidos.length + ' jogos favoritados.';
    }
  }

  function atualizarFavoritosNaTela() {
    const favoritos = obterFavoritos();
    // Só exibe favoritos que existem no catálogo (ordem do catálogo).
    const validos = jogos.filter((jogo) => favoritos.includes(jogo.titulo));
    atualizarCards(favoritos);
    atualizarListaFavoritos(validos);
  }

  /* ---------- Eventos ---------- */

  function vincularEventos() {
    // Event delegation: cliques nos botões Favoritar do catálogo
    el.grade.addEventListener('click', (evento) => {
      const btn = evento.target.closest('.btn-fav');
      if (!btn) return;
      alternarFavorito(btn.closest('.card').dataset.titulo);
    });

    // Event delegation: botões Remover da lista de favoritos
    el.listaFavoritos.addEventListener('click', (evento) => {
      const btn = evento.target.closest('.btn-remover');
      if (!btn) return;
      alternarFavorito(btn.closest('.favorito-item').dataset.titulo);
    });

    // Pesquisa em tempo real
    el.busca.addEventListener('input', () => definirBusca(el.busca.value));

    // Filtro por categoria: apenas chips e links do dropdown
    document.addEventListener('click', (evento) => {
      const origem = evento.target.closest('.chip, .dropdown__menu a');
      if (!origem || !origem.dataset.categoria) return;
      definirCategoria(origem.dataset.categoria);
    });
  }

  function iniciarCatalogo() {
    el.grade = document.querySelector('#grade-itens');
    el.busca = document.querySelector('#campo-busca');
    el.status = document.querySelector('#status-catalogo');
    el.semResultados = document.querySelector('#msg-sem-resultados');
    el.listaFavoritos = document.querySelector('#lista-favoritos');
    el.semFavoritos = document.querySelector('#msg-sem-favoritos');
    el.resumo = document.querySelector('#resumo-favoritos');
    if (!el.grade) return;
    criarFiltrosDeCategoria();
    el.chips = document.querySelectorAll('.chip');

    renderizarCatalogo();
    vincularEventos();
    atualizarFavoritosNaTela();
    aplicarFiltros();
  }

  window.Catalogo = {
    iniciar: iniciarCatalogo,
    // Somente leitura: usados pelo gráfico (graficos.js)
    obterJogos: () => jogos.map((item) => ({ titulo: item.titulo, categoria: item.categoria })),
    obterCategorias: () => categorias.map((item) => ({ nome: item.nome, curto: item.curto })),
    obterFavoritos: obterFavoritos
  };
})();
