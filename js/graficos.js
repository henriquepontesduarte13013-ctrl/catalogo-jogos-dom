// graficos.js — gráfico de barras horizontais (Canvas) de favoritos por categoria.
// Somente lê os dados de Catalogo; nunca escreve em localStorage.
(function () {
  'use strict';

  const ALTURA_LINHA = 34;
  const MARGEM = { topo: 8, direita: 28, base: 30, esquerda: 8 };
  const el = {};

  /* ---------- Dados ---------- */

  // Retorna TODAS as categorias do catálogo, inclusive as sem favoritos (total 0).
  function contarFavoritosPorCategoria() {
    const categorias = window.Catalogo.obterCategorias();
    const jogos = window.Catalogo.obterJogos();
    const favoritos = window.Catalogo.obterFavoritos();

    return categorias.map((categoria) => {
      const total = jogos.filter((jogo) =>
        jogo.categoria === categoria.nome && favoritos.includes(jogo.titulo)
      ).length;
      const disponiveis = jogos.filter((jogo) => jogo.categoria === categoria.nome).length;
      return { nome: categoria.nome, rotulo: categoria.curto, total: total, disponiveis: disponiveis };
    });
  }

  /* ---------- Desenho ---------- */

  function cor(variavel, reserva) {
    const valor = getComputedStyle(document.documentElement).getPropertyValue(variavel).trim();
    return valor || reserva;
  }

  function prepararCanvas(quantidade) {
    const dpr = window.devicePixelRatio || 1;
    const largura = Math.max(el.area.clientWidth, 220);
    const altura = MARGEM.topo + quantidade * ALTURA_LINHA + MARGEM.base;
    el.canvas.style.width = largura + 'px';
    el.canvas.style.height = altura + 'px';
    el.canvas.width = Math.round(largura * dpr);
    el.canvas.height = Math.round(altura * dpr);

    const ctx = el.canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, largura: largura, altura: altura };
  }

  function ajustarTexto(ctx, texto, larguraMaxima) {
    if (ctx.measureText(texto).width <= larguraMaxima) return texto;
    let corte = texto;
    while (corte.length > 1 && ctx.measureText(corte + '…').width > larguraMaxima) {
      corte = corte.slice(0, -1);
    }
    return corte + '…';
  }

  function desenhar() {
    const dados = contarFavoritosPorCategoria();
    const { ctx, largura, altura } = prepararCanvas(dados.length);

    const corTexto = cor('--cor-texto', '#ecebf5');
    const corSuave = cor('--cor-texto-suave', '#a5a3bd');
    const corGrade = cor('--cor-borda', '#34344d');
    const corPrimaria = cor('--cor-primaria', '#7c3aed');
    const corNeon = cor('--cor-neon', '#b46cff');
    const corBrilho = cor('--cor-neon-brilho', 'rgba(180,108,255,0.45)');
    const fonte = getComputedStyle(document.body).fontFamily;

    ctx.clearRect(0, 0, largura, altura);
    ctx.font = '12px ' + fonte;
    ctx.textBaseline = 'middle';

    // Coluna de rótulos à esquerda (limitada a metade da largura)
    const maiorRotulo = Math.max(...dados.map((d) => ctx.measureText(d.rotulo).width));
    const colunaRotulos = Math.min(Math.ceil(maiorRotulo) + 12, largura * 0.5);
    const areaX = MARGEM.esquerda + colunaRotulos;
    const areaL = largura - areaX - MARGEM.direita;
    const areaTopo = MARGEM.topo;
    const areaA = dados.length * ALTURA_LINHA;

    // Escala: inteiros de 0 até o maior total (mínimo 1)
    const maximo = Math.max(1, ...dados.map((d) => d.total));

    // Linhas verticais da grade e eixo X com valores inteiros
    ctx.lineWidth = 1;
    for (let i = 0; i <= maximo; i += 1) {
      const x = areaX + (areaL * i) / maximo;
      ctx.strokeStyle = corGrade;
      ctx.beginPath();
      ctx.moveTo(x, areaTopo);
      ctx.lineTo(x, areaTopo + areaA);
      ctx.stroke();
      ctx.fillStyle = corSuave;
      ctx.textAlign = 'center';
      ctx.fillText(String(i), x, areaTopo + areaA + 14);
    }

    // Barras (uma linha por categoria)
    const espessura = 16;
    dados.forEach((dado, indice) => {
      const yCentro = areaTopo + indice * ALTURA_LINHA + ALTURA_LINHA / 2;
      const y = yCentro - espessura / 2;
      const larguraBarra = (areaL * dado.total) / maximo;

      // Rótulo da categoria
      ctx.font = '12px ' + fonte;
      ctx.fillStyle = corSuave;
      ctx.textAlign = 'right';
      ctx.fillText(ajustarTexto(ctx, dado.rotulo, colunaRotulos - 12), areaX - 8, yCentro);

      if (dado.total > 0) {
        const gradiente = ctx.createLinearGradient(areaX, 0, areaX + larguraBarra, 0);
        gradiente.addColorStop(0, corPrimaria);
        gradiente.addColorStop(1, corNeon);
        ctx.save();
        ctx.shadowColor = corBrilho;
        ctx.shadowBlur = 10;
        ctx.fillStyle = gradiente;
        ctx.fillRect(areaX, y, larguraBarra, espessura);
        ctx.restore();
      } else {
        ctx.fillStyle = corGrade;
        ctx.fillRect(areaX, yCentro - 1, 3, 2);
      }

      // Valor ao final da barra
      ctx.fillStyle = corTexto;
      ctx.textAlign = 'left';
      ctx.font = 'bold 13px ' + fonte;
      ctx.fillText(String(dado.total), areaX + larguraBarra + 8, yCentro);
    });

    atualizarLegenda(dados);
  }

  /* ---------- Alternativa textual (acessibilidade) ---------- */

  function atualizarLegenda(dados) {
    const itens = dados.map((dado) => {
      const li = document.createElement('li');
      li.textContent = dado.nome + ': ' + dado.total +
        (dado.total === 1 ? ' favorito' : ' favoritos');
      return li;
    });
    el.legenda.replaceChildren(...itens);
  }

  /* ---------- Inicialização ---------- */

  function iniciarGraficos() {
    el.canvas = document.querySelector('#grafico-favoritos');
    el.area = document.querySelector('#grafico-area');
    el.legenda = document.querySelector('#grafico-legenda');
    if (!el.canvas || !el.area || !el.legenda || !el.canvas.getContext) return;

    desenhar();

    // Atualiza quando um favorito é adicionado/removido (evento de catalogo.js)
    document.addEventListener('favoritos:alterados', desenhar);

    // Redesenha quando a largura disponível muda (responsivo)
    let larguraAnterior = el.area.clientWidth;
    const aoRedimensionar = () => {
      if (el.area.clientWidth !== larguraAnterior) {
        larguraAnterior = el.area.clientWidth;
        desenhar();
      }
    };
    if ('ResizeObserver' in window) {
      new ResizeObserver(aoRedimensionar).observe(el.area);
    } else {
      window.addEventListener('resize', aoRedimensionar);
    }
  }

  window.Graficos = { iniciar: iniciarGraficos };
})();
