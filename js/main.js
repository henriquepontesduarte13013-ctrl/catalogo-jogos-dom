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

  function estaAberto(botao) {
    return Boolean(botao) && botao.getAttribute('aria-expanded') === 'true';
  }

  function estaVisivel(elemento) {
    return elemento.getClientRects().length > 0;
  }

  function iniciarMenu() {
    const botaoMenu = document.querySelector('#menu-toggle');
    const menu = document.querySelector('#menu-principal');
    const botaoCategorias = document.querySelector('#categorias-toggle');
    const menuCategorias = document.querySelector('#categorias-menu');
    if (!botaoMenu || !menu) return;

    const dropdown = botaoCategorias ? botaoCategorias.closest('.dropdown') : null;
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

    // Botão que abre o menu e pode receber foco agora: o hambúrguer (mobile)
    // ou, no desktop (hambúrguer oculto), o botão do dropdown de categorias.
    function devolverFoco() {
      const botao = estaVisivel(botaoMenu) ? botaoMenu : (botaoCategorias || botaoMenu);
      botao.focus({ preventScroll: true });
    }

    // Ao escolher um link, fecha o menu. Nas categorias, o foco volta ao botão
    // depois que o navegador conclui a navegação (a navegação não é impedida).
    menu.addEventListener('click', (evento) => {
      const link = evento.target.closest('a');
      if (!link) return;
      const ehCategoria = Boolean(link.closest('.dropdown__menu'));
      fecharTudo();
      if (ehCategoria) setTimeout(devolverFoco, 0);
    });

    // Esc fecha o menu/dropdown e devolve o foco ao botão que o abriu
    document.addEventListener('keydown', (evento) => {
      if (evento.key !== 'Escape') return;
      if (!estaAberto(botaoMenu) && !estaAberto(botaoCategorias)) return;
      fecharTudo();
      devolverFoco();
    });

    // Fecha o dropdown ao clicar fora
    document.addEventListener('click', (evento) => {
      if (botaoCategorias && !evento.target.closest('.dropdown')) {
        definirEstado(botaoCategorias, menuCategorias, false);
      }
    });

    // Fecha o dropdown quando o foco (Tab/Shift+Tab) sai dele para outro elemento
    if (dropdown) {
      dropdown.addEventListener('focusout', (evento) => {
        const destino = evento.relatedTarget;
        if (destino && !dropdown.contains(destino)) {
          definirEstado(botaoCategorias, menuCategorias, false);
        }
      });
    }
  }

  // Vídeo de destaque. Enquanto data-disponivel="false" nenhum arquivo é
  // requisitado e o aviso permanece. Para ativar um vídeo real: coloque os
  // arquivos em assets/videos/ e mude data-disponivel para "true" no index.html.
  function iniciarVideo() {
    const video = document.querySelector('#video-destaque');
    const aviso = document.querySelector('#video-aviso');
    if (!video || !aviso) return;

    function mostrarAviso() {
      video.hidden = true;
      aviso.hidden = false;
    }

    if (video.dataset.disponivel !== 'true') {
      mostrarAviso();
      return;
    }

    const formatos = [['mp4', 'video/mp4'], ['webm', 'video/webm']]
      .filter(([chave]) => video.dataset[chave]);
    if (formatos.length === 0) {
      mostrarAviso();
      return;
    }

    const fontes = formatos.map(([chave, tipo]) => {
      const fonte = document.createElement('source');
      fonte.src = video.dataset[chave];
      fonte.type = tipo;
      return fonte;
    });
    const ultima = fontes[fontes.length - 1];

    // Erros de <source> não propagam (bubble), mas passam pela fase de captura.
    video.addEventListener('error', (evento) => {
      if (evento.target === ultima || evento.target === video) mostrarAviso();
    }, true);

    video.prepend(...fontes);
    video.hidden = false;
    aviso.hidden = true;
    video.load();
  }

  document.addEventListener('DOMContentLoaded', () => {
    iniciarMenu();
    window.Catalogo.iniciar();
    window.Graficos.iniciar();
    iniciarVideo();
  });
})();
