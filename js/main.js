document.addEventListener("DOMContentLoaded", function () {
  const btnLogin = document.getElementById('btn-login');
  const btnCadastro = document.getElementById('btn-cadastro');
  const btnCadastrar = document.getElementById('btn-cadastrar');
  const btnVoltar = document.getElementById('btn-voltar');
  const linkEsqueceuSenha = document.getElementById('link-esqueceu-senha');

  // Exibir a seção de cadastro e esconder a de login
  btnCadastro.addEventListener('click', function () {
    document.getElementById('login').style.display = 'none';
    document.getElementById('cadastro').style.display = 'block';
  });

  // Voltar para o login
  btnVoltar.addEventListener('click', function () {
    document.getElementById('login').style.display = 'block';
    document.getElementById('cadastro').style.display = 'none';
  });

  // Função para fazer o login
  btnLogin.addEventListener('click', function () {
    fazerLogin(); // Chama a função de login no auth.js
  });

  // Função de cadastro
  btnCadastrar.addEventListener('click', function () {
    fazerCadastro(); // Chama a função de cadastro no auth.js
  });

  // "Esqueceu a senha?"
  linkEsqueceuSenha.addEventListener('click', function (event) {
    event.preventDefault(); //não funcional
    alert('Funcionalidade não implementada.');
  });
});
