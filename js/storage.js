const STORAGE_KEY = 'compras';

function salvarCompras(compras) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(compras));
}

function carregarCompras() {
  const dados = localStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : [];
}