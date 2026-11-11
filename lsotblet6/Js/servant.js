(() => {
  const tabela = document.querySelector('.quadro-servos');
  if (!tabela) return;

  const corpo = tabela.tBodies[0];
  const cabecalhos = Array.from(tabela.tHead.rows[0].cells);
  const linhas = Array.from(corpo.rows);

  const normalizar = (texto) =>
    texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

  const iniciarFiltro = () => {
    const classes = [...new Set(linhas.map((l) => l.cells[2].textContent.trim()))].sort();

    const painel = document.createElement('div');
    painel.className = 'filtros';

    const campoBusca = document.createElement('div');
    const rotuloBusca = document.createElement('label');
    rotuloBusca.htmlFor = 'busca-servo';
    rotuloBusca.textContent = 'Buscar por nome:';
    const busca = document.createElement('input');
    busca.type = 'search';
    busca.id = 'busca-servo';
    busca.placeholder = 'Ex.: Morgan';
    campoBusca.append(rotuloBusca, busca);

    const campoClasse = document.createElement('div');
    const rotuloClasse = document.createElement('label');
    rotuloClasse.htmlFor = 'filtro-classe';
    rotuloClasse.textContent = 'Classe:';
    const seletor = document.createElement('select');
    seletor.id = 'filtro-classe';
    seletor.add(new Option('Todas as classes', ''));
    classes.forEach((classe) => seletor.add(new Option(classe, classe)));
    campoClasse.append(rotuloClasse, seletor);

    const limpar = document.createElement('button');
    limpar.type = 'button';
    limpar.className = 'botao-formulario';
    limpar.textContent = 'Limpar filtros';

    const contador = document.createElement('p');
    contador.className = 'contador';
    contador.setAttribute('aria-live', 'polite');

    painel.append(campoBusca, campoClasse, limpar);

    const linhaVazia = document.createElement('tr');
    linhaVazia.className = 'oculto';
    const celulaVazia = linhaVazia.insertCell();
    celulaVazia.colSpan = cabecalhos.length;
    celulaVazia.textContent = 'Nenhum servo encontrado.';
    corpo.append(linhaVazia);

    const aplicarFiltro = () => {
      const termo = normalizar(busca.value);
      const classe = seletor.value;
      let visiveis = 0;

      linhas.forEach((linha) => {
        const nome = normalizar(linha.querySelector('.nome-servo').textContent);
        const combina =
          nome.includes(termo) && (classe === '' || linha.cells[2].textContent.trim() === classe);
        linha.classList.toggle('oculto', !combina);
        if (combina) visiveis++;
      });

      linhaVazia.classList.toggle('oculto', visiveis > 0);
      contador.textContent = `Mostrando ${visiveis} de ${linhas.length} servos`;
    };

    busca.addEventListener('input', aplicarFiltro);
    seletor.addEventListener('change', aplicarFiltro);
    limpar.addEventListener('click', () => {
      busca.value = '';
      seletor.value = '';
      aplicarFiltro();
      busca.focus();
    });

    tabela.closest('.tabela-rolavel').before(painel, contador);
    aplicarFiltro();
  };

  const iniciarOrdenacao = () => {
    const colunasOrdenaveis = { 1: 'texto', 2: 'texto', 3: 'numero', 4: 'numero', 5: 'numero' };
    const ordemInicial = { texto: 'asc', numero: 'desc' };

    const lerNumero = (texto) => parseInt(texto.replace(/\D/g, ''), 10) || 0;

    const ordenar = (indice, direcao) => {
      const tipo = colunasOrdenaveis[indice];
      const ordenaveis = linhas.slice();
      const vazia = Array.from(corpo.rows).find((l) => !l.querySelector('.nome-servo'));

      ordenaveis.sort((a, b) => {
        const valorA = a.cells[indice].textContent.trim();
        const valorB = b.cells[indice].textContent.trim();
        const resultado =
          tipo === 'numero'
            ? lerNumero(valorA) - lerNumero(valorB)
            : valorA.localeCompare(valorB, 'pt-BR');
        return direcao === 'asc' ? resultado : -resultado;
      });

      ordenaveis.forEach((linha) => corpo.append(linha));
      if (vazia) corpo.append(vazia);
    };

    cabecalhos.forEach((cabecalho, indice) => {
      if (!colunasOrdenaveis[indice]) return;

      cabecalho.classList.add('ordenavel');
      cabecalho.tabIndex = 0;
      cabecalho.setAttribute('role', 'button');
      cabecalho.setAttribute('aria-sort', 'none');

      const alternar = () => {
        const atual = cabecalho.dataset.ordem;
        const direcao = atual
          ? atual === 'asc' ? 'desc' : 'asc'
          : ordemInicial[colunasOrdenaveis[indice]];

        cabecalhos.forEach((outro) => {
          delete outro.dataset.ordem;
          outro.setAttribute('aria-sort', 'none');
        });

        cabecalho.dataset.ordem = direcao;
        cabecalho.setAttribute('aria-sort', direcao === 'asc' ? 'ascending' : 'descending');
        ordenar(indice, direcao);
      };

      cabecalho.addEventListener('click', alternar);
      cabecalho.addEventListener('keydown', (evento) => {
        if (evento.key === 'Enter' || evento.key === ' ') {
          evento.preventDefault();
          alternar();
        }
      });
    });
  };

  const iniciarFavoritos = () => {
    const CHAVE = 'avalon-favoritos';

    const carregar = () => {
      try {
        return new Set(JSON.parse(localStorage.getItem(CHAVE)) || []);
      } catch (erro) {
        return new Set();
      }
    };

    const salvar = (favoritos) => {
      try {
        localStorage.setItem(CHAVE, JSON.stringify([...favoritos]));
      } catch (erro) {
        return;
      }
    };

    const favoritos = carregar();

    linhas.forEach((linha) => {
      const celula = linha.querySelector('.nome-servo');
      const nome = celula.textContent.trim();

      const botao = document.createElement('button');
      botao.type = 'button';
      botao.className = 'favorito';
      botao.setAttribute('aria-label', `Favoritar ${nome}`);

      const atualizar = () => {
        const ativo = favoritos.has(nome);
        botao.setAttribute('aria-pressed', String(ativo));
        linha.classList.toggle('favorita', ativo);
      };

      botao.addEventListener('click', (evento) => {
        evento.stopPropagation();
        if (favoritos.has(nome)) favoritos.delete(nome);
        else favoritos.add(nome);
        salvar(favoritos);
        atualizar();
      });

      celula.prepend(botao);
      atualizar();
    });
  };

  const iniciarDetalhes = () => {
    const rotulos = ['Classe', 'Raridade', 'ATK máx.', 'HP máx.'];

    const janela = document.createElement('dialog');
    janela.className = 'detalhes';
    janela.setAttribute('aria-labelledby', 'detalhes-titulo');

    const fechar = document.createElement('button');
    fechar.type = 'button';
    fechar.className = 'botao-fechar';
    fechar.setAttribute('aria-label', 'Fechar detalhes');
    fechar.textContent = '×';

    const imagem = document.createElement('img');
    const titulo = document.createElement('h3');
    titulo.id = 'detalhes-titulo';
    const lista = document.createElement('dl');

    janela.append(fechar, imagem, titulo, lista);
    document.body.append(janela);

    const abrir = (linha) => {
      const celulas = linha.cells;
      const foto = celulas[0].querySelector('img');

      imagem.src = foto.src;
      imagem.alt = foto.alt;
      titulo.textContent = celulas[1].textContent.trim();
      lista.replaceChildren();

      rotulos.forEach((rotulo, i) => {
        const termo = document.createElement('dt');
        termo.textContent = rotulo;
        const valor = document.createElement('dd');
        valor.textContent = celulas[i + 2].textContent.trim();
        lista.append(termo, valor);
      });

      janela.showModal();
    };

    const linhaDoEvento = (evento) => {
      if (evento.target.closest('.favorito')) return null;
      const linha = evento.target.closest('tr');
      return linha && linha.querySelector('.nome-servo') ? linha : null;
    };

    corpo.addEventListener('click', (evento) => {
      const linha = linhaDoEvento(evento);
      if (linha) abrir(linha);
    });

    corpo.addEventListener('keydown', (evento) => {
      if (evento.key !== 'Enter') return;
      const linha = linhaDoEvento(evento);
      if (!linha) return;
      evento.preventDefault();
      abrir(linha);
    });

    linhas.forEach((linha) => {
      linha.tabIndex = 0;
    });

    fechar.addEventListener('click', () => janela.close());
    janela.addEventListener('click', (evento) => {
      if (evento.target === janela) janela.close();
    });
  };

  iniciarFiltro();
  iniciarOrdenacao();
  iniciarFavoritos();
  iniciarDetalhes();
})();