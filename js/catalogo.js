// catalogo.js — dados dos jogos, lógica de favoritos e persistência.
// Migrado de app.js (lógica original preservada: chave, classes e textos).
(function () {
  'use strict';

  const CHAVE_FAVORITOS = 'jogosFavoritos';

  const jogos = [
    { titulo: 'Brawl Stars' },
    { titulo: 'Free Fire' },
    { titulo: 'EA Sports FC' }
  ];

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

  function criarCard(jogo) {
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.titulo = jogo.titulo;

    const titulo = document.createElement('span');
    titulo.className = 'card-titulo';
    titulo.textContent = jogo.titulo;

    const btn = document.createElement('button');
    btn.className = 'btn-fav';
    btn.type = 'button';
    btn.textContent = 'Favoritar';

    card.append(titulo, btn);
    return card;
  }

  function renderizarCards(gradeItens) {
    gradeItens.replaceChildren(...jogos.map(criarCard));
  }

  function atualizarVisualizacao(gradeItens, resumo) {
    const favoritos = obterFavoritos();

    gradeItens.querySelectorAll('.card').forEach((card) => {
      const btn = card.querySelector('.btn-fav');
      const favorito = favoritos.includes(card.dataset.titulo);
      card.classList.toggle('favorito', favorito);
      btn.textContent = favorito ? '★ Favoritado' : 'Favoritar';
      btn.setAttribute('aria-pressed', String(favorito));
    });

    if (resumo) {
      resumo.textContent = favoritos.length
        ? 'Seus favoritos: ' + favoritos.join(', ') + '.'
        : 'Você ainda não favoritou nenhum jogo.';
    }
  }

  function iniciarCatalogo() {
    const gradeItens = document.querySelector('#grade-itens');
    const resumo = document.querySelector('#resumo-favoritos');
    if (!gradeItens) return;

    renderizarCards(gradeItens);

    // Event delegation num único ouvinte no contentor pai
    gradeItens.addEventListener('click', (evento) => {
      const btn = evento.target.closest('.btn-fav');
      if (!btn) return;

      const titulo = btn.closest('.card').dataset.titulo;
      let favoritos = obterFavoritos();

      if (favoritos.includes(titulo)) {
        favoritos = favoritos.filter((item) => item !== titulo);
      } else {
        favoritos.push(titulo);
      }

      salvarFavoritos(favoritos);
      atualizarVisualizacao(gradeItens, resumo);
    });

    atualizarVisualizacao(gradeItens, resumo);
  }

  window.Catalogo = { iniciar: iniciarCatalogo };
})();
