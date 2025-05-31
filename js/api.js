const apiURL = 'https://fakestoreapi.com/products';
const produtosContainer = document.getElementById('produtos-api');
const filtroInput = document.getElementById('filtro-api');
const btnCarregar = document.getElementById('btn-carregar');
const wishlistContainer = document.getElementById('wishlist-container');
const btnWishlist = document.getElementById('btn-ver-wishlist');

let todosProdutos = [];

// Buscar produtos da API
async function buscarProdutos() {
  try {
    const resposta = await fetch(apiURL);
    const dados = await resposta.json();
    todosProdutos = dados;
    exibirProdutos(dados);
    mostrarMensagem('Produtos carregados com sucesso!', 'sucesso');
  } catch (erro) {
    console.error('Erro ao buscar produtos:', erro);
    mostrarMensagem('Erro ao buscar produtos. Tente novamente.', 'erro');
  }
}

// Exibir os produtos na tela
function exibirProdutos(produtos) {
  produtosContainer.innerHTML = '';

  if (produtos.length === 0) {
    produtosContainer.innerHTML = '<p>Nenhum produto encontrado.</p>';
    return;
  }

  produtos.forEach((produto) => {
    const card = document.createElement('div');
    card.className = 'card-produto';

    card.innerHTML = `
      <img src="${produto.image}" alt="${produto.title}" />
      <h3>${produto.title}</h3>
      <p><strong>R$ ${produto.price.toFixed(2)}</strong></p>
      <p class="categoria">${produto.category}</p>
      <button onclick='adicionarWishlist(${JSON.stringify(produto)})'>+ Wishlist</button>
    `;

    produtosContainer.appendChild(card);
  });
}

// Filtro de produtos por nome ou categoria
filtroInput.addEventListener('input', () => {
  const termo = filtroInput.value.toLowerCase();
  const filtrados = todosProdutos.filter((p) =>
    p.title.toLowerCase().includes(termo) || p.category.toLowerCase().includes(termo)
  );
  exibirProdutos(filtrados);
});

// Adicionar produto à wishlist
function adicionarWishlist(produto) {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  const existe = wishlist.find((item) => item.id === produto.id);
  if (existe) {
    mostrarMensagem('Produto já está na wishlist.', 'erro');
    return;
  }

  wishlist.push(produto);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  mostrarMensagem('Produto adicionado à wishlist!', 'sucesso');
}

// Exibir wishlist
function exibirWishlist() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlistContainer.innerHTML = '';

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = '<p>Wishlist vazia.</p>';
    return;
  }

  wishlist.forEach((produto) => {
    const card = document.createElement('div');
    card.className = 'card-produto';

    card.innerHTML = `
      <img src="${produto.image}" alt="${produto.title}" />
      <h3>${produto.title}</h3>
      <p><strong>R$ ${produto.price.toFixed(2)}</strong></p>
      <p class="categoria">${produto.category}</p>
      <button onclick="removerWishlist(${produto.id})">Remover</button>
    `;

    wishlistContainer.appendChild(card);
  });
}

// Remover item da wishlist
function removerWishlist(idProduto) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlist = wishlist.filter((item) => item.id !== idProduto);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  mostrarMensagem('Produto removido da wishlist.', 'sucesso');
  exibirWishlist();
}

// Exibir mensagem de feedback
function mostrarMensagem(texto, tipo) {
  const msg = document.createElement('div');
  msg.className = `mensagem ${tipo}`;
  msg.textContent = texto;
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 3000);
}

// Eventos
btnCarregar.addEventListener('click', buscarProdutos);
btnWishlist.addEventListener('click', exibirWishlist);
