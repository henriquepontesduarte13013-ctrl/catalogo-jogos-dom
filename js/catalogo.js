// catalogo.js — dados dos jogos, pesquisa, filtros, favoritos e persistência.
(function () {
  'use strict';

  const CHAVE_FAVORITOS = 'jogosFavoritos';
  const TODAS = 'todas';

  const jogos = [
    { titulo: 'Brawl Stars', categoria: 'Ação' },
    { titulo: 'Free Fire', categoria: 'Battle Royale' },
    { titulo: 'EA Sports FC', categoria: 'Esportes' }
  ];

  const filtros = { busca: '', categoria: TODAS };
  const el = {};

  /* ---------- Utilitários ---------- */

  function normalizar(texto) {
    return texto
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
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
  }

  /* ---------- Catálogo (cards) ---------- */

  function criarCard(jogo) {
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.titulo = jogo.titulo;
    card.dataset.categoria = jogo.categoria;

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

    card.append(info, btn);
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

    item.append(info, btn);
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
    el.chips = document.querySelectorAll('.chip');
    if (!el.grade) return;

    renderizarCatalogo();
    vincularEventos();
    atualizarFavoritosNaTela();
    aplicarFiltros();
  }

  window.Catalogo = { iniciar: iniciarCatalogo };
})();
