const STORAGE_KEY_COMPRAS = 'compras';
const STORAGE_KEY_USUARIOS = 'usuarios';
const STORAGE_KEY_USUARIO_LOGADO = 'usuario';

// Compras
function salvarCompras(compras) {
  localStorage.setItem(STORAGE_KEY_COMPRAS, JSON.stringify(compras));
}

function carregarCompras() {
  const dados = localStorage.getItem(STORAGE_KEY_COMPRAS);
  return dados ? JSON.parse(dados) : [];
}

// Usuários
function salvarUsuarios(usuarios) {
  localStorage.setItem(STORAGE_KEY_USUARIOS, JSON.stringify(usuarios));
}

function carregarUsuarios() {
  const dados = localStorage.getItem(STORAGE_KEY_USUARIOS);
  return dados ? JSON.parse(dados) : [];
}

// Usuário Logado
function salvarUsuarioLogado(usuario) {
  localStorage.setItem(STORAGE_KEY_USUARIO_LOGADO, JSON.stringify(usuario));
}

function carregarUsuarioLogado() {
  const dados = localStorage.getItem(STORAGE_KEY_USUARIO_LOGADO);
  return dados ? JSON.parse(dados) : null;
}

function atualizarUsuarioLogado(novoUsuario) {
  salvarUsuarioLogado(novoUsuario);

  const usuarios = carregarUsuarios();
  const index = usuarios.findIndex(u => u.email === novoUsuario.email);
  if (index !== -1) {
    usuarios[index] = novoUsuario;
    salvarUsuarios(usuarios);
  }
}

function deslogarUsuario() {
  localStorage.removeItem(STORAGE_KEY_USUARIO_LOGADO);
}
