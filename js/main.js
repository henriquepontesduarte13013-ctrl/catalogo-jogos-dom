// main.js — inicialização da aplicação e interações gerais da interface.
(function () {
  'use strict';

  function alternar(botao, alvo, rotuloAbrir, rotuloFechar) {
    const aberto = botao.getAttribute('aria-expanded') === 'true';
    definirEstado(botao, alvo, !aberto, rotuloAbrir, rotuloFechar);
  }

  function definirEstado(botao, alvo, aberto, rotuloAbrir, rotuloFechar) {
    botao.setAttribute('aria-expanded', String(aberto));
    alvo.classList.toggle('aberto', aberto);
    if (rotuloAbrir) {
      botao.setAttribute('aria-label', aberto ? rotuloFechar : rotuloAbrir);
    }
  }

  function iniciarMenu() {
    const botaoMenu = document.querySelector('#menu-toggle');
    const menu = document.querySelector('#menu-principal');
    const botaoCategorias = document.querySelector('#categorias-toggle');
    const menuCategorias = document.querySelector('#categorias-menu');
    if (!botaoMenu || !menu) return;

    const ABRIR = 'Abrir menu de navegação';
    const FECHAR = 'Fechar menu de navegação';

    botaoMenu.addEventListener('click', () => alternar(botaoMenu, menu, ABRIR, FECHAR));

    if (botaoCategorias && menuCategorias) {
      botaoCategorias.addEventListener('click', () => alternar(botaoCategorias, menuCategorias));
    }

    function fecharTudo() {
      definirEstado(botaoMenu, menu, false, ABRIR, FECHAR);
      if (botaoCategorias) definirEstado(botaoCategorias, menuCategorias, false);
    }

    // Fecha ao navegar por um link
    menu.addEventListener('click', (evento) => {
      if (evento.target.closest('a')) fecharTudo();
    });

    // Fecha com Esc
    document.addEventListener('keydown', (evento) => {
      if (evento.key === 'Escape') fecharTudo();
    });

    // Fecha o dropdown ao clicar fora
    document.addEventListener('click', (evento) => {
      if (botaoCategorias && !evento.target.closest('.dropdown')) {
        definirEstado(botaoCategorias, menuCategorias, false);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    iniciarMenu();
    window.Catalogo.iniciar();
  });
})();
