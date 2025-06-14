// Função para login
function fazerLogin() {
  const email = document.getElementById('loginEmail').value;
  const senha = document.getElementById('loginSenha').value;
  const erro = document.getElementById('loginErro');

  erro.textContent = '';
  erro.style.display = 'none';

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (usuario && usuario.email === email && usuario.senha === senha) {
    window.location.href = 'dashboard.html';
  } else {
    erro.textContent = 'Email ou senha incorretos.';
    erro.style.display = 'block';
  }
}

// Função para cadastro
function fazerCadastro() {
  const nome = document.getElementById('cadastroNome').value;
  const email = document.getElementById('cadastroEmail').value;
  const senha = document.getElementById('cadastroSenha').value;
  const erro = document.getElementById('cadastroErro');

  erro.textContent = '';
  erro.style.display = 'none';

  if (!nome || !email || !senha) {
    erro.textContent = 'Todos os campos são obrigatórios.';
    erro.style.display = 'block';
    return;
  }

  // Salva o usuário no localStorage
  localStorage.setItem('usuario', JSON.stringify({ nome, email, senha }));
  alert('Cadastro realizado com sucesso!');
  
  // Redireciona para o login
  document.getElementById('login').style.display = 'block';
  document.getElementById('cadastro').style.display = 'none';
}
