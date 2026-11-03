document.addEventListener('DOMContentLoaded', () => {
  const gradeItens = document.querySelector('#grade-itens');

  function obterFavoritos() {
    return JSON.parse(localStorage.getItem('jogosFavoritos')) || [];
  }

  function salvarFavoritos(favoritos) {
    localStorage.setItem('jogosFavoritos', JSON.stringify(favoritos));
  }

  function atualizarVisualizacao() {
    const favoritos = obterFavoritos();
    gradeItens.querySelectorAll('.card').forEach((card) => {
      const titulo = card.dataset.titulo;
      const btn = card.querySelector('.btn-fav');
      if (favoritos.includes(titulo)) {
        card.classList.add('favorito');
        btn.textContent = '★ Favoritado';
      } else {
        card.classList.remove('favorito');
        btn.textContent = 'Favoritar';
      }
    });
  }

  // Event delegation num único ouvinte no contentor pai
  gradeItens.addEventListener('click', (evento) => {
    const btn = evento.target.closest('.btn-fav');
    if (!btn) return;

    const card = btn.closest('.card');
    const titulo = card.dataset.titulo;
    let favoritos = obterFavoritos();

    if (favoritos.includes(titulo)) {
      favoritos = favoritos.filter((item) => item !== titulo);
    } else {
      favoritos.push(titulo);
    }

    salvarFavoritos(favoritos);
    atualizarVisualizacao();
  });

  atualizarVisualizacao();
});
