const formCompra = document.getElementById('form-compra');
const produtoInput = document.getElementById('produto');
const quantidadeInput = document.getElementById('quantidade');
const precoInput = document.getElementById('preco');

const tabelaCompras = document.getElementById('tabela-compras');
const buscaInput = document.getElementById('busca');

const btnToggleSelect = document.getElementById('btn-toggle-select');
const btnDelete = document.getElementById('btn-delete');
const btnEdit = document.getElementById('btn-edit');

const thSelect = document.getElementById('th-select');
const thData = document.getElementById('th-data');

let compras = [];
let selecionando = false;
let selecionados = new Set();
let editandoId = null;

function salvarLocalStorage() {
  localStorage.setItem('compras', JSON.stringify(compras));
}

function carregarLocalStorage() {
  const dados = localStorage.getItem('compras');
  compras = dados ? JSON.parse(dados) : [];
}

function formatarPreco(valor) {
  return `R$ ${Number(valor).toFixed(2).replace('.', ',')}`;
}

function gerarIdUnico() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function atualizarTotalGasto() {
  const total = compras.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
  const divTotal = document.getElementById('total-gasto');
  if (divTotal) {
    divTotal.textContent = `Total Gasto: ${formatarPreco(total)}`;
  }
}

// Renderizar a tabela de compras
function renderizarTabela(filtradas = null) {
  const lista = filtradas || compras;
  tabelaCompras.innerHTML = '';

  lista.forEach(({ id, produto, quantidade, preco, prioridade, dataCriacao }) => {
    const tr = document.createElement('tr');

    const tdSelect = document.createElement('td');
    tdSelect.style.display = selecionando ? 'table-cell' : 'none';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = selecionados.has(id);
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) selecionados.add(id);
      else selecionados.delete(id);
      atualizarBotoes();
    });
    tdSelect.appendChild(checkbox);
    tr.appendChild(tdSelect);

    const tdProduto = document.createElement('td');
    tdProduto.textContent = produto;
    tr.appendChild(tdProduto);

    const tdQuantidade = document.createElement('td');
    tdQuantidade.textContent = quantidade;
    tr.appendChild(tdQuantidade);

    const tdPreco = document.createElement('td');
    tdPreco.textContent = formatarPreco(preco);
    tr.appendChild(tdPreco);

    const tdPrioridade = document.createElement('td');
    tdPrioridade.textContent = prioridade || '-';
    tr.appendChild(tdPrioridade);

    const tdData = document.createElement('td');
    tdData.textContent = new Date(dataCriacao).toLocaleDateString('pt-BR');
    tr.appendChild(tdData);

    tabelaCompras.appendChild(tr);
  });

  thSelect.style.display = selecionando ? 'table-cell' : 'none';
  btnToggleSelect.style.display = compras.length > 0 ? 'inline-flex' : 'none';

  atualizarBotoes();
}

function atualizarBotoes() {
  if (selecionando && selecionados.size > 0) {
    btnDelete.style.display = 'inline-flex';
    btnEdit.style.display = selecionados.size === 1 ? 'inline-flex' : 'none';
  } else {
    btnDelete.style.display = 'none';
    btnEdit.style.display = 'none';
  }
}

function adicionarCompra(produto, quantidade, preco, prioridade = '-') {
  const novoItem = {
    id: gerarIdUnico(),
    produto,
    quantidade: Number(quantidade),
    preco: Number(preco),
    prioridade,
    dataCriacao: new Date().toISOString(),
  };
  compras.push(novoItem);
  salvarLocalStorage();
  renderizarTabela();
  atualizarTotalGasto();
}

function excluirCompra(ids) {
  if (!Array.isArray(ids)) ids = [ids];
  compras = compras.filter(c => !ids.includes(c.id));
  selecionados.clear();
  salvarLocalStorage();
  renderizarTabela();
  atualizarTotalGasto();
}

function alternarSelecao() {
  selecionando = !selecionando;
  if (!selecionando) selecionados.clear();
  atualizarBotoes();
  renderizarTabela();
}

function filtrarCompras(texto) {
  const filtradas = compras.filter(c =>
    c.produto.toLowerCase().includes(texto.toLowerCase())
  );
  renderizarTabela(filtradas);
}

function resetarFormulario(form) {
  form.reset();
  const radioMedia = form.querySelector('input[name="prioridade"][value="Média"]');
  if (radioMedia) radioMedia.checked = true;
}

// Envio de Formulário
formCompra.addEventListener('submit', function(e) {
  e.preventDefault();
  const produto = produtoInput.value.trim();
  const quantidade = quantidadeInput.value;
  const preco = precoInput.value;
  const prioridade = formCompra.querySelector('input[name="prioridade"]:checked').value;

  if (!produto || !quantidade || !preco) {
    alert('Preencha todos os campos.');
    return;
  }

  if (editandoId) {
    const index = compras.findIndex(c => c.id === editandoId);
    if (index !== -1) {
      compras[index].produto = produto;
      compras[index].quantidade = Number(quantidade);
      compras[index].preco = Number(preco);
      compras[index].prioridade = prioridade;

      salvarLocalStorage();
      renderizarTabela();
      atualizarTotalGasto();
    }
    editandoId = null;
  } else {
    adicionarCompra(produto, quantidade, preco, prioridade);
  }

  resetarFormulario(formCompra);
});

// Botões
btnToggleSelect.addEventListener('click', alternarSelecao);

btnDelete.addEventListener('click', () => {
  excluirCompra([...selecionados]);
});

btnEdit.addEventListener('click', () => {
  if (selecionados.size === 1) {
    const idParaEditar = [...selecionados][0];
    const compra = compras.find(c => c.id === idParaEditar);
    if (!compra) return;

    produtoInput.value = compra.produto;
    quantidadeInput.value = compra.quantidade;
    precoInput.value = compra.preco;
    const radioPrioridade = formCompra.querySelector(`input[name="prioridade"][value="${compra.prioridade}"]`);
    if (radioPrioridade) radioPrioridade.checked = true;

    editandoId = idParaEditar;
    selecionando = false;
    selecionados.clear();
    atualizarBotoes();
    renderizarTabela();
  }
});

// Aqui, adiciona o filtro em tempo real no input de busca
buscaInput.addEventListener('input', e => {
  filtrarCompras(e.target.value);
});

// Inicialização
carregarLocalStorage();
renderizarTabela();
atualizarTotalGasto();
