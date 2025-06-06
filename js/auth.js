function mostrarSecao(secao) {
  document.getElementById('apresentacao').style.display = 'none';
  document.getElementById('login').style.display = 'none';
  document.getElementById('cadastro').style.display = 'none';
  document.getElementById(secao).style.display = 'block';
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function senhaForte(senha) {
  return senha.length >= 6 && /[A-Z]/.test(senha) && /[0-9]/.test(senha);
}

function fazerCadastro() {
  const nome = document.getElementById('cadastroNome').value;
  const email = document.getElementById('cadastroEmail').value;
  const senha = document.getElementById('cadastroSenha').value;
  const erro = document.getElementById('cadastroErro');
  erro.textContent = '';

  if (!nome || !email || !senha) {
    erro.textContent = 'Todos os campos são obrigatórios.';
    return;
  }

  if (!validarEmail(email)) {
    erro.textContent = 'Email inválido.';
    return;
  }

  if (!senhaForte(senha)) {
    erro.textContent = 'A senha deve ter pelo menos 6 caracteres, uma letra maiúscula e um número.';
    return;
  }

  localStorage.setItem('usuario', JSON.stringify({ nome, email, senha }));
  alert('Cadastro realizado com sucesso!');
  mostrarSecao('login');
}

function fazerLogin() {
  const email = document.getElementById('loginEmail').value;
  const senha = document.getElementById('loginSenha').value;
  const erro = document.getElementById('loginErro');
  erro.textContent = '';

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (usuario && usuario.email === email && usuario.senha === senha) {
    alert('Login bem-sucedido!');
  } else {
    erro.textContent = 'Email ou senha incorretos.';
  }
}
